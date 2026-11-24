import React, { useState } from 'react';
import { BookOpen, Send, Sparkles, Copy, Check, Bookmark, Loader2, Image as ImageIcon } from 'lucide-react';
import { saveSession } from '../lib/history';

export function Tutor() {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('Sedimentology');
  const [level, setLevel] = useState('Undergraduate');
  const [format, setFormat] = useState('Concept explanation');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeStudyGuide, setActiveStudyGuide] = useState<string | null>(null);

  const studyGuides = [
    {
      id: 'igneous',
      title: 'Classification of Igneous Rocks',
      description: 'Phaneritic, aphanitic, glassy, vesicular, and pyroclastic textures with porphyritic phenocryst structure.',
      image: '/src/assets/images/igneous_rock_classification_1795550884713.jpg',
    },
    {
      id: 'sedimentary',
      title: 'Sedimentary Rock Structures',
      description: 'Cross-bedding, lamination, ripple marks, and palaeocurrent indicators in fluvial-deltaic sequences.',
      image: '/src/assets/images/sedimentary_rock_structures_1795550886605.jpg',
    },
    {
      id: 'metamorphic',
      title: 'Metamorphic Mineral Foliation',
      description: 'Microscopic and outcrop views of schist foliation and gneissic banding under directed tectonic stress.',
      image: '/src/assets/images/metamorphic_mineral_foliation_1795550886744.jpg',
    },
  ];

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Enter a geology topic or question to continue.');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    setSaved(false);

    try {
      const res = await fetch('/api/geo/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, subject, level, format }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to generate explanation.');
      }
      setResult(data.data);
    } catch (err: any) {
      setError(err.message || 'Connection problem. Check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.introduction}\n\n` +
      result.sections.map((s: any) => `${s.heading}\n${s.content}`).join('\n\n') +
      `\n\nRecap:\n${result.recap}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveSession('tutor', result.title || question, { question, subject, level, format, result });
    setSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Geology Tutor & Visual Study Guides</span>
        </div>
        <h1 className="text-3xl font-bold text-[#252A27]">Geological Concept Explainer</h1>
        <p className="text-sm text-[#69716B] mt-1">Ask questions about geological processes, terminology, structures, or strata with level-adjusted explanations and high-fidelity visual study guides.</p>
      </div>

      {/* Visual Study Guides Section */}
      <div className="mb-10 bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#526B57]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#252A27]">Visual Study Guides (Rock Classifications & Mineral Structures)</h2>
          </div>
          <span className="text-xs text-[#69716B]">Click any guide to inspect</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studyGuides.map((sg) => (
            <div
              key={sg.id}
              onClick={() => setActiveStudyGuide(activeStudyGuide === sg.id ? null : sg.id)}
              className={`rounded-lg border p-3.5 cursor-pointer transition-all ${activeStudyGuide === sg.id ? 'border-[#526B57] bg-[#E7ECE4]/50 shadow-sm' : 'border-[#DFE2DA] hover:border-[#69716B] bg-[#F4F3EE]/40'}`}
            >
              <div className="aspect-video rounded overflow-hidden mb-2.5 bg-black/5">
                <img src={sg.image} alt={sg.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xs font-bold text-[#252A27]">{sg.title}</h3>
              <p className="text-[11px] text-[#69716B] mt-1 line-clamp-2">{sg.description}</p>
            </div>
          ))}
        </div>

        {activeStudyGuide && (
          <div className="mt-6 pt-6 border-t border-[#DFE2DA]">
            {(() => {
              const guide = studyGuides.find((g) => g.id === activeStudyGuide);
              if (!guide) return null;
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#252A27]">{guide.title}</h3>
                    <button
                      onClick={() => setActiveStudyGuide(null)}
                      className="text-xs text-[#69716B] hover:text-[#252A27] underline"
                    >
                      Close view
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-[#DFE2DA] bg-black/5 max-h-[500px]">
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-contain mx-auto" referrerPolicy="no-referrer" />
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleAsk} className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 mb-8 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
            Geology Question or Topic *
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Explain Walther's Law and how it applies to transgressive and regressive marine sequences."
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-[#DFE2DA] text-[#252A27] focus:outline-none focus:border-[#526B57] text-sm bg-[#F4F3EE]/30"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
              Subject Area
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#FFFFFF] focus:outline-none focus:border-[#526B57]"
            >
              <option value="Sedimentology">Sedimentology & Stratigraphy</option>
              <option value="Structural Geology">Structural Geology</option>
              <option value="Mineralogy">Mineralogy & Petrology</option>
              <option value="Geomorphology">Geomorphology & Hydrology</option>
              <option value="General Geology">General Geology</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
              Explanation Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#FFFFFF] focus:outline-none focus:border-[#526B57]"
            >
              <option value="Simple">Simple (Beginner)</option>
              <option value="Undergraduate">Undergraduate (Standard)</option>
              <option value="Detailed">Detailed (Advanced)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#FFFFFF] focus:outline-none focus:border-[#526B57]"
            >
              <option value="Concept explanation">Concept explanation</option>
              <option value="Step-by-step">Step-by-step process</option>
              <option value="Example-based">Example-based</option>
              <option value="Compare two concepts">Compare concepts</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-[#B4473E]/10 border border-[#B4473E]/30 text-[#B4473E] text-xs font-medium">
            {error}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#526B57] text-[#FFFFFF] rounded-lg font-semibold hover:bg-[#35483B] transition-colors flex items-center gap-2 disabled:opacity-50 text-sm shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Preparing explanation...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Ask Tutor
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {result && (
        <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#DFE2DA] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#69716B] mb-1">
                <span>{subject}</span>
                <span>·</span>
                <span>{level}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#252A27]">{result.title}</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-medium border border-[#DFE2DA] rounded-lg text-[#252A27] hover:bg-[#D9D4C8]/30 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#397451]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleSave}
                disabled={saved}
                className="px-3 py-1.5 text-xs font-medium bg-[#E7ECE4] text-[#35483B] rounded-lg hover:bg-[#D9D4C8] flex items-center gap-1.5 transition-colors disabled:opacity-70"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {saved ? 'Saved to History' : 'Save Session'}
              </button>
            </div>
          </div>

          <div className="text-sm text-[#252A27] leading-relaxed font-serif bg-[#F4F3EE]/40 p-4 rounded-lg border border-[#DFE2DA]/60">
            {result.introduction}
          </div>

          <div className="space-y-6 pt-2">
            {result.sections?.map((sec: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-bold text-[#35483B]">{sec.heading}</h3>
                <p className="text-sm text-[#252A27] leading-relaxed whitespace-pre-line">{sec.content}</p>
              </div>
            ))}
          </div>

          {result.recap && (
            <div className="bg-[#E7ECE4]/50 border border-[#526B57]/20 rounded-xl p-5 mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#35483B] mb-2">Revision Recap</h4>
              <p className="text-sm text-[#252A27] leading-relaxed">{result.recap}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
