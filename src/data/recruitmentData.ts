import { ServiceDetail } from '../types.ts';

export const RECRUITMENT_SERVICES: ServiceDetail[] = [
  {
    id: 'executive-search',
    title: 'Executive Search',
    iconName: 'Crown',
    shortDescription: 'Discreet board-level, Chief Executive, and C-Suite leadership appointments across North America and Europe.',
    fullOverview:
      'Our senior search partners operate under strict discretion to recruit transformational business leaders. Through forensic market mapping and proprietary leadership benchmarking, we engage high-impact executives who do not inhabit active job markets.',
    keyBenefits: [
      'Confidential board-level stakeholder representation',
      'In-depth 360-degree leadership track record referencing',
      'Customized executive compensation structuring & equity modeling',
      '12-month executive onboarding and retention stewardship',
    ],
    typicalTimeline: '4 to 6 weeks to finalist round',
    bestSuitedFor: 'CEOs, CFOs, CTOs, Chief Medical Officers, and Board Directors.',
  },
  {
    id: 'permanent-recruitment',
    title: 'Permanent Recruitment',
    iconName: 'UserCheck',
    shortDescription: 'Strategic career appointments for core senior professionals with guaranteed multi-year retention covenants.',
    fullOverview:
      'We identify, evaluate, and secure career-defining talent for foundational organizational roles. By assessing intellectual dexterity, functional mastery, and cultural velocity, we deliver appointments that compound institutional value.',
    keyBenefits: [
      'Multi-stage technical and behavioral competency evaluation',
      '180-day candidate replacement warranty',
      'Real-time sector compensation benchmarking intelligence',
      'Transparent retained and performance-aligned terms',
    ],
    typicalTimeline: '2 to 3 weeks to qualified shortlist',
    bestSuitedFor: 'Principal engineers, quant risk directors, surgical operations leads, and revenue executives.',
  },
  {
    id: 'technology-digital-talent',
    title: 'Technology & Digital Talent',
    iconName: 'Cpu',
    shortDescription: 'Dedicated technical search specialists in distributed architecture, artificial intelligence, and infrastructure.',
    fullOverview:
      'Technical leadership requires genuine technical literacy. Our specialized practice conducts architectural case studies and system design screenings before candidates reach your engineering executives, safeguarding valuable leadership bandwidth.',
    keyBenefits: [
      'Evaluations conducted by veteran technology search partners',
      'Pre-vetted pipelines across distributed systems, machine learning, and cloud security',
      'Global remote, onshore, and international relocation networks',
      'Rigorous algorithmic and system resilience assessment',
    ],
    typicalTimeline: '10 to 14 business days',
    bestSuitedFor: 'Scaling software enterprises, algorithmic trading firms, and enterprise cloud modernization programs.',
  },
  {
    id: 'contract-specialist-hiring',
    title: 'Contract & Specialist Hiring',
    iconName: 'Clock',
    shortDescription: 'Interim executives and high-caliber specialists deployed for critical transformations and advisory mandates.',
    fullOverview:
      'Deploy pre-vetted independent directors, interim executives, and technical consultants with agility. We manage compliance, regulatory frameworks, and engagement structuring so your leadership team can execute time-sensitive milestones.',
    keyBenefits: [
      'Rapid deployment within 48 to 72 hours',
      'Comprehensive contractor governance and compliance management',
      'Seamless contract-to-permanent executive transition pathways',
      'Flexible milestone and advisory retainers',
    ],
    typicalTimeline: '48 to 96 hours',
    bestSuitedFor: 'Post-acquisition integrations, regulatory audits, interim CFO/CTO needs, and urgent technical deployments.',
  },
  {
    id: 'strategic-talent-advisory',
    title: 'Strategic Talent Advisory',
    iconName: 'Compass',
    shortDescription: 'Organizational design, compensation modeling, and executive succession planning for institutional investors.',
    fullOverview:
      'Beyond recruitment, we advise leadership teams and private equity sponsors on organizational structure, talent retention covenants, executive compensation frameworks, and market talent availability ahead of major capital events.',
    keyBenefits: [
      'Executive compensation benchmarking across peer cohorts',
      'Leadership succession planning and talent gap audits',
      'Pre-acquisition human capital due diligence for PE/VC sponsors',
      'Employer brand positioning for high-demand specialized sectors',
    ],
    typicalTimeline: 'Advisory engagement / continuous counsel',
    bestSuitedFor: 'Boards of directors, venture funds, private equity firms, and enterprises preparing for public listing.',
  },
];

