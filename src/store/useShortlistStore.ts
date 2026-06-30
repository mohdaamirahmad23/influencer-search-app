import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

export interface ShortlistedProfile {
  user_id: string;
  username: string;
  fullname: string;
  picture: string;
  followers: number;
  is_verified: boolean;
  platform: Platform;
}

interface ShortlistState {
  profiles: ShortlistedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (username: string, platform: Platform) => void;
  isShortlisted: (username: string, platform: Platform) => boolean;
  clearAll: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile, platform) => {
        const alreadyExists = get().profiles.some(
          (p) => p.username === profile.username && p.platform === platform
        );
        if (alreadyExists) return;

        set((state) => ({
          profiles: [
            ...state.profiles,
            {
              user_id: profile.user_id,
              username: profile.username,
              fullname: profile.fullname,
              picture: profile.picture,
              followers: profile.followers,
              is_verified: profile.is_verified,
              platform,
            },
          ],
        }));
      },

      removeProfile: (username, platform) => {
        set((state) => ({
          profiles: state.profiles.filter(
            (p) => !(p.username === username && p.platform === platform)
          ),
        }));
      },

      isShortlisted: (username, platform) => {
        return get().profiles.some(
          (p) => p.username === username && p.platform === platform
        );
      },

      clearAll: () => set({ profiles: [] }),
    }),
    {
      name: "wobb-shortlist-storage",
    }
  )
);