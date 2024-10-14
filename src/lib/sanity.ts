import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanity = createClient({
  projectId: "pgq2pd26",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
});

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(sanity).image(source);
