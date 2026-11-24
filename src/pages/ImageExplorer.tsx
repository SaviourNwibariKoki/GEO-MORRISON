import React, { useState, useRef } from 'react';
import { HelpCircle, Upload, Sparkles, Copy, Check, Bookmark, Loader2, X, AlertTriangle } from 'lucide-react';
import { ImageReviewResult } from '../types/geology';
import { saveSession } from '../lib/history';

export function ImageExplorer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [context, setContext] = useState<string>('Outcrop');
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
      setError('This image format is not supported. Use JPG, PNG or WebP.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('The image is too large. Choose an image under 5 MB.');
      return;
    }

    setError(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      const base64 = resultStr.split(',')[1];
      setSelectedImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      setError('Choose an image to review.');
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    setSaved(false);

    try {
      const res = await fetch('/api/geo/image-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          mimeType,
          context,
          userQuestion,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to review image.');
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
    const text = `Geological Image Review (${context})\n\nVisible Observations:\n` +
      result.visibleObservations.map((o) => `- ${o}`).join('\n') +
      `\n\nPossible Interpretations:\n` +
      result.possibleInterpretations.map((p) => `- ${p.interpretation} (Reason: ${p.reason}; Caution: ${p.caution})`).join('\n') +
      `\n\nLimitations:\n` + result.limitations.map((l) => `- ${l}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveSession('image-explorer', `Image Review (${context})`, { context, userQuestion, result });
    setSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Geological Image Explorer</span>
        </div>
        <h1 className="text-3xl font-bold text-[#252A27]">Outcrop & Specimen Visual Review</h1>
        <p className="text-sm text-[#69716B] mt-1">Review geological photographs with preliminary visual descriptions, clearly separating observations from tentative interpretations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload & Options Column */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleReview} className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#252A27] pb-2 border-b border-[#DFE2DA]">Image Upload</h2>

            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#DFE2DA] rounded-xl p-8 text-center cursor-pointer hover:border-[#526B57] transition-colors bg-[#F4F3EE]/40"
              >
                <Upload className="w-8 h-8 text-[#526B57] mx-auto mb-3" />
                <span className="text-sm font-semibold text-[#252A27] block">Click to upload image</span>
                <span className="text-xs text-[#69716B] mt-1 block">JPG, PNG or WebP up to 5 MB</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-[#DFE2DA] bg-black/5">
                <img
                  src={`data:${mimeType};base64,${selectedImage}`}
                  alt="Uploaded preview"
                  className="w-full h-48 object-contain mx-auto"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">Specimen / Exposure Context</label>
              <select
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27] bg-[#FFFFFF]"
              >
                <option value="Outcrop">Outcrop / Exposure</option>
                <option value="Hand specimen">Hand Specimen</option>
                <option value="Thin section">Thin Section (Microscopy)</option>
                <option value="Fossil">Fossil / Paleontology</option>
                <option value="Geological structure">Geological Structure</option>
                <option value="Uncertain">Uncertain / General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">Specific Question (Optional)</label>
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="e.g., What sedimentary structures are visible?"
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-sm text-[#252A27]"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[#B4473E]/10 border border-[#B4473E]/30 text-[#B4473E] text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedImage}
              className="w-full py-2.5 bg-[#526B57] text-[#FFFFFF] rounded-lg font-semibold hover:bg-[#35483B] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing image...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Review Geological Image
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-[#DFE2DA] pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#526B57] uppercase tracking-wider block mb-1">Preliminary Visual Review ({context})</span>
                  <h2 className="text-xl font-bold text-[#252A27]">Observation & Tentative Interpretation</h2>
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

              {/* Notice */}
              <div className="bg-[#A66A24]/10 border border-[#A66A24]/30 rounded-xl p-3.5 flex items-start gap-3 text-xs text-[#252A27]">
                <AlertTriangle className="w-4 h-4 text-[#A66A24] shrink-0 mt-0.5" />
                <span>This is a preliminary visual learning aid, not a diagnostic or laboratory identification service. Always verify findings with thin-section analysis, XRD, or field testing.</span>
              </div>

              {/* Visible Observations */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35483B]">Visible Observations</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-[#252A27] bg-[#F4F3EE]/50 p-4 rounded-lg border border-[#DFE2DA]/60">
                  {result.visibleObservations?.map((obs, idx) => (
                    <li key={idx}>{obs}</li>
                  ))}
                </ul>
              </div>

              {/* Possible Interpretations */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35483B]">Possible Interpretations (Tentative)</h3>
                <div className="space-y-3">
                  {result.possibleInterpretations?.map((pi, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-[#DFE2DA] bg-[#FFFFFF] space-y-1">
                      <h4 className="text-sm font-semibold text-[#252A27]">{pi.interpretation}</h4>
                      <p className="text-xs text-[#69716B]"><strong>Basis:</strong> {pi.reason}</p>
                      <p className="text-xs text-[#B4473E]"><strong>Caution:</strong> {pi.caution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limitations & Follow-up */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#F4F3EE] p-4 rounded-lg space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#69716B]">Limitations</h4>
                  <ul className="list-disc list-inside text-xs text-[#252A27] space-y-1">
                    {result.limitations?.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#E7ECE4]/50 p-4 rounded-lg space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#35483B]">Recommended Follow-up</h4>
                  <ul className="list-disc list-inside text-xs text-[#252A27] space-y-1">
                    {result.recommendedFollowUp?.map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-12 text-center text-sm text-[#69716B] min-h-[500px] flex flex-col items-center justify-center">
              <HelpCircle className="w-12 h-12 text-[#D9D4C8] mb-4" />
              <p>Upload a geological image and click "Review Geological Image" to view observations and tentative interpretations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
