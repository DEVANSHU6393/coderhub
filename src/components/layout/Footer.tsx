import Link from "next/link";
import { Terminal, Globe, Link as LinkIcon, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border/50 bg-black/50 py-12 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img src="/logo.png" alt="Coder Hub Logo" className="h-12 w-auto mb-4 rounded-md object-contain" />
            <p className="text-slate-400 max-w-sm">
              The official computer science club of Bundelkhand University. Learn, Build, and Ship together with a community of passionate developers.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-neon-cyan transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-neon-cyan transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-slate-400 hover:text-neon-cyan transition-colors">Events</Link></li>
              <li><Link href="/join" className="text-slate-400 hover:text-neon-cyan transition-colors">Join Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="TODO: Add GitHub URL" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Terminal size={20} />
              </a>
              <a href="TODO: Add LinkedIn URL" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-neon-blue transition-colors">
                <LinkIcon size={20} />
              </a>
              <a href="TODO: Add Instagram URL" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors">
                <Globe size={20} />
              </a>
              <a href="TODO: Add WhatsApp/Discord URL" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-neon-violet transition-colors">
                <MessageSquare size={20} />
              </a>
            </div>
            <div className="mt-4">
              <a href="mailto:TODO: Add Contact Email" className="text-slate-400 hover:text-neon-cyan transition-colors text-sm">
                TODO: Add Contact Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-glass-border/30 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Coder Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
