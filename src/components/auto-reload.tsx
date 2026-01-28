import { useEffect } from "react";
import { useGithubSha } from "../hooks/use-github-sha";
import { CURRENT_COMMIT_SHA } from "../config";

export const AutoReload = () => {
  const { data: remoteSha, isError, isLoading } = useGithubSha();

  console.log(`[AutoReload]: Running on ${CURRENT_COMMIT_SHA.substring(0, 7)}`);

  useEffect(() => {
    if (isLoading || isError) {
      return;
    }

    if (import.meta.env.DEV) {
      return;
    }

    if (!remoteSha || CURRENT_COMMIT_SHA === "development") {
      return;
    }

    const currentShortSha = CURRENT_COMMIT_SHA.substring(0, 7);
    const remoteShortSha = remoteSha.substring(0, 7);

    if (currentShortSha !== remoteShortSha) {
      console.log(
        `[AutoReload]: Detected new deployment (${currentShortSha} -> ${remoteShortSha}). Reloading page...`
      );
      window.location.reload();
    }
  }, [remoteSha, isError, isLoading]);

  return null;
};
