import { Terminal, Calendar, MapPin, Clock, Zap, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Hackathons",
  description: "Check out upcoming workshops, hackathons, and events from Coder Hub.",
};

export const dynamic = 'force-dynamic';

async function getEvents() {
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = await prisma.event.findMany({
    where: { date: { gte: today } },
    orderBy: { date: 'asc' }
  });
  const pastEvents = await prisma.event.findMany({
    where: { date: { lt: today } },
    orderBy: { date: 'desc' }
  });
  return { upcomingEvents, pastEvents };
}

const eventTypeColors: Record<string, string> = {
  workshop: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  hackathon: "text-neon-violet border-neon-violet/30 bg-neon-violet/10",
  talk: "text-neon-green border-neon-green/30 bg-neon-green/10",
  competition: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  default: "text-slate-400 border-glass-border bg-white/5",
};

function getEventType(title: string) {
  const t = title.toLowerCase();
  if (t.includes("workshop")) return "workshop";
  if (t.includes("hackathon")) return "hackathon";
  if (t.includes("talk") || t.includes("lecture")) return "talk";
  if (t.includes("competition") || t.includes("ctf") || t.includes("contest")) return "competition";
  return "default";
}

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  imageUrl?: string | null;
};

function EventCard({ event, isPast }: { event: Event; isPast?: boolean }) {
  const type = getEventType(event.title);
  const colorClass = eventTypeColors[type] ?? eventTypeColors.default;

  return (
    <div className={`glassmorphism rounded-2xl overflow-hidden border border-glass-border hover:border-neon-cyan/40 transition-all duration-300 group card-hover flex flex-col ${isPast ? "opacity-60 hover:opacity-90" : ""}`}>
      {/* Image / placeholder */}
      <div className="h-44 relative bg-slate-900 overflow-hidden shrink-0">
        {event.imageUrl ? (
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-black to-blue-950/20 gap-2">
            <Terminal size={32} className="text-neon-cyan/20" />
            <span className="font-mono text-xs text-slate-700">event --preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Type badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-mono border capitalize ${colorClass}`}>
          {type}
        </div>

        {/* Date badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-2 py-1 rounded-full text-xs font-mono text-slate-300 border border-glass-border">
          {event.date}
        </div>

        {isPast && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-mono text-slate-500 border border-glass-border">
            PAST
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug">{event.title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-mono mb-3">
          <span className="flex items-center gap-1"><Clock size={11} /> {event.time}</span>
          <span className="flex items-center gap-1"><MapPin size={11} /> {event.venue}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1">{event.description}</p>
        {!isPast && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <span className="text-xs font-mono text-neon-cyan flex items-center gap-1 group-hover:gap-2 transition-all">
              <Zap size={10} /> Register Now <ChevronRight size={10} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function Events() {
  const { upcomingEvents, pastEvents } = await getEvents();

  return (
    <div className="flex flex-col min-h-screen">

      {/* ==================== HERO ==================== */}
      <section className="pt-36 pb-20 px-4 relative bg-grid overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-neon-violet/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-neon-violet font-mono text-sm mb-6 bg-neon-violet/5 px-4 py-2 rounded-full border border-neon-violet/20">
            <span className="w-2 h-2 bg-neon-violet rounded-full animate-pulse" />
            {upcomingEvents.length > 0 ? `${upcomingEvents.length} upcoming event${upcomingEvents.length > 1 ? "s" : ""}` : "Stay tuned for upcoming events"}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-pink">
              Events
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Workshops. Hackathons. Tech talks. Guest lectures. Industry sessions. If it involves code — we host it.
          </p>
        </div>
      </section>

      {/* ==================== UPCOMING EVENTS ==================== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              <h2 className="text-2xl font-bold font-mono">Upcoming</h2>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/50 to-transparent" />
            <span className="font-mono text-xs text-slate-600">{upcomingEvents.length} event(s)</span>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="terminal-window max-w-lg mx-auto">
              <div className="terminal-titlebar">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 font-mono text-xs text-slate-500">events.sh</span>
              </div>
              <div className="p-8 font-mono text-sm text-center">
                <div className="text-slate-600 mb-2">{">"} fetch --upcoming-events</div>
                <div className="text-slate-500 mb-4">{">"} status: <span className="text-amber-400">planning...</span></div>
                <div className="text-neon-cyan text-lg font-bold mb-2">Something is loading 🚀</div>
                <div className="text-slate-500 text-xs">Check back soon — we're cooking up the next event.</div>
                <div className="mt-6">
                  <Link href="/join" className="inline-flex items-center gap-2 text-neon-cyan border border-neon-cyan/30 px-4 py-2 rounded-lg text-sm hover:bg-neon-cyan/10 transition-colors">
                    <Zap size={14} /> Get notified — Join us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== PAST EVENTS ==================== */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-black/50 border-t border-glass-border relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-600 rounded-full" />
                <h2 className="text-2xl font-bold font-mono text-slate-400">Past Events</h2>
              </div>
              <div className="h-px flex-1 bg-glass-border" />
              <span className="font-mono text-xs text-slate-700">{pastEvents.length} event(s)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
