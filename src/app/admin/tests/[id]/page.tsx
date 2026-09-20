"use client";

import { useState, useEffect } from "react";
import { Terminal, Plus, Trash2, ArrowLeft, HelpCircle } from "lucide-react";
import { getTestWithQuestions, addQuestion, deleteQuestion } from "@/app/actions/tests";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminTestDetails() {
  const params = useParams();
  const id = params.id as string;
  
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [text, setText] = useState("");
  const [opt0, setOpt0] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [correctIndex, setCorrectIndex] = useState(0);

  useEffect(() => {
    fetchTestDetails();
  }, [id]);

  const fetchTestDetails = async () => {
    setLoading(true);
    const res = await getTestWithQuestions(id);
    if (res.success) {
      setTest(res.data);
    }
    setLoading(false);
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !opt0 || !opt1 || !opt2 || !opt3) return;
    
    setIsAdding(true);
    const options = [opt0, opt1, opt2, opt3];
    const res = await addQuestion(id, { text, options, correctIndex });
    
    if (res.success) {
      setText("");
      setOpt0("");
      setOpt1("");
      setOpt2("");
      setOpt3("");
      setCorrectIndex(0);
      fetchTestDetails();
    } else {
      alert("Failed to add question");
    }
    setIsAdding(false);
  };

  const handleDelete = async (qId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    const res = await deleteQuestion(qId, id);
    if (res.success) {
      fetchTestDetails();
    } else {
      alert("Failed to delete question");
    }
  };

  if (loading) {
    return <div className="text-neon-cyan font-mono p-8">Loading test details...</div>;
  }

  if (!test) {
    return <div className="text-red-400 font-mono p-8">Test not found.</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/tests" className="text-slate-400 hover:text-white flex items-center gap-2 font-mono text-sm mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Tests
        </Link>
        <h1 className="text-3xl font-bold font-mono text-white mb-2">{test.title}</h1>
        <div className="flex gap-4 text-xs font-mono">
          <span className="text-neon-violet">{test.subject}</span>
          <span className="text-slate-500">{test.questions.length} Questions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="glassmorphism rounded-xl p-6 border border-glass-border">
            <h2 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
              <Plus size={20} className="text-neon-cyan" /> Add Question
            </h2>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Question Text</label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none h-20 resize-none" 
                  placeholder="e.g. What is the output of..."
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-xs font-mono text-slate-400">Options (Select the radio button for the correct one)</label>
                {[
                  { val: opt0, set: setOpt0 },
                  { val: opt1, set: setOpt1 },
                  { val: opt2, set: setOpt2 },
                  { val: opt3, set: setOpt3 }
                ].map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="correctIndex" 
                      checked={correctIndex === idx}
                      onChange={() => setCorrectIndex(idx)}
                      className="accent-neon-cyan"
                    />
                    <input 
                      type="text" 
                      value={opt.val}
                      onChange={(e) => opt.set(e.target.value)}
                      className={`flex-1 bg-black/50 border rounded px-3 py-1.5 text-white font-mono text-sm focus:outline-none ${correctIndex === idx ? 'border-neon-cyan/50' : 'border-glass-border focus:border-neon-cyan'}`} 
                      placeholder={`Option ${idx + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                disabled={isAdding}
                className="w-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/30 py-2 rounded font-mono text-sm transition-colors mt-4 disabled:opacity-50"
              >
                {isAdding ? "Adding..." : "Add Question"}
              </button>
            </form>
          </div>
        </div>

        {/* List of Questions */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {test.questions.length === 0 ? (
              <div className="glassmorphism rounded-xl border border-glass-border p-8 text-center">
                <HelpCircle size={40} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400 font-mono text-sm">No questions added to this test yet.</p>
              </div>
            ) : (
              test.questions.map((q: any, i: number) => (
                <div key={q.id} className="glassmorphism rounded-xl border border-glass-border p-5 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-mono text-white text-sm"><span className="text-neon-cyan mr-2">Q{i + 1}.</span> {q.text}</h3>
                    <button 
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors shrink-0"
                      title="Delete Question"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                    {q.options.map((opt: string, optIdx: number) => (
                      <div 
                        key={optIdx} 
                        className={`px-3 py-2 rounded text-xs font-mono border ${
                          optIdx === q.correctIndex 
                            ? 'bg-neon-green/10 border-neon-green/30 text-neon-green' 
                            : 'bg-black/30 border-glass-border text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                        {optIdx === q.correctIndex && " (Correct)"}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
