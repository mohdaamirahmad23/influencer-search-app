import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/useShortlistStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const count = useShortlistStore((s) => s.profiles.length);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b backdrop-blur-sm bg-[var(--bg)]/90"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="text-lg sm:text-xl font-semibold tracking-tight"
            style={{ color: "var(--text-h)" }}
          >
            Influencer Search
          </Link>
          <Link
            to="/shortlist"
            className="shrink-0 text-sm font-medium px-3 sm:px-4 py-2 rounded-full text-white transition-colors"
            style={{ background: "var(--accent)" }}
          >
            Shortlist{count > 0 && ` (${count})`}
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {title && (
          <h1 className="text-2xl sm:text-3xl mb-6 text-left">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}