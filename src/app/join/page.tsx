"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Terminal, Send, CheckCircle, GitBranch, Code2, User, Mail, Phone, ChevronDown } from "lucide-react";
import { submitApplication } from "@/app/actions/application";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch/Department is required"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  reason: z.string().min(20, "Please provide a more detailed reason (at least 20 characters)"),
  honeypot: z.string().max(0).optional()
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const availableSkills = [
  "HTML/CSS", "JavaScript", "TypeScript", "React/Next.js", "Node.js",
  "Python", "Java", "C++", "Rust", "Go", "UI/UX Design", "SQL/NoSQL",
  "Docker", "Linux", "Git", "GraphQL"
];

const availableInterests = [
  "Web Development", "App Development", "Machine Learning",
  "Cybersecurity", "Competitive Programming", "Open Source",
  "Blockchain/Web3", "DevOps & Cloud", "System Design"
];

// Reusable styled input
function InputField({ label, icon: Icon, error, children }: {
  label: string;
  icon?: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
        {Icon && <Icon size={11} className="inline mr-1.5 text-neon-cyan" />}
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1">
          <span className="text-red-500">!</span> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = "w-full bg-black/60 border border-glass-border rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/30 transition-all placeholder:text-slate-700";
const selectClass = `${inputClass} appearance-none cursor-pointer`;

export default function JoinUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register, handleSubmit, setValue, watch,
    formState: { errors }
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { skills: [], interests: [], honeypot: "" }
  });

  const selectedSkills = watch("skills");
  const selectedInterests = watch("interests");
  const reasonText = watch("reason") ?? "";

  const toggleArrayItem = (field: "skills" | "interests", item: string, current: string[]) => {
    const next = current.includes(item) ? current.filter(v => v !== item) : [...current, item];
    setValue(field, next, { shouldValidate: true });
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach(val => formData.append(k, val));
        else if (v !== undefined) formData.append(k, v);
      });
      const result = await submitApplication(null, formData);
      setSubmitResult({ success: result.success, message: result.message });
    } catch {
      setSubmitResult({ success: false, message: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-grid">
        <div className="max-w-lg w-full">
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-3 font-mono text-xs text-slate-500">application.sh — success</span>
            </div>
            <div className="p-10 text-center">
              <CheckCircle size={56} className="text-neon-green mx-auto mb-6" />
              <div className="font-mono text-neon-green text-sm mb-2">✓ exit code 0</div>
              <h2 className="text-2xl font-bold font-mono mb-4 text-white">Application Submitted!</h2>
              <p className="text-slate-400 mb-2 text-sm leading-relaxed">{submitResult.message}</p>
              <p className="text-slate-600 text-xs font-mono mb-8">{">"} await review_team.process(application)</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-lg glassmorphism border border-glass-border hover:border-neon-cyan/50 text-slate-300 hover:text-neon-cyan font-mono text-sm transition-all"
              >
                Submit another → ./apply.sh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* ==================== HERO ==================== */}
      <section className="pt-36 pb-12 px-4 relative bg-grid overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-neon-cyan font-mono text-sm mb-6 bg-neon-cyan/5 px-4 py-2 rounded-full border border-neon-cyan/20">
            <Terminal size={14} />
            ./apply-now.sh — Rolling applications open
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-mono mb-5">
            Initialize{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet text-glow">
              Membership
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Fill out the form below. We review applications on a rolling basis and reach out within 3–5 days.
          </p>
        </div>
      </section>

      {/* ==================== FORM ==================== */}
      <section className="pb-28 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">

          {submitResult && !submitResult.success && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm">
              <span className="text-red-500">✗</span> {submitResult.message}
            </div>
          )}

          <div className="terminal-window">
            {/* Title bar */}
            <div className="terminal-titlebar">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-3 font-mono text-xs text-slate-500">application_form.tsx — {selectedSkills.length + selectedInterests.length} fields selected</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10">
              {/* Honeypot */}
              <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

              {/* ── SECTION 1: Personal Info ── */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <User size={14} className="text-neon-cyan" />
                  <span className="font-mono text-xs text-neon-cyan uppercase tracking-widest">Personal Info</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Full Name *" icon={User} error={errors.fullName?.message}>
                    <input {...register("fullName")} className={inputClass} placeholder="Rahul Sharma" />
                  </InputField>
                  <InputField label="Email *" icon={Mail} error={errors.email?.message}>
                    <input type="email" {...register("email")} className={inputClass} placeholder="rahul@bu.ac.in" />
                  </InputField>
                  <InputField label="Phone Number *" icon={Phone} error={errors.phone?.message}>
                    <input {...register("phone")} className={inputClass} placeholder="9876543210" />
                  </InputField>
                  <InputField label="Year *" error={errors.year?.message}>
                    <div className="relative">
                      <select {...register("year")} className={selectClass}>
                        <option value="">-- Select Year --</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </InputField>
                  <InputField label="Branch / Department *" error={errors.branch?.message}>
                    <div className="relative">
                      <select {...register("branch")} className={selectClass}>
                        <option value="">-- Select Branch --</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </InputField>
                </div>
              </div>

              {/* ── SECTION 2: Skills ── */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Code2 size={14} className="text-neon-violet" />
                  <span className="font-mono text-xs text-neon-violet uppercase tracking-widest">Skills</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neon-violet/30 to-transparent" />
                  <span className="font-mono text-xs text-slate-600">{selectedSkills.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleArrayItem("skills", skill, selectedSkills)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                        selectedSkills.includes(skill)
                          ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan glow-cyan"
                          : "bg-black/30 border-glass-border text-slate-500 hover:border-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {selectedSkills.includes(skill) ? "✓ " : ""}{skill}
                    </button>
                  ))}
                </div>
                {errors.skills && <p className="mt-2 text-xs text-red-400 font-mono">! {errors.skills.message}</p>}
              </div>

              {/* ── SECTION 3: Interests ── */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <GitBranch size={14} className="text-neon-green" />
                  <span className="font-mono text-xs text-neon-green uppercase tracking-widest">Areas of Interest</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neon-green/30 to-transparent" />
                  <span className="font-mono text-xs text-slate-600">{selectedInterests.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleArrayItem("interests", interest, selectedInterests)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                        selectedInterests.includes(interest)
                          ? "bg-neon-violet/20 border-neon-violet text-neon-violet glow-violet"
                          : "bg-black/30 border-glass-border text-slate-500 hover:border-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {selectedInterests.includes(interest) ? "✓ " : ""}{interest}
                    </button>
                  ))}
                </div>
                {errors.interests && <p className="mt-2 text-xs text-red-400 font-mono">! {errors.interests.message}</p>}
              </div>

              {/* ── SECTION 4: Links ── */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <GitBranch size={14} className="text-amber-400" />
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">Links (Optional)</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="GitHub Profile" error={errors.githubUrl?.message}>
                    <input {...register("githubUrl")} className={inputClass} placeholder="https://github.com/username" />
                  </InputField>
                  <InputField label="LinkedIn Profile" error={errors.linkedinUrl?.message}>
                    <input {...register("linkedinUrl")} className={inputClass} placeholder="https://linkedin.com/in/username" />
                  </InputField>
                </div>
              </div>

              {/* ── SECTION 5: Why ── */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Terminal size={14} className="text-neon-pink" />
                  <span className="font-mono text-xs text-neon-pink uppercase tracking-widest">Why Coder Hub?</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neon-pink/30 to-transparent" />
                  <span className="font-mono text-xs text-slate-600">{reasonText.length} chars</span>
                </div>
                <textarea
                  {...register("reason")}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your passion for tech, what you've built, what you want to learn, and why you want to join our community..."
                />
                {errors.reason && <p className="mt-1.5 text-xs text-red-400 font-mono">! {errors.reason.message}</p>}
              </div>

              {/* ── SUBMIT ── */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-neon-cyan/10 border border-neon-cyan text-neon-cyan font-mono font-bold text-sm hover:bg-neon-cyan hover:text-black transition-all duration-300 glow-cyan flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing application...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    git commit -m "apply to coder hub"
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