export interface IndustryData {
  id: string;
  name: string;
  headline: string;
  description: string;
  typicalRoles: string[];
  metrics: { label: string; value: string }[];
  accent: string;
}

export const INDUSTRIES_DATA: IndustryData[] = [
  {
    id: 'technology-software',
    name: 'Technology & Software Systems',
    headline: 'Distributed Architectures, Cloud Infrastructure & AI',
    description:
      'From principal distributed systems architects to VP Engineering leaders, we connect high-growth enterprises and established technology champions with tier-one systems architects.',
    typicalRoles: [
      'Principal Distributed Systems Architects',
      'Heads of Infrastructure & Cloud Security',
      'Staff Machine Learning & Data Engineers',
      'VP of Product & Engineering',
    ],
    metrics: [
      { label: 'Avg Time to Offer', value: '14 Days' },
      { label: 'Offer Acceptance Rate', value: '96%' },
      { label: 'Placements Last Year', value: '420+' },
    ],
    accent: '#451B27',
  },
  {
    id: 'banking-capital-markets',
    name: 'Banking & Capital Markets',
    headline: 'Quantitative Strategies, Asset Management & Private Equity',
    description:
      'We advise global investment banks, hedge funds, private credit houses, and fintech pioneers to place exceptional quantitative researchers, risk leaders, and fund managers.',
    typicalRoles: [
      'Senior Quantitative Risk Analysts & Modelers',
      'Portfolio Managers & Algorithmic Traders',
      'Chief Compliance & FinCEN Officers',
      'Managing Directors (M&A / Capital Markets)',
    ],
    metrics: [
      { label: 'Avg Compensation', value: '$285,000' },
      { label: 'First-Year Retention', value: '98%' },
      { label: 'Institutional Clients', value: '110+' },
    ],
    accent: '#451B27',
  },
  {
    id: 'healthcare-life-sciences',
    name: 'Healthcare & Life Sciences',
    headline: 'Clinical Leadership, Hospital Operations & Bio-Pharma',
    description:
      'Navigating rigorous medical credentialing and regulatory oversight to place surgical directors, clinical research vice presidents, and hospital system administrators.',
    typicalRoles: [
      'Directors of Clinical Operations',
      'Chief Medical & Nursing Officers',
      'Biotech Regulatory Affairs Vice Presidents',
      'Hospital Quality & Patient Safety Executives',
    ],
    metrics: [
      { label: 'Credentialing Rate', value: '100%' },
      { label: 'Accredited Medical Centers', value: '70+' },
      { label: 'Placements Last Year', value: '280+' },
    ],
    accent: '#451B27',
  },
  {
    id: 'manufacturing-robotics',
    name: 'Industrial Automation & Robotics',
    headline: 'Autonomous Systems, Mechatronics & Precision Plants',
    description:
      'Supporting smart factory modernizations, autonomous assembly programs, and advanced industrial equipment plants with specialized mechatronics and plant directors.',
    typicalRoles: [
      'Robotics Control Systems Engineers',
      'Plant General Managers & Operations Directors',
      'Industrial Sourcing & Procurement VPs',
      'Lean Six Sigma Black Belt Leaders',
    ],
    metrics: [
      { label: 'Safety Compliance', value: 'Zero Incident' },
      { label: 'Manufacturing Hubs', value: '45+' },
      { label: 'Avg Time to Shortlist', value: '12 Days' },
    ],
    accent: '#451B27',
  },
  {
    id: 'retail-omnichannel',
    name: 'Retail & Omnichannel Commerce',
    headline: 'Global Marketplaces, DTC Scale & Digital Brand Direction',
    description:
      'Advising high-velocity digital consumer brands on growth marketers, product design directors, e-commerce merchandising specialists, and retention strategists.',
    typicalRoles: [
      'Heads of Omnichannel Growth',
      'Senior E-Commerce UX/UI Designers',
      'Supply Chain & Demand Forecasting Leads',
      'Customer Lifetime Value Strategists',
    ],
    metrics: [
      { label: 'Avg GMV Supported', value: '$95M+' },
      { label: 'Placements Last Year', value: '310+' },
      { label: 'Client Satisfaction', value: '98%' },
    ],
    accent: '#451B27',
  },
  {
    id: 'logistics-supply-chain',
    name: 'Logistics & Global Supply Chains',
    headline: 'Multimodal Freight, Fulfillment & Cross-Border Trade',
    description:
      'Ensuring operational resilience across international shipping corridors, intermodal distribution hubs, and automated fulfillment networks.',
    typicalRoles: [
      'Global Supply Chain Operations Managers',
      'Warehouse Automation (WMS) Directors',
      'Carrier Procurement & Contract Negotiators',
      'International Trade & Customs Counsel',
    ],
    metrics: [
      { label: 'Freight Efficiency Gain', value: '16% Avg' },
      { label: 'Distribution Hubs', value: '80+' },
      { label: 'Placements Last Year', value: '240+' },
    ],
    accent: '#451B27',
  },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote:
      'CareerSpring operates with an intellectual depth rare in executive search. The Distributed Systems Architect they appointed overhauled our multi-region streaming pipelines and reduced latency by 45%.',
    author: 'Catherine Zhang',
    role: 'Chief Technology Officer',
    company: 'Vertex Dynamics',
    metric: '3-Week Executive Placement',
  },
  {
    id: 't-2',
    quote:
      'In quantitative finance, finding professionals with the right intersection of stochastic mathematics and C++ concurrency is notoriously challenging. CareerSpring delivered a vetted shortlist of exceptional caliber.',
    author: 'Jonathan Reynolds',
    role: 'Head of Quantitative Strategies',
    company: 'Meridian Capital Group',
    metric: '98% Multi-Year Retention',
  },
  {
    id: 't-3',
    quote:
      'As an executive candidate, working with CareerSpring was refreshing. My search partner spent hours understanding my career vision before matching me with a career-defining VP appointment.',
    author: 'Elena Rostova',
    role: 'Lead Quantitative Analyst',
    company: 'Former Investment Banking VP',
    metric: 'Strategic Career Elevation',
  },
];

