/// <reference path="../dist/openssl.d.ts" />

(function () {
  const CryptoJS = globalThis.CryptoJS || require('crypto-js')
  const openssl = globalThis.openssl || require('../dist/openssl.js')
  const opensslbinding = globalThis.opensslbinding || require('../dist/opensslbinding.js')
  const getRandomValues = ((globalThis.crypto && globalThis.crypto.getRandomValues) || function (buf) {
    buf.set(require('crypto').randomBytes(buf.byteLength))
  }).bind(globalThis.crypto)
  Promise.all([
    openssl.default(),
    opensslbinding.default()
  ]).then(([{ Module: Module1 }, { Module: Module2 }]) => {
    // console.log(openssl)
    // console.log(Module1)

    /* const wordArrayToUint8Array = (wordArray) => {
      var words = wordArray.words
      var sigBytes = wordArray.sigBytes
      var u8 = new Uint8Array(sigBytes)
      for (var i = 0; i < sigBytes; i++) {
        var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
        u8[i] = byte
      }
      return u8
    } */

    const uint8ArrayToWordArray = (u8arr) => {
      var len = u8arr.length
      var words = []
      for (var i = 0; i < len; i++) {
        words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8)
      }
      return CryptoJS.lib.WordArray.create(words, len)
    }

    const MAX = 65536
    const T = 100
    const B = 16384
    const R = MAX * T / B
    const buf = new Uint8Array(MAX * T)
    for (let i = 0; i < T; i++) {
      getRandomValues(buf.subarray(i * MAX, (i + 1) * MAX))
    }
    // console.log(openssl.md5(buf))

    ;(function () {
      console.time('wasm raw pointer')
      const size = Module1._sizeof_md5_ctx()
      const ctx = Module1._malloc(size)
      Module1._MD5_Init(ctx)
      const chunk = Module1._malloc(B)
      const res = Module1._malloc(16)
      for (let i = 0; i < R; i++) {
        Module1.HEAPU8.set(buf.slice(i * B, (i + 1) * B), chunk)
        Module1._MD5_Update(ctx, chunk, B)
      }
      Module1._MD5_Final(res, ctx)
      let s = ''
      for (let i = 0; i < 16; i++) {
        s += Module1.HEAPU8[res + i].toString(16)
      }
      Module1._free(res)
      Module1._free(chunk)
      Module1._free(ctx)
      console.log(s)
      console.timeEnd('wasm raw pointer')
    })()

    console.time('wasm embind')
    const md5 = new Module1.MD5()
    // console.log(md5)
    for (let i = 0; i < R; i++) {
      md5.update(buf.slice(i * B, (i + 1) * B))
    }
    console.log(md5.digest())
    md5.delete()
    console.timeEnd('wasm embind')

    console.time('wasm napi')
    const md52 = new Module2.emnapiExports.MD5Binding()
    // console.log(md52)
    for (let i = 0; i < R; i++) {
      md52.update(buf.slice(i * B, (i + 1) * B))
    }
    console.log(md52.digest())
    console.timeEnd('wasm napi')

    console.time('crypto js')
    console.log(CryptoJS.MD5(uint8ArrayToWordArray(buf)).toString())
    console.timeEnd('crypto js')
  })
})()
