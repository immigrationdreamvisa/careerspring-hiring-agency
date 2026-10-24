import {
  Job,
  JobApplication,
  EmployerInquiry,
  Company,
  User,
  SystemStatus,
} from '../types.ts';

const TOKEN_KEY = 'talentbridge_auth_token';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const getHeaders = (hasBody = true): HeadersInit => {
  const headers: Record<string, string> = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getStoredToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // System
  async getSystemStatus(): Promise<SystemStatus> {
    const res = await fetch('/api/system/status');
    if (!res.ok) throw new Error('Failed to fetch system status');
    return res.json();
  },

  async resetDatabase(): Promise<{ success: boolean; message: string; status: SystemStatus }> {
    const res = await fetch('/api/system/reset', {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to reset database');
    return res.json();
  },

  // Auth
  async getCurrentUser(): Promise<User | null> {
    const token = getStoredToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/auth/me', { headers: getHeaders(false) });
      if (!res.ok) {
        setStoredToken(null);
        return null;
      }
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    setStoredToken(data.token);
    return data;
  },

  async register(payload: {
    name: string;
    email: string;
    password: string;
    role: 'candidate' | 'employer';
    companyName?: string;
  }): Promise<{ token: string; user: User }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    setStoredToken(data.token);
    return data;
  },

  async quickLogin(role: 'candidate' | 'employer'): Promise<{ token: string; user: User }> {
    const res = await fetch('/api/auth/quick-login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Quick login failed');
    setStoredToken(data.token);
    return data;
  },

  logout() {
    setStoredToken(null);
  },

  // Jobs
  async getJobs(params?: {
    keyword?: string;
    location?: string;
    industry?: string;
    employmentType?: string;
    experienceLevel?: string;
    workplaceType?: string;
    minSalary?: number;
    status?: string;
    sort?: string;
  }): Promise<{ jobs: Job[]; total: number }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== '' && val !== null) {
          query.set(key, String(val));
        }
      });
    }
    const res = await fetch(`/api/jobs?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  },

  async getJobDetails(id: string): Promise<{ job: Job; similarJobs: Job[] }> {
    const res = await fetch(`/api/jobs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch job details');
    return res.json();
  },

  async createJob(jobData: Partial<Job>): Promise<{ job: Job; message: string }> {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create job');
    return data;
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<{ job: Job; message: string }> {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update job');
    return data;
  },

  async deleteJob(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete job');
    return data;
  },

  // Applications
  async submitApplication(appData: {
    jobId: string;
    fullName: string;
    email: string;
    phone: string;
    currentLocation: string;
    totalExperience: string;
    resumeFileName: string;
    resumeDataUrl?: string;
    coverLetter?: string;
  }): Promise<{ application: JobApplication; message: string }> {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(appData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit application');
    return data;
  },

  async getApplications(params?: {
    status?: string;
    jobId?: string;
    search?: string;
  }): Promise<{ applications: JobApplication[]; total: number }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val) query.set(key, String(val));
      });
    }
    const res = await fetch(`/api/applications?${query.toString()}`, {
      headers: getHeaders(false),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch applications');
    return data;
  },

  async updateApplicationStatus(
    id: string,
    status: JobApplication['status'],
    adminNotes?: string
  ): Promise<{ application: JobApplication; message: string }> {
    const res = await fetch(`/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status, adminNotes }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update status');
    return data;
  },

  // Inquiries
  async submitInquiry(inquiryData: {
    companyName: string;
    contactPerson: string;
    businessEmail: string;
    phone: string;
    industry: string;
    numberOfPositions: string;
    requiredJobRoles: string;
    hiringTimeline: string;
    additionalRequirements?: string;
  }): Promise<{ inquiry: EmployerInquiry; message: string }> {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(inquiryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit hiring inquiry');
    return data;
  },

  async getInquiries(params?: {
    status?: string;
    search?: string;
  }): Promise<{ inquiries: EmployerInquiry[]; total: number }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val) query.set(key, String(val));
      });
    }
    const res = await fetch(`/api/inquiries?${query.toString()}`, {
      headers: getHeaders(false),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch inquiries');
    return data;
  },

  async updateInquiryStatus(
    id: string,
    status: EmployerInquiry['status']
  ): Promise<{ inquiry: EmployerInquiry; message: string }> {
    const res = await fetch(`/api/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update inquiry status');
    return data;
  },

  // Companies
  async getCompanies(): Promise<{ companies: Company[] }> {
    const res = await fetch('/api/companies');
    if (!res.ok) throw new Error('Failed to fetch companies');
    return res.json();
  },

  // Contact
  async sendContactMessage(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send message');
    return data;
  },
};
