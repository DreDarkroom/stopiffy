# Stopiffy

A parody music service: a free, CC0, **generative** catalogue plus a tiny SDK and website, built for the
Weirdlings Anti-AI Tribe birthday game — and reusable by any other game or project.

- **No assets, no licensing.** Every track is a seed + style + BPM; the SDK renders it to an `AudioBuffer`
  with an `OfflineAudioContext` (a few hundred ms per track).
- **Static-host friendly.** `public/` is the whole site. `public/api/tracks.json` is the "API".
- **Optional server.** `node server.js` serves the site plus `/api/tracks` and `/api/tracks/:id`.
- **Zero dependencies.**

```bash
npm run build   # regenerate public/api/tracks.json from the SDK catalogue
npm start       # http://localhost:4300
```

See [docs/API.md](docs/API.md). License: CC0-1.0 (see LICENSE).

## Roadmap
- More styles (dnb, trance), per-track stems, tempo-map metadata for beat-grid accuracy.
- Upload real CC0 audio (Free Music Archive / Internet Archive) as a second source type.
- Playlists, search, a real "Stopiffy Connect" remote.
