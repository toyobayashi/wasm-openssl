#include <cstring>
#include <emscripten.h>
#include "md5.hpp"

#include <emscripten/bind.h>

namespace wasmopenssl {

extern "C" EMSCRIPTEN_KEEPALIVE size_t sizeof_md5_ctx() {
  return sizeof(MD5_CTX);
}

class JSMD5 {
 private:
  MD5 md5_;
 public:
  void update(const std::string& data);
  emscripten::val final() const;
  std::string digest() const;
};

void JSMD5::update(const std::string& data) {
  if (!md5_.update(data)) {
    emscripten::val::global("Error").new_(std::string("MD5#update failed")).throw_();
  }
}

emscripten::val JSMD5::final() const {
  std::vector<uint8_t> res = md5_.final();
  return emscripten::val(emscripten::typed_memory_view(res.size(), res.data()));
}
std::string JSMD5::digest() const {
  return md5_.digest();
}

static std::string md5(const std::string& data) {
  uint8_t md[MD5_DIGEST_LENGTH];
  ::MD5((const unsigned char*)&(data[0]), data.length(), md);
  char r[MD5_DIGEST_LENGTH * 2 + 1];
  memset(r, 0, MD5_DIGEST_LENGTH * 2 + 1);
  for (int i = 0; i < MD5_DIGEST_LENGTH; i++) {
    sprintf(r + i * 2, "%02x", md[i]);
  }

  return r;
}

EMSCRIPTEN_BINDINGS(openssl) {
  emscripten::class_<JSMD5>("MD5")
    .constructor<>()
    .function("update", &JSMD5::update, emscripten::allow_raw_pointers())
    .function("final", &JSMD5::final)
    .function("digest", &JSMD5::digest);
  emscripten::function("md5", md5);
}

}
