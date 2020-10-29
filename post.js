return (function(m,f){
  var e={},i=function(){delete m.onAbort;delete m.onRuntimeInitialized},p=new Promise(function(r,j){
    m.onAbort=function(m){i();j(new Error(m))};m.onRuntimeInitialized=function(){i();r()};
  }).then(function(){return f(m,e)}).then(function(){return m});
  return Object.defineProperty(e,'default',{enumerable:!0,value:function(){return p}}),e;
})(Module, function (Module, exports) {
  exports.MD5 = Module.MD5;
  exports.md5 = Module.md5;
});});
