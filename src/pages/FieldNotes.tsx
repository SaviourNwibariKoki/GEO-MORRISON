import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check, Bookmark, Loader2, RotateCcw } from 'lucide-react';
import { FieldObservation, FieldReportResult } from '../types/geology';
import { saveSession } from '../lib/history';

export function FieldNotes() {
  const [formData, setFormData] = useState<FieldObservation>({
    stationName: 'Station 4B - Bonny Road Exposure',
    dateTime: new Date().toISOString().substring(0, 16),
    coordinates: 'N 06° 12.450\', E 007° 01.230\'',
    elevation: '145 m',
    exposureDescription: 'Approx. 8m high road-cut exposure of moderately weathered interbedded sandstone and shale. Beds strike N 45° E and dip 32° SE.',
    lithology: 'Medium to fine-grained quartz arenite interbedded with dark grey laminated shale.',
    color: 'Buff to pale yellow sandstone; dark grey shale.',
    grainSizeAndTexture: 'Sandstone: medium-grained, sub-rounded quartz grains, moderately sorted. Shale: micro-crystalline clay matrix.',
    structuresObserved: 'Trough cross-lamination in sandstone units; minor bioturbation burrows on bedding planes of shale.',
    beddingDipStrike: 'Strike: N 45° E, Dip: 32° SE',
    relationshipsContacts: 'Sharp, erosional lower contact of sandstone channel cutting into underlying shale.',
    weatherConditions: 'Overcast, 28°C, dry exposure.',
    additionalNotes: 'Sample collected for thin-section petrography (Sample ID: BM-04).',
    reportStyle: 'Structured field report',
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<FieldReportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.exposureDescription.trim()) {
      setError('Add an outcrop or exposure description before drafting a report.');
      return;
    }
    setError(null);
    setLoading(true);
    setReport(null);
    setSaved(false);

    try {
      const res = await fetch('/api/geo/field-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to generate field report.');
      }
      setReport(data.data);
    } catch (err: any) {
      setError(err.message || 'Connection problem. Check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!report) return;
    const text = `${report.title}\n\n` +
      report.sections.map((s) => `${s.heading.toUpperCase()}\n${s.content}`).join('\n\n') +
      (report.missingInformation?.length ? `\n\nMissing Information / To Investigate:\n` + report.missingInformation.map((m) => `- ${m}`).join('\n') : '');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!report) return;
    saveSession('field-notes', formData.stationName || 'Field Observation', { formData, report });
    setSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Field Notes & Report Assistant</span>
        </div>
        <h1 className="text-3xl font-bold text-[#252A27]">Geological Field Observation Assistant</h1>
        <p className="text-sm text-[#69716B] mt-1">Organize your outcrop station measurements and descriptions into a rigorous, professional report draft without fabricated data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-6">
          <form onSubmit={handleGenerateReport} className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#252A27] pb-2 border-b border-[#DFE2DA]">Station Observation Form</h2>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Station / Location Name</label>
              <input
                type="text"
                value={formData.stationName}
                onChange={(e) => setFormData({ ...formData, stationName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Elevation</label>
                <input
                  type="text"
                  value={formData.elevation}
                  onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                  placeholder="e.g. 145 m"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Coordinates (Optional)</label>
              <input
                type="text"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                placeholder="e.g. N 06° 12.450', E 007° 01.230'"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Outcrop / Exposure Description *</label>
              <textarea
                rows={3}
                value={formData.exposureDescription}
                onChange={(e) => setFormData({ ...formData, exposureDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                placeholder="Describe general exposure, dimensions, weathering..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Lithology / Rock Type</label>
                <input
                  type="text"
                  value={formData.lithology}
                  onChange={(e) => setFormData({ ...formData, lithology: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Color</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Grain Size & Texture</label>
              <input
                type="text"
                value={formData.grainSizeAndTexture}
                onChange={(e) => setFormData({ ...formData, grainSizeAndTexture: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Structures Observed</label>
                <input
                  type="text"
                  value={formData.structuresObserved}
                  onChange={(e) => setFormData({ ...formData, structuresObserved: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Bedding / Dip & Strike</label>
                <input
                  type="text"
                  value={formData.beddingDipStrike}
                  onChange={(e) => setFormData({ ...formData, beddingDipStrike: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Relationships & Contacts</label>
              <input
                type="text"
                value={formData.relationshipsContacts}
                onChange={(e) => setFormData({ ...formData, relationshipsContacts: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1">Additional Notes / Samples</label>
              <input
                type="text"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
              />
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
                className="w-full py-2.5 bg-[#526B57] text-[#FFFFFF] rounded-lg font-semibold hover:bg-[#35483B] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Drafting report...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Field Report Draft
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Report Output Column */}
        <div className="lg:col-span-6">
          {report ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6 sticky top-24">
              <div className="flex items-start justify-between gap-4 border-b border-[#DFE2DA] pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#526B57] uppercase tracking-wider block mb-1">Professional Field Draft</span>
                  <h2 className="text-xl font-bold text-[#252A27]">{report.title}</h2>
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
                    {saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {report.sections?.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#35483B] bg-[#E7ECE4]/60 px-3 py-1 rounded">
                      {sec.heading}
                    </h3>
                    <p className="text-sm text-[#252A27] leading-relaxed whitespace-pre-line pl-1">
                      {sec.content}
                    </p>
                  </div>
                ))}

                {report.missingInformation && report.missingInformation.length > 0 && (
                  <div className="bg-[#A66A24]/10 border border-[#A66A24]/30 rounded-xl p-4 mt-6">
                    <h4 className="text-xs font-semibold text-[#A66A24] uppercase tracking-wider mb-2">Missing Information / Points to Investigate</h4>
                    <ul className="list-disc list-inside text-xs text-[#252A27] space-y-1">
                      {report.missingInformation.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-12 text-center text-sm text-[#69716B] min-h-[500px] flex flex-col items-center justify-center">
              <FileText className="w-12 h-12 text-[#D9D4C8] mb-4" />
              <p>Complete the station observation form and click "Generate Field Report Draft" to view your structured report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
