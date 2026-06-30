import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              selected === p ? "text-white" : ""
            }`}
            style={
              selected === p
                ? { background: "var(--accent)", borderColor: "var(--accent)" }
                : { borderColor: "var(--border)", color: "var(--text)" }
            }
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by username or name..."
        className="w-full max-w-md border rounded-lg px-4 py-2.5 text-sm outline-none transition-shadow focus:shadow-md"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-elevated)",
          color: "var(--text-h)",
        }}
      />
    </div>
  );
}