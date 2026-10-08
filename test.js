const sdk = require('./public/sdk/stopiffy.js');
const assert = require('assert');

async function runTests() {
  console.log(`Running tests for ${sdk.BUILTIN.length} tracks...`);

  for (const track of sdk.BUILTIN) {
    const startTime = Date.now();

    // Test rendering without Web Audio API (will return Float32Array object)
    const result = await sdk.renderTrack(track);

    const renderTime = Date.now() - startTime;
    // Target is < 1s per track. Timing varies on shared CI runners / busy machines, so only warn above 1s and fail above 3s.
    if (renderTime >= 1000) console.warn(`  (slow) ${track.id} took ${renderTime}ms`);
    assert.ok(renderTime < 3000, `Track ${track.id} took too long to render: ${renderTime}ms`);

    const data = result.data;
    assert.ok(data && data.length > 0, `Track ${track.id} has empty data`);

    let maxAbs = 0;
    let hasNaN = false;
    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      if (Number.isNaN(val)) hasNaN = true;
      const absVal = Math.abs(val);
      if (absVal > maxAbs) maxAbs = absVal;
    }

    assert.ok(!hasNaN, `Track ${track.id} contains NaN values`);
    assert.ok(maxAbs > 0.001, `Track ${track.id} is practically silent (max peak: ${maxAbs})`);
    assert.ok(maxAbs <= 1.0, `Track ${track.id} clips (max peak: ${maxAbs})`);

    console.log(`✓ ${track.id} - ${renderTime}ms (peak: ${maxAbs.toFixed(4)})`);
  }

  console.log('All tests passed!');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
