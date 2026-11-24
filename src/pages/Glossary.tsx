import React, { useState } from 'react';
import { Layers, Search, Sparkles, Copy, Check, Bookmark, Loader2, ArrowRight } from 'lucide-react';
import { STARTER_GLOSSARY } from '../lib/glossaryTerms';
import { GlossaryTerm } from '../types/geology';
import { saveSession } from '../lib/history';

export function Glossary() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(STARTER_GLOSSARY[0]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<GlossaryTerm | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const categories = ['All', 'General Geology', 'Mineralogy', 'Petrology', 'Sedimentology', 'Structural Geology', 'Stratigraphy', 'Hydrology', 'Geomorphology', 'GIS'];

  const filteredTerms = STARTER_GLOSSARY.filter((t) => {
    const matchesSearch = t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.simpleExplanation.toLowerCase().includes(search.toLowerCase()) ||
      t.technicalDefinition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    // Check if exact match in starter glossary
    const found = STARTER_GLOSSARY.find((t) => t.term.toLowerCase() === search.toLowerCase());
    if (found) {
      setActiveTerm(found);
      setAiResult(null);
      return;
    }

    setAiLoading(true);
    setAiResult(null);
    setSaved(false);

    try {
      const res = await fetch('/api/geo/glossary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: search }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to explain term.');
      }
      setAiResult(data.data);
      setActiveTerm(null);
    } catch (err: any) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopy = () => {
    const termObj = activeTerm || aiResult;
    if (!termObj) return;
    const text = `${termObj.term} (${termObj.category})\n\nTechnical Definition:\n${termObj.technicalDefinition}\n\nSimple Explanation:\n${termObj.simpleExplanation}\n\nExample:\n${termObj.example}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const termObj = activeTerm || aiResult;
    if (!termObj) return;
    saveSession('glossary', termObj.term, termObj);
    setSaved(true);
  };

  const currentDisplay = activeTerm || aiResult;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>Geological Glossary</span>
        </div>
        <h1 className="text-3xl font-bold text-[#252A27]">Geological Terminology & Definitions</h1>
        <p className="text-sm text-[#69716B] mt-1">Search reviewed starter terms or request AI-assisted definitions for unfamiliar geological vocabulary.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Search & List */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleSearchAI} className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#69716B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search or ask AI for a term..."
              className="w-full pl-10 pr-24 py-2.5 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#FFFFFF] focus:outline-none focus:border-[#526B57]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-[#526B57] text-[#FFFFFF] rounded-md text-xs font-semibold hover:bg-[#35483B] transition-colors"
            >
              Ask AI
            </button>
          </form>

          {/* Categories filter */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${selectedCategory === cat ? 'bg-[#35483B] text-[#FFFFFF]' : 'bg-[#E7ECE4] text-[#35483B] hover:bg-[#D9D4C8]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List of terms */}
          <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl overflow-hidden divide-y divide-[#DFE2DA] max-h-[500px] overflow-y-auto">
            {filteredTerms.length === 0 ? (
              <div className="p-6 text-center text-sm text-[#69716B]">
                No matching terms found in starter glossary. Click "Ask AI" above to generate an explanation for "{search}".
              </div>
            ) : (
              filteredTerms.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setActiveTerm(t);
                    setAiResult(null);
                    setSaved(false);
                  }}
                  className={`p-4 cursor-pointer transition-colors hover:bg-[#F4F3EE] ${activeTerm?.id === t.id && !aiResult ? 'bg-[#E7ECE4]/60 border-l-4 border-l-[#526B57]' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#252A27]">{t.term}</h3>
                    <span className="text-[10px] text-[#69716B] bg-[#F4F3EE] px-2 py-0.5 rounded">{t.category}</span>
                  </div>
                  <p className="text-xs text-[#69716B] mt-1 line-clamp-1">{t.simpleExplanation}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: Detailed View */}
        <div className="lg:col-span-7">
          {aiLoading ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-8 h-8 text-[#526B57] animate-spin mb-4" />
              <p className="text-sm font-medium text-[#252A27]">Consulting geological literature...</p>
            </div>
          ) : currentDisplay ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-[#DFE2DA] pb-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E7ECE4] text-[#35483B] uppercase inline-block mb-2">
                    {currentDisplay.category} {aiResult && '· AI Generated'}
                  </span>
                  <h2 className="text-2xl font-bold text-[#252A27]">{currentDisplay.term}</h2>
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
                    {saved ? 'Saved' : 'Save Term'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Technical Definition</h4>
                  <p className="text-sm text-[#252A27] leading-relaxed font-serif bg-[#F4F3EE]/40 p-3.5 rounded-lg border border-[#DFE2DA]/60">
                    {currentDisplay.technicalDefinition}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Simple Explanation</h4>
                  <p className="text-sm text-[#252A27] leading-relaxed">
                    {currentDisplay.simpleExplanation}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Field Example or Context</h4>
                  <p className="text-sm text-[#252A27] leading-relaxed">
                    {currentDisplay.example}
                  </p>
                </div>

                {currentDisplay.relatedTerms && currentDisplay.relatedTerms.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-2">Related Terms</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentDisplay.relatedTerms.map((rt, i) => (
                        <span key={i} className="text-xs bg-[#E7ECE4] text-[#35483B] px-3 py-1 rounded-md font-medium">
                          {rt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-12 text-center text-sm text-[#69716B] min-h-[400px] flex items-center justify-center">
              Select a term from the list or search for a new geological term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
