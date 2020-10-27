@echo off

set mode=

:next-arg
if "%1"=="" goto args-done
if /i "%1"=="Debug"         set mode=Debug&goto arg-ok
if /i "%1"=="Release"       set mode=Release&goto arg-ok

:arg-ok
shift
goto next-arg

:args-done
if "%mode%" == "" set mode=Release

echo %mode%

set cmakeoutdir=cmake_build

if not exist %cmakeoutdir% mkdir %cmakeoutdir%
cd %cmakeoutdir%
cmake -DCMAKE_TOOLCHAIN_FILE=%EMSDK%\upstream\emscripten\cmake\Modules\Platform\Emscripten.cmake -DCMAKE_BUILD_TYPE=%mode% -G "MinGW Makefiles" -DCMAKE_MAKE_PROGRAM=make ..
cmake --build .
cd ..

set exename=openssl

mkdir .\dist
copy /Y %cmakeoutdir%\%exename%.js .\dist\%exename%.js
copy /Y %cmakeoutdir%\%exename%.wasm .\dist\%exename%.wasm
copy /Y %cmakeoutdir%\%exename%.wasm.map .\%exename%.wasm.map
