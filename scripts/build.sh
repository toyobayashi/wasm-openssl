#!/bin/sh

wget https://www.openssl.org/source/openssl-1.1.1h.tar.gz
tar xf openssl-1.1.1h.tar.gz
cd openssl-1.1.1h

emconfigure ./Configure linux-generic64 no-shared no-threads --prefix=$EMSCRIPTEN/system

sed -i 's|^CROSS_COMPILE.*$|CROSS_COMPILE=|g' Makefile
sed -i '/^CFLAGS/ s/$/ -D__STDC_NO_ATOMICS__=1/' Makefile
sed -i '/^CXXFLAGS/ s/$/ -D__STDC_NO_ATOMICS__=1/' Makefile

emmake make -j 1 build_generated libssl.a libcrypto.a
rm -rf $EMSCRIPTEN/system/include/openssl
cp -R include/openssl $EMSCRIPTEN/system/include
cp libcrypto.a libssl.a $EMSCRIPTEN/system/lib
cd ..
rm -rf openssl-1.1.1h*
