import { useQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/rest";
import {
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME,
  GITHUB_MAIN_BRANCH,
  AUTO_RELOAD_CHECK_INTERVAL
} from "../config";

export const useGithubSha = () => {
  return useQuery({
    queryKey: ["github-sha"],
    queryFn: async () => {
      const octokit = new Octokit();

      const { data } = await octokit.repos.getBranch({
        owner: GITHUB_REPO_OWNER,
        repo: GITHUB_REPO_NAME,
        branch: GITHUB_MAIN_BRANCH
      });

      return data.commit.sha;
    },
    refetchInterval: AUTO_RELOAD_CHECK_INTERVAL,
    refetchIntervalInBackground: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000
  });
};
