import React from 'react';
import { ServiceDetail } from '../types.ts';
import { X, ArrowUpRight, Check } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHire: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onNavigateToHire,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white text-slate-900 w-full max-w-2xl border border-slate-200 rounded-2xl p-7 sm:p-9 space-y-6 shadow-2xl my-8 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 flex items-start justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block">
              Practice Specification
            </span>
            <h3 className="font-bold text-2xl sm:text-3xl text-slate-900 mt-1">{service.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{service.shortDescription}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-slate-500 block font-bold">
            Strategic Overview &amp; Advisory Methodology
          </span>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {service.fullOverview}
          </p>
        </div>

        {/* Key Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block mb-1">
              Typical Timeline
            </span>
            <p className="font-bold text-slate-900 text-sm">{service.typicalTimeline}</p>
          </div>
          <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Target Organization Context
            </span>
            <p className="text-slate-800 text-xs font-medium">{service.bestSuitedFor}</p>
          </div>
        </div>

        {/* Value Deliverables */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <span className="text-xs uppercase tracking-wider text-slate-500 block font-bold">
            Core Service Commitments
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {service.keyBenefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToHire();
            }}
            className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
          >
            <span>Retain Us for {service.title}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
