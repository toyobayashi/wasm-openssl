// function c(Module) {
return Module;
}

return (function (onExports) {
  var Module = null;
  var exports = {};
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    value: function (mod) {
      return new Promise(function (resolve, reject) {
        if (Module) {
          resolve(Module)
          return
        }
        mod = mod || {};

        var hasOnAbort = 'onAbort' in mod;
        var userOnAbort = mod.onAbort;
        var hasOnRuntimeInitialized = 'onRuntimeInitialized' in mod;
        var userOnRuntimeInitialized = mod.onRuntimeInitialized;
        var reset = function () {
          if (hasOnAbort) {
            mod.onAbort = userOnAbort;
          } else {
            delete mod.onAbort
          }

          if (hasOnRuntimeInitialized) {
            mod.onRuntimeInitialized = userOnRuntimeInitialized;
          } else {
            delete mod.onRuntimeInitialized;
          }
        }

        mod.onAbort = function (m) {
          reject(new Error(m));
          reset();
          if (typeof mod.onAbort === 'function') {
            mod.onAbort(m);
          }
        };

        mod.onRuntimeInitialized = function () {
          reset();
          if (typeof mod.onRuntimeInitialized === 'function') {
            try {
              mod.onRuntimeInitialized();
            } catch (err) {
              reject(err);
              return;
            }
          }
          resolve();
        }

        c(mod);
      }).then(function () {
        onExports(exports, mod);
        if ('__esModule' in exports) {
          if (!exports.__esModule) {
            throw new Error('exports.__esModule is falsy')
          }
        } else {
          try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (_) { m.__esModule = true; }
        }
        Module = mod;
        return mod;
      }).catch(function (err) {
        Module = null;
        return Promise.reject(err);
      });
    }
  });

  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    try { Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }) } catch (_) {}
  }

  return exports;
})(function (exports, Module) {
"__export_scripts__";
});

});
