const { defineFunctionConfig } = require('@tybys/cgen')

module.exports = defineFunctionConfig(function (_options, { isDebug }) {

  const debugFlags = [
    '-sDISABLE_EXCEPTION_CATCHING=0',
    '-sSAFE_HEAP=1'
  ]

  const commonFlags = [
    '--bind',
    '-sALLOW_MEMORY_GROWTH=1',
    ...(isDebug ? debugFlags : [])
  ]

  return {
    project: 'openssl',
    targets: [
      {
        name: 'openssl',
        type: 'exe',
        sources: [
          './src/*.cpp'
        ],
        wrapScript: './scripts/export.js',
        compileOptions: [
          ...commonFlags
        ],
        linkOptions: [
          ...commonFlags
        ],
        includePaths: [
          './include'
        ],
        libs: [
          "./lib/libcrypto.a",
          "./lib/libssl.a"
        ]
      }
    ]
  }
})
