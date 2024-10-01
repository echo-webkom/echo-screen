import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "pgq2pd26",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
});
