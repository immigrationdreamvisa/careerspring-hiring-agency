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
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'salary_high' | 'salary_low'>('relevance');

  // Debounced inputs to keep typing and button clicks silky smooth
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [debouncedLocation, setDebouncedLocation] = useState(location);

  const [visibleCount, setVisibleCount] = useState(10);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 250);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLocation(location);
    }, 250);
    return () => clearTimeout(timer);
  }, [location]);

  const fetchJobs = async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    } else {
      setIsUpdating(true);
    }
    setError(null);
    try {
      const data = await api.getJobs({
        keyword: debouncedKeyword.trim() || undefined,
        location: debouncedLocation.trim() || undefined,
        industry: industry === 'All Industries' ? undefined : industry,
        employmentType: employmentType === 'All Types' ? undefined : employmentType,
        workplaceType: workplaceType === 'All' ? undefined : workplaceType,
        experienceLevel: experienceLevel === 'All Levels' ? undefined : experienceLevel,
        sort: sortBy,
      });

      if (data.jobs && data.jobs.length > 0) {
        setJobs(data.jobs);
        setFallbackNotice(null);
      } else {
        // If exact combination produces 0 matches, NEVER show an empty screen when jobs are available!
        // 1. Try relaxing location (showing jobs matching these filters globally)
        if (debouncedLocation.trim()) {
          const globalData = await api.getJobs({
            keyword: debouncedKeyword.trim() || undefined,
            industry: industry === 'All Industries' ? undefined : industry,
            employmentType: employmentType === 'All Types' ? undefined : employmentType,
            workplaceType: workplaceType === 'All' ? undefined : workplaceType,
            experienceLevel: experienceLevel === 'All Levels' ? undefined : experienceLevel,
            sort: sortBy,
          });
          if (globalData.jobs && globalData.jobs.length > 0) {
            setJobs(globalData.jobs);
            setFallbackNotice(`Showing ${globalData.jobs.length} verified opportunities matching your criteria across all regions (no direct match in "${debouncedLocation}")`);
            return;
          }
        }

        // 2. Try relaxing specific filter criteria while keeping industry / keyword
        if (industry !== 'All Industries' || debouncedKeyword.trim()) {
          const industryData = await api.getJobs({
            keyword: debouncedKeyword.trim() || undefined,
            industry: industry === 'All Industries' ? undefined : industry,
            sort: sortBy,
          });
          if (industryData.jobs && industryData.jobs.length > 0) {
            setJobs(industryData.jobs);
            const term = industry !== 'All Industries' ? industry : `"${debouncedKeyword}"`;
            setFallbackNotice(`Showing all ${industryData.jobs.length} open opportunities in ${term}`);
            return;
          }
        }

        // 3. Fallback to all active jobs
        const allData = await api.getJobs({ status: 'Active', sort: sortBy });
        if (allData.jobs && allData.jobs.length > 0) {
          setJobs(allData.jobs);
          setFallbackNotice(`Showing all ${allData.jobs.length} verified opportunities currently active in the directory`);
          return;
        }

        setJobs([]);
        setFallbackNotice(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve requisitions');
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.location !== undefined) setLocation(initialFilters.location);
      if (initialFilters.keyword !== undefined) setKeyword(initialFilters.keyword);
      if (initialFilters.industry !== undefined) setIndustry(initialFilters.industry);
    }
  }, [initialFilters]);

  // Initial load
  useEffect(() => {
    fetchJobs(true);
  }, []);

  // Filter updates - fast & seamless without wiping the UI
  useEffect(() => {
    if (!loading) {
      fetchJobs(false);
    }
  }, [debouncedKeyword, debouncedLocation, industry, employmentType, workplaceType, experienceLevel, sortBy]);

  const handleClearFilters = () => {
    setKeyword('');
    setDebouncedKeyword('');
    setLocation('');
    setDebouncedLocation('');
    setIndustry('All Industries');
    setEmploymentType('All Types');
    setWorkplaceType('All');
    setExperienceLevel('All Levels');
    setSortBy('relevance');
    setVisibleCount(10);
    setFallbackNotice(null);
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
  const isFiltered = Boolean(
    keyword ||
    location ||
    industry !== 'All Industries' ||
    employmentType !== 'All Types' ||
    workplaceType !== 'All' ||
    experienceLevel !== 'All Levels'
  );

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
                type="button"
                onClick={() => {
                  const target = c.name === 'Remote / Global' ? 'Remote' : c.name;
                  setLocation(isMatch ? '' : target);
                  setVisibleCount(10);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors border flex items-center gap-1.5 font-semibold cursor-pointer ${
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

      {/* Directory Content Area with Viewport Height Guarantees to prevent Footer jump */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-10 min-h-[calc(100vh-220px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto space-y-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-base text-slate-900">
                Refine Search
              </span>
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
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
                {workplaceTypesList.map((wp) => {
                  const isActive = workplaceType === wp;
                  return (
                    <button
                      key={wp}
                      type="button"
                      onClick={() => {
                        setWorkplaceType(isActive && wp !== 'All' ? 'All' : wp);
                        setVisibleCount(10);
                      }}
                      className={`py-2 px-3 text-xs text-left border rounded-lg transition-all duration-150 font-semibold cursor-pointer active:scale-95 ${
                        isActive
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {wp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Engagement Model
              </label>
              <div className="space-y-1.5">
                {employmentTypesList.map((emp) => {
                  const isActive = employmentType === emp;
                  return (
                    <button
                      key={emp}
                      type="button"
                      onClick={() => {
                        setEmploymentType(isActive && emp !== 'All Types' ? 'All Types' : emp);
                        setVisibleCount(10);
                      }}
                      className={`w-full py-2 px-3 text-xs text-left border rounded-lg transition-all duration-150 flex items-center justify-between font-medium cursor-pointer active:scale-[0.99] ${
                        isActive
                          ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{emp}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seniority / Experience */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Leadership Level
              </label>
              <div className="space-y-1.5">
                {experienceLevelsList.map((lvl) => {
                  const isActive = experienceLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setExperienceLevel(isActive && lvl !== 'All Levels' ? 'All Levels' : lvl);
                        setVisibleCount(10);
                      }}
                      className={`w-full py-2 px-3 text-xs text-left border rounded-lg transition-all duration-150 flex items-center justify-between font-medium cursor-pointer active:scale-[0.99] ${
                        isActive
                          ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lvl}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Slide-down */}
          {mobileFilterOpen && (
            <div className="lg:hidden col-span-1 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-base text-slate-900">Filter Criteria</span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Workplace Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {workplaceTypesList.map((wp) => {
                      const isActive = workplaceType === wp;
                      return (
                        <button
                          key={wp}
                          type="button"
                          onClick={() => {
                            setWorkplaceType(isActive && wp !== 'All' ? 'All' : wp);
                            setVisibleCount(10);
                          }}
                          className={`py-2 px-3 text-xs rounded-lg border font-semibold cursor-pointer ${
                            isActive
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {wp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Engagement Model
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {employmentTypesList.map((emp) => {
                      const isActive = employmentType === emp;
                      return (
                        <button
                          key={emp}
                          type="button"
                          onClick={() => {
                            setEmploymentType(isActive && emp !== 'All Types' ? 'All Types' : emp);
                            setVisibleCount(10);
                          }}
                          className={`py-2 px-3 text-xs rounded-lg border font-semibold cursor-pointer ${
                            isActive
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {emp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Leadership Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {experienceLevelsList.map((lvl) => {
                      const isActive = experienceLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => {
                            setExperienceLevel(isActive && lvl !== 'All Levels' ? 'All Levels' : lvl);
                            setVisibleCount(10);
                          }}
                          className={`py-2 px-3 text-xs rounded-lg border font-semibold cursor-pointer ${
                            isActive
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="flex-1 py-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Requisition Ledger with min-h to prevent footer jump */}
          <main className="col-span-1 lg:col-span-9 space-y-6 min-h-[850px] pb-16">
            
            {/* Ledger Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="text-xs font-sans text-slate-600">
                  Showing <span className="font-bold text-slate-900">{displayedJobs.length}</span> of{' '}
                  <span className="font-bold text-slate-900">{jobs.length}</span> verified requisitions
                </div>
                {isUpdating && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold animate-pulse">
                    <span className="inline-block w-3 h-3 border-2 border-blue-600 border-t-transparent animate-spin rounded-full" />
                    <span>Updating...</span>
                  </div>
                )}
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

            {/* Loading State - only on initial full load */}
            {loading && (
              <div className="py-24 text-center space-y-3">
                <div className="inline-block w-6 h-6 border-2 border-slate-900 border-t-transparent animate-spin rounded-full" />
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Accessing Global Directory...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="p-8 border border-rose-200 bg-rose-50/50 rounded-2xl text-center space-y-3">
                <p className="text-sm font-bold text-rose-800">{error}</p>
                <button
                  type="button"
                  onClick={() => fetchJobs(true)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Retry Query
                </button>
              </div>
            )}

            {/* Fallback Notice Banner when filters are intelligently relaxed */}
            {fallbackNotice && (
              <div className="p-4 bg-blue-50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5 text-blue-900 font-semibold">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>{fallbackNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 rounded-lg font-bold text-xs shrink-0 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
                >
                  Reset All Criteria
                </button>
              </div>
            )}

            {/* Empty State - only when zero jobs exist globally */}
            {!loading && !error && jobs.length === 0 && (
              <div className="border border-slate-200 bg-slate-50/50 rounded-2xl p-12 text-center space-y-4">
                <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="font-bold text-xl text-slate-900">No active positions match this exact criteria.</p>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Job requisitions are updated continuously. Try clearing your filters or selecting another location or category.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Job List Items */}
            {!loading && !error && jobs.length > 0 && (
              <div className={`transition-opacity duration-150 ${isUpdating ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
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
