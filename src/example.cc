#include "array.h"
#include "blob.h"
#include "map.h"

// Typemaps that treat uint8_t in C/C++ as number in JavaScript
#include "uint8.h"

#include <nobind.h>

// Factory wrapper around the constructor that expects (uint8_t *data, size_t len)
Blob *Blob_Create(Nobind::Typemap::Buffer buf) {
  Blob *r = new Blob(buf.first, buf.second);
  return r;
}

// Wrapper around Blob::Export that returns a Nobind::Buffer
Nobind::Typemap::Buffer Blob_Export(Blob &b) {
  Nobind::Typemap::Buffer buf;
  b.Export(&buf.first, &buf.second);
  return buf;
}

// Wrapper around Blob::Write that accepts a Nobind::Buffer
void Blob_Write(Blob &b, Nobind::Typemap::Buffer buf) {
  b.Write(buf.first, buf.second);
}

NOBIND_MODULE(example, m) {

  //
  // array.h
  //
  m.def<IntObject>("IntObject")
    .cons<>()
    .cons<int>()
    .def<&IntObject::get>("get");

  m.def<ReturnVector>("returnVector");
  m.def<&ReadOnlyVector>("readOnlyVector");

  //
  // blob.h
  //
  m.def<Blob>("Blob")
    .cons<>()
    .cons<size_t>()
    .cons<const Blob &>()
    .def<&Blob::Fill>("fill")
    // Use the wrappers instead of the original methods
    .ext<&Blob_Export>("export")
    .ext<&Blob_Write>("write");

  // There are no async wrappers, so this must be hidden in JavaScript
  // (see example.cjs)
  m.def<&Blob_Write, Nobind::ReturnAsync>("Blob_writeAsync");

  // This is the factory that replaces the (uint8_t *data, size_t len)
  // constructor
  m.def<&Blob_Create>("Blob_create");

  //
  // map.h
  //
  m.def<&GetMap>("getMap");
  m.def<&PutMap>("putMap");
}
