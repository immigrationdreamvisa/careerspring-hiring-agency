import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types.ts';
import { api } from '../services/api.ts';
import {
  X,
  Copy,
  Check,
  RotateCcw,
  Database,
} from 'lucide-react';

interface DbStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated?: () => void;
}

export const DbStatusModal: React.FC<DbStatusModalProps> = ({
  isOpen,
  onClose,
  onStatusUpdated,
}) => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await api.getSystemStatus();
      setStatus(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReset = async () => {
    if (!confirm('Reset local database store to initial verified vacancies and sample dossiers?')) {
      return;
    }
    setResetting(true);
    try {
      const res = await api.resetDatabase();
      setStatus(res.status);
      setFeedbackMsg('Database restored to initial seed state.');
      if (onStatusUpdated) onStatusUpdated();
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: any) {
      alert('Failed to reset: ' + err.message);
    } finally {
      setResetting(false);
    }
  };

  const handleCopyEnv = () => {
    const snippet = `MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/talentbridge?retryWrites=true&w=majority"\nJWT_SECRET="talentbridge_super_secret_jwt_key_2026"`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white text-slate-900 w-full max-w-2xl border border-slate-200 rounded-2xl p-7 sm:p-9 space-y-6 shadow-2xl my-6 font-sans text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 flex items-start justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block">
              Infrastructure &amp; Persistence Engine
            </span>
            <h3 className="font-bold text-2xl text-slate-900 mt-1">
              Database Verification &amp; Storage State
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedbackMsg && (
          <div className="p-3 border border-emerald-200 bg-emerald-50 rounded-xl text-emerald-800 font-semibold">
            ✓ {feedbackMsg}
          </div>
        )}

        {loading && !status ? (
          <div className="py-12 text-center text-slate-400 font-medium">Checking persistence layer...</div>
        ) : status ? (
          <div className="space-y-6">
            {/* Status Overview Card */}
            <div className="p-5 border border-slate-200 bg-slate-50 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Mode</span>
                <p className="font-bold text-base text-slate-900 capitalize flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  {status.mode === 'mongodb' ? 'MongoDB Atlas (Production)' : 'Encrypted Local JSON Storage'}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  Persistence Engine: {status.storageBackend}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Records Stored</span>
                <p className="text-xl font-mono font-bold text-slate-900">
                  {status.stats.totalJobs} Jobs · {status.stats.totalApplications} Applications
                </p>
              </div>
            </div>

            {/* Counts Matrix */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3.5 border border-slate-200 bg-white rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Jobs</span>
                <span className="font-mono text-xl font-bold text-slate-900">{status.stats.totalJobs}</span>
              </div>
              <div className="p-3.5 border border-slate-200 bg-white rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Applications</span>
                <span className="font-mono text-xl font-bold text-blue-600">{status.stats.totalApplications}</span>
              </div>
              <div className="p-3.5 border border-slate-200 bg-white rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Inquiries</span>
                <span className="font-mono text-xl font-bold text-slate-900">{status.stats.totalInquiries}</span>
              </div>
              <div className="p-3.5 border border-slate-200 bg-white rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Users</span>
                <span className="font-mono text-xl font-bold text-slate-900">{status.stats.totalUsers}</span>
              </div>
            </div>

            {/* MongoDB Connection Guidance */}
            <div className="p-5 border border-slate-200 bg-slate-50 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  MongoDB Connection Instructions
                </span>
                <button
                  onClick={handleCopyEnv}
                  className="px-3 py-1 border border-slate-200 bg-white hover:bg-slate-100 rounded-lg text-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Sample .env'}</span>
                </button>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                To switch from the local JSON store to live MongoDB Atlas, create a <code className="px-1.5 py-0.5 bg-slate-200 rounded font-mono">.env</code> file in the project root containing your <code className="px-1.5 py-0.5 bg-slate-200 rounded font-mono">MONGODB_URI</code>. The server automatically detects Atlas and migrates data seamlessly.
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={handleReset}
                disabled={resetting}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
                <span>{resetting ? 'Resetting Store...' : 'Reset to Default Jobs'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
