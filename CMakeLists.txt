cmake_minimum_required(VERSION 3.6)

project(openssl)

file(GLOB_RECURSE EXE_SOURCE_FILES "src/*.cpp" "src/*.c")

add_executable(${TARGET_NAME} ${EXE_SOURCE_FILES})

set_target_properties(${TARGET_NAME} PROPERTIES CXX_STANDARD 11)

target_compile_options(${TARGET_NAME} PRIVATE
  -sDISABLE_EXCEPTION_CATCHING=0
)

target_link_options(${TARGET_NAME} PRIVATE
  # -Wl,--shared-memory
  # -pthread
  --bind
  -sALLOW_MEMORY_GROWTH=1
  --extern-pre-js
  ${CMAKE_CURRENT_SOURCE_DIR}/pre.js
  --extern-post-js ${CMAKE_CURRENT_SOURCE_DIR}/post.js
)

target_include_directories(${TARGET_NAME} PRIVATE
  "${CMAKE_CURRENT_SOURCE_DIR}/include"
)

target_link_libraries(${TARGET_NAME} PRIVATE
  "${CMAKE_CURRENT_SOURCE_DIR}/lib/libcrypto.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/lib/libssl.a"
)

# set(CMAKE_EXECUTABLE_SUFFIX ".mjs")

if(${CMAKE_BUILD_TYPE} MATCHES "Debug")
  target_link_options(${TARGET_NAME} PRIVATE
    -sSAFE_HEAP=1
  )
  foreach(var
    CMAKE_C_FLAGS_DEBUG
    CMAKE_CXX_FLAGS_DEBUG
  )
    string(REPLACE "-g" "-g4 --source-map-base http://127.0.0.1:8096/" ${var} "${${var}}")
    message(STATUS "${var}:${${var}}")
  endforeach()
else()
  foreach(var
    CMAKE_C_FLAGS_RELEASE
    CMAKE_CXX_FLAGS_RELEASE
    CMAKE_EXE_LINKER_FLAGS_RELEASE
  )
    string(REPLACE "-O2" "-O3" ${var} "${${var}}")
    message(STATUS "${var}:${${var}}")
  endforeach()
endif()
