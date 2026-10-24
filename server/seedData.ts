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
