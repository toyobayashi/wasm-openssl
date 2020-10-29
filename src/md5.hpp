#ifndef __WASMOPENSSL_MD5_H__
#define __WASMOPENSSL_MD5_H__

#include <cstddef>
#include <string>
#include <vector>
#include <cstdint>
#include "openssl/md5.h"

namespace wasmopenssl {

class MD5 {
 private:
  MD5_CTX* ctx_;
 public:
  MD5();
  MD5(const MD5&);
  MD5(MD5&&);
  virtual ~MD5();
  bool update(uint8_t* data, size_t len);
  bool update(const std::string& data);
  bool update(const std::vector<uint8_t>& data);
  std::vector<uint8_t> final() const;
  std::string digest() const;
};

}

#endif
