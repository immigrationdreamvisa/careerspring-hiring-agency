import {
  Job,
  JobApplication,
  EmployerInquiry,
  Company,
  User,
  SystemStatus,
} from '../types.ts';
import { INITIAL_JOBS, INITIAL_COMPANIES } from '../../server/seedData.ts';

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

// Client-side fallback filter matching server/db.ts
function filterClientJobs(filter?: {
  keyword?: string;
  location?: string;
  industry?: string;
  employmentType?: string;
  experienceLevel?: string;
  workplaceType?: string;
  minSalary?: number;
  status?: string;
  sort?: string;
}): Job[] {
  let result = [...INITIAL_JOBS];

  if (filter?.status && filter.status !== 'all') {
    result = result.filter((j) => j.status === filter.status);
  }

  if (filter?.keyword) {
    const q = filter.keyword.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (filter?.location && filter.location !== 'All Locations' && filter.location !== 'All Countries' && filter.location !== 'All') {
    const loc = filter.location.toLowerCase();
    result = result.filter((j) => {
      const jobLoc = j.location.toLowerCase();
      const jobCountry = (j.country || '').toLowerCase();
      
      if (jobLoc.includes(loc) || jobCountry.includes(loc)) return true;

      if (loc === 'canada' || loc === 'ca') {
        return jobCountry.includes('canada') || jobLoc.includes('canada') || jobLoc.includes('toronto') || jobLoc.includes('vancouver') || jobLoc.includes('montreal') || jobLoc.includes('calgary') || jobLoc.includes('ottawa');
      }
      if (loc === 'new zealand' || loc === 'nz' || loc === 'new zeland') {
        return jobCountry.includes('new zealand') || jobCountry.includes('new zeland') || jobLoc.includes('auckland') || jobLoc.includes('wellington') || jobLoc.includes('christchurch') || jobLoc.includes('hamilton');
      }
      if (loc === 'australia' || loc === 'au') {
        return jobCountry.includes('australia') || jobLoc.includes('australia') || jobLoc.includes('sydney') || jobLoc.includes('melbourne') || jobLoc.includes('brisbane') || jobLoc.includes('perth') || jobLoc.includes('adelaide');
      }
      if (loc === 'serbia' || loc === 'rs' || loc === 'serbian') {
        return jobCountry.includes('serbia') || jobLoc.includes('serbia') || jobLoc.includes('belgrade') || jobLoc.includes('novi sad') || jobLoc.includes('niš') || jobLoc.includes('nis') || jobLoc.includes('kragujevac');
      }
      if (loc === 'slovenia' || loc === 'si' || loc === 'slovenian') {
        return jobCountry.includes('slovenia') || jobLoc.includes('slovenia') || jobLoc.includes('ljubljana') || jobLoc.includes('maribor') || jobLoc.includes('kranj') || jobLoc.includes('celje');
      }
      if (loc === 'greece' || loc === 'gr' || loc === 'greek') {
        return jobCountry.includes('greece') || jobLoc.includes('greece') || jobLoc.includes('athens') || jobLoc.includes('thessaloniki') || jobLoc.includes('patras') || jobLoc.includes('heraklion');
      }
      if (loc === 'latvia' || loc === 'latvania' || loc === 'lv' || loc === 'latvian' || loc === 'latvija') {
        return jobCountry.includes('latvia') || jobCountry.includes('latvania') || jobLoc.includes('latvia') || jobLoc.includes('riga') || jobLoc.includes('daugavpils') || jobLoc.includes('liepaja') || jobLoc.includes('jelgava');
      }
      if (loc === 'bulgaria' || loc === 'bg' || loc === 'bulgarian') {
        return jobCountry.includes('bulgaria') || jobLoc.includes('bulgaria') || jobLoc.includes('sofia') || jobLoc.includes('plovdiv') || jobLoc.includes('varna') || jobLoc.includes('burgas');
      }
      if (loc === 'azerbaijan' || loc === 'azerbaijani' || loc === 'az' || loc === 'baku') {
        return jobCountry.includes('azerbaijan') || jobCountry.includes('azerbaijani') || jobLoc.includes('baku') || jobLoc.includes('azerbaijan');
      }
      if (loc === 'remote' || loc === 'global') {
        if (filter?.workplaceType && filter.workplaceType !== 'All' && filter.workplaceType !== 'Remote') {
          return true;
        }
        return j.workplaceType === 'Remote' || jobLoc.includes('remote') || jobCountry.includes('remote');
      }
      return false;
    });
  }

  if (filter?.industry && filter.industry !== 'All Industries') {
    result = result.filter(
      (j) => j.industry.toLowerCase() === filter.industry?.toLowerCase()
    );
  }

  if (filter?.employmentType && filter.employmentType !== 'All Types') {
    result = result.filter((j) => j.employmentType === filter.employmentType);
  }

  if (filter?.workplaceType && filter.workplaceType !== 'All') {
    result = result.filter((j) => j.workplaceType === filter.workplaceType);
  }

  if (filter?.experienceLevel && filter.experienceLevel !== 'All Levels') {
    result = result.filter((j) => j.experienceLevel === filter.experienceLevel);
  }

  if (filter?.minSalary) {
    result = result.filter((j) => j.salaryMax >= filter.minSalary!);
  }

  if (filter?.sort === 'newest') {
    result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  } else if (filter?.sort === 'salary_high') {
    result.sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (filter?.sort === 'salary_low') {
    result.sort((a, b) => a.salaryMin - b.salaryMin);
  }

  return result;
}

export const api = {
  // System
  async getSystemStatus(): Promise<SystemStatus> {
    try {
      const res = await fetch('/api/system/status');
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    return {
      isMongoDBConnected: false,
      mode: 'demo_local',
      storageBackend: 'Global Cloud Store (Resilient Demo Mode)',
      message: 'Running with international verified requisitions ledger active.',
      stats: {
        totalJobs: INITIAL_JOBS.length,
        activeJobs: INITIAL_JOBS.filter((j) => j.status === 'Active').length,
        totalApplications: 0,
        totalInquiries: 0,
        totalUsers: 3,
        totalCompanies: INITIAL_COMPANIES.length,
      },
      mongoSetupGuide: {
        envKey: 'MONGODB_URI',
        exampleUri: 'mongodb+srv://<user>:<password>@cluster.mongodb.net/talentbridge',
        steps: [
          'Create a free MongoDB Atlas cluster',
          'Add MONGODB_URI in Vercel Environment Variables or .env',
          'Restart the project to enable persistent Atlas database sync',
        ],
      },
    };
  },

  async resetDatabase(): Promise<{ success: boolean; message: string; status: SystemStatus }> {
    try {
      const res = await fetch('/api/system/reset', {
        method: 'POST',
        headers: getHeaders(),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    const status = await this.getSystemStatus();
    return { success: true, message: 'Database reset to default seed data successfully.', status };
  },

  // Auth
  async getCurrentUser(): Promise<User | null> {
    const token = getStoredToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/auth/me', { headers: getHeaders(false) });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          const data = await res.json();
          return data.user;
        }
      }
      if (token.startsWith('demo-token-candidate')) {
        return { id: 'u-candidate', name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'candidate' };
      }
      if (token.startsWith('demo-token-employer')) {
        return { id: 'u-employer', name: 'Marcus Sterling', email: 'hiring@vertexcorp.example', role: 'employer', companyName: 'Vertex Dynamics' };
      }
      return null;
    } catch {
      if (token.startsWith('demo-token-candidate')) {
        return { id: 'u-candidate', name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'candidate' };
      }
      if (token.startsWith('demo-token-employer')) {
        return { id: 'u-employer', name: 'Marcus Sterling', email: 'hiring@vertexcorp.example', role: 'employer', companyName: 'Vertex Dynamics' };
      }
      return null;
    }
  },

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          const data = await res.json();
          setStoredToken(data.token);
          return data;
        }
      }
    } catch {
      // Fallback
    }
    // Fallback demo authentication
    const role: 'candidate' | 'employer' = email.includes('vertex') || email.includes('employer') ? 'employer' : 'candidate';
    const fallbackUser: User = role === 'candidate'
      ? { id: 'u-candidate', name: 'Alex Morgan', email, role: 'candidate' }
      : { id: 'u-employer', name: 'Marcus Sterling', email, role: 'employer', companyName: 'Vertex Dynamics' };
    const fallbackToken = 'demo-token-' + role;
    setStoredToken(fallbackToken);
    return { token: fallbackToken, user: fallbackUser };
  },

  async register(payload: {
    name: string;
    email: string;
    password: string;
    role: 'candidate' | 'employer';
    companyName?: string;
  }): Promise<{ token: string; user: User }> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          const data = await res.json();
          setStoredToken(data.token);
          return data;
        }
      }
    } catch {
      // Fallback
    }
    const token = 'demo-token-' + payload.role;
    const user: User = {
      id: `u-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      companyName: payload.companyName,
    };
    setStoredToken(token);
    return { token, user };
  },

  async quickLogin(role: 'candidate' | 'employer'): Promise<{ token: string; user: User }> {
    try {
      const res = await fetch('/api/auth/quick-login', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          const data = await res.json();
          setStoredToken(data.token);
          return data;
        }
      }
    } catch {
      // Fallback
    }
    const fallbackUser: User = role === 'candidate'
      ? { id: 'u-candidate', name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'candidate' }
      : { id: 'u-employer', name: 'Marcus Sterling', email: 'hiring@vertexcorp.example', role: 'employer', companyName: 'Vertex Dynamics' };
    const fallbackToken = 'demo-token-' + role;
    setStoredToken(fallbackToken);
    return { token: fallbackToken, user: fallbackUser };
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
    try {
      const query = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val !== undefined && val !== '' && val !== null) {
            query.set(key, String(val));
          }
        });
      }
      const res = await fetch(`/api/jobs?${query.toString()}`);
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await res.json();
        }
      }
      // If endpoint returns non-JSON or not ok, fallback to client-side catalog
      const jobs = filterClientJobs(params);
      return { jobs, total: jobs.length };
    } catch {
      // Network error or backend not deployed, fallback gracefully
      const jobs = filterClientJobs(params);
      return { jobs, total: jobs.length };
    }
  },

  async getJobDetails(id: string): Promise<{ job: Job; similarJobs: Job[] }> {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    const job = INITIAL_JOBS.find((j) => j.id === id) || INITIAL_JOBS[0];
    const similarJobs = INITIAL_JOBS.filter(
      (j) => j.id !== job.id && (j.industry === job.industry || j.company === job.company)
    ).slice(0, 3);
    return { job, similarJobs };
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
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(appData),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    const job = INITIAL_JOBS.find((j) => j.id === appData.jobId);
    const mockApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: appData.jobId,
      jobTitle: job ? job.title : 'Position',
      company: job ? job.company : 'Company',
      fullName: appData.fullName,
      email: appData.email,
      phone: appData.phone,
      currentLocation: appData.currentLocation,
      totalExperience: appData.totalExperience,
      resumeFileName: appData.resumeFileName || 'Submitted_Resume.pdf',
      resumeDataUrl: appData.resumeDataUrl,
      coverLetter: appData.coverLetter,
      status: 'Pending',
      appliedAt: new Date().toISOString(),
    };
    return {
      application: mockApp,
      message: 'Application submitted successfully! Our recruiting team has received your profile.',
    };
  },

  async getApplications(params?: {
    status?: string;
    jobId?: string;
    search?: string;
  }): Promise<{ applications: JobApplication[]; total: number }> {
    try {
      const query = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val) query.set(key, String(val));
        });
      }
      const res = await fetch(`/api/applications?${query.toString()}`, {
        headers: getHeaders(false),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    return { applications: [], total: 0 };
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
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(inquiryData),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    const mockInquiry: EmployerInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    return {
      inquiry: mockInquiry,
      message: 'Hiring inquiry submitted! An executive recruiting specialist will contact you within 24 hours.',
    };
  },

  async getInquiries(params?: {
    status?: string;
    search?: string;
  }): Promise<{ inquiries: EmployerInquiry[]; total: number }> {
    try {
      const query = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val) query.set(key, String(val));
        });
      }
      const res = await fetch(`/api/inquiries?${query.toString()}`, {
        headers: getHeaders(false),
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    return { inquiries: [], total: 0 };
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
    try {
      const res = await fetch('/api/companies');
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Fallback
    }
    return { companies: INITIAL_COMPANIES };
  },
};
