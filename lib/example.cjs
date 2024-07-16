module.exports = require('./binding/example.node');

module.exports.Blob.prototype.writeAsync = function(buf) {
  return module.exports.Blob_writeAsync(this, buf);
}

module.exports.Blob.create = (buf) => module.exports.Blob_create(buf);
