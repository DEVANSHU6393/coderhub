import { Terminal, CheckSquare, Clock, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Tests",
  description: "Take multiple-choice practice tests for your computer science subjects.",
};

export const dynamic = 'force-dynamic';

export default async function Tests() {
  const tests = await prisma.test.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { questions: true }
      }
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-36 pb-12 px-4 relative bg-grid overflow-hidden border-b border-glass-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-5">
            <span className="text-glow">Practice</span> Tests
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 font-mono">
            Test your knowledge with community-curated multiple-choice questions. No login required.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 relative z-10 flex-1">
        <div className="max-w-7xl mx-auto">
          {tests.length === 0 ? (
            <div className="text-center py-20 glassmorphism rounded-2xl border border-glass-border">
              <CheckSquare size={48} className="mx-auto text-slate-600 mb-4" />
              <h2 className="text-xl font-mono text-white mb-2">No Tests Available</h2>
              <p className="text-slate-400 font-mono text-sm">Check back later for new practice tests!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => (
                <div key={test.id} className="glassmorphism rounded-xl p-6 border border-glass-border hover:border-neon-cyan/40 transition-all duration-300 group card-hover flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-neon-violet border border-glass-border">
                      {test.subject}
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {test._count.questions} Qs
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{test.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-2">{test.description}</p>
                  
                  <Link 
                    href={`/tests/${test.id}`}
                    className="w-full py-2 rounded bg-neon-cyan/10 border border-neon-cyan/50 hover:bg-neon-cyan/20 text-neon-cyan text-center font-mono text-sm transition-all flex items-center justify-center gap-2 group-hover:glow-cyan"
                  >
                    Start Test <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
