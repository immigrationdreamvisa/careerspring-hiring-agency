import React, { useState, useEffect } from 'react';
import { PageView, Job, ServiceDetail } from './types.ts';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { api } from './services/api.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { JobApplicationModal } from './components/JobApplicationModal.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { DbStatusModal } from './components/DbStatusModal.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { JobsPage } from './pages/JobsPage.tsx';
import { JobDetailsPage } from './pages/JobDetailsPage.tsx';
import { HireTalentPage } from './pages/HireTalentPage.tsx';
import { IndustriesPage } from './pages/IndustriesPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ApplicationsPage } from './pages/ApplicationsPage.tsx';

function MainLayout() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedJobId, setSelectedJobId] = useState<string>('job-101');
  const [jobsFilterParams, setJobsFilterParams] = useState<{
    keyword?: string;
    location?: string;
    industry?: string;
  }>({});

  // Modals state
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null);
  const [serviceModalData, setServiceModalData] = useState<ServiceDetail | null>(null);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  // Featured jobs for homepage
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);

  const loadFeaturedJobs = async () => {
    try {
      const data = await api.getJobs({ status: 'Active' });
      setFeaturedJobs(data.jobs);
    } catch (err) {
      console.warn('Could not load jobs for home:', err);
    }
  };

  useEffect(() => {
    loadFeaturedJobs();

    // Check if shared role link was visited (?jobId=...)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedJobId = urlParams.get('jobId');
      if (sharedJobId) {
        setSelectedJobId(sharedJobId);
        setCurrentPage('job-details');
      }
    } catch (e) {
      // Ignore if URLSearchParams not available
    }
  }, []);

  const [applicationsTab, setApplicationsTab] = useState<'all' | 'pending' | 'shortlisted'>('all');

  const handleNavigate = (page: PageView, params?: any) => {
    if (page === 'jobs' && params) {
      setJobsFilterParams(params?.filters || params);
    }
    if (page === 'job-details' && params?.jobId) {
      setSelectedJobId(params.jobId);
    }
    if (page === 'applications' && params?.tab) {
      setApplicationsTab(params.tab);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenJobDetails = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentPage('job-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApplyModal = (job: Job) => {
    setApplyModalJob(job);
  };

  const handleOpenServiceModal = (service: ServiceDetail) => {
    setServiceModalData(service);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Top sticky navbar adhering to Top Bar Contract */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDbStatus={() => setIsDbModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 min-h-[calc(100vh-80px)] flex flex-col">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            featuredJobs={featuredJobs}
            onOpenJobDetails={handleOpenJobDetails}
            onOpenApplyModal={handleOpenApplyModal}
            onOpenServiceModal={handleOpenServiceModal}
          />
        )}

        {currentPage === 'jobs' && (
          <JobsPage
            initialFilters={jobsFilterParams}
            onOpenJobDetails={handleOpenJobDetails}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}

        {currentPage === 'job-details' && (
          <JobDetailsPage
            jobId={selectedJobId}
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}

        {currentPage === 'hire-talent' && (
          <HireTalentPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'applications' && (
          <ApplicationsPage
            onNavigate={handleNavigate}
            onOpenJobDetails={handleOpenJobDetails}
            initialTab={applicationsTab}
          />
        )}
      </main>

      {/* Global Modals */}
      <AuthModal />

      <JobApplicationModal
        job={applyModalJob}
        isOpen={Boolean(applyModalJob)}
        onClose={() => setApplyModalJob(null)}
        onApplicationSuccess={() => {
          loadFeaturedJobs();
        }}
        onNavigateToApplications={() => {
          setApplyModalJob(null);
          handleNavigate('applications', { tab: 'all' });
        }}
      />

      <ServiceDetailModal
        service={serviceModalData}
        isOpen={Boolean(serviceModalData)}
        onClose={() => setServiceModalData(null)}
        onNavigateToHire={() => {
          setServiceModalData(null);
          handleNavigate('jobs');
        }}
      />

      <DbStatusModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
        onStatusUpdated={() => {
          loadFeaturedJobs();
        }}
      />

      {/* Standard Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
