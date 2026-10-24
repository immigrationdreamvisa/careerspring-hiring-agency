import React, { useState } from 'react';
import { PageView, Job, ServiceDetail } from '../types.ts';

import {
  ArrowUpRight,
  Search,
  MapPin,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Building2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView, params?: any) => void;
  featuredJobs: Job[];
  onOpenJobDetails: (jobId: string) => void;
  onOpenApplyModal: (job: Job) => void;
  onOpenServiceModal?: (service: ServiceDetail) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  featuredJobs,
  onOpenJobDetails,
  onOpenApplyModal,
}) => {
  // 6 Curated Job Categories (Industries)
  const JOB_CATEGORIES = [
    { id: 'All', name: 'All Categories' },
    { id: 'Information Technology', name: 'Information Technology' },
    { id: 'Banking & Finance', name: 'Banking & Finance' },
    { id: 'Healthcare', name: 'Healthcare & Science' },
    { id: 'Manufacturing', name: 'Robotics & Manufacturing' },
    { id: 'Retail & E-commerce', name: 'Retail & E-Commerce' },
    { id: 'Logistics & Supply Chain', name: 'Supply Chain & Logistics' },
  ];

  // Category & search state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [jobSearchQuery, setJobSearchQuery] = useState<string>('');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');

  // Country Flag helper
  const getCountryFlag = (country?: string, location?: string) => {
    const text = `${country || ''} ${location || ''}`.toLowerCase();
    if (text.includes('united kingdom') || text.includes('uk') || text.includes('london')) return '🇬🇧';
    if (text.includes('united states') || text.includes('usa') || text.includes('sf') || text.includes('ny') || text.includes('ca') || text.includes('tx')) return '🇺🇸';
    if (text.includes('germany') || text.includes('berlin') || text.includes('frankfurt') || text.includes('munich')) return '🇩🇪';
    if (text.includes('canada') || text.includes('toronto') || text.includes('vancouver')) return '🇨🇦';
    if (text.includes('emirates') || text.includes('uae') || text.includes('dubai')) return '🇦🇪';
    if (text.includes('singapore')) return '🇸🇬';
    if (text.includes('australia') || text.includes('sydney')) return '🇦🇺';
    return '🌐';
  };

  // Currency formatted salary
  const formatSalary = (min: number, max: number, currency: string) => {
    const symbol =
      currency === 'GBP' ? '£' :
      currency === 'EUR' ? '€' :
      currency === 'CAD' ? 'CAD $' :
      currency === 'SGD' ? 'SGD $' :
      currency === 'AUD' ? 'AUD $' : '$';
    return `${symbol}${(min / 1000).toFixed(0)}k – ${symbol}${(max / 1000).toFixed(0)}k / yr`;
  };

  // Filter jobs by selected category, workplace model, and search keyword
  const filteredJobs = featuredJobs.filter((job) => {
    const matchCategory =
      selectedCategory === 'All' ? true : job.industry === selectedCategory;

    const matchWorkplace =
      selectedWorkplace === 'All' ? true : job.workplaceType === selectedWorkplace;

    let matchQuery = true;
    if (jobSearchQuery.trim()) {
      const q = jobSearchQuery.toLowerCase();
      matchQuery =
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.industry.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));
    }

    return matchCategory && matchWorkplace && matchQuery;
  });

  return (
    <div className="space-y-0 text-slate-900 bg-white">
      {/* 1. HERO SECTION — CLEAN IMPRESSIVE WHITE HERO WITH HIGH CONTRAST */}
      <section className="relative border-b border-slate-200 overflow-hidden bg-white">
        {/* Subtle decorative grid background for impressive depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Hero Details (7 columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 pr-0 lg:pr-4">


              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                  Connecting Top Talent With Extraordinary Careers.
                </h1>
                <p className="text-base sm:text-lg font-normal text-slate-600 max-w-xl leading-relaxed pt-2">
                  Browse verified job requisitions across 6 core industry disciplines. Direct employer connections, verified transparent salaries, and zero placement friction.
                </p>
              </div>

              {/* Action Buttons — Kept Centered in Middle */}
              <div className="flex flex-wrap items-center justify-center w-full gap-4 pt-3 pb-1">
                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-8 py-3.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Find Jobs</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-3.5 border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Verified Candidate Proof & Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Placed Executive"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Placed Executive"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Placed Executive"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Placed Executive"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Placed Executive"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                    <span className="font-bold text-slate-900">★★★★★</span>
                    <span className="font-extrabold text-slate-900 ml-1">4.9 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Over 2,400+ international professionals &amp; executives placed</p>
                </div>
              </div>

              {/* Verified Trust Metrics */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">55+</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Active Requisitions</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">100%</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Verified Salaries</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">98%</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Retention Rate</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase (5 columns) with Floating Image Badges */}
            <div className="lg:col-span-5 relative">
              {/* Floating Badge Top-Left: Recent Placed Candidate */}
              <div className="hidden sm:flex absolute -top-5 -left-6 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200/90 shadow-xl items-center gap-3 z-30 transform hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&h=140&q=80"
                  alt="Placed Executive"
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[11px] font-bold text-slate-900">Mandate Filled • London</p>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">VP Engineering @ Vertex Dynamics</p>
                  <p className="text-[10px] font-mono font-bold text-emerald-600">£185,000 / yr package</p>
                </div>
              </div>

              {/* Floating Badge Bottom-Right: Transparent Verified Compensation */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-xl items-center gap-3 z-30 transform hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=140&h=140&q=80"
                  alt="Marcus Vance"
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <p className="text-[11px] font-bold text-slate-900">Direct Employer Requisition</p>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">Senior Quant Lead @ Meridian</p>
                  <p className="text-[10px] font-mono font-bold text-blue-600">$245,000 Verified Compensation</p>
                </div>
              </div>

              <div className="relative border border-slate-200 bg-white p-3 sm:p-4 rounded-3xl shadow-xl">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 group">
                  {/* Executive Background Photograph */}
                  <img
                    src="/hero-dossier.jpg"
                    alt="CareerSpring Executive Leadership Boardroom"
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Refined gradient scrim for high-contrast legible typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/60 z-10" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-20 text-white">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-100">
                          MANDATE DOSSIER // 2026
                        </span>
                      </div>
                      <span className="w-2.5 h-2.5 border border-white/60 rotate-45" />
                    </div>

                    {/* Bottom Content Area */}
                    <div className="space-y-3.5">
                      <span className="text-xs tracking-[0.18em] uppercase font-bold text-blue-300 block">
                        CROSS-DISCIPLINE SEARCH
                      </span>
                      <blockquote className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                        “We place leaders who shape industries for the subsequent decade.”
                      </blockquote>
                      <p className="text-xs text-slate-300 tracking-wide pt-1">
                        Technology · Finance · Healthcare · Robotics · Retail · Logistics · Marketing · Hospitality
                      </p>

                      <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                        <span className="text-[11px] text-slate-300 font-medium">
                          Verified Leadership Pipeline
                        </span>
                        <button
                          onClick={() => onNavigate('jobs')}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-blue-300 transition-colors"
                        >
                          <span>Explore 55+ Mandates</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vertical banner text along the edge */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[9px] tracking-[0.3em] uppercase text-white/50 font-mono z-20 origin-center pointer-events-none select-none">
                    PEOPLE SHAPE EVERYTHING.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Sector Spotlight Showcase Strip */}
          <div className="mt-14 pt-10 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('jobs', { industry: 'Information Technology' })}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 aspect-[16/9] text-left shadow-xs hover:shadow-md transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                alt="Technology & AI"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">13 Requisitions</span>
                <p className="text-sm font-bold leading-tight">Technology &amp; Cloud</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('jobs', { industry: 'Banking & Finance' })}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 aspect-[16/9] text-left shadow-xs hover:shadow-md transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Banking & Capital"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">10 Requisitions</span>
                <p className="text-sm font-bold leading-tight">Banking &amp; Capital</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('jobs', { industry: 'Healthcare' })}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 aspect-[16/9] text-left shadow-xs hover:shadow-md transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare & Biotech"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">6 Requisitions</span>
                <p className="text-sm font-bold leading-tight">Healthcare &amp; Life Sciences</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('jobs', { industry: 'Manufacturing' })}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 aspect-[16/9] text-left shadow-xs hover:shadow-md transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Advanced Robotics & Manufacturing"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">7 Requisitions</span>
                <p className="text-sm font-bold leading-tight">Robotics &amp; Advanced Industry</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION BAR — CLEAN STATS & STANDARDS */}
      <section className="bg-slate-50 border-b border-slate-200 py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Direct &amp; Verified</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Every requisition is authenticated directly with hiring organizations. No ghost jobs or expired listings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Transparent Compensation</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Published salary bands and bonus structures upfront so you know exact ranges before applying.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Cross-Border Reach</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Verified roles across North America, the UK, Europe, the UAE, Singapore, and Australia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY-WISE JOB SEARCH & DISCOVERY (APNA APP STYLE EXPERIENCE) */}
      <section className="py-16 lg:py-24 px-6 sm:px-10 lg:px-14 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-xs font-sans uppercase tracking-wider text-slate-500 font-bold">
                  Curated Requisitions
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Explore Jobs by Category
              </h2>
              <p className="text-sm font-sans text-slate-600 max-w-xl mt-1">
                Browse open positions across 6 core industry disciplines. Select a category, review compensation, and apply directly.
              </p>
            </div>

            <button
              onClick={() => onNavigate('jobs', { industry: selectedCategory === 'All' ? undefined : selectedCategory })}
              className="text-xs font-sans tracking-wider uppercase text-blue-600 font-bold hover:underline flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Explore All in Directory</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Curated Category Tabs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 pt-1">
              {JOB_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count =
                  cat.id === 'All'
                    ? featuredJobs.length
                    : featuredJobs.filter((j) => j.industry === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 text-xs font-sans font-semibold rounded-lg whitespace-nowrap transition-all border flex items-center gap-2 ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search & Workplace Model Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  placeholder="Search by job title, skills (e.g. Python, Kafka, Risk), or company..."
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none focus:bg-white focus:border-slate-900 transition-colors"
                />
                {jobSearchQuery && (
                  <button
                    onClick={() => setJobSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="md:col-span-4 flex items-center gap-2">
                {['All', 'Remote', 'Hybrid', 'On-site'].map((wp) => (
                  <button
                    key={wp}
                    onClick={() => setSelectedWorkplace(wp)}
                    className={`flex-1 py-2.5 px-2 text-xs text-center border rounded-lg font-semibold transition-colors ${
                      selectedWorkplace === wp
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {wp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Cards Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {filteredJobs.map((job) => {
                const flag = getCountryFlag(job.country, job.location);
                return (
                  <div
                    key={job.id}
                    className="border border-slate-200 bg-white p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
                  >
                    {/* Top Header: Company, Location, Workplace Badge */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl ${job.companyLogoColor || 'bg-slate-900'} text-white font-sans text-base flex items-center justify-center font-bold shadow-xs`}
                          >
                            {job.company.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 truncate max-w-[180px]">
                              {job.company}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <span>{flag}</span>
                              <span className="truncate max-w-[150px]">{job.location}</span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-md">
                          {job.workplaceType}
                        </span>
                      </div>

                      {/* Job Title & Category Badge */}
                      <div>
                        <span className="text-[11px] font-semibold text-blue-600 block mb-1">
                          {job.industry}
                        </span>
                        <h3
                          onClick={() => onOpenJobDetails(job.id)}
                          className="font-bold text-lg text-slate-900 leading-snug group-hover:text-blue-600 cursor-pointer transition-colors"
                        >
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      {/* Prominent Salary Badge */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                            Compensation
                          </span>
                          <span className="text-base font-bold text-slate-900">
                            {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      </div>

                      {/* Key Skills Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="px-2 py-1 text-[11px] font-medium text-slate-400">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Metadata and Action Buttons */}
                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-slate-500">
                        {job.applicantsCount} Applicants
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenJobDetails(job.id)}
                          className="px-3.5 py-1.5 border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-xs font-bold text-slate-800 rounded-lg transition-all"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => onOpenApplyModal(job)}
                          className="px-4 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-xs"
                        >
                          <span>Apply</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-slate-200 bg-slate-50 rounded-2xl space-y-4">
              <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="space-y-1">
                <p className="font-bold text-lg text-slate-900">
                  No current openings found in this category
                </p>
                <p className="text-xs text-slate-500">
                  Try clearing your search terms or selecting another category.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setJobSearchQuery('');
                  setSelectedWorkplace('All');
                }}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                View All Categories
              </button>
            </div>
          )}

          {/* Bottom Explore Banner */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 text-xs font-sans">
            <p className="text-slate-600">
              Showing {filteredJobs.length} active opportunities in {selectedCategory === 'All' ? 'all 6 industry categories' : selectedCategory}.
            </p>
            <button
              onClick={() => onNavigate('jobs', { industry: selectedCategory === 'All' ? undefined : selectedCategory })}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Explore All Positions in Directory</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION — CAREER ADVANCEMENT */}
      <section className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400 block">
              CAREER OPPORTUNITIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Ready to take the next step in your career?
            </h2>
            <p className="text-sm font-normal text-slate-300 leading-relaxed">
              Explore curated international vacancies across North America, the UK, Europe, UAE, Singapore, and Australia with verified direct employer compensation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('jobs')}
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>Explore All Jobs</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-7 py-3.5 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors bg-slate-800/60"
            >
              <span>Contact Advisory Team</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
