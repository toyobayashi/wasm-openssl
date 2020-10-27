#!/bin/bash

type="Release"

until [ $# -eq 0 ]
do
if [ "$1" == "Release" ]; then type="$1"; fi
if [ "$1" == "Debug" ]; then type="$1"; fi
shift
done

cmakeoutdir="./cmake_build"
mkdir -p $cmakeoutdir
cd $cmakeoutdir
cmake -DCMAKE_TOOLCHAIN_FILE="$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake" -DCMAKE_BUILD_TYPE="$type" -G "Unix Makefiles" ..
cmake --build .
cd ..

exename="openssl"

mkdir -p ./dist
cp -rpf "$cmakeoutdir/$exename.js" "./dist/$exename.js"
cp -rpf "$cmakeoutdir/$exename.wasm" "./dist/$exename.wasm"
cp -rpf "$cmakeoutdir/$exename.wasm.map" "./$exename.wasm"
