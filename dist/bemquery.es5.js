/*! bemquery v0.1.5 | (c) 2016-2017 BEMQuery team | MIT license (see LICENSE) */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.bemquery=t()}(this,function(){"use strict";function e(e,t){var n=new RegExp("[^"+t.elemSeparator+t.modifierSeparator+"]+"+t.modifierSeparator+"[^"+t.elemSeparator+t.modifierSeparator+"]+$","g");return!!e.match(n)}function t(e,t){return" "+e.substring(e.lastIndexOf("."),e.lastIndexOf(t))}function n(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=t.rules,i=e.shift(),u=void 0,f=void 0;if(!i)return r;if(r?(f=e.shift(),u=o[i]):(f=i,u=o.default),"function"!=typeof u)throw new SyntaxError("Malformed BEM rule");return r+=u(f,t,r),n(e,t,r)}function r(e,t){var r=Object.keys(t.rules).filter(function(e){return"default"!==e}),o=new RegExp("("+r.join("|")+")","g"),i=e.split(o);return e=n(i,t)}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=new v(e);return t}function i(e){return"object"==("undefined"==typeof e?"undefined":l(e))&&"function"==typeof e.convert}function u(e){return"object"==("undefined"==typeof e?"undefined":l(e))&&"function"==typeof e.find}function f(e){return e instanceof w&&(e=e.elements[0]),e instanceof HTMLElement||e===document||(e=document),e}function a(e,t,n,r){if(!e)throw new TypeError("Selector must be set.");if("string"==typeof e)return e=n.convert(e).CSS,r.find(e,t);if(e instanceof HTMLElement)return[e];if(e instanceof w)return e.elements;if("object"==("undefined"==typeof e?"undefined":l(e)))return Array.from(e);throw new TypeError("Selector must be a string, object, array or DOM element.")}function c(e,t){Object.defineProperty(e,"elements",{value:t}),e.elements.forEach(function(t,n){Object.defineProperty(e,n,{enumerable:!0,get:function(){return new w(this.elements[n],document,this.converter,this.selectorEngine)}})},e),Object.defineProperty(e,"length",{enumerable:!0,get:function(){return this.elements.length}})}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,n=o(),r=new b,i=new w(e,t,n,r);return i}function h(e,t){var n=[];return[].forEach.call(t.classList,function(t){var r=e.getStateFromClass(t+"");r&&n.push(r)}),n}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=function e(t,n){d(this,e),this.BEM=t,this.CSS=n,Object.freeze(this)},y={bem:{elemSeparator:"__",modifierSeparator:"_"},rules:{default:function(e){return"."+e}," > ":function(e,t){return" "+t.rules.default(e)}," ":function(n,r,o){return e(o,r.bem)?""+t(o,r.bem.modifierSeparator)+r.bem.elemSeparator+n:""+r.bem.elemSeparator+n},":":function(e,t){return""+t.bem.modifierSeparator+e}}},v=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y;d(this,e),this.config=t}return p(e,[{key:"convert",value:function(e){var t=r(e,this.config);return new m(e,t)}},{key:"getStateFromClass",value:function(e){if("string"!=typeof e)throw new TypeError("Class must be a string.");var t=this.config.bem,n=new RegExp("[^"+t.elemSeparator+t.modifierSeparator+"]+"+t.modifierSeparator+"([^"+t.elemSeparator+t.modifierSeparator+"]+)$"),r=e.match(n);return r?r[1]:null}}]),e}(),b=function(){function e(){d(this,e)}return p(e,[{key:"find",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,n=!1;t!==document&&(!t.id&&(n=!0,t.id="BEMQueryTMP_"+Date.now()),e="#"+t.id+" "+e);var r=Array.from(t.querySelectorAll(e));return n&&t.removeAttribute("id"),r}}]),e}(),w=function(){function e(t,n,r,o){if(d(this,e),!i(r))throw new TypeError("Converter must be an object with convert method defined.");if(!u(o))throw new TypeError("SelectorEngine must be an object with find method defined.");this.converter=r,this.selectorEngine=o,n=f(n),c(this,a(t,n,r,o))}return p(e,[{key:"get",value:function(t){if(t=+t,Number.isNaN(t))throw new TypeError("Index must be a correct Number.");if(0>t)throw new RangeError("Index must be greater or equal to 0.");if(t>this.elements.length-1)throw new RangeError("Index cannot be greater than collection's length.");return new e(this.elements[t],document,this.converter,this.selectorEngine)}},{key:"each",value:function(t){if("function"!=typeof t)throw new TypeError("Callback must be a function.");var n=this.converter,r=this.selectorEngine;return this.elements.forEach(function(o){t(new e(o,document,n,r))}),this}},{key:Symbol.iterator,value:function(){var t=0,n=this.elements,r=this.converter,o=this.selectorEngine;return{next:function(){if(t<n.length){var i=n[t++];return{value:new e([i],document,r,o),done:!1}}return{done:!0}}}}}]),e}(),g=Object.freeze({BEMQuery:w,default:s}),E=function(){function e(){d(this,e),this.read=[],this.write=[]}return p(e,[{key:"add",value:function(e,t){if("read"!==e&&"write"!==e)throw new TypeError("Type must be either 'read' or 'write'.");if("function"!=typeof t)throw new TypeError("Task must be a function.");this[e].push(t)}},{key:"run",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"read";if("read"!==t&&"write"!==t)throw new TypeError("Type must be either 'read' or 'write'.");return new Promise(function(n){requestAnimationFrame(function(){var r=[];return e[t].forEach(function(e){r.push(e())}),e[t]=[],n(r)})})}}]),e}();w.prototype.read=function(){return this.batch||(this.batch=new E),this.batch.run("read")},w.prototype.write=function(){return this.batch||(this.batch=new E),this.batch.run("write")},w.prototype.html=function(e){var t=this;return this.batch||(this.batch=new E),"undefined"==typeof e?this.batch.add("read",function(){var e=t.elements,n=[];return e.forEach(function(e){n.push(e.innerHTML)}),n}):(e+="",this.batch.add("write",function(){var n=t.elements;n.forEach(function(t){t.innerHTML=e})})),this},w.prototype.getStates=function(){var e=this;this.batch||(this.batch=new E);var t=this.elements;return this.batch.add("read",function(){var n=[];return t.forEach(function(t){n.push(h(e.converter,t))}),n}),this};var S=function(){function e(){d(this,e),this.storage=new WeakMap}return p(e,[{key:"add",value:function(e,t,n,r,o){var i={};this.storage.has(e)&&(i=this.storage.get(e)),"undefined"==typeof i[t]&&(i[t]={}),"undefined"==typeof i[t][n]&&(i[t][n]=[]),i[t][n].push([r,o]),this.storage.set(e,i)}},{key:"get",value:function(e,t,n,r){if(!this.storage.has(e))return null;var o=this.storage.get(e);if("undefined"==typeof o[t]||"undefined"==typeof o[t][n])return null;var i=!0,u=!1,f=void 0;try{for(var a,c=o[t][n][Symbol.iterator]();!(i=(a=c.next()).done);i=!0){var s=a.value;if(s[0]===r)return s[1]}}catch(e){u=!0,f=e}finally{try{!i&&c.return&&c.return()}finally{if(u)throw f}}return null}},{key:"remove",value:function(e,t,n,r){if(!this.storage.has(e))return null;var o=this.storage.get(e);return"undefined"==typeof o[t]||"undefined"==typeof o[t][n]?null:(o[t][n].forEach(function(e,i){e[0]===r&&o[t][n].splice(i,1)}),null)}}]),e}(),T=new S;return w.prototype.on=function(e,t,n){var r=void 0;if("string"!=typeof e||!e)throw new TypeError("Type of event must be a non-empty string.");if("string"!=typeof t&&"function"!=typeof t||!t)throw new TypeError("Selector must be a non-empty string or function.");if("string"==typeof t){if("function"!=typeof n)throw new TypeError("Callback must be a function.");t=this.converter.convert(t).CSS,t=t+", "+t+" *",r=function(e){e.target.matches(t)&&n(e)}}else r=t;return this.elements.forEach(function(o){o.addEventListener(e,r,!1),"string"==typeof t&&T.add(o,e,t,n,r)}),this},w.prototype.off=function(e,t,n){var r=void 0;if("string"!=typeof e||!e)throw new TypeError("Type of event must be a non-empty string.");if("string"!=typeof t&&"function"!=typeof t||!t)throw new TypeError("Selector must be a non-empty string or function.");if("string"==typeof t){if("function"!=typeof n)throw new TypeError("Callback must be a function.");t=this.converter.convert(t).CSS,t=t+", "+t+" *"}else r=t;return this.elements.forEach(function(o){"string"==typeof t&&(r=T.get(o,e,t,n),T.remove(o,e,t,n)),o.removeEventListener(e,r,!1)}),this},g});
//# sourceMappingURL=bemquery.es5.js.map
