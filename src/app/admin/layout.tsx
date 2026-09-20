"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Users, Calendar, LogOut, BookOpen, CheckSquare } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden z-10 relative">
      {/* Sidebar */}
      <aside className="w-64 glassmorphism border-r border-glass-border flex flex-col">
        <div className="p-6 border-b border-glass-border">
          <div className="flex items-center gap-2 text-neon-cyan">
            <Terminal size={24} />
            <span className="font-mono font-bold text-xl tracking-tight">ADMIN</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname === "/admin" 
                ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={18} />
            <span>Applications</span>
          </Link>
          
          <Link 
            href="/admin/events" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname.startsWith("/admin/events")
                ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Calendar size={18} />
            <span>Events</span>
          </Link>

          <Link 
            href="/admin/resources" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname.startsWith("/admin/resources")
                ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen size={18} />
            <span>Resources</span>
          </Link>

          <Link 
            href="/admin/tests" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname.startsWith("/admin/tests")
                ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <CheckSquare size={18} />
            <span>MCQ Tests</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-glass-border">
          <form action={logout}>
            <button 
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-3 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
