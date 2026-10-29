import React from 'react';
import { PageView } from '../types.ts';
import { ArrowUpRight, Award, ShieldCheck, Target, Users, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const leadershipTeam = [
    {
      name: 'Eleanor Vance',
      role: 'Managing Partner & Founder',
      background: '20+ years advising Fortune 500 boards and enterprise leadership on executive succession and organizational design.',
      specialty: 'Executive & C-Suite Search',
      initials: 'EV',
      experience: '22+ Years Advisory',
    },
    {
      name: 'Marcus Sterling',
      role: 'Partner, Technology & Systems Practice',
      background: 'Ex-VP of Engineering who has led searches for 600+ cloud architects, engineering directors, and AI researchers.',
      specialty: 'Distributed Systems & AI',
      initials: 'MS',
      experience: '16+ Years Advisory',
    },
    {
      name: 'Dr. Sarah Lin',
      role: 'Partner, Healthcare & Life Sciences',
      background: 'Healthcare advisory partner overseeing Chief Medical Officer, clinical development, and biotech executive mandates.',
      specialty: 'Clinical Operations & Biotech',
      initials: 'SL',
      experience: '14+ Years Advisory',
    },
    {
      name: 'Julian Henderson',
      role: 'Director, Quantitative & Capital Markets',
      background: 'Over 15 years placing quantitative analysts, chief risk officers, and portfolio managers across global funds.',
      specialty: 'Hedge Funds & Capital Markets',
      initials: 'JH',
      experience: '15+ Years Advisory',
    },
  ];

  const values = [
    {
      number: '01',
      title: 'Restraint Over Volume',
      desc: 'We purposefully prioritize quality over sheer volume. Every client and candidate interacts directly with a dedicated Partner.',
    },
    {
      number: '02',
      title: 'Sector Fluency',
      desc: 'Our partners have worked inside the industries they recruit for. We understand tech stacks, liquidity risk, and manufacturing firsthand.',
    },
    {
      number: '03',
      title: 'Absolute Discretion',
      desc: 'In leadership transitions and confidential corporate restructurings, privacy is paramount. We maintain rigorous bilateral NDAs.',
    },
    {
      number: '04',
      title: 'Tenure-Backed Accountability',
      desc: 'A successful placement is measured in lasting business impact. We back every retained placement with tenure warranty guarantees.',
    },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Title Banner */}
      <section className="border-b border-slate-200 pt-14 pb-14 px-6 lg:px-14 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Firm Profile &amp; Mission</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Recruitment Built On Trust, Precision &amp; Impact.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                CareerSpring was established to provide high-touch advisory, true sector literacy, and enduring professional relationships between outstanding talent and world-class organizations.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <button
                onClick={() => onNavigate('jobs')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-blue-600 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors shadow-sm"
              >
                <span>Explore Career Opportunities</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-14 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                Foundational Principles
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Why executive hiring requires precision care.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                In an era dominated by superficial keyword scraping and generic cold messaging, true talent identification has become rarer and more essential than ever. An organization’s destiny is defined by a handful of pivotal appointments—individuals whose vision, judgment, and character alter what their colleagues achieve.
              </p>
              <p>
                At CareerSpring, we treat every assignment as a bespoke research undertaking. We map entire market ecosystems, cultivate multi-year relationships with non-active candidates, and evaluate professionals across dimensions that no algorithm can comprehend: technical architecture, executive presence, and cultural harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              How we protect your interests.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.number}
                className="p-7 border border-slate-200 bg-white rounded-2xl shadow-sm space-y-4 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <span className="font-mono text-xs text-blue-600 font-bold block">{val.number}</span>
                <h3 className="font-bold text-xl text-slate-900">{val.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Partners Directory */}
      <section className="py-16 lg:py-24 px-6 lg:px-14 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                Practice Leadership
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Senior Search Partners.
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Every search mandate is personally directed by a Senior Partner with substantial operational and search credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader) => (
              <div
                key={leader.name}
                className="border border-slate-200 bg-white rounded-2xl p-7 shadow-sm space-y-5 flex flex-col justify-between hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center tracking-wider">
                    {leader.initials}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{leader.name}</h3>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">{leader.role}</p>
                    <span className="text-[11px] font-medium text-slate-400 block mt-0.5">{leader.experience}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                    {leader.background}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Practice Domain</span>
                  <span className="text-xs text-slate-800 font-semibold">{leader.specialty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="bg-slate-950 text-white py-16 px-6 lg:px-14 text-center">
        <div className="max-w-[750px] mx-auto space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
            Begin A Dialogue
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            Elevate your team with exceptional leadership.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Whether preparing for executive succession or exploring your next career chapter, our advisory network is ready to support you.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('jobs')}
              className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors shadow-lg"
            >
              Explore Job Openings
            </button>
            <button
              onClick={() => onNavigate('industries')}
              className="px-7 py-3 border border-slate-700 hover:border-slate-500 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors bg-slate-900"
            >
              Sector Practices
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
