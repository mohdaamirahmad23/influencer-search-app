# Influencer Search App — Wobb Vibe Coder Intern Assignment

A React + TypeScript + Vite + Tailwind CSS application to search and filter influencers across Instagram, YouTube, and TikTok, view detailed profiles, and maintain a shortlist of selected creators.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Zustand (state management with persistence)
- React Router

## Features

- Search and filter influencers by platform (Instagram / YouTube / TikTok)
- Case-insensitive search by username or full name
- Profile detail pages with engagement stats
- "Add to List" shortlist feature with duplicate prevention (keyed by username + platform)
- Shortlist persists across page refreshes via `localStorage`
- Responsive layout (mobile to desktop)
- Light/dark theme support via CSS custom properties (auto-switches with system preference)

## Bugs Fixed

The starting codebase had several intentional bugs, all of which were identified and fixed:

1. **Dependency conflict**: Removed `react-beautiful-dnd`, which was causing a peer-dependency conflict with React 19 during `npm install`.
2. **Case-sensitive search**: `filterProfiles` in `dataHelpers.ts` matched username search case-sensitively while fullname search was case-insensitive — made both consistent.
3. **Swapped stats**: Engagement Rate and Engagements values were swapped on `ProfileDetailPage`.
4. **Profile loading failure**: `profileLoader.ts` failed to load profile JSON files when filename casing didn't exactly match the username (e.g., `MrBeast6000.json`) — made the lookup case-insensitive.
5. **Stale closure**: Removed a `clickCount` stale closure bug in `SearchPage`.
6. **Encoding corruption**: Fixed mojibake — characters like ✓, ←, → were rendering as garbled text due to encoding issues.
7. **Duplicate logic**: Consolidated three separate, duplicated `formatFollowers` implementations into a single shared utility in `utils/formatters.ts`.
8. **Dead code**: Removed an unused `SearchBar.tsx` component that was never imported.
9. **Unnecessary DOM attribute**: Removed a pointless `data-search` attribute from `ProfileCard`.
10. **Non-responsive layout**: Fixed fixed-width `#root` (1126px) and `ProfileCard` (700px) elements that broke on smaller screens — converted to responsive, fluid layouts.
11. **Dark mode visibility bug**: Fixed header text in `Layout.tsx` that was invisible in dark mode due to a hardcoded color.

## Libraries Added

- **Zustand** (`zustand`) — for shortlist state management with the `persist` middleware (backed by `localStorage`, key: `wobb-shortlist-storage`)

## Assumptions & Trade-offs

- The original codebase referenced a React Context-based approach for state management, but no working implementation was present. Zustand was used instead to implement the shortlist feature from scratch — chosen for its minimal boilerplate, built-in persistence middleware, and simpler API compared to Context + reducers for this scope of state.
- Shortlist data is stored only in the browser's `localStorage`; there is no backend persistence or cross-device sync.
- Sample data (`src/assets/data/`) is treated as static and read at build/runtime via `import.meta.glob`; no live API integration was assumed to be in scope.
- Theming uses CSS custom properties with a `prefers-color-scheme` media query rather than a manual toggle, keeping the design system simple while still supporting both light and dark modes.
- Sample profile detail data (`src/assets/data/profiles/`) only includes JSON files for a subset of creators (e.g., MrBeast, Cristiano Ronaldo, Khaby Lame, T-Series). Profiles without a matching detail JSON (e.g., Leo Messi) will show a "details not available" message on the profile page — this reflects the provided sample dataset, not a bug.

## Remaining Improvements (Future Scope)

- Add a manual light/dark theme toggle in addition to system-preference detection
- Add pagination or infinite scroll for larger result sets (currently shows all matched profiles)
- Add unit tests for `dataHelpers.ts` and the Zustand store
- Add loading/error states for profile data fetching
- Add sorting options (by followers, engagement rate, etc.) on the search page

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable UI components (Layout, ProfileCard, PlatformFilter, etc.)
├── pages/             # Route-level pages (SearchPage, ProfileDetailPage, ShortlistPage)
├── store/             # Zustand store for shortlist state
├── types/             # Shared TypeScript types
├── utils/             # Data helpers, formatters, profile loader
└── assets/data/       # Sample JSON data for search results and profiles
```