import React, { useState } from 'react';
import { Job, JobApplication } from '../types.ts';
import { api } from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';
import {
  X,
  Upload,
  FileText,
  AlertCircle,
  ArrowUpRight,
  Check,
  ShieldCheck,
} from 'lucide-react';

interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSuccess?: (application: JobApplication) => void;
  onNavigateToApplications?: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onApplicationSuccess,
  onNavigateToApplications,
}) => {
  const { user } = useAuth();

  // Check if saved profile exists
  const getSavedProfile = () => {
    try {
      const stored = localStorage.getItem('careerspring_user_profile');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const initialProfile = getSavedProfile();

  const [fullName, setFullName] = useState(user?.name || initialProfile?.name || '');
  const [email, setEmail] = useState(user?.email || initialProfile?.email || '');
  const [phone, setPhone] = useState(initialProfile?.phone || '');
  const [currentLocation, setCurrentLocation] = useState(initialProfile?.location || '');
  const [totalExperience, setTotalExperience] = useState(initialProfile?.experienceLevel || '3-5 years (Mid-Level)');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeDataUrl, setResumeDataUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedApplication, setSubmittedApplication] = useState<JobApplication | null>(null);

  if (!isOpen || !job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit.');
      return;
    }

    setResumeFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setResumeDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !currentLocation.trim()) {
      setError('Please provide all primary contact fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const docName = resumeFile?.name || `${fullName.trim().replace(/\s+/g, '_')}_CareerSpring_Profile.pdf`;

      const res = await api.submitApplication({
        jobId: job.id,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        currentLocation: currentLocation.trim(),
        totalExperience,
        resumeFileName: docName,
        resumeDataUrl: resumeDataUrl || undefined,
        coverLetter: coverLetter.trim() || undefined,
      });

      // Persist to user applications in local storage so it immediately shows up in Notifications & Tracker
      try {
        const stored = localStorage.getItem('careerspring_user_applications');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(res.application);
        localStorage.setItem('careerspring_user_applications', JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('careerspring_applications_updated', { detail: res.application }));
      } catch (storageErr) {
        console.warn('Failed to save application to local storage', storageErr);
      }

      setSubmittedApplication(res.application);
      if (onApplicationSuccess) {
        onApplicationSuccess(res.application);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit application dossier');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedApplication(null);
    setResumeFile(null);
    setResumeDataUrl(null);
    setCoverLetter('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white text-slate-900 w-full max-w-xl border border-slate-200 rounded-2xl p-7 sm:p-8 space-y-6 shadow-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-icon.png"
              alt="CareerSpring"
              className="w-9 h-9 object-contain shrink-0"
            />
            <div>
              <span className="text-xs font-sans uppercase tracking-wider text-slate-500 font-bold block">
                CAREER<span className="text-[#FF5500]">SPRING</span> CANDIDATE PORTAL
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 mt-0.5">{job.title}</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {job.company} — {job.location} ({job.workplaceType})
              </p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation */}
        {submittedApplication ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                APPLICATION #{submittedApplication.id} RECEIVED
              </span>
              <h4 className="font-bold text-2xl text-slate-900">Application Submitted!</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{submittedApplication.fullName}</strong>. Your profile has been submitted directly to the hiring team for{' '}
                <strong className="text-slate-900">{submittedApplication.jobTitle}</strong> at <strong className="text-slate-900">{submittedApplication.company}</strong>.
              </p>
            </div>

            <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl text-left text-xs font-sans space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Reference Code:</span>
                <span className="font-mono font-bold text-slate-900">{submittedApplication.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold text-blue-600">Under Review</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Document:</span>
                <span className="truncate max-w-[200px] text-slate-800 font-medium">{submittedApplication.resumeFileName}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            {error && (
              <div className="p-3 border border-rose-200 bg-rose-50 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. David Hoffman"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="david@example.com"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (415) 555-0142"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Location *</label>
                <input
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="San Francisco, CA"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Experience Level</label>
              <select
                value={totalExperience}
                onChange={(e) => setTotalExperience(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 cursor-pointer font-medium"
              >
                <option value="0-2 years (Junior / Associate)">0-2 years (Junior / Associate)</option>
                <option value="3-5 years (Mid-Level)">3-5 years (Mid-Level)</option>
                <option value="6-9 years (Senior)">6-9 years (Senior)</option>
                <option value="10+ years (Staff / Principal / Director)">10+ years (Staff / Principal / Director)</option>
              </select>
            </div>

            {/* Resume Upload Dropzone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resume / CV Document (PDF, DOCX) *</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-5 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.rtf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {resumeFile ? (
                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-xs truncate text-slate-900">{resumeFile.name}</span>
                    </div>
                    <span className="text-xs font-bold text-blue-600 underline">Replace</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="font-bold text-xs text-slate-800">Click or drag resume file to upload</p>
                    <p className="text-[11px] text-slate-400">PDF, DOCX up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cover Note / Message (Optional)
              </label>
              <textarea
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Briefly summarize your key achievements or why you are a great fit..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 resize-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Confidential candidate privacy</span>
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
