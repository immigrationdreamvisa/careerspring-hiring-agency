import React, { useState, useEffect } from 'react';
import { Job, PageView } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  ArrowUpRight,
  Filter,
  Check,
  Briefcase,
  ChevronRight,
  X,
  Globe,
  Sparkles,
} from 'lucide-react';
import { COUNTRY_SECTIONS } from '../data/countries.ts';
import { WhatsAppIcon, shareOnWhatsApp } from '../components/WhatsAppIcon.tsx';

interface JobsPageProps {
  initialFilters?: {
    keyword?: string;
    location?: string;
    industry?: string;
  };
  onOpenJobDetails: (jobId: string) => void;
  onOpenApplyModal: (job: Job) => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({
  initialFilters,
  onOpenJobDetails,
  onOpenApplyModal,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [keyword, setKeyword] = useState(initialFilters?.keyword || '');
  const [location, setLocation] = useState(initialFilters?.location || '');
  const [industry, setIndustry] = useState(initialFilters?.industry || 'All Industries');
  const [employmentType, setEmploymentType] = useState('All Types');
  const [workplaceType, setWorkplaceType] = useState('All');
  const [experienceLevel, setExperienceLevel] = useState('All Levels');
  const [minSalary, setMinSalary] = useState(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'salary_high' | 'salary_low'>('relevance');

  const [visibleCount, setVisibleCount] = useState(10);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getJobs({
        keyword: keyword || undefined,
        location: location || undefined,
        industry: industry === 'All Industries' ? undefined : industry,
        employmentType: employmentType === 'All Types' ? undefined : employmentType,
        workplaceType: workplaceType === 'All' ? undefined : workplaceType,
        experienceLevel: experienceLevel === 'All Levels' ? undefined : experienceLevel,
        minSalary: minSalary > 0 ? minSalary : undefined,
        sort: sortBy,
      });
      setJobs(data.jobs);
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve requisitions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.location !== undefined) setLocation(initialFilters.location);
      if (initialFilters.keyword !== undefined) setKeyword(initialFilters.keyword);
      if (initialFilters.industry !== undefined) setIndustry(initialFilters.industry);
    }
  }, [initialFilters]);

  useEffect(() => {
    fetchJobs();
  }, [keyword, location, industry, employmentType, workplaceType, experienceLevel, minSalary, sortBy]);

  const handleClearFilters = () => {
    setKeyword('');
    setLocation('');
    setIndustry('All Industries');
    setEmploymentType('All Types');
    setWorkplaceType('All');
    setExperienceLevel('All Levels');
    setMinSalary(0);
    setSortBy('relevance');
  };

  const industriesList = [
    'All Industries',
    'Information Technology',
    'Banking & Finance',
    'Healthcare',
    'Manufacturing',
    'Retail & E-commerce',
    'Sales & Marketing',
    'Hospitality',
    'Logistics & Supply Chain',
  ];

  const workplaceTypesList = ['All', 'Remote', 'Hybrid', 'On-site'];
  const employmentTypesList = ['All Types', 'Full-time', 'Contract', 'Part-time', 'Internship'];
  const experienceLevelsList = ['All Levels', 'Entry-level', 'Mid-level', 'Senior', 'Lead / Executive'];

  const displayedJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Page Header */}
      <section className="border-b border-slate-200 pt-12 pb-10 px-6 lg:px-14 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Career Opportunities &amp; Executive Mandates</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Find Career Opportunities Worldwide
              </h1>
            </div>

            <p className="text-sm font-sans text-slate-600 max-w-md leading-relaxed">
              Every position listed is authenticated directly with employers. Enjoy verified compensation clarity, rapid application review, and direct representation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Search Bar Strip */}
      <section className="border-b border-slate-200 bg-slate-50 px-6 lg:px-14 py-5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Keyword Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, skill (e.g. Python, Kafka), or company..."
                className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
              />
            </div>

            {/* Location Input */}
            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, jurisdiction, or 'Remote'..."
                className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
              />
            </div>

            {/* Practice / Industry */}
            <div className="md:col-span-3">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-white border border-slate-200 px-3 py-2.5 text-xs text-slate-900 rounded-lg focus:outline-none focus:border-slate-900 transition-colors font-medium"
              >
                {industriesList.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Toggle Mobile/Desktop & Clear */}
            <div className="md:col-span-2 flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="flex-1 lg:hidden flex items-center justify-center gap-2 border border-slate-200 bg-white py-2.5 rounded-lg text-xs font-bold text-slate-800"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>Filters</span>
              </button>

              <button
                onClick={handleClearFilters}
                title="Reset all criteria"
                className="p-2.5 border border-slate-200 bg-white hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Country Filter Pills Row */}
      <section className="bg-white border-b border-slate-200 px-6 lg:px-14 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span className="text-xs font-sans uppercase tracking-wider text-slate-500 font-bold whitespace-nowrap flex items-center gap-1.5 mr-2">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Country:</span>
          </span>
          <button
            onClick={() => setLocation('')}
            className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors border font-semibold ${
              !location
                ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            All Countries
          </button>
          {COUNTRY_SECTIONS.map((c) => {
            const isMatch =
              location.toLowerCase() === c.name.toLowerCase() ||
              (c.name === 'Remote / Global' && location.toLowerCase() === 'remote');
            return (
              <button
                key={c.code}
                onClick={() => setLocation(c.name === 'Remote / Global' ? 'Remote' : c.name)}
                className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors border flex items-center gap-1.5 font-semibold ${
                  isMatch
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
                <span className="text-[10px] opacity-75">({c.mandatesCount})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Directory Content Area */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-base text-slate-900">
                Refine Search
              </span>
              {(keyword || location || industry !== 'All Industries' || employmentType !== 'All Types' || workplaceType !== 'All' || experienceLevel !== 'All Levels' || minSalary > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Workplace Model */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Workplace Type
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {workplaceTypesList.map((wp) => (
                  <button
                    key={wp}
                    onClick={() => setWorkplaceType(wp)}
                    className={`py-2 px-3 text-xs text-left border rounded-lg transition-colors font-semibold ${
                      workplaceType === wp
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {wp}
                  </button>
                ))}
              </div>
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Engagement Model
              </label>
              <div className="space-y-1.5">
                {employmentTypesList.map((emp) => (
                  <button
                    key={emp}
                    onClick={() => setEmploymentType(emp)}
                    className={`w-full py-2 px-3 text-xs text-left border rounded-lg transition-colors flex items-center justify-between font-medium ${
                      employmentType === emp
                        ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{emp}</span>
                    {employmentType === emp && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Seniority / Experience */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Leadership Level
              </label>
              <div className="space-y-1.5">
                {experienceLevelsList.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setExperienceLevel(lvl)}
                    className={`w-full py-2 px-3 text-xs text-left border rounded-lg transition-colors flex items-center justify-between font-medium ${
                      experienceLevel === lvl
                        ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{lvl}</span>
                    {experienceLevel === lvl && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Floor Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Minimum Base
                </label>
                <span className="font-mono text-xs font-bold text-slate-900">
                  {minSalary > 0 ? `$${minSalary.toLocaleString()}/yr` : 'Any level'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="250000"
                step="10000"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>
          </aside>

          {/* Mobile Filter Slide-down */}
          {mobileFilterOpen && (
            <div className="lg:hidden col-span-1 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-base text-slate-900">Filter Criteria</span>
                <button onClick={() => setMobileFilterOpen(false)} className="text-slate-600 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Workplace Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {workplaceTypesList.map((wp) => (
                      <button
                        key={wp}
                        onClick={() => setWorkplaceType(wp)}
                        className={`py-2 px-3 text-xs rounded-lg border font-semibold ${
                          workplaceType === wp
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {wp}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Engagement Model
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {employmentTypesList.map((emp) => (
                      <button
                        key={emp}
                        onClick={() => setEmploymentType(emp)}
                        className={`py-2 px-3 text-xs rounded-lg border font-semibold ${
                          employmentType === emp
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {emp}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Minimum Compensation
                  </label>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-mono font-bold text-slate-900">
                      {minSalary > 0 ? `$${minSalary.toLocaleString()}` : 'No floor'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="250000"
                    step="10000"
                    value={minSalary}
                    onChange={(e) => setMinSalary(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 py-2.5 border border-slate-200 rounded-lg text-xs font-bold"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Requisition Ledger */}
          <main className="col-span-1 lg:col-span-9 space-y-6">
            
            {/* Ledger Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div className="text-xs font-sans text-slate-600">
                Showing <span className="font-bold text-slate-900">{displayedJobs.length}</span> of{' '}
                <span className="font-bold text-slate-900">{jobs.length}</span> verified requisitions
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 uppercase tracking-wider text-xs font-bold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-semibold focus:outline-none focus:border-slate-900"
                >
                  <option value="relevance">Direct Relevance</option>
                  <option value="newest">Recently Mandated</option>
                  <option value="salary_high">Compensation: High to Low</option>
                  <option value="salary_low">Compensation: Low to High</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="py-24 text-center space-y-3">
                <div className="inline-block w-6 h-6 border-2 border-slate-900 border-t-transparent animate-spin rounded-full" />
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Accessing Global Directory...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-8 border border-rose-200 bg-rose-50/50 rounded-2xl text-center space-y-3">
                <p className="text-sm font-bold text-rose-800">{error}</p>
                <button
                  onClick={fetchJobs}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Retry Query
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && jobs.length === 0 && (
              <div className="border border-slate-200 bg-slate-50/50 rounded-2xl p-12 text-center space-y-4">
                <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="font-bold text-xl text-slate-900">No active positions match this exact criteria.</p>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Job requisitions are updated continuously. Try clearing your filters or selecting another location or category.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Job List Items */}
            {!loading && !error && jobs.length > 0 && (
              <div className="border border-slate-200 bg-white rounded-2xl shadow-sm divide-y divide-slate-100 overflow-hidden">
                {displayedJobs.map((job) => (
                  <article
                    key={job.id}
                    className="p-6 sm:p-7 hover:bg-slate-50/60 transition-colors group relative"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      
                      {/* Left: Role Title, Company, Description & Tags */}
                      <div className="space-y-3 lg:max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-blue-600">
                            {job.industry}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                            {job.workplaceType}
                          </span>
                          {job.featured && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                Priority Mandate
                              </span>
                            </>
                          )}
                        </div>

                        <div>
                          <button
                            onClick={() => onOpenJobDetails(job.id)}
                            className="text-left font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors leading-snug"
                          >
                            {job.title}
                          </button>
                          <p className="text-xs text-slate-500 font-medium mt-1">
                            {job.company} — <span className="text-slate-800">{job.location}</span>
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Skill Tags */}
                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {job.skills.slice(0, 4).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-xs font-medium px-2.5 py-0.5 border border-slate-200 bg-slate-50 text-slate-700 rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 4 && (
                              <span className="text-xs text-slate-400 self-center pl-1 font-medium">
                                +{job.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right: Compensation & Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between lg:justify-center gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <div className="lg:text-right">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                            Annual Base
                          </span>
                          <span className="font-bold text-lg sm:text-xl text-slate-900">
                            ${(job.salaryMin / 1000).toFixed(0)}k – ${(job.salaryMax / 1000).toFixed(0)}k
                          </span>
                          <span className="text-xs text-slate-500 block font-medium">
                            {job.employmentType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => onOpenJobDetails(job.id)}
                            className="px-4 py-2 border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>View Details</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>

                          <button
                            onClick={() => onOpenApplyModal(job)}
                            className="px-5 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                          >
                            Apply Now
                          </button>

                          <button
                            onClick={() => shareOnWhatsApp(job)}
                            className="p-2 border border-slate-200 hover:border-[#25D366] hover:bg-[#25D366]/10 text-slate-500 hover:text-[#25D366] rounded-lg text-xs transition-colors"
                            title="Share on WhatsApp"
                            aria-label={`Share ${job.title} on WhatsApp`}
                          >
                            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            {hasMore && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="px-8 py-3 bg-white border border-slate-200 hover:border-slate-900 text-slate-900 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Load More Positions ({jobs.length - visibleCount} Remaining)
                </button>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};
