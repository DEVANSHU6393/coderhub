import { Terminal, Code, Link as LinkIcon, GitBranch, Cpu, Zap, Star, Users, Calendar, Trophy } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

import { teamMembers as coreTeam } from "@/data/team";

const values = [
  { id: "01", title: "Bridge the Skill Gap", desc: "Hands-on industry-standard tools — not textbook theory.", color: "text-neon-cyan", border: "border-neon-cyan/20" },
  { id: "02", title: "Foster Innovation", desc: "Safe space to experiment, fail fast, and build boldly.", color: "text-neon-violet", border: "border-neon-violet/20" },
  { id: "03", title: "Build Community", desc: "Alumni, peers, industry mentors — connected for life.", color: "text-neon-green", border: "border-neon-green/20" },
];

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, values, and team behind Coder Hub.",
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ==================== HERO ==================== */}
      <section className="pt-36 pb-24 px-4 relative bg-grid overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-neon-cyan font-mono text-sm mb-6 bg-neon-cyan/5 px-4 py-2 rounded-full border border-neon-cyan/20">
            <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
            est. 2020 · Bundelkhand University
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet text-glow">
              Coder Hub
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            We are a community of student developers dedicated to learning, building, and shipping real software. Not just assignments — real projects that matter.
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-neon-cyan font-bold text-lg">200+</span> Members
            </div>
            <div className="w-px h-5 bg-glass-border" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-amber-400 font-bold text-lg">5</span> Years Running
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STORY + MISSION ==================== */}
      <section className="py-24 bg-black/50 border-y border-glass-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Story */}
            <ScrollReveal animation="fade-right">
              <div>
                <div className="font-mono text-xs text-neon-cyan mb-3">// origin_story.md</div>
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8">Our Story</h2>
                <div className="space-y-5 text-slate-400 leading-relaxed">
                  <p>
                    In 2020, four CS students sat in a hostel room frustrated — the syllabus taught them{" "}
                    <code className="text-neon-cyan bg-neon-cyan/10 px-1 rounded text-sm">C in CodeBlocks</code>{" "}
                    while the industry demanded React, Node, Docker, and Git. So they decided to build the club they wished had existed.
                  </p>
                  <p>
                    Today, Coder Hub is the largest technical club at Bundelkhand University. We have hosted over 30 events and directly contributed to more than 20 students landing their first jobs or internships in tech.
                  </p>
                  <p>
                    We don't just talk about code. We{" "}
                    <code className="text-neon-violet bg-neon-violet/10 px-1 rounded text-sm">git push</code>{" "}
                    it to production.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission */}
            <ScrollReveal animation="fade-left">
              <div>
                <div className="font-mono text-xs text-neon-violet mb-3">// mission.config.ts</div>
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8">Our Mission</h2>
                <div className="space-y-4">
                  {values.map((v) => (
                    <div key={v.id} className={`glassmorphism p-6 rounded-xl border ${v.border} group card-hover`}>
                      <div className="flex gap-5">
                        <div className={`font-bold font-mono text-2xl ${v.color} shrink-0`}>{v.id}</div>
                        <div>
                          <h3 className="text-white font-bold mb-1">{v.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>



      {/* ==================== CORE TEAM ==================== */}
      <section className="py-24 bg-black/50 border-t border-glass-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-neon-pink mb-3">// core_team.json</div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">The Core Team</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              The devs behind the scenes — mentoring, organizing, and keeping the repo clean.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTeam.map((member, idx) => (
              <ScrollReveal key={idx} animation="zoom-in" delay={idx * 100}>
                <div className="glassmorphism rounded-2xl overflow-hidden border border-glass-border hover:border-neon-cyan/40 transition-all duration-300 group card-hover">
                  <div className="h-60 relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-mono text-neon-cyan border border-neon-cyan/30">
                      {member.tag}
                    </div>
                    {/* Social links */}
                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href={member.github} target="_blank" rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-slate-300 hover:text-neon-cyan border border-glass-border hover:border-neon-cyan transition-colors">
                        <Code size={15} />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-slate-300 hover:text-neon-blue border border-glass-border hover:border-neon-blue transition-colors">
                        <LinkIcon size={15} />
                      </a>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-0.5">{member.name}</h3>
                    <p className="text-neon-cyan text-sm font-mono">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
