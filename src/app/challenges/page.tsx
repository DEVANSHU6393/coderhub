import { fetchCodeforcesProblems } from "@/lib/codeforces";
import ChallengesClient from "./ChallengesClient";

export const revalidate = 3600; // Revalidate every hour

export default async function ChallengesPage() {
  const problems = await fetchCodeforcesProblems();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-glow">
            Coding <span className="text-neon-cyan">Challenges</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Sharpen your problem-solving skills with the latest and trending coding challenges fetched directly from Codeforces. Filter by difficulty, tags, and dive into competitive programming!
          </p>
        </div>

        {/* Client component for interactive filtering and displaying problems */}
        <ChallengesClient initialProblems={problems} />
      </div>
    </div>
  );
}
