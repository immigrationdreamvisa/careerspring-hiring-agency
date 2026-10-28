import React, { useState } from 'react';
import { Job } from '../types.ts';
import {
  X,
  Share2,
  Copy,
  Check,
  Mail,
  MessageCircle,
  ExternalLink,
  MapPin,
  DollarSign,
  Sparkles,
  Send,
  ShieldCheck,
} from 'lucide-react';

interface ShareRoleModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareRoleModal: React.FC<ShareRoleModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!isOpen || !job) return null;

  // Build canonical share URL for this role
  const shareUrl = `${window.location.origin}/?jobId=${job.id}`;

  const formatSalary = (min: number, max: number, currency: string = 'USD') => {
    const symbol =
      currency === 'AZN' ? '₼' :
      currency === 'GBP' ? '£' :
      currency === 'EUR' ? '€' :
      currency === 'CAD' ? 'CAD $' :
      currency === 'SGD' ? 'SGD $' :
      currency === 'AUD' ? 'AUD $' : '$';
    const minK = min >= 1000 ? `${(min / 1000).toFixed(min % 1000 === 0 ? 0 : 1)}k` : min.toLocaleString();
    const maxK = max >= 1000 ? `${(max / 1000).toFixed(max % 1000 === 0 ? 0 : 1)}k` : max.toLocaleString();
    return `${symbol}${minK} – ${symbol}${maxK}${currency === 'AZN' ? ' AZN' : ''}`;
  };

  const referralPitch = `Hi! I found an executive opportunity at ${job.company} that might be a great fit: ${job.title} (${job.location}) — ${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)} base. Check it out and apply here: ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(referralPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} at ${job.company}`,
          text: `Explore this role at ${job.company}: ${job.title}`,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  // Social share intent links
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Hiring Mandate: ${job.title} at ${job.company} (${job.location})`
  )}&url=${encodeURIComponent(shareUrl)}`;
  const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Take a look at this position: ${job.title} at ${job.company} (${job.location})\n${shareUrl}`
  )}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    `Job Opportunity: ${job.title} at ${job.company}`
  )}&body=${encodeURIComponent(referralPitch)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="relative bg-white text-slate-900 w-full max-w-lg border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                Share Mandate
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900 mt-0.5">
                Share This Opportunity
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Highlight Card */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                {job.company}
              </span>
              <h4 className="font-bold text-base text-slate-900 leading-snug">
                {job.title}
              </h4>
            </div>
            <div
              className={`w-9 h-9 rounded-xl ${job.companyLogoColor || 'bg-slate-900'} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs overflow-hidden border border-slate-100/50`}
            >
              {job.companyLogoUrl ? (
                <img
                  src={job.companyLogoUrl}
                  alt={job.company}
                  className="w-full h-full object-contain p-0.5"
                />
              ) : (
                job.company.charAt(0)
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.location}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-slate-900">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</span>
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">
              {job.workplaceType}
            </span>
          </div>
        </div>

        {/* Direct Link Copy Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Direct Share URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:bg-white select-all"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-xs ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social & Channel Quick Share Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Quick Share Channels
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* LinkedIn */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 rounded-xl text-slate-700 hover:text-[#0A66C2] transition-colors group text-center"
            >
              <span className="font-bold text-sm text-[#0A66C2] mb-1">LinkedIn</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-600">Post update</span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:border-[#25D366] hover:bg-[#25D366]/5 rounded-xl text-slate-700 hover:text-[#25D366] transition-colors group text-center"
            >
              <span className="font-bold text-sm text-[#25D366] mb-1">WhatsApp</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-600">Send chat</span>
            </a>

            {/* Twitter / X */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:border-slate-900 hover:bg-slate-50 rounded-xl text-slate-700 hover:text-slate-900 transition-colors group text-center"
            >
              <span className="font-bold text-sm text-slate-900 mb-1">X (Twitter)</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-600">Post tweet</span>
            </a>

            {/* Email */}
            <a
              href={mailtoUrl}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 rounded-xl text-slate-700 hover:text-blue-600 transition-colors group text-center"
            >
              <span className="font-bold text-sm text-blue-600 mb-1">Email</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-600">Send mailto</span>
            </a>
          </div>
        </div>

        {/* Native Web Share Button (if supported) */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share via Device Apps (AirDrop, Messages, Slack)...</span>
          </button>
        )}

        {/* Pre-crafted Referral Note */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Pre-Crafted Referral Text
            </label>
            <button
              onClick={handleCopyPitch}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copiedPitch ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600">Copied text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-sans select-all">
            {referralPitch}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Official CareerSpring Verified Mandate</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
