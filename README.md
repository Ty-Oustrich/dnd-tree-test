# D&D Species Tree Test

A dependency-free, low-fidelity clickable wireframe for testing how participants find D&D species information through card-sort-derived categories and a relative-size facet.

## Run locally

Serve this directory with any static web server, then open `index.html` through that server. For example:

```sh
python3 -m http.server 4173
```

## Update the final tasks

Edit `window.TASKS` near the bottom of `data.js`. Each task needs a unique `id`, participant-facing `prompt`, an `answer` summary for the CSV, and either `acceptedNames` or `criteria` for scoring.

## Update classifications

Edit the applicable species record in `data.js`. The `types` array enables intentional cross-listing. `size` must be `Small`, `Medium`, or `Large`. Commonality assignments are defined in `COMMONALITY_BY_NAME`; names not listed there default to `Rare`.

## Data collection

Test activity exists only in browser memory and is never transmitted. Participants can download one CSV containing event rows and task-result rows. Free-roam activity is not recorded. Refreshing or closing the page clears an unfinished session.

## GitHub Pages

The site uses only relative static assets and can be served directly from the repository root through GitHub Pages.
