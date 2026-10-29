export interface CountrySection {
  code: string;
  name: string;
  flag: string;
  badge: string;
  cities: string[];
  region: string;
  mandatesCount: number;
  featuredRole: string;
  currency: string;
  currencySign: string;
  currencyName: string;
  workVisaInfo: string;
  statutoryBenefits: string;
  economicHubs: string;
  costOfLivingIndex: string;
  standardWorkHours: string;
  alias?: string[];
}

export const COUNTRY_SECTIONS: CountrySection[] = [
  {
    code: 'AZ',
    name: 'Azerbaijan',
    flag: '🇦🇿',
    badge: 'South Caucasus / Eurasia',
    cities: ['Baku', 'Ganja', 'Sumqayit'],
    region: 'Eurasia',
    mandatesCount: 1,
    featuredRole: 'Warehouse Worker – Global Activity Construction',
    currency: 'AZN',
    currencySign: '₼ (AZN)',
    currencyName: 'Azerbaijani Manat (AZN)',
    workVisaInfo: 'State Migration Service (SMS) work permit and temporary residence permit (TRP) sponsorship provided by licensed employer organizations.',
    statutoryBenefits: 'Compulsory state social insurance, employer-sponsored medical protection, 21–30 days statutory paid annual leave, PPE equipment, and transit subsidies.',
    economicHubs: 'Baku (Port of Baku / White City / Caspian Logistics Basin), Sumqayit Chemical Industrial Park, Ganja Commercial Zone.',
    costOfLivingIndex: 'Very Affordable / Low Operating Cost',
    standardWorkHours: '40 hours / week (Standard 5-day or 6-day operational shifts)',
    alias: ['Azerbaijani', 'Baku', 'Azerbaidzhan']
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    badge: 'North America',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    region: 'Americas',
    mandatesCount: 16,
    featuredRole: 'Principal Cloud Architect',
    currency: 'CAD',
    currencySign: 'C$',
    currencyName: 'Canadian Dollar (CAD)',
    workVisaInfo: 'Global Talent Stream (GTS 2-week fast-track), LMIA-supported employer work permits, and Provincial Nominee (PNP) / Express Entry PR pathways.',
    statutoryBenefits: 'Provincial public healthcare coverage, Employment Insurance (EI), Canada Pension Plan (CPP), and standard 3–4 weeks paid annual leave.',
    economicHubs: 'Toronto Bay Street Financial Core, Vancouver High-Tech Basin, Montreal AI & Gaming Cluster, Calgary Energy & Supply Corridor.',
    costOfLivingIndex: 'High Tier-One / Premium Compensation',
    standardWorkHours: '37.5 – 40 hours / week',
    alias: ['CAN', 'Ontario', 'British Columbia', 'Quebec']
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    badge: 'Oceania / Australasia',
    cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
    region: 'Asia-Pacific',
    mandatesCount: 14,
    featuredRole: 'Head of Enterprise Engineering',
    currency: 'NZD',
    currencySign: 'NZ$',
    currencyName: 'New Zealand Dollar (NZD)',
    workVisaInfo: 'Accredited Employer Work Visa (AEWV) and Green List fast-track straight-to-residence pathway for specialized engineering and healthcare roles.',
    statutoryBenefits: 'Universal healthcare through Health NZ, 4 weeks statutory paid holiday, KiwiSaver employer match (3–4%), and ACC comprehensive workplace accident cover.',
    economicHubs: 'Auckland Commercial & High-Tech Core, Wellington Digital & Policy Precinct, Christchurch Innovation & Manufacturing Basin.',
    costOfLivingIndex: 'Moderate-High / Unsurpassed Lifestyle & Work-Life Balance',
    standardWorkHours: '40 hours / week with flexible hybrid culture',
    alias: ['NZ', 'Aotearoa']
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    badge: 'Oceania',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    region: 'Asia-Pacific',
    mandatesCount: 15,
    featuredRole: 'Director of Renewable Energy Supply Chain',
    currency: 'AUD',
    currencySign: 'A$',
    currencyName: 'Australian Dollar (AUD)',
    workVisaInfo: 'Temporary Skill Shortage (TSS Subclass 482) visa, Employer Nomination Scheme (Subclass 186 PR), and Global Talent Visa (GTI) fast-tracks.',
    statutoryBenefits: '11.5% compulsory Superannuation retirement pension, Medicare universal coverage, 4 weeks paid leave + 10 personal/carer days.',
    economicHubs: 'Sydney Barangaroo / Martin Place Financial Core, Melbourne Docklands Tech Quarter, Brisbane Clean Energy Hub, Perth Resources Basin.',
    costOfLivingIndex: 'High Tier-One / Global APAC Benchmark',
    standardWorkHours: '38 hours / week',
    alias: ['AUS', 'NSW', 'Victoria', 'Queensland']
  },
  {
    code: 'RS',
    name: 'Serbia',
    flag: '🇷🇸',
    badge: 'Southeast Europe / Balkans',
    cities: ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac'],
    region: 'Europe',
    mandatesCount: 13,
    featuredRole: 'Principal Distributed Systems Architect',
    currency: 'RSD',
    currencySign: 'дин. (RSD)',
    currencyName: 'Serbian Dinar (RSD)',
    workVisaInfo: 'Single Work and Residence Permit (Jedinstvena dozvola) fast-tracked within 15 days for international engineering and executive candidates.',
    statutoryBenefits: 'Mandatory national health insurance (RFZO), state pension/disability fund (PIO), 20+ days statutory annual leave, and employer private health top-up.',
    economicHubs: 'New Belgrade Airport City IT Hub, Novi Sad Science and Technology Park, Niš Software Innovation Cluster.',
    costOfLivingIndex: 'Very Attractive / High Net-Income Retention',
    standardWorkHours: '40 hours / week',
    alias: ['Srbija', 'Serbija']
  },
  {
    code: 'SI',
    name: 'Slovenia',
    flag: '🇸🇮',
    badge: 'Central Europe / EU',
    cities: ['Ljubljana', 'Maribor', 'Kranj', 'Celje'],
    region: 'Europe',
    mandatesCount: 13,
    featuredRole: 'Senior AI Research Scientist',
    currency: 'EUR',
    currencySign: '€',
    currencyName: 'Euro (EUR)',
    workVisaInfo: 'EU Single Work and Residence Permit (Enotno dovoljenje) and EU Blue Card for specialized talent with Schengen area freedom of movement.',
    statutoryBenefits: 'Compulsory health insurance (ZZZS), annual statutory holiday allowance bonus (Regres), minimum 20 days paid leave, and meal/transit allowance.',
    economicHubs: 'Ljubljana Technology Park & BTC City Innovation Hub, Maribor High-Tech Center, Kranj Embedded Systems Cluster.',
    costOfLivingIndex: 'Moderate EU Benchmark / Exceptional Safety & Green Standards',
    standardWorkHours: '40 hours / week',
    alias: ['Slovenija']
  },
  {
    code: 'GR',
    name: 'Greece',
    flag: '🇬🇷',
    badge: 'Southern Europe / EU',
    cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion'],
    region: 'Europe',
    mandatesCount: 13,
    featuredRole: 'Director of Maritime Logistics & Operations',
    currency: 'EUR',
    currencySign: '€',
    currencyName: 'Euro (EUR)',
    workVisaInfo: 'EU Blue Card, Greek National Work Visa (Type D), and Specialized Tech/Maritime Talent residence permits with full Schengen rights.',
    statutoryBenefits: 'National health system coverage (EFKA), 14 annual monthly salary disbursements (Easter, Summer, Christmas bonuses), and 20–25 days paid vacation.',
    economicHubs: 'Athens Maroussi Tech Corridor & Piraeus Maritime Centre, Thessaloniki Innovation Zone, Patras Technology Park.',
    costOfLivingIndex: 'Moderate Mediterranean / Rich Lifestyle & Maritime Hub',
    standardWorkHours: '40 hours / week',
    alias: ['Hellas', 'Ellada']
  },
  {
    code: 'LV',
    name: 'Latvia',
    flag: '🇱🇻',
    badge: 'Baltics / EU',
    cities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava'],
    region: 'Europe',
    mandatesCount: 13,
    featuredRole: 'Senior Quantitative Risk Analyst',
    currency: 'EUR',
    currencySign: '€',
    currencyName: 'Euro (EUR)',
    workVisaInfo: 'EU Blue Card, Startup Visa, and Latvian Long-stay Visa with work rights issued via the Office of Citizenship and Migration Affairs (PMLP).',
    statutoryBenefits: 'State compulsory social insurance (VSAA), national healthcare access, minimum 4 weeks annual leave, and fully covered sickness benefits.',
    economicHubs: 'Riga Financial & High-Tech Corridor, Daugavpils Industrial Zone, Liepāja Special Economic Zone.',
    costOfLivingIndex: 'Very Favorable EU Baltic Benchmark / Rapid Digital Services',
    standardWorkHours: '40 hours / week',
    alias: ['Latvania', 'Latvija']
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    flag: '🇧🇬',
    badge: 'Southeast Europe / EU',
    cities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas'],
    region: 'Europe',
    mandatesCount: 14,
    featuredRole: 'VP of Software Engineering',
    currency: 'BGN',
    currencySign: 'лв (BGN)',
    currencyName: 'Bulgarian Lev (BGN)',
    workVisaInfo: 'EU Blue Card (extended validity up to 5 years), Single Work and Residence Permit, and Schengen-integrated talent mobility.',
    statutoryBenefits: 'National Health Insurance Fund (NHIF), pension insurance (NSSI), minimum 20 days paid leave, and common corporate private health top-ups.',
    economicHubs: 'Sofia Tech Park & Business Park Sofia, Plovdiv Trakia Economic Zone, Varna & Burgas Black Sea IT Hubs.',
    costOfLivingIndex: 'Highly Cost-Effective / 10% Flat Income Tax Leader in EU',
    standardWorkHours: '40 hours / week',
    alias: ['Bulgariya', 'Bulgaristan']
  }
];

export const getCountrySection = (countryOrLocation?: string): CountrySection | undefined => {
  if (!countryOrLocation) return undefined;
  const q = countryOrLocation.toLowerCase().trim();
  return COUNTRY_SECTIONS.find((c) => {
    if (c.name.toLowerCase() === q || c.code.toLowerCase() === q) return true;
    if (c.alias && c.alias.some((a) => a.toLowerCase() === q || q.includes(a.toLowerCase()))) return true;
    if (q.includes(c.name.toLowerCase())) return true;
    if (c.cities.some((city) => q.includes(city.toLowerCase()))) return true;
    return false;
  });
};
