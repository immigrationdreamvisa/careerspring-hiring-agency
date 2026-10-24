export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  companyName?: string;
  passwordHash: string;
  createdAt: string;
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

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'c-1',
    name: 'Vertex Dynamics',
    industry: 'Information Technology',
    size: '500-1,000 employees',
    location: 'San Francisco, CA',
    tagline: 'Next-generation cloud infrastructure & microservices',
    activeOpenings: 5,
    logoAccent: 'bg-blue-600',
  },
  {
    id: 'c-2',
    name: 'Meridian Capital Group',
    industry: 'Banking & Finance',
    size: '1,000-5,000 employees',
    location: 'New York, NY',
    tagline: 'Global asset management and qualitative algorithmic hedge funds',
    activeOpenings: 3,
    logoAccent: 'bg-emerald-600',
  },
  {
    id: 'c-3',
    name: 'Apex Health Systems',
    industry: 'Healthcare',
    size: '2,500+ employees',
    location: 'Boston, MA',
    tagline: 'Transforming clinical diagnostics and biopharmaceutical operations',
    activeOpenings: 4,
    logoAccent: 'bg-teal-600',
  },
  {
    id: 'c-4',
    name: 'Horizon Industrial Robotics',
    industry: 'Manufacturing',
    size: '350-700 employees',
    location: 'Chicago, IL',
    tagline: 'Autonomous assembly lines and advanced precision machinery',
    activeOpenings: 2,
    logoAccent: 'bg-indigo-600',
  },
  {
    id: 'c-5',
    name: 'Velox Commerce Global',
    industry: 'Retail & E-commerce',
    size: '800-1,500 employees',
    location: 'Seattle, WA',
    tagline: 'High-speed omnichannel fulfillment and marketplace technology',
    activeOpenings: 4,
    logoAccent: 'bg-amber-600',
  },
  {
    id: 'c-6',
    name: 'Nexus Freight Logistics',
    industry: 'Logistics & Supply Chain',
    size: '1,200-3,000 employees',
    location: 'Atlanta, GA',
    tagline: 'Multimodal freight routing and real-time inventory networks',
    activeOpenings: 3,
    logoAccent: 'bg-slate-700',
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u-admin',
    name: 'Eleanor Vance',
    email: 'admin@talentbridge.com',
    role: 'admin',
    companyName: 'TalentBridge Executive',
    passwordHash: 'admin123',
    createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: 'u-employer',
    name: 'Marcus Sterling',
    email: 'hiring@vertexcorp.example',
    role: 'employer',
    companyName: 'Vertex Dynamics',
    passwordHash: 'employer123',
    createdAt: '2026-02-10T11:30:00Z',
  },
  {
    id: 'u-candidate',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'candidate',
    passwordHash: 'candidate123',
    createdAt: '2026-03-01T14:20:00Z',
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    "id": "job-101",
    "title": "Principal Distributed Systems Architect",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "San Francisco, CA",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 220000,
    "salaryMax": 275000,
    "salaryCurrency": "USD",
    "description": "We are seeking an exceptional Distributed Systems Architect to lead the modernization of Vertex Dynamics high-throughput data pipelines processing over 4 billion events daily. You will partner with VP of Engineering to design resilient multi-region architectures.",
    "responsibilities": [
      "Architect low-latency streaming infrastructure handling multi-terabyte transactional payloads.",
      "Establish technical design RFCs, performance budgets, and reliability standards across 8 cross-functional pods.",
      "Mentor senior and staff software engineers in concurrency, consensus algorithms, and fault tolerance.",
      "Direct root-cause analysis for mission-critical infrastructure incidents and automate failover mitigation."
    ],
    "skills": [
      "Go",
      "Rust / C++",
      "Apache Kafka",
      "Kubernetes",
      "Distributed Consensus (Raft/Paxos)",
      "gRPC",
      "AWS/GCP"
    ],
    "qualifications": [
      "10+ years of software engineering experience with at least 4 years in principal or lead architecture roles.",
      "Proven track record scaling production distributed databases or event-driven streaming topologies.",
      "B.S. or M.S. in Computer Science or equivalent practical engineering rigor."
    ],
    "benefits": [
      "Comprehensive tier-one medical, dental, and vision coverage (100% employer paid)",
      "Competitive equity stock grant + 401(k) with 6% immediate employer match",
      "$4,000 annual continuous learning and conference allowance",
      "Flexible hybrid schedule (2 days collaborative in-office, 3 days remote)"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 14,
    "postedDate": "2026-10-18",
    "country": "United States"
  },
  {
    "id": "job-102",
    "title": "Senior Quantitative Risk Analyst",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "New York, NY",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Senior",
    "salaryMin": 185000,
    "salaryMax": 235000,
    "salaryCurrency": "USD",
    "description": "Meridian Capital is expanding its proprietary quantitative modeling division. As a Senior Quantitative Risk Analyst, you will engineer probabilistic stress-testing algorithms across fixed income, equity derivatives, and private credit portfolios.",
    "responsibilities": [
      "Formulate Monte Carlo simulations and parametric Value-at-Risk (VaR) calculations for global books.",
      "Analyze liquidity scenarios and counterparty risk profiles under dynamic macro shocks.",
      "Present mathematical risk evaluations directly to the Chief Investment Officer and Risk Committee.",
      "Collaborate with quantitative developers to vectorize Python & C++ quantitative libraries."
    ],
    "skills": [
      "Python",
      "Quantitative Modeling",
      "Stochastic Calculus",
      "Value-at-Risk (VaR)",
      "C++",
      "SQL/DuckDB"
    ],
    "qualifications": [
      "5+ years quantitative finance or econometric risk modeling experience at an investment bank or hedge fund.",
      "Advanced degree (Master’s or Ph.D.) in Financial Engineering, Applied Mathematics, Physics, or Statistics.",
      "Deep fluency with derivative pricing models (Black-Scholes, SABR, Heston)."
    ],
    "benefits": [
      "High-performance discretionary annual bonus pool",
      "Premier Manhattan private dining and onsite wellness center",
      "Full healthcare coverage including family plans",
      "Generous 25 days paid vacation + institutional banking holidays"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 19,
    "postedDate": "2026-10-19",
    "country": "United States"
  },
  {
    "id": "job-103",
    "title": "Director of Clinical Operations",
    "company": "Apex Health Systems",
    "companyLogoColor": "bg-teal-600",
    "location": "Boston, MA",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Healthcare",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 195000,
    "salaryMax": 240000,
    "salaryCurrency": "USD",
    "description": "Apex Health Systems is hiring a strategic Clinical Operations Director to oversee surgical workflow optimization, patient safety metrics, and regulatory compliance across 3 metropolitan hospital centers.",
    "responsibilities": [
      "Direct operational management for acute clinical units and ambulatory surgical centers.",
      "Ensure strict conformance with Joint Commission, CMS, and Massachusetts state regulatory benchmarks.",
      "Spearhead electronic health records (EHR) digital transformation to trim physician clerical overhead.",
      "Manage an operating budget exceeding $38M and chair quarterly patient safety audits."
    ],
    "skills": [
      "Healthcare Administration",
      "Clinical Quality Improvement",
      "Epic EHR",
      "Joint Commission Standards",
      "Budgetary Leadership"
    ],
    "qualifications": [
      "Master of Health Administration (MHA), MSN, or MBA with clinical focus.",
      "8+ years progressive leadership within multi-site hospital or academic medical systems.",
      "Demonstrated achievements lowering 30-day readmissions and enhancing staff retention."
    ],
    "benefits": [
      "Tuition reimbursement for executive education",
      "Defined benefit pension plan + 403(b) retirement option",
      "Relocation assistance package for out-of-state leaders",
      "Comprehensive wellness and preventive care programs"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 9,
    "postedDate": "2026-10-16",
    "country": "United States"
  },
  {
    "id": "job-104",
    "title": "Robotics Control Systems Engineer",
    "company": "Horizon Industrial Robotics",
    "companyLogoColor": "bg-indigo-600",
    "location": "Chicago, IL",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Manufacturing",
    "experienceLevel": "Mid-level",
    "salaryMin": 130000,
    "salaryMax": 165000,
    "salaryCurrency": "USD",
    "description": "Join the Horizon Robotics engineering lab building articulated 6-axis automation arms for high-speed precision manufacturing. You will program real-time trajectory planners, inverse kinematics, and machine vision feedback loops.",
    "responsibilities": [
      "Develop real-time motion control algorithms deployed to RTOS-enabled embedded hardware.",
      "Integrate 3D LiDAR and structured-light vision cameras for sub-millimeter workpiece pick-and-place.",
      "Conduct hardware-in-the-loop (HIL) testing and mechanical stress characterization.",
      "Debug field deployments at automotive manufacturing client assembly plants."
    ],
    "skills": [
      "C++",
      "ROS / ROS 2",
      "Embedded Linux / RTOS",
      "Kinematics & Dynamics",
      "OpenCV",
      "CAN bus / EtherCAT"
    ],
    "qualifications": [
      "3+ years professional robotics or mechatronics development experience.",
      "B.S. in Robotics, Electrical Engineering, Mechanical Engineering, or Mechatronics.",
      "Hands-on experience calibrating industrial actuators and sensor suites."
    ],
    "benefits": [
      "State-of-the-art Chicago prototyping laboratory and machine shop access",
      "Stock options in high-growth robotics scale-up",
      "Full health, dental, and eye care",
      "Annual hardware home-lab stipend"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 11,
    "postedDate": "2026-10-20",
    "country": "United States"
  },
  {
    "id": "job-105",
    "title": "Head of Growth & Performance Marketing",
    "company": "Velox Commerce Global",
    "companyLogoColor": "bg-amber-600",
    "location": "Seattle, WA",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Sales & Marketing",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 175000,
    "salaryMax": 220000,
    "salaryCurrency": "USD",
    "description": "Velox Commerce is hiring an analytical growth leader to drive paid acquisition, attribution modeling, and conversion rate optimization across our North American and European direct-to-consumer portals.",
    "responsibilities": [
      "Own a monthly paid acquisition budget of $1.8M across Meta, Google Search, TikTok, and programmatic affiliate networks.",
      "Build media mix modeling (MMM) and first-party attribution dashboards to counter signal loss.",
      "Partner with creative strategy teams to run weekly multi-variant landing page experiments.",
      "Scale customer lifetime value (LTV) through lifecycle automation and SMS/email segmentation."
    ],
    "skills": [
      "Performance Marketing",
      "Attribution Modeling",
      "SQL / BigQuery",
      "Paid Social & SEM",
      "CRO Testing",
      "Google Analytics 4"
    ],
    "qualifications": [
      "7+ years managing multi-million dollar performance budgets in high-velocity e-commerce.",
      "Proven expertise scaling direct-to-consumer businesses past $50M GMV.",
      "Strong quantitative background with rigorous experimental methodology."
    ],
    "benefits": [
      "100% remote flexibility with home office setup allowance ($2,500)",
      "Quarterly performance bonuses linked to net acquisition efficiency",
      "Unlimited Paid Time Off with mandatory 3-week minimum",
      "Premium health benefits"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 22,
    "postedDate": "2026-10-17",
    "country": "United States"
  },
  {
    "id": "job-106",
    "title": "Global Supply Chain Operations Manager",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Atlanta, GA",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Logistics & Supply Chain",
    "experienceLevel": "Senior",
    "salaryMin": 145000,
    "salaryMax": 180000,
    "salaryCurrency": "USD",
    "description": "Nexus Freight is searching for an experienced Supply Chain Operations Manager to coordinate intermodal carrier negotiations, warehouse automation deployments, and international customs clearance.",
    "responsibilities": [
      "Optimize domestic intermodal lane allocations to compress transit delays and minimize demurrage charges.",
      "Manage Tier-1 3PL contractor SLA performance across 14 regional distribution hubs.",
      "Implement predictive inventory reorder triggers using supply chain ERP solutions.",
      "Lead quarterly supplier scorecards and rate contract renegotiations."
    ],
    "skills": [
      "Supply Chain Logistics",
      "Contract Negotiation",
      "TMS / WMS Software",
      "ERP (SAP/Oracle)",
      "Lean Six Sigma"
    ],
    "qualifications": [
      "5+ years leading logistics routing, carrier management, or fulfillment operations.",
      "Six Sigma Green/Black Belt or APICS CSCP certification preferred.",
      "Demonstrated track record reducing freight expenditure by 12%+"
    ],
    "benefits": [
      "Annual performance bonus (up to 20%)",
      "Company vehicle or transit allowance",
      "401(k) retirement plan with 5% match",
      "Comprehensive dental, health, and life insurance"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 7,
    "postedDate": "2026-10-15",
    "country": "United States"
  },
  {
    "id": "job-107",
    "title": "Senior Cloud Security & DevSecOps Engineer",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "Austin, TX",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Senior",
    "salaryMin": 165000,
    "salaryMax": 205000,
    "salaryCurrency": "USD",
    "description": "Fortify enterprise zero-trust cloud infrastructure. As our Senior Cloud Security Engineer, you will embed automated SAST/DAST scanners into CI/CD pipelines and configure IAM least-privilege guardrails.",
    "responsibilities": [
      "Implement policy-as-code (OPA/Terraform) and vulnerability scanning for containerized Kubernetes workloads.",
      "Conduct threat modeling workshops for novel customer-facing microservice architectures.",
      "Oversee incident triage and automated remediation via SIEM and cloud detection tooling.",
      "Maintain compliance standards for SOC2 Type II, ISO 27001, and HIPAA."
    ],
    "skills": [
      "AWS Security",
      "Terraform",
      "Kubernetes Security",
      "IAM & Zero Trust",
      "CI/CD Pipelines",
      "Trivy / Snyk"
    ],
    "qualifications": [
      "5+ years in Cloud Infrastructure Security, DevSecOps, or Security Operations.",
      "Certifications such as AWS Certified Security Specialty or CISSP are highly valued.",
      "Fluency in scripting automated compliance policies in Python or Go."
    ],
    "benefits": [
      "Full remote equipment stipend + gigabit internet subsidy",
      "Annual cybersecurity training and certification reimbursement",
      "Competitive equity options",
      "Family health and mental wellness support"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 16,
    "postedDate": "2026-10-21",
    "country": "United States"
  },
  {
    "id": "job-108",
    "title": "Hospitality Operations General Manager",
    "company": "The Grandview Collection",
    "companyLogoColor": "bg-rose-600",
    "location": "Miami, FL",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Hospitality",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 150000,
    "salaryMax": 190000,
    "salaryCurrency": "USD",
    "description": "The Grandview Collection is seeking an inspiring General Manager for our flagship 4-star boutique hotel and restaurant retreat in Miami Beach. Oversee guest satisfaction, food & beverage concepts, and team culture.",
    "responsibilities": [
      "Lead a team of 140+ hospitality associates across rooms, fine dining, and event catering.",
      "Achieve guest satisfaction ratings above 94% on verified review platforms.",
      "Drive average daily rate (ADR) and RevPAR optimization through dynamic pricing strategies.",
      "Maintain luxury service brand standards and oversee health and hospitality inspections."
    ],
    "skills": [
      "Hotel Management",
      "RevPAR Optimization",
      "Food & Beverage Operations",
      "Staff Leadership",
      "Guest Experience"
    ],
    "qualifications": [
      "7+ years senior management in boutique luxury hotels or four/five-star resorts.",
      "Degree in Hospitality Management or Business Administration.",
      "Bilingual proficiency (English & Spanish) is preferred for the South Florida market."
    ],
    "benefits": [
      "Executive incentive bonus based on RevPAR and guest delight metrics",
      "Worldwide luxury hotel stay privileges for you and your family",
      "Relocation assistance to South Florida",
      "Full healthcare and retirement package"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 8,
    "postedDate": "2026-10-14",
    "country": "United States"
  },
  {
    "id": "job-109",
    "title": "Senior E-Commerce Product Designer (UI/UX)",
    "company": "Velox Commerce Global",
    "companyLogoColor": "bg-amber-600",
    "location": "Denver, CO",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Retail & E-commerce",
    "experienceLevel": "Senior",
    "salaryMin": 140000,
    "salaryMax": 175000,
    "salaryCurrency": "USD",
    "description": "Reimagine the mobile purchasing funnel for tens of millions of global buyers. You will lead end-to-end design sprints, user testing sessions, and design system governance for modern web and mobile apps.",
    "responsibilities": [
      "Design high-converting checkout flows, personalized recommendation modules, and cart drawers.",
      "Conduct usability research, heuristic evaluations, and user interviews to eliminate friction.",
      "Maintain and expand our cohesive Figma design system in sync with frontend engineering.",
      "Collaborate closely with product managers and engineers on iterative feature releases."
    ],
    "skills": [
      "Figma",
      "Design Systems",
      "Mobile-First UX",
      "User Research",
      "Prototyping",
      "E-commerce Conversion"
    ],
    "qualifications": [
      "5+ years designing transactional consumer or e-commerce web/mobile applications.",
      "Exceptional portfolio displaying typographic rigor, systematic component architecture, and measurable outcomes.",
      "Ability to articulate design trade-offs with cross-functional stakeholders."
    ],
    "benefits": [
      "Generous hardware allowance (Apple MacBook Pro + dual 4K monitors)",
      "Flexible hybrid office schedule in Denver",
      "401(k) with 5% match",
      "Annual wellness and fitness subsidy"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 27,
    "postedDate": "2026-10-21",
    "country": "United States"
  },
  {
    "id": "job-110",
    "title": "Fintech Compliance & AML Officer",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "New York, NY",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Mid-level",
    "salaryMin": 125000,
    "salaryMax": 155000,
    "salaryCurrency": "USD",
    "description": "Execute regulatory risk audits and Anti-Money Laundering (AML) monitoring across digital securities and high-value transactional accounts. Partner with legal counsel to respond to regulatory inquiries.",
    "responsibilities": [
      "Monitor suspicious activity reports (SARs) and ensure strict compliance with FinCEN and BSA directives.",
      "Perform enhanced due diligence (EDD) reviews on high-net-worth institutional onboarding accounts.",
      "Conduct annual compliance audits and formulate recommendations for operational improvements.",
      "Train newly onboarded associates on regulatory adherence and fraud red flags."
    ],
    "skills": [
      "AML / KYC",
      "FinCEN / BSA Compliance",
      "Transaction Monitoring",
      "Regulatory Auditing",
      "ACAMS Certified preferred"
    ],
    "qualifications": [
      "3+ years compliance or risk experience within financial institutions or regulated fintechs.",
      "CAMS or relevant AML compliance certification is a strong plus.",
      "Strong investigative discernment and clear written documentation."
    ],
    "benefits": [
      "Comprehensive institutional healthcare and dental plans",
      "Subsidized corporate transit pass and gym membership",
      "Generous tuition funding for legal and compliance certifications",
      "Hybrid schedule (3 days office, 2 days remote)"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 13,
    "postedDate": "2026-10-13",
    "country": "United States"
  },
  {
    "id": "job-111",
    "title": "Junior Frontend Developer (React & TypeScript)",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "San Francisco, CA",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Entry-level",
    "salaryMin": 95000,
    "salaryMax": 120000,
    "salaryCurrency": "USD",
    "description": "Kickstart your engineering career with Vertex Dynamics! You will work alongside staff engineers building high-performance customer dashboard interfaces in React 19, TypeScript, and modern CSS frameworks.",
    "responsibilities": [
      "Build reusable, accessible UI components adhering to WCAG 2.1 AA specifications.",
      "Implement real-time dashboard widgets consuming REST and WebSocket streaming endpoints.",
      "Write comprehensive unit tests with Vitest / Testing Library to maintain 85%+ coverage.",
      "Participate actively in code reviews and sprint planning sessions."
    ],
    "skills": [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Git",
      "REST APIs",
      "Unit Testing"
    ],
    "qualifications": [
      "1-2 years of software development experience or strong graduation project portfolio.",
      "Solid command of modern ECMAScript standards and component-driven architecture.",
      "Hunger to learn distributed systems fundamentals and cloud development."
    ],
    "benefits": [
      "Dedicated senior engineer mentorship program and career development ladder",
      "100% remote anywhere in the US",
      "Equipment stipend including laptop and desk setup",
      "Annual education budget"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 42,
    "postedDate": "2026-10-22",
    "country": "United States"
  },
  {
    "id": "job-112",
    "title": "Industrial Supply Chain Procurement Specialist",
    "company": "Horizon Industrial Robotics",
    "companyLogoColor": "bg-indigo-600",
    "location": "Chicago, IL",
    "workplaceType": "On-site",
    "employmentType": "Contract",
    "industry": "Manufacturing",
    "experienceLevel": "Mid-level",
    "salaryMin": 90000,
    "salaryMax": 115000,
    "salaryCurrency": "USD",
    "description": "We are hiring a contract Procurement Specialist for a 12-month engagement to source specialized servo motors, harmonic drives, and precision electronic components for high-volume automated manufacturing runs.",
    "responsibilities": [
      "Negotiate terms with domestic and overseas suppliers for machined robotic components.",
      "Track bill-of-materials (BOM) cost variances and mitigate lead-time bottlenecks.",
      "Audit supplier quality and incoming shipment verification reports.",
      "Establish secondary supplier contingencies to insulate production schedules."
    ],
    "skills": [
      "Procurement",
      "BOM Costing",
      "Supplier Negotiation",
      "ERP / MRP Systems",
      "Contract Management"
    ],
    "qualifications": [
      "3+ years procurement or strategic sourcing experience in manufacturing or electronics.",
      "Familiarity with electro-mechanical manufacturing parts and supply cycles.",
      "Strong negotiation abilities and analytical spreadsheet proficiency."
    ],
    "benefits": [
      "Competitive hourly / contract rate with potential for permanent conversion",
      "Overtime eligibility",
      "Subsidized healthcare plan available during contract tenure",
      "Free catered lunch at the Chicago assembly facility"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 5,
    "postedDate": "2026-10-12",
    "country": "United States"
  },
  {
    "id": "job-113",
    "title": "Managing Director – European Private Equity & M&A",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "London, United Kingdom",
    "country": "United Kingdom",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 240000,
    "salaryMax": 320000,
    "salaryCurrency": "GBP",
    "description": "Lead our London Mayfair investment banking and private equity origination practice across EMEA mid-market buyouts, strategic cross-border divestitures, and sovereign debt financing.",
    "responsibilities": [
      "Direct cross-border sponsor coverage across UK and Western Europe.",
      "Originate and lead execution of complex LBO transactions from £200M to £1.5B enterprise value.",
      "Manage client relationships with sovereign wealth funds and institutional family offices.",
      "Chair investment committee presentations and supervise London analyst pods."
    ],
    "skills": [
      "M&A Advisory",
      "Private Equity",
      "LBO Modeling",
      "Sponsor Coverage",
      "Cross-Border Transactions",
      "EMEA Regulations"
    ],
    "qualifications": [
      "12+ years experience in bulge-bracket investment banking or top-tier private equity.",
      "Proven transaction track record closing tier-one EMEA corporate acquisitions.",
      "MBA from top business school or ACA / CFA qualified."
    ],
    "benefits": [
      "Generous executive carry participation and discretionary annual bonus",
      "Private medical insurance (BUPA Premier)",
      "Central London executive office with dining club privileges",
      "Car allowance and pension contribution"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 18,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-114",
    "title": "Chief AI Research Officer",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "London, United Kingdom",
    "country": "United Kingdom",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 220000,
    "salaryMax": 285000,
    "salaryCurrency": "GBP",
    "description": "Spearhead our London AI Research Lab developing proprietary multi-modal foundation models, autonomic agent orchestration, and mathematically verifiable reasoning systems.",
    "responsibilities": [
      "Drive pioneering research in large-scale transformer architectures and RLHF.",
      "Establish research partnerships with Cambridge, Oxford, and UCL computer science departments.",
      "Lead a world-class team of 25+ PhD AI researchers and research engineers.",
      "Publish core breakthroughs in NeurIPS, ICML, and ICLR."
    ],
    "skills": [
      "PyTorch",
      "Foundation Models",
      "Distributed Training (Megatron/DeepSpeed)",
      "Agent Architectures",
      "CUDA / Triton",
      "Reinforcement Learning"
    ],
    "qualifications": [
      "Ph.D. in Computer Science, Machine Learning, or Computational Physics.",
      "Recognized international publication record in top AI conferences.",
      "Prior leadership in a premier AI lab or hyperscaler."
    ],
    "benefits": [
      "Significant equity stake in Vertex Dynamics AI division",
      "Supercomputing cluster compute allowance (thousands of H100s/B200s)",
      "King's Cross London tech campus with private chef",
      "Unlimited personal travel and sabbatical allowances"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 24,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-115",
    "title": "VP of Autonomous Robotics & Embedded Systems",
    "company": "Horizon Industrial Robotics",
    "companyLogoColor": "bg-indigo-600",
    "location": "Berlin, Germany",
    "country": "Germany",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Manufacturing",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 165000,
    "salaryMax": 215000,
    "salaryCurrency": "EUR",
    "description": "Direct Horizon's European R&D hub in Berlin-Adlershof engineering high-speed tactile feedback robotic arms for German automotive and aerospace clients.",
    "responsibilities": [
      "Oversee multidisciplinary engineering teams across mechatronics, motion planning, and safety-critical RTOS.",
      "Lead customer co-development programs with BMW, Audi, and Airbus manufacturing labs.",
      "Ensure CE compliance and ISO 10218 robotic safety certification across Europe.",
      "Drive European supplier partnerships and precision hardware sourcing."
    ],
    "skills": [
      "Robotics Systems",
      "ROS 2",
      "Embedded C++",
      "Safety Certifications (ISO 10218)",
      "Automotive Manufacturing",
      "German / English bilingual"
    ],
    "qualifications": [
      "Diplom / Master's or Dr.-Ing. in Mechatronics, Robotics, or Electrical Engineering.",
      "8+ years leading precision automation or robotics deployment in Europe.",
      "Demonstrated industrial product delivery."
    ],
    "benefits": [
      "German standard 30 vacation days + pension scheme (bAV)",
      "Company electric vehicle (Porsche Taycan / Audi e-tron)",
      "Relocation package to Berlin",
      "Annual technology learning budget"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 12,
    "postedDate": "2026-10-19"
  },
  {
    "id": "job-116",
    "title": "Head of EMEA Financial Risk & Quantitative Allocation",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "Frankfurt, Germany",
    "country": "Germany",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 180000,
    "salaryMax": 230000,
    "salaryCurrency": "EUR",
    "description": "Supervise regulatory capital adequacy and multi-asset quantitative risk for Meridian's European entities under ECB and BaFin supervisory frameworks in Frankfurt's banking district.",
    "responsibilities": [
      "Direct Basel IV and CRR III capital requirement stress testing.",
      "Coordinate statutory reporting and risk dialogue with Bundesbank and ECB officials.",
      "Calibrate liquidity coverage ratio (LCR) and net stable funding ratio (NSFR) models.",
      "Advise European Managing Board on macroeconomic volatility hedging."
    ],
    "skills": [
      "Risk Management",
      "Basel IV / CRR",
      "ECB Supervisory Dialogue",
      "Quantitative Finance",
      "Python",
      "Stochastic Modeling"
    ],
    "qualifications": [
      "10+ years in financial risk at an international bank or supervisory agency.",
      "Deep familiarity with German and EU banking laws (KWG, MaRisk, CRR).",
      "Master's or PhD in Economics, Quantitative Finance, or Mathematics."
    ],
    "benefits": [
      "Competitive performance bonus pool",
      "Frankfurt Westend corporate apartment support for first 6 months",
      "Public transport Ticket Deutschland",
      "Pension plan matching up to 8%"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 7,
    "postedDate": "2026-10-18"
  },
  {
    "id": "job-117",
    "title": "Principal Cloud Architect – Enterprise Platforms",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "Toronto, ON, Canada",
    "country": "Canada",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 195000,
    "salaryMax": 245000,
    "salaryCurrency": "CAD",
    "description": "Lead the Canadian engineering organization at Vertex Dynamics, designing multi-tenant enterprise data mesh and hybrid cloud foundations for tier-1 financial and telecommunications clients.",
    "responsibilities": [
      "Design resilient microservice architectures on AWS and Google Cloud.",
      "Scale event-driven streaming topologies to 500,000+ operations/second.",
      "Mentor 40+ Canadian software engineers and team leads.",
      "Drive DevSecOps compliance and Canadian data sovereignty (PIPEDA) compliance."
    ],
    "skills": [
      "AWS / GCP",
      "Kubernetes",
      "Event Streaming",
      "Microservices",
      "Terraform",
      "Go / TypeScript"
    ],
    "qualifications": [
      "8+ years in cloud software engineering with at least 3 years in principal architecture.",
      "B.S. or M.S. in Computer Science or equivalent.",
      "Track record scaling mission-critical platforms."
    ],
    "benefits": [
      "Comprehensive Canadian extended health, dental, and vision",
      "RRSP matching program up to 7%",
      "Toronto Financial District modern office + flexible hybrid work",
      ",500 annual personal development grant"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 16,
    "postedDate": "2026-10-20"
  },
  {
    "id": "job-118",
    "title": "Director of Digital Commerce & Supply Optimization",
    "company": "Velox Commerce Global",
    "companyLogoColor": "bg-amber-600",
    "location": "Vancouver, BC, Canada",
    "country": "Canada",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Retail & E-commerce",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 175000,
    "salaryMax": 215000,
    "salaryCurrency": "CAD",
    "description": "Lead digital omnichannel merchandising and AI-driven cross-border fulfillment algorithms across North American and Pacific Rim customer segments.",
    "responsibilities": [
      "Formulate pricing optimization strategies across 12 international consumer store portals.",
      "Manage a cross-functional squad of data scientists and product analysts.",
      "Reduce cross-border customs delivery times by 25% through localized fulfillment nodes.",
      "Collaborate with global marketing teams on multi-currency conversion."
    ],
    "skills": [
      "E-commerce Strategy",
      "Supply Optimization",
      "Pricing Algorithms",
      "SQL / Tableau",
      "Cross-Border Logistics"
    ],
    "qualifications": [
      "6+ years leadership in high-velocity digital retail or logistics tech.",
      "Strong analytical acumen and experience with large customer datasets.",
      "Proven revenue growth impact."
    ],
    "benefits": [
      "100% remote work anywhere in Canada",
      "Home office wellness budget (,000)",
      "Stock options package",
      "4 weeks paid annual vacation"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 11,
    "postedDate": "2026-10-17"
  },
  {
    "id": "job-119",
    "title": "Executive Vice President – Global Infrastructure",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Dubai, United Arab Emirates",
    "country": "United Arab Emirates",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Logistics & Supply Chain",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 230000,
    "salaryMax": 290000,
    "salaryCurrency": "USD",
    "description": "Direct Nexus Freight's Middle East & North Africa hub based in Dubai Logistics City (DWC). Oversee automated sea-air intermodal corridors, customs digitization, and commercial carrier partnerships.",
    "responsibilities": [
      "Drive multi-million ton freight movement through Jebel Ali port and Dubai South air hub.",
      "Negotiate bilateral shipping agreements with major Gulf and East Asian carriers.",
      "Supervise modern automated warehousing deployments across 850,000 sq ft.",
      "Partner with UAE customs authorities on blockchain bill-of-lading initiatives."
    ],
    "skills": [
      "Intermodal Logistics",
      "Port Operations",
      "Supply Chain Architecture",
      "Government & Carrier Relations",
      "MENA Trade Corridor"
    ],
    "qualifications": [
      "12+ years in international logistics and port terminal operations.",
      "Demonstrated executive leadership in the GCC or Asia-Europe trade lanes.",
      "Degree in Supply Chain Management, Engineering, or Maritime Law."
    ],
    "benefits": [
      "100% Tax-Free UAE salary package",
      "Executive villa housing allowance + annual family business-class flights",
      "International private health insurance (worldwide coverage)",
      "Company luxury vehicle with driver allowance"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 21,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-120",
    "title": "Head of Asia-Pacific Quantitative Trading",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "Singapore",
    "country": "Singapore",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 280000,
    "salaryMax": 360000,
    "salaryCurrency": "SGD",
    "description": "Anchor Meridian Capital's APAC algorithmic trading desk at Marina Bay Financial Centre. Architect ultra-low-latency electronic execution strategies across SGX, HKEX, and Tokyo Stock Exchange.",
    "responsibilities": [
      "Manage regional P&L across systematic equity stat-arb and volatility surface arbitrage.",
      "Partner with FPGA hardware engineers on co-located exchange colocation infrastructure.",
      "Ensure compliance with Monetary Authority of Singapore (MAS) market conduct requirements.",
      "Recruit and mentor senior quantitative researchers and algorithmic traders."
    ],
    "skills": [
      "Quantitative Trading",
      "Low Latency C++",
      "APAC Equities / Futures",
      "MAS Compliance",
      "Market Microstructure"
    ],
    "qualifications": [
      "7+ years running profitable quantitative books with Sharpe > 2.5.",
      "Ph.D. or Master's in Computer Science, Applied Mathematics, or Physics.",
      "Deep knowledge of Asian exchange protocols (OMEx, ITCH/OUCH)."
    ],
    "benefits": [
      "Exceptional formulaic performance profit share bonus",
      "Marina Bay premium office with panoramic harbor views",
      "Comprehensive family medical and dental insurance",
      "Relocation and Singapore Employment Pass assistance"
    ],
    "status": "Active",
    "featured": true,
    "applicantsCount": 25,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-121",
    "title": "Director of Renewable Energy Supply Chain",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Sydney, Australia",
    "country": "Australia",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Logistics & Supply Chain",
    "experienceLevel": "Senior",
    "salaryMin": 210000,
    "salaryMax": 260000,
    "salaryCurrency": "AUD",
    "description": "Oversee specialized heavy-haul logistics and supply procurement for utility-scale solar and offshore wind farms across New South Wales and Victoria.",
    "responsibilities": [
      "Engineer heavy-lift transit plans for wind turbine blades and massive sub-station transformers.",
      "Manage carrier safety compliance adhering to Australian Heavy Vehicle National Law.",
      "Negotiate port handling tariffs with Port Kembla and Port of Brisbane.",
      "Coordinate multi-stakeholder government transport approvals."
    ],
    "skills": [
      "Heavy Haul Logistics",
      "Renewable Energy Projects",
      "Contract Negotiations",
      "Safety Compliance",
      "Project Cargo"
    ],
    "qualifications": [
      "7+ years managing heavy industrial or project cargo logistics in Australia.",
      "Relevant engineering or logistics degree.",
      "Outstanding stakeholder communication."
    ],
    "benefits": [
      "Generous superannuation contribution (11.5% + company top-up)",
      "Barangaroo Sydney waterfront office access",
      "Annual project completion bonus",
      "Health and wellness reimbursement"
    ],
    "status": "Active",
    "featured": false,
    "applicantsCount": 8,
    "postedDate": "2026-10-16"
  },
  {
    "id": "job-122",
    "title": "Senior Quantitative Strategist – High-Frequency Trading",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "London, United Kingdom",
    "country": "United Kingdom",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Senior",
    "salaryMin": 190000,
    "salaryMax": 245000,
    "salaryCurrency": "GBP",
    "description": "Design and optimize statistical arbitrage and low-latency algorithmic trading models for European and US equity derivative markets.",
    "responsibilities": [
      "Develop tick-by-tick predictive alpha signals using stochastic calculus and machine learning.",
      "Backtest high-frequency execution strategies against historic L2 order-book dynamics.",
      "Work with C++ core architects to minimize latency budgets down to single-digit microseconds."
    ],
    "skills": ["C++", "Python", "Quantitative Research", "Statistical Arbitrage", "Market Microstructure"],
    "qualifications": ["M.S. or Ph.D. in Physics, Mathematics, Financial Engineering, or Computer Science.", "4+ years quantitative research experience at a premier trading firm or hedge fund."],
    "benefits": ["Highly competitive performance bonus pool", "Private medical and dental care", "Central London Mayfair office with bespoke catering"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 11,
    "postedDate": "2026-10-19"
  },
  {
    "id": "job-123",
    "title": "Enterprise Fintech Product Director",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "London, United Kingdom",
    "country": "United Kingdom",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 165000,
    "salaryMax": 215000,
    "salaryCurrency": "GBP",
    "description": "Direct the multi-jurisdiction product vision for Vertex Dynamics' cross-border corporate payments and institutional liquidity gateway across the UK & EU.",
    "responsibilities": [
      "Set multi-year product roadmap for Tier-1 corporate treasury clients.",
      "Ensure FCA and European banking compliance across ISO 20022 messaging rails.",
      "Lead cross-functional squad of 18 engineers, designers, and compliance officers."
    ],
    "skills": ["Product Strategy", "Fintech Rails", "Cross-Border Payments", "FCA Regulations", "API Architecture"],
    "qualifications": ["8+ years in product management with at least 3 years at Director or Group PM level in fintech."],
    "benefits": ["Generous equity participation", "Flexible hybrid schedule (2 days London office)", "Comprehensive pension scheme with 8% match"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 16,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-124",
    "title": "Lead Industrial Automation Architect",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Munich, Germany",
    "country": "Germany",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Manufacturing",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 140000,
    "salaryMax": 185000,
    "salaryCurrency": "EUR",
    "description": "Lead the electrical and kinematic systems architecture for next-generation automated assembly cells deployed in high-precision automotive and clean-room factories.",
    "responsibilities": [
      "Design safety-critical PLC and SCADA architectures compliant with ISO 13849 PL-e standards.",
      "Harmonize collaborative robotics with machine vision quality inspection cameras.",
      "Serve as chief technical liaison to German automotive OEM customers."
    ],
    "skills": ["Siemens TIA Portal", "Beckhoff TwinCAT", "Industrial Robotics", "SCADA", "Safety Systems"],
    "qualifications": ["Degree in Mechatronics or Electrical Engineering.", "7+ years designing automated manufacturing or robotic systems in DACH region."],
    "benefits": ["30 days paid vacation", "Company car lease subsidy or public transport ticket", "German language training support"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 9,
    "postedDate": "2026-10-20"
  },
  {
    "id": "job-125",
    "title": "Senior Machine Learning Engineer (Computer Vision)",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "Toronto, ON, Canada",
    "country": "Canada",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Senior",
    "salaryMin": 160000,
    "salaryMax": 205000,
    "salaryCurrency": "CAD",
    "description": "Engineer deep-learning visual anomaly detection models deployed on edge devices and high-throughput cloud inferencing clusters for automated quality inspection.",
    "responsibilities": [
      "Train and quantize vision transformers and convolutional neural networks with PyTorch and TensorRT.",
      "Deploy inference microservices on Kubernetes clusters processing over 50,000 image frames per minute.",
      "Maintain active CI/CD model evaluation benchmarks against drift and edge cases."
    ],
    "skills": ["PyTorch", "Computer Vision", "TensorRT / ONNX", "Docker / Kubernetes", "Python / C++"],
    "qualifications": ["M.S. or B.S. in Computer Science, Machine Learning, or related field.", "4+ years engineering production deep learning models."],
    "benefits": ["Full Canadian extended health & dental benefits", "Downtown Toronto office with top-tier equipment stipend", "Generous RRSP matching"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 18,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-126",
    "title": "Senior Investment Banking Associate – M&A",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "Dubai (DIFC), United Arab Emirates",
    "country": "United Arab Emirates",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Senior",
    "salaryMin": 180000,
    "salaryMax": 240000,
    "salaryCurrency": "USD",
    "description": "Advise sovereign wealth funds, multinational conglomerates, and high-growth technology unicorns on cross-border mergers, buyouts, and strategic capital raises across the MENA region.",
    "responsibilities": [
      "Construct detailed discounted cash flow (DCF), LBO, and trading comparable financial models.",
      "Prepare confidential information memoranda (CIM) and board-level management presentations.",
      "Oversee transaction due diligence workstreams alongside international legal and accounting counsels."
    ],
    "skills": ["M&A Execution", "Financial Modeling (LBO/DCF)", "Valuation", "Due Diligence", "Client Advisory"],
    "qualifications": ["4-6 years in bulge-bracket investment banking or top-tier advisory boutique.", "Bachelors degree in Finance or Economics; CFA is a distinct advantage."],
    "benefits": ["Tax-free compensation package", "Annual executive performance bonus", "Comprehensive international healthcare + relocation support", "DIFC Gate Precinct premium office access"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 14,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-127",
    "title": "Regional Aviation & Fleet Operations Director",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Abu Dhabi, United Arab Emirates",
    "country": "United Arab Emirates",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Logistics & Supply Chain",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 220000,
    "salaryMax": 290000,
    "salaryCurrency": "USD",
    "description": "Direct all air freight charter operations, ground handling logistics, and intermodal connection hubs connecting the GCC to European and Asian air corridors.",
    "responsibilities": [
      "Manage dedicated wide-body cargo operations adhering to GCAA and ICAO aviation safety standards.",
      "Oversee cold-chain pharmaceutical and perishable transit handling facilities.",
      "Negotiate airport landing slots, fuel hedging contracts, and ground service SLA agreements."
    ],
    "skills": ["Air Cargo Management", "Aviation Operations", "Cold Chain Logistics", "Safety Compliance", "Vendor SLA Negotiations"],
    "qualifications": ["10+ years executive aviation or air freight logistics management experience.", "Proven leadership of large multi-national operational teams in the Middle East."],
    "benefits": ["Tax-free compensation structure", "Annual housing allowance + flight tickets home", "Full family private health coverage"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 7,
    "postedDate": "2026-10-18"
  },
  {
    "id": "job-128",
    "title": "Senior Blockchain & Smart Contract Security Lead",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "Marina Bay, Singapore",
    "country": "Singapore",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Senior",
    "salaryMin": 210000,
    "salaryMax": 275000,
    "salaryCurrency": "SGD",
    "description": "Lead the security auditing, threat modeling, and formal verification of institutional decentralized finance protocols and cross-chain tokenized asset vaults.",
    "responsibilities": [
      "Perform line-by-line static and dynamic bytecode audits on Solidity and Rust smart contracts.",
      "Design zero-knowledge and multi-party computation (MPC) key custody frameworks.",
      "Coordinate white-hat bounty programs and emergency circuit-breaker protocols with MAS compliance."
    ],
    "skills": ["Solidity / Rust", "Smart Contract Auditing", "EVM Internals", "Formal Verification", "Cryptographic Protocols"],
    "qualifications": ["5+ years cybersecurity experience with 3+ years dedicated to Web3/smart contract auditing.", "Track record identifying critical vulnerabilities in production DeFi protocols."],
    "benefits": ["Top-tier Singapore CPF contribution package", "Marina Bay Financial Centre prime office location", "Annual executive conference and travel grant"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 12,
    "postedDate": "2026-10-23"
  },
  {
    "id": "job-129",
    "title": "Principal Mining & Green Energy Systems Engineer",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Melbourne, Australia",
    "country": "Australia",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Manufacturing",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 195000,
    "salaryMax": 250000,
    "salaryCurrency": "AUD",
    "description": "Architect autonomous zero-emission haulage, battery-electric mining vehicle fleets, and microgrid renewable power integration for premier Australian resource operators.",
    "responsibilities": [
      "Engineer high-voltage battery storage and megawatt-scale dynamic charging topologies for heavy fleets.",
      "Integrate autonomous telemetry with remote operations command centers in Melbourne and Perth.",
      "Conduct environmental impact assessments and technical safety hazard analyses (HAZOP)."
    ],
    "skills": ["Renewable Microgrids", "High-Voltage Systems", "Autonomous Vehicles", "Mining Technology", "HAZOP"],
    "qualifications": ["Degree in Electrical, Mining, or Renewable Systems Engineering.", "8+ years delivering large-scale industrial electrification or autonomous plant systems."],
    "benefits": ["12% Superannuation fund contribution", "Melbourne CBD central office + flexible hybrid arrangements", "Comprehensive wellness & family health insurance"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 10,
    "postedDate": "2026-10-19"
  },
  {
    "id": "job-130",
    "title": "Senior Staff Full-Stack Cloud Engineer",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "Global / Distributed",
    "country": "Remote / Global",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Information Technology",
    "experienceLevel": "Senior",
    "salaryMin": 175000,
    "salaryMax": 225000,
    "salaryCurrency": "USD",
    "description": "Build high-scale, resilient micro-frontends and backend services handling mission-critical enterprise workflows for global clients across multiple cloud zones.",
    "responsibilities": [
      "Architect modular TypeScript & Go microservices deployed on Kubernetes multi-cluster infrastructure.",
      "Optimize real-time WebSocket state distribution and client caching across browser clients worldwide.",
      "Establish developer tooling, linting rules, and automated integration test pipelines."
    ],
    "skills": ["TypeScript / React", "Go / Node.js", "GraphQL / gRPC", "Kubernetes", "Distributed Systems"],
    "qualifications": ["7+ years building production full-stack web applications and cloud backends.", "Demonstrated autonomy and communication in fully distributed / remote organizations."],
    "benefits": ["100% remote work from anywhere in the world", "$3,500 home office and equipment setup budget", "Annual global company retreat (all expenses paid)"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 29,
    "postedDate": "2026-10-23"
  },
  {
    "id": "job-131",
    "title": "Clinical Telehealth Advisor & Patient Care Specialist",
    "company": "Quantis BioTherapeutics",
    "companyLogoColor": "bg-rose-600",
    "location": "Remote / Nationwide",
    "country": "United States",
    "workplaceType": "Remote",
    "employmentType": "Part-time",
    "industry": "Healthcare",
    "experienceLevel": "Mid-level",
    "salaryMin": 65000,
    "salaryMax": 95000,
    "salaryCurrency": "USD",
    "description": "Provide specialized clinical telehealth consultations, patient triage, and post-treatment monitoring for international oncology patients enrolled in digital health programs.",
    "responsibilities": [
      "Conduct virtual clinical intake reviews and patient symptom assessments.",
      "Liaise directly with attending medical oncologists to adjust supportive care protocols.",
      "Document encounter metrics within HIPAA-compliant electronic health records."
    ],
    "skills": ["Telehealth", "Clinical Nursing / BSN", "Patient Triage", "HIPAA Compliance", "Oncology Care"],
    "qualifications": ["Active RN or Nurse Practitioner license.", "3+ years clinical patient care experience with telehealth background."],
    "benefits": ["Flexible 20 hours/week schedule", "Comprehensive home workspace stipend", "Continuing medical education reimbursement"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 15,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-132",
    "title": "Developer Relations & Technical Documentation Lead",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "London, United Kingdom",
    "country": "United Kingdom",
    "workplaceType": "Hybrid",
    "employmentType": "Part-time",
    "industry": "Information Technology",
    "experienceLevel": "Mid-level",
    "salaryMin": 45000,
    "salaryMax": 65000,
    "salaryCurrency": "GBP",
    "description": "Craft exceptional API documentation, SDK quickstart guides, and developer tutorials for Vertex Dynamics open platform APIs.",
    "responsibilities": [
      "Author clear technical reference documentation and sample GitHub integration repos.",
      "Moderate developer Discord and community forum technical queries.",
      "Collaborate with core engineering squads to review upcoming API deprecations and RFCs."
    ],
    "skills": ["Technical Writing", "TypeScript / Python", "REST APIs / OpenAPI", "Markdown / Docusaurus", "Community Management"],
    "qualifications": ["2+ years technical writing or developer relations experience.", "Proven ability to write sample code and understand microservice architectures."],
    "benefits": ["2 days/week flexible hours", "London Tech City hub access", "Annual tech equipment allowance"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 18,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-133",
    "title": "Private Wealth Regulatory & Compliance Advisor",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "Toronto, ON, Canada",
    "country": "Canada",
    "workplaceType": "Hybrid",
    "employmentType": "Part-time",
    "industry": "Banking & Finance",
    "experienceLevel": "Senior",
    "salaryMin": 75000,
    "salaryMax": 110000,
    "salaryCurrency": "CAD",
    "description": "Advise high-net-worth wealth management teams on CIRO (IIROC) regulatory adherence, cross-border tax transparency, and anti-money laundering monitoring.",
    "responsibilities": [
      "Review client onboarding dossiers for PEPs and complex corporate trust structures.",
      "Audit discretionary investment mandates against client risk investment policy statements.",
      "Draft quarterly compliance advisory briefings for the Chief Compliance Officer."
    ],
    "skills": ["Wealth Management Compliance", "CIRO / OSC Regulations", "AML / KYC", "Trust Structures", "Risk Audits"],
    "qualifications": ["5+ years Canadian wealth compliance or securities legal experience.", "Canadian Securities Course (CSC) or legal qualification."],
    "benefits": ["Pro-rated corporate retirement matching", "Flexible hybrid schedule (15-20 hrs/week)", "Downtown Toronto transit pass"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 9,
    "postedDate": "2026-10-20"
  },
  {
    "id": "job-134",
    "title": "Social Media & Digital Campaign Specialist",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Remote / Worldwide",
    "country": "Remote / Global",
    "workplaceType": "Remote",
    "employmentType": "Part-time",
    "industry": "Sales & Marketing",
    "experienceLevel": "Entry-level",
    "salaryMin": 35000,
    "salaryMax": 50000,
    "salaryCurrency": "USD",
    "description": "Manage day-to-day social storytelling, technical video clips, and community interaction showcasing autonomous warehouse robotics across LinkedIn, YouTube, and X.",
    "responsibilities": [
      "Edit short-form video snippets demonstrating robotic automation deployments.",
      "Write engaging LinkedIn posts highlighting engineering milestones and client testimonials.",
      "Monitor engagement metrics and generate monthly reach analytics reports."
    ],
    "skills": ["Social Media Management", "Content Creation", "Video Editing (Premiere / CapCut)", "Copywriting", "Analytics"],
    "qualifications": ["Demonstrated passion for technology, robotics, or engineering storytelling.", "Portfolio or examples of managing social or creator accounts."],
    "benefits": ["100% remote flexibility", "Creative software subscriptions paid", "Career advancement into full-time marketing roles"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 24,
    "postedDate": "2026-10-23"
  },
  {
    "id": "job-135",
    "title": "VIP Guest Relations & Event Host Coordinator",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Dubai (Downtown), United Arab Emirates",
    "country": "United Arab Emirates",
    "workplaceType": "On-site",
    "employmentType": "Part-time",
    "industry": "Hospitality",
    "experienceLevel": "Mid-level",
    "salaryMin": 40000,
    "salaryMax": 60000,
    "salaryCurrency": "USD",
    "description": "Host ultra-high-net-worth corporate delegates and international executives visiting Dubai for executive roundtables, private summits, and luxury concierge engagements.",
    "responsibilities": [
      "Greet and escort C-level dignitaries during international summit sessions.",
      "Coordinate high-end dining, private chauffeur bookings, and bespoke itinerary requests.",
      "Ensure flawless protocol and hospitality standards adhering to regional cultural norms."
    ],
    "skills": ["VIP Concierge", "Event Hospitality", "Executive Protocol", "Multilingual Communication", "Client Care"],
    "qualifications": ["2+ years luxury hospitality, airline first-class, or high-end event experience in the UAE.", "Fluent English; Arabic, French, or Russian is a plus."],
    "benefits": ["Tax-free remuneration", "Downtown Dubai iconic location access", "Flexible event-based schedule"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 16,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-136",
    "title": "Cloud Architecture & AI Systems Summer Intern 2026",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "San Francisco, CA",
    "country": "United States",
    "workplaceType": "Hybrid",
    "employmentType": "Internship",
    "industry": "Information Technology",
    "experienceLevel": "Entry-level",
    "salaryMin": 60000,
    "salaryMax": 80000,
    "salaryCurrency": "USD",
    "description": "Join our cloud infrastructure research pod for a paid 12-week intensive summer internship designing scalable Kubernetes microservices and GenAI LLM inferencing pipelines.",
    "responsibilities": [
      "Pair-program with Principal and Staff Engineers on production Go and TypeScript services.",
      "Build automated performance benchmarking suites testing gRPC latency across cloud zones.",
      "Present an end-of-summer capstone project to executive engineering leadership."
    ],
    "skills": ["Go", "Python", "Docker / Linux", "Computer Science Fundamentals", "Data Structures"],
    "qualifications": ["Currently enrolled in B.S./M.S. in Computer Science, Software Engineering, or related discipline.", "Graduation date between Fall 2026 and Summer 2028."],
    "benefits": ["Competitive hourly stipend ($40-50/hr equivalent)", "Corporate housing subsidy in SF", "Direct mentorship and return full-time offer potential"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 42,
    "postedDate": "2026-10-23"
  },
  {
    "id": "job-137",
    "title": "Quantitative Research & Trading Analytics Intern",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "London, United Kingdom",
    "country": "United Kingdom",
    "workplaceType": "Hybrid",
    "employmentType": "Internship",
    "industry": "Banking & Finance",
    "experienceLevel": "Entry-level",
    "salaryMin": 45000,
    "salaryMax": 60000,
    "salaryCurrency": "GBP",
    "description": "Conduct deep data analysis on macroeconomic liquidity signals, equity vol surfaces, and tick-level order book anomalies alongside Senior Quantitative Portfolio Managers.",
    "responsibilities": [
      "Process terabyte-scale historical exchange market data using NumPy, Pandas, and C++.",
      "Test statistical hypotheses regarding intraday momentum and mean-reversion signals.",
      "Participate in weekly quant research seminars and algorithmic strategy reviews."
    ],
    "skills": ["Python / C++", "Linear Algebra & Statistics", "Time Series Modeling", "Jupyter", "Financial Data"],
    "qualifications": ["Pursuing degree in Mathematics, Physics, Econometrics, or Engineering.", "Strong mathematical curiosity and programming aptitude."],
    "benefits": ["Generous internship compensation (£45k-60k pro-rata)", "Mayfair London office perks + private gym access", "Direct conversion to full-time Quantitative Analyst graduate scheme"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 35,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-138",
    "title": "Bioinformatics & Computational Biology Research Intern",
    "company": "Quantis BioTherapeutics",
    "companyLogoColor": "bg-rose-600",
    "location": "Boston, MA",
    "country": "United States",
    "workplaceType": "Hybrid",
    "employmentType": "Internship",
    "industry": "Healthcare",
    "experienceLevel": "Entry-level",
    "salaryMin": 55000,
    "salaryMax": 72000,
    "salaryCurrency": "USD",
    "description": "Assist computational biologists in parsing single-cell RNA sequencing data and identifying novel oncological drug target pathways using bioinformatic pipelines.",
    "responsibilities": [
      "Execute automated Nextflow and Snakemake pipelines on AWS genomic datasets.",
      "Perform differential gene expression analysis and pathway enrichment visualizations.",
      "Collaborate with wet-lab scientists to validate computational target predictions."
    ],
    "skills": ["Python / R", "Bioinformatics", "RNA-Seq Data", "Bioconductor", "Genomics"],
    "qualifications": ["Degree progress in Bioinformatics, Computational Biology, or Biochemistry.", "Familiarity with genomic databases (NCBI, Ensembl, UniProt)."],
    "benefits": ["Hands-on biotech lab & compute cluster access", "Cambridge biotech hub networking", "Housing stipend for out-of-state students"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 28,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-139",
    "title": "Mechatronics & Industrial Robotics Engineering Intern",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Munich, Germany",
    "country": "Germany",
    "workplaceType": "On-site",
    "employmentType": "Internship",
    "industry": "Manufacturing",
    "experienceLevel": "Entry-level",
    "salaryMin": 42000,
    "salaryMax": 55000,
    "salaryCurrency": "EUR",
    "description": "Work directly on the factory assembly floor and testing labs building kinematic arms, optical sensor brackets, and firmware tests for heavy manufacturing robotics.",
    "responsibilities": [
      "Assist in CAD design modifications using SolidWorks and Siemens NX.",
      "Assemble wiring harnesses and test motor servo controllers under engineer guidance.",
      "Log cycle times and calibrate robotic end-effectors for precision repeatability."
    ],
    "skills": ["CAD (SolidWorks/NX)", "Robotics Kinematics", "Mechatronics", "Basic PLC", "Sensors & Actuators"],
    "qualifications": ["Student in Mechanical, Electrical, or Mechatronics Engineering at European university.", "Proficiency in English; conversational German is advantageous."],
    "benefits": ["Practical master/bachelor thesis sponsorship", "Munich public transit ticket included", "Subsidized corporate cafeteria"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 21,
    "postedDate": "2026-10-20"
  },
  {
    "id": "job-140",
    "title": "Global Maritime Logistics & Data Analytics Intern",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Singapore",
    "country": "Singapore",
    "workplaceType": "Hybrid",
    "employmentType": "Internship",
    "industry": "Logistics & Supply Chain",
    "experienceLevel": "Entry-level",
    "salaryMin": 42000,
    "salaryMax": 56000,
    "salaryCurrency": "SGD",
    "description": "Analyze container vessel transit bottlenecks, port berth turnaround times, and ocean freight pricing volatility across the Malacca Straits and Asian shipping corridors.",
    "responsibilities": [
      "Extract and visualize Automatic Identification System (AIS) vessel telemetry data.",
      "Build real-time supply chain dashboard widgets in Tableau and Power BI.",
      "Support trade lane managers during quarterly ocean carrier rate negotiations."
    ],
    "skills": ["SQL / Python", "Data Visualization (Tableau/Power BI)", "Maritime Logistics", "Excel Modeling", "Supply Chain"],
    "qualifications": ["Studying Supply Chain Management, Business Analytics, or Industrial Engineering.", "Analytical rigor and interest in global trade flows."],
    "benefits": ["Central Singapore office location", "Fast-track pipeline to Maritime Graduate Associate Program", "Mentorship from Global Operations Vice President"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 19,
    "postedDate": "2026-10-19"
  },
  {
    "id": "job-141",
    "title": "Interim Cloud Security & Zero-Trust Architect (6-Month Contract)",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "Remote / North America",
    "country": "United States",
    "workplaceType": "Remote",
    "employmentType": "Contract",
    "industry": "Information Technology",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 180000,
    "salaryMax": 230000,
    "salaryCurrency": "USD",
    "description": "Lead the enterprise-wide zero-trust network access (ZTNA) and identity architecture overhaul for a multi-cloud enterprise operating across AWS and GCP.",
    "responsibilities": [
      "Architect Okta / BeyondCorp zero-trust authentication policies across 4,000 corporate endpoints.",
      "Audit Kubernetes cluster RBAC, service mesh mTLS, and secrets management with HashiCorp Vault.",
      "Deliver executive board risk assessment and SOC 2 Type II audit readiness documentation."
    ],
    "skills": ["Zero-Trust Architecture", "AWS / GCP Security", "Kubernetes mTLS", "HashiCorp Vault", "SOC 2 Compliance"],
    "qualifications": ["10+ years cybersecurity experience with prior contractor/consulting track record.", "CISSP, CCSP, or AWS Certified Security Specialty."],
    "benefits": ["Lucrative hourly/day rate ($120-150/hr equivalent)", "100% remote autonomy", "Contract extension or advisory retainer potential"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 14,
    "postedDate": "2026-10-23"
  },
  {
    "id": "job-142",
    "title": "Senior React Native & Cross-Platform Mobile Consultant",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "Sydney, Australia",
    "country": "Australia",
    "workplaceType": "Hybrid",
    "employmentType": "Contract",
    "industry": "Information Technology",
    "experienceLevel": "Senior",
    "salaryMin": 160000,
    "salaryMax": 200000,
    "salaryCurrency": "AUD",
    "description": "Accelerate the launch of Vertex Dynamics new iOS and Android mobile financial portal featuring real-time biometrics, offline sync, and push notification pipelines.",
    "responsibilities": [
      "Write clean, performant React Native / TypeScript code targeting iOS and Android.",
      "Integrate native bridge modules for hardware security enclave biometric signing.",
      "Optimize bundle size and achieve smooth 60fps gesture transitions."
    ],
    "skills": ["React Native", "TypeScript", "iOS / Android Native Bridges", "State Management (Zustand/Redux)", "Mobile CI/CD"],
    "qualifications": ["5+ years mobile development experience with at least 3 years in React Native.", "Published high-traffic mobile apps in the App Store and Google Play."],
    "benefits": ["Competitive day-rate contract terms (initial 9-month term)", "Modern Sydney CBD tech hub access", "Immediate project kickoff"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 11,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-143",
    "title": "M&A Transaction Valuation & Financial Due Diligence Contractor",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "London, United Kingdom",
    "country": "United Kingdom",
    "workplaceType": "Hybrid",
    "employmentType": "Contract",
    "industry": "Banking & Finance",
    "experienceLevel": "Senior",
    "salaryMin": 135000,
    "salaryMax": 175000,
    "salaryCurrency": "GBP",
    "description": "Perform buy-side Quality of Earnings (QofE) analyses, working capital peg calculations, and debt-free cash-free purchase price adjustments for mid-market corporate acquisitions.",
    "responsibilities": [
      "Review target financial records to uncover normalized EBITDA adjustments and hidden liabilities.",
      "Draft comprehensive financial due diligence reports for investment committee review.",
      "Model post-merger synergy realization timelines and tax treaty impacts."
    ],
    "skills": ["Quality of Earnings (QofE)", "Financial Due Diligence", "EBITDA Normalization", "M&A Accounting", "Financial Modeling"],
    "qualifications": ["ACA, ACCA, or CFA qualified with Big 4 transaction services background.", "4+ years focused on private equity or corporate transaction advisory."],
    "benefits": ["Premium consulting day rate", "Mayfair office hot-desking + hybrid working", "High-profile deal exposure across UK & Western Europe"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 13,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-144",
    "title": "FDA Regulatory Submission & Biostatistical Consultant",
    "company": "Quantis BioTherapeutics",
    "companyLogoColor": "bg-rose-600",
    "location": "Remote / United States",
    "country": "United States",
    "workplaceType": "Remote",
    "employmentType": "Contract",
    "industry": "Healthcare",
    "experienceLevel": "Senior",
    "salaryMin": 150000,
    "salaryMax": 195000,
    "salaryCurrency": "USD",
    "description": "Guide the statistical design and electronic Common Technical Document (eCTD) preparation for upcoming FDA Phase III oncology clinical trial filings.",
    "responsibilities": [
      "Formulate statistical analysis plans (SAP) and survival analysis modeling for regulatory dossiers.",
      "Review CDISC SDTM and ADaM dataset compliance against FDA guidance documents.",
      "Prepare responses to FDA Type C and Pre-NDA clinical inquiries."
    ],
    "skills": ["FDA Regulatory Affairs", "Biostatistics", "CDISC SDTM / ADaM", "eCTD Submissions", "Clinical Trials"],
    "qualifications": ["Ph.D. or M.S. in Biostatistics or Regulatory Science.", "6+ years biotech/pharma experience navigating successful FDA filings."],
    "benefits": ["Flexible 12-month retainer engagement", "100% remote flexibility", "High-impact drug launch milestone bonuses"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 8,
    "postedDate": "2026-10-20"
  },
  {
    "id": "job-145",
    "title": "SAP S/4HANA Supply Chain Migration Specialist",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Frankfurt, Germany",
    "country": "Germany",
    "workplaceType": "On-site",
    "employmentType": "Contract",
    "industry": "Logistics & Supply Chain",
    "experienceLevel": "Senior",
    "salaryMin": 130000,
    "salaryMax": 170000,
    "salaryCurrency": "EUR",
    "description": "Lead the end-to-end data migration and business process cutover from legacy SAP ECC to SAP S/4HANA for continental European freight forwarding terminals.",
    "responsibilities": [
      "Configure SAP Transportation Management (TM) and Extended Warehouse Management (EWM).",
      "Coordinate master data cleansing and cutover validation across 12 European cross-dock centers.",
      "Train regional logistics operations directors on new automated booking workflows."
    ],
    "skills": ["SAP S/4HANA", "SAP TM / EWM", "Data Migration", "Supply Chain Architecture", "Process Re-engineering"],
    "qualifications": ["7+ years SAP consulting with at least 2 full-lifecycle S/4HANA implementations in logistics.", "German & English bilingual communication."],
    "benefits": ["Top European day-rate terms (12-month mandate)", "Frankfurt commercial hub office", "Travel & living allowance provided"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 10,
    "postedDate": "2026-10-18"
  },
  {
    "id": "job-146",
    "title": "Clinical Trial Operations Associate",
    "company": "Quantis BioTherapeutics",
    "companyLogoColor": "bg-rose-600",
    "location": "Toronto, ON, Canada",
    "country": "Canada",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Healthcare",
    "experienceLevel": "Entry-level",
    "salaryMin": 68000,
    "salaryMax": 85000,
    "salaryCurrency": "CAD",
    "description": "Coordinate site activation documents, patient recruitment logs, and investigational product accountability across Canadian research hospitals.",
    "responsibilities": [
      "Track clinical study master files (eTMF) ensuring GCP and Health Canada compliance.",
      "Liaise with hospital institutional review boards (IRB) for protocol amendment approvals.",
      "Assist Clinical Project Managers with investigator meeting preparations."
    ],
    "skills": ["Good Clinical Practice (GCP)", "Clinical Trial Coordination", "eTMF / CTMS", "Regulatory Compliance", "Health Canada Guidelines"],
    "qualifications": ["B.S. in Life Sciences, Pharmacology, or Health Administration.", "1-2 years clinical research experience or postgraduate clinical research certificate."],
    "benefits": ["Canadian health & wellness benefits", "Hybrid schedule (2 days office)", "Tuition assistance for clinical project management certification"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 22,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-147",
    "title": "Associate Brand & Demand Generation Specialist",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "New York, NY",
    "country": "United States",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Sales & Marketing",
    "experienceLevel": "Entry-level",
    "salaryMin": 70000,
    "salaryMax": 92000,
    "salaryCurrency": "USD",
    "description": "Execute outbound email nurturing sequences, coordinate trade show booth logistics, and qualify inbound corporate interest for enterprise industrial robotics.",
    "responsibilities": [
      "Operate HubSpot marketing automation workflows and segment executive prospect databases.",
      "Draft product one-pagers, case study summaries, and conference collateral.",
      "Coordinate executive attendee registrations for North American robotics expos."
    ],
    "skills": ["HubSpot / Salesforce", "B2B Marketing", "Lead Qualification", "Email Marketing", "Copywriting"],
    "qualifications": ["Bachelor's degree in Marketing, Business, or Communications.", "Strong written communication and eagerness to learn B2B enterprise technology sales."],
    "benefits": ["Comprehensive medical & dental coverage", "Manhattan collaborative office with rooftop lounge", "Fast-track promotion to Growth Manager within 18 months"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 26,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-148",
    "title": "E-Commerce Catalog & Merchandising Associate",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Chicago, IL",
    "country": "United States",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Retail & E-commerce",
    "experienceLevel": "Entry-level",
    "salaryMin": 65000,
    "salaryMax": 82000,
    "salaryCurrency": "USD",
    "description": "Manage digital product taxonomy, inventory replenishment triggers, and storefront optimization across global multi-brand retail commerce platforms.",
    "responsibilities": [
      "Maintain SKU data integrity, product attribute tagging, and pricing updates in Shopify Plus.",
      "Audit search conversion rates and optimize on-site product discovery filters.",
      "Collaborate with fulfillment teams to flag stock shortages and coordinate supplier reorders."
    ],
    "skills": ["Shopify Plus", "E-Commerce Merchandising", "Product Taxonomy", "Excel / VLOOKUP", "Catalog Management"],
    "qualifications": ["Bachelor's degree or 1+ year e-commerce retail operations experience.", "Detail-oriented mindset with strong quantitative aptitude."],
    "benefits": ["100% remote flexibility with home office setup grant", "401(k) matching", "Generous brand employee discount program"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 20,
    "postedDate": "2026-10-20"
  },
  {
    "id": "job-149",
    "title": "Junior Robotics Testing & Calibration Technician",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Chicago, IL",
    "country": "United States",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Manufacturing",
    "experienceLevel": "Entry-level",
    "salaryMin": 62000,
    "salaryMax": 78000,
    "salaryCurrency": "USD",
    "description": "Execute precision diagnostic routines, sensor alignment, and safety interlock inspections on production autonomous mobile robots (AMRs) prior to customer shipment.",
    "responsibilities": [
      "Calibrate LiDAR sensors, stereoscopic vision cameras, and optical encoders.",
      "Record telemetry diagnostics and log bug tickets for firmware engineering pods.",
      "Execute endurance test cycles across simulated warehouse floor obstacle courses."
    ],
    "skills": ["Hardware Diagnostics", "Sensor Calibration (LiDAR/Cameras)", "Linux CLI", "Multimeter & Oscilloscope", "Documentation"],
    "qualifications": ["Associate degree in Electronics, Robotics, or Military technical background.", "Comfortable reading electrical schematics and working in advanced hardware labs."],
    "benefits": ["Full healthcare benefits", "Overtime eligibility + shift differentials", "Career development into Lead Robotics Field Engineer"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 17,
    "postedDate": "2026-10-19"
  },
  {
    "id": "job-150",
    "title": "Healthcare Data Privacy & HIPAA Compliance Analyst",
    "company": "Quantis BioTherapeutics",
    "companyLogoColor": "bg-rose-600",
    "location": "Remote / United States",
    "country": "United States",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Healthcare",
    "experienceLevel": "Mid-level",
    "salaryMin": 105000,
    "salaryMax": 135000,
    "salaryCurrency": "USD",
    "description": "Safeguard protected health information (PHI) across cloud clinical data lakes and partner API integrations, maintaining stringent HIPAA and HITECH security standards.",
    "responsibilities": [
      "Conduct Privacy Impact Assessments (PIAs) on new clinical algorithms and cloud repositories.",
      "Investigate data access anomalies and maintain audit logs for federal compliance regulators.",
      "Lead annual HIPAA data hygiene training for all biostatistical and software staff."
    ],
    "skills": ["HIPAA / HITECH Compliance", "Health Data Privacy", "Audit Logging", "Risk Assessments", "Information Security"],
    "qualifications": ["3-5 years data privacy or compliance experience in healthcare or health-tech.", "CHPS, CIPP/US, or HCISPP certification."],
    "benefits": ["100% remote flexibility", "Generous paid time off + wellness stipend", "401(k) with 5% employer match"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 12,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-151",
    "title": "B2B Enterprise Account Executive – Mid-Market",
    "company": "Vertex Dynamics",
    "companyLogoColor": "bg-blue-600",
    "location": "New York, NY",
    "country": "United States",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Sales & Marketing",
    "experienceLevel": "Mid-level",
    "salaryMin": 120000,
    "salaryMax": 160000,
    "salaryCurrency": "USD",
    "description": "Drive mid-market software sales pipeline from qualification through contract close for Vertex Dynamics enterprise cloud infrastructure products.",
    "responsibilities": [
      "Manage end-to-end sales cycle with average deal sizes of $75k-$250k annual recurring revenue.",
      "Conduct technical discovery calls with Chief Technology Officers and VP Engineering leads.",
      "Negotiate master services agreements alongside corporate legal teams."
    ],
    "skills": ["B2B SaaS Sales", "Enterprise Quota Attainment", "Pipeline Generation", "Contract Negotiation", "MEDDPICC"],
    "qualifications": ["3-5 years quota-carrying SaaS software sales experience with demonstrated president's club track record.", "Strong enterprise relationship acumen."],
    "benefits": ["Uncapped commission structure with realistic OTE of $240,000+", "Comprehensive tier-one healthcare", "Midtown Manhattan premium office"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 27,
    "postedDate": "2026-10-23"
  },
  {
    "id": "job-152",
    "title": "D2C E-Commerce Retention & Email Marketing Manager",
    "company": "Nexus Freight Logistics",
    "companyLogoColor": "bg-slate-700",
    "location": "Denver, CO",
    "country": "United States",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Retail & E-commerce",
    "experienceLevel": "Mid-level",
    "salaryMin": 110000,
    "salaryMax": 140000,
    "salaryCurrency": "USD",
    "description": "Own subscriber customer lifecycle, repeat purchase frequency, and personalized omnichannel SMS/email marketing flows across high-volume digital direct-to-consumer storefronts.",
    "responsibilities": [
      "Architect sophisticated Klaviyo customer segmentation and dynamic automated journeys.",
      "A/B test subject lines, creative visuals, and personalized product recommendation algorithms.",
      "Partner with data science squads to reduce 90-day customer churn by over 18%."
    ],
    "skills": ["Klaviyo / Omnisend", "Email Marketing Strategy", "Customer Lifecycle / LTV", "A/B Testing", "Cohort Analytics"],
    "qualifications": ["3-6 years dedicated e-commerce retention or lifecycle marketing experience.", "Proven track record managing email revenue programs exceeding $10M annual GMV."],
    "benefits": ["100% remote working flexibility", "Annual learning & conference stipend", "Comprehensive medical, dental, and vision"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 19,
    "postedDate": "2026-10-22"
  },
  {
    "id": "job-153",
    "title": "Corporate Hotel Revenue & Yield Optimization Analyst",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Dubai (Marina), United Arab Emirates",
    "country": "United Arab Emirates",
    "workplaceType": "Hybrid",
    "employmentType": "Full-time",
    "industry": "Hospitality",
    "experienceLevel": "Mid-level",
    "salaryMin": 75000,
    "salaryMax": 105000,
    "salaryCurrency": "USD",
    "description": "Optimize dynamic RevPAR, channel distribution mix, and algorithmic room rate strategies across flagship luxury hotel properties throughout the United Arab Emirates.",
    "responsibilities": [
      "Analyze historical booking paces, local event surges, and competitor rate intelligence daily.",
      "Calibrate dynamic pricing engines across Global Distribution Systems (GDS) and OTAs.",
      "Present weekly forecast and revenue maximization recommendations to General Managers."
    ],
    "skills": ["RevPAR Maximization", "Hospitality Revenue Management", "Dynamic Pricing", "OTA / GDS Distribution", "Data Analytics"],
    "qualifications": ["3-5 years hospitality revenue management or airline yield analytics experience in GCC.", "Proficiency in IDeaS RMS, Opera PMS, or Duetto."],
    "benefits": ["100% tax-free compensation", "Annual flight ticket allowance", "Luxury accommodation discounts globally"],
    "status": "Active",
    "featured": false,
    "applicantsCount": 14,
    "postedDate": "2026-10-21"
  },
  {
    "id": "job-154",
    "title": "Global VP of Brand Strategy & Performance Marketing",
    "company": "Meridian Capital Group",
    "companyLogoColor": "bg-emerald-600",
    "location": "Global / Remote",
    "country": "Remote / Global",
    "workplaceType": "Remote",
    "employmentType": "Full-time",
    "industry": "Sales & Marketing",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 220000,
    "salaryMax": 280000,
    "salaryCurrency": "USD",
    "description": "Lead global brand repositioning, digital customer acquisition, and institutional PR for international financial and technology ventures spanning North America and Europe.",
    "responsibilities": [
      "Manage annual $25M multi-channel digital performance and institutional brand budget.",
      "Unify brand voice, global public relations, and high-profile industry event sponsorships.",
      "Direct an international team of 24 marketing specialists across London, New York, and Singapore."
    ],
    "skills": ["Global Brand Strategy", "Executive Leadership", "Performance Marketing", "Public Relations", "Marketing Mix Modeling"],
    "qualifications": ["12+ years marketing leadership with prior VP or CMO experience in financial or enterprise technology.", "Demonstrated history scaling global enterprise brand equity."],
    "benefits": ["Executive equity stock options", "Global business travel budget", "Flexible worldwide remote status"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 31,
    "postedDate": "2026-10-23"
  },
  {
    "id": "job-155",
    "title": "Managing Director of Luxury Resort & Hotel Properties",
    "company": "Apex Robotics Systems",
    "companyLogoColor": "bg-amber-600",
    "location": "Miami, FL",
    "country": "United States",
    "workplaceType": "On-site",
    "employmentType": "Full-time",
    "industry": "Hospitality",
    "experienceLevel": "Lead / Executive",
    "salaryMin": 210000,
    "salaryMax": 270000,
    "salaryCurrency": "USD",
    "description": "Direct full P&L operations, guest experience benchmarks, Michelin-caliber culinary programs, and capital expansion for premier oceanfront luxury resort properties.",
    "responsibilities": [
      "Lead 350+ operational hospitality personnel ensuring Forbes 5-Star service standards.",
      "Drive annual property revenue targets exceeding $65M across lodging, culinary, and spa verticals.",
      "Maintain active relations with luxury asset owners, municipal stakeholders, and international tour operators."
    ],
    "skills": ["Luxury Resort Operations", "P&L Management", "Forbes 5-Star Standards", "Hospitality Leadership", "Culinary & Spa Management"],
    "qualifications": ["10+ years hospitality leadership with at least 4 years as General Manager or Managing Director at 5-star properties.", "Proven track record of high guest satisfaction and profitable P&L stewardship."],
    "benefits": ["Comprehensive executive benefits and relocation package", "Annual performance incentive bonus up to 35%", "Top-tier family medical & retirement plans"],
    "status": "Active",
    "featured": true,
    "applicantsCount": 18,
    "postedDate": "2026-10-22"
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-501',
    jobId: 'job-101',
    jobTitle: 'Principal Distributed Systems Architect',
    company: 'Vertex Dynamics',
    fullName: 'David K. Hoffman',
    email: 'd.hoffman@fastmail.example',
    phone: '+1 (415) 555-0142',
    currentLocation: 'San Jose, CA',
    totalExperience: '12 years',
    resumeFileName: 'David_Hoffman_Principal_Architect_CV.pdf',
    coverLetter: 'Having spent the last 6 years leading event streaming pipelines at scale, I was thrilled to see Vertex Dynamics opening for a Principal Distributed Systems Architect. I have deep experience scaling Kafka and Raft clusters under multi-million message/sec loads.',
    status: 'Shortlisted',
    adminNotes: 'Candidate has outstanding systems architecture experience at major fintech. Scheduled for technical interview on Tuesday.',
    appliedAt: '2026-10-19T14:32:00Z',
  },
  {
    id: 'app-502',
    jobId: 'job-102',
    jobTitle: 'Senior Quantitative Risk Analyst',
    company: 'Meridian Capital Group',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@cantab.example',
    phone: '+1 (212) 555-0188',
    currentLocation: 'New York, NY',
    totalExperience: '7 years',
    resumeFileName: 'Elena_Rostova_QuantRisk_Resume.pdf',
    coverLetter: 'With a Ph.D. in Applied Mathematics and 7 years of quantitative risk experience at European asset management firms, I bring rigorous statistical modeling to stochastic yield curve analysis and derivative portfolios.',
    status: 'Reviewing',
    adminNotes: 'Strong publication record in mathematical finance. Reviewing portfolio code samples.',
    appliedAt: '2026-10-20T09:15:00Z',
  },
  {
    id: 'app-503',
    jobId: 'job-105',
    jobTitle: 'Head of Growth & Performance Marketing',
    company: 'Velox Commerce Global',
    fullName: 'Jordan Taylor',
    email: 'jordan.t@growthops.example',
    phone: '+1 (206) 555-0193',
    currentLocation: 'Seattle, WA',
    totalExperience: '8 years',
    resumeFileName: 'Jordan_Taylor_Growth_Director_Resume.pdf',
    coverLetter: 'I have scaled two consumer e-commerce brands from $10M to $65M in annual GMV while maintaining customer acquisition cost within 15% of historical baselines.',
    status: 'Hired',
    adminNotes: 'Offer extended and accepted on October 21. Onboarding commences November 15.',
    appliedAt: '2026-10-18T11:45:00Z',
  },
  {
    id: 'app-504',
    jobId: 'job-111',
    jobTitle: 'Junior Frontend Developer (React & TypeScript)',
    company: 'Vertex Dynamics',
    fullName: 'Sophia Chen',
    email: 'sophia.chen@devmail.example',
    phone: '+1 (510) 555-0176',
    currentLocation: 'Oakland, CA',
    totalExperience: '2 years',
    resumeFileName: 'Sophia_Chen_Frontend_Developer.pdf',
    coverLetter: 'I love crafting accessible, pixel-perfect user interfaces with React, TypeScript, and modern Tailwind CSS. I have built three full-stack web applications and would thrive in your mentorship culture.',
    status: 'Pending',
    adminNotes: 'Portfolio demonstrated clean clean code structure and attention to accessibility.',
    appliedAt: '2026-10-22T16:04:00Z',
  }
];

export const INITIAL_INQUIRIES: EmployerInquiry[] = [
  {
    id: 'inq-801',
    companyName: 'AeroSpace Velocity Inc.',
    contactPerson: 'Gregory Vance (VP of Talent)',
    businessEmail: 'g.vance@aerospace-velocity.example',
    phone: '+1 (310) 555-0171',
    industry: 'Manufacturing',
    numberOfPositions: '5-10 positions',
    requiredJobRoles: 'Aerospace Structural Engineers, Avionics Software Leads, CNC Specialists',
    hiringTimeline: 'Within 30 days',
    additionalRequirements: 'Candidates must possess active security clearance eligibility and aerospace manufacturing experience.',
    status: 'In Progress',
    createdAt: '2026-10-20T10:20:00Z',
  },
  {
    id: 'inq-802',
    companyName: 'Quantis BioTherapeutics',
    contactPerson: 'Dr. Sarah Lin (Chief Scientific Officer)',
    businessEmail: 'slin@quantisbio.example',
    phone: '+1 (617) 555-0133',
    industry: 'Healthcare',
    numberOfPositions: '1-3 positions',
    requiredJobRoles: 'Senior Computational Biologist, Regulatory Affairs Director',
    hiringTimeline: 'Within 60 days',
    additionalRequirements: 'Candidates need oncology clinical trial phase II/III leadership experience.',
    status: 'New',
    createdAt: '2026-10-22T08:14:00Z',
  }
];
