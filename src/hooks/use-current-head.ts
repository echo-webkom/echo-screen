import { Octokit } from "@octokit/rest";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const octokit = new Octokit();

export const currentHead = async () => {
  return octokit.rest.repos
    .listCommits({
      owner: "echo-webkom",
      repo: "echo-screen",
    })
    .then((res) => res.data[0].sha);
};

export const useReloadUpdate = () => {
  const { data: sha } = useQuery({
    queryKey: ["sha"],
    queryFn: currentHead,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (sha !== import.meta.env.__COMMIT_HASH__) {
      location.reload();
    }
  }, [sha]);
};
