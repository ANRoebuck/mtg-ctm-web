# Analytics & Data Collection

## Backend endpoints (reference)

The backend exposes write (POST) and read (GET) endpoints for two analytics signals:

| Method | Path | Payload / params | What it records |
|--------|------|-----------------|-----------------|
| POST | `/api/data/search-history` | `{ searchedFor: string[] }` | Cards users searched for |
| GET | `/api/data/search-history` | `?days=N` (optional) | Aggregated search counts, ranked |
| POST | `/api/data/click-through` | `{ card: string, seller: string }` | Buy-link clicks |
| GET | `/api/data/click-through/sellers` | `?days=N` (optional) | Click counts grouped by seller |
| GET | `/api/data/click-through/cards` | `?days=N` (optional) | Click counts grouped by card |

Data is held in-memory and resets on server restart. Backend comments document a Postgres migration path when persistence is needed.

---

## Display-side ideas (deferred)

These would use the GET endpoints to surface analytics data to users or the developer. Deferred until POST-side data quality is solid and the backend gains persistent storage.

1. **Trending searches** — fetch `/api/data/search-history` on load and show top results as quick-pick chips below the search bar, or as a second suggestions source alongside Scryfall autocomplete.
2. **Seller popularity indicators** — fetch `/api/data/click-through/sellers` and annotate sellers in the Options tab with a rank or "popular" badge based on real click-through counts.
3. **Popular cards shortcut** — fetch `/api/data/click-through/cards` and show the top N as quick-search buttons on the empty/default state, giving users a starting point.
4. **Admin/stats view** — a hidden tab (or developer-only route) showing all three datasets in table form, scoped to last 7 days vs. all time. Most useful once data persists across restarts.

---

## Post-only: what the frontend sends

### Search term resolution (fixed)

Both search paths now resolve to a canonical Scryfall name before anything is recorded or queried:

**Multi-card search**: each line the user types is resolved through Scryfall's `GET /cards/search` before anything is sent. Only canonical card names reach `postSearchHistory`. A failed lookup is silently dropped — the history reflects only what was actually found and searched.

**Single-card search**: `searchForPrices` (`src/store/PricesStore.js`) now resolves the raw input through `searchCards` (Scryfall) first, falling back to the raw term only if that lookup fails or returns nothing. The resolved term is used for both `postSearchHistory` and the subsequent `getPrices` calls, so what's recorded always matches what was actually queried, and typos/raw input no longer fragment the search history into many keys for the same card.

### Click-through `card` field provenance (resolved)

`postClickThrough` (`src/components/results/Result.jsx`) now sends the result's `searchTerm` field rather than its `title`. Since `searchTerm` on each price result reflects the canonical term that produced it (the same one used for the `getPrices` call), it stays consistent with what's recorded in search history, making the two datasets joinable by term.

### Other gaps worth addressing

- **No-result searches are currently untracked.** If all sellers return zero prices, `postSearchHistory` has already fired with the search term, but there's no signal that it was a dead end. This could be tracked by posting to a new endpoint (e.g. `/api/data/search-history/no-result`) — a backend change — or by convention (a prefix/flag in the existing payload). Low priority, but useful for finding cards to add.
