import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#DFE2DA] bg-[#F4F3EE] py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#69716B]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#35483B] flex items-center justify-center text-[#F4F3EE]">
            <Compass className="w-3 h-3" />
          </div>
          <span className="font-semibold text-[#252A27]">GEO-MORRISON</span>
          <span>·</span>
          <span>Geology Learning & Fieldwork Companion</span>
        </div>
        <div className="flex items-center gap-6 text-center md:text-right">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#526B57]" />
            Educational Aid (Verify field measurements & lab testing independently)
          </span>
          <span>© {new Date().getFullYear()} Geo-Morrison</span>
        </div>
      </div>
    </footer>
  );
}
