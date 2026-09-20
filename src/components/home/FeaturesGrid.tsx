"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Code2, Cpu, GitBranch, Shield, Database, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const features = [
  {
    icon: Code2,
    title: "Workshops",
    desc: "Hands-on sessions covering React, TypeScript, DSA, System Design, and cutting-edge frameworks every week.",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    border: "hover:border-neon-cyan/50",
    glow: "hover:glow-cyan",
    details: "Our weekly workshops dive deep into modern web development and software engineering. We don't just teach theory; we build real things together. \n\nTODO: Add specific schedule and prerequisites.",
    audience: "TODO: Define target audience (e.g. Beginners to Intermediate)",
  },
  {
    icon: Cpu,
    title: "Hackathons",
    desc: "48-hour coding sprints. Build, iterate, and demo real products. Compete for glory (and prizes).",
    color: "text-neon-violet",
    bg: "bg-neon-violet/10",
    border: "hover:border-neon-violet/50",
    glow: "hover:glow-violet",
    details: "Experience the adrenaline of a 48-hour build sprint. Form a team, ideate, and deploy a working prototype. Mentors are available around the clock. \n\nTODO: Add past hackathon stats and upcoming dates.",
    audience: "TODO: Define target audience (e.g. All skill levels)",
  },
  {
    icon: GitBranch,
    title: "Open Source",
    desc: "Contribute to real-world repos, build a GitHub portfolio that shouts 'hire me' to recruiters.",
    color: "text-neon-green",
    bg: "bg-neon-green/10",
    border: "hover:border-neon-green/50",
    glow: "hover:glow-green",
    details: "Learn the ins and outs of Git, GitHub, and contributing to large codebases. We maintain several club projects and help students make their first PRs to major open-source repositories. \n\nTODO: List active club repositories.",
    audience: "TODO: Define target audience (e.g. Intermediate)",
  },
  {
    icon: Shield,
    title: "CTF & Security",
    desc: "Capture The Flag challenges, ethical hacking workshops, and cybersecurity fundamentals.",
    color: "text-neon-pink",
    bg: "bg-neon-pink/10",
    border: "hover:border-neon-pink/50",
    glow: "hover:glow-pink",
    details: "Dive into the world of offensive and defensive security. Learn about web vulnerabilities, cryptography, and reverse engineering through practical CTF challenges. \n\nTODO: Detail the platforms used (e.g. TryHackMe, HackTheBox).",
    audience: "TODO: Define target audience (e.g. All skill levels)",
  },
  {
    icon: Database,
    title: "DSA & CP",
    desc: "Competitive programming sessions, LeetCode battles, and placement-focused algorithm training.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "hover:border-amber-400/50",
    glow: "",
    details: "Master data structures and algorithms to ace technical interviews. We host regular contests, discuss optimal solutions, and cover advanced competitive programming techniques. \n\nTODO: Link to LeetCode group or Codeforces handles.",
    audience: "TODO: Define target audience (e.g. Placement seekers)",
  },
];

export default function FeaturesGrid() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6">
        {features.map((f, i) => (
          <ScrollReveal key={i} animation="fade-up" delay={i * 100} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] cursor-pointer">
            <div onClick={() => setSelectedFeature(f)} className="h-full">
              <SpotlightCard
                spotlightColor={
                  f.color.includes("cyan") ? "rgba(0, 255, 255, 0.15)" :
                  f.color.includes("violet") ? "rgba(138, 43, 226, 0.15)" :
                  f.color.includes("green") ? "rgba(0, 255, 128, 0.15)" :
                  f.color.includes("pink") ? "rgba(255, 20, 147, 0.15)" :
                  f.color.includes("amber") ? "rgba(255, 191, 0, 0.15)" :
                  "rgba(0, 191, 255, 0.15)"
                }
                className={`glassmorphism p-8 rounded-2xl border border-glass-border ${f.border} transition-all duration-300 group card-hover data-stream h-full`}
              >
                <div className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon className={f.color} size={26} />
                </div>
                <div className="font-mono text-xs text-slate-600 mb-1">module_{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                <div className={`mt-6 flex items-center gap-1 text-xs font-mono ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <ChevronRight size={12} />
                  learn_more()
                </div>
              </SpotlightCard>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glassmorphism-strong border border-glass-border rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-glass-border/50 bg-black/40">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${selectedFeature.bg} flex items-center justify-center`}>
                    <selectedFeature.icon className={selectedFeature.color} size={24} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500 mb-1">track_details.md</div>
                    <h2 className="text-2xl font-bold text-white">{selectedFeature.title}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`text-sm font-bold font-mono mb-2 ${selectedFeature.color}`}>// WHAT IT IS</h4>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedFeature.details}</p>
                </div>
                <div>
                  <h4 className={`text-sm font-bold font-mono mb-2 ${selectedFeature.color}`}>// WHO IT'S FOR</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedFeature.audience}</p>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-glass-border/50 bg-black/40 flex justify-end">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className={`px-6 py-2 rounded-lg font-mono text-sm border border-glass-border hover:bg-white/5 transition-colors text-white`}
                >
                  close()
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
