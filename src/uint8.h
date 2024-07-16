#include <notypes.h>

// Typemaps that treat uint8_t (unsigned char) in C/C++ as number in JavaScript

namespace Nobind {

namespace Typemap {

template <> class FromJS<unsigned char> {
  unsigned char val_;

public:
  inline explicit FromJS(const Napi::Value &val) {
    if (!val.IsNumber()) {
      throw Napi::TypeError::New(val.Env(), "Expected a number");
    }
    int64_t raw = val.ToNumber().Int64Value();
    if (raw < 0 || raw > 0xFF) {
      throw Napi::TypeError::New(val.Env(), "Expected an 8 bit unsigned number");
    }
    val_ = static_cast<unsigned char>(raw);
  }
  inline unsigned char Get() { return val_; }
  FromJS(const FromJS &) = delete;
  FromJS(FromJS &&) = default;
};

template <const ReturnAttribute &RETATTR> class ToJS<unsigned char, RETATTR> {
  Napi::Env env_;
  unsigned char val_;

public:
  inline explicit ToJS(Napi::Env env, unsigned char val) : env_(env), val_(val) {}
  inline Napi::Value Get() { return Napi::Number::New(env_, static_cast<double>(val_)); }
  ToJS(const ToJS &) = delete;
  ToJS(ToJS &&) = default;
};

}

}
