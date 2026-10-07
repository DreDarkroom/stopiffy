# Stopiffy API / SDK

## HTTP
- `GET /api/tracks.json` → `{ service, version, tracks: Track[] }`
- `GET /api/tracks/:id` → `Track` (server.js only)

`Track = { id, title, artist, style, bpm, root, scale, seed, bars, duration, tags[], license }`

## SDK (`sdk/stopiffy.js`, UMD)
- `new Stopiffy.Client({ base })` — `base` is the origin hosting `/api/tracks.json`; empty = built-in catalogue.
- `client.tracks()` → `Promise<Track[]>` (falls back to built-in catalogue on network failure)
- `client.find(id)` / `client.load(trackOrId)` → `Promise<AudioBuffer>` (cached)
- `Stopiffy.renderTrack(track)` — low-level renderer
- `Stopiffy.BUILTIN` — the bundled catalogue

Tracks loop seamlessly at bar boundaries: loop the whole buffer.
