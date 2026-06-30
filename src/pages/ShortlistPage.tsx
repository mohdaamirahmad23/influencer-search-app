import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowersWithLabel } from "@/utils/formatters";
import { useShortlistStore } from "@/store/useShortlistStore";

export function ShortlistPage() {
  const profiles = useShortlistStore((s) => s.profiles);
  const removeProfile = useShortlistStore((s) => s.removeProfile);

  return (
    <Layout title="My Shortlist">
      <p className="text-sm mb-6" style={{ color: "var(--text)" }}>
        {profiles.length} profile{profiles.length !== 1 ? "s" : ""} saved
      </p>

      {profiles.length === 0 && (
        <div
          className="text-center py-16 rounded-2xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
        >
          <p className="mb-3" style={{ color: "var(--text)" }}>
            No profiles added yet.
          </p>
          <Link to="/" className="text-sm hover:underline" style={{ color: "var(--accent)" }}>
            Go back to search
          </Link>
        </div>
      )}

      <div className="flex flex-col">
        {profiles.map((profile) => (
          <div
            key={`${profile.platform}-${profile.username}`}
            className="flex items-center gap-4 p-4 rounded-xl border mb-3"
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
              <Link
                to={`/profile/${profile.username}?platform=${profile.platform}`}
                className="font-semibold flex items-center gap-1 hover:underline truncate"
                style={{ color: "var(--text-h)" }}
              >
                @{profile.username}
                <VerifiedBadge verified={profile.is_verified} />
              </Link>
              <div className="text-sm truncate" style={{ color: "var(--text)" }}>
                {profile.fullname}
              </div>
              <div className="text-sm mt-0.5" style={{ color: "var(--text)" }}>
                {formatFollowersWithLabel(profile.followers)} ·{" "}
                <span className="capitalize">{profile.platform}</span>
              </div>
            </div>
            <button
              onClick={() => removeProfile(profile.username, profile.platform)}
              className="shrink-0 px-4 py-2 text-sm font-medium rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}