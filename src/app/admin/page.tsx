import { prisma } from "@/lib/prisma";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  const total = applications.length;
  const pending = applications.filter(a => a.status === 'pending').length;
  const approved = applications.filter(a => a.status === 'approved').length;
  const rejected = applications.filter(a => a.status === 'rejected').length;

  return (
    <div className="space-y-8">
      {/* Dashboard Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glassmorphism p-6 rounded-xl border border-glass-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neon-cyan/10 text-neon-cyan rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">{total}</div>
              <div className="text-slate-400 text-sm font-mono uppercase">Total Apps</div>
            </div>
          </div>
        </div>
        
        <div className="glassmorphism p-6 rounded-xl border border-glass-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-400/10 text-amber-400 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">{pending}</div>
              <div className="text-slate-400 text-sm font-mono uppercase">Pending</div>
            </div>
          </div>
        </div>

        <div className="glassmorphism p-6 rounded-xl border border-glass-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neon-green/10 text-neon-green rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">{approved}</div>
              <div className="text-slate-400 text-sm font-mono uppercase">Approved</div>
            </div>
          </div>
        </div>

        <div className="glassmorphism p-6 rounded-xl border border-glass-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
              <XCircle size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">{rejected}</div>
              <div className="text-slate-400 text-sm font-mono uppercase">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-glass-border my-8" />

      {/* Main Table */}
      <ApplicationsTable initialData={applications} />
    </div>
  );
}
