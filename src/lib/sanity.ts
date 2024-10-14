import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: "pgq2pd26",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
});

export const urlFor = (source: any) =>
  createImageUrlBuilder(sanity).image(source);
