import { Octokit } from "@octokit/rest";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const octokit = new Octokit();

export const currentHead = async () => {
  octokit.rest.repos
    .listCommits({
      owner: "echo-webkom",
      repo: "echo-screen",
    })
    .then((res) => res.data[0].sha);
};

export const useReloadUpdate = () => {
  const { data } = useQuery({
    queryKey: ["sha"],
    queryFn: currentHead,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data !== process.env.__COMMIT_HASH__) {
      location.reload();
    }
  }, [data]);
};
