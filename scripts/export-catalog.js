// Writes public/api/tracks.json from the SDK catalogue so static hosts can serve the "API".
const fs = require('fs');
const path = require('path');
const sdk = require('../public/sdk/stopiffy.js');
const out = path.join(__dirname, '..', 'public', 'api', 'tracks.json');
fs.writeFileSync(out, JSON.stringify({ service: 'stopiffy', version: sdk.VERSION, tracks: sdk.BUILTIN }, null, 2));
console.log('wrote', out, sdk.BUILTIN.length, 'tracks');
