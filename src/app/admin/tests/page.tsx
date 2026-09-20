"use client";

import { useState, useEffect } from "react";
import { Terminal, Plus, Trash2, CheckSquare, ChevronRight } from "lucide-react";
import { getTests, createTest, deleteTest } from "@/app/actions/tests";
import Link from "next/link";

export default function AdminTests() {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    const res = await getTests();
    if (res.success) {
      setTests(res.data || []);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !subject) return;
    
    setIsAdding(true);
    const res = await createTest({ title, description, subject });
    if (res.success) {
      setTitle("");
      setDescription("");
      setSubject("");
      fetchTests();
    } else {
      alert("Failed to add test");
    }
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this test? All questions will be lost.")) return;
    const res = await deleteTest(id);
    if (res.success) {
      fetchTests();
    } else {
      alert("Failed to delete test");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
            <CheckSquare className="text-neon-cyan" /> Manage Tests
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm">Create multiple-choice practice tests for students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="glassmorphism rounded-xl p-6 border border-glass-border">
            <h2 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
              <Plus size={20} className="text-neon-cyan" /> Create Test
            </h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" 
                  placeholder="e.g. OOPS Core Concepts Test"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" 
                  placeholder="e.g. Java / Object Oriented Prog"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none h-24 resize-none" 
                  placeholder="e.g. A quick 10-question test covering inheritance, polymorphism, and encapsulation."
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isAdding}
                className="w-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/30 py-2 rounded font-mono text-sm transition-colors disabled:opacity-50"
              >
                {isAdding ? "Creating..." : "Create Test"}
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="glassmorphism rounded-xl border border-glass-border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-glass-border">
                <tr>
                  <th className="px-4 py-3 text-xs font-mono text-slate-400 font-normal">Test Details</th>
                  <th className="px-4 py-3 text-xs font-mono text-slate-400 font-normal">Questions</th>
                  <th className="px-4 py-3 text-xs font-mono text-slate-400 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500 font-mono text-sm">Loading tests...</td>
                  </tr>
                ) : tests.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500 font-mono text-sm">No tests created yet.</td>
                  </tr>
                ) : (
                  tests.map((test) => (
                    <tr key={test.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-4 py-4">
                        <div className="font-medium text-white mb-1">{test.title}</div>
                        <div className="text-xs text-neon-violet mb-2">{test.subject}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{test.description}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-white/10 px-2 py-1 rounded text-xs text-slate-300 font-mono">
                          {test._count.questions} Qs
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2 items-center">
                          <Link 
                            href={`/admin/tests/${test.id}`}
                            className="flex items-center gap-1 text-xs text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/10 px-3 py-1.5 rounded transition-colors"
                          >
                            Manage <ChevronRight size={14} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(test.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                            title="Delete Test"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
