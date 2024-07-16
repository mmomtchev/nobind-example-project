import { assert } from 'chai';
import example from '../lib/example.cjs';

// These are all the asynchronous tests

describe('async', () => {

  it('write into an existing ArrayBuffer', (done) => {
    const blob = new example.Blob(10);
    const ab = Buffer.alloc(10);
    blob.fill(42);
    blob.writeAsync(ab).then(() => {
      const view = new Uint8Array(ab);
      view.forEach((v) => assert.strictEqual(v, 42));
      done();
    }).catch(done);
  });

  it('try funny things', (done) => {
    const blob = new example.Blob(12);
    const ab = Buffer.alloc(8);
    blob.writeAsync(ab).then(() => {
      done('funny things');
    }).catch((e) => {
      assert.match(e.message, /Sizes must match/);
      done();
    }).catch(done);
  });
});
