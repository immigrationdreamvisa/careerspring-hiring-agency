import React, { useState, useEffect } from 'react';
import { PageView, JobApplication } from '../types.ts';
import { api } from '../services/api.ts';
import {
  FileText,
  CheckCircle2,
  Clock,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Sparkles,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

interface ApplicationsPageProps {
  onNavigate: (page: PageView, params?: any) => void;
  onOpenJobDetails?: (jobId: string) => void;
  initialTab?: 'all' | 'pending' | 'shortlisted';
}

export const ApplicationsPage: React.FC<ApplicationsPageProps> = ({
  onNavigate,
  onOpenJobDetails,
  initialTab = 'all',
}) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'shortlisted'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get current candidate profile email if available
      let userEmail = '';
      try {
        const storedProfile = localStorage.getItem('careerspring_user_profile');
        if (storedProfile) {
          const prof = JSON.parse(storedProfile);
          userEmail = (prof?.email || '').trim().toLowerCase();
        }
      } catch (e) {
        console.warn('Profile fetch note:', e);
      }

      // 2. Fetch locally stored applications submitted by this user in this browser
      let localApps: JobApplication[] = [];
      try {
        const stored = localStorage.getItem('careerspring_user_applications');
        if (stored) {
          localApps = JSON.parse(stored);
        }
      } catch (localErr) {
        console.warn('Local applications fetch note:', localErr);
      }

      // 3. Fetch server applications
      let serverApps: JobApplication[] = [];
      try {
        const data = await api.getApplications();
        serverApps = data.applications || [];
      } catch (serverErr) {
        console.warn('Server fetch note:', serverErr);
      }

      // 4. User's applications ONLY!
      // An application belongs to this user if:
      // a) It was submitted locally by this user (in localApps)
      // b) OR if the candidate has an email and the server application matches that email
      // This guarantees that a new user who has not applied anywhere has exactly ZERO applications and ZERO notifications!
      const appMap = new Map<string, JobApplication>();
      localApps.forEach((a) => {
        if (a && a.id) appMap.set(a.id, a);
      });

      if (userEmail) {
        serverApps.forEach((a) => {
          if (a && a.id && a.email && a.email.toLowerCase() === userEmail) {
            appMap.set(a.id, a);
          }
        });
      }

      const userOnlyApps = Array.from(appMap.values());
      userOnlyApps.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

      setApplications(userOnlyApps);
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleUpdate = () => {
      fetchApplications();
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('careerspring_applications_updated', handleUpdate);
    window.addEventListener('careerspring_profile_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('careerspring_applications_updated', handleUpdate);
      window.removeEventListener('careerspring_profile_updated', handleUpdate);
    };
  }, []);

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      !q ||
      app.jobTitle.toLowerCase().includes(q) ||
      app.company.toLowerCase().includes(q) ||
      app.fullName.toLowerCase().includes(q) ||
      (app.adminNotes && app.adminNotes.toLowerCase().includes(q));

    if (!matchQuery) return false;

    if (activeTab === 'pending') {
      return app.status === 'Pending' || app.status === 'Reviewing';
    }
    if (activeTab === 'shortlisted') {
      return app.status === 'Shortlisted' || app.status === 'Hired';
    }
    return true;
  });

  const pendingCount = applications.filter((a) => a.status === 'Pending' || a.status === 'Reviewing').length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted' || a.status === 'Hired').length;

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'Shortlisted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Shortlisted for Interview</span>
          </span>
        );
      case 'Reviewing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Under Partner Screening</span>
          </span>
        );
      case 'Hired':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Offer Accepted</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <span>Mandate Concluded</span>
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Application Received</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-24">
      {/* 1. HEADER HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Candidate Activity &amp; Status</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                My Applications
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Review your submitted job candidacies, screening stages, and live application updates in one central place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchApplications}
                className="px-4 py-2.5 border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
                <span>Refresh Status</span>
              </button>

              <button
                onClick={() => onNavigate('jobs')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>Browse More Jobs</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
            <div className="p-4 border border-slate-200 bg-white rounded-2xl shadow-xs space-y-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Total Submissions</p>
              <p className="text-2xl font-extrabold text-slate-900">{applications.length}</p>
              <p className="text-xs text-slate-500">Active candidacies logged</p>
            </div>

            <div className="p-4 border border-slate-200 bg-white rounded-2xl shadow-xs space-y-1">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">In Screening</p>
              <p className="text-2xl font-extrabold text-amber-600">{pendingCount}</p>
              <p className="text-xs text-slate-500">Awaiting recruiter feedback</p>
            </div>

            <div className="p-4 border border-slate-200 bg-white rounded-2xl shadow-xs space-y-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Shortlisted</p>
              <p className="text-2xl font-extrabold text-emerald-600">{shortlistedCount}</p>
              <p className="text-xs text-slate-500">Advancing to interview stages</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN APPLICATION CONTENT AREA */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-10">
        
        {/* Navigation Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors border flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
              }`}
            >
              <span>All Applications</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors border flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
              }`}
            >
              <span>In Screening</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('shortlisted')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors border flex items-center gap-2 ${
                activeTab === 'shortlisted'
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
              }`}
            >
              <span>Shortlisted</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'shortlisted' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {shortlistedCount}
              </span>
            </button>

            {/* Search box */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role or company..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900"
              />
            </div>
          </div>
        </div>

        {/* APPLICATIONS LIST */}
        <div className="pt-6 space-y-5">
            {loading ? (
              <div className="py-20 text-center space-y-3">
                <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent animate-spin rounded-full" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Loading Applications &amp; Status...
                </p>
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="p-12 border border-slate-200 bg-white rounded-3xl text-center max-w-lg mx-auto space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {applications.length === 0 ? 'No applications submitted yet' : 'No applications match this filter'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {applications.length === 0
                      ? 'You have not submitted an application to any role yet. Explore verified global vacancies and submit your candidacy with 1-click.'
                      : 'You have not submitted an application in this category yet. Explore available vacancies to submit your profile.'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Explore Openings
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all space-y-5"
                  >
                    {/* Top Row: Job Title, Company, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                            {app.company}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500 font-medium">
                            Applied {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => {
                            if (onOpenJobDetails && app.jobId) onOpenJobDetails(app.jobId);
                            else onNavigate('job-details', { jobId: app.jobId });
                          }}
                        >
                          {app.jobTitle}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Applicant: <strong className="text-slate-800">{app.fullName}</strong> ({app.currentLocation}) • {app.totalExperience} experience
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {getStatusBadge(app.status)}
                      </div>
                    </div>

                    {/* Progress Timeline Indicator */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="space-y-1">
                          <div className="h-1.5 rounded-full bg-blue-600" />
                          <span className="text-[11px] font-bold text-slate-800 block">1. Submitted</span>
                        </div>
                        <div className="space-y-1">
                          <div className={`h-1.5 rounded-full ${app.status !== 'Pending' ? 'bg-blue-600' : 'bg-slate-200'}`} />
                          <span className="text-[11px] font-bold text-slate-800 block">2. Screened</span>
                        </div>
                        <div className="space-y-1">
                          <div className={`h-1.5 rounded-full ${app.status === 'Shortlisted' || app.status === 'Hired' ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                          <span className="text-[11px] font-bold text-slate-800 block">3. Employer Review</span>
                        </div>
                        <div className="space-y-1">
                          <div className={`h-1.5 rounded-full ${app.status === 'Hired' ? 'bg-purple-600' : 'bg-slate-200'}`} />
                          <span className="text-[11px] font-bold text-slate-800 block">4. Final Offer</span>
                        </div>
                      </div>
                    </div>

                    {/* Recruiter Notes or Feedback Box */}
                    {app.adminNotes && (
                      <div className="p-4 border border-blue-100 bg-blue-50/60 rounded-xl space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          <span>Recruiter Feedback &amp; Next Steps</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {app.adminNotes}
                        </p>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500 font-medium">
                        Resume attached: <strong className="text-slate-800">{app.resumeFileName}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (onOpenJobDetails && app.jobId) onOpenJobDetails(app.jobId);
                            else onNavigate('job-details', { jobId: app.jobId });
                          }}
                          className="px-4 py-2 border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <span>View Job Spec</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

      </main>
    </div>
  );
};
