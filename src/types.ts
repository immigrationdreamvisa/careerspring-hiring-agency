export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer';
  companyName?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogoColor: string;
  location: string;
  country?: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  industry: string;
  experienceLevel: 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead / Executive';
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  qualifications: string[];
  benefits: string[];
  status: 'Active' | 'Closed';
  featured: boolean;
  applicantsCount: number;
  postedDate: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  totalExperience: string;
  resumeFileName: string;
  resumeDataUrl?: string;
  coverLetter?: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Rejected' | 'Hired';
  adminNotes?: string;
  appliedAt: string;
}

export interface EmployerInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  phone: string;
  industry: string;
  numberOfPositions: string;
  requiredJobRoles: string;
  hiringTimeline: string;
  additionalRequirements?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  tagline: string;
  activeOpenings: number;
  logoAccent: string;
}

export interface SystemStatus {
  isMongoDBConnected: boolean;
  mode: 'mongodb' | 'demo_local';
  storageBackend: string;
  message: string;
  stats: {
    totalJobs: number;
    activeJobs: number;
    totalApplications: number;
    totalInquiries: number;
    totalUsers: number;
    totalCompanies: number;
  };
  mongoSetupGuide: {
    envKey: string;
    exampleUri: string;
    steps: string[];
  };
}

export type PageView =
  | 'home'
  | 'jobs'
  | 'job-details'
  | 'applications'
  | 'hire-talent'
  | 'industries'
  | 'about'
  | 'contact';

export interface ServiceDetail {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  fullOverview: string;
  keyBenefits: string[];
  typicalTimeline: string;
  bestSuitedFor: string;
}
