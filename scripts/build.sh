#!/bin/bash

opensslver="1.1.1l"

wget "https://www.openssl.org/source/openssl-$opensslver.tar.gz"
tar xf "openssl-$opensslver.tar.gz"
cd "openssl-$opensslver"

emconfigure ./Configure gcc -static no-asm no-shared no-threads no-tests no-sock --prefix=$EMSDK/upstream/emscripten/system

sed -i 's|^CROSS_COMPILE.*$|CROSS_COMPILE=|g' Makefile
# sed -i '/^CFLAGS/ s/$/ -D__STDC_NO_ATOMICS__=1/' Makefile
# sed -i '/^CXXFLAGS/ s/$/ -D__STDC_NO_ATOMICS__=1/' Makefile

emmake make -j 1 build_generated libssl.a libcrypto.a
rm -rf $EMSDK/upstream/emscripten/system/include/openssl
cp -R include/openssl $EMSDK/upstream/emscripten/system/include
cp libcrypto.a libssl.a $EMSDK/upstream/emscripten/system/lib
cd ..
rm -rf "openssl-$opensslver*"
