import React from 'react';
import { PageView } from '../types.ts';
import { INDUSTRIES_DATA } from '../data/recruitmentData.ts';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (page: PageView, params?: any) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Title Banner */}
      <section className="border-b border-slate-200 pt-14 pb-14 px-6 lg:px-14 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Industry Practices &amp; Disciplines</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Specialized By Discipline. Built On Rigor.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                We reject superficial generalist recruiting. Our practice leaders are veteran professionals with authentic fluency in technical architectures, corporate operations, and global talent markets.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <button
                onClick={() => onNavigate('jobs')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-blue-600 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors shadow-sm"
              >
                <span>Browse Practice Roles</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Index of the Sectors */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 py-12">
        <div className="space-y-6">
          {INDUSTRIES_DATA.map((ind, idx) => (
            <article
              key={ind.id}
              className="p-8 sm:p-10 border border-slate-200 bg-white rounded-2xl shadow-sm hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Index Number */}
                <div className="lg:col-span-1">
                  <span className="font-mono text-sm text-blue-600 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Name, Headline, Description */}
                <div className="lg:col-span-4 space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate('jobs', {
                        industry: ind.jobIndustry,
                      })
                    }
                    className="text-left font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {ind.name}
                  </button>
                  <p className="text-xs uppercase tracking-wider text-blue-600 font-bold">
                    {ind.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {ind.description}
                  </p>
                </div>

                {/* Placements & Specialties */}
                <div className="lg:col-span-4 space-y-2.5">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                    Representative Key Roles
                  </span>
                  <div className="space-y-1.5">
                    {ind.typicalRoles.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="lg:col-span-3 lg:text-right pt-4 lg:pt-0">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate('jobs', {
                        industry: ind.jobIndustry,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white rounded-xl text-slate-800 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <span>View {ind.jobIndustry} Roles</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cross-Discipline Consultation Banner */}
      <section className="bg-slate-950 text-white py-16 px-6 lg:px-14 text-center">
        <div className="max-w-[750px] mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
            Multi-Disciplinary Search
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            Does your leadership requirement span multiple sectors?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            From healthtech AI to fintech supply chains, our practice teams collaborate seamlessly on hybrid searches.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('jobs')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors shadow-lg"
            >
              Explore All Open Positions ↗
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
