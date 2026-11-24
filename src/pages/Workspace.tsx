import React, { useEffect, useState } from 'react';
import { Compass, BookOpen, Layers, Sparkles, Map, FileText, HelpCircle, History, ArrowRight, Trash2 } from 'lucide-react';
import { getSavedSessions } from '../lib/history';
import { SavedSession } from '../types/geology';

interface WorkspaceProps {
  onNavigate: (route: string) => void;
}

export function Workspace({ onNavigate }: WorkspaceProps) {
  const [recentSessions, setRecentSessions] = useState<SavedSession[]>([]);

  useEffect(() => {
    setRecentSessions(getSavedSessions().slice(0, 5));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#252A27]">Field Workspace</h1>
          <p className="text-sm text-[#69716B] mt-1">Select a geological study tool or review your saved fieldwork sessions.</p>
        </div>
        <button
          onClick={() => onNavigate('history')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#526B57] hover:text-[#35483B] bg-[#E7ECE4] px-3.5 py-2 rounded-lg self-start md:self-auto transition-colors"
        >
          <History className="w-4 h-4" />
          View All History ({getSavedSessions().length})
        </button>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          onClick={() => onNavigate('tutor')}
          className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#252A27]">Geology Tutor</h3>
          <p className="text-sm text-[#69716B] mt-2">Structured explanations, definitions, and academic context for geological topics.</p>
        </div>

        <div
          onClick={() => onNavigate('glossary')}
          className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#252A27]">Geological Glossary</h3>
          <p className="text-sm text-[#69716B] mt-2">Search curated starter terms or request AI definitions for unknown geological vocabulary.</p>
        </div>

        <div
          onClick={() => onNavigate('quiz')}
          className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#252A27]">Revision Quiz</h3>
          <p className="text-sm text-[#69716B] mt-2">Generate multiple-choice quizzes from topics or notes with scoring and explanations.</p>
        </div>

        <div
          onClick={() => onNavigate('field-notes')}
          className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#252A27]">Field Notes & Assistant</h3>
          <p className="text-sm text-[#69716B] mt-2">Organize station data and outcrop observations into a rigorous, editable report draft.</p>
        </div>

        <div
          onClick={() => onNavigate('image-explorer')}
          className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#252A27]">Image Explorer</h3>
          <p className="text-sm text-[#69716B] mt-2">Review rock, outcrop, fossil, or thin section photos with cautious visual observations.</p>
        </div>

        <div
          onClick={() => onNavigate('gis-learning')}
          className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Map className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#252A27]">GIS Learning</h3>
          <p className="text-sm text-[#69716B] mt-2">Introductory GIS, vector/raster data, coordinate systems, and QGIS map workflows.</p>
        </div>
      </div>

      {/* Recent Sessions Section */}
      <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#252A27]">Recent Saved Sessions</h2>
          <span className="text-xs text-[#69716B]">Stored locally on this browser</span>
        </div>

        {recentSessions.length === 0 ? (
          <div className="text-center py-8 text-[#69716B] text-sm">
            No saved sessions yet. Use any tool and click "Save Session" to keep your work here.
          </div>
        ) : (
          <div className="divide-y divide-[#DFE2DA]">
            {recentSessions.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#E7ECE4] text-[#35483B] uppercase">
                      {s.tool}
                    </span>
                    <span className="text-sm font-medium text-[#252A27]">{s.title}</span>
                  </div>
                  <span className="text-xs text-[#69716B] mt-0.5 block">
                    {new Date(s.createdAt).toLocaleDateString()} at {new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('history')}
                  className="text-xs font-medium text-[#526B57] hover:underline flex items-center gap-1"
                >
                  Open <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
