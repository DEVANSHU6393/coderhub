export interface CodeforcesProblem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating?: number;
  tags: string[];
  solvedCount?: number;
}

interface CodeforcesResponse {
  status: string;
  result?: {
    problems: CodeforcesProblem[];
    problemStatistics: {
      contestId: number;
      index: string;
      solvedCount: number;
    }[];
  };
}

export async function fetchCodeforcesProblems(): Promise<CodeforcesProblem[]> {
  try {
    const response = await fetch("https://codeforces.com/api/problemset.problems");
    
    if (!response.ok) {
      throw new Error("Failed to fetch from Codeforces API");
    }

    const data: CodeforcesResponse = await response.json();
    
    if (data.status !== "OK" || !data.result) {
      throw new Error("Invalid response from Codeforces API");
    }

    // Combine problems with their statistics
    const statsMap = new Map<string, number>();
    data.result.problemStatistics.forEach((stat) => {
      statsMap.set(`${stat.contestId}-${stat.index}`, stat.solvedCount);
    });

    const problemsWithStats = data.result.problems.map((problem) => ({
      ...problem,
      solvedCount: statsMap.get(`${problem.contestId}-${problem.index}`) || 0,
    }));

    // Return the first 500 problems (they are ordered by recent contests first usually)
    return problemsWithStats.slice(0, 500);
  } catch (error) {
    console.error("Error fetching Codeforces problems:", error);
    return [];
  }
}
