import { assert } from 'chai';
import example from '../lib/example.cjs';

// These are all the synchronous tests

describe('sync', () => {
  // Testing for memory leaks with ASAN requires this
  afterEach(() => {
    if (globalThis.gc) globalThis.gc();
  });

  it('create a new null Blob', () => {
    const blob = new example.Blob;
    const buf = blob.export();
    assert.instanceOf(buf, Buffer);
    assert.strictEqual(buf.length, 0);
  });

  it('create a new empty Blob', () => {
    const blob = new example.Blob(10);
    const buf = blob.export();
    assert.instanceOf(buf, Buffer);
    assert.strictEqual(buf.length, 10);
  });

  it('create a new Blob from a Buffer', () => {
    const buf = Buffer.from([1, 2, 3, 4]);
    const blob = example.Blob.create(buf);
    assert.instanceOf(blob, example.Blob);
  });

  it('create a new Blob from Blob (copy constructor)', () => {
    const blob1 = new example.Blob(8);
    const blob2 = new example.Blob(blob1);
    assert.instanceOf(blob2, example.Blob);   
  });

  it('fill a new Blob', () => {
    const blob = new example.Blob(10);
    blob.fill(17);
    const buf = blob.export();
    assert.instanceOf(buf, Buffer);
    assert.strictEqual(buf.length, 10);
    buf.forEach((v) => assert.strictEqual(v, 17));
  });

  it('write into an existing Buffer', () => {
    const blob = new example.Blob(10);
    const buf = Buffer.alloc(10);
    blob.fill(42);
    blob.write(buf);
    buf.forEach((v) => assert.strictEqual(v, 42));
  });

  it('try funny things', () => {
    const blob = new example.Blob(12);
    const buf = Buffer.alloc(8);
    assert.throws(() => {
      blob.write(buf);
    }, /Sizes must match/);
  });

  it('pass a ReadOnlyVector', () => {
    const obj1 = new example.IntObject(1);
    const obj2 = new example.IntObject(2);
    const obj3 = new example.IntObject(3);
    const r = example.readOnlyVector([obj1, obj2, obj3]);
    assert.strictEqual(r, 1);
  });

  it('retrieve a ReturnVector', () => {
    const r = example.returnVector();
    assert.isArray(r);
    assert.lengthOf(r, 3);
    assert.strictEqual(r[0].get(), 1);
  });

  it('pass an object as a map', () => {
    example.putMap({ expected: 'value' });
  });

  it('retrieve a map as an object', () => {
    const r = example.getMap();
    assert.isObject(r);
    assert.propertyVal(r, 'returned', 'value');
  });
});
