!function(e,t){var r="openssl",n=e&&e.process;"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@tybys/native-require").tryGetRequireFunction(),n):"function"==typeof define&&define.amd?define(["@tybys/native-require"],(function(e){return t(e.tryGetRequireFunction(),n)})):"object"==typeof exports?exports[r]=t(require("@tybys/native-require").tryGetRequireFunction(),n):e[r]=t(e.require,n)}(function(e){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){if("undefined"!=typeof globalThis)return globalThis;if("undefined"==typeof __webpack_public_path__&&"undefined"!=typeof global)return global;if("undefined"!=typeof window)return window;if("undefined"!=typeof self)return self}return t||e}(this),(function(e,t){var r="";try{r=document.currentScript.src}catch(e){}return function(n){var o=null,i={};if(Object.defineProperty(i,"default",{enumerable:!0,value:function(n){return new Promise((function(i,a){if(o)i(o);else{var u="onAbort"in(n=n||{}),s=n.onAbort,c="onRuntimeInitialized"in n,f=n.onRuntimeInitialized,l=function(){u?n.onAbort=s:delete n.onAbort,c?n.onRuntimeInitialized=f:delete n.onRuntimeInitialized};n.onAbort=function(e){a(new Error(e)),l(),"function"==typeof n.onAbort&&n.onAbort(e)},n.onRuntimeInitialized=function(){if(l(),"function"==typeof n.onRuntimeInitialized)try{n.onRuntimeInitialized()}catch(e){return void a(e)}i()},function(n){n=void 0!==n?n:{};var o,i={};for(o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);var a=[],u=!1,s=!1,c=!1,f=!1;u="object"==typeof window,s="function"==typeof importScripts,c="object"==typeof t&&"object"==typeof t.versions&&"string"==typeof t.versions.node,f=!u&&!c&&!s;var l,p,d,h,y="";function v(e){return n.locateFile?n.locateFile(e,y):y+e}c?(y=s?e("path").dirname(y)+"/":__dirname+"/",l=function(t,r){return d||(d=e("fs")),h||(h=e("path")),t=h.normalize(t),d.readFileSync(t,r?null:"utf8")},p=function(e){var t=l(e,!0);return t.buffer||(t=new Uint8Array(t)),T(t.buffer),t},t.argv.length>1&&t.argv[1].replace(/\\/g,"/"),a=t.argv.slice(2),"undefined"!=typeof module&&(module.exports=n),t.on("uncaughtException",(function(e){if(!(e instanceof Fr))throw e})),t.on("unhandledRejection",fe),n.inspect=function(){return"[Emscripten Module object]"}):f?("undefined"!=typeof read&&(l=function(e){return read(e)}),p=function(e){var t;return"function"==typeof readbuffer?new Uint8Array(readbuffer(e)):(T("object"==typeof(t=read(e,"binary"))),t)},"undefined"!=typeof scriptArgs?a=scriptArgs:void 0!==arguments&&(a=arguments),"undefined"!=typeof print&&("undefined"==typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!=typeof printErr?printErr:print)):(u||s)&&(y=0!==(y=s?self.location.href:r).indexOf("blob:")?y.substr(0,y.lastIndexOf("/")+1):"",l=function(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},s&&(p=function(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)})),n.print||console.log.bind(console);var m,g,b=n.printErr||console.warn.bind(console);for(o in i)i.hasOwnProperty(o)&&(n[o]=i[o]);i=null,n.arguments&&(a=n.arguments),n.thisProgram&&n.thisProgram,n.quit&&n.quit,n.wasmBinary&&(m=n.wasmBinary),n.noExitRuntime&&n.noExitRuntime,"object"!=typeof WebAssembly&&fe("no native wasm support detected");var w=!1;function T(e,t){e||fe("Assertion failed: "+t)}var $="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function C(e,t,r){for(var n=t+r,o=t;e[o]&&!(o>=n);)++o;if(o-t>16&&e.subarray&&$)return $.decode(e.subarray(t,o));for(var i="";t<o;){var a=e[t++];if(128&a){var u=63&e[t++];if(192!=(224&a)){var s=63&e[t++];if((a=224==(240&a)?(15&a)<<12|u<<6|s:(7&a)<<18|u<<12|s<<6|63&e[t++])<65536)i+=String.fromCharCode(a);else{var c=a-65536;i+=String.fromCharCode(55296|c>>10,56320|1023&c)}}else i+=String.fromCharCode((31&a)<<6|u)}else i+=String.fromCharCode(a)}return i}function P(e,t){return e?C(D,e,t):""}function _(e,t,r,n){if(!(n>0))return 0;for(var o=r,i=r+n-1,a=0;a<e.length;++a){var u=e.charCodeAt(a);if(u>=55296&&u<=57343&&(u=65536+((1023&u)<<10)|1023&e.charCodeAt(++a)),u<=127){if(r>=i)break;t[r++]=u}else if(u<=2047){if(r+1>=i)break;t[r++]=192|u>>6,t[r++]=128|63&u}else if(u<=65535){if(r+2>=i)break;t[r++]=224|u>>12,t[r++]=128|u>>6&63,t[r++]=128|63&u}else{if(r+3>=i)break;t[r++]=240|u>>18,t[r++]=128|u>>12&63,t[r++]=128|u>>6&63,t[r++]=128|63&u}}return t[r]=0,r-o}function A(e,t,r){return _(e,D,t,r)}function E(e){for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);n>=55296&&n<=57343&&(n=65536+((1023&n)<<10)|1023&e.charCodeAt(++r)),n<=127?++t:t+=n<=2047?2:n<=65535?3:4}return t}var S="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function F(e,t){for(var r=e,n=r>>1,o=n+t/2;!(n>=o)&&U[n];)++n;if((r=n<<1)-e>32&&S)return S.decode(D.subarray(e,r));for(var i=0,a="";;){var u=M[e+2*i>>1];if(0==u||i==t/2)return a;++i,a+=String.fromCharCode(u)}}function R(e,t,r){if(void 0===r&&(r=2147483647),r<2)return 0;for(var n=t,o=(r-=2)<2*e.length?r/2:e.length,i=0;i<o;++i){var a=e.charCodeAt(i);M[t>>1]=a,t+=2}return M[t>>1]=0,t-n}function O(e){return 2*e.length}function W(e,t){for(var r=0,n="";!(r>=t/4);){var o=q[e+4*r>>2];if(0==o)break;if(++r,o>=65536){var i=o-65536;n+=String.fromCharCode(55296|i>>10,56320|1023&i)}else n+=String.fromCharCode(o)}return n}function k(e,t,r){if(void 0===r&&(r=2147483647),r<4)return 0;for(var n=t,o=n+r-4,i=0;i<e.length;++i){var a=e.charCodeAt(i);if(a>=55296&&a<=57343&&(a=65536+((1023&a)<<10)|1023&e.charCodeAt(++i)),q[t>>2]=a,(t+=4)+4>o)break}return q[t>>2]=0,t-n}function j(e){for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);n>=55296&&n<=57343&&++r,t+=4}return t}var I,x,D,M,U,q,z,V,B,H=65536;function G(e,t){return e%t>0&&(e+=t-e%t),e}function L(e){I=e,n.HEAP8=x=new Int8Array(e),n.HEAP16=M=new Int16Array(e),n.HEAP32=q=new Int32Array(e),n.HEAPU8=D=new Uint8Array(e),n.HEAPU16=U=new Uint16Array(e),n.HEAPU32=z=new Uint32Array(e),n.HEAPF32=V=new Float32Array(e),n.HEAPF64=B=new Float64Array(e)}var N,X=n.INITIAL_MEMORY||16777216;(g=n.wasmMemory?n.wasmMemory:new WebAssembly.Memory({initial:X/H,maximum:2147483648/H}))&&(I=g.buffer),X=I.byteLength,L(I);var J=[],Y=[],Z=[],K=[];function Q(){if(n.preRun)for("function"==typeof n.preRun&&(n.preRun=[n.preRun]);n.preRun.length;)ne(n.preRun.shift());we(J)}function ee(){we(Y)}function te(){we(Z)}function re(){if(n.postRun)for("function"==typeof n.postRun&&(n.postRun=[n.postRun]);n.postRun.length;)oe(n.postRun.shift());we(K)}function ne(e){J.unshift(e)}function oe(e){K.unshift(e)}var ie=0,ae=null,ue=null;function se(e){ie++,n.monitorRunDependencies&&n.monitorRunDependencies(ie)}function ce(e){if(ie--,n.monitorRunDependencies&&n.monitorRunDependencies(ie),0==ie&&(null!==ae&&(clearInterval(ae),ae=null),ue)){var t=ue;ue=null,t()}}function fe(e){throw n.onAbort&&n.onAbort(e),b(e+=""),w=!0,e="abort("+e+"). Build with -s ASSERTIONS=1 for more info.",new WebAssembly.RuntimeError(e)}function le(e,t){return String.prototype.startsWith?e.startsWith(t):0===e.indexOf(t)}n.preloadedImages={},n.preloadedAudios={};var pe="data:application/octet-stream;base64,";function de(e){return le(e,pe)}var he="file://";function ye(e){return le(e,he)}var ve="openssl.wasm";function me(){try{if(m)return new Uint8Array(m);if(p)return p(ve);throw"both async and sync fetching of the wasm failed"}catch(e){fe(e)}}function ge(){return m||!u&&!s||"function"!=typeof fetch||ye(ve)?Promise.resolve().then(me):fetch(ve,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at '"+ve+"'";return e.arrayBuffer()})).catch((function(){return me()}))}function be(){var e={a:Pr};function t(e,t){var r=e.exports;n.asm=r,N=n.asm.w,ce()}function r(e){t(e.instance)}function o(t){return ge().then((function(t){return WebAssembly.instantiate(t,e)})).then(t,(function(e){b("failed to asynchronously prepare wasm: "+e),fe(e)}))}if(se(),n.instantiateWasm)try{return n.instantiateWasm(e,t)}catch(e){return b("Module.instantiateWasm callback failed with error: "+e),!1}return m||"function"!=typeof WebAssembly.instantiateStreaming||de(ve)||ye(ve)||"function"!=typeof fetch?o(r):fetch(ve,{credentials:"same-origin"}).then((function(t){return WebAssembly.instantiateStreaming(t,e).then(r,(function(e){return b("wasm streaming compile failed: "+e),b("falling back to ArrayBuffer instantiation"),o(r)}))})),{}}function we(e){for(;e.length>0;){var t=e.shift();if("function"!=typeof t){var r=t.func;"number"==typeof r?void 0===t.arg?N.get(r)():N.get(r)(t.arg):r(void 0===t.arg?null:t.arg)}else t(n)}}function Te(e,t,r){return r&&r.length?n["dynCall_"+e].apply(null,[t].concat(r)):n["dynCall_"+e].call(null,t)}function $e(e,t,r){return-1!=e.indexOf("j")?Te(e,t,r):N.get(t).apply(null,r)}function Ce(e){switch(e){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+e)}}function Pe(){for(var e=new Array(256),t=0;t<256;++t)e[t]=String.fromCharCode(t);_e=e}de(ve)||(ve=v(ve));var _e=void 0;function Ae(e){for(var t="",r=e;D[r];)t+=_e[D[r++]];return t}var Ee={},Se={},Fe={},Re=48,Oe=57;function We(e){if(void 0===e)return"_unknown";var t=(e=e.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return t>=Re&&t<=Oe?"_"+e:e}function ke(e,t){return e=We(e),new Function("body","return function "+e+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(t)}function je(e,t){var r=ke(t,(function(e){this.name=t,this.message=e;var r=new Error(e).stack;void 0!==r&&(this.stack=this.toString()+"\n"+r.replace(/^Error(:[^\n]*)?\n/,""))}));return r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},r}var Ie=void 0;function xe(e){throw new Ie(e)}var De=void 0;function Me(e){throw new De(e)}function Ue(e,t,r){function n(t){var n=r(t);n.length!==e.length&&Me("Mismatched type converter count");for(var o=0;o<e.length;++o)qe(e[o],n[o])}e.forEach((function(e){Fe[e]=t}));var o=new Array(t.length),i=[],a=0;t.forEach((function(e,t){Se.hasOwnProperty(e)?o[t]=Se[e]:(i.push(e),Ee.hasOwnProperty(e)||(Ee[e]=[]),Ee[e].push((function(){o[t]=Se[e],++a===i.length&&n(o)})))})),0===i.length&&n(o)}function qe(e,t,r){if(r=r||{},!("argPackAdvance"in t))throw new TypeError("registerType registeredInstance requires argPackAdvance");var n=t.name;if(e||xe('type "'+n+'" must have a positive integer typeid pointer'),Se.hasOwnProperty(e)){if(r.ignoreDuplicateRegistrations)return;xe("Cannot register type '"+n+"' twice")}if(Se[e]=t,delete Fe[e],Ee.hasOwnProperty(e)){var o=Ee[e];delete Ee[e],o.forEach((function(e){e()}))}}function ze(e,t,r,n,o){var i=Ce(r);qe(e,{name:t=Ae(t),fromWireType:function(e){return!!e},toWireType:function(e,t){return t?n:o},argPackAdvance:8,readValueFromPointer:function(e){var n;if(1===r)n=x;else if(2===r)n=M;else{if(4!==r)throw new TypeError("Unknown boolean type size: "+t);n=q}return this.fromWireType(n[e>>i])},destructorFunction:null})}function Ve(e){if(!(this instanceof ot))return!1;if(!(e instanceof ot))return!1;for(var t=this.$$.ptrType.registeredClass,r=this.$$.ptr,n=e.$$.ptrType.registeredClass,o=e.$$.ptr;t.baseClass;)r=t.upcast(r),t=t.baseClass;for(;n.baseClass;)o=n.upcast(o),n=n.baseClass;return t===n&&r===o}function Be(e){return{count:e.count,deleteScheduled:e.deleteScheduled,preservePointerOnDelete:e.preservePointerOnDelete,ptr:e.ptr,ptrType:e.ptrType,smartPtr:e.smartPtr,smartPtrType:e.smartPtrType}}function He(e){xe(e.$$.ptrType.registeredClass.name+" instance already deleted")}var Ge=!1;function Le(e){}function Ne(e){e.smartPtr?e.smartPtrType.rawDestructor(e.smartPtr):e.ptrType.registeredClass.rawDestructor(e.ptr)}function Xe(e){e.count.value-=1,0===e.count.value&&Ne(e)}function Je(e){return"undefined"==typeof FinalizationGroup?(Je=function(e){return e},e):(Ge=new FinalizationGroup((function(e){for(var t=e.next();!t.done;t=e.next()){var r=t.value;r.ptr?Xe(r):console.warn("object already deleted: "+r.ptr)}})),Le=function(e){Ge.unregister(e.$$)},(Je=function(e){return Ge.register(e,e.$$,e.$$),e})(e))}function Ye(){if(this.$$.ptr||He(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e=Je(Object.create(Object.getPrototypeOf(this),{$$:{value:Be(this.$$)}}));return e.$$.count.value+=1,e.$$.deleteScheduled=!1,e}function Ze(){this.$$.ptr||He(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&xe("Object already scheduled for deletion"),Le(this),Xe(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)}function Ke(){return!this.$$.ptr}var Qe=void 0,et=[];function tt(){for(;et.length;){var e=et.pop();e.$$.deleteScheduled=!1,e.delete()}}function rt(){return this.$$.ptr||He(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&xe("Object already scheduled for deletion"),et.push(this),1===et.length&&Qe&&Qe(tt),this.$$.deleteScheduled=!0,this}function nt(){ot.prototype.isAliasOf=Ve,ot.prototype.clone=Ye,ot.prototype.delete=Ze,ot.prototype.isDeleted=Ke,ot.prototype.deleteLater=rt}function ot(){}var it={};function at(e,t,r){if(void 0===e[t].overloadTable){var n=e[t];e[t]=function(){return e[t].overloadTable.hasOwnProperty(arguments.length)||xe("Function '"+r+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+e[t].overloadTable+")!"),e[t].overloadTable[arguments.length].apply(this,arguments)},e[t].overloadTable=[],e[t].overloadTable[n.argCount]=n}}function ut(e,t,r){n.hasOwnProperty(e)?((void 0===r||void 0!==n[e].overloadTable&&void 0!==n[e].overloadTable[r])&&xe("Cannot register public name '"+e+"' twice"),at(n,e,e),n.hasOwnProperty(r)&&xe("Cannot register multiple overloads of a function with the same number of arguments ("+r+")!"),n[e].overloadTable[r]=t):(n[e]=t,void 0!==r&&(n[e].numArguments=r))}function st(e,t,r,n,o,i,a,u){this.name=e,this.constructor=t,this.instancePrototype=r,this.rawDestructor=n,this.baseClass=o,this.getActualType=i,this.upcast=a,this.downcast=u,this.pureVirtualFunctions=[]}function ct(e,t,r){for(;t!==r;)t.upcast||xe("Expected null or instance of "+r.name+", got an instance of "+t.name),e=t.upcast(e),t=t.baseClass;return e}function ft(e,t){if(null===t)return this.isReference&&xe("null is not a valid "+this.name),0;t.$$||xe('Cannot pass "'+Yt(t)+'" as a '+this.name),t.$$.ptr||xe("Cannot pass deleted object as a pointer of type "+this.name);var r=t.$$.ptrType.registeredClass;return ct(t.$$.ptr,r,this.registeredClass)}function lt(e,t){var r;if(null===t)return this.isReference&&xe("null is not a valid "+this.name),this.isSmartPointer?(r=this.rawConstructor(),null!==e&&e.push(this.rawDestructor,r),r):0;t.$$||xe('Cannot pass "'+Yt(t)+'" as a '+this.name),t.$$.ptr||xe("Cannot pass deleted object as a pointer of type "+this.name),!this.isConst&&t.$$.ptrType.isConst&&xe("Cannot convert argument of type "+(t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name)+" to parameter type "+this.name);var n=t.$$.ptrType.registeredClass;if(r=ct(t.$$.ptr,n,this.registeredClass),this.isSmartPointer)switch(void 0===t.$$.smartPtr&&xe("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:t.$$.smartPtrType===this?r=t.$$.smartPtr:xe("Cannot convert argument of type "+(t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name)+" to parameter type "+this.name);break;case 1:r=t.$$.smartPtr;break;case 2:if(t.$$.smartPtrType===this)r=t.$$.smartPtr;else{var o=t.clone();r=this.rawShare(r,Xt((function(){o.delete()}))),null!==e&&e.push(this.rawDestructor,r)}break;default:xe("Unsupporting sharing policy")}return r}function pt(e,t){if(null===t)return this.isReference&&xe("null is not a valid "+this.name),0;t.$$||xe('Cannot pass "'+Yt(t)+'" as a '+this.name),t.$$.ptr||xe("Cannot pass deleted object as a pointer of type "+this.name),t.$$.ptrType.isConst&&xe("Cannot convert argument of type "+t.$$.ptrType.name+" to parameter type "+this.name);var r=t.$$.ptrType.registeredClass;return ct(t.$$.ptr,r,this.registeredClass)}function dt(e){return this.fromWireType(z[e>>2])}function ht(e){return this.rawGetPointee&&(e=this.rawGetPointee(e)),e}function yt(e){this.rawDestructor&&this.rawDestructor(e)}function vt(e){null!==e&&e.delete()}function mt(e,t,r){if(t===r)return e;if(void 0===r.baseClass)return null;var n=mt(e,t,r.baseClass);return null===n?null:r.downcast(n)}function gt(){return Object.keys($t).length}function bt(){var e=[];for(var t in $t)$t.hasOwnProperty(t)&&e.push($t[t]);return e}function wt(e){Qe=e,et.length&&Qe&&Qe(tt)}function Tt(){n.getInheritedInstanceCount=gt,n.getLiveInheritedInstances=bt,n.flushPendingDeletes=tt,n.setDelayFunction=wt}var $t={};function Ct(e,t){for(void 0===t&&xe("ptr should not be undefined");e.baseClass;)t=e.upcast(t),e=e.baseClass;return t}function Pt(e,t){return t=Ct(e,t),$t[t]}function _t(e,t){return t.ptrType&&t.ptr||Me("makeClassHandle requires ptr and ptrType"),!!t.smartPtrType!=!!t.smartPtr&&Me("Both smartPtrType and smartPtr must be specified"),t.count={value:1},Je(Object.create(e,{$$:{value:t}}))}function At(e){var t=this.getPointee(e);if(!t)return this.destructor(e),null;var r=Pt(this.registeredClass,t);if(void 0!==r){if(0===r.$$.count.value)return r.$$.ptr=t,r.$$.smartPtr=e,r.clone();var n=r.clone();return this.destructor(e),n}function o(){return this.isSmartPointer?_t(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:t,smartPtrType:this,smartPtr:e}):_t(this.registeredClass.instancePrototype,{ptrType:this,ptr:e})}var i,a=this.registeredClass.getActualType(t),u=it[a];if(!u)return o.call(this);i=this.isConst?u.constPointerType:u.pointerType;var s=mt(t,this.registeredClass,i.registeredClass);return null===s?o.call(this):this.isSmartPointer?_t(i.registeredClass.instancePrototype,{ptrType:i,ptr:s,smartPtrType:this,smartPtr:e}):_t(i.registeredClass.instancePrototype,{ptrType:i,ptr:s})}function Et(){St.prototype.getPointee=ht,St.prototype.destructor=yt,St.prototype.argPackAdvance=8,St.prototype.readValueFromPointer=dt,St.prototype.deleteObject=vt,St.prototype.fromWireType=At}function St(e,t,r,n,o,i,a,u,s,c,f){this.name=e,this.registeredClass=t,this.isReference=r,this.isConst=n,this.isSmartPointer=o,this.pointeeType=i,this.sharingPolicy=a,this.rawGetPointee=u,this.rawConstructor=s,this.rawShare=c,this.rawDestructor=f,o||void 0!==t.baseClass?this.toWireType=lt:n?(this.toWireType=ft,this.destructorFunction=null):(this.toWireType=pt,this.destructorFunction=null)}function Ft(e,t,r){n.hasOwnProperty(e)||Me("Replacing nonexistant public symbol"),void 0!==n[e].overloadTable&&void 0!==r?n[e].overloadTable[r]=t:(n[e]=t,n[e].argCount=r)}function Rt(e,t){T(e.indexOf("j")>=0,"getDynCaller should only be called with i64 sigs");var r=[];return function(){r.length=arguments.length;for(var n=0;n<arguments.length;n++)r[n]=arguments[n];return $e(e,t,r)}}function Ot(e,t){var r=-1!=(e=Ae(e)).indexOf("j")?Rt(e,t):N.get(t);return"function"!=typeof r&&xe("unknown function pointer with signature "+e+": "+t),r}var Wt=void 0;function kt(e){var t=Sr(e),r=Ae(t);return Er(t),r}function jt(e,t){var r=[],n={};throw t.forEach((function e(t){n[t]||Se[t]||(Fe[t]?Fe[t].forEach(e):(r.push(t),n[t]=!0))})),new Wt(e+": "+r.map(kt).join([", "]))}function It(e,t,r,n,o,i,a,u,s,c,f,l,p){f=Ae(f),i=Ot(o,i),u&&(u=Ot(a,u)),c&&(c=Ot(s,c)),p=Ot(l,p);var d=We(f);ut(d,(function(){jt("Cannot construct "+f+" due to unbound types",[n])})),Ue([e,t,r],n?[n]:[],(function(t){var r,o;t=t[0],o=n?(r=t.registeredClass).instancePrototype:ot.prototype;var a=ke(d,(function(){if(Object.getPrototypeOf(this)!==s)throw new Ie("Use 'new' to construct "+f);if(void 0===l.constructor_body)throw new Ie(f+" has no accessible constructor");var e=l.constructor_body[arguments.length];if(void 0===e)throw new Ie("Tried to invoke ctor of "+f+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(l.constructor_body).toString()+") parameters instead!");return e.apply(this,arguments)})),s=Object.create(o,{constructor:{value:a}});a.prototype=s;var l=new st(f,a,s,p,r,i,u,c),h=new St(f,l,!0,!1,!1),y=new St(f+"*",l,!1,!1,!1),v=new St(f+" const*",l,!1,!0,!1);return it[e]={pointerType:y,constPointerType:v},Ft(d,a),[h,y,v]}))}function xt(e,t){for(var r=[],n=0;n<e;n++)r.push(q[(t>>2)+n]);return r}function Dt(e){for(;e.length;){var t=e.pop();e.pop()(t)}}function Mt(e,t,r,n,o,i){T(t>0);var a=xt(t,r);o=Ot(n,o);var u=[i],s=[];Ue([],[e],(function(e){var r="constructor "+(e=e[0]).name;if(void 0===e.registeredClass.constructor_body&&(e.registeredClass.constructor_body=[]),void 0!==e.registeredClass.constructor_body[t-1])throw new Ie("Cannot register multiple constructors with identical number of parameters ("+(t-1)+") for class '"+e.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return e.registeredClass.constructor_body[t-1]=function(){jt("Cannot construct "+e.name+" due to unbound types",a)},Ue([],a,(function(n){return e.registeredClass.constructor_body[t-1]=function(){arguments.length!==t-1&&xe(r+" called with "+arguments.length+" arguments, expected "+(t-1)),s.length=0,u.length=t;for(var e=1;e<t;++e)u[e]=n[e].toWireType(s,arguments[e-1]);var i=o.apply(null,u);return Dt(s),n[0].fromWireType(i)},[]})),[]}))}function Ut(e,t){if(!(e instanceof Function))throw new TypeError("new_ called with constructor type "+typeof e+" which is not a function");var r=ke(e.name||"unknownFunctionName",(function(){}));r.prototype=e.prototype;var n=new r,o=e.apply(n,t);return o instanceof Object?o:n}function qt(e,t,r,n,o){var i=t.length;i<2&&xe("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var a=null!==t[1]&&null!==r,u=!1,s=1;s<t.length;++s)if(null!==t[s]&&void 0===t[s].destructorFunction){u=!0;break}var c="void"!==t[0].name,f="",l="";for(s=0;s<i-2;++s)f+=(0!==s?", ":"")+"arg"+s,l+=(0!==s?", ":"")+"arg"+s+"Wired";var p="return function "+We(e)+"("+f+") {\nif (arguments.length !== "+(i-2)+") {\nthrowBindingError('function "+e+" called with ' + arguments.length + ' arguments, expected "+(i-2)+" args!');\n}\n";u&&(p+="var destructors = [];\n");var d=u?"destructors":"null",h=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],y=[xe,n,o,Dt,t[0],t[1]];for(a&&(p+="var thisWired = classParam.toWireType("+d+", this);\n"),s=0;s<i-2;++s)p+="var arg"+s+"Wired = argType"+s+".toWireType("+d+", arg"+s+"); // "+t[s+2].name+"\n",h.push("argType"+s),y.push(t[s+2]);if(a&&(l="thisWired"+(l.length>0?", ":"")+l),p+=(c?"var rv = ":"")+"invoker(fn"+(l.length>0?", ":"")+l+");\n",u)p+="runDestructors(destructors);\n";else for(s=a?1:2;s<t.length;++s){var v=1===s?"thisWired":"arg"+(s-2)+"Wired";null!==t[s].destructorFunction&&(p+=v+"_dtor("+v+"); // "+t[s].name+"\n",h.push(v+"_dtor"),y.push(t[s].destructorFunction))}return c&&(p+="var ret = retType.fromWireType(rv);\nreturn ret;\n"),p+="}\n",h.push(p),Ut(Function,h).apply(null,y)}function zt(e,t,r,n,o,i,a,u){var s=xt(r,n);t=Ae(t),i=Ot(o,i),Ue([],[e],(function(e){var n=(e=e[0]).name+"."+t;function o(){jt("Cannot call "+n+" due to unbound types",s)}u&&e.registeredClass.pureVirtualFunctions.push(t);var c=e.registeredClass.instancePrototype,f=c[t];return void 0===f||void 0===f.overloadTable&&f.className!==e.name&&f.argCount===r-2?(o.argCount=r-2,o.className=e.name,c[t]=o):(at(c,t,n),c[t].overloadTable[r-2]=o),Ue([],s,(function(o){var u=qt(n,o,e,i,a);return void 0===c[t].overloadTable?(u.argCount=r-2,c[t]=u):c[t].overloadTable[r-2]=u,[]})),[]}))}var Vt=[],Bt=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function Ht(e){e>4&&0==--Bt[e].refcount&&(Bt[e]=void 0,Vt.push(e))}function Gt(){for(var e=0,t=5;t<Bt.length;++t)void 0!==Bt[t]&&++e;return e}function Lt(){for(var e=5;e<Bt.length;++e)if(void 0!==Bt[e])return Bt[e];return null}function Nt(){n.count_emval_handles=Gt,n.get_first_emval=Lt}function Xt(e){switch(e){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var t=Vt.length?Vt.pop():Bt.length;return Bt[t]={refcount:1,value:e},t}}function Jt(e,t){qe(e,{name:t=Ae(t),fromWireType:function(e){var t=Bt[e].value;return Ht(e),t},toWireType:function(e,t){return Xt(t)},argPackAdvance:8,readValueFromPointer:dt,destructorFunction:null})}function Yt(e){if(null===e)return"null";var t=typeof e;return"object"===t||"array"===t||"function"===t?e.toString():""+e}function Zt(e,t){switch(t){case 2:return function(e){return this.fromWireType(V[e>>2])};case 3:return function(e){return this.fromWireType(B[e>>3])};default:throw new TypeError("Unknown float type: "+e)}}function Kt(e,t,r){var n=Ce(r);qe(e,{name:t=Ae(t),fromWireType:function(e){return e},toWireType:function(e,t){if("number"!=typeof t&&"boolean"!=typeof t)throw new TypeError('Cannot convert "'+Yt(t)+'" to '+this.name);return t},argPackAdvance:8,readValueFromPointer:Zt(t,n),destructorFunction:null})}function Qt(e,t,r,n,o,i){var a=xt(t,r);e=Ae(e),o=Ot(n,o),ut(e,(function(){jt("Cannot call "+e+" due to unbound types",a)}),t-1),Ue([],a,(function(r){var n=[r[0],null].concat(r.slice(1));return Ft(e,qt(e,n,null,o,i),t-1),[]}))}function er(e,t,r){switch(t){case 0:return r?function(e){return x[e]}:function(e){return D[e]};case 1:return r?function(e){return M[e>>1]}:function(e){return U[e>>1]};case 2:return r?function(e){return q[e>>2]}:function(e){return z[e>>2]};default:throw new TypeError("Unknown integer type: "+e)}}function tr(e,t,r,n,o){t=Ae(t),-1===o&&(o=4294967295);var i=Ce(r),a=function(e){return e};if(0===n){var u=32-8*r;a=function(e){return e<<u>>>u}}var s=-1!=t.indexOf("unsigned");qe(e,{name:t,fromWireType:a,toWireType:function(e,r){if("number"!=typeof r&&"boolean"!=typeof r)throw new TypeError('Cannot convert "'+Yt(r)+'" to '+this.name);if(r<n||r>o)throw new TypeError('Passing a number "'+Yt(r)+'" from JS side to C/C++ side to an argument of type "'+t+'", which is outside the valid range ['+n+", "+o+"]!");return s?r>>>0:0|r},argPackAdvance:8,readValueFromPointer:er(t,i,0!==n),destructorFunction:null})}function rr(e,t,r){var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][t];function o(e){var t=z,r=t[e>>=2],o=t[e+1];return new n(I,o,r)}qe(e,{name:r=Ae(r),fromWireType:o,argPackAdvance:8,readValueFromPointer:o},{ignoreDuplicateRegistrations:!0})}function nr(e,t){var r="std::string"===(t=Ae(t));qe(e,{name:t,fromWireType:function(e){var t,n=z[e>>2];if(r)for(var o=e+4,i=0;i<=n;++i){var a=e+4+i;if(i==n||0==D[a]){var u=P(o,a-o);void 0===t?t=u:(t+=String.fromCharCode(0),t+=u),o=a+1}}else{var s=new Array(n);for(i=0;i<n;++i)s[i]=String.fromCharCode(D[e+4+i]);t=s.join("")}return Er(e),t},toWireType:function(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var n="string"==typeof t;n||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int8Array||xe("Cannot pass non-string to std::string");var o=(r&&n?function(){return E(t)}:function(){return t.length})(),i=Ar(4+o+1);if(z[i>>2]=o,r&&n)A(t,i+4,o+1);else if(n)for(var a=0;a<o;++a){var u=t.charCodeAt(a);u>255&&(Er(i),xe("String has UTF-16 code units that do not fit in 8 bits")),D[i+4+a]=u}else for(a=0;a<o;++a)D[i+4+a]=t[a];return null!==e&&e.push(Er,i),i},argPackAdvance:8,readValueFromPointer:dt,destructorFunction:function(e){Er(e)}})}function or(e,t,r){var n,o,i,a,u;r=Ae(r),2===t?(n=F,o=R,a=O,i=function(){return U},u=1):4===t&&(n=W,o=k,a=j,i=function(){return z},u=2),qe(e,{name:r,fromWireType:function(e){for(var r,o=z[e>>2],a=i(),s=e+4,c=0;c<=o;++c){var f=e+4+c*t;if(c==o||0==a[f>>u]){var l=n(s,f-s);void 0===r?r=l:(r+=String.fromCharCode(0),r+=l),s=f+t}}return Er(e),r},toWireType:function(e,n){"string"!=typeof n&&xe("Cannot pass non-string to C++ string type "+r);var i=a(n),s=Ar(4+i+t);return z[s>>2]=i>>u,o(n,s+4,i+t),null!==e&&e.push(Er,s),s},argPackAdvance:8,readValueFromPointer:dt,destructorFunction:function(e){Er(e)}})}function ir(e,t){qe(e,{isVoid:!0,name:t=Ae(t),argPackAdvance:0,fromWireType:function(){},toWireType:function(e,t){}})}var ar={};function ur(e){var t=ar[e];return void 0===t?Ae(e):t}function sr(){return"object"==typeof globalThis?globalThis:Function("return this")()}function cr(e){return 0===e?Xt(sr()):(e=ur(e),Xt(sr()[e]))}function fr(e){e>4&&(Bt[e].refcount+=1)}function lr(e,t){var r=Se[e];return void 0===r&&xe(t+" has unknown type "+kt(e)),r}function pr(e){for(var t="",r=0;r<e;++r)t+=(0!==r?", ":"")+"arg"+r;var o="return function emval_allocator_"+e+"(constructor, argTypes, args) {\n";for(r=0;r<e;++r)o+="var argType"+r+" = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + "+r+'], "parameter '+r+'");\nvar arg'+r+" = argType"+r+".readValueFromPointer(args);\nargs += argType"+r+"['argPackAdvance'];\n";return o+="var obj = new constructor("+t+");\nreturn __emval_register(obj);\n}\n",new Function("requireRegisteredType","Module","__emval_register",o)(lr,n,Xt)}var dr={};function hr(e){return e||xe("Cannot use deleted val. handle = "+e),Bt[e].value}function yr(e,t,r,n){e=hr(e);var o=dr[t];return o||(o=pr(t),dr[t]=o),o(e,r,n)}function vr(e,t){return Xt((e=lr(e,"_emval_take_value")).readValueFromPointer(t))}function mr(e){throw hr(e)}function gr(){fe()}function br(e,t,r){D.copyWithin(e,t,t+r)}function wr(){return D.length}function Tr(e){try{return g.grow(e-I.byteLength+65535>>>16),L(g.buffer),1}catch(e){}}function $r(e){e>>>=0;var t=wr(),r=2147483648;if(e>r)return!1;for(var n=1;n<=4;n*=2){var o=t*(1+.2/n);if(o=Math.min(o,e+100663296),Tr(Math.min(r,G(Math.max(16777216,e,o),65536))))return!0}return!1}Pe(),Ie=n.BindingError=je(Error,"BindingError"),De=n.InternalError=je(Error,"InternalError"),nt(),Et(),Tt(),Wt=n.UnboundTypeError=je(Error,"UnboundTypeError"),Nt(),Y.push({func:function(){_r()}});var Cr,Pr={s:ze,m:It,l:Mt,d:zt,r:Jt,h:Kt,k:Qt,c:tr,b:rr,i:nr,f:or,t:ir,e:Ht,v:cr,j:fr,u:yr,n:vr,p:mr,g:gr,o:br,q:$r,a:g},_r=(be(),n.___wasm_call_ctors=function(){return(_r=n.___wasm_call_ctors=n.asm.x).apply(null,arguments)}),Ar=n._malloc=function(){return(Ar=n._malloc=n.asm.y).apply(null,arguments)},Er=n._free=function(){return(Er=n._free=n.asm.z).apply(null,arguments)},Sr=n.___getTypeName=function(){return(Sr=n.___getTypeName=n.asm.A).apply(null,arguments)};function Fr(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function Rr(e){function t(){Cr||(Cr=!0,n.calledRun=!0,w||(ee(),te(),n.onRuntimeInitialized&&n.onRuntimeInitialized(),re()))}e=e||a,ie>0||(Q(),ie>0||(n.setStatus?(n.setStatus("Running..."),setTimeout((function(){setTimeout((function(){n.setStatus("")}),1),t()}),1)):t()))}if(n.___embind_register_native_and_builtin_types=function(){return(n.___embind_register_native_and_builtin_types=n.asm.B).apply(null,arguments)},ue=function e(){Cr||Rr(),Cr||(ue=e)},n.run=Rr,n.preInit)for("function"==typeof n.preInit&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.pop()();Rr()}(n)}})).then((function(){if(function(e,t){"use strict";e.MD5=t.MD5,e.md5=t.md5,Object.defineProperty(e,"__esModule",{value:!0})}(i,n),"__esModule"in i){if(!i.__esModule)throw new Error("exports.__esModule is falsy")}else try{Object.defineProperty(i,"__esModule",{value:!0})}catch(e){m.__esModule=!0}return o=n,n})).catch((function(e){return o=null,Promise.reject(e)}))}}),"undefined"!=typeof Symbol&&Symbol.toStringTag)try{Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})}catch(e){}return i}()}));