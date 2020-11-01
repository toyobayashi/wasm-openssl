(function (Module, onExports) {
  var p;
  var exports = {};
  Object.defineProperty(exports, 'default', { enumerable: true, value: function () { return p } });

  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    try { Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }) } catch (_) {}
  }

  function reset () {
    delete Module.onAbort;
    delete Module.onRuntimeInitialized;
  }

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
    onExports(exports, Module);
    if ('__esModule' in exports) {
      if (!exports.__esModule) {
        throw new Error('exports.__esModule is falsy')
      }
    } else {
      try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (_) { m.__esModule = true; }
    }
    return Module;
  });

  return exports;
})(Module, function (exports, Module) {
"__export_scripts__";
});
