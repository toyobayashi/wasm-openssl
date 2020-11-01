/// <reference path="../dist/openssl.d.ts" />

(function () {
  const CryptoJS = globalThis.CryptoJS || require('crypto-js')
  const openssl = globalThis.openssl || require('..')
  const getRandomValues = ((globalThis.crypto && globalThis.crypto.getRandomValues) || function (buf) {
    buf.set(require('crypto').randomBytes(buf.byteLength))
  }).bind(globalThis.crypto)
  const init = openssl.default
  init().then(mod => {
    console.log(openssl)
    console.log(mod)

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
    console.time('wasm')
    const md5 = new mod.MD5()
    console.log(md5)
    for (let i = 0; i < R; i++) {
      md5.update(buf.slice(i * B, (i + 1) * B))
    }
    console.log(md5.digest())
    console.timeEnd('wasm')
    md5.delete()

    console.time('js')
    console.log(CryptoJS.MD5(uint8ArrayToWordArray(buf)).toString())
    console.timeEnd('js')
  })
})()