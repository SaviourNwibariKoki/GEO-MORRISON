import React, { useState } from 'react';
import { Map, BookOpen, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { saveSession } from '../lib/history';

export function GisLearning() {
  const starterTopics = [
    {
      title: 'What is GIS in Geology?',
      description: 'Geographic Information Systems (GIS) integrate spatial coordinate data with attribute tables to analyze geological distributions, strike-slip faults, and mineral deposits.',
      relevance: 'Essential for compiling field mapping data into digital spatial databases.'
    },
    {
      title: 'Vector vs. Raster Data',
      description: 'Vector data uses points, lines, and polygons (e.g., fault traces, boreholes, outcrop boundaries). Raster data uses a grid of pixels (e.g., Digital Elevation Models, satellite imagery).',
      relevance: 'Geologists use vectors for structural features and rasters for elevation and slope analysis.'
    },
    {
      title: 'Coordinate Reference Systems (CRS)',
      description: 'CRSs define how flat 2D map coordinates relate to real 3D locations on Earth using datums and projections (e.g., UTM, WGS 84).',
      relevance: 'Misaligned CRS between GPS field points and base maps will cause spatial shifts of hundreds of meters.'
    },
    {
      title: 'Basic QGIS Mapping Workflow',
      description: '1. Set project CRS.\n2. Import vector layers (shapefiles, GPX tracks).\n3. Add raster DEM background.\n4. Style strata units and faults by attribute.\n5. Export geological map layout.',
      relevance: 'Standard open-source workflow for student geological maps and cross-sections.'
    }
  ];

  const [activeTopic, setActiveTopic] = useState(starterTopics[0]);
  const [customTopic, setCustomTopic] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleAskAI = async (topicTitle: string) => {
    setCustomTopic(topicTitle);
    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/geo/gis-learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicTitle }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message);
      setAiResult(data.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
          <Map className="w-4 h-4" />
          <span>GIS Learning Assistant</span>
        </div>
        <h1 className="text-3xl font-bold text-[#252A27]">Introduction to GIS & QGIS for Geologists</h1>
        <p className="text-sm text-[#69716B] mt-1">Learn core spatial concepts, coordinate reference systems, map layers, and QGIS workflows tailored for earth scientists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topics list */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#69716B]">Starter GIS Modules</h2>
          <div className="space-y-3">
            {starterTopics.map((st, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveTopic(st);
                  setAiResult(null);
                  setCustomTopic(st.title);
                }}
                className={`bg-[#FFFFFF] border rounded-xl p-5 cursor-pointer transition-all hover:border-[#526B57] ${customTopic === st.title ? 'border-[#526B57] bg-[#E7ECE4]/40 shadow-sm' : 'border-[#DFE2DA]'}`}
              >
                <h3 className="text-base font-semibold text-[#252A27]">{st.title}</h3>
                <p className="text-xs text-[#69716B] mt-1.5 leading-relaxed line-clamp-2">{st.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#526B57]">
                  <span>Explore module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Ask AI custom GIS topic */}
          <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-5 space-y-3 mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#35483B]">Ask GIS Question</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g., How to georeference a paper map in QGIS..."
                className="w-full px-3 py-2 text-xs border border-[#DFE2DA] rounded-lg focus:outline-none focus:border-[#526B57]"
              />
              <button
                onClick={() => handleAskAI(customTopic)}
                disabled={aiLoading || !customTopic.trim()}
                className="px-4 py-2 bg-[#526B57] text-white rounded-lg text-xs font-semibold hover:bg-[#35483B] disabled:opacity-50 shrink-0"
              >
                {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ask'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed explanation */}
        <div className="lg:col-span-7">
          {aiLoading ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-12 text-center min-h-[450px] flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#526B57] animate-spin mb-3" />
              <p className="text-sm text-[#252A27]">Preparing GIS guidance...</p>
            </div>
          ) : aiResult ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E7ECE4] text-[#35483B] uppercase inline-block mb-2">GIS Tutorial · AI Assisted</span>
                <h2 className="text-2xl font-bold text-[#252A27]">{aiResult.topic}</h2>
              </div>

              <div className="space-y-4 text-sm text-[#252A27]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#69716B] mb-1">Definition</h4>
                  <p className="leading-relaxed bg-[#F4F3EE]/40 p-3.5 rounded-lg border border-[#DFE2DA]/60">{aiResult.definition}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#69716B] mb-1">Geoscience Relevance</h4>
                  <p className="leading-relaxed">{aiResult.geoscienceRelevance}</p>
                </div>

                {aiResult.workflowSteps && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#35483B] mb-2">Workflow Steps</h4>
                    <ol className="list-decimal list-inside space-y-1.5 bg-[#E7ECE4]/30 p-4 rounded-lg">
                      {aiResult.workflowSteps.map((step: string, i: number) => (
                        <li key={i} className="text-sm">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {aiResult.commonPitfalls && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#B4473E] mb-2">Common Student Pitfalls</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#69716B]">
                      {aiResult.commonPitfalls.map((p: string, i: number) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E7ECE4] text-[#35483B] uppercase inline-block mb-2">GIS Module</span>
                <h2 className="text-2xl font-bold text-[#252A27]">{activeTopic.title}</h2>
              </div>

              <div className="space-y-4 text-sm text-[#252A27]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#69716B] mb-1">Concept Overview</h4>
                  <p className="leading-relaxed whitespace-pre-line bg-[#F4F3EE]/40 p-4 rounded-lg border border-[#DFE2DA]/60">
                    {activeTopic.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#35483B] mb-1">Geoscience Application</h4>
                  <p className="leading-relaxed p-4 bg-[#E7ECE4]/30 rounded-lg">
                    {activeTopic.relevance}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
