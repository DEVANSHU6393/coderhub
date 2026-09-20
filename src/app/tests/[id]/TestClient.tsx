"use client";

import { useState } from "react";
import { Terminal, ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

type Test = {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: Question[];
};

export default function TestClient({ test }: { test: Test }) {
  const router = useRouter();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (submitted) return; // Prevent changing after submission
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < test.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < test.questions.length) {
      if (!confirm("You haven't answered all questions. Are you sure you want to submit?")) {
        return;
      }
    }

    // Calculate score
    let totalScore = 0;
    test.questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        totalScore++;
      }
    });

    setScore(totalScore);
    setSubmitted(true);
    setCurrentQuestionIdx(0); // Go back to first question to review
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQuestionIdx(0);
    setScore(0);
  };

  if (test.questions.length === 0) {
    return (
      <div className="min-h-screen pt-36 px-4 flex flex-col items-center">
        <div className="glassmorphism rounded-xl p-8 max-w-lg w-full text-center">
          <Terminal size={48} className="mx-auto text-slate-600 mb-4" />
          <h2 className="text-xl font-mono text-white mb-2">No Questions Yet</h2>
          <p className="text-slate-400 font-mono text-sm mb-6">This test doesn't have any questions configured.</p>
          <button onClick={() => router.back()} className="text-neon-cyan hover:underline font-mono text-sm">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / test.questions.length) * 100;

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center relative">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl w-full relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tests" className="text-slate-400 hover:text-white flex items-center gap-2 font-mono text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={16} /> Back to Tests
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-mono text-white mb-2">{test.title}</h1>
              <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-neon-violet border border-glass-border">
                {test.subject}
              </span>
            </div>
            {submitted && (
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400 mb-1">Your Score</div>
                <div className="text-3xl font-mono font-bold text-neon-cyan">
                  {score} / {test.questions.length}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Container */}
        <div className="glassmorphism rounded-2xl border border-glass-border overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full bg-black/50 h-1.5">
            <div 
              className="bg-neon-cyan h-full transition-all duration-300 ease-out" 
              style={{ width: `${submitted ? 100 : progress}%` }} 
            />
          </div>

          <div className="p-6 md:p-8">
            {/* Question Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-neon-cyan font-mono text-sm font-bold">
                Question {currentQuestionIdx + 1} of {test.questions.length}
              </span>
              
              {submitted && (
                <span className={`font-mono text-sm flex items-center gap-1 ${
                  answers[currentQ.id] === currentQ.correctIndex ? "text-neon-green" : "text-red-400"
                }`}>
                  {answers[currentQ.id] === currentQ.correctIndex ? (
                    <><CheckCircle size={16} /> Correct</>
                  ) : (
                    <><XCircle size={16} /> Incorrect</>
                  )}
                </span>
              )}
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl text-white font-medium mb-8 leading-relaxed">
              {currentQ.text}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-10">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === idx;
                const isCorrect = currentQ.correctIndex === idx;
                
                let optionStyle = "bg-black/40 border-glass-border text-slate-300 hover:border-neon-cyan/50 hover:bg-white/5";
                
                if (submitted) {
                  if (isCorrect) {
                    optionStyle = "bg-neon-green/10 border-neon-green/50 text-neon-green";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-red-500/10 border-red-500/50 text-red-400";
                  } else {
                    optionStyle = "bg-black/40 border-glass-border text-slate-500 opacity-50";
                  }
                } else if (isSelected) {
                  optionStyle = "bg-neon-cyan/10 border-neon-cyan text-white";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 font-mono text-sm flex items-center justify-between ${optionStyle}`}
                  >
                    <span>
                      <span className="opacity-50 mr-3">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </span>
                    {submitted && isCorrect && <CheckCircle size={18} />}
                    {submitted && isSelected && !isCorrect && <XCircle size={18} />}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-glass-border">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2 rounded border border-glass-border font-mono text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                Previous
              </button>

              {!submitted && currentQuestionIdx === test.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded bg-neon-cyan text-black font-mono font-bold text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                >
                  Submit Test
                </button>
              ) : !submitted ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded border border-neon-cyan/50 text-neon-cyan font-mono text-sm hover:bg-neon-cyan/10 transition-colors flex items-center gap-2"
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleRestart}
                    className="px-4 py-2 rounded border border-glass-border font-mono text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw size={16} /> Retake
                  </button>
                  {currentQuestionIdx < test.questions.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 rounded border border-neon-cyan/50 text-neon-cyan font-mono text-sm hover:bg-neon-cyan/10 transition-colors flex items-center gap-2"
                    >
                      Next <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
