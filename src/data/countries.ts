export interface CountrySection {
  code: string;
  name: string;
  flag: string;
  badge: string;
  cities: string[];
  region: string;
  mandatesCount: number;
  featuredRole: string;
}

export const COUNTRY_SECTIONS: CountrySection[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    badge: 'North America',
    cities: ['New York', 'San Francisco', 'Chicago', 'Austin', 'Seattle'],
    region: 'Americas',
    mandatesCount: 8,
    featuredRole: 'Principal Distributed Systems Architect'
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    badge: 'Europe / EMEA',
    cities: ['London', 'Manchester', 'Edinburgh'],
    region: 'Europe',
    mandatesCount: 4,
    featuredRole: 'Managing Director – European Private Equity'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    badge: 'North America',
    cities: ['Toronto', 'Vancouver', 'Montreal'],
    region: 'Americas',
    mandatesCount: 3,
    featuredRole: 'Principal Cloud Architect'
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    badge: 'European Union',
    cities: ['Berlin', 'Frankfurt', 'Munich'],
    region: 'Europe',
    mandatesCount: 3,
    featuredRole: 'VP of Autonomous Robotics'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    badge: 'Middle East (GCC)',
    cities: ['Dubai (DIFC / DWC)', 'Abu Dhabi'],
    region: 'Middle East',
    mandatesCount: 3,
    featuredRole: 'EVP – Global Infrastructure'
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    badge: 'Asia-Pacific',
    cities: ['Marina Bay Financial Centre', 'CBD'],
    region: 'Asia-Pacific',
    mandatesCount: 2,
    featuredRole: 'Head of APAC Quantitative Trading'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    badge: 'Oceania',
    cities: ['Sydney', 'Melbourne', 'Brisbane'],
    region: 'Asia-Pacific',
    mandatesCount: 2,
    featuredRole: 'Director of Renewable Energy Supply Chain'
  },
  {
    code: 'GLOBAL',
    name: 'Remote / Global',
    flag: '🌐',
    badge: 'Worldwide',
    cities: ['Anywhere', 'Distributed', 'Worldwide'],
    region: 'Global',
    mandatesCount: 5,
    featuredRole: 'Head of Growth & Performance'
  }
];
