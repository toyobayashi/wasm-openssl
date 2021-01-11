cmake_minimum_required(VERSION 3.6)

project(openssl)

include(${EMBUILD_CMAKE_INCLUDE})

file(GLOB_RECURSE EXE_SOURCE_FILES "src/*.cpp" "src/*.c")

add_executable(${TARGET_NAME} ${EXE_SOURCE_FILES})

set_target_properties(${TARGET_NAME} PROPERTIES CXX_STANDARD 11)

set(EMCCCOMMONFALGS
  # -Wl,--shared-memory
  # -pthread
  --bind
  -sALLOW_MEMORY_GROWTH=1
  --js-transform "node \"${CMAKE_CURRENT_SOURCE_DIR}/scripts/transform.js\""
  --extern-pre-js ${CMAKE_CURRENT_SOURCE_DIR}/temp/pre.js
  --extern-post-js ${CMAKE_CURRENT_SOURCE_DIR}/temp/post.js
)

embuild(${TARGET_NAME}
  COMMONFLAGS ${EMCCCOMMONFALGS}
  DEBFLAGS -sDISABLE_EXCEPTION_CATCHING=0 -sSAFE_HEAP=1
)

target_include_directories(${TARGET_NAME} PRIVATE
  "${CMAKE_CURRENT_SOURCE_DIR}/include"
)

target_link_libraries(${TARGET_NAME} PRIVATE
  "${CMAKE_CURRENT_SOURCE_DIR}/lib/libcrypto.a"
  "${CMAKE_CURRENT_SOURCE_DIR}/lib/libssl.a"
)

# set(CMAKE_EXECUTABLE_SUFFIX ".mjs")
