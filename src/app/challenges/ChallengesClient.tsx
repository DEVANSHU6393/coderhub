"use client";

import { useState, useMemo } from "react";
import { CodeforcesProblem } from "@/lib/codeforces";
import { Search, ExternalLink, Code2, Users, Star, RefreshCw } from "lucide-react";

export default function ChallengesClient({ initialProblems }: { initialProblems: CodeforcesProblem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");

  // Determine difficulty based on Codeforces rating
  const getDifficulty = (rating?: number) => {
    if (!rating) return "Unrated";
    if (rating < 1200) return "Easy";
    if (rating <= 1800) return "Medium";
    return "Hard";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Hard": return "text-red-400 bg-red-400/10 border-red-400/30";
      default: return "text-slate-400 bg-slate-400/10 border-slate-400/30";
    }
  };

  const filteredProblems = useMemo(() => {
    return initialProblems.filter((problem) => {
      const matchesSearch = 
        problem.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const difficulty = getDifficulty(problem.rating);
      const matchesDifficulty = difficultyFilter === "All" || difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [initialProblems, searchQuery, difficultyFilter]);

  if (!initialProblems || initialProblems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="p-4 glassmorphism rounded-full mb-4">
          <RefreshCw className="text-neon-cyan animate-spin" size={32} />
        </div>
        <h3 className="text-xl font-mono text-white">Loading Challenges...</h3>
        <p className="text-slate-400 max-w-md">We're fetching the latest problems from Codeforces. This might take a moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="glassmorphism p-4 sm:p-6 rounded-2xl border border-glass-border shadow-lg flex flex-col sm:flex-row gap-4 items-center justify-between z-10 relative">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/30 border border-glass-border rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all font-mono text-sm"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {["All", "Easy", "Medium", "Hard", "Unrated"].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                difficultyFilter === diff 
                  ? "bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]" 
                  : "glassmorphism text-slate-300 hover:text-white hover:bg-white/5 border border-glass-border"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Grid */}
      {filteredProblems.length === 0 ? (
        <div className="text-center py-20 glassmorphism rounded-2xl border border-glass-border">
          <Code2 size={48} className="mx-auto text-slate-500 mb-4 opacity-50" />
          <h3 className="text-xl text-white font-mono mb-2">No challenges found</h3>
          <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => {
            const difficulty = getDifficulty(problem.rating);
            
            return (
              <div 
                key={`${problem.contestId}-${problem.index}`} 
                className="glassmorphism p-6 rounded-2xl border border-glass-border shadow-lg hover:shadow-[0_8px_30px_rgba(0,255,255,0.1)] hover:border-neon-cyan/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
              >
                {/* Decorative glowing orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-2xl group-hover:bg-neon-cyan/10 transition-colors duration-500 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(difficulty)}`}>
                    {difficulty} {problem.rating ? `(${problem.rating})` : ""}
                  </span>
                  <span className="text-xs text-slate-400 font-mono bg-black/20 px-2 py-1 rounded">
                    {problem.contestId}{problem.index}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors">
                  {problem.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-2">
                  {problem.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-xs text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                  {problem.tags.length > 3 && (
                    <span className="text-xs text-slate-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                      +{problem.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-glass-border">
                  <div className="flex items-center gap-1.5 text-sm text-slate-400" title="Solved Count">
                    <Users size={14} className="text-neon-purple" />
                    <span>{problem.solvedCount ? problem.solvedCount : "0"}</span>
                  </div>
                  
                  <a 
                    href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-neon-cyan hover:text-white transition-colors"
                  >
                    <span>Solve on Codeforces</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
