import { Terminal, FileText, Download, Folder } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources & Notes",
  description: "Download handwritten notes, previous year papers, and syllabus for your subjects.",
};

export const dynamic = 'force-dynamic';

export default async function Resources() {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categories = Array.from(new Set(resources.map((r) => r.category)));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-36 pb-12 px-4 relative bg-grid overflow-hidden border-b border-glass-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-5">
            <span className="text-glow">Department</span> Resources
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 font-mono">
            Handwritten notes, previous year papers, and syllabus material curated by the community.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 relative z-10 flex-1">
        <div className="max-w-7xl mx-auto">
          {resources.length === 0 ? (
            <div className="text-center py-20 glassmorphism rounded-2xl border border-glass-border">
              <Folder size={48} className="mx-auto text-slate-600 mb-4" />
              <h2 className="text-xl font-mono text-white mb-2">No Resources Found</h2>
              <p className="text-slate-400 font-mono text-sm">Check back later for notes and papers!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold font-mono text-white mb-6 flex items-center gap-3 border-b border-glass-border pb-3">
                    <Terminal className="text-neon-cyan" /> {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources
                      .filter((r) => r.category === category)
                      .map((resource) => (
                        <div key={resource.id} className="glassmorphism rounded-xl p-6 border border-glass-border hover:border-neon-cyan/40 transition-all duration-300 group card-hover flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div className="bg-black/50 p-3 rounded-lg border border-glass-border group-hover:border-neon-cyan/30 transition-colors">
                              <FileText size={24} className="text-neon-blue" />
                            </div>
                            <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-slate-400 border border-glass-border">
                              {resource.subject}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-white mb-2 flex-1">{resource.title}</h3>
                          
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="mt-4 w-full py-2 rounded bg-white/5 border border-glass-border hover:bg-neon-cyan/10 hover:border-neon-cyan hover:text-neon-cyan text-center font-mono text-sm transition-all flex items-center justify-center gap-2 group-hover:glow-cyan"
                          >
                            <Download size={14} /> Open Document
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
