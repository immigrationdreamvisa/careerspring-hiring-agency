import express from 'express';
import dotenv from 'dotenv';
import { db } from './db.ts';
import {
  authMiddleware,
  AuthenticatedRequest,
  generateToken,
  hashPassword,
  verifyPassword,
} from './auth.ts';

dotenv.config();

const app = express();

// Body parsing with support for resume attachments (base64)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Global authentication extractor
app.use(authMiddleware);

// --- API ROUTES ---

// System & DB Status
app.get('/api/system/status', (_req, res) => {
  res.json(db.getStatus());
});

app.post('/api/system/reset', (_req, res) => {
  const result = db.resetToDefault();
  res.json({ success: true, message: 'Database reset to default seed data successfully.', status: result });
});

// Authentication Routes
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, role = 'candidate', companyName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    const newUser = db.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role === 'employer' ? 'employer' : 'candidate',
      companyName: companyName ? companyName.trim() : undefined,
      passwordHash: hashPassword(password),
    });

    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        companyName: newUser.companyName,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// Quick demo login for testing candidate, employer, or admin roles
app.post('/api/auth/quick-login', (req, res) => {
  const { role } = req.body;
  let targetEmail = 'admin@talentbridge.com';
  if (role === 'candidate') targetEmail = 'alex.morgan@example.com';
  if (role === 'employer') targetEmail = 'hiring@vertexcorp.example';

  const user = db.findUserByEmail(targetEmail);
  if (!user) {
    return res.status(404).json({ error: `Demo user for role ${role} not found.` });
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
    },
  });
});

app.get('/api/auth/me', (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      companyName: req.user.companyName,
    },
  });
});

// Jobs Routes
app.get('/api/jobs', (req, res) => {
  try {
    const {
      keyword,
      location,
      industry,
      employmentType,
      experienceLevel,
      workplaceType,
      minSalary,
      status = 'Active',
      sort,
    } = req.query;

    const jobs = db.getJobs({
      keyword: keyword as string,
      location: location as string,
      industry: industry as string,
      employmentType: employmentType as string,
      experienceLevel: experienceLevel as string,
      workplaceType: workplaceType as string,
      minSalary: minSalary ? parseInt(minSalary as string, 10) : undefined,
      status: status === 'all' ? undefined : (status as string),
      sort: sort as any,
    });

    res.json({ jobs, total: jobs.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch jobs' });
  }
});

app.get('/api/jobs/:id', (req, res) => {
  const job = db.getJobById(req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Find similar jobs (same industry or company, excluding current)
  const allJobs = db.getJobs({ status: 'Active' });
  const similarJobs = allJobs
    .filter((j) => j.id !== job.id && (j.industry === job.industry || j.company === job.company))
    .slice(0, 3);

  res.json({ job, similarJobs });
});

app.post('/api/jobs', (req: AuthenticatedRequest, res) => {
  try {
    // Only admins or employers can post jobs
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'employer')) {
      return res.status(403).json({ error: 'Admin or Employer privileges required to post jobs.' });
    }

    const {
      title,
      company,
      companyLogoColor = 'bg-blue-600',
      location,
      workplaceType,
      employmentType,
      industry,
      experienceLevel,
      salaryMin,
      salaryMax,
      salaryCurrency = 'USD',
      description,
      responsibilities = [],
      skills = [],
      qualifications = [],
      benefits = [],
      status = 'Active',
      featured = false,
    } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ error: 'Title, company, location, and description are required.' });
    }

    const newJob = db.createJob({
      title: title.trim(),
      company: company.trim(),
      companyLogoColor,
      location: location.trim(),
      workplaceType: workplaceType || 'Hybrid',
      employmentType: employmentType || 'Full-time',
      industry: industry || 'Information Technology',
      experienceLevel: experienceLevel || 'Mid-level',
      salaryMin: Number(salaryMin) || 80000,
      salaryMax: Number(salaryMax) || 120000,
      salaryCurrency,
      description: description.trim(),
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities],
      skills: Array.isArray(skills) ? skills : [skills],
      qualifications: Array.isArray(qualifications) ? qualifications : [qualifications],
      benefits: Array.isArray(benefits) ? benefits : [benefits],
      status: status || 'Active',
      featured: Boolean(featured),
    });

    res.status(201).json({ job: newJob, message: 'Job created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create job' });
  }
});

