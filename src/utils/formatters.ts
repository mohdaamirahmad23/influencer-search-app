export function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + "K";
  }
  return count.toString();
}

export function formatFollowersWithLabel(count: number): string {
  return `${formatFollowers(count)} followers`;
}

export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}

export function formatCount(count: number | undefined): string {
  if (count === undefined) return "N/A";
  return formatFollowers(count);
}