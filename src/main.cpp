#include <string>
#include <cstdio>
#include "openssl/md5.h"
#include <emscripten/bind.h>
#include <emscripten/val.h>

std::string js_md5(const std::string& input) {
  MD5_CTX ctx;
  int r = MD5_Init(&ctx); if (!r) return "";
  r = MD5_Update(&ctx, &(input[0]), input.length()); if (!r) return "";
  unsigned char hex[MD5_DIGEST_LENGTH] = { 0 };
  MD5_Final(hex, &ctx);
  std::string a = "";
  char t[3] = { 0 };
  for (int i = 0; i < MD5_DIGEST_LENGTH; i++) {
    sprintf(t, "%02x", hex[i]);
    a += t;
  }

  return a;
}

EMSCRIPTEN_BINDINGS(openssl) {
  emscripten::function("md5", js_md5);
}
