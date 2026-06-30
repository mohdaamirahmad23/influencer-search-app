import type { ProfileDetailResponse } from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

// Build a lowercase-username -> loader map once, so lookups are case-insensitive.
const normalizedModules = Object.entries(profileModules).reduce(
  (acc, [path, loader]) => {
    const match = path.match(/([^/]+)\.json$/);
    const key = match ? match[1].toLowerCase() : path.toLowerCase();
    acc[key] = loader;
    return acc;
  },
  {} as Record<string, (typeof profileModules)[string]>
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const loader = normalizedModules[username.toLowerCase()];
  if (!loader) {
    return null;
  }
  
  const result = await loader();
  const data =
    (result as { default?: ProfileDetailResponse }).default ?? result;
  return data as ProfileDetailResponse;
}