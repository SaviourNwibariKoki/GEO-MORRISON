import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Bookmark, Loader2, Award, ArrowRight } from 'lucide-react';
import { QuizResult } from '../types/geology';
import { saveSession } from '../lib/history';

export function Quiz() {
  const [topic, setTopic] = useState('Sedimentary structures and Walther\'s Law');
  const [notes, setNotes] = useState('');
  const [count, setCount] = useState('5');
  const [difficulty, setDifficulty] = useState('Moderate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quiz, setQuiz] = useState<QuizResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic && !notes) {
      setError('Provide a topic or study notes to generate a quiz.');
      return;
    }
    setError(null);
    setLoading(true);
    setQuiz(null);
    setSubmitted(false);
    setUserAnswers({});
    setSaved(false);

    try {
      const res = await fetch('/api/geo/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, notes, count, difficulty }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to generate quiz.');
      }
      setQuiz(data.data);
      setCurrentIndex(0);
    } catch (err: any) {
      setError(err.message || 'Connection problem. Check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    setUserAnswers({ ...userAnswers, [qIndex]: optIndex });
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    const unanswered = quiz.questions.length - Object.keys(userAnswers).length;
    if (unanswered > 0) {
      if (!window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
        return;
      }
    }

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
  };

  const handleSaveQuiz = () => {
    if (!quiz) return;
    saveSession('quiz', quiz.title || topic, { quiz, score, userAnswers });
    setSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526B57] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Revision Quiz</span>
        </div>
        <h1 className="text-3xl font-bold text-[#252A27]">Geology Revision Quiz Generator</h1>
        <p className="text-sm text-[#69716B] mt-1">Test your geological knowledge with custom multiple-choice quizzes and detailed explanations.</p>
      </div>

      {!quiz ? (
        <form onSubmit={handleGenerate} className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
              Topic or Subject Area *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Igneous rock classification and Bowen's Reaction Series"
              className="w-full px-4 py-2.5 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#F4F3EE]/30 focus:outline-none focus:border-[#526B57]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
              Optional Course Notes / Context
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste specific lecture notes or key concepts to base questions on..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#F4F3EE]/30 focus:outline-none focus:border-[#526B57]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
                Question Count
              </label>
              <select
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#FFFFFF]"
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#69716B] mb-1.5">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#DFE2DA] text-[#252A27] text-sm bg-[#FFFFFF]"
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
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
                  Generating quiz...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Quiz
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Quiz Header / Score Summary */}
          <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase text-[#69716B]">Revision Assessment</span>
              <h2 className="text-xl font-bold text-[#252A27]">{quiz.title}</h2>
            </div>
            {submitted ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-[#69716B] block">Final Score</span>
                  <span className="text-xl font-bold text-[#35483B]">{score} / {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%)</span>
                </div>
                <button
                  onClick={handleSaveQuiz}
                  disabled={saved}
                  className="px-3.5 py-2 text-xs font-semibold bg-[#E7ECE4] text-[#35483B] rounded-lg hover:bg-[#D9D4C8] transition-colors disabled:opacity-70 flex items-center gap-1.5"
                >
                  <Bookmark className="w-4 h-4" />
                  {saved ? 'Saved' : 'Save Quiz'}
                </button>
                <button
                  onClick={() => setQuiz(null)}
                  className="px-3.5 py-2 text-xs font-semibold bg-[#526B57] text-[#FFFFFF] rounded-lg hover:bg-[#35483B] transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Quiz
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#69716B]">
                  Question {currentIndex + 1} of {quiz.questions.length}
                </span>
                <button
                  onClick={() => setQuiz(null)}
                  className="px-3 py-1.5 text-xs text-[#B4473E] hover:bg-[#B4473E]/10 rounded-lg transition-colors font-medium"
                >
                  Discard
                </button>
              </div>
            )}
          </div>

          {/* Active Question Card */}
          {!submitted ? (
            <div className="bg-[#FFFFFF] border border-[#DFE2DA] rounded-xl p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-semibold text-[#252A27] leading-relaxed">
                {currentIndex + 1}. {quiz.questions[currentIndex].question}
              </h3>

              <div className="space-y-3">
                {quiz.questions[currentIndex].options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentIndex, optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-3 ${isSelected ? 'border-[#526B57] bg-[#E7ECE4]/40 font-semibold text-[#252A27]' : 'border-[#DFE2DA] hover:border-[#69716B] text-[#252A27]'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#526B57] bg-[#526B57] text-white text-xs' : 'border-[#DFE2DA]'}`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#DFE2DA]">
                <button
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 border border-[#DFE2DA] rounded-lg text-xs font-medium text-[#252A27] disabled:opacity-40 hover:bg-[#F4F3EE]"
                >
                  Previous
                </button>

                {currentIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                    className="px-5 py-2 bg-[#526B57] text-[#FFFFFF] rounded-lg text-xs font-semibold hover:bg-[#35483B]"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 bg-[#397451] text-[#FFFFFF] rounded-lg text-xs font-semibold hover:bg-[#2b563d] shadow-sm"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Review All Questions */
            <div className="space-y-6">
              {quiz.questions.map((q, qIdx) => {
                const userAns = userAnswers[qIdx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={q.id} className={`bg-[#FFFFFF] border rounded-xl p-6 shadow-sm space-y-4 ${isCorrect ? 'border-[#397451]/40' : 'border-[#B4473E]/40'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-semibold text-[#252A27]">
                        {qIdx + 1}. {q.question}
                      </h3>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-[#397451] bg-[#397451]/10 px-2.5 py-1 rounded-full shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-[#B4473E] bg-[#B4473E]/10 px-2.5 py-1 rounded-full shrink-0">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let badgeClass = 'border-[#DFE2DA] text-[#252A27]';
                        if (optIdx === q.correctIndex) {
                          badgeClass = 'border-[#397451] bg-[#397451]/10 text-[#397451] font-semibold';
                        } else if (optIdx === userAns && !isCorrect) {
                          badgeClass = 'border-[#B4473E] bg-[#B4473E]/10 text-[#B4473E] font-semibold';
                        }
                        return (
                          <div key={optIdx} className={`p-3 rounded-lg border text-sm flex items-center gap-3 ${badgeClass}`}>
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-[#F4F3EE] p-4 rounded-lg text-xs text-[#69716B] leading-relaxed">
                      <span className="font-semibold text-[#252A27] block mb-1">Explanation:</span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
