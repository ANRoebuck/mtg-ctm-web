# Wheel fly-up animation replaying on repeat searches

## Issue

When there are no search results, the app renders a default view containing the
Chad Magic wheel logo. On a user's *first* search, the wheel animates by flying up
into the corner of the screen, where it becomes the small loading spinner next to
the search bar. This looked correct and intentional.

On a *second* (or any subsequent) search, the previous results are cleared as soon
as the new search is submitted. Because results are momentarily empty again, the
default view re-mounts and the fly-up animation plays again, even though the user
already has results on screen and this isn't their first search. This looked buggy
even though the underlying "clear results immediately" behaviour is correct.

## Root cause

- `ResultsView` (`src/components/results/ResultsViews.jsx`) decides whether to show
  the default view purely based on `pricesStore.sortedPrices.length === 0`. There
  was no distinction between "genuinely no results have ever been shown" and
  "results were just cleared because a new search started."
- `PricesStore.searchForPrices` / `searchForMultiplePrices`
  (`src/store/PricesStore.js`) call `clearResults()` synchronously as the very
  first step of every search — first or subsequent — which immediately drops
  `discoveredPrices` to `[]`.
- `DefaultView` (`src/components/results/DefaultView.jsx`) drives the fly-up
  animation with local `useState` (`exiting`, `exitTransform`). This state is
  local to the component instance, so it resets to its initial values every time
  `DefaultView` is freshly mounted. The component has no memory of "I already
  flew away once" across mounts.
- The animation itself is triggered once `pricesStore.sellersLoadingCount > 0`
  (i.e. a seller request is in flight), which happens on every search, not just
  the first.
- No flag anywhere (store or component) tracked "has the user ever seen results
  this session" — confirmed by searching the codebase for anything like
  `hasSearched`/`everHadResults` before this change.

Net effect: every new search re-created the exact conditions of a true first
search (empty results + a loading seller), so `DefaultView` replayed the same
animation every time, regardless of search history.

## Options considered

**A. Gate `DefaultView` behind a "has shown results before" flag.**
Add a store flag set once real results have ever been added, and never reset for
the session. Skip mounting `DefaultView` (render nothing) while a search is in
flight if that flag is already set. Smallest, most surgical change — no changes
needed to the animation logic itself, since `DefaultView` simply doesn't mount in
the replay-causing case.

**B. Stop clearing results eagerly — keep old results visible until new ones land.**
Instead of clearing `discoveredPrices` synchronously on submit, keep the previous
results rendered (optionally dimmed, with a "searching…" overlay) and only swap
them out once new data arrives. This removes the transient empty state
altogether rather than special-casing around it, but it's a larger change:
sorting/filtering and per-seller loading logic currently assume the array is
cleared during a search, and it introduces new UX questions (how to indicate
"these are stale, refreshing now").

**C. Make the wheel's "docked" state persistent/sticky instead of component-local.**
Lift the animation state (`idle` / `flying` / `docked`) out of `DefaultView`'s
local `useState` into something that survives unmount/remount (store or a ref
held higher in the tree), so it never replays once docked, even if `DefaultView`
legitimately remounts later. On its own this doesn't fully solve the problem,
since the wheel would still flash statically in the middle of the screen on
remount before anything could tell it to stay hidden — it would need to be
paired with something like option A anyway.

## Fix implemented: Option A

Chosen because it directly targets the reported symptom with the smallest,
lowest-risk change, and doesn't require reworking how/when results are cleared
or how the animation itself is computed.

### Changes

- `src/store/PricesStore.js`: added a `hasShownResults` observable (starts
  `false`). `addPrices` now sets it to `true` the first time it's called with a
  non-empty array of prices. It's intentionally **not** included in the
  `makePersistable` properties list, so it resets on every fresh page load —
  the very first search of a new session still gets the full fly-up animation.
- `src/components/results/ResultsViews.jsx`: `ResultsView` now checks, when
  `sortedPrices.length === 0`, whether `pricesStore.isSearching &&
  pricesStore.hasShownResults`. If so, it renders `null` instead of mounting
  `DefaultView` — relying on the small persistent spinner already shown next to
  the search bar (`.loading-doughnut` in `SearchMenu.jsx`) to indicate the search
  is in progress. Otherwise (true first search, or a completed search that
  genuinely found nothing), it renders `DefaultView` exactly as before.

### Why this covers the cases correctly

- **First-ever search**: `hasShownResults` is `false`, so `DefaultView` mounts
  and animates as before.
- **Second+ search, previous search had results**: `hasShownResults` is `true`
  and `isSearching` is `true` while results are cleared and the new search runs
  — `ResultsView` renders `null`, so the wheel never re-appears or re-animates.
- **Search completes with zero results, after previously having results**: once
  `isSearching` flips back to `false`, the `null` branch no longer applies, so
  `DefaultView` mounts. By this point every seller's `loading` flag has already
  been cleared, so `sellersLoadingCount === 0` and `DefaultView`'s animation
  effect no-ops — the wheel appears statically, with no animation glitch.