app.put('/api/jobs/:id', (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator access required.' });
    }

    const updated = db.updateJob(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ job: updated, message: 'Job updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update job' });
  }
});

app.delete('/api/jobs/:id', (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator access required.' });
    }

    const deleted = db.deleteJob(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete job' });
  }
});

// Applications Routes
app.get('/api/applications', (req: AuthenticatedRequest, res) => {
  try {
    const { status, jobId, search } = req.query;
    const applications = db.getApplications({
      status: status as string,
      jobId: jobId as string,
      search: search as string,
    });

    res.json({ applications, total: applications.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch applications' });
  }
});

app.post('/api/applications', (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      currentLocation,
      totalExperience,
      resumeFileName,
      resumeDataUrl,
      coverLetter,
    } = req.body;

    if (!jobId || !fullName || !email || !phone || !currentLocation || !totalExperience) {
      return res.status(400).json({
        error: 'Please fill in all required fields (Name, Email, Phone, Location, Experience).',
      });
    }

    const job = db.getJobById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'The specified job listing does not exist.' });
    }

    const newApp = db.createApplication({
      jobId,
      jobTitle: job.title,
      company: job.company,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      currentLocation: currentLocation.trim(),
      totalExperience: totalExperience.trim(),
      resumeFileName: resumeFileName || 'Submitted_Resume.pdf',
      resumeDataUrl: resumeDataUrl || undefined,
      coverLetter: coverLetter ? coverLetter.trim() : undefined,
    });

    res.status(201).json({
      application: newApp,
      message: 'Application submitted successfully! Our recruiting team has received your profile.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit application' });
  }
});

app.patch('/api/applications/:id/status', (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator access required.' });
    }

    const { status, adminNotes } = req.body;
    const validStatuses = ['Pending', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const updated = db.updateApplicationStatus(req.params.id, status, adminNotes);
    if (!updated) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ application: updated, message: `Status updated to ${status}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update application status' });
  }
});

// Employer Inquiries Routes
app.get('/api/inquiries', (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator access required.' });
    }

    const { status, search } = req.query;
    const inquiries = db.getInquiries({
      status: status as string,
      search: search as string,
    });

    res.json({ inquiries, total: inquiries.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch inquiries' });
  }
});

app.post('/api/inquiries', (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      businessEmail,
      phone,
      industry,
      numberOfPositions,
      requiredJobRoles,
      hiringTimeline,
      additionalRequirements,
    } = req.body;

    if (
      !companyName ||
      !contactPerson ||
      !businessEmail ||
      !phone ||
      !industry ||
      !numberOfPositions ||
      !requiredJobRoles ||
      !hiringTimeline
    ) {
      return res.status(400).json({
        error: 'Please fill out all required company and hiring requirement fields.',
      });
    }

    const newInquiry = db.createInquiry({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      businessEmail: businessEmail.trim().toLowerCase(),
      phone: phone.trim(),
      industry: industry.trim(),
      numberOfPositions: numberOfPositions.trim(),
      requiredJobRoles: requiredJobRoles.trim(),
      hiringTimeline: hiringTimeline.trim(),
      additionalRequirements: additionalRequirements ? additionalRequirements.trim() : undefined,
    });

    res.status(201).json({
      inquiry: newInquiry,
      message: 'Hiring inquiry submitted! An executive recruiting specialist will contact you within 24 hours.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit inquiry' });
  }
});

app.patch('/api/inquiries/:id/status', (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator access required.' });
    }

    const { status } = req.body;
    const updated = db.updateInquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ inquiry: updated, message: `Inquiry status marked as ${status}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update status' });
  }
});

// Companies Route
app.get('/api/companies', (_req, res) => {
  res.json({ companies: db.getCompanies() });
});

// Contact Us Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  // Log message and acknowledge
  console.log(`[TalentBridge Contact] Message from ${name} (${email}): ${subject || 'No subject'}`);
  res.json({
    success: true,
    message: 'Thank you for reaching out to TalentBridge. Our advisory team will respond shortly.',
  });
});

export default app;
export { app };
