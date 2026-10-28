import React, { useState, useEffect } from 'react';
import { Job, PageView } from '../types.ts';
import { api } from '../services/api.ts';
import {
  ArrowLeft,
  ArrowUpRight,
  Share2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  MapPin,
  Briefcase,
  Check,
  Sparkles,
  Bookmark,
  TrendingUp,
  Award,
  Zap,
  Users,
  ChevronRight,
  DollarSign,
  HeartHandshake,
  Calendar,
} from 'lucide-react';
import { WhatsAppIcon, shareOnWhatsApp } from '../components/WhatsAppIcon.tsx';

interface JobDetailsPageProps {
  jobId: string;
  onNavigate: (page: PageView, params?: any) => void;
  onOpenApplyModal: (job: Job) => void;
}

export const JobDetailsPage: React.FC<JobDetailsPageProps> = ({
  jobId,
  onNavigate,
  onOpenApplyModal,
}) => {
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getJobDetails(jobId);
        setJob(data.job);
        setSimilarJobs(data.similarJobs || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load position specification');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [jobId]);

  const handleWhatsApp = () => {
    if (job) shareOnWhatsApp(job);
  };

  const getCountryFlag = (country?: string, location?: string) => {
    const text = `${country || ''} ${location || ''}`.toLowerCase();
    if (text.includes('united kingdom') || text.includes('uk') || text.includes('london')) return '🇬🇧';
    if (text.includes('united states') || text.includes('usa') || text.includes('sf') || text.includes('ny') || text.includes('ca') || text.includes('tx')) return '🇺🇸';
    if (text.includes('germany') || text.includes('berlin') || text.includes('frankfurt') || text.includes('munich')) return '🇩🇪';
    if (text.includes('canada') || text.includes('toronto') || text.includes('vancouver')) return '🇨🇦';
    if (text.includes('emirates') || text.includes('uae') || text.includes('dubai')) return '🇦🇪';
    if (text.includes('singapore')) return '🇸🇬';
    if (text.includes('australia') || text.includes('sydney')) return '🇦🇺';
    if (text.includes('france') || text.includes('paris')) return '🇫🇷';
    if (text.includes('netherlands') || text.includes('amsterdam')) return '🇳🇱';
    if (text.includes('switzerland') || text.includes('zurich')) return '🇨🇭';
    if (text.includes('azerbaijan') || text.includes('azerbaijani') || text.includes('baku')) return '🇦🇿';
    return '🌐';
  };

  const formatSalary = (min: number, max: number, currency: string = 'USD') => {
    const symbol =
      currency === 'AZN' ? '₼' :
      currency === 'GBP' ? '£' :
      currency === 'EUR' ? '€' :
      currency === 'CAD' ? 'CAD $' :
      currency === 'SGD' ? 'SGD $' :
      currency === 'AUD' ? 'AUD $' : '$';
    const minK = min >= 1000 ? `${(min / 1000).toFixed(min % 1000 === 0 ? 0 : 1)}k` : min.toLocaleString();
    const maxK = max >= 1000 ? `${(max / 1000).toFixed(max % 1000 === 0 ? 0 : 1)}k` : max.toLocaleString();
    return `${symbol}${minK} – ${symbol}${maxK}${currency === 'AZN' ? ' AZN' : ''}`;
  };

  const formatMonthlyEstimate = (min: number, max: number, currency: string = 'USD') => {
    const symbol =
      currency === 'AZN' ? '₼' :
      currency === 'GBP' ? '£' :
      currency === 'EUR' ? '€' :
      currency === 'CAD' ? 'CAD $' :
      currency === 'SGD' ? 'SGD $' :
      currency === 'AUD' ? 'AUD $' : '$';
    const minM = Math.round(min / 12);
    const maxM = Math.round(max / 12);
    const minMStr = minM >= 10000 ? `${(minM / 1000).toFixed(1)}k` : minM.toLocaleString();
    const maxMStr = maxM >= 10000 ? `${(maxM / 1000).toFixed(1)}k` : maxM.toLocaleString();
    return `${symbol}${minMStr} – ${symbol}${maxMStr}${currency === 'AZN' ? ' AZN' : ''} / mo`;
  };

  if (loading) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-24 text-center">
        <div className="space-y-4 max-w-sm mx-auto p-8 border border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="inline-block w-10 h-10 border-3 border-blue-600 border-t-transparent animate-spin rounded-full" />
          <div>
            <h3 className="text-base font-bold text-slate-900">Loading Job Specification</h3>
            <p className="text-xs text-slate-500 mt-1">Retrieving direct employer mandate details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-white min-h-[70vh] py-24 px-6 text-center flex items-center justify-center">
        <div className="max-w-md mx-auto space-y-5 p-8 border border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Requisition Notice</p>
            <h2 className="text-xl font-bold text-slate-900">{error || 'This position has been filled or closed.'}</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              The employer has concluded active screening for this specific role or updated the mandate.
            </p>
          </div>
          <button
            onClick={() => onNavigate('jobs')}
            className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            Browse Other Open Positions
          </button>
        </div>
      </div>
    );
  }

  const flag = getCountryFlag(job.country, job.location);

  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* 1. TOP BREADCRUMB & UTILITY BAR */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-3 flex items-center justify-between">
          {/* Breadcrumb links */}
          <div className="flex items-center gap-2 text-xs text-slate-500 truncate mr-4">
            <button
              onClick={() => onNavigate('jobs')}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-bold shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Jobs</span>
            </button>
            <span>/</span>
            <span className="text-slate-600 truncate">{job.industry}</span>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate">{job.title}</span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isSaved
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all flex items-center justify-center"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            </button>

            <button
              onClick={() => onOpenApplyModal(job)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs"
            >
              <span>Apply Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. IMPRESSIVE EXECUTIVE HERO HEADER (PURE WHITE, HIGH CONTRAST) */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-10 lg:py-14">
          <div className="border border-slate-200 bg-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            
            {/* Top row: Company, Location, Status tags */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              
              {/* Company Info Box */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${job.companyLogoColor || 'bg-slate-900'} text-white font-bold text-xl flex items-center justify-center shadow-sm shrink-0 overflow-hidden border border-slate-100/50`}
                >
                  {job.companyLogoUrl ? (
                    <img
                      src={job.companyLogoUrl}
                      alt={job.company}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    job.company.charAt(0)
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{job.company}</h2>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      <span>Verified Partner</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-slate-700">{flag} {job.location}</span>
                    <span>•</span>
                    <span>{job.industry}</span>
                    <span>•</span>
                    <span className="text-slate-400">Req #{job.id}</span>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Actively Interviewing</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {job.workplaceType}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {job.employmentType}
                </span>
              </div>
            </div>

            {/* Middle row: Large Role Title & Immediate Details */}
            <div className="py-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {job.title}
              </h1>
              <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Bottom row: Executive Compensation Card & Primary Call to Action */}
            <div className="pt-6 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/60 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 rounded-b-3xl">
              
              {/* Compensation Summary */}
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                  <span>Published Target Compensation</span>
                </span>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">
                    per annum base
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {formatMonthlyEstimate(job.salaryMin, job.salaryMax, job.salaryCurrency)} • Comprehensive Medical &amp; Equity Incentives
                </p>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenApplyModal(job)}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group shrink-0"
                >
                  <span>Apply For This Position</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="p-3.5 border border-slate-200 hover:border-[#25D366] bg-white hover:bg-[#25D366]/10 rounded-xl transition-all shadow-xs flex items-center justify-center shrink-0"
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KEY HIGHLIGHTS BAR (4 CARDS GRID) */}
      <section className="border-b border-slate-200 bg-slate-50/50 py-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-4 border border-slate-200 bg-white rounded-2xl shadow-xs space-y-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Workplace Model</p>
              <p className="text-sm font-bold text-slate-900">{job.workplaceType}</p>
              <p className="text-xs text-slate-500">{job.location}</p>
            </div>

            <div className="p-4 border border-slate-200 bg-white rounded-2xl shadow-xs space-y-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Seniority Level</p>
              <p className="text-sm font-bold text-slate-900">{job.experienceLevel}</p>
              <p className="text-xs text-slate-500">Professional Leadership</p>
            </div>

            <div className="p-4 border border-slate-200 bg-white rounded-2xl shadow-xs space-y-1">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Industry Practice</p>
              <p className="text-sm font-bold text-slate-900 truncate">{job.industry}</p>
              <p className="text-xs text-slate-500">Direct Employer Unit</p>
            </div>

            <div className="p-4 border border-slate-200 bg-white rounded-2xl shadow-xs space-y-1">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Hiring Velocity</p>
              <p className="text-sm font-bold text-slate-900">48h SLA Review</p>
              <p className="text-xs text-slate-500">Fast Candidate Pipeline</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MAIN SPECIFICATION BODY & SIDEBAR */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: DETAILED SPECIFICATIONS (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* CARD 1: ROLE OVERVIEW & STRATEGIC MISSION */}
            <section className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">About The Opportunity</h3>
                  <p className="text-xs text-slate-500">Strategic background and role mandate</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  {job.description}
                </p>
                
                {/* Highlight callout quote */}
                <div className="bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl p-4 text-slate-800 text-xs sm:text-sm">
                  <strong className="font-bold text-blue-900 block mb-1">Key Impact Focus:</strong>
                  This mandate is central to {job.company}&apos;s expansion in {job.location}. You will report directly to executive leadership, setting foundational practices and directing high-value outcomes.
                </div>
              </div>
            </section>

            {/* CARD 2: KEY DELIVERABLES & RESPONSIBILITIES */}
            <section className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Key Responsibilities &amp; Deliverables</h3>
                  <p className="text-xs text-slate-500">What you will own and execute on a day-to-day basis</p>
                </div>
              </div>

              <div className="space-y-3">
                {job.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 border border-slate-100 bg-slate-50/60 rounded-xl hover:border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                      {resp}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CARD 3: QUALIFICATIONS & PROFILE */}
            <section className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Candidate Profile &amp; Qualifications</h3>
                  <p className="text-xs text-slate-500">Demonstrated capabilities and background required</p>
                </div>
              </div>

              {/* Qualifications Bullet List */}
              <div className="space-y-3">
                {job.qualifications.map((qual, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{qual}</span>
                  </div>
                ))}
              </div>

              {/* Skills Tags Strip */}
              {job.skills && job.skills.length > 0 && (
                <div className="pt-5 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Target Skills &amp; Domain Knowledge
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-semibold px-3 py-1.5 border border-slate-200 bg-slate-50 text-slate-800 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* CARD 4: BENEFITS & PERKS */}
            <section className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Compensation &amp; Benefits Package</h3>
                  <p className="text-xs text-slate-500">Comprehensive provisions included with this direct hire offer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {job.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-slate-200 bg-white rounded-xl shadow-2xs flex items-start gap-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                        {benefit}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        Direct employer coverage
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CARD 5: INTERVIEW PROCESS ROADMAP */}
            <section className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Application &amp; Interview Roadmap</h3>
                  <p className="text-xs text-slate-500">Transparent stages from application to offer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                
                <div className="p-4 border border-slate-200 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Step 1</span>
                  <h4 className="text-xs font-bold text-slate-900">Direct Review</h4>
                  <p className="text-[11px] text-slate-500">Resume evaluated within 24-48 hours</p>
                </div>

                <div className="p-4 border border-slate-200 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Step 2</span>
                  <h4 className="text-xs font-bold text-slate-900">Partner Screening</h4>
                  <p className="text-[11px] text-slate-500">30-min intro on goals &amp; compensation</p>
                </div>

                <div className="p-4 border border-slate-200 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Step 3</span>
                  <h4 className="text-xs font-bold text-slate-900">Employer Sessions</h4>
                  <p className="text-[11px] text-slate-500">Role deep dive &amp; team assessment</p>
                </div>

                <div className="p-4 border border-slate-200 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Step 4</span>
                  <h4 className="text-xs font-bold text-slate-900">Executive Offer</h4>
                  <p className="text-[11px] text-slate-500">Contract, benefits &amp; onboarding</p>
                </div>

              </div>
            </section>

          </div>

          {/* RIGHT SIDEBAR: STICKY APPLICATION & REQUISITION DOSSIER (4 COLS) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* SIDEBAR CARD 1: PRIMARY APPLICATION BOX */}
            <div className="border border-blue-200 bg-white rounded-2xl p-6 sm:p-7 shadow-md space-y-5 relative overflow-hidden">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Direct Search Mandate
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Ready to apply?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit your credentials directly to the hiring committee. CareerSpring coordinates your candidacy without agency friction.
                </p>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Confidential candidate handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Prompt response within 48 business hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Direct contact with hiring decision-maker</span>
                </div>
              </div>

              {/* Requisition Meta Facts */}
              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Requisition ID:</span>
                  <span className="font-bold text-slate-900">#TB-{job.id}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Date Published:</span>
                  <span className="font-semibold text-slate-800">{job.postedDate || 'Recent'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Applicants:</span>
                  <span className="font-semibold text-emerald-700">{job.applicantsCount || 14} verified applicants</span>
                </div>
              </div>

              {/* Primary Apply Button */}
              <button
                onClick={() => onOpenApplyModal(job)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Apply For This Position</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* SIDEBAR CARD 2: COMPANY DOSSIER */}
            <div className="border border-slate-200 bg-white rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  About Employer
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">{job.company}</h4>
                <p className="text-xs text-slate-500">{job.industry} • {job.location}</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700 divide-y divide-slate-100">
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Industry:</span>
                  <span className="font-semibold text-slate-900">{job.industry}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Workplace Model:</span>
                  <span className="font-semibold text-slate-900">{job.workplaceType}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-slate-900">{flag} {job.location}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Position Status:</span>
                  <span className="font-bold text-emerald-600">Active Requisition</span>
                </div>
              </div>
            </div>

            {/* SIDEBAR CARD 3: ASSIGNED TALENT LEAD */}
            <div className="border border-slate-200 bg-white rounded-2xl p-6 space-y-3.5 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                Assigned Talent Partner
              </span>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                  SJ
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Sarah Jenkins</h5>
                  <p className="text-[11px] text-slate-500">Principal Practice Partner</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">⚡ Dedicated Candidate Liaison</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Have questions regarding this mandate or compensation range? Submit your application directly to start the private review.
              </p>
            </div>

            {/* SIDEBAR CARD 4: SIMILAR OPEN POSITIONS */}
            {similarJobs && similarJobs.length > 0 && (
              <div className="border border-slate-200 bg-white rounded-2xl p-6 space-y-4 shadow-xs">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                  Related Positions
                </span>
                <div className="space-y-3 divide-y divide-slate-100">
                  {similarJobs.slice(0, 3).map((sim) => {
                    const simFlag = getCountryFlag(sim.country, sim.location);
                    return (
                      <div key={sim.id} className="pt-3 first:pt-0 space-y-1">
                        <button
                          onClick={() => onNavigate('job-details', { jobId: sim.id })}
                          className="text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors leading-snug block"
                        >
                          {sim.title}
                        </button>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{simFlag} {sim.company}</span>
                          <span className="font-bold text-slate-900">
                            {formatSalary(sim.salaryMin, sim.salaryMax, sim.salaryCurrency)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </aside>
        </div>
      </main>
    </div>
  );
};
