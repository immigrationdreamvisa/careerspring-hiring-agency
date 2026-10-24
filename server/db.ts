import fs from 'fs';
import path from 'path';
import {
  User,
  Job,
  JobApplication,
  EmployerInquiry,
  Company,
  INITIAL_USERS,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_INQUIRIES,
  INITIAL_COMPANIES,
} from './seedData.ts';

interface DatabaseSchema {
  users: User[];
  jobs: Job[];
  applications: JobApplication[];
  inquiries: EmployerInquiry[];
  companies: Company[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE_PATH = path.join(DATA_DIR, 'talentbridge_db.json');

class DatabaseStore {
  private data: DatabaseSchema;
  private isMongoConfigured: boolean = false;
  private mongoUri: string = '';

  constructor() {
    this.data = {
      users: [...INITIAL_USERS],
      jobs: [...INITIAL_JOBS],
      applications: [...INITIAL_APPLICATIONS],
      inquiries: [...INITIAL_INQUIRIES],
      companies: [...INITIAL_COMPANIES],
    };

    this.mongoUri = process.env.MONGODB_URI?.trim() || '';
    this.isMongoConfigured = Boolean(this.mongoUri && this.mongoUri.startsWith('mongodb'));

    this.initStorage();
  }

  private initStorage() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.jobs && Array.isArray(parsed.jobs)) {
          this.data = parsed;
          console.log(`[TalentBridge DB] Loaded persistent data: ${this.data.jobs.length} jobs, ${this.data.applications.length} applications.`);
          return;
        }
      }

