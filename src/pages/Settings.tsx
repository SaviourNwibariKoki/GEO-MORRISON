import React from 'react';
import { Settings as SettingsIcon, Shield, Trash2, Database, Info, ExternalLink } from 'lucide-react';
import { clearAllSessions, getSavedSessions } from '../lib/history';

export function Settings() {
  const sessionCount = getSavedSessions().length;

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved sessions? This cannot be undone.')) {
      clearAllSessions();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
          <SettingsIcon className="w-4 h-4" />
          <span>Settings & Preferences</span>
        </div>
        <h1 className="text-3xl font-bold text-[#252A27]">Application Settings & Data Controls</h1>
        <p className="text-sm text-[#69716B] mt-1">Manage local storage data, privacy controls, and view educational usage disclosures.</p>
      </div>

      <div className="space-y-6">
        {/* Local Storage Card */}
        <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#252A27]">Local Study History</h2>
                <p className="text-xs text-[#69716B]">Currently storing {sessionCount} saved session(s) in browser localStorage.</p>
              </div>
            </div>
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 bg-[#B4473E]/10 text-[#B4473E] hover:bg-[#B4473E]/20 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              Clear Saved Data
            </button>
          </div>
          <p className="text-xs text-[#69716B] leading-relaxed">
            Note: Study history belongs exclusively to your current browser and device. It is never transmitted to external cloud servers or synced automatically across devices.
          </p>
        </div>

        {/* Responsible AI & Scientific Disclaimer Card */}
        <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#252A27]">Scientific Integrity & Disclaimer</h2>
              <p className="text-xs text-[#69716B]">Important guidance on responsible AI use in geoscience education.</p>
            </div>
          </div>
          <div className="text-xs text-[#69716B] leading-relaxed space-y-2 bg-[#F4F3EE]/50 p-4 rounded-lg border border-[#DFE2DA]/60">
            <p>
              <strong>GEO-MORRISON</strong> is designed strictly as an educational study and fieldwork assistant. It is not a substitute for field verification, laboratory testing (e.g., thin-section petrography, XRD, geochemical assay), authoritative geological maps, or professional engineering judgement.
            </p>
            <p>
              Field observation reports preserve your exact user-entered measurements without fabricating location or structural data. Image exploration results are preliminary visual aids and must not be treated as definitive mineral, rock, fossil, or formation identifications.
            </p>
          </div>
        </div>

        {/* About App Card */}
        <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#252A27]">About GEO-MORRISON</h2>
              <p className="text-xs text-[#69716B]">Version 1.0 MVP · Built for Earth Science Students</p>
            </div>
          </div>
          <p className="text-xs text-[#69716B]">
            Powered by Google Gemini API and React. Designed following Geological Field Journal principles with zero decorative AI slop.
          </p>
        </div>
      </div>
    </div>
  );
}
