"use client";

import { useState } from "react";
import { Terminal, Lock } from "lucide-react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(null, formData);
    
    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.message || "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative z-10">
      <div className="w-full max-w-md glassmorphism p-8 rounded-xl border border-glass-border">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-neon-cyan/10 mb-4 glow-cyan">
            <Terminal size={32} className="text-neon-cyan" />
          </div>
          <h1 className="text-2xl font-bold font-mono">Admin Access</h1>
          <p className="text-slate-400 text-sm mt-2">Enter credentials to proceed</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input 
              type="text" 
              name="username"
              required
              className="w-full bg-black/50 border border-glass-border rounded p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full bg-black/50 border border-glass-border rounded p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 rounded bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-mono hover:bg-neon-cyan hover:text-black transition-all glow-cyan flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : <><Lock size={16} /> Authenticate</>}
          </button>
        </form>
      </div>
    </div>
  );
}
