import React, { useState } from 'react';
import { PageView } from '../types.ts';
import { ArrowUpRight, Check, X } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView, params?: any) => void;
  onOpenServiceModal?: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 pt-16 pb-12 px-6 lg:px-14">
      <div className="max-w-[1440px] mx-auto space-y-14">

        {/* Top Section: Wordmark, Mission & Newsletter */}
        <div className="border-b border-slate-800 pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/logo-icon.png"
                  alt="CareerSpring"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-2xl tracking-tight text-white font-black uppercase leading-none">
                  CAREER<span className="text-[#FF5500]">SPRING</span>
                </span>
                <span className="text-[8.5px] tracking-[0.22em] uppercase font-bold text-slate-400 mt-1">
                  Jobs &bull; Talent &bull; Opportunities
                </span>
              </div>
            </div>
            <p className="font-sans text-base text-slate-300 font-medium">
              Connecting exceptional talent with world-class opportunities.
            </p>
            <p className="text-xs font-sans text-slate-400 leading-relaxed">
              Global hiring, specialized recruitment, and strategic talent advisory across Canada, New Zealand, Australia, Serbia, Slovenia, Greece, Latvia, Bulgaria, and Azerbaijan.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:w-96 space-y-3">
            <span className="text-xs font-sans uppercase tracking-wider text-slate-400 font-bold block">
              The Talent &amp; Market Intelligence Brief
            </span>
            <p className="text-xs text-slate-400 font-sans">
              Quarterly insights on compensation benchmarks, executive hiring, and tech talent mobility.
            </p>
            {subscribed ? (
              <p className="text-xs font-mono text-emerald-400 p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/40">
                ✓ Confirmed. Welcome to the CareerSpring Executive Brief.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border border-slate-800 rounded-xl bg-slate-900 overflow-hidden focus-within:border-blue-500 transition-colors">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@organization.com"
                  required
                  className="w-full bg-transparent px-4 py-3 text-xs font-sans text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-14 text-xs font-sans">
          {/* Col 1: Navigation */}
          <div className="space-y-4">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block">
              01 / DIRECTORY
            </span>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Overview &amp; Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Talent Search / Jobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Sector Practices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left cursor-pointer">
                  About Our Firm
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Global Offices
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Sectors */}
          <div className="space-y-4">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block">
              02 / DISCIPLINES
            </span>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('jobs', { industry: 'Information Technology' })}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Information Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs', { industry: 'Banking & Finance' })}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Banking &amp; Finance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs', { industry: 'Healthcare' })}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Healthcare &amp; Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs', { industry: 'Manufacturing' })}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Robotics &amp; Manufacturing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs', { industry: 'Retail & E-commerce' })}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Retail &amp; E-Commerce
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practices */}
          <div className="space-y-4">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block">
              03 / OPPORTUNITIES
            </span>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Executive &amp; Leadership Roles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Permanent Positions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs', { location: 'Remote' })} className="hover:text-white transition-colors text-left cursor-pointer">
                  Remote &amp; Global Roles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Contract &amp; Interim Mandates
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <p>© {new Date().getFullYear()} CareerSpring Advisory Partners. All rights reserved.</p>

          <div className="flex items-center gap-6 text-xs">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Protocol
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-lg w-full rounded-2xl border border-slate-200 p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-sans font-bold text-xl text-slate-900">
                {activeLegalModal === 'privacy' ? 'Privacy Protocol & Confidentiality' : 'Terms of Engagement'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-slate-400 hover:text-slate-800 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-600 font-sans text-xs leading-relaxed max-h-64 overflow-y-auto pr-2">
              <p>
                CareerSpring adheres to strict candidate confidentiality and bilateral non-disclosure standards. Resumes, credentials, and executive career records are reviewed exclusively by authorized Senior Search Partners and active hiring principals under confirmed retained search agreements.
              </p>
              <p>
                We do not sell, exchange, or publicly index candidate data. All candidate and client information is protected by industry standard encryption protocols and access-controlled infrastructure.
              </p>
              <p>
                For questions regarding data retention or to request complete purge of candidate dossiers, contact compliance@careerspring.example.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Acknowledge Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