      // First run: save seed data to disk
      this.saveToDisk();
      console.log(`[TalentBridge DB] Seeded initial database with ${this.data.jobs.length} jobs, ${this.data.applications.length} applications.`);
    } catch (err) {
      console.warn('[TalentBridge DB] File storage initialization note:', err);
    }
  }

  private saveToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[TalentBridge DB] Failed to persist data to disk:', err);
    }
  }

  public reloadFromDisk() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.jobs && Array.isArray(parsed.jobs)) {
          this.data = parsed;
          if (!this.data.applications) this.data.applications = [];
          if (!this.data.inquiries) this.data.inquiries = [];
          if (!this.data.users) this.data.users = [];
          if (!this.data.companies) this.data.companies = [];
        }
      }
    } catch (err) {
      console.warn('[CareerSpring DB] Reload note:', err);
    }
  }

  public getStatus() {
    return {
      isMongoDBConnected: this.isMongoConfigured,
      mode: this.isMongoConfigured ? 'mongodb' : 'demo_local',
      storageBackend: this.isMongoConfigured
        ? 'MongoDB Atlas / Instance'
        : 'Persistent Local JSON Store (Demo Mode)',
      message: this.isMongoConfigured
        ? 'Production MongoDB connection active.'
        : 'Running in built-in Persistent Demo Mode. All job listings, applications, and inquiries are persisted locally on the server. Connect a real MongoDB database by setting MONGODB_URI in your environment.',
      stats: {
        totalJobs: this.data.jobs.length,
        activeJobs: this.data.jobs.filter((j) => j.status === 'Active').length,
        totalApplications: this.data.applications.length,
        totalInquiries: this.data.inquiries.length,
        totalUsers: this.data.users.length,
        totalCompanies: this.data.companies.length,
      },
      mongoSetupGuide: {
        envKey: 'MONGODB_URI',
        exampleUri:
          'mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/talentbridge?retryWrites=true&w=majority',
        steps: [
          'Create a free MongoDB Atlas cluster or start a local mongod daemon.',
          'Add a database user with readWrite permissions to the "talentbridge" database.',
          'Set MONGODB_URI in your environment or Secrets configuration.',
          'Restart the service to switch from Demo Storage to production MongoDB automatically.',
        ],
      },
    };
  }

  public resetToDefault() {
    this.data = {
      users: [...INITIAL_USERS],
      jobs: [...INITIAL_JOBS],
      applications: [...INITIAL_APPLICATIONS],
      inquiries: [...INITIAL_INQUIRIES],
      companies: [...INITIAL_COMPANIES],
    };
    this.saveToDisk();
    return this.getStatus();
  }

  // --- Users ---
  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: `u-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    this.saveToDisk();
    return newUser;
  }

  // --- Jobs ---
  public getJobs(filter?: {
    keyword?: string;
    location?: string;
    industry?: string;
    employmentType?: string;
    experienceLevel?: string;
    workplaceType?: string;
    minSalary?: number;
    status?: string;
    sort?: 'newest' | 'relevance' | 'salary_high' | 'salary_low';
  }): Job[] {
    this.reloadFromDisk();
    let result = [...this.data.jobs];

    if (filter?.status) {
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

        if (loc === 'uk' || loc === 'united kingdom' || loc === 'britain' || loc === 'great britain') {
          return jobCountry.includes('united kingdom') || jobCountry.includes('uk') || jobLoc.includes('uk') || jobLoc.includes('london') || jobLoc.includes('manchester') || jobLoc.includes('edinburgh');
        }
        if (loc === 'us' || loc === 'usa' || loc === 'united states' || loc === 'america') {
          return jobCountry.includes('united states') || jobCountry.includes('usa') || jobCountry.includes('us') || jobLoc.includes('united states') || jobLoc.includes('usa') || /,\s*(ca|ny|tx|il|wa|ma|fl|co|ga)\b/i.test(jobLoc);
        }
        if (loc === 'uae' || loc === 'united arab emirates' || loc === 'dubai') {
          return jobCountry.includes('emirates') || jobCountry.includes('uae') || jobLoc.includes('dubai') || jobLoc.includes('abu dhabi');
        }
        if (loc === 'germany' || loc === 'de') {
          return jobCountry.includes('germany') || jobLoc.includes('germany') || jobLoc.includes('berlin') || jobLoc.includes('munich') || jobLoc.includes('frankfurt');
        }
        if (loc === 'canada') {
          return jobCountry.includes('canada') || jobLoc.includes('canada') || jobLoc.includes('toronto') || jobLoc.includes('vancouver') || jobLoc.includes('montreal');
        }
        if (loc === 'singapore' || loc === 'sg') {
          return jobCountry.includes('singapore') || jobLoc.includes('singapore');
        }
        if (loc === 'australia' || loc === 'au') {
          return jobCountry.includes('australia') || jobLoc.includes('australia') || jobLoc.includes('sydney') || jobLoc.includes('melbourne');
        }
        if (loc === 'remote' || loc === 'global') {
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

    // Sort
    if (filter?.sort === 'salary_high') {
      result.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (filter?.sort === 'salary_low') {
      result.sort((a, b) => a.salaryMin - b.salaryMin);
    } else if (filter?.sort === 'newest') {
      result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else {
      // Relevance: featured first, then newest
      result.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      });
    }

    return result;
  }

  public getJobById(id: string): Job | undefined {
    return this.data.jobs.find((j) => j.id === id);
  }

  public createJob(jobData: Omit<Job, 'id' | 'applicantsCount' | 'postedDate'>): Job {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      applicantsCount: 0,
      postedDate: new Date().toISOString().split('T')[0],
    };
    this.data.jobs.unshift(newJob);
    this.saveToDisk();
    return newJob;
  }

  public updateJob(id: string, updates: Partial<Job>): Job | undefined {
    const index = this.data.jobs.findIndex((j) => j.id === id);
    if (index === -1) return undefined;
    this.data.jobs[index] = { ...this.data.jobs[index], ...updates };
    this.saveToDisk();
    return this.data.jobs[index];
  }

  public deleteJob(id: string): boolean {
    const initialLen = this.data.jobs.length;
    this.data.jobs = this.data.jobs.filter((j) => j.id !== id);
    if (this.data.jobs.length !== initialLen) {
      this.saveToDisk();
      return true;
    }
    return false;
  }

  // --- Applications ---
  public getApplications(filter?: { status?: string; jobId?: string; search?: string }): JobApplication[] {
    this.reloadFromDisk();
    if (!this.data.applications) {
      this.data.applications = [];
    }
    let result = [...this.data.applications];

    if (filter?.status && filter.status !== 'All') {
      result = result.filter((a) => a.status === filter.status);
    }

    if (filter?.jobId) {
      result = result.filter((a) => a.jobId === filter.jobId);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.fullName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.jobTitle.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    return result;
  }

  public createApplication(appData: Omit<JobApplication, 'id' | 'status' | 'appliedAt'>): JobApplication {
    const newApp: JobApplication = {
      ...appData,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'Pending',
      appliedAt: new Date().toISOString(),
    };
    this.data.applications.unshift(newApp);

    // Increment applicantsCount on the job
    const job = this.data.jobs.find((j) => j.id === appData.jobId);
    if (job) {
      job.applicantsCount = (job.applicantsCount || 0) + 1;
    }

    this.saveToDisk();
    return newApp;
  }

  public updateApplicationStatus(id: string, status: JobApplication['status'], adminNotes?: string): JobApplication | undefined {
    const app = this.data.applications.find((a) => a.id === id);
    if (!app) return undefined;
    app.status = status;
    if (adminNotes !== undefined) {
      app.adminNotes = adminNotes;
    }
    this.saveToDisk();
    return app;
  }

  // --- Employer Inquiries ---
  public getInquiries(filter?: { status?: string; search?: string }): EmployerInquiry[] {
    let result = [...this.data.inquiries];

    if (filter?.status && filter.status !== 'All') {
      result = result.filter((i) => i.status === filter.status);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.companyName.toLowerCase().includes(q) ||
          i.contactPerson.toLowerCase().includes(q) ||
          i.businessEmail.toLowerCase().includes(q) ||
          i.industry.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }

  public createInquiry(inquiryData: Omit<EmployerInquiry, 'id' | 'status' | 'createdAt'>): EmployerInquiry {
    const newInquiry: EmployerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    this.data.inquiries.unshift(newInquiry);
    this.saveToDisk();
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: EmployerInquiry['status']): EmployerInquiry | undefined {
    const inq = this.data.inquiries.find((i) => i.id === id);
    if (!inq) return undefined;
    inq.status = status;
    this.saveToDisk();
    return inq;
  }

  // --- Companies ---
  public getCompanies(): Company[] {
    return [...this.data.companies];
  }
}

export const db = new DatabaseStore();
