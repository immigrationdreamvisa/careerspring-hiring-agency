import React, { useState, useEffect } from 'react';
import { PageView } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Send,
  AlertCircle,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Check,
  Building,
  Sparkles,
  User,
  Briefcase,
  Award,
  Globe,
  DollarSign,
  FileText,
  Edit3,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  targetRole: string;
  industry: string;
  experienceLevel: string;
  workArrangement: string;
  expectedSalary: string;
  skills: string[];
  linkedinUrl: string;
  bio: string;
  savedAt: string;
}

const PROFILE_STORAGE_KEY = 'careerspring_user_profile';

interface ContactPageProps {
  onNavigate: (page: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  // Saved profile state
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'form'>('profile');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [industry, setIndustry] = useState('Technology & Distributed Systems');
  const [experienceLevel, setExperienceLevel] = useState('Senior Professional (5-8 years)');
  const [workArrangement, setWorkArrangement] = useState('Remote Preferred');
  const [expectedSalary, setExpectedSalary] = useState('$160,000 – $220,000 / yr');
  const [skillsInput, setSkillsInput] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [bio, setBio] = useState('');

  // Status & Messaging
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Office selection
  const [selectedOffice, setSelectedOffice] = useState<'sf' | 'nyc' | 'chi'>('sf');

  // Load existing profile from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        const parsed: CandidateProfile = JSON.parse(stored);
        setProfile(parsed);
        populateForm(parsed);
        setActiveTab('profile');
      } else {
        setActiveTab('form');
        setIsEditing(true);
      }
    } catch (e) {
      console.error('Failed to parse candidate profile from localStorage', e);
      setActiveTab('form');
      setIsEditing(true);
    }
  }, []);

  const populateForm = (data: CandidateProfile) => {
    setName(data.name || '');
    setEmail(data.email || '');
    setPhone(data.phone || '');
    setLocation(data.location || '');
    setTargetRole(data.targetRole || '');
    setIndustry(data.industry || 'Technology & Distributed Systems');
    setExperienceLevel(data.experienceLevel || 'Senior Professional (5-8 years)');
    setWorkArrangement(data.workArrangement || 'Remote Preferred');
    setExpectedSalary(data.expectedSalary || '$160,000 – $220,000 / yr');
    setSkillsInput(data.skills ? data.skills.join(', ') : '');
    setLinkedinUrl(data.linkedinUrl || '');
    setBio(data.bio || '');
  };

  const offices = {
    sf: {
      name: 'San Francisco Headquarters',
      city: 'San Francisco, California',
      address: '100 Montgomery Street, Suite 2400',
      zip: 'San Francisco, CA 94104',
      phone: '+1 (415) 555-0199',
      email: 'sf.office@careerspring.example',
      practices: 'Technology, AI Systems, Enterprise Infrastructure, Venture Capital',
      hours: 'Mon – Fri: 8:00 AM – 6:00 PM PST',
    },
    nyc: {
      name: 'New York Financial Hub',
      city: 'New York, New York',
      address: '452 Fifth Avenue, 18th Floor',
      zip: 'New York, NY 10018',
      phone: '+1 (212) 555-0144',
      email: 'nyc.office@careerspring.example',
      practices: 'Quantitative Finance, Asset Management, Private Equity, Banking',
      hours: 'Mon – Fri: 8:30 AM – 6:30 PM EST',
    },
    chi: {
      name: 'Chicago Industrial & Supply Hub',
      city: 'Chicago, Illinois',
      address: '300 North LaSalle Street, Suite 1200',
      zip: 'Chicago, IL 60654',
      phone: '+1 (312) 555-0177',
      email: 'chi.office@careerspring.example',
      practices: 'Advanced Manufacturing, Supply Chain, Healthcare Systems, Logistics',
      hours: 'Mon – Fri: 8:00 AM – 5:30 PM CST',
    },
  };

  const currentOffice = offices[selectedOffice];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide your direct contact phone number.');
      return;
    }
    if (!targetRole.trim()) {
      setError('Please specify your current or target job title.');
      return;
    }

    setSubmitting(true);

    try {
      const skillsArray = skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const newProfile: CandidateProfile = {
        id: profile?.id || 'cs-prof-' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim() || 'United States',
        targetRole: targetRole.trim(),
        industry,
        experienceLevel,
        workArrangement,
        expectedSalary: expectedSalary.trim() || 'Market Competitive',
        skills: skillsArray.length > 0 ? skillsArray : ['Architecture', 'Leadership', 'Execution'],
        linkedinUrl: linkedinUrl.trim(),
        bio: bio.trim() || 'Candidate profile registered on CareerSpring executive hiring platform.',
        savedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };

      // 1. Save to local storage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));

      // 2. Dispatch custom event for instantaneous update across all components (Navbar, etc.)
      window.dispatchEvent(new CustomEvent('careerspring_profile_updated', { detail: newProfile }));

      // 3. Update view state INSTANTLY - 0ms delay
      setProfile(newProfile);
      setIsEditing(false);
      setActiveTab('profile');
      setSubmitting(false);
      setSuccessToast('Profile saved successfully! Your details are verified and active.');

      setTimeout(() => {
        setSuccessToast(null);
      }, 5000);

      // 4. Background network sync without blocking UI
      api.sendContactMessage({
        name: newProfile.name,
        email: newProfile.email,
        subject: `Candidate Profile Registration: ${newProfile.targetRole} (${newProfile.name})`,
        message: `Candidate registered profile on CareerSpring:\nRole: ${newProfile.targetRole}\nIndustry: ${newProfile.industry}\nExperience: ${newProfile.experienceLevel}\nLocation: ${newProfile.location}\nSkills: ${newProfile.skills.join(', ')}\nBio: ${newProfile.bio}`,
      }).catch((backendErr) => {
        console.warn('Backend message notification skipped or failed', backendErr);
      });
    } catch (err: any) {
      setError(err.message || 'Failed to save profile. Please check your inputs.');
      setSubmitting(false);
    }
  };

  const handleClearProfile = () => {
    if (window.confirm('Are you sure you want to delete your saved profile from this browser?')) {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      setProfile(null);
      window.dispatchEvent(new CustomEvent('careerspring_profile_updated', { detail: null }));
      setName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setTargetRole('');
      setSkillsInput('');
      setLinkedinUrl('');
      setBio('');
      setIsEditing(true);
      setActiveTab('form');
    }
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return 'CS';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Title Banner */}
      <section className="border-b border-slate-200 pt-12 pb-12 px-6 lg:px-14 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CareerSpring Global Candidate &amp; Contact Hub</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {profile && activeTab === 'profile' && !isEditing
                  ? 'Your Candidate Profile &amp; Contact Hub'
                  : 'Candidate Contact &amp; Profile Creation'}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Create your candidate profile with your career aspirations and direct contact details. CareerSpring connects your verified profile with executive hiring committees.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-3">
              {profile ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Profile Active &amp; Verified</span>
                </div>
              ) : (
                <div className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 shrink-0 shadow-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                    Search Guarantee
                  </span>
                  <span className="font-bold text-slate-900">Direct Partner Review Within 24 Hours</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Sub-Tabs if profile exists */}
          {profile && (
            <div className="pt-4 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setIsEditing(false);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'profile' && !isEditing
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>View Candidate Profile</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('form');
                  setIsEditing(true);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  isEditing
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile Details</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-6 py-3.5 text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Left Column (7 cols): Profile Card OR Contact Form */}
          <div className="lg:col-span-7 space-y-6">

            {/* CASE 1: SHOW PROFILE DOSSIER (When saved & not currently editing) */}
            {profile && !isEditing ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Monogram Avatar */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 text-white flex items-center justify-center text-xl sm:text-2xl font-extrabold tracking-wider shadow-md shrink-0">
                      {getInitials(profile.name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          {profile.name}
                        </h2>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-[11px] font-bold">
                          <ShieldCheck className="w-3 h-3 text-blue-600" />
                          <span>CareerSpring Verified</span>
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-blue-600 mt-1">
                        {profile.targetRole}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{profile.location}</span>
                        <span className="text-slate-300">•</span>
                        <span>Member since {profile.savedAt}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        populateForm(profile);
                        setIsEditing(true);
                        setActiveTab('form');
                      }}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-xl transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={handleClearProfile}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Clear profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Direct Contact Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white transition-colors text-slate-700 font-medium truncate"
                    title={profile.email}
                  >
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </a>

                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white transition-colors text-slate-700 font-medium truncate"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono truncate">{profile.phone}</span>
                  </a>

                  {profile.linkedinUrl ? (
                    <a
                      href={profile.linkedinUrl.startsWith('http') ? profile.linkedinUrl : `https://${profile.linkedinUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white transition-colors text-blue-600 font-medium truncate"
                    >
                      <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">View LinkedIn / Link</span>
                      <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2.5 p-2 text-slate-400">
                      <Globe className="w-4 h-4 text-slate-300 shrink-0" />
                      <span>No URL Provided</span>
                    </div>
                  )}
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Experience
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {profile.experienceLevel.split('(')[0].trim()}
                    </p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Industry
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {profile.industry.split('&')[0].trim()}
                    </p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Arrangement
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {profile.workArrangement}
                    </p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Target Comp
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {profile.expectedSalary}
                    </p>
                  </div>
                </div>

                {/* Skills Matrix */}
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold text-slate-700 tracking-wider block">
                    Verified Competencies &amp; Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs hover:border-blue-400 hover:text-blue-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Candidate Bio / Statement */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-700 tracking-wider block">
                    Candidate Executive Statement
                  </span>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {profile.bio}
                  </div>
                </div>

                {/* Next Steps CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-colors shadow-sm"
                  >
                    <span>Browse Matching Openings</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('applications')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-colors"
                  >
                    <span>Check Applications &amp; Alerts</span>
                  </button>
                </div>
              </div>
            ) : (

              /* CASE 2: REGISTRATION & CONTACT FORM */
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                      Candidate Registration &amp; Direct Inquiry
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {profile ? 'Update Your Profile & Contact Details' : 'Fill Details & Create Profile'}
                    </h2>
                  </div>
                  {profile && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setActiveTab('profile');
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Section 1: Contact Essentials */}
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>1. Personal &amp; Direct Contact Information</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Elena Rostova"
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="elena@example.com"
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Direct Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 234-5678"
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Current Location (City, Country) *
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. San Francisco, USA or London, UK"
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Career Parameters */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="text-xs uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <span>2. Role &amp; Career Aspirations</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Target Position / Headline *
                        </label>
                        <input
                          type="text"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          placeholder="e.g. Senior Full-Stack Engineer"
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Industry Practice *
                        </label>
                        <select
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        >
                          <option value="Technology & Distributed Systems">Technology &amp; Distributed Systems</option>
                          <option value="Quantitative Finance & Capital Markets">Quantitative Finance &amp; Capital Markets</option>
                          <option value="AI, Machine Learning & Data Systems">AI, Machine Learning &amp; Data Systems</option>
                          <option value="Executive & Product Leadership">Executive &amp; Product Leadership</option>
                          <option value="Cloud, DevOps & Infrastructure">Cloud, DevOps &amp; Infrastructure</option>
                          <option value="Healthcare & BioTech Solutions">Healthcare &amp; BioTech Solutions</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Experience Level *
                        </label>
                        <select
                          value={experienceLevel}
                          onChange={(e) => setExperienceLevel(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        >
                          <option value="Associate / Junior (1-3 years)">Associate / Junior (1-3 years)</option>
                          <option value="Mid-Level Professional (3-5 years)">Mid-Level Professional (3-5 years)</option>
                          <option value="Senior Professional (5-8 years)">Senior Professional (5-8 years)</option>
                          <option value="Lead / Staff Engineer (8-12 years)">Lead / Staff Engineer (8-12 years)</option>
                          <option value="Director / VP / Executive (12+ years)">Director / VP / Executive (12+ years)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Work Arrangement *
                        </label>
                        <select
                          value={workArrangement}
                          onChange={(e) => setWorkArrangement(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        >
                          <option value="Remote Only">Remote Only</option>
                          <option value="Remote Preferred">Remote Preferred</option>
                          <option value="Hybrid (2-3 days)">Hybrid (2-3 days)</option>
                          <option value="On-Site / In-Office">On-Site / In-Office</option>
                          <option value="Open to Relocation">Open to Relocation</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Expected Annual Compensation
                        </label>
                        <input
                          type="text"
                          value={expectedSalary}
                          onChange={(e) => setExpectedSalary(e.target.value)}
                          placeholder="e.g. $160,000 – $220,000 / yr"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          LinkedIn or Portfolio URL
                        </label>
                        <input
                          type="text"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Core Competencies &amp; Skills (Comma separated) *
                      </label>
                      <input
                        type="text"
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        placeholder="e.g. React, TypeScript, Node.js, Python, AWS, Docker, GraphQL, Kubernetes"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  {/* Section 3: Summary / Notes */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h3 className="text-xs uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>3. Executive Bio / Direct Inquiry Message</span>
                    </h3>

                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Outline your key career milestones, architectural domains, or specific opportunities you are targeting with CareerSpring..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 resize-none font-medium"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                        <span>Saving Profile to CareerSpring...</span>
                      </>
                    ) : (
                      <>
                        <span>{profile ? 'Save & Update Profile' : 'Save Details & View Profile'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Office Directory & CareerSpring Guarantees (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Switcher Tabs */}
            <div className="border border-slate-200 bg-slate-100 rounded-xl p-1 flex gap-1">
              {(['sf', 'nyc', 'chi'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedOffice(key)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedOffice === key
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {key === 'sf' ? 'San Francisco' : key === 'nyc' ? 'New York' : 'Chicago'}
                </button>
              ))}
            </div>

            {/* Selected Office Details Card */}
            <div className="border border-slate-200 bg-white rounded-3xl p-7 space-y-5 shadow-sm">
              <div>
                <span className="text-xs font-bold text-blue-600 block">
                  CareerSpring Global Hub
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {currentOffice.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{currentOffice.city}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Physical Location</span>
                    <p className="text-slate-600">{currentOffice.address}</p>
                    <p className="text-slate-600">{currentOffice.zip}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Direct Partner Desk</span>
                    <p className="font-mono text-slate-700">{currentOffice.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Direct Inquiries</span>
                    <p className="text-blue-600 font-medium">{currentOffice.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900">Operating Hours</span>
                    <p className="text-slate-600">{currentOffice.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Sector Specialization
                </span>
                <p className="text-xs text-slate-800 font-medium">
                  {currentOffice.practices}
                </p>
              </div>
            </div>

            {/* Candidate Representation Guarantee Box */}
            <div className="border border-slate-200 bg-slate-50 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">
                  CareerSpring Confidential Protocol
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your submitted candidate details and compensation parameters are held in strict confidence. Never shared with current employers or scraped into public directories.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('jobs')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                >
                  <span>Explore 20+ International Positions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
