import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowersWithLabel } from "@/utils/formatters";
import { useShortlistStore } from "@/store/useShortlistStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addProfile = useShortlistStore((s) => s.addProfile);
  const removeProfile = useShortlistStore((s) => s.removeProfile);
  const isShortlisted = useShortlistStore((s) =>
    s.isShortlisted(profile.username, platform)
  );

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isShortlisted) {
      removeProfile(profile.username, platform);
    } else {
      addProfile(profile, platform);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex items-center gap-4 p-4 rounded-xl border mb-3 cursor-pointer transition-all hover:-translate-y-0.5"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-elevated)",
        boxShadow: "var(--shadow)",
      }}
    >
      <img
        src={profile.picture}
        className="w-14 h-14 rounded-full object-cover shrink-0"
        style={{ border: "1px solid var(--border)" }}
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold flex items-center gap-1 truncate" style={{ color: "var(--text-h)" }}>
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm truncate" style={{ color: "var(--text)" }}>
          {profile.fullname}
        </div>
        <div className="text-sm mt-0.5" style={{ color: "var(--text)" }}>
          {formatFollowersWithLabel(profile.followers)}
        </div>
      </div>
      <button
        onClick={handleAddToList}
        className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          isShortlisted
            ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
            : "text-white"
        }`}
        style={!isShortlisted ? { background: "var(--accent)" } : undefined}
      >
        {isShortlisted ? "Remove" : "Add to List"}
      </button>
    </div>
  );
}