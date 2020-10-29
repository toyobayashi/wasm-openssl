(function (Module, onExports) {
  var exports = {},
    reset = function () {
      delete Module.onAbort;
      delete Module.onRuntimeInitialized;
    },
    p = new Promise(function (resolve, reject) {
      Module.onAbort = function (m) {
        reset();
        reject(new Error(m));
      };
      Module.onRuntimeInitialized = function () {
        reset();
        resolve();
      };
    }).then(function () {
      return onExports(Module, exports), Module;
    });
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    try { Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }) } catch (_) {}
  }
  try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (_) { m.__esModule = true; }
  return Object.defineProperty(exports, 'default', { enumerable: !0, value: function () { return p } }), exports;
})(Module, function (Module, exports) {
  exports.MD5 = Module.MD5;
  exports.md5 = Module.md5;
});
