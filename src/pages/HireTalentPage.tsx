import React, { useState } from 'react';
import { PageView, EmployerInquiry } from '../types.ts';
import { api } from '../services/api.ts';
import {
  HOW_IT_WORKS_EMPLOYERS,
} from '../data/recruitmentData.ts';
import {
  ArrowUpRight,
  Check,
  AlertCircle,
  Building2,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';

interface HireTalentPageProps {
  onNavigate: (page: PageView, params?: any) => void;
}

export const HireTalentPage: React.FC<HireTalentPageProps> = ({ onNavigate }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Information Technology');
  const [numberOfPositions, setNumberOfPositions] = useState('1-3 positions');
  const [requiredJobRoles, setRequiredJobRoles] = useState('');
  const [hiringTimeline, setHiringTimeline] = useState('Immediate / Within 30 days');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<EmployerInquiry | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !companyName.trim() ||
      !contactPerson.trim() ||
      !businessEmail.trim() ||
      !phone.trim() ||
      !requiredJobRoles.trim()
    ) {
      setError('Please provide company name, contact, corporate email, phone, and target roles.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitInquiry({
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim(),
        businessEmail: businessEmail.trim(),
        phone: phone.trim(),
        industry,
        numberOfPositions,
        requiredJobRoles: requiredJobRoles.trim(),
        hiringTimeline,
        additionalRequirements: additionalRequirements.trim() || undefined,
      });

      setSubmittedInquiry(res.inquiry);
    } catch (err: any) {
      setError(err.message || 'Failed to submit search requisition');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setCompanyName('');
    setContactPerson('');
    setBusinessEmail('');
    setPhone('');
    setRequiredJobRoles('');
    setAdditionalRequirements('');
    setError(null);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Hero Banner */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 px-6 lg:px-14">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-blue-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Talent Acquisition &amp; Executive Placement</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Hire Exceptional Talent That Scales Your Business.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                We partner with high-growth organizations and leading enterprises to recruit top-performing professionals. From specialized engineering leadership to full-scale cross-functional hiring.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href="#mandate-form"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors shadow-lg"
              >
                <span>Submit Organization Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="py-16 lg:py-24 px-6 lg:px-14 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                The Search Process
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Rigorous, transparent recruitment.
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              We replace guesswork with strategic precision: thorough requirements calibration, direct candidate headhunting, and rigorous technical and cultural vetting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_EMPLOYERS.map((stage) => (
              <div
                key={stage.step}
                className="p-7 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-5 flex flex-col justify-between hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-blue-600">STAGE {stage.step}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">METHODOLOGY</span>
                  </div>

                  <h3 className="font-bold text-xl text-slate-900">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Verified standards</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Employer Mandate Form Section */}
      <section id="mandate-form" className="py-16 lg:py-24 px-6 lg:px-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Context & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                  Get Started
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Discuss your hiring requirements with our partners.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every search is executed with complete confidentiality. After submitting your parameters, our sector practice leader will contact you within 24 hours.
                </p>
              </div>

              {/* Guarantees List */}
              <div className="border border-slate-200 bg-white rounded-2xl p-6 space-y-4 shadow-sm">
                <span className="text-xs uppercase tracking-wider text-slate-900 font-bold block">
                  CareerSpring Commitments
                </span>
                
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Confidential Search</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Discreet recruitment with strict non-disclosure protections.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">14-Day Candidate Shortlist</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Pre-screened, high-caliber candidates presented with verified dossiers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Placement Guarantee</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Comprehensive tenure replacement warranty on permanent hires.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-md">
              {submittedInquiry ? (
                <div className="space-y-6 text-center py-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                      REQUISITION #{submittedInquiry.id} REGISTERED
                    </span>
                    <h3 className="font-bold text-2xl text-slate-900">
                      Search Mandate Received
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900">{submittedInquiry.contactPerson}</strong>. Our Practice Lead for <strong className="text-slate-900">{submittedInquiry.industry}</strong> will review your specifications and contact you at <strong className="text-slate-900">{submittedInquiry.businessEmail}</strong>.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-center gap-4">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Submit Another Requisition
                    </button>
                    <button
                      onClick={() => onNavigate('home')}
                      className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-sm"
                    >
                      Return Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-xl text-slate-900">Search Mandate Registration</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Please provide your organization parameters and target roles.</p>
                  </div>

                  {error && (
                    <div className="p-3 border border-rose-200 bg-rose-50 rounded-xl flex items-center gap-2 text-rose-800 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Horizon Technologies"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Your Full Name &amp; Title *
                      </label>
                      <input
                        type="text"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Victoria Sterling, VP People"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                        placeholder="v.sterling@apexhorizon.com"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Direct Phone *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (415) 000-0000"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Sector Practice
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                      >
                        <option value="Information Technology">Information Technology</option>
                        <option value="Banking & Finance">Banking & Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail & E-commerce">Retail & E-commerce</option>
                        <option value="Sales & Marketing">Sales & Marketing</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Search Scope
                      </label>
                      <select
                        value={numberOfPositions}
                        onChange={(e) => setNumberOfPositions(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 font-medium"
                      >
                        <option value="1 C-Suite / VP Appointment">1 C-Suite / VP Appointment</option>
                        <option value="1-3 Senior Positions">1-3 Senior Positions</option>
                        <option value="4-10 Strategic Placements">4-10 Strategic Placements</option>
                        <option value="Team Buildout (10+ Hires)">Team Buildout (10+ Hires)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Target Role Titles &amp; Critical Skills *
                    </label>
                    <input
                      type="text"
                      value={requiredJobRoles}
                      onChange={(e) => setRequiredJobRoles(e.target.value)}
                      placeholder="e.g. Chief Technology Officer, VP Infrastructure (Kubernetes, distributed scale)"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Mandate Brief &amp; Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                      placeholder="Timeline expectations, compensation benchmarks, target skills, or team structure..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-slate-900 hover:bg-blue-600 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                        <span>Submitting Mandate...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Search Mandate</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6 lg:px-14 bg-white">
        <div className="max-w-[800px] mx-auto text-center space-y-4">
          <p className="font-bold text-xl sm:text-2xl text-slate-900 leading-relaxed">
            “CareerSpring provided top-tier executive talent faster than any firm we've worked with. Within two weeks, we had exceptional finalists for our VP of Architecture search.”
          </p>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Jonathan Hayes
            </span>
            <span className="text-xs text-slate-500">
              Chief Executive Officer, Stratosphere Cloud
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
