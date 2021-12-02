const { defineFunctionConfig } = require('@tybys/cgen')

module.exports = defineFunctionConfig(function (_options, { isDebug }) {

  const compilerFlags = [
    // ...(isDebug ? ['-sDISABLE_EXCEPTION_CATCHING=0'] : [])
  ]

  const linkerFlags = [
    '--bind',
    '-sALLOW_MEMORY_GROWTH=1',
    ...(isDebug ? ['-sSAFE_HEAP=1'/* , '-sDISABLE_EXCEPTION_CATCHING=0' */] : [])
  ]

  return {
    project: 'openssl',
    targets: [
      {
        name: 'openssl',
        type: 'exe',
        sources: [
          './src/md5.cpp',
          './src/main.cpp'
        ],
        emwrap: {},
        compileOptions: [
          ...compilerFlags
        ],
        linkOptions: [
          ...linkerFlags,
          "-sEXPORTED_FUNCTIONS=['_malloc','_free','_MD5_Init','_MD5_Update','_MD5_Final']"
        ],
        includePaths: [
          './include'
        ],
        libs: [
          "./lib/libcrypto.a",
          "./lib/libssl.a"
        ]
      },
      {
        name: 'opensslbinding',
        type: 'exe',
        sources: [
          './src/md5.cpp',
          './src/binding.cpp',
          './node_modules/@tybys/emnapi/src/emnapi.c'
        ],
        emwrap: {},
        defines: ['NAPI_DISABLE_CPP_EXCEPTIONS', 'NODE_ADDON_API_ENABLE_MAYBE'],
        compileOptions: [
          ...compilerFlags
        ],
        linkOptions: [
          ...linkerFlags,
          '--js-library=../node_modules/@tybys/emnapi/dist/library_napi.js'
        ],
        includePaths: [
          './include',
          './node_modules/@tybys/emnapi/include'
        ],
        libs: [
          "./lib/libcrypto.a",
          "./lib/libssl.a"
        ]
      }
    ]
  }
})
