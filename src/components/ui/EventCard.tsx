import { Calendar, Clock, MapPin, Link as LinkIcon, Terminal } from "lucide-react";
import { Event } from "@prisma/client";
import Image from "next/image";

export default function EventCard({ event, isPast = false }: { event: Event, isPast?: boolean }) {
  return (
    <div className={`glassmorphism rounded-xl overflow-hidden border transition-all duration-300 h-full flex flex-col ${
      isPast 
        ? "border-glass-border opacity-70 grayscale-[30%]" 
        : "border-neon-cyan/30 hover:border-neon-cyan hover:glow-cyan"
    }`}>
      <div className="h-48 relative bg-slate-800">
        {event.imageUrl ? (
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
            <Terminal size={48} className="text-slate-600" />
          </div>
        )}
        
        {!isPast && (
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-sm font-mono border border-glass-border text-neon-cyan">
            Upcoming
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-neon-violet" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-neon-cyan" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-neon-blue" />
            <span>{event.venue}</span>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
          {event.description}
        </p>
        
        {event.registrationLink && !isPast && (
          <a 
            href={event.registrationLink} 
            target="_blank" 
            rel="noreferrer"
            className="w-full py-3 rounded bg-white/5 border border-glass-border hover:bg-neon-cyan/10 hover:border-neon-cyan hover:text-neon-cyan text-center font-mono text-sm transition-all flex items-center justify-center gap-2"
          >
            Register Now <LinkIcon size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
