"use client";

import { useState } from "react";
import { Download, Search, CheckCircle, XCircle, Clock, Trash2 } from "lucide-react";
import { Application } from "@prisma/client";
import { updateApplicationStatus, deleteApplication } from "@/app/actions/admin";

export default function ApplicationsTable({ initialData }: { initialData: Application[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [applications, setApplications] = useState(initialData);

  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setApplications(apps => 
      apps.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
    
    // Server update
    await updateApplicationStatus(id, newStatus);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}'s application?`)) return;
    // Optimistic UI removal
    setApplications(apps => apps.filter(app => app.id !== id));
    await deleteApplication(id);
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Year", "Branch", "Experience", "Source", "Skills", "Interests", "GitHub", "LinkedIn", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredApps.map(app => [
        `"${app.fullName}"`,
        `"${app.email}"`,
        `"${app.phone}"`,
        `"${app.year}"`,
        `"${app.branch}"`,
        `"${app.experience}"`,
        `"${app.source}"`,
        `"${app.skills.join("; ")}"`,
        `"${app.interests.join("; ")}"`,
        `"${app.githubUrl || ""}"`,
        `"${app.linkedinUrl || ""}"`,
        `"${app.status}"`,
        `"${new Date(app.createdAt).toLocaleDateString()}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono">Applications</h1>
          <p className="text-slate-400">Manage membership requests ({filteredApps.length} total)</p>
        </div>
        
        <button 
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-glass-border rounded-md text-sm font-mono transition-colors"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="glassmorphism p-4 rounded-xl border border-glass-border flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-glass-border rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
          />
        </div>
        
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-black/50 border border-glass-border rounded-md py-2 px-4 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="glassmorphism border border-glass-border rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-glass-border bg-white/5">
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{app.fullName}</div>
                    <div className="text-sm text-slate-400">{app.email}</div>
                    <div className="text-xs text-slate-500 mt-1">{app.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-300">
                      {app.year} • {app.branch}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      <span className="text-neon-cyan/80">Exp:</span> {app.experience}
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="text-neon-violet/80">Via:</span> {app.source}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[250px]">
                    <p className="text-sm text-slate-300 truncate" title={app.reason}>
                      {app.reason}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-white/5 px-2 py-1 rounded text-slate-400 truncate max-w-[120px]" title={app.skills.join(", ")}>
                        {app.skills.length} Skills
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      app.status === 'accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      app.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {app.status === 'accepted' && <CheckCircle size={12} />}
                      {app.status === 'rejected' && <XCircle size={12} />}
                      {app.status === 'pending' && <Clock size={12} />}
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {app.status !== 'accepted' && (
                        <button 
                          onClick={() => handleStatusChange(app.id, 'accepted')}
                          className="p-1.5 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                          title="Accept"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button 
                          onClick={() => handleStatusChange(app.id, 'rejected')}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                      {app.status !== 'pending' && (
                        <button 
                          onClick={() => handleStatusChange(app.id, 'pending')}
                          className="p-1.5 rounded bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                          title="Mark Pending"
                        >
                          <Clock size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(app.id, app.fullName)}
                        className="p-1.5 rounded bg-slate-500/10 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors ml-1"
                        title="Delete Application"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  No applications found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