export const HOW_IT_WORKS_EMPLOYERS = [
  {
    step: '01',
    title: 'Understand',
    description:
      'We conduct in-depth discovery sessions with your board and executive stakeholders to define the technical, cultural, and strategic parameters of the mandate.',
  },
  {
    step: '02',
    title: 'Identify',
    description:
      'Our sector partners forensic-map active and passive talent across peer institutions, discreetly engaging high-performing leaders who do not populate public job boards.',
  },
  {
    step: '03',
    title: 'Evaluate',
    description:
      'Candidates undergo structured competency assessments, behavioral evaluations, peer referencing, and compensation alignment before a calibrated dossier reaches your desk.',
  },
  {
    step: '04',
    title: 'Connect',
    description:
      'We orchestrate senior interviews, package negotiation, and post-placement executive integration, protected by our comprehensive 180-day replacement warranty.',
  },
];

export const HOW_IT_WORKS_SEEKERS = [
  {
    step: '01',
    title: 'Discover Opportunities',
    description:
      'Explore verified, confidential leadership and senior specialist vacancies across premier technology, finance, and industrial organizations.',
  },
  {
    step: '02',
    title: 'Submit Your Dossier',
    description:
      'Submit your credentials in complete confidentiality. Our search directors review your track record with careful attention to strategic career alignment.',
  },
  {
    step: '03',
    title: 'Consult With Partners',
    description:
      'Engage in a 1-on-1 advisory session with a sector practice director to discuss compensation objectives, organizational culture, and interview strategy.',
  },
  {
    step: '04',
    title: 'Secure the Mandate',
    description:
      'Receive hands-on representation through partner interviews, package structuring, and equity negotiations to finalize your next career appointment.',
  },
];
