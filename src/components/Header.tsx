import React from 'react';
import { Compass, BookOpen, Layers, Sparkles, Map, History, Settings, FileText } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export function Header({ currentRoute, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-[#F4F3EE]/90 backdrop-blur-md border-b border-[#DFE2DA]">
      {/* Zone 1: Brand title wordmark */}
      <button
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
      >
        <div className="w-8 h-8 rounded bg-[#35483B] flex items-center justify-center text-[#F4F3EE] shadow-sm">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight text-[#252A27] block">GEO-MORRISON</span>
          <span className="text-[10px] text-[#69716B] uppercase tracking-wider block font-medium">Field Journal & Tutor</span>
        </div>
      </button>

      {/* Zone 2: Navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#69716B]">
        <button
          onClick={() => onNavigate('workspace')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'workspace' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          Workspace
        </button>
        <button
          onClick={() => onNavigate('tutor')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'tutor' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          Tutor
        </button>
        <button
          onClick={() => onNavigate('glossary')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'glossary' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          Glossary
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'quiz' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          Quiz
        </button>
        <button
          onClick={() => onNavigate('field-notes')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'field-notes' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          Field Notes
        </button>
        <button
          onClick={() => onNavigate('image-explorer')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'image-explorer' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          Image Explorer
        </button>
        <button
          onClick={() => onNavigate('gis-learning')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'gis-learning' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          GIS Learning
        </button>
        <button
          onClick={() => onNavigate('history')}
          className={`hover:text-[#252A27] transition-colors whitespace-nowrap shrink-0 ${currentRoute === 'history' ? 'text-[#35483B] font-semibold underline underline-offset-4' : ''}`}
        >
          History
        </button>
      </nav>

      {/* Zone 3: Primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onNavigate('settings')}
          className={`p-2 rounded-lg border border-[#DFE2DA] text-[#69716B] hover:text-[#252A27] hover:bg-[#D9D4C8]/30 transition-colors ${currentRoute === 'settings' ? 'bg-[#D9D4C8]/50 text-[#252A27]' : ''}`}
          title="Settings & Data Controls"
        >
          <Settings className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNavigate('workspace')}
          className="px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#526B57] rounded-lg hover:bg-[#35483B] transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          Open Workspace
        </button>
      </div>
    </header>
  );
}
