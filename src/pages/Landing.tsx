import React from 'react';
import { Compass, BookOpen, Layers, Sparkles, Map, ArrowRight, Shield, FileText, HelpCircle } from 'lucide-react';
import { GeologyMotion } from '../components/GeologyMotion';

interface LandingProps {
  onNavigate: (route: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#F4F3EE] text-[#252A27] flex flex-col">
      {/* Hero Section with GeologyMotion Asset */}
      <section className="relative overflow-hidden bg-[#252A27] text-white py-20 px-6">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <GeologyMotion
            poster="/src/assets/images/geological_motion_loop_1795552795019.jpg"
            src="" // optional mp4 path if available
            className="w-full h-full"
            decorative={true}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0" />

        <div className="relative z-10 max-w-6xl mx-auto text-left py-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#526B57]/80 text-[#E7ECE4] text-xs font-medium mb-6 backdrop-blur-sm border border-[#526B57]">
            <Compass className="w-3.5 h-3.5" />
            <span>Geological Field Journal & Academic Companion</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight text-white drop-shadow-sm">
            Master Earth Science, Organize Field Notes, and Interpret Outcrops with Confidence.
          </h1>
          <p className="mt-6 text-base md:text-lg text-[#D9D4C8] max-w-2xl leading-relaxed">
            GEO-MORRISON helps undergraduate geology and geoscience students understand complex concepts, revise course material, structure field observations, and learn core GIS workflows.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('workspace')}
              className="px-6 py-3 bg-[#526B57] text-white rounded-lg font-semibold hover:bg-[#35483B] transition-colors flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              Open Workspace
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('glossary')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              Explore Glossary
            </button>
          </div>
        </div>
      </section>

      {/* Core Workflows Bento / Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#252A27]">Five Practical Workflows for Earth Scientists</h2>
          <p className="text-sm text-[#69716B] mt-2">Designed with field notebook principles, rigorous scientific separation of observations, and zero AI fluff.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => onNavigate('tutor')}
            className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#252A27]">Geology Tutor</h3>
            <p className="text-sm text-[#69716B] mt-2 leading-relaxed">
              Ask about sedimentology, orogeny, facies, Walther's Law, or metamorphism with level-adjusted explanations and visual study guides.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#526B57] mt-4">
              Ask a topic <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('glossary')}
            className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#252A27]">Geological Glossary</h3>
            <p className="text-sm text-[#69716B] mt-2 leading-relaxed">
              Search curated starter terms instantly or request AI explanations for unfamiliar technical geological vocabulary.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#526B57] mt-4">
              Search glossary <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('quiz')}
            className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#252A27]">Revision Quiz</h3>
            <p className="text-sm text-[#69716B] mt-2 leading-relaxed">
              Generate custom multiple-choice quizzes from topics or study notes with difficulty settings and detailed answer explanations.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#526B57] mt-4">
              Take a quiz <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('field-notes')}
            className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#252A27]">Field Notes & Assistant</h3>
            <p className="text-sm text-[#69716B] mt-2 leading-relaxed">
              Organize station data, lithology, color, grain size, structures, and contacts into a rigorous report draft without invented data.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#526B57] mt-4">
              Draft field report <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('image-explorer')}
            className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#252A27]">Image Explorer</h3>
            <p className="text-sm text-[#69716B] mt-2 leading-relaxed">
              Review rock, outcrop, fossil, or thin section photographs with visible observations separated from tentative interpretations.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#526B57] mt-4">
              Explore image <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('gis-learning')}
            className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 hover:border-[#526B57] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E7ECE4] text-[#526B57] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#252A27]">GIS Learning</h3>
            <p className="text-sm text-[#69716B] mt-2 leading-relaxed">
              Learn vector vs. raster data, coordinate reference systems, map layers, and QGIS project workflows for geological mapping.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#526B57] mt-4">
              Learn GIS <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </section>

      {/* Scientific Safeguards Banner */}
      <section className="bg-[#D9D4C8]/30 border-y border-[#DFE2DA] py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-[#35483B] text-[#F4F3EE] flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#252A27]">Evidence Before Certainty</h2>
            <p className="text-sm text-[#69716B] mt-1 leading-relaxed">
              GEO-MORRISON is an educational companion. Field reports preserve your exact observations without fabricating measurements, and image reviews clearly separate visible evidence from provisional interpretations. Always verify critical findings with authoritative references and laboratory testing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
