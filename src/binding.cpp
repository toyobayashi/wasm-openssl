#include <napi.h>
#include <emnapi.h>
#include "md5.hpp"

namespace wasmopenssl {

class MD5Binding : public Napi::ObjectWrap<MD5Binding> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  explicit MD5Binding(const Napi::CallbackInfo& info);

 private:
  MD5 _value;
  Napi::Value Update(const Napi::CallbackInfo& info);
  Napi::Value Final(const Napi::CallbackInfo& info);
  Napi::Value Digest(const Napi::CallbackInfo& info);
};

MD5Binding::MD5Binding(const Napi::CallbackInfo& info):
  Napi::ObjectWrap<MD5Binding>(info),
  _value() {}

Napi::Value MD5Binding::Update(const Napi::CallbackInfo& info) {
  Napi::Uint8Array arg0 = info[0].As<Napi::Uint8Array>();
  _value.update(arg0.Data(), arg0.ByteLength());
  return info.Env().Undefined();
}

Napi::Value MD5Binding::Final(const Napi::CallbackInfo& info) {
  auto buf = _value.final();
  napi_value u8arr;
  napi_status r = emnapi_create_external_uint8array(info.Env(),
    buf.data(), buf.size(), nullptr, nullptr, &u8arr);
  if (r != napi_ok) {
    Napi::Error::New(info.Env(), std::to_string(r))
      .ThrowAsJavaScriptException();
    return Napi::Value();
  }
  return Napi::Value(info.Env(), u8arr);
}

Napi::Value MD5Binding::Digest(const Napi::CallbackInfo& info) {
  return Napi::String::New(info.Env(), _value.digest());
}

Napi::Object MD5Binding::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function clazz = DefineClass(env, "MD5Binding", {
    InstanceMethod<&MD5Binding::Update>("update",
      static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
    InstanceMethod<&MD5Binding::Final>("final",
      static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
    InstanceMethod<&MD5Binding::Digest>("digest",
      static_cast<napi_property_attributes>(napi_writable | napi_configurable))
  });

  Napi::FunctionReference* constructor = new Napi::FunctionReference();

  *constructor = Napi::Persistent(clazz);
  exports.Set("MD5Binding", clazz);

  env.SetInstanceData<Napi::FunctionReference>(constructor);
  return exports;
}

}  // namespace wasmopenssl

namespace {
  Napi::Object Init(Napi::Env env, Napi::Object exports) {
    return wasmopenssl::MD5Binding::Init(env, exports);
  }
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
