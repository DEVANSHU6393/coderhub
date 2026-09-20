"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar, MapPin, Clock, FileText, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { Event } from "@prisma/client";
import { createEvent, deleteEvent } from "@/app/actions/admin";

export default function EventsManager({ initialEvents }: { initialEvents: Event[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== id));
      await deleteEvent(id);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createEvent(null, formData);
    
    if (result.success) {
      setIsCreating(false);
      // Let server revalidation handle the full reload, or we could just reload
      window.location.reload();
    } else {
      alert(result.message || "Failed to create event");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono">Events</h1>
          <p className="text-slate-400">Manage club events and workshops</p>
        </div>
        
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black rounded-md text-sm font-bold font-mono transition-colors glow-cyan hover:bg-neon-cyan/90"
          >
            <Plus size={16} /> Create Event
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="glassmorphism p-6 md:p-8 rounded-xl border border-neon-cyan/50 glow-cyan max-w-3xl mx-auto mt-8">
          <div className="mb-8 border-b border-glass-border pb-6">
            <h2 className="text-2xl font-bold font-mono text-neon-cyan">Create New Event</h2>
            <p className="text-slate-400 mt-2">Fill out the form below to publish a new event. It will appear on the homepage and events page.</p>
          </div>
          
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-6 bg-black/30 p-6 rounded-lg border border-glass-border">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <FileText size={16} className="text-neon-cyan" /> Event Title *
                </label>
                <input 
                  type="text" 
                  name="title"
                  required
                  placeholder="e.g., Intro to Next.js"
                  className="w-full bg-black/50 border-b-2 border-slate-600 border-x-0 border-t-0 rounded-none px-0 py-2 text-white text-lg focus:ring-0 focus:border-neon-cyan transition-colors"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <FileText size={16} className="text-neon-violet" /> Description *
                </label>
                <textarea 
                  name="description"
                  required
                  rows={4}
                  placeholder="What is this event about?"
                  className="w-full bg-black/50 border-b-2 border-slate-600 border-x-0 border-t-0 rounded-none px-0 py-2 text-white focus:ring-0 focus:border-neon-violet transition-colors"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <Calendar size={16} className="text-neon-blue" /> Date *
                  </label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    className="w-full bg-black/50 border-b-2 border-slate-600 border-x-0 border-t-0 rounded-none px-0 py-2 text-white focus:ring-0 focus:border-neon-blue transition-colors [color-scheme:dark]"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <Clock size={16} className="text-pink-500" /> Time *
                  </label>
                  <input 
                    type="time" 
                    name="time"
                    required
                    className="w-full bg-black/50 border-b-2 border-slate-600 border-x-0 border-t-0 rounded-none px-0 py-2 text-white focus:ring-0 focus:border-pink-500 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <MapPin size={16} className="text-green-500" /> Venue *
                </label>
                <input 
                  type="text" 
                  name="venue"
                  required
                  placeholder="e.g., Main Auditorium"
                  className="w-full bg-black/50 border-b-2 border-slate-600 border-x-0 border-t-0 rounded-none px-0 py-2 text-white focus:ring-0 focus:border-green-500 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <ImageIcon size={16} className="text-yellow-500" /> Poster Image URL (Optional)
                </label>
                <input 
                  type="url" 
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-black/50 border-b-2 border-slate-600 border-x-0 border-t-0 rounded-none px-0 py-2 text-white focus:ring-0 focus:border-yellow-500 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <LinkIcon size={16} className="text-orange-500" /> Registration Link (Optional)
                </label>
                <input 
                  type="url" 
                  name="registrationLink"
                  placeholder="https://forms.gle/..."
                  className="w-full bg-black/50 border-b-2 border-slate-600 border-x-0 border-t-0 rounded-none px-0 py-2 text-white focus:ring-0 focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-6 py-2 rounded-md bg-white/5 border border-glass-border hover:bg-white/10 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-md bg-neon-cyan text-black font-bold hover:bg-neon-cyan/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="glassmorphism rounded-xl border border-glass-border overflow-hidden flex flex-col">
                <div className="p-5 flex-1 border-b border-glass-border">
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">{event.title}</h3>
                  <div className="space-y-1 mb-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2"><Calendar size={14} /> {event.date}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} /> {event.venue}</div>
                  </div>
                </div>
                <div className="bg-black/40 px-5 py-3 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-500">
                    Created {new Date(event.createdAt).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="p-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full glassmorphism p-12 rounded-xl border border-glass-border text-center">
              <h3 className="text-xl font-bold mb-2">No Events Found</h3>
              <p className="text-slate-400">You haven't created any events yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
