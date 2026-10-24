import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { X, ArrowUpRight, AlertCircle, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalInitialTab, login, register, quickLogin } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>(authModalInitialTab);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'candidate' | 'employer'>('candidate');
  const [regCompany, setRegCompany] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginEmail || !loginPassword) {
      setError('Please provide email and password.');
      return;
    }
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!regName || !regEmail || !regPassword) {
      setError('Please complete all required fields.');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        companyName: regRole === 'employer' ? regCompany : undefined,
      });

      const newProfile = {
        id: 'cs-prof-' + Date.now(),
        name: regName.trim(),
        email: regEmail.trim(),
        phone: '+1 (555) 010-0000',
        location: 'United States',
        targetRole: regRole === 'employer' ? (regCompany ? `${regCompany} Executive` : 'Hiring Executive') : 'Software / Executive Candidate',
        industry: 'Technology & Enterprise Systems',
        experienceLevel: 'Senior Professional (5-8 years)',
        workArrangement: 'Remote Preferred',
        expectedSalary: '$160,000 – $220,000 / yr',
        skills: ['Executive Leadership', 'Product Strategy', 'Architecture'],
        savedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      localStorage.setItem('careerspring_user_profile', JSON.stringify(newProfile));
      window.dispatchEvent(new CustomEvent('careerspring_profile_updated', { detail: newProfile }));
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'candidate' | 'employer') => {
    setError(null);
    setLoading(true);
    try {
      await quickLogin(role);

      const demoProfile = {
        id: 'cs-prof-demo',
        name: role === 'candidate' ? 'Sarah Jenkins' : 'David Chen',
        email: role === 'candidate' ? 'sarah.jenkins@example.com' : 'david.chen@enterprise.example',
        phone: '+1 (555) 019-2834',
        location: 'San Francisco, CA',
        targetRole: role === 'candidate' ? 'Principal Distributed Systems Architect' : 'VP of Engineering',
        industry: 'Technology & Distributed Systems',
        experienceLevel: 'Lead / Executive',
        workArrangement: 'Remote Preferred',
        expectedSalary: '$220,000 – $280,000 / yr',
        skills: ['Distributed Systems', 'Go / Rust', 'Kubernetes', 'Cloud Infrastructure'],
        savedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      localStorage.setItem('careerspring_user_profile', JSON.stringify(demoProfile));
      window.dispatchEvent(new CustomEvent('careerspring_profile_updated', { detail: demoProfile }));
    } catch (err: any) {
      setError(err.message || 'Demo access failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white text-slate-900 w-full max-w-md border border-slate-200 rounded-2xl p-7 sm:p-8 space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-icon.png"
              alt="CareerSpring"
              className="w-9 h-9 object-contain"
            />
            <div>
              <span className="text-xs font-sans uppercase tracking-wider text-slate-500 font-bold block">
                CAREER<span className="text-[#FF5500]">SPRING</span>
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900 mt-0.5">
                {tab === 'login' ? 'Sign In to Portal' : 'Create an Account'}
              </h3>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-sans font-semibold">
          <button
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              tab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              tab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 border border-rose-200 bg-rose-50 rounded-xl text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Account Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@organization.com"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs font-sans">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRegRole('candidate')}
                className={`py-2 text-center text-xs font-bold rounded-lg border transition-colors ${
                  regRole === 'candidate'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setRegRole('employer')}
                className={`py-2 text-center text-xs font-bold rounded-lg border transition-colors ${
                  regRole === 'employer'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Hiring Partner
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>

            {regRole === 'employer' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={regCompany}
                  onChange={(e) => setRegCompany(e.target.value)}
                  placeholder="Apex Ventures"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="sarah@example.com"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="6+ characters"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            </button>
          </form>
        )}

        {/* Demo Fast Logins */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
            Instant Demo Sign-in
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            <button
              type="button"
              onClick={() => handleQuickDemo('candidate')}
              className="py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg transition-colors text-center font-bold"
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('employer')}
              className="py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg transition-colors text-center font-bold"
            >
              Employer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
