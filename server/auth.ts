import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { db } from './db.ts';
import { User } from './seedData.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'talentbridge_secret_key_2026';

export interface AuthPayload {
  userId: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  name: string;
}

export function hashPassword(password: string): string {
  return crypto.createHmac('sha256', JWT_SECRET).update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  // Support both pre-seeded plain passwords for convenience and hashed ones
  if (password === hash) return true;
  const computed = hashPassword(password);
  return computed === hash;
}

export function generateToken(payload: AuthPayload): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');
    if (signature !== expectedSig) return null;

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);
  if (payload) {
    const user = db.findUserById(payload.userId);
    if (user) {
      req.user = user;
    }
  }
  next();
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
  }
  next();
}
