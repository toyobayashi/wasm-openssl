#include <cstdio>
#include <cstdlib>
#include <cstring>
#include "md5.hpp"

namespace wasmopenssl {

MD5::MD5() {
  ctx_ = (MD5_CTX*)malloc(sizeof(MD5_CTX));
  MD5_Init(ctx_);
}

MD5::MD5(const MD5& other) {
  if (this == &other) return;
  ctx_ = (MD5_CTX*)malloc(sizeof(MD5_CTX));
  memcpy(ctx_, other.ctx_, sizeof(MD5_CTX));
}

MD5::MD5(MD5&& other) {
  ctx_ = other.ctx_;
  other.ctx_ = nullptr;
}
MD5::~MD5() {
  if (ctx_ != nullptr) {
    free(ctx_);
    ctx_ = nullptr;
  }
}

bool MD5::update(uint8_t* data, size_t len) {
  return MD5_Update(ctx_, data, len) != 0;
}

bool MD5::update(const std::string& data) {
  return MD5_Update(ctx_, &(data[0]), data.length()) != 0;
}

bool MD5::update(const std::vector<uint8_t>& data) {
  return MD5_Update(ctx_, data.data(), data.size()) != 0;
}

std::vector<uint8_t> MD5::final() const {
  uint8_t hex[MD5_DIGEST_LENGTH];
  memset(hex, 0, MD5_DIGEST_LENGTH);
  bool r = MD5_Final(hex, ctx_) != 0;
  return std::vector<uint8_t>(hex, hex + MD5_DIGEST_LENGTH);
}

std::string MD5::digest() const {
  char r[MD5_DIGEST_LENGTH * 2 + 1];
  memset(r, 0, MD5_DIGEST_LENGTH * 2 + 1);
  std::vector<uint8_t> res = final();
  for (int i = 0; i < MD5_DIGEST_LENGTH; i++) {
    sprintf(r + i * 2, "%02x", res[i]);
  }
  return r;
}

}
