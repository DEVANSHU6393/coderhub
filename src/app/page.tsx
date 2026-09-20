import Link from "next/link";
import {
  Terminal, Globe, ArrowRight, Calendar,
  Wifi, Star, ChevronRight, Users, Braces
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import FeaturesGrid from "@/components/home/FeaturesGrid";

export const dynamic = 'force-dynamic';

async function getNextEvent() {
  const nextEvent = await prisma.event.findFirst({
    where: { date: { gte: new Date().toISOString().split("T")[0] } },
    orderBy: { date: 'asc' }
  });
  return nextEvent;
}

// Tech stack scrolling items
const techStack = [
  { name: "React", color: "text-cyan-400" },
  { name: "Next.js", color: "text-white" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "Node.js", color: "text-green-400" },
  { name: "Python", color: "text-yellow-400" },
  { name: "PostgreSQL", color: "text-sky-400" },
  { name: "Docker", color: "text-blue-500" },
  { name: "Git", color: "text-orange-400" },
  { name: "Linux", color: "text-yellow-500" },
  { name: "MongoDB", color: "text-green-500" },
  { name: "Rust", color: "text-orange-500" },
  { name: "GraphQL", color: "text-pink-400" },
  { name: "Kubernetes", color: "text-blue-400" },
  { name: "AWS", color: "text-amber-400" },
  { name: "C++", color: "text-purple-400" },
  { name: "Golang", color: "text-cyan-500" },
];

const stats = [
  { value: "200+", label: "Active Members", icon: Users },
  { value: "30+", label: "Events Hosted", icon: Calendar },
];



const codeSnippet = [
  { indent: 0, content: <><span className="text-neon-violet">class</span> <span className="text-neon-cyan">CoderHub</span> {"{"}</> },
  { indent: 1, content: <><span className="text-slate-500">// Premier CS club @ BU since 2020</span></> },
  { indent: 1, content: <><span className="text-neon-violet">constructor</span>{"() {"}</> },
  { indent: 2, content: <><span className="text-slate-300">this</span>.members = <span className="text-neon-green">200</span>;</> },
  { indent: 2, content: <><span className="text-slate-300">this</span>.mission = <span className="text-amber-400">"Build. Learn. Ship."</span>;</> },
  { indent: 2, content: <><span className="text-slate-300">this</span>.stack = [<span className="text-amber-400">"React"</span>, <span className="text-amber-400">"Node"</span>, <span className="text-amber-400">"AI"</span>];</> },
  { indent: 1, content: <>{"}"}</> },
  { indent: 1, content: <></> },
  { indent: 1, content: <><span className="text-neon-cyan">join</span>{"() {"}</> },
  { indent: 2, content: <><span className="text-slate-500">// Your journey starts here 🚀</span></> },
  { indent: 2, content: <><span className="text-neon-violet">return</span> <span className="text-neon-cyan">this</span>.unlock(<span className="text-amber-400">"potential"</span>);</> },
  { indent: 1, content: <>{"}"}</> },
  { indent: 0, content: <>{"}"}</> },
  { indent: 0, content: <></> },
  { indent: 0, content: <><span className="text-slate-500">// 🔥 Ready to build?</span></> },
  { indent: 0, content: <><span className="text-neon-violet">const</span> <span className="text-neon-cyan">future</span> = <span className="text-neon-violet">await</span> <span className="text-neon-cyan">CoderHub</span>.<span className="text-neon-green">apply</span>();</> },
];

export default async function Home() {
  const nextEvent = await getNextEvent();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-grid bg-hex">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none floating-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-violet/5 rounded-full blur-3xl pointer-events-none floating-orb" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/3 rounded-full blur-3xl pointer-events-none floating-orb" />

        <div className="relative z-10 w-full max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-neon-cyan/30 text-neon-cyan text-sm font-mono mb-8 holo-shimmer">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>01 Systems Online — BU Campus Network</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-mono leading-tight mb-6 tracking-tight">
              <span className="block text-white">Code.</span>
              <span className="block gradient-text-animated">
                Collaborate.
              </span>
              <span className="block text-white">Conquer.</span>
            </h1>

            <p className="text-lg text-slate-400 mb-4 font-mono">
              <span className="text-neon-green">$</span>{" "}
              <span className="text-slate-300">
                The premier CS community @ Bundelkhand University.
              </span>
            </p>
            <p className="text-slate-500 mb-10 max-w-lg">
              From your first{" "}
              <code className="text-neon-cyan bg-neon-cyan/10 px-1 rounded text-sm">Hello World</code>{" "}
              to deploying production apps — we build together, ship together, and grow together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className="group px-8 py-4 rounded-lg bg-neon-cyan text-black font-mono font-bold text-sm hover:bg-white transition-all duration-300 glow-cyan flex items-center justify-center gap-2"
              >
                <Terminal size={16} />
                ./apply-now.sh
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="px-8 py-4 rounded-lg glassmorphism border border-glass-border text-white font-mono text-sm hover:border-neon-violet/50 hover:bg-neon-violet/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                View Events
              </Link>
            </div>

            {/* Mini stats row */}
            <div className="mt-12 flex items-center gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold font-mono text-neon-cyan text-glow">200+</div>
                <div className="text-slate-500">Members</div>
              </div>
            </div>
          </div>

          {/* Right — Terminal Window */}
          <div className="hidden lg:block">
            <div className="terminal-window">
              <div className="terminal-titlebar">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 text-slate-500 text-xs font-mono">coderhub.ts — 16 lines</span>
                <div className="ml-auto flex items-center gap-2">
                  <Wifi size={12} className="text-neon-green" />
                  <span className="text-xs text-neon-green font-mono">connected</span>
                </div>
              </div>
              <div className="terminal-body">
                <div className="flex text-xs text-slate-600 mb-4 font-mono border-b border-white/5 pb-2">
                  <span className="mr-6">PROBLEMS 0</span>
                  <span className="mr-6">OUTPUT</span>
                  <span className="text-neon-cyan border-b border-neon-cyan pb-1">TERMINAL</span>
                </div>
                {codeSnippet.map((line, i) => (
                  <div
                    key={i}
                    className="code-line flex text-xs"
                    style={{ paddingLeft: `${line.indent * 20}px` }}
                  >
                    <span className="text-slate-700 w-6 shrink-0 select-none">{i + 1}</span>
                    <span className="ml-4">{line.content}</span>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-white/5 text-xs font-mono">
                  <span className="text-neon-green">✓</span>
                  <span className="text-slate-400"> Compiled in 0.42s — </span>
                  <span className="text-neon-cyan cursor">ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TECH STACK MARQUEE ==================== */}
      <section className="py-8 border-y border-glass-border bg-black/40 overflow-hidden relative">
        <div className="flex gap-8 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className={`inline-flex items-center gap-2 font-mono text-sm ${tech.color} shrink-0`}>
              <Braces size={12} />
              {tech.name}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ==================== WHAT WE DO ==================== */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 text-neon-violet font-mono text-sm mb-4">
                <span className="text-slate-600">/*</span>
                <span>core_modules.ts</span>
                <span className="text-slate-600">*/</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
                What We{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-pink">
                  Build
                </span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Five tracks. All practical. All designed to make you dangerous in the job market.
              </p>
            </div>
          </ScrollReveal>

          <FeaturesGrid />
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-20 bg-black/60 border-y border-glass-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="zoom-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glassmorphism rounded-2xl p-8 text-center border border-glass-border">
                  <stat.icon size={24} className="text-neon-cyan mx-auto mb-4" />
                  <div className="text-4xl font-bold font-mono text-neon-cyan text-glow mb-2">{stat.value}</div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== NEXT EVENT ==================== */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

              {/* Left text */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 text-neon-cyan font-mono text-sm mb-6 bg-neon-cyan/5 px-4 py-2 rounded-full border border-neon-cyan/20">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                  Upcoming Event
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6 leading-tight">
                  Don't Miss The{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                    Next One
                  </span>
                </h2>
                <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
                  Regular technical talks, networking sessions, coding competitions, and guest lectures from industry engineers.
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-neon-cyan font-mono text-sm hover:gap-4 transition-all"
                >
                  git log --all --events <ArrowRight size={14} />
                </Link>
              </div>

              {/* Right — Event card */}
              <div className="lg:w-1/2 w-full">
                {nextEvent ? (
                  <SpotlightCard className="glassmorphism rounded-2xl overflow-hidden border border-neon-cyan/30 glow-cyan card-hover">
                    <div className="h-52 bg-slate-900 relative scanline">
                      {nextEvent.imageUrl ? (
                        <img src={nextEvent.imageUrl} alt={nextEvent.title} className="w-full h-full object-cover opacity-80" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-black to-blue-950/30 gap-3">
                          <Terminal size={40} className="text-neon-cyan/30" />
                          <div className="font-mono text-xs text-neon-cyan/40 text-center">
                            <div>{">"} event --preview</div>
                            <div className="text-slate-700">loading...</div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-neon-cyan/30 text-neon-cyan">
                        📅 {nextEvent.date}
                      </div>
                      <div className="absolute top-4 left-4 bg-neon-cyan/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-neon-cyan/30 text-neon-cyan">
                        LIVE SOON
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-white">{nextEvent.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-mono">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {nextEvent.time}</span>
                        <span className="flex items-center gap-1"><Globe size={12} /> {nextEvent.venue}</span>
                      </div>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{nextEvent.description}</p>
                      <div className="mt-5 pt-4 border-t border-white/5">
                        <Link href="/events" className="text-xs font-mono text-neon-cyan hover:text-white transition-colors flex items-center gap-1">
                          <Star size={10} />
                          Register now →
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                ) : (
                  <SpotlightCard className="glassmorphism rounded-2xl p-12 text-center border border-glass-border h-full flex flex-col justify-center items-center">
                    <div className="terminal-window w-full max-w-xs mx-auto mb-6">
                      <div className="terminal-titlebar">
                        <div className="terminal-dot bg-red-500" />
                        <div className="terminal-dot bg-yellow-500" />
                        <div className="terminal-dot bg-green-500" />
                      </div>
                      <div className="p-4 font-mono text-xs text-left">
                        <div className="text-neon-green">$</div>
                        <div className="text-slate-400">{">"} fetch /events</div>
                        <div className="text-slate-600">{">"} status: planning...</div>
                        <div className="text-neon-cyan cursor">awaiting launch</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Something is cooking 🍳</h3>
                    <p className="text-slate-500 text-sm">We're planning something epic. Stay tuned!</p>
                  </SpotlightCard>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal animation="fade-up">
            <div className="glassmorphism-strong rounded-3xl p-16 border border-neon-cyan/20 relative overflow-hidden pulse-ring">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-violet/5 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-violet/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="font-mono text-neon-green text-sm mb-6">// Ready to join?</div>
                <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
                  <span className="glitch-text text-white" data-text="Push Your">Push Your</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">
                    First Commit
                  </span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  Applications are open. Join our community of students learning to code and growing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/join"
                    className="group px-10 py-4 rounded-xl bg-neon-cyan text-black font-mono font-bold hover:bg-white transition-all duration-300 glow-cyan flex items-center justify-center gap-2"
                  >
                    <Terminal size={16} />
                    Apply Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="px-10 py-4 rounded-xl glassmorphism border border-glass-border text-white font-mono hover:border-neon-violet/50 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
