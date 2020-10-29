/* eslint-disable */

(function (root, factory) {
  var name = 'openssl';
  var _process = root && root.process;
  if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory(require('@tybys/native-require').tryGetRequireFunction(), _process);
  } else if(typeof define === 'function' && define.amd) {
    define(['@tybys/native-require'], function (nr) {
      return factory(nr.tryGetRequireFunction(), _process);
    });
  } else if(typeof exports === 'object') {
    exports[name] = factory(require('@tybys/native-require').tryGetRequireFunction(), _process);
  } else {
    root[name] = factory(root.require, _process);
  }
})((function (defaultValue) {
  var g;
  g = (function () { return this; })();

  try {
    g = g || new Function('return this')();
  } catch (_) {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof __webpack_public_path__ === 'undefined') {
      if (typeof global !== 'undefined') return global;
    }
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
  }

  return g || defaultValue;
})(this))