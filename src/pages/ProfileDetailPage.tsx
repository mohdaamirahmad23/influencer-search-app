import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatCount } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useShortlistStore } from "@/store/useShortlistStore";
function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      className="rounded-lg p-3 border"
      style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
    >
      <div className="text-xs" style={{ color: "var(--text)" }}>
        {label}
      </div>
      <div className="font-semibold mt-0.5" style={{ color: "var(--text-h)" }}>
        {value}
      </div>
    </div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const addProfile = useShortlistStore((s) => s.addProfile);
  const removeProfile = useShortlistStore((s) => s.removeProfile);
  const isShortlisted = useShortlistStore((s) =>
    username ? s.isShortlisted(username, platform as never) : false
  );

  useEffect(() => {
    if (!username) return;
    setLoaded(false);
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p style={{ color: "var(--text)" }}>Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-500 mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" style={{ color: "var(--accent)" }} className="underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const handleAddToList = () => {
    if (isShortlisted) {
      removeProfile(user.username, platform as never);
    } else {
      addProfile(user, platform as never);
    }
  };

  return (
    <Layout>
      <Link
        to="/"
        className="text-sm mb-6 inline-block hover:underline"
        style={{ color: "var(--accent)" }}
      >
        &#8592; Back to search
      </Link>

      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-elevated)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={user.picture}
            className="w-24 h-24 rounded-full object-cover shrink-0"
            style={{ border: "2px solid var(--border)" }}
          />
          <div className="flex-1 text-left w-full">
            <h2 className="text-xl font-bold flex items-center gap-1" style={{ color: "var(--text-h)" }}>
              @{user.username}
              <VerifiedBadge verified={user.is_verified} />
            </h2>
            <p style={{ color: "var(--text)" }}>{user.fullname}</p>
            <p className="text-xs mt-1 capitalize" style={{ color: "var(--text)" }}>
              Platform: {platform}
            </p>

            {user.description && (
              <p className="mt-3 text-sm" style={{ color: "var(--text)" }}>
                {user.description}
              </p>
           )}

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <StatCard label="Followers" value={formatCount(user.followers)} />
              <StatCard label="Engagement Rate" value={formatEngagementRate(user.engagement_rate)} />
              {user.posts_count !== undefined && (
                <StatCard label="Posts" value={user.posts_count} />
              )}
              {user.avg_likes !== undefined && (
                <StatCard label="Avg Likes" value={formatCount(user.avg_likes)} />
              )}
              {user.avg_comments !== undefined && (
                <StatCard label="Avg Comments" value={user.avg_comments} />
              )}
              {user.avg_views !== undefined && user.avg_views > 0 && (
                <StatCard label="Avg Views" value={formatCount(user.avg_views)} />
              )}
              {user.engagements !== undefined && (
                <StatCard label="Engagements" value={formatCount(user.engagements)} />
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <button
                onClick={handleAddToList}
                className={isShortlisted ? "px-5 py-2.5 rounded-full text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20" : "px-5 py-2.5 rounded-full text-sm font-medium text-white"}
                style={!isShortlisted ? { background: "var(--accent)" } : undefined}
              >
                {isShortlisted ? "Remove from List" : "Add to List"}
              </button>

              {user.url && (
                <a href={user.url} target="_blank" className="text-sm hover:underline" style={{ color: "var(--accent)" }}>
                  View on platform &#8594;
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}