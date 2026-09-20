"use client";

import { useState, useEffect } from "react";
import { Terminal, Plus, Trash2, FileText, Link as LinkIcon, BookOpen } from "lucide-react";
import { getResources, createResource, deleteResource } from "@/app/actions/resources";

export default function AdminResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Notes");
  const [subject, setSubject] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const res = await getResources();
    if (res.success) {
      setResources(res.data || []);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || !link) return;
    
    setIsAdding(true);
    const res = await createResource({ title, category, subject, link });
    if (res.success) {
      setTitle("");
      setSubject("");
      setLink("");
      fetchResources();
    } else {
      alert("Failed to add resource");
    }
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    const res = await deleteResource(id);
    if (res.success) {
      fetchResources();
    } else {
      alert("Failed to delete resource");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
            <BookOpen className="text-neon-cyan" /> Manage Resources
          </h1>
          <p className="text-slate-400 mt-2 font-mono text-sm">Add notes, syllabus, and previous year papers for students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="glassmorphism rounded-xl p-6 border border-glass-border">
            <h2 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
              <Plus size={20} className="text-neon-cyan" /> Add Resource
            </h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" 
                  placeholder="e.g. Unit 1 Handwritten Notes"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" 
                >
                  <option value="Notes">Notes</option>
                  <option value="Previous Year Paper">Previous Year Paper</option>
                  <option value="Syllabus">Syllabus</option>
                  <option value="Cheatsheet">Cheatsheet</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" 
                  placeholder="e.g. Data Structures (CS-301)"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Google Drive / File Link</label>
                <input 
                  type="url" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-black/50 border border-glass-border rounded px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" 
                  placeholder="https://drive.google.com/..."
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isAdding}
                className="w-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/30 py-2 rounded font-mono text-sm transition-colors disabled:opacity-50"
              >
                {isAdding ? "Adding..." : "Add Resource"}
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
                  <th className="px-4 py-3 text-xs font-mono text-slate-400 font-normal">Resource Details</th>
                  <th className="px-4 py-3 text-xs font-mono text-slate-400 font-normal">Link</th>
                  <th className="px-4 py-3 text-xs font-mono text-slate-400 font-normal w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500 font-mono text-sm">Loading resources...</td>
                  </tr>
                ) : resources.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500 font-mono text-sm">No resources added yet.</td>
                  </tr>
                ) : (
                  resources.map((res) => (
                    <tr key={res.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{res.title}</div>
                        <div className="text-xs text-slate-400 mt-1 flex gap-2">
                          <span className="bg-white/10 px-2 py-0.5 rounded">{res.category}</span>
                          <span className="text-neon-violet">{res.subject}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <a href={res.link} target="_blank" rel="noreferrer" className="text-neon-blue hover:underline flex items-center gap-1 text-sm">
                          <LinkIcon size={14} /> Open File
                        </a>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => handleDelete(res.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 size={16} />
                        </button>
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
