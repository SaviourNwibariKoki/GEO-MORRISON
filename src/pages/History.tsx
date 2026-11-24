import React, { useEffect, useState } from 'react';
import { History as HistoryIcon, Trash2, Search, ArrowRight, BookOpen, Layers, Sparkles, FileText, HelpCircle, Map } from 'lucide-react';
import { getSavedSessions, deleteSession, clearAllSessions } from '../lib/history';
import { SavedSession } from '../types/geology';

interface HistoryProps {
  onNavigate: (route: string) => void;
}

export function History({ onNavigate }: HistoryProps) {
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSession, setSelectedSession] = useState<SavedSession | null>(null);

  useEffect(() => {
    const loaded = getSavedSessions();
    setSessions(loaded);
    if (loaded.length > 0) {
      setSelectedSession(loaded[0]);
    }
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteSession(id);
    setSessions(updated);
    if (selectedSession?.id === id) {
      setSelectedSession(updated[0] || null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved sessions from local storage?')) {
      clearAllSessions();
      setSessions([]);
      setSelectedSession(null);
    }
  };

  const filtered = sessions.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.tool.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
            <HistoryIcon className="w-4 h-4" />
            <span>Study History</span>
          </div>
          <h1 className="text-3xl font-bold text-[#252A27]">Saved Fieldwork & Study Sessions</h1>
          <p className="text-sm text-[#69716B] mt-1">Review, reopen, or manage sessions stored in your browser's local storage.</p>
        </div>
        {sessions.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-[#B4473E]/10 text-[#B4473E] hover:bg-[#B4473E]/20 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            Clear All History
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sessions list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#69716B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved sessions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DFE2DA] text-sm bg-white focus:outline-none focus:border-[#526B57]"
            />
          </div>

          <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl overflow-hidden divide-y divide-[#DFE2DA] max-h-[550px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#69716B]">
                No saved sessions found. Save study results from any tool to view them here.
              </div>
            ) : (
              filtered.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSession(s)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-[#F4F3EE] flex items-center justify-between ${selectedSession?.id === s.id ? 'bg-[#E7ECE4]/60 border-l-4 border-l-[#526B57]' : ''}`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E7ECE4] text-[#35483B] uppercase">
                        {s.tool}
                      </span>
                      <span className="text-xs text-[#69716B]">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#252A27] truncate">{s.title}</h3>
                  </div>
                  <button
                    onClick={(e) => handleDelete(s.id, e)}
                    className="p-1.5 text-[#69716B] hover:text-[#B4473E] hover:bg-white rounded transition-colors shrink-0"
                    title="Delete session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Session Detail View */}
        <div className="lg:col-span-7">
          {selectedSession ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-[#DFE2DA] pb-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E7ECE4] text-[#35483B] uppercase inline-block mb-2">
                    {selectedSession.tool}
                  </span>
                  <h2 className="text-2xl font-bold text-[#252A27]">{selectedSession.title}</h2>
                  <span className="text-xs text-[#69716B] mt-1 block">
                    Saved on {new Date(selectedSession.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (selectedSession.tool === 'tutor') onNavigate('tutor');
                    else if (selectedSession.tool === 'glossary') onNavigate('glossary');
                    else if (selectedSession.tool === 'quiz') onNavigate('quiz');
                    else if (selectedSession.tool === 'field-notes') onNavigate('field-notes');
                    else if (selectedSession.tool === 'image-explorer') onNavigate('image-explorer');
                    else onNavigate('workspace');
                  }}
                  className="px-3.5 py-2 bg-[#526B57] text-white rounded-lg text-xs font-semibold hover:bg-[#35483B] transition-colors shrink-0 flex items-center gap-1.5"
                >
                  Open Tool <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* JSON preview / formatted display */}
              <div className="bg-[#F4F3EE]/50 border border-[#DFE2DA]/60 rounded-xl p-4 max-h-[450px] overflow-y-auto">
                <pre className="text-xs text-[#252A27] font-mono whitespace-pre-wrap">
                  {JSON.stringify(selectedSession.content, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-12 text-center text-sm text-[#69716B] min-h-[450px] flex items-center justify-center">
              Select a session from the list to view its contents.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
