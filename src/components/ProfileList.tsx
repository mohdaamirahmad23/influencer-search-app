import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <p className="text-center py-12" style={{ color: "var(--text)" }}>
        No profiles found
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}