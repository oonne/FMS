/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(65);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(63)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(51),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b7ae2ba0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\Base.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Base.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b7ae2ba0", Component.options)
  } else {
    hotAPI.reload("data-v-b7ae2ba0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(64)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(52),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-d65fe6ae",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\BottomNav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BottomNav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d65fe6ae", Component.options)
  } else {
    hotAPI.reload("data-v-d65fe6ae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(54)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(42),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-013d243a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\LoadMore.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] LoadMore.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-013d243a", Component.options)
  } else {
    hotAPI.reload("data-v-013d243a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.22
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (process.env.NODE_ENV !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false)
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    try {
      return fn.apply(null, arguments)
    } finally {
      useMacroTask = false;    
    }
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }

      if (renderCompleted) {
        contexts.length = 0;
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        contexts.length = 0;
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        if (!(key in hash) && !(camelizedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + camelizedKey)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (process.env.NODE_ENV !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.22';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production') {
      if (el.tag === 'template') {
        warn$2("<template> cannot be keyed. Place the key on real elements instead.");
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys."
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (
          process.env.NODE_ENV !== 'production' &&
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !(isReservedTag(el.tag) && !el.component); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7), __webpack_require__(5), __webpack_require__(67).setImmediate))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(61)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(49),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-86ae406c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\ErrorBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ErrorBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-86ae406c", Component.options)
  } else {
    hotAPI.reload("data-v-86ae406c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Login__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Login___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Login__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Expenses__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Expenses___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Expenses__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Income__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Income___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Income__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Chart__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Chart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_Chart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_User__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_User___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_User__);








__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
	mode: 'history',
	routes: [{
		path: '/login',
		name: 'Login',
		component: __WEBPACK_IMPORTED_MODULE_2__components_Login___default.a
	}, {
		path: '/',
		name: 'Expenses',
		component: __WEBPACK_IMPORTED_MODULE_3__components_Expenses___default.a
	}, {
		path: '/expenses',
		name: 'Expenses',
		component: __WEBPACK_IMPORTED_MODULE_3__components_Expenses___default.a
	}, {
		path: '/income',
		name: 'Income',
		component: __WEBPACK_IMPORTED_MODULE_4__components_Income___default.a
	}, {
		path: '/chart',
		name: 'Chart',
		component: __WEBPACK_IMPORTED_MODULE_5__components_Chart___default.a
	}, {
		path: '/user',
		name: 'User',
		component: __WEBPACK_IMPORTED_MODULE_6__components_User___default.a
	}]
}));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(57)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(45),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25441132", Component.options)
  } else {
    hotAPI.reload("data-v-25441132", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'app'
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'base',
    data() {
        return {
            token: '',
            pageCount: 1, //总页数
            currentPage: 1, //当前页数
            loading: true, //加载中
            error: false, //错误
            errorMsg: '', //错误提示
            toast: false, //气泡
            toastMsg: '' //气泡提示
        };
    },
    methods: {
        getFirstAttr: function (object) {
            for (let i in object) return object[i];
        },
        checkScrollEnd: function () {
            let scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            let scrollHeight = document.documentElement.scrollHeight;
            return scrollHeight - scrollTop < 1100;
        },
        getUser: function (callback) {
            if (localStorage.getItem('user')) {
                let user = eval('(' + localStorage.getItem('user') + ')');
                this.token = user.access_token;
                if (typeof callback == 'function') return callback(user);
            } else {
                this.noLog();
            }
        },
        getToday: function () {
            let date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            if (m >= 1 && m <= 9) {
                m = "0" + m;
            }
            if (d >= 1 && d <= 9) {
                d = "0" + d;
            }
            return y + "-" + m + "-" + d;
        },
        noLog: function () {
            this.$router.push('/login');
        }
    },
    watch: {
        errorMsg: function () {
            let vm = this;
            if (vm.errorMsg) {
                vm.error = true;
            } else {
                vm.error = false;
            }
        },
        toastMsg: function () {
            let vm = this;
            if (vm.toastMsg) {
                vm.toast = true;
                setTimeout(function () {
                    vm.toast = false;
                }, 1000);
                setTimeout(function () {
                    vm.toastMsg = '';
                }, 1500);
            }
        }
    }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BottomNavItem__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BottomNavItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__BottomNavItem__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'bottom-nav',
    props: ['active'],
    components: {
        'BottomNavItem': __WEBPACK_IMPORTED_MODULE_0__BottomNavItem___default.a
    }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'bottom-nav-item',
	props: ['active', 'name']
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__BottomNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LoadMore__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LoadMore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__LoadMore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_echarts_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_echarts_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_echarts_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    extends: __WEBPACK_IMPORTED_MODULE_0__Base___default.a,
    name: 'chart',
    components: {
        'BottomNav': __WEBPACK_IMPORTED_MODULE_1__BottomNav___default.a,
        'LoadMore': __WEBPACK_IMPORTED_MODULE_2__LoadMore___default.a
    },
    data() {
        return {
            chartData: null
        };
    },
    computed: {
        summaryBalance: function () {
            let vm = this;
            if (vm.chartData) {
                let balance = (Math.round(vm.chartData.incomeTotal * 100 - vm.chartData.expensesTotal * 100) / 100).toFixed(2);
                return balance;
            } else {
                return 0;
            }
        },
        chartTableStyle: function () {
            let width = document.documentElement.clientWidth - 20;
            return 'width: ' + width + 'px';
        },
        chartPieStyle: function () {
            let width = document.documentElement.clientWidth - 20;
            width = width > 372 ? 372 : width;
            return 'width: ' + width + 'px;' + 'margin-top: -50px';
        }
    },
    created: function () {
        this.getUser(this.init);
    },
    methods: {
        init: function () {
            let vm = this;
            fetch('/api/chart/index', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': vm.token
                }
            }).then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else if (response.status == 401) {
                    vm.errorMsg = '未登录';
                    vm.noLog();
                } else {
                    vm.errorMsg = response.statusText;
                }
            }).then(function (data) {
                vm.loading = false;
                if (data) {
                    if (!data.Ret) {
                        vm.showChart(data.Data);
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }
            }).catch(function (error) {
                vm.loading = false;
                console.error(error);
                vm.errorMsg = '服务器故障';
            });
        },
        showChart: function (data) {
            let vm = this;
            vm.chartData = data;

            // monthly expenses & monthly income
            let monthChart = __WEBPACK_IMPORTED_MODULE_3__assets_echarts_js___default.a.init(document.getElementById('monthly'));
            monthChart.setOption({
                color: ['#d15346', '#add536'],
                grid: {
                    left: '2%',
                    right: '6%',
                    top: '10%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['月存钱', '月消费']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: data['month']
                }],
                yAxis: [{
                    type: 'value'
                }],
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }],
                series: [{
                    name: '月消费',
                    type: 'line',
                    data: data['monthlyExpenses'],
                    markLine: {
                        data: [{ type: 'average', name: '平均消费' }],
                        label: {
                            normal: {
                                position: 'middle'
                            }
                        }
                    }
                }, {
                    name: '月存钱',
                    type: 'line',
                    data: data['monthlyIncome'],
                    markLine: {
                        data: [{ type: 'average', name: '平均消费' }],
                        label: {
                            normal: {
                                position: 'middle'
                            }
                        }
                    }
                }]
            }, true);

            // monthly balance
            let balanceChart = __WEBPACK_IMPORTED_MODULE_3__assets_echarts_js___default.a.init(document.getElementById('balance'));
            balanceChart.setOption({
                color: ['#ccd539'],
                grid: {
                    left: '2%',
                    right: '6%',
                    top: '2%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['月存钱', '月消费']
                },
                xAxis: [{
                    type: 'category',
                    data: data['month']
                }],
                yAxis: [{
                    type: 'value'
                }],
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }],
                series: [{
                    name: '每月结余',
                    type: 'bar',
                    barWidth: '60%',
                    label: {
                        normal: {
                            position: 'top',
                            show: true
                        }
                    },
                    data: data['monthlyBalance']
                }]
            }, true);

            // expenses category
            let categoryChart = __WEBPACK_IMPORTED_MODULE_3__assets_echarts_js___default.a.init(document.getElementById('category'));
            categoryChart.setOption({
                color: ['#d15346', '#72a4bb', '#a0c824', '#c18c30'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [{
                    name: '金额',
                    type: 'pie',
                    radius: ['48%', '60%'],
                    data: data['expensesCategory']
                }]
            }, true);

            // income handler
            let handlerChart = __WEBPACK_IMPORTED_MODULE_3__assets_echarts_js___default.a.init(document.getElementById('handler'));
            handlerChart.setOption({
                color: ['#a0c824', '#72a4bb', '#6c6669'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [{
                    name: '金额',
                    type: 'pie',
                    radius: ['48%', '60%'],
                    data: data['incomeHandler']
                }]
            }, true);
        }
    }
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Base__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Base___default.a,
	name: 'error-bar',
	props: {
		'text': {
			type: String,
			default: '出错'
		}
	}
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__BottomNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorBar__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorBar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ErrorBar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LoadMore__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LoadMore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__LoadMore__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    extends: __WEBPACK_IMPORTED_MODULE_0__Base___default.a,
    name: 'expenses',
    components: {
        'BottomNav': __WEBPACK_IMPORTED_MODULE_1__BottomNav___default.a,
        'ErrorBar': __WEBPACK_IMPORTED_MODULE_2__ErrorBar___default.a,
        'LoadMore': __WEBPACK_IMPORTED_MODULE_3__LoadMore___default.a
    },
    data() {
        return {
            expensesList: [],
            categoryList: [],
            handlerList: [],
            editingIndex: null,
            editingExpenses: {
                'id': null,
                'expenses_date': null,
                'expenses_item': '',
                'expenses_money': 0,
                'expenses_category': null,
                'expenses_handler': null,
                'expenses_remark': ''
            }
        };
    },
    created: function () {
        this.getUser(this.init);
    },
    methods: {
        init: function () {
            let vm = this;
            vm.getList();
            window.addEventListener('scroll', vm.handleScroll);
        },
        getList: function () {
            let vm = this;
            fetch('/api/expenses/index?page=' + vm.currentPage, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': vm.token
                }
            }).then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else if (response.status == 401) {
                    vm.errorMsg = '未登录';
                    vm.noLog();
                } else {
                    vm.errorMsg = response.statusText;
                }
            }).then(function (data) {
                vm.loading = false;
                if (data) {
                    if (!data.Ret) {
                        vm.pageCount = data.Meta.pageCount;
                        vm.currentPage = data.Meta.currentPage;
                        vm.categoryList = data.Extra.category;
                        vm.handlerList = data.Extra.handler;
                        vm.expensesList = vm.expensesList.concat(data.Data);
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }
            }).catch(function (error) {
                vm.loading = false;
                console.error(error);
                vm.errorMsg = '服务器故障';
            });
        },
        handleScroll: function () {
            let vm = this;
            if (vm.checkScrollEnd() && !vm.loading) {
                if (vm.pageCount > vm.currentPage) {
                    vm.currentPage++;
                    vm.loading = true;
                    vm.getList();
                }
            }
        },
        getCategoryName: function (id) {
            let vm = this;
            let name = '';
            for (let category of vm.categoryList) {
                if (category.id == id) {
                    name = category.category_name;
                }
            }
            return name;
        },
        getHandlerName: function (id) {
            let vm = this;
            let name = '';
            for (let handler of vm.handlerList) {
                if (handler.id == id) {
                    name = handler.handler_name;
                }
            }
            return name;
        },
        addOn: function (index) {
            let vm = this;
            if (vm.editingIndex === null) {
                vm.editingIndex = 'new';
                vm.editingExpenses = {
                    'expenses_date': vm.getToday(),
                    'expenses_item': '',
                    'expenses_money': 0,
                    'expenses_category': vm.categoryList[0].id,
                    'expenses_handler': vm.handlerList[0].id,
                    'expenses_remark': ''
                };
            }
        },
        addSave: function () {
            let vm = this;
            if (vm.editingIndex != null && vm.editingExpenses.expenses_item) {
                let expenses = JSON.stringify(vm.editingExpenses);
                vm.loading = true;
                fetch('/api/expenses/add', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Auth-Token': vm.token
                    },
                    body: expenses
                }).then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    } else if (response.status == 401) {
                        vm.errorMsg = '未登录';
                        vm.noLog();
                    } else {
                        vm.errorMsg = response.statusText;
                    }
                }).then(function (data) {
                    vm.loading = false;
                    if (data && data.Ret == 0) {
                        vm.editingExpenses.id = data.Data.id;
                        vm.expensesList.unshift(vm.editingExpenses);
                        vm.editingIndex = null;
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    console.error(error);
                    vm.errorMsg = '服务器故障';
                });
            }
        },
        editingOn: function (index) {
            let vm = this;
            if (vm.editingIndex === null) {
                let expenses = vm.expensesList[index];
                vm.editingIndex = index;
                vm.editingExpenses = expenses;
            }
        },
        changeCategory: function () {
            let vm = this;
            if (vm.editingIndex != null) {
                let id = 0;
                for (let i in vm.categoryList) {
                    if (vm.categoryList[i].id == vm.editingExpenses.expenses_category) {
                        if (parseInt(i) + 1 < vm.categoryList.length) {
                            id = vm.categoryList[parseInt(i) + 1].id;
                        } else {
                            id = vm.categoryList[0].id;
                        }
                    }
                }
                vm.editingExpenses.expenses_category = id;
            }
        },
        changeHandler: function () {
            let vm = this;
            if (vm.editingIndex != null) {
                let id = 0;
                for (let i in vm.handlerList) {
                    if (vm.handlerList[i].id == vm.editingExpenses.expenses_handler) {
                        if (parseInt(i) + 1 < vm.handlerList.length) {
                            id = vm.handlerList[parseInt(i) + 1].id;
                        } else {
                            id = vm.handlerList[0].id;
                        }
                    }
                }
                vm.editingExpenses.expenses_handler = id;
            }
        },
        formatMoney: function () {
            this.editingExpenses.expenses_money = this.editingExpenses.expenses_money.toFixed(2);
        },
        deleteExpenses: function () {
            let vm = this;
            if (vm.editingIndex != null) {
                vm.loading = true;
                fetch('/api/expenses/delete', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Auth-Token': vm.token
                    },
                    body: JSON.stringify({ 'id': vm.editingExpenses.id })
                }).then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    } else if (response.status == 401) {
                        vm.errorMsg = '未登录';
                        vm.noLog();
                    } else {
                        vm.errorMsg = response.statusText;
                    }
                }).then(function (data) {
                    vm.loading = false;
                    if (data && data.Ret == 0) {
                        vm.expensesList.splice(vm.editingIndex, 1);
                        vm.editingIndex = null;
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    console.error(error);
                    vm.errorMsg = '服务器故障';
                });
            }
        },
        saveExpenses: function () {
            let vm = this;
            if (vm.editingIndex != null && vm.editingExpenses.expenses_item) {
                let expenses = JSON.stringify(vm.editingExpenses);
                vm.loading = true;
                fetch('/api/expenses/update', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Auth-Token': vm.token
                    },
                    body: expenses
                }).then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    } else if (response.status == 401) {
                        vm.errorMsg = '未登录';
                        vm.noLog();
                    } else {
                        vm.errorMsg = response.statusText;
                    }
                }).then(function (data) {
                    vm.loading = false;
                    if (data && data.Ret == 0) {
                        vm.expensesList[vm.editingIndex] = vm.editingExpenses;
                        vm.editingIndex = null;
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    console.error(error);
                    vm.errorMsg = '服务器故障';
                });
            }
        }
    }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__BottomNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorBar__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorBar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ErrorBar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LoadMore__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LoadMore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__LoadMore__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    extends: __WEBPACK_IMPORTED_MODULE_0__Base___default.a,
    name: 'income',
    components: {
        'BottomNav': __WEBPACK_IMPORTED_MODULE_1__BottomNav___default.a,
        'ErrorBar': __WEBPACK_IMPORTED_MODULE_2__ErrorBar___default.a,
        'LoadMore': __WEBPACK_IMPORTED_MODULE_3__LoadMore___default.a
    },
    data() {
        return {
            incomeList: [],
            handlerList: [],
            editingIndex: null,
            editingIncome: {
                'id': null,
                'income_date': null,
                'income_item': '',
                'income_money': 0,
                'income_handler': null,
                'income_remark': ''
            }
        };
    },
    created: function () {
        this.getUser(this.init);
    },
    methods: {
        init: function () {
            let vm = this;
            vm.getList();
            window.addEventListener('scroll', vm.handleScroll);
        },
        getList: function () {
            let vm = this;
            fetch('/api/income/index?page=' + vm.currentPage, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': vm.token
                }
            }).then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else if (response.status == 401) {
                    vm.errorMsg = '未登录';
                    vm.noLog();
                } else {
                    vm.errorMsg = response.statusText;
                }
            }).then(function (data) {
                vm.loading = false;
                if (data) {
                    if (!data.Ret) {
                        vm.pageCount = data.Meta.pageCount;
                        vm.currentPage = data.Meta.currentPage;
                        vm.handlerList = data.Extra.handler;
                        vm.incomeList = vm.incomeList.concat(data.Data);
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }
            }).catch(function (error) {
                vm.loading = false;
                console.error(error);
                vm.errorMsg = '服务器故障';
            });
        },
        handleScroll: function () {
            let vm = this;
            if (vm.checkScrollEnd() && !vm.loading) {
                if (vm.pageCount > vm.currentPage) {
                    vm.currentPage++;
                    vm.loading = true;
                    vm.getList();
                }
            }
        },
        getHandlerName: function (id) {
            let vm = this;
            let name = '';
            for (let handler of vm.handlerList) {
                if (handler.id == id) {
                    name = handler.handler_name;
                }
            }
            return name;
        },
        addOn: function (index) {
            let vm = this;
            if (vm.editingIndex === null) {
                vm.editingIndex = 'new';
                vm.editingIncome = {
                    'income_date': vm.getToday(),
                    'income_item': '',
                    'income_money': 0,
                    'income_handler': vm.handlerList[0].id,
                    'income_remark': ''
                };
            }
        },
        addSave: function () {
            let vm = this;
            if (vm.editingIndex != null && vm.editingIncome.income_item) {
                let income = JSON.stringify(vm.editingIncome);
                vm.loading = true;
                fetch('/api/income/add', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Auth-Token': vm.token
                    },
                    body: income
                }).then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    } else if (response.status == 401) {
                        vm.errorMsg = '未登录';
                        vm.noLog();
                    } else {
                        vm.errorMsg = response.statusText;
                    }
                }).then(function (data) {
                    vm.loading = false;
                    if (data && data.Ret == 0) {
                        vm.editingIncome.id = data.Data.id;
                        vm.incomeList.unshift(vm.editingIncome);
                        vm.editingIndex = null;
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    console.error(error);
                    vm.errorMsg = '服务器故障';
                });
            }
        },
        editingOn: function (index) {
            let vm = this;
            if (vm.editingIndex === null) {
                let income = vm.incomeList[index];
                vm.editingIndex = index;
                vm.editingIncome = income;
            }
        },
        changeHandler: function () {
            let vm = this;
            if (vm.editingIndex != null) {
                let id = 0;
                for (let i in vm.handlerList) {
                    if (vm.handlerList[i].id == vm.editingIncome.income_handler) {
                        if (parseInt(i) + 1 < vm.handlerList.length) {
                            id = vm.handlerList[parseInt(i) + 1].id;
                        } else {
                            id = vm.handlerList[0].id;
                        }
                    }
                }
                vm.editingIncome.income_handler = id;
            }
        },
        formatMoney: function () {
            this.editingIncome.income_money = this.editingIncome.income_money.toFixed(2);
        },
        deleteIncome: function () {
            let vm = this;
            if (vm.editingIndex != null) {
                vm.loading = true;
                fetch('/api/income/delete', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Auth-Token': vm.token
                    },
                    body: JSON.stringify({ 'id': vm.editingIncome.id })
                }).then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    } else if (response.status == 401) {
                        vm.errorMsg = '未登录';
                        vm.noLog();
                    } else {
                        vm.errorMsg = response.statusText;
                    }
                }).then(function (data) {
                    vm.loading = false;
                    if (data && data.Ret == 0) {
                        vm.incomeList.splice(vm.editingIndex, 1);
                        vm.editingIndex = null;
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    console.error(error);
                    vm.errorMsg = '服务器故障';
                });
            }
        },
        saveIncome: function () {
            let vm = this;
            if (vm.editingIndex != null && vm.editingIncome.income_item) {
                let income = JSON.stringify(vm.editingIncome);
                vm.loading = true;
                fetch('/api/income/update', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Auth-Token': vm.token
                    },
                    body: income
                }).then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    } else if (response.status == 401) {
                        vm.errorMsg = '未登录';
                        vm.noLog();
                    } else {
                        vm.errorMsg = response.statusText;
                    }
                }).then(function (data) {
                    vm.loading = false;
                    if (data && data.Ret == 0) {
                        vm.incomeList[vm.editingIndex] = vm.editingIncome;
                        vm.editingIndex = null;
                    } else {
                        vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                        console.warn(data.Data.errors);
                    }
                }).catch(function (error) {
                    vm.loading = false;
                    console.error(error);
                    vm.errorMsg = '服务器故障';
                });
            }
        }
    }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'load-more'
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Base__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    extends: __WEBPACK_IMPORTED_MODULE_0__Base___default.a,
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login: function () {
            let vm = this;
            if (!vm.username || !vm.password) {
                vm.errorMsg = '请填写帐号和密码';
            } else {
                fetch('/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: vm.username,
                        password: vm.password
                    })
                }).then(function (response) {
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        vm.errorMsg = response.statusText;
                    }
                }).then(function (data) {
                    if (data) {
                        if (data.Ret) {
                            vm.errorMsg = vm.getFirstAttr(data.Data.errors);
                            console.warn(data.Data.errors);
                        } else {
                            localStorage.setItem('user', JSON.stringify(data.Data));
                            vm.$router.push('/');
                        }
                    }
                }).catch(function (error) {
                    console.error(error);
                    vm.errorMsg = '服务器故障';
                });
            }
        }
    }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BottomNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__BottomNav__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    extends: __WEBPACK_IMPORTED_MODULE_0__Base___default.a,
    name: 'user',
    components: {
        'BottomNav': __WEBPACK_IMPORTED_MODULE_1__BottomNav___default.a
    },
    data() {
        return {
            nickname: ''
        };
    },
    created: function () {
        let vm = this;
        this.getUser(function (user) {
            vm.nickname = user.nickname;
        });
    },
    methods: {
        logout: function () {
            localStorage.clear();
            sessionStorage.clear();
            this.noLog();
        }
    }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function (t, e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == typeof module && module.exports ? module.exports = e() : t.echarts = e();
}(this, function () {
  var t, e;!function () {
    function n(t, e) {
      if (!e) return t;if (0 === t.indexOf(".")) {
        var n = e.split("/"),
            i = t.split("/"),
            r = n.length - 1,
            a = i.length,
            o = 0,
            s = 0;t: for (var l = 0; a > l; l++) switch (i[l]) {case "..":
            if (!(r > o)) break t;o++, s++;break;case ".":
            s++;break;default:
            break t;}return n.length = r - o, i = i.slice(s), n.concat(i).join("/");
      }return t;
    }function i(t) {
      function e(e, o) {
        if ("string" == typeof e) {
          var s = i[e];return s || (s = a(n(e, t)), i[e] = s), s;
        }e instanceof Array && (o = o || function () {}, o.apply(this, r(e, o, t)));
      }var i = {};return e;
    }function r(e, i, r) {
      for (var s = [], l = o[r], u = 0, c = Math.min(e.length, i.length); c > u; u++) {
        var h,
            d = n(e[u], r);switch (d) {case "require":
            h = l && l.require || t;break;case "exports":
            h = l.exports;break;case "module":
            h = l;break;default:
            h = a(d);}s.push(h);
      }return s;
    }function a(t) {
      var e = o[t];if (!e) throw new Error("No " + t);if (!e.defined) {
        var n = e.factory,
            i = n.apply(this, r(e.deps || [], n, t));"undefined" != typeof i && (e.exports = i), e.defined = 1;
      }return e.exports;
    }var o = {};e = function (t, e, n) {
      o[t] = { id: t, deps: e, factory: n, defined: 0, exports: {}, require: i(t) };
    }, t = i("");
  }();var n = "__dirty",
      i = "lineWidth",
      r = "applyTransform",
      a = "getBoundingRect",
      o = "undefined",
      s = "center",
      l = "option",
      u = "rotation",
      c = "textAlign",
      h = "getFont",
      d = "getTextColor",
      f = "textStyle",
      p = "getName",
      m = "parsePercent",
      v = "opacity",
      g = "../../echarts",
      y = "retrieve",
      x = "category",
      _ = "coordDimToDataDim",
      b = "getShallow",
      w = "getItemModel",
      M = "getRawValue",
      S = "ordinal",
      A = "position",
      P = "getItemGraphicEl",
      T = "getLineStyle",
      C = "eachItemGraphicEl",
      k = "getItemLayout",
      L = "offset",
      I = "dataToCoord",
      D = "toGlobalCoord",
      z = "middle",
      O = "getAxis",
      R = "../../util/model",
      E = "../../util/graphic",
      N = "getContext",
      B = "getDataExtent",
      V = "getExtent",
      F = "ecModel",
      Z = "normalize",
      G = "contain",
      H = "removeAll",
      q = "isString",
      W = "inherits",
      U = "number",
      X = "dimensions",
      j = "function",
      Y = "isArray",
      $ = "replace",
      Q = "parent",
      K = "zlevel",
      J = "setStyle",
      te = "traverse",
      ee = "getDataParams",
      ne = "seriesIndex",
      ie = "mouseout",
      re = "mouseover",
      ae = "splice",
      oe = "dispose",
      se = "componentIndex",
      le = "mainType",
      ue = "trigger",
      ce = "defaults",
      he = "extend",
      de = "remove",
      fe = "series",
      pe = "concat",
      me = "eachSeries",
      ve = "colorStops",
      ge = "update",
      ye = "create",
      xe = "getItemVisual",
      _e = "coordinateSystem",
      be = "indexOf",
      we = "length",
      Me = "bottom",
      Se = "ignore",
      Ae = "eachComponent",
      Pe = "stopAnimation",
      Te = "getHeight",
      Ce = "getWidth",
      ke = "getModel",
      Le = "isObject",
      Ie = "animation",
      De = "height",
      ze = "canvas",
      Oe = "string",
      Re = "prototype",
      Ee = "toLowerCase",
      Ne = "./helper",
      Be = "zrender/core/vector",
      Ve = "getData",
      Fe = "zrender/core/util",
      Ze = "require";e("echarts/chart/line", [Ze, Fe, "../echarts", "./line/LineSeries", "./line/LineView", "../visual/symbol", "../layout/points", "../processor/dataSample", "../component/gridSimple"], function (t) {
    var e = t(Fe),
        n = t("../echarts"),
        i = n.PRIORITY;t("./line/LineSeries"), t("./line/LineView"), n.registerVisual(e.curry(t("../visual/symbol"), "line", "circle", "line")), n.registerLayout(e.curry(t("../layout/points"), "line")), n.registerProcessor(i.PROCESSOR.STATISTIC, e.curry(t("../processor/dataSample"), "line")), t("../component/gridSimple");
  }), e("echarts/chart/bar", [Ze, Fe, "../coord/cartesian/Grid", "./bar/BarSeries", "./bar/BarView", "../layout/barGrid", "../echarts", "../component/gridSimple"], function (t) {
    var e = t(Fe);t("../coord/cartesian/Grid"), t("./bar/BarSeries"), t("./bar/BarView");var n = t("../layout/barGrid"),
        i = t("../echarts");i.registerLayout(e.curry(n, "bar")), i.registerVisual(function (t) {
      t.eachSeriesByType("bar", function (t) {
        var e = t[Ve]();e.setVisual("legendSymbol", "roundRect");
      });
    }), t("../component/gridSimple");
  }), e("echarts/chart/pie", [Ze, Fe, "../echarts", "./pie/PieSeries", "./pie/PieView", "../action/createDataSelectAction", "../visual/dataColor", "./pie/pieLayout", "../processor/dataFilter"], function (t) {
    var e = t(Fe),
        n = t("../echarts");t("./pie/PieSeries"), t("./pie/PieView"), t("../action/createDataSelectAction")("pie", [{ type: "pieToggleSelect", event: "pieselectchanged", method: "toggleSelected" }, { type: "pieSelect", event: "pieselected", method: "select" }, { type: "pieUnSelect", event: "pieunselected", method: "unSelect" }]), n.registerVisual(e.curry(t("../visual/dataColor"), "pie")), n.registerLayout(e.curry(t("./pie/pieLayout"), "pie")), n.registerProcessor(e.curry(t("../processor/dataFilter"), "pie"));
  }), e("echarts/echarts", [Ze, "zrender/core/env", "./model/Global", "./ExtensionAPI", "./CoordinateSystem", "./model/OptionManager", "./model/Component", "./model/Series", "./view/Component", "./view/Chart", "./util/graphic", "./util/model", "./util/throttle", "zrender", Fe, "zrender/tool/color", "zrender/mixin/Eventful", "zrender/core/timsort", "./visual/seriesColor", "./preprocessor/backwardCompat", "./loading/default", "./data/List", "./model/Model", "./coord/Axis", "./util/number", "./util/format", "zrender/core/matrix", Be, Ne], function (t) {
    function e(t) {
      return function (e, n, i) {
        e = e && e[Ee](), E[Re][t].call(this, e, n, i);
      };
    }function n() {
      E.call(this);
    }function i(t, e, i) {
      function r(t, e) {
        return t.prio - e.prio;
      }i = i || {}, typeof e === Oe && (e = nn[e]), this.id, this.group, this._dom = t;var a = this._zr = z.init(t, { renderer: i.renderer || ze, devicePixelRatio: i.devicePixelRatio, width: i.width, height: i[De] });this._throttledZrFlush = D.throttle(O.bind(a.flush, a), 17), this._theme = O.clone(e), this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new S(), this._api = x(this), E.call(this), this._messageCenter = new n(), this._initEvents(), this.resize = O.bind(this.resize, this), this._pendingActions = [], N(en, r), N(Ke, r), a[Ie].on("frame", this._onframe, this), O.setAsPrimitive(this);
    }function r(t, e, n) {
      var i,
          r = this._model,
          a = this._coordSysMgr.getCoordinateSystems();e = I.parseFinder(r, e);for (var o = 0; o < a[we]; o++) {
        var s = a[o];if (s[t] && null != (i = s[t](r, e, n))) return i;
      }
    }function a(t, e, n, i, r) {
      function a(i) {
        i && i.__alive && i[e] && i[e](i.__model, o, t._api, n);
      }var o = t._model;if (!i) return void B(t._componentsViews[pe](t._chartsViews), a);var s = {};s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];var l = { mainType: i, query: s };r && (l.subType = r), o && o[Ae](l, function (e) {
        a(t[i === fe ? "_chartsMap" : "_componentsMap"][e.__viewId]);
      }, t);
    }function o(t, e) {
      var n = t.type,
          i = t.escapeConnect,
          r = $e[n],
          o = r.actionInfo,
          s = (o[ge] || ge).split(":"),
          l = s.pop();s = null != s[0] && V(s[0]), this[He] = !0;var u = [t],
          c = !1;t.batch && (c = !0, u = O.map(t.batch, function (e) {
        return e = O[ce](O[he]({}, e), t), e.batch = null, e;
      }));var h,
          d = [],
          f = "highlight" === n || "downplay" === n;B(u, function (t) {
        h = r.action(t, this._model, this._api), h = h || O[he]({}, t), h.type = o.event || h.type, d.push(h), f ? a(this, l, t, fe) : s && a(this, l, t, s.main, s.sub);
      }, this), "none" === l || f || s || (this[We] ? (je.prepareAndUpdate.call(this, t), this[We] = !1) : je[l].call(this, t)), h = c ? { type: o.event || n, escapeConnect: i, batch: d } : d[0], this[He] = !1, !e && this._messageCenter[ue](h.type, h);
    }function s(t) {
      for (var e = this._pendingActions; e[we];) {
        var n = e.shift();o.call(this, n, t);
      }
    }function l(t) {
      !t && this[ue]("updated");
    }function u(t, e, n) {
      var i = this._api;B(this._componentsViews, function (r) {
        var a = r.__model;r[t](a, e, i, n), y(a, r);
      }, this), e[me](function (r) {
        var a = this._chartsMap[r.__viewId];a[t](r, e, i, n), y(r, a), g(r, a);
      }, this), v(this._zr, e), B(tn, function (t) {
        t(e, i);
      });
    }function c(t, e) {
      for (var n = "component" === t, i = n ? this._componentsViews : this._chartsViews, r = n ? this._componentsMap : this._chartsMap, a = this._zr, o = 0; o < i[we]; o++) i[o].__alive = !1;e[n ? Ae : me](function (t, o) {
        if (n) {
          if (t === fe) return;
        } else o = t;var s = "_ec_" + o.id + "_" + o.type,
            l = r[s];if (!l) {
          var u = V(o.type),
              c = n ? C.getClass(u.main, u.sub) : k.getClass(u.sub);if (!c) return;l = new c(), l.init(e, this._api), r[s] = l, i.push(l), a.add(l.group);
        }o.__viewId = l.__id = s, l.__alive = !0, l.__model = o, l.group.__ecComponentInfo = { mainType: o[le], index: o[se] };
      }, this);for (var o = 0; o < i[we];) {
        var s = i[o];s.__alive ? o++ : (a[de](s.group), s[oe](e, this._api), i[ae](o, 1), delete r[s.__id], s.__id = s.group.__ecComponentInfo = null);
      }
    }function h(t, e) {
      B(Ke, function (n) {
        n.func(t, e);
      });
    }function d(t) {
      var e = {};t[me](function (t) {
        var n = t.get("stack"),
            i = t[Ve]();if (n && "list" === i.type) {
          var r = e[n];e.hasOwnProperty(n) && r && (i.stackedOn = r), e[n] = i;
        }
      });
    }function f(t, e) {
      var n = this._api;B(en, function (i) {
        i.isLayout && i.func(t, n, e);
      });
    }function p(t, e, n) {
      var i = this._api;t.clearColorPalette(), t[me](function (t) {
        t.clearColorPalette();
      }), B(en, function (r) {
        (!n || !r.isLayout) && r.func(t, i, e);
      });
    }function m(t, e) {
      var n = this._api;B(this._componentsViews, function (i) {
        var r = i.__model;i.render(r, t, n, e), y(r, i);
      }, this), B(this._chartsViews, function (t) {
        t.__alive = !1;
      }, this), t[me](function (i) {
        var r = this._chartsMap[i.__viewId];r.__alive = !0, r.render(i, t, n, e), r.group.silent = !!i.get("silent"), y(i, r), g(i, r);
      }, this), v(this._zr, t), B(this._chartsViews, function (e) {
        e.__alive || e[de](t, n);
      }, this);
    }function v(t, e) {
      var n = t.storage,
          i = 0;n[te](function (t) {
        t.isGroup || i++;
      }), i > e.get("hoverLayerThreshold") && !b.node && n[te](function (t) {
        t.isGroup || (t.useHoverLayer = !0);
      });
    }function g(t, e) {
      var n = 0;e.group[te](function (t) {
        "group" === t.type || t[Se] || n++;
      });var i = +t.get("progressive"),
          r = n > t.get("progressiveThreshold") && i && !b.node;r && e.group[te](function (t) {
        t.isGroup || (t.progressive = r ? Math.floor(n++ / i) : -1, r && t[Pe](!0));
      });var a = t.get("blendMode") || null;e.group[te](function (t) {
        t.isGroup || t[J]("blend", a);
      });
    }function y(t, e) {
      var n = t.get("z"),
          i = t.get(K);e.group[te](function (t) {
        "group" !== t.type && (null != n && (t.z = n), null != i && (t[K] = i));
      });
    }function x(t) {
      var e = t._coordSysMgr;return O[he](new M(t), { getCoordinateSystems: O.bind(e.getCoordinateSystems, e), getComponentByElement: function (e) {
          for (; e;) {
            var n = e.__ecComponentInfo;if (null != n) return t._model.getComponent(n[le], n.index);e = e[Q];
          }
        } });
    }function _(t) {
      function e(t, e) {
        for (var n = 0; n < t[we]; n++) {
          var i = t[n];i[a] = e;
        }
      }var n = 0,
          i = 1,
          r = 2,
          a = "__connectUpdateStatus";O.each(Qe, function (o, s) {
        t._messageCenter.on(s, function (o) {
          if (on[t.group] && t[a] !== n) {
            if (o && o.escapeConnect) return;var s = t.makeActionFromEvent(o),
                l = [];O.each(an, function (e) {
              e !== t && e.group === t.group && l.push(e);
            }), e(l, n), B(l, function (t) {
              t[a] !== i && t.dispatchAction(s);
            }), e(l, r);
          }
        });
      });
    }var b = t("zrender/core/env"),
        w = t("./model/Global"),
        M = t("./ExtensionAPI"),
        S = t("./CoordinateSystem"),
        A = t("./model/OptionManager"),
        P = t("./model/Component"),
        T = t("./model/Series"),
        C = t("./view/Component"),
        k = t("./view/Chart"),
        L = t("./util/graphic"),
        I = t("./util/model"),
        D = t("./util/throttle"),
        z = t("zrender"),
        O = t(Fe),
        R = t("zrender/tool/color"),
        E = t("zrender/mixin/Eventful"),
        N = t("zrender/core/timsort"),
        B = O.each,
        V = P.parseClassType,
        F = 1e3,
        Z = 5e3,
        G = 1e3,
        H = 2e3,
        $ = 3e3,
        Ze = 4e3,
        Ge = 5e3,
        He = "__flagInMainProcess",
        qe = "__hasGradientOrPatternBg",
        We = "__optionUpdated",
        Ue = /^[a-zA-Z0-9_]+$/;n[Re].on = e("on"), n[Re].off = e("off"), n[Re].one = e("one"), O.mixin(n, E);var Xe = i[Re];Xe._onframe = function () {
      if (this[We]) {
        var t = this[We].silent;this[He] = !0, je.prepareAndUpdate.call(this), this[He] = !1, this[We] = !1, s.call(this, t), l.call(this, t);
      }
    }, Xe.getDom = function () {
      return this._dom;
    }, Xe.getZr = function () {
      return this._zr;
    }, Xe.setOption = function (t, e, n) {
      var i;if (O[Le](e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[He] = !0, !this._model || e) {
        var r = new A(this._api),
            a = this._theme,
            o = this._model = new w(null, null, a, r);o.init(null, null, a, r);
      }this._model.setOption(t, Je), n ? (this[We] = { silent: i }, this[He] = !1) : (je.prepareAndUpdate.call(this), this._zr.flush(), this[We] = !1, this[He] = !1, s.call(this, i), l.call(this, i));
    }, Xe.setTheme = function () {
      console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    }, Xe[ke] = function () {
      return this._model;
    }, Xe.getOption = function () {
      return this._model && this._model.getOption();
    }, Xe[Ce] = function () {
      return this._zr[Ce]();
    }, Xe[Te] = function () {
      return this._zr[Te]();
    }, Xe.getDevicePixelRatio = function () {
      return this._zr.painter.dpr || window.devicePixelRatio || 1;
    }, Xe.getRenderedCanvas = function (t) {
      if (b.canvasSupported) {
        t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");var e = this._zr,
            n = e.storage.getDisplayList();return O.each(n, function (t) {
          t[Pe](!0);
        }), e.painter.getRenderedCanvas(t);
      }
    }, Xe.getDataURL = function (t) {
      t = t || {};var e = t.excludeComponents,
          n = this._model,
          i = [],
          r = this;B(e, function (t) {
        n[Ae]({ mainType: t }, function (t) {
          var e = r._componentsMap[t.__viewId];e.group[Se] || (i.push(e), e.group[Se] = !0);
        });
      });var a = this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));return B(i, function (t) {
        t.group[Se] = !1;
      }), a;
    }, Xe.getConnectedDataURL = function (t) {
      if (b.canvasSupported) {
        var e = this.group,
            n = Math.min,
            i = Math.max,
            r = 1 / 0;if (on[e]) {
          var a = r,
              o = r,
              s = -r,
              l = -r,
              u = [],
              c = t && t.pixelRatio || 1;O.each(an, function (r) {
            if (r.group === e) {
              var c = r.getRenderedCanvas(O.clone(t)),
                  h = r.getDom().getBoundingClientRect();a = n(h.left, a), o = n(h.top, o), s = i(h.right, s), l = i(h[Me], l), u.push({ dom: c, left: h.left, top: h.top });
            }
          }), a *= c, o *= c, s *= c, l *= c;var h = s - a,
              d = l - o,
              f = O.createCanvas();f.width = h, f[De] = d;var p = z.init(f);return B(u, function (t) {
            var e = new L.Image({ style: { x: t.left * c - a, y: t.top * c - o, image: t.dom } });p.add(e);
          }), p.refreshImmediately(), f.toDataURL("image/" + (t && t.type || "png"));
        }return this.getDataURL(t);
      }
    }, Xe.convertToPixel = O.curry(r, "convertToPixel"), Xe.convertFromPixel = O.curry(r, "convertFromPixel"), Xe.containPixel = function (t, e) {
      var n,
          i = this._model;return t = I.parseFinder(i, t), O.each(t, function (t, i) {
        i[be]("Models") >= 0 && O.each(t, function (t) {
          var r = t[_e];if (r && r.containPoint) n |= !!r.containPoint(e);else if ("seriesModels" === i) {
            var a = this._chartsMap[t.__viewId];a && a.containPoint && (n |= a.containPoint(e, t));
          }
        }, this);
      }, this), !!n;
    }, Xe.getVisual = function (t, e) {
      var n = this._model;t = I.parseFinder(n, t, { defaultMainType: "series" });var i = t.seriesModel,
          r = i[Ve](),
          a = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;return null != a ? r[xe](a, e) : r.getVisual(e);
    }, Xe.getViewOfComponentModel = function (t) {
      return this._componentsMap[t.__viewId];
    }, Xe.getViewOfSeriesModel = function (t) {
      return this._chartsMap[t.__viewId];
    };var je = { update: function (t) {
        var e = this._model,
            n = this._api,
            i = this._coordSysMgr,
            r = this._zr;if (e) {
          e.restoreData(), i[ye](this._model, this._api), h.call(this, e, n), d.call(this, e), i[ge](e, n), p.call(this, e, t), m.call(this, e, t);var a = e.get("backgroundColor") || "transparent",
              o = r.painter;if (o.isSingleCanvas && o.isSingleCanvas()) r.configLayer(0, { clearColor: a });else {
            if (!b.canvasSupported) {
              var s = R.parse(a);a = R.stringify(s, "rgb"), 0 === s[3] && (a = "transparent");
            }a[ve] || a.image ? (r.configLayer(0, { clearColor: a }), this[qe] = !0, this._dom.style.background = "transparent") : (this[qe] && r.configLayer(0, { clearColor: null }), this[qe] = !1, this._dom.style.background = a);
          }B(tn, function (t) {
            t(e, n);
          });
        }
      }, updateView: function (t) {
        var e = this._model;e && (e[me](function (t) {
          t[Ve]().clearAllVisual();
        }), p.call(this, e, t), u.call(this, "updateView", e, t));
      }, updateVisual: function (t) {
        var e = this._model;e && (e[me](function (t) {
          t[Ve]().clearAllVisual();
        }), p.call(this, e, t, !0), u.call(this, "updateVisual", e, t));
      }, updateLayout: function (t) {
        var e = this._model;e && (f.call(this, e, t), u.call(this, "updateLayout", e, t));
      }, prepareAndUpdate: function (t) {
        var e = this._model;c.call(this, "component", e), c.call(this, "chart", e), je[ge].call(this, t);
      } };Xe.resize = function (t) {
      this[He] = !0, this._zr.resize(t);var e = this._model && this._model.resetOption("media"),
          n = e ? "prepareAndUpdate" : ge;je[n].call(this), this._loadingFX && this._loadingFX.resize(), this[He] = !1;var i = t && t.silent;s.call(this, i), l.call(this, i);
    }, Xe.showLoading = function (t, e) {
      if (O[Le](t) && (e = t, t = ""), t = t || "default", this.hideLoading(), rn[t]) {
        var n = rn[t](this._api, e),
            i = this._zr;this._loadingFX = n, i.add(n);
      }
    }, Xe.hideLoading = function () {
      this._loadingFX && this._zr[de](this._loadingFX), this._loadingFX = null;
    }, Xe.makeActionFromEvent = function (t) {
      var e = O[he]({}, t);return e.type = Qe[t.type], e;
    }, Xe.dispatchAction = function (t, e) {
      if (O[Le](e) || (e = { silent: !!e }), $e[t.type]) {
        if (this[He]) return void this._pendingActions.push(t);o.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : e.flush !== !1 && b.browser.weChat && this._throttledZrFlush(), s.call(this, e.silent), l.call(this, e.silent);
      }
    }, Xe.on = e("on"), Xe.off = e("off"), Xe.one = e("one");var Ye = ["click", "dblclick", re, ie, "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];Xe._initEvents = function () {
      B(Ye, function (t) {
        this._zr.on(t, function (e) {
          var n,
              i = this[ke](),
              r = e.target;if ("globalout" === t) n = {};else if (r && null != r.dataIndex) {
            var a = r.dataModel || i.getSeriesByIndex(r[ne]);n = a && a[ee](r.dataIndex, r.dataType) || {};
          } else r && r.eventData && (n = O[he]({}, r.eventData));n && (n.event = e, n.type = t, this[ue](t, n));
        }, this);
      }, this), B(Qe, function (t, e) {
        this._messageCenter.on(e, function (t) {
          this[ue](e, t);
        }, this);
      }, this);
    }, Xe.isDisposed = function () {
      return this._disposed;
    }, Xe.clear = function () {
      this.setOption({ series: [] }, !0);
    }, Xe[oe] = function () {
      if (!this._disposed) {
        this._disposed = !0;var t = this._api,
            e = this._model;B(this._componentsViews, function (n) {
          n[oe](e, t);
        }), B(this._chartsViews, function (n) {
          n[oe](e, t);
        }), this._zr[oe](), delete an[this.id];
      }
    }, O.mixin(i, E);var $e = {},
        Qe = {},
        Ke = [],
        Je = [],
        tn = [],
        en = [],
        nn = {},
        rn = {},
        an = {},
        on = {},
        sn = new Date() - 0,
        ln = new Date() - 0,
        un = "_echarts_instance_",
        cn = { version: "3.6.2", dependencies: { zrender: "3.5.2" } };return cn.init = function (t, e, n) {
      var r = cn.getInstanceByDom(t);if (r) return r;var a = new i(t, e, n);return a.id = "ec_" + sn++, an[a.id] = a, t.setAttribute ? t.setAttribute(un, a.id) : t[un] = a.id, _(a), a;
    }, cn.connect = function (t) {
      if (O[Y](t)) {
        var e = t;t = null, O.each(e, function (e) {
          null != e.group && (t = e.group);
        }), t = t || "g_" + ln++, O.each(e, function (e) {
          e.group = t;
        });
      }return on[t] = !0, t;
    }, cn.disConnect = function (t) {
      on[t] = !1;
    }, cn.disconnect = cn.disConnect, cn[oe] = function (t) {
      typeof t === Oe ? t = an[t] : t instanceof i || (t = cn.getInstanceByDom(t)), t instanceof i && !t.isDisposed() && t[oe]();
    }, cn.getInstanceByDom = function (t) {
      var e;return e = t.getAttribute ? t.getAttribute(un) : t[un], an[e];
    }, cn.getInstanceById = function (t) {
      return an[t];
    }, cn.registerTheme = function (t, e) {
      nn[t] = e;
    }, cn.registerPreprocessor = function (t) {
      Je.push(t);
    }, cn.registerProcessor = function (t, e) {
      typeof t === j && (e = t, t = F), Ke.push({ prio: t, func: e });
    }, cn.registerPostUpdate = function (t) {
      tn.push(t);
    }, cn.registerAction = function (t, e, n) {
      typeof e === j && (n = e, e = "");var i = O[Le](t) ? t.type : [t, t = { event: e }][0];t.event = (t.event || i)[Ee](), e = t.event, O.assert(Ue.test(i) && Ue.test(e)), $e[i] || ($e[i] = { action: n, actionInfo: t }), Qe[e] = i;
    }, cn.registerCoordinateSystem = function (t, e) {
      S.register(t, e);
    }, cn.getCoordinateSystemDimensions = function (t) {
      var e = S.get(t);return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e[X].slice() : void 0;
    }, cn.registerLayout = function (t, e) {
      typeof t === j && (e = t, t = G), en.push({ prio: t, func: e, isLayout: !0 });
    }, cn.registerVisual = function (t, e) {
      typeof t === j && (e = t, t = $), en.push({ prio: t, func: e });
    }, cn.registerLoading = function (t, e) {
      rn[t] = e;
    }, cn.extendComponentModel = function (t) {
      return P[he](t);
    }, cn.extendComponentView = function (t) {
      return C[he](t);
    }, cn.extendSeriesModel = function (t) {
      return T[he](t);
    }, cn.extendChartView = function (t) {
      return k[he](t);
    }, cn.setCanvasCreator = function (t) {
      O.createCanvas = t;
    }, cn.registerVisual(H, t("./visual/seriesColor")), cn.registerPreprocessor(t("./preprocessor/backwardCompat")), cn.registerLoading("default", t("./loading/default")), cn.registerAction({ type: "highlight", event: "highlight", update: "highlight" }, O.noop), cn.registerAction({ type: "downplay", event: "downplay", update: "downplay" }, O.noop), cn.zrender = z, cn.List = t("./data/List"), cn.Model = t("./model/Model"), cn.Axis = t("./coord/Axis"), cn.graphic = t("./util/graphic"), cn[U] = t("./util/number"), cn.format = t("./util/format"), cn.throttle = D.throttle, cn.matrix = t("zrender/core/matrix"), cn.vector = t(Be), cn.color = t("zrender/tool/color"), cn.util = {}, B(["map", "each", "filter", be, W, "reduce", "filter", "bind", "curry", Y, q, Le, "isFunction", he, ce, "clone", "merge"], function (t) {
      cn.util[t] = O[t];
    }), cn.helper = t(Ne), cn.PRIORITY = { PROCESSOR: { FILTER: F, STATISTIC: Z }, VISUAL: { LAYOUT: G, GLOBAL: H, CHART: $, COMPONENT: Ze, BRUSH: Ge } }, cn;
  }), e("echarts/component/legend", [Ze, "./legend/LegendModel", "./legend/legendAction", "./legend/LegendView", "../echarts", "./legend/legendFilter"], function (t) {
    t("./legend/LegendModel"), t("./legend/legendAction"), t("./legend/LegendView");var e = t("../echarts");e.registerProcessor(t("./legend/legendFilter"));
  }), e("echarts/component/gridSimple", [Ze, "../util/graphic", Fe, "../echarts", "../coord/cartesian/Grid", "./axis"], function (t) {
    var e = t("../util/graphic"),
        n = t(Fe),
        i = t("../echarts");t("../coord/cartesian/Grid"), t("./axis"), i.extendComponentView({ type: "grid", render: function (t) {
        this.group[H](), t.get("show") && this.group.add(new e.Rect({ shape: t[_e].getRect(), style: n[ce]({ fill: t.get("backgroundColor") }, t.getItemStyle()), silent: !0, z2: -1 }));
      } }), i.registerPreprocessor(function (t) {
      t.xAxis && t.yAxis && !t.grid && (t.grid = {});
    });
  }), e("echarts/component/markPoint", [Ze, "./marker/MarkPointModel", "./marker/MarkPointView", "../echarts"], function (t) {
    t("./marker/MarkPointModel"), t("./marker/MarkPointView"), t("../echarts").registerPreprocessor(function (t) {
      t.markPoint = t.markPoint || {};
    });
  }), e("echarts/component/markLine", [Ze, "./marker/MarkLineModel", "./marker/MarkLineView", "../echarts"], function (t) {
    t("./marker/MarkLineModel"), t("./marker/MarkLineView"), t("../echarts").registerPreprocessor(function (t) {
      t.markLine = t.markLine || {};
    });
  }), e("echarts/component/dataZoom", [Ze, "./dataZoom/typeDefaulter", "./dataZoom/DataZoomModel", "./dataZoom/DataZoomView", "./dataZoom/SliderZoomModel", "./dataZoom/SliderZoomView", "./dataZoom/InsideZoomModel", "./dataZoom/InsideZoomView", "./dataZoom/dataZoomProcessor", "./dataZoom/dataZoomAction"], function (t) {
    t("./dataZoom/typeDefaulter"), t("./dataZoom/DataZoomModel"), t("./dataZoom/DataZoomView"), t("./dataZoom/SliderZoomModel"), t("./dataZoom/SliderZoomView"), t("./dataZoom/InsideZoomModel"), t("./dataZoom/InsideZoomView"), t("./dataZoom/dataZoomProcessor"), t("./dataZoom/dataZoomAction");
  }), e("echarts/scale/Time", [Ze, Fe, "../util/number", "../util/format", Ne, "./Interval"], function (t) {
    var e = t(Fe),
        n = t("../util/number"),
        i = t("../util/format"),
        r = t(Ne),
        a = t("./Interval"),
        o = a[Re],
        s = Math.ceil,
        l = Math.floor,
        u = 1e3,
        c = 60 * u,
        h = 60 * c,
        d = 24 * h,
        f = function (t, e, n, i) {
      for (; i > n;) {
        var r = n + i >>> 1;t[r][2] < e ? n = r + 1 : i = r;
      }return n;
    },
        p = a[he]({ type: "time", getLabel: function (t) {
        var e = this._stepLvl,
            n = new Date(t);return i.formatTime(e[0], n, this.getSetting("useUTC"));
      }, niceExtent: function (t) {
        var e = this._extent;if (e[0] === e[1] && (e[0] -= d, e[1] += d), e[1] === -1 / 0 && 1 / 0 === e[0]) {
          var i = new Date();e[1] = new Date(i.getFullYear(), i.getMonth(), i.getDate()), e[0] = e[1] - d;
        }this.niceTicks(t.splitNumber);var r = this._interval;t.fixMin || (e[0] = n.round(l(e[0] / r) * r)), t.fixMax || (e[1] = n.round(s(e[1] / r) * r));
      }, niceTicks: function (t) {
        var e = this.getSetting("useUTC") ? 0 : 60 * n.getTimezoneOffset() * 1e3;t = t || 10;var i = this._extent,
            a = i[1] - i[0],
            o = a / t,
            u = m[we],
            c = f(m, o, 0, u),
            h = m[Math.min(c, u - 1)],
            d = h[2];if ("year" === h[0]) {
          var p = a / d,
              v = n.nice(p / t, !0);d *= v;
        }var g = [Math.round(s((i[0] - e) / d) * d + e), Math.round(l((i[1] - e) / d) * d + e)];r.fixExtent(g, i), this._stepLvl = h, this._interval = d, this._niceExtent = g;
      }, parse: function (t) {
        return +n.parseDate(t);
      } });e.each([G, Z], function (t) {
      p[Re][t] = function (e) {
        return o[t].call(this, this.parse(e));
      };
    });var m = [["hh:mm:ss", 1, u], ["hh:mm:ss", 5, 5 * u], ["hh:mm:ss", 10, 10 * u], ["hh:mm:ss", 15, 15 * u], ["hh:mm:ss", 30, 30 * u], ["hh:mm\nMM-dd", 1, c], ["hh:mm\nMM-dd", 5, 5 * c], ["hh:mm\nMM-dd", 10, 10 * c], ["hh:mm\nMM-dd", 15, 15 * c], ["hh:mm\nMM-dd", 30, 30 * c], ["hh:mm\nMM-dd", 1, h], ["hh:mm\nMM-dd", 2, 2 * h], ["hh:mm\nMM-dd", 6, 6 * h], ["hh:mm\nMM-dd", 12, 12 * h], ["MM-dd\nyyyy", 1, d], ["week", 7, 7 * d], ["month", 1, 31 * d], ["quarter", 3, 380 * d / 4], ["half-year", 6, 380 * d / 2], ["year", 1, 380 * d]];return p[ye] = function (t) {
      return new p({ useUTC: t[F].get("useUTC") });
    }, p;
  }), e("echarts/scale/Log", [Ze, Fe, "./Scale", "../util/number", "./Interval"], function (t) {
    function e(t, e) {
      return u(t, l(e));
    }var n = t(Fe),
        i = t("./Scale"),
        r = t("../util/number"),
        a = t("./Interval"),
        o = i[Re],
        s = a[Re],
        l = r.getPrecisionSafe,
        u = r.round,
        c = Math.floor,
        h = Math.ceil,
        d = Math.pow,
        f = Math.log,
        p = i[he]({ type: "log", base: 10, $constructor: function () {
        i.apply(this, arguments), this._originalScale = new a();
      }, getTicks: function () {
        var t = this._originalScale,
            i = this._extent,
            a = t[V]();return n.map(s.getTicks.call(this), function (n) {
          var o = r.round(d(this.base, n));return o = n === i[0] && t.__fixMin ? e(o, a[0]) : o, o = n === i[1] && t.__fixMax ? e(o, a[1]) : o;
        }, this);
      }, getLabel: s.getLabel, scale: function (t) {
        return t = o.scale.call(this, t), d(this.base, t);
      }, setExtent: function (t, e) {
        var n = this.base;t = f(t) / f(n), e = f(e) / f(n), s.setExtent.call(this, t, e);
      }, getExtent: function () {
        var t = this.base,
            n = o[V].call(this);n[0] = d(t, n[0]), n[1] = d(t, n[1]);var i = this._originalScale,
            r = i[V]();return i.__fixMin && (n[0] = e(n[0], r[0])), i.__fixMax && (n[1] = e(n[1], r[1])), n;
      }, unionExtent: function (t) {
        this._originalScale.unionExtent(t);var e = this.base;t[0] = f(t[0]) / f(e), t[1] = f(t[1]) / f(e), o.unionExtent.call(this, t);
      }, unionExtentFromData: function (t, e) {
        this.unionExtent(t[B](e, !0, function (t) {
          return t > 0;
        }));
      }, niceTicks: function (t) {
        t = t || 10;var e = this._extent,
            n = e[1] - e[0];if (!(1 / 0 === n || 0 >= n)) {
          var i = r.quantity(n),
              a = t / n * i;for (.5 >= a && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0;) i *= 10;var o = [r.round(h(e[0] / i) * i), r.round(c(e[1] / i) * i)];this._interval = i, this._niceExtent = o;
        }
      }, niceExtent: function (t) {
        s.niceExtent.call(this, t);var e = this._originalScale;e.__fixMin = t.fixMin, e.__fixMax = t.fixMax;
      } });return n.each([G, Z], function (t) {
      p[Re][t] = function (e) {
        return e = f(e) / f(this.base), o[t].call(this, e);
      };
    }), p[ye] = function () {
      return new p();
    }, p;
  }), e(Fe, [Ze], function () {
    function t(e) {
      if (null == e || "object" != typeof e) return e;var n = e,
          i = R.call(e);if ("[object Array]" === i) {
        n = [];for (var r = 0, a = e[we]; a > r; r++) n[r] = t(e[r]);
      } else if (O[i]) n = e.constructor.from(e);else if (!z[i] && !k(e) && !M(e)) {
        n = {};for (var o in e) e.hasOwnProperty(o) && (n[o] = t(e[o]));
      }return n;
    }function e(n, i, r) {
      if (!b(i) || !b(n)) return r ? t(i) : n;for (var a in i) if (i.hasOwnProperty(a)) {
        var o = n[a],
            s = i[a];!b(s) || !b(o) || y(s) || y(o) || M(s) || M(o) || w(s) || w(o) || k(s) || k(o) ? !r && a in n || (n[a] = t(i[a], !0)) : e(o, s, r);
      }return n;
    }function n(t, n) {
      for (var i = t[0], r = 1, a = t[we]; a > r; r++) i = e(i, t[r], n);return i;
    }function i(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);return t;
    }function r(t, e, n) {
      for (var i in e) e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);return t;
    }function a() {
      return document.createElement(ze);
    }function o() {
      return D || (D = X.createCanvas()[N]("2d")), D;
    }function s(t, e) {
      if (t) {
        if (t[be]) return t[be](e);for (var n = 0, i = t[we]; i > n; n++) if (t[n] === e) return n;
      }return -1;
    }function l(t, e) {
      function n() {}var i = t[Re];n[Re] = e[Re], t[Re] = new n();for (var r in i) t[Re][r] = i[r];t[Re].constructor = t, t.superClass = e;
    }function u(t, e, n) {
      t = Re in t ? t[Re] : t, e = Re in e ? e[Re] : e, r(t, e, n);
    }function c(t) {
      return t ? typeof t == Oe ? !1 : typeof t[we] == U : void 0;
    }function h(t, e, n) {
      if (t && e) if (t.forEach && t.forEach === B) t.forEach(e, n);else if (t[we] === +t[we]) for (var i = 0, r = t[we]; r > i; i++) e.call(n, t[i], i, t);else for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t);
    }function d(t, e, n) {
      if (t && e) {
        if (t.map && t.map === Z) return t.map(e, n);for (var i = [], r = 0, a = t[we]; a > r; r++) i.push(e.call(n, t[r], r, t));return i;
      }
    }function f(t, e, n, i) {
      if (t && e) {
        if (t.reduce && t.reduce === G) return t.reduce(e, n, i);for (var r = 0, a = t[we]; a > r; r++) n = e.call(i, n, t[r], r, t);return n;
      }
    }function p(t, e, n) {
      if (t && e) {
        if (t.filter && t.filter === V) return t.filter(e, n);for (var i = [], r = 0, a = t[we]; a > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);return i;
      }
    }function m(t, e, n) {
      if (t && e) for (var i = 0, r = t[we]; r > i; i++) if (e.call(n, t[i], i, t)) return t[i];
    }function v(t, e) {
      var n = F.call(arguments, 2);return function () {
        return t.apply(e, n[pe](F.call(arguments)));
      };
    }function g(t) {
      var e = F.call(arguments, 1);return function () {
        return t.apply(this, e[pe](F.call(arguments)));
      };
    }function y(t) {
      return "[object Array]" === R.call(t);
    }function x(t) {
      return typeof t === j;
    }function _(t) {
      return "[object String]" === R.call(t);
    }function b(t) {
      var e = typeof t;return e === j || !!t && "object" == e;
    }function w(t) {
      return !!z[R.call(t)];
    }function M(t) {
      return "object" == typeof t && typeof t.nodeType === U && "object" == typeof t.ownerDocument;
    }function S(t) {
      return t !== t;
    }function A() {
      for (var t = 0, e = arguments[we]; e > t; t++) if (null != arguments[t]) return arguments[t];
    }function P() {
      return Function.call.apply(F, arguments);
    }function T(t, e) {
      if (!t) throw new Error(e);
    }function C(t) {
      t[H] = !0;
    }function k(t) {
      return t[H];
    }function L(t) {
      t && h(t, function (t, e) {
        this.set(e, t);
      }, this);
    }function I(t) {
      return new L(t);
    }var D,
        z = { "[object Function]": 1, "[object RegExp]": 1, "[object Date]": 1, "[object Error]": 1, "[object CanvasGradient]": 1, "[object CanvasPattern]": 1, "[object Image]": 1, "[object Canvas]": 1 },
        O = { "[object Int8Array]": 1, "[object Uint8Array]": 1, "[object Uint8ClampedArray]": 1, "[object Int16Array]": 1, "[object Uint16Array]": 1, "[object Int32Array]": 1, "[object Uint32Array]": 1, "[object Float32Array]": 1, "[object Float64Array]": 1 },
        R = Object[Re].toString,
        E = Array[Re],
        B = E.forEach,
        V = E.filter,
        F = E.slice,
        Z = E.map,
        G = E.reduce,
        H = "__ec_primitive__",
        q = "_ec_",
        W = 4;L[Re] = { constructor: L, get: function (t) {
        return this[q + t];
      }, set: function (t, e) {
        return this[q + t] = e, e;
      }, each: function (t, e) {
        void 0 !== e && (t = v(t, e));for (var n in this) this.hasOwnProperty(n) && t(this[n], n.slice(W));
      }, removeKey: function (t) {
        delete this[t];
      } };var X = { inherits: l, mixin: u, clone: t, merge: e, mergeAll: n, extend: i, defaults: r, getContext: o, createCanvas: a, indexOf: s, slice: P, find: m, isArrayLike: c, each: h, map: d, reduce: f, filter: p, bind: v, curry: g, isArray: y, isString: _, isObject: b, isFunction: x, isBuiltInObject: w, isDom: M, eqNaN: S, retrieve: A, assert: T, setAsPrimitive: C, createHashMap: I, noop: function () {} };return X;
  }), e("echarts/chart/line/LineSeries", [Ze, "../helper/createListFromArray", "../../model/Series"], function (t) {
    var e = t("../helper/createListFromArray"),
        n = t("../../model/Series");return n[he]({ type: "series.line", dependencies: ["grid", "polar"], getInitialData: function (t, n) {
        return e(t.data, this, n);
      }, defaultOption: { zlevel: 0, z: 2, coordinateSystem: "cartesian2d", legendHoverLink: !0, hoverAnimation: !0, clipOverflow: !0, label: { normal: { position: "top" } }, lineStyle: { normal: { width: 2, type: "solid" } }, step: !1, smooth: !1, smoothMonotone: null, symbol: "emptyCircle", symbolSize: 4, symbolRotate: null, showSymbol: !0, showAllSymbol: !1, connectNulls: !1, sampling: "none", animationEasing: "linear", progressive: 0, hoverLayerThreshold: 1 / 0 } });
  }), e("echarts/chart/line/LineView", [Ze, Fe, "../helper/SymbolDraw", "../helper/Symbol", "./lineAnimationDiff", E, R, "./poly", "../../view/Chart"], function (t) {
    function e(t, e) {
      if (t[we] === e[we]) {
        for (var n = 0; n < t[we]; n++) {
          var i = t[n],
              r = e[n];if (i[0] !== r[0] || i[1] !== r[1]) return;
        }return !0;
      }
    }function n(t) {
      return typeof t === U ? t : t ? .3 : 0;
    }function i(t) {
      var e = t.getGlobalExtent();if (t.onBand) {
        var n = t.getBandWidth() / 2 - 1,
            i = e[1] > e[0] ? 1 : -1;e[0] += i * n, e[1] -= i * n;
      }return e;
    }function r(t) {
      return t >= 0 ? 1 : -1;
    }function a(t, e) {
      var n = t.getBaseAxis(),
          i = t.getOtherAxis(n),
          a = n.onZero ? 0 : i.scale[V]()[0],
          o = i.dim,
          s = "x" === o || "radius" === o ? 1 : 0;return e.mapArray([o], function (i, l) {
        for (var u, c = e.stackedOn; c && r(c.get(o, l)) === r(i);) {
          u = c;break;
        }var h = [];return h[s] = e.get(n.dim, l), h[1 - s] = u ? u.get(o, l, !0) : a, t.dataToPoint(h);
      }, !0);
    }function o(t, e, n) {
      var r = i(t[O]("x")),
          a = i(t[O]("y")),
          o = t.getBaseAxis().isHorizontal(),
          s = Math.min(r[0], r[1]),
          l = Math.min(a[0], a[1]),
          u = Math.max(r[0], r[1]) - s,
          c = Math.max(a[0], a[1]) - l,
          h = n.get("lineStyle.normal.width") || 2,
          d = n.get("clipOverflow") ? h / 2 : Math.max(u, c);o ? (l -= d, c += 2 * d) : (s -= d, u += 2 * d);var f = new m.Rect({ shape: { x: s, y: l, width: u, height: c } });return e && (f.shape[o ? "width" : De] = 0, m.initProps(f, { shape: { width: u, height: c } }, n)), f;
    }function s(t, e, n) {
      var i = t.getAngleAxis(),
          r = t.getRadiusAxis(),
          a = r[V](),
          o = i[V](),
          s = Math.PI / 180,
          l = new m.Sector({ shape: { cx: t.cx, cy: t.cy, r0: a[0], r: a[1], startAngle: -o[0] * s, endAngle: -o[1] * s, clockwise: i.inverse } });return e && (l.shape.endAngle = -o[0] * s, m.initProps(l, { shape: { endAngle: -o[1] * s } }, n)), l;
    }function l(t, e, n) {
      return "polar" === t.type ? s(t, e, n) : o(t, e, n);
    }function u(t, e, n) {
      for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, a = [], o = 0; o < t[we] - 1; o++) {
        var s = t[o + 1],
            l = t[o];a.push(l);var u = [];switch (n) {case "end":
            u[r] = s[r], u[1 - r] = l[1 - r], a.push(u);break;case z:
            var c = (l[r] + s[r]) / 2,
                h = [];u[r] = h[r] = c, u[1 - r] = l[1 - r], h[1 - r] = s[1 - r], a.push(u), a.push(h);break;default:
            u[r] = l[r], u[1 - r] = s[1 - r], a.push(u);}
      }return t[o] && a.push(t[o]), a;
    }function c(t, e) {
      var n = t.getVisual("visualMeta");if (n && n[we] && t.count()) {
        for (var i, r = n[we] - 1; r >= 0; r--) if (n[r].dimension < 2) {
          i = n[r];break;
        }if (i && "cartesian2d" === e.type) {
          var a = i.dimension,
              o = t[X][a],
              s = e[O](o),
              l = h.map(i.stops, function (t) {
            return { coord: s[D](s[I](t.value)), color: t.color };
          }),
              u = l[we],
              c = i.outerColors.slice();u && l[0].coord > l[u - 1].coord && (l.reverse(), c.reverse());var d = 10,
              f = l[0].coord - d,
              p = l[u - 1].coord + d,
              v = p - f;if (.001 > v) return "transparent";h.each(l, function (t) {
            t[L] = (t.coord - f) / v;
          }), l.push({ offset: u ? l[u - 1][L] : .5, color: c[1] || "transparent" }), l.unshift({ offset: u ? l[0][L] : .5, color: c[0] || "transparent" });var g = new m.LinearGradient(0, 0, 0, 0, l, !0);return g[o] = f, g[o + "2"] = p, g;
        }
      }
    }var h = t(Fe),
        d = t("../helper/SymbolDraw"),
        f = t("../helper/Symbol"),
        p = t("./lineAnimationDiff"),
        m = t(E),
        v = t(R),
        g = t("./poly"),
        y = t("../../view/Chart");return y[he]({ type: "line", init: function () {
        var t = new m.Group(),
            e = new d();
        this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t;
      }, render: function (t, i, r) {
        var o = t[_e],
            s = this.group,
            d = t[Ve](),
            f = t[ke]("lineStyle.normal"),
            p = t[ke]("areaStyle.normal"),
            m = d.mapArray(d[k], !0),
            v = "polar" === o.type,
            g = this._coordSys,
            y = this._symbolDraw,
            x = this._polyline,
            _ = this._polygon,
            b = this._lineGroup,
            w = t.get(Ie),
            M = !p.isEmpty(),
            S = a(o, d),
            A = t.get("showSymbol"),
            P = A && !v && !t.get("showAllSymbol") && this._getSymbolIgnoreFunc(d, o),
            L = this._data;L && L[C](function (t, e) {
          t.__temp && (s[de](t), L.setItemGraphicEl(e, null));
        }), A || y[de](), s.add(b);var I = !v && t.get("step");x && g.type === o.type && I === this._step ? (M && !_ ? _ = this._newPolygon(m, S, o, w) : _ && !M && (b[de](_), _ = this._polygon = null), b.setClipPath(l(o, !1, t)), A && y.updateData(d, P), d[C](function (t) {
          t[Pe](!0);
        }), e(this._stackedOnPoints, S) && e(this._points, m) || (w ? this._updateAnimation(d, S, o, r, I) : (I && (m = u(m, o, I), S = u(S, o, I)), x.setShape({ points: m }), _ && _.setShape({ points: m, stackedOnPoints: S })))) : (A && y.updateData(d, P), I && (m = u(m, o, I), S = u(S, o, I)), x = this._newPolyline(m, o, w), M && (_ = this._newPolygon(m, S, o, w)), b.setClipPath(l(o, !0, t)));var D = c(d, o) || d.getVisual("color");x.useStyle(h[ce](f[T](), { fill: "none", stroke: D, lineJoin: "bevel" }));var z = t.get("smooth");if (z = n(t.get("smooth")), x.setShape({ smooth: z, smoothMonotone: t.get("smoothMonotone"), connectNulls: t.get("connectNulls") }), _) {
          var O = d.stackedOn,
              R = 0;if (_.useStyle(h[ce](p.getAreaStyle(), { fill: D, opacity: .7, lineJoin: "bevel" })), O) {
            var E = O.hostModel;R = n(E.get("smooth"));
          }_.setShape({ smooth: z, stackedOnSmooth: R, smoothMonotone: t.get("smoothMonotone"), connectNulls: t.get("connectNulls") });
        }this._data = d, this._coordSys = o, this._stackedOnPoints = S, this._points = m, this._step = I;
      }, dispose: function () {}, highlight: function (t, e, n, i) {
        var r = t[Ve](),
            a = v.queryDataIndex(r, i);if (!(a instanceof Array) && null != a && a >= 0) {
          var o = r[P](a);if (!o) {
            var s = r[k](a);if (!s) return;o = new f(r, a), o[A] = s, o.setZ(t.get(K), t.get("z")), o[Se] = isNaN(s[0]) || isNaN(s[1]), o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o);
          }o.highlight();
        } else y[Re].highlight.call(this, t, e, n, i);
      }, downplay: function (t, e, n, i) {
        var r = t[Ve](),
            a = v.queryDataIndex(r, i);if (null != a && a >= 0) {
          var o = r[P](a);o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group[de](o)) : o.downplay());
        } else y[Re].downplay.call(this, t, e, n, i);
      }, _newPolyline: function (t) {
        var e = this._polyline;return e && this._lineGroup[de](e), e = new g.Polyline({ shape: { points: t }, silent: !0, z2: 10 }), this._lineGroup.add(e), this._polyline = e, e;
      }, _newPolygon: function (t, e) {
        var n = this._polygon;return n && this._lineGroup[de](n), n = new g.Polygon({ shape: { points: t, stackedOnPoints: e }, silent: !0 }), this._lineGroup.add(n), this._polygon = n, n;
      }, _getSymbolIgnoreFunc: function (t, e) {
        var n = e.getAxesByScale(S)[0];return n && n.isLabelIgnored ? h.bind(n.isLabelIgnored, n) : void 0;
      }, _updateAnimation: function (t, e, n, i, r) {
        var a = this._polyline,
            o = this._polygon,
            s = t.hostModel,
            l = p(this._data, t, this._stackedOnPoints, e, this._coordSys, n),
            c = l.current,
            h = l.stackedOnCurrent,
            d = l.next,
            f = l.stackedOnNext;r && (c = u(l.current, n, r), h = u(l.stackedOnCurrent, n, r), d = u(l.next, n, r), f = u(l.stackedOnNext, n, r)), a.shape.__points = l.current, a.shape.points = c, m.updateProps(a, { shape: { points: d } }, s), o && (o.setShape({ points: c, stackedOnPoints: h }), m.updateProps(o, { shape: { points: d, stackedOnPoints: f } }, s));for (var v = [], g = l.status, y = 0; y < g[we]; y++) {
          var x = g[y].cmd;if ("=" === x) {
            var _ = t[P](g[y].idx1);_ && v.push({ el: _, ptIdx: y });
          }
        }a.animators && a.animators[we] && a.animators[0].during(function () {
          for (var t = 0; t < v[we]; t++) {
            var e = v[t].el;e.attr(A, a.shape.__points[v[t].ptIdx]);
          }
        });
      }, remove: function () {
        var t = this.group,
            e = this._data;this._lineGroup[H](), this._symbolDraw[de](!0), e && e[C](function (n, i) {
          n.__temp && (t[de](n), e.setItemGraphicEl(i, null));
        }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;
      } });
  }), e("echarts/visual/symbol", [Ze], function () {
    return function (t, e, n, i) {
      i.eachRawSeriesByType(t, function (t) {
        var r = t[Ve](),
            a = t.get("symbol") || e,
            o = t.get("symbolSize");r.setVisual({ legendSymbol: n || a, symbol: a, symbolSize: o }), i.isSeriesFiltered(t) || (typeof o === j && r.each(function (e) {
          var n = t[M](e),
              i = t[ee](e);r.setItemVisual(e, "symbolSize", o(n, i));
        }), r.each(function (t) {
          var e = r[w](t),
              n = e[b]("symbol", !0),
              i = e[b]("symbolSize", !0);null != n && r.setItemVisual(t, "symbol", n), null != i && r.setItemVisual(t, "symbolSize", i);
        }));
      });
    };
  }), e("echarts/layout/points", [Ze], function () {
    return function (t, e) {
      e.eachSeriesByType(t, function (t) {
        var e = t[Ve](),
            n = t[_e];if (n) {
          for (var i = [], r = n[X], a = 0; a < r[we]; a++) i.push(t[_](n[X][a])[0]);1 === i[we] ? e.each(i[0], function (t, i) {
            e.setItemLayout(i, isNaN(t) ? [0 / 0, 0 / 0] : n.dataToPoint(t));
          }) : 2 === i[we] && e.each(i, function (t, i, r) {
            e.setItemLayout(r, isNaN(t) || isNaN(i) ? [0 / 0, 0 / 0] : n.dataToPoint([t, i]));
          }, !0);
        }
      });
    };
  }), e("echarts/processor/dataSample", [], function () {
    var t = { average: function (t) {
        for (var e = 0, n = 0, i = 0; i < t[we]; i++) isNaN(t[i]) || (e += t[i], n++);return 0 === n ? 0 / 0 : e / n;
      }, sum: function (t) {
        for (var e = 0, n = 0; n < t[we]; n++) e += t[n] || 0;return e;
      }, max: function (t) {
        for (var e = -1 / 0, n = 0; n < t[we]; n++) t[n] > e && (e = t[n]);return e;
      }, min: function (t) {
        for (var e = 1 / 0, n = 0; n < t[we]; n++) t[n] < e && (e = t[n]);return e;
      }, nearest: function (t) {
        return t[0];
      } },
        e = function (t) {
      return Math.round(t[we] / 2);
    };return function (n, i) {
      i.eachSeriesByType(n, function (n) {
        var i = n[Ve](),
            r = n.get("sampling"),
            a = n[_e];if ("cartesian2d" === a.type && r) {
          var o = a.getBaseAxis(),
              s = a.getOtherAxis(o),
              l = o[V](),
              u = l[1] - l[0],
              c = Math.round(i.count() / u);if (c > 1) {
            var h;typeof r === Oe ? h = t[r] : typeof r === j && (h = r), h && (i = i.downSample(s.dim, 1 / c, h, e), n.setData(i));
          }
        }
      }, this);
    };
  }), e("echarts/coord/cartesian/Grid", [Ze, "exports", "../../util/layout", "../../coord/axisHelper", Fe, "./Cartesian2D", "./Axis2D", "./GridModel", "../../CoordinateSystem"], function (t) {
    function e(t, e) {
      return t.getCoordSysModel() === e;
    }function n(t) {
      var e,
          n = t.model,
          i = n.getFormattedLabels(),
          r = n[ke]("axisLabel.textStyle"),
          a = 1,
          o = i[we];o > 40 && (a = Math.ceil(o / 40));for (var s = 0; o > s; s += a) if (!t.isLabelIgnored(s)) {
        var l = r.getTextRect(i[s]);e ? e.union(l) : e = l;
      }return e;
    }function i(t, e, n) {
      this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, n), this.model = t;
    }function r(t, e) {
      var n = t[V](),
          i = n[0] + n[1];t[D] = "x" === t.dim ? function (t) {
        return t + e;
      } : function (t) {
        return i - t + e;
      }, t.toLocalCoord = "x" === t.dim ? function (t) {
        return t - e;
      } : function (t) {
        return i - t + e;
      };
    }function a(t) {
      return u.map(v, function (e) {
        var n = t.getReferringComponents(e)[0];return n;
      });
    }function o(t) {
      return "cartesian2d" === t.get(_e);
    }var s = t("../../util/layout"),
        l = t("../../coord/axisHelper"),
        u = t(Fe),
        c = t("./Cartesian2D"),
        h = t("./Axis2D"),
        d = u.each,
        f = l.ifAxisCrossZero,
        p = l.niceScaleExtent;t("./GridModel");var m = i[Re];m.type = "grid", m.axisPointerEnabled = !0, m.getRect = function () {
      return this._rect;
    }, m[ge] = function (t, e) {
      function n(t) {
        var e = i[t];for (var n in e) if (e.hasOwnProperty(n)) {
          var r = e[n];if (r && (r.type === x || "time" === r.type || !f(r))) return !0;
        }return !1;
      }var i = this._axesMap;this._updateScale(t, this.model), d(i.x, function (t) {
        p(t.scale, t.model);
      }), d(i.y, function (t) {
        p(t.scale, t.model);
      }), d(i.x, function (t) {
        n("y") && (t.onZero = !1);
      }), d(i.y, function (t) {
        n("x") && (t.onZero = !1);
      }), this.resize(this.model, e);
    }, m.resize = function (t, e, i) {
      function a() {
        d(l, function (t) {
          var e = t.isHorizontal(),
              n = e ? [0, o.width] : [0, o[De]],
              i = t.inverse ? 1 : 0;t.setExtent(n[i], n[1 - i]), r(t, e ? o.x : o.y);
        });
      }var o = s.getLayoutRect(t.getBoxLayoutParams(), { width: e[Ce](), height: e[Te]() });this._rect = o;var l = this._axesList;a(), !i && t.get("containLabel") && (d(l, function (t) {
        if (!t.model.get("axisLabel.inside")) {
          var e = n(t);if (e) {
            var i = t.isHorizontal() ? De : "width",
                r = t.model.get("axisLabel.margin");o[i] -= e[i] + r, "top" === t[A] ? o.y += e[De] + r : "left" === t[A] && (o.x += e.width + r);
          }
        }
      }), a());
    }, m[O] = function (t, e) {
      var n = this._axesMap[t];if (null != n) {
        if (null == e) for (var i in n) if (n.hasOwnProperty(i)) return n[i];return n[e];
      }
    }, m.getAxes = function () {
      return this._axesList.slice();
    }, m.getCartesian = function (t, e) {
      if (null != t && null != e) {
        var n = "x" + t + "y" + e;return this._coordsMap[n];
      }u[Le](t) && (e = t.yAxisIndex, t = t.xAxisIndex);for (var i = 0, r = this._coordsList; i < r[we]; i++) if (r[i][O]("x").index === t || r[i][O]("y").index === e) return r[i];
    }, m.getCartesians = function () {
      return this._coordsList.slice();
    }, m.convertToPixel = function (t, e, n) {
      var i = this._findConvertTarget(t, e);return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis[D](i.axis[I](n)) : null;
    }, m.convertFromPixel = function (t, e, n) {
      var i = this._findConvertTarget(t, e);return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;
    }, m._findConvertTarget = function (t, e) {
      var n,
          i,
          r = e.seriesModel,
          a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0],
          o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0],
          s = e.gridModel,
          l = this._coordsList;if (r) n = r[_e], u[be](l, n) < 0 && (n = null);else if (a && o) n = this.getCartesian(a[se], o[se]);else if (a) i = this[O]("x", a[se]);else if (o) i = this[O]("y", o[se]);else if (s) {
        var c = s[_e];c === this && (n = this._coordsList[0]);
      }return { cartesian: n, axis: i };
    }, m.containPoint = function (t) {
      var e = this._coordsList[0];return e ? e.containPoint(t) : void 0;
    }, m._initCartesian = function (t, n) {
      function i(i) {
        return function (s, u) {
          if (e(s, t, n)) {
            var c = s.get(A);"x" === i ? "top" !== c && c !== Me && (c = Me, r[c] && (c = "top" === c ? Me : "top")) : "left" !== c && "right" !== c && (c = "left", r[c] && (c = "left" === c ? "right" : "left")), r[c] = !0;var d = new h(i, l.createScaleByModel(s), [0, 0], s.get("type"), c),
                f = d.type === x;d.onBand = f && s.get("boundaryGap"), d.inverse = s.get("inverse"), d.onZero = s.get("axisLine.onZero"), s.axis = d, d.model = s, d.grid = this, d.index = u, this._axesList.push(d), a[i][u] = d, o[i]++;
          }
        };
      }var r = { left: !1, right: !1, top: !1, bottom: !1 },
          a = { x: {}, y: {} },
          o = { x: 0, y: 0 };return n[Ae]("xAxis", i("x"), this), n[Ae]("yAxis", i("y"), this), o.x && o.y ? (this._axesMap = a, void d(a.x, function (e, n) {
        d(a.y, function (i, r) {
          var a = "x" + n + "y" + r,
              o = new c(a);o.grid = this, o.model = t, this._coordsMap[a] = o, this._coordsList.push(o), o.addAxis(e), o.addAxis(i);
        }, this);
      }, this)) : (this._axesMap = {}, void (this._axesList = []));
    }, m._updateScale = function (t, n) {
      function i(t, e, n) {
        d(n[_](e.dim), function (n) {
          e.scale.unionExtentFromData(t, n);
        });
      }u.each(this._axesList, function (t) {
        t.scale.setExtent(1 / 0, -1 / 0);
      }), t[me](function (r) {
        if (o(r)) {
          var s = a(r, t),
              l = s[0],
              u = s[1];if (!e(l, n, t) || !e(u, n, t)) return;var c = this.getCartesian(l[se], u[se]),
              h = r[Ve](),
              d = c[O]("x"),
              f = c[O]("y");"list" === h.type && (i(h, d, r), i(h, f, r));
        }
      }, this);
    }, m.getTooltipAxes = function (t) {
      var e = [],
          n = [];return d(this.getCartesians(), function (i) {
        var r = null != t && "auto" !== t ? i[O](t) : i.getBaseAxis(),
            a = i.getOtherAxis(r);u[be](e, r) < 0 && e.push(r), u[be](n, a) < 0 && n.push(a);
      }), { baseAxes: e, otherAxes: n };
    };var v = ["xAxis", "yAxis"];return i[ye] = function (t, e) {
      var n = [];return t[Ae]("grid", function (r, a) {
        var o = new i(r, t, e);o.name = "grid_" + a, o.resize(r, e, !0), r[_e] = o, n.push(o);
      }), t[me](function (e) {
        if (o(e)) {
          var n = a(e, t),
              i = n[0],
              r = n[1],
              s = i.getCoordSysModel(),
              l = s[_e];e[_e] = l.getCartesian(i[se], r[se]);
        }
      }), n;
    }, i[X] = i[Re][X] = c[Re][X], t("../../CoordinateSystem").register("cartesian2d", i), i;
  }), e("echarts/chart/bar/BarSeries", [Ze, "./BaseBarSeries"], function (t) {
    return t("./BaseBarSeries")[he]({ type: "series.bar", dependencies: ["grid", "polar"], brushSelector: "rect" });
  }), e("echarts/chart/bar/BarView", [Ze, Fe, E, Ne, "../../model/Model", "./barItemStyle", g], function (t) {
    function e(t, e, n) {
      n.style.text = "", o.updateProps(n, { shape: { width: 0 } }, e, t, function () {
        n[Q] && n[Q][de](n);
      });
    }function n(t, e, n) {
      n.style.text = "", o.updateProps(n, { shape: { r: n.shape.r0 } }, e, t, function () {
        n[Q] && n[Q][de](n);
      });
    }function i(t, e, n, i, r, l, u, c) {
      var h = e[xe](n, "color"),
          d = e[xe](n, v),
          f = i[ke]("itemStyle.normal"),
          p = i[ke]("itemStyle.emphasis").getBarItemStyle();c || t.setShape("r", f.get("barBorderRadius") || 0), t.useStyle(a[ce]({ fill: h, opacity: d }, f.getBarItemStyle()));var m = i[b]("cursor");m && t.attr("cursor", m);var g = u ? r[De] > 0 ? Me : "top" : r.width > 0 ? "left" : "right";c || s.setLabel(t.style, p, i, h, l, n, g), o.setHoverStyle(t, p);
    }function r(t, e) {
      var n = t.get(l) || 0;return Math.min(n, Math.abs(e.width), Math.abs(e[De]));
    }var a = t(Fe),
        o = t(E),
        s = t(Ne),
        l = ["itemStyle", "normal", "barBorderWidth"];a[he](t("../../model/Model")[Re], t("./barItemStyle"));var u = t(g).extendChartView({ type: "bar", render: function (t, e, n) {
        var i = t.get(_e);return ("cartesian2d" === i || "polar" === i) && this._render(t, e, n), this.group;
      }, dispose: a.noop, _render: function (t) {
        var r,
            a = this.group,
            s = t[Ve](),
            l = this._data,
            u = t[_e],
            d = u.getBaseAxis();"cartesian2d" === u.type ? r = d.isHorizontal() : "polar" === u.type && (r = "angle" === d.dim);var f = t.isAnimationEnabled() ? t : null;s.diff(l).add(function (e) {
          if (s.hasValue(e)) {
            var n = s[w](e),
                o = h[u.type](s, e, n),
                l = c[u.type](s, e, n, o, r, f);s.setItemGraphicEl(e, l), a.add(l), i(l, s, e, n, o, t, r, "polar" === u.type);
          }
        })[ge](function (e, n) {
          var d = l[P](n);if (!s.hasValue(e)) return void a[de](d);var p = s[w](e),
              m = h[u.type](s, e, p);d ? o.updateProps(d, { shape: m }, f, e) : d = c[u.type](s, e, p, m, r, f, !0), s.setItemGraphicEl(e, d), a.add(d), i(d, s, e, p, m, t, r, "polar" === u.type);
        })[de](function (t) {
          var i = l[P](t);"cartesian2d" === u.type ? i && e(t, f, i) : i && n(t, f, i);
        }).execute(), this._data = s;
      }, remove: function (t) {
        var i = this.group,
            r = this._data;t.get(Ie) ? r && r[C](function (i) {
          "sector" === i.type ? n(i.dataIndex, t, i) : e(i.dataIndex, t, i);
        }) : i[H]();
      } }),
        c = { cartesian2d: function (t, e, n, i, r, s, l) {
        var u = new o.Rect({ shape: a[he]({}, i) });if (s) {
          var c = u.shape,
              h = r ? De : "width",
              d = {};c[h] = 0, d[h] = i[h], o[l ? "updateProps" : "initProps"](u, { shape: d }, s, e);
        }return u;
      }, polar: function (t, e, n, i, r, s, l) {
        var u = new o.Sector({ shape: a[he]({}, i) });if (s) {
          var c = u.shape,
              h = r ? "r" : "endAngle",
              d = {};c[h] = r ? 0 : i.startAngle, d[h] = i[h], o[l ? "updateProps" : "initProps"](u, { shape: d }, s, e);
        }return u;
      } },
        h = { cartesian2d: function (t, e, n) {
        var i = t[k](e),
            a = r(n, i),
            o = i.width > 0 ? 1 : -1,
            s = i[De] > 0 ? 1 : -1;return { x: i.x + o * a / 2, y: i.y + s * a / 2, width: i.width - o * a, height: i[De] - s * a };
      }, polar: function (t, e) {
        var n = t[k](e);return { cx: n.cx, cy: n.cy, r0: n.r0, r: n.r, startAngle: n.startAngle, endAngle: n.endAngle };
      } };return u;
  }), e("echarts/layout/barGrid", [Ze, Fe, "../util/number"], function (t) {
    function e(t) {
      return t.get("stack") || c + t[ne];
    }function n(t) {
      return t.dim + t.index;
    }function i(t, e) {
      var n = [],
          i = t.axis,
          r = "axis0";if (i.type === x) {
        for (var o = i.getBandWidth(), l = 0; l < t.count; l++) n.push(s[ce]({ bandWidth: o, axisKey: r, stackId: c + l }, t));for (var u = a(n, e), h = [], l = 0; l < t.count; l++) {
          var d = u[r][c + l];d.offsetCenter = d[L] + d.width / 2, h.push(d);
        }return h;
      }
    }function r(t, i) {
      var r = s.map(t, function (t) {
        var i = t[Ve](),
            r = t[_e],
            a = r.getBaseAxis(),
            o = a[V](),
            s = a.type === x ? a.getBandWidth() : Math.abs(o[1] - o[0]) / i.count(),
            l = u(t.get("barWidth"), s),
            c = u(t.get("barMaxWidth"), s),
            h = t.get("barGap"),
            d = t.get("barCategoryGap");return { bandWidth: s, barWidth: l, barMaxWidth: c, barGap: h, barCategoryGap: d, axisKey: n(a), stackId: e(t) };
      });return a(r, i);
    }function a(t) {
      var e = {};s.each(t, function (t) {
        var n = t.axisKey,
            i = t.bandWidth,
            r = e[n] || { bandWidth: i, remainedWidth: i, autoWidthCount: 0, categoryGap: "20%", gap: "30%", stacks: {} },
            a = r.stacks;e[n] = r;var o = t.stackId;a[o] || r.autoWidthCount++, a[o] = a[o] || { width: 0, maxWidth: 0 };var s = t.barWidth;s && !a[o].width && (s = Math.min(r.remainedWidth, s), a[o].width = s, r.remainedWidth -= s);var l = t.barMaxWidth;l && (a[o].maxWidth = l);var u = t.barGap;null != u && (r.gap = u);var c = t.barCategoryGap;null != c && (r.categoryGap = c);
      });var n = {};return s.each(e, function (t, e) {
        n[e] = {};var i = t.stacks,
            r = t.bandWidth,
            a = u(t.categoryGap, r),
            o = u(t.gap, 1),
            l = t.remainedWidth,
            c = t.autoWidthCount,
            h = (l - a) / (c + (c - 1) * o);h = Math.max(h, 0), s.each(i, function (t) {
          var e = t.maxWidth;e && h > e && (e = Math.min(e, l), t.width && (e = Math.min(e, t.width)), l -= e, t.width = e, c--);
        }), h = (l - a) / (c + (c - 1) * o), h = Math.max(h, 0);var d,
            f = 0;s.each(i, function (t) {
          t.width || (t.width = h), d = t, f += t.width * (1 + o);
        }), d && (f -= d.width * o);var p = -f / 2;s.each(i, function (t, i) {
          n[e][i] = n[e][i] || { offset: p, width: t.width }, p += t.width * (1 + o);
        });
      }), n;
    }function o(t, i) {
      var a = r(s.filter(i.getSeriesByType(t), function (t) {
        return !i.isSeriesFiltered(t) && t[_e] && "cartesian2d" === t[_e].type;
      })),
          o = {},
          l = {};i.eachSeriesByType(t, function (t) {
        if ("cartesian2d" === t[_e].type) {
          var i = t[Ve](),
              r = t[_e],
              s = r.getBaseAxis(),
              u = e(t),
              c = a[n(s)][u],
              h = c[L],
              d = c.width,
              f = r.getOtherAxis(s),
              p = t.get("barMinHeight") || 0,
              m = s.onZero ? f[D](f[I](0)) : f.getGlobalExtent()[0],
              v = r.dataToPoints(i, !0);o[u] = o[u] || [], l[u] = l[u] || [], i.setLayout({ offset: h, size: d }), i.each(f.dim, function (t, e) {
            if (!isNaN(t)) {
              o[u][e] || (o[u][e] = { p: m, n: m }, l[u][e] = { p: m, n: m });var n,
                  r,
                  a,
                  s,
                  c = t >= 0 ? "p" : "n",
                  g = v[e],
                  y = o[u][e][c],
                  x = l[u][e][c];f.isHorizontal() ? (n = y, r = g[1] + h, a = g[0] - x, s = d, l[u][e][c] += a, Math.abs(a) < p && (a = (0 > a ? -1 : 1) * p), o[u][e][c] += a) : (n = g[0] + h, r = y, a = d, s = g[1] - x, l[u][e][c] += s, Math.abs(s) < p && (s = (0 >= s ? -1 : 1) * p), o[u][e][c] += s), i.setItemLayout(e, { x: n, y: r, width: a, height: s });
            }
          }, !0);
        }
      }, this);
    }var s = t(Fe),
        l = t("../util/number"),
        u = l[m],
        c = "__ec_stack_";return o.getLayoutOnAxis = i, o;
  }), e("echarts/chart/pie/PieView", [Ze, E, Fe, "../../view/Chart"], function (t) {
    function e(t, e, i, r) {
      var a = e[Ve](),
          o = this.dataIndex,
          s = a[p](o),
          l = e.get("selectedOffset");r.dispatchAction({ type: "pieToggleSelect", from: t, name: s, seriesId: e.id }), a.each(function (t) {
        n(a[P](t), a[k](t), e.isSelected(a[p](t)), l, i);
      });
    }function n(t, e, n, i, r) {
      var a = (e.startAngle + e.endAngle) / 2,
          o = Math.cos(a),
          s = Math.sin(a),
          l = n ? i : 0,
          u = [o * l, s * l];r ? t.animate().when(200, { position: u }).start("bounceOut") : t.attr(A, u);
    }function i(t, e) {
      function n() {
        o[Se] = o.hoverIgnore, s[Se] = s.hoverIgnore;
      }function i() {
        o[Se] = o.normalIgnore, s[Se] = s.normalIgnore;
      }a.Group.call(this);var r = new a.Sector({ z2: 2 }),
          o = new a.Polyline(),
          s = new a.Text();this.add(r), this.add(o), this.add(s), this.updateData(t, e, !0), this.on("emphasis", n).on("normal", i).on(re, n).on(ie, i);
    }function r(t, e, n, i, r) {
      var a = i[ke](f),
          s = "inside" === r || "inner" === r;return { fill: a[d]() || (s ? "#fff" : t[xe](e, "color")), opacity: t[xe](e, v), textFont: a[h](), text: o[y](t.hostModel.getFormattedLabel(e, n), t[p](e)) };
    }var a = t(E),
        o = t(Fe),
        s = i[Re];s.updateData = function (t, e, i) {
      function r() {
        l[Pe](!0), l.animateTo({ shape: { r: h.r + 10 } }, 300, "elasticOut");
      }function s() {
        l[Pe](!0), l.animateTo({ shape: { r: h.r } }, 300, "elasticOut");
      }var l = this.childAt(0),
          u = t.hostModel,
          c = t[w](e),
          h = t[k](e),
          d = o[he]({}, h);if (d.label = null, i) {
        l.setShape(d);var f = u[b]("animationType");"scale" === f ? (l.shape.r = h.r0, a.initProps(l, { shape: { r: h.r } }, u, e)) : (l.shape.endAngle = h.startAngle, a.updateProps(l, { shape: { endAngle: h.endAngle } }, u, e));
      } else a.updateProps(l, { shape: d }, u, e);var p = c[ke]("itemStyle"),
          m = t[xe](e, "color");l.useStyle(o[ce]({ lineJoin: "bevel", fill: m }, p[ke]("normal").getItemStyle())), l.hoverStyle = p[ke]("emphasis").getItemStyle();var v = c[b]("cursor");v && l.attr("cursor", v), n(this, t[k](e), c.get("selected"), u.get("selectedOffset"), u.get(Ie)), l.off(re).off(ie).off("emphasis").off("normal"), c.get("hoverAnimation") && u.isAnimationEnabled() && l.on(re, r).on(ie, s).on("emphasis", r).on("normal", s), this._updateLabel(t, e), a.setHoverStyle(this);
    }, s._updateLabel = function (t, e) {
      var n = this.childAt(1),
          i = this.childAt(2),
          o = t.hostModel,
          s = t[w](e),
          l = t[k](e),
          h = l.label,
          d = t[xe](e, "color");a.updateProps(n, { shape: { points: h.linePoints || [[h.x, h.y], [h.x, h.y], [h.x, h.y]] } }, o, e), a.updateProps(i, { style: { x: h.x, y: h.y } }, o, e), i.attr({ style: { textVerticalAlign: h.verticalAlign, textAlign: h[c], textFont: h.font }, rotation: h[u], origin: [h.x, h.y], z2: 10 });var f = s[ke]("label.normal"),
          p = s[ke]("label.emphasis"),
          m = s[ke]("labelLine.normal"),
          g = s[ke]("labelLine.emphasis"),
          y = f.get(A) || p.get(A);i[J](r(t, e, "normal", f, y)), i[Se] = i.normalIgnore = !f.get("show"), i.hoverIgnore = !p.get("show"), n[Se] = n.normalIgnore = !m.get("show"), n.hoverIgnore = !g.get("show"), n[J]({ stroke: d, opacity: t[xe](e, v) }), n[J](m[ke]("lineStyle")[T]()), i.hoverStyle = r(t, e, "emphasis", p, y), n.hoverStyle = g[ke]("lineStyle")[T]();var x = m.get("smooth");x && x === !0 && (x = .4), n.setShape({ smooth: x });
    }, o[W](i, a.Group);var l = t("../../view/Chart")[he]({ type: "pie", init: function () {
        var t = new a.Group();this._sectorGroup = t;
      }, render: function (t, n, r, a) {
        if (!a || a.from !== this.uid) {
          var s = t[Ve](),
              l = this._data,
              u = this.group,
              c = n.get(Ie),
              h = !l,
              d = t.get("animationType"),
              f = o.curry(e, this.uid, t, c, r),
              p = t.get("selectedMode");if (s.diff(l).add(function (t) {
            var e = new i(s, t);h && "scale" !== d && e.eachChild(function (t) {
              t[Pe](!0);
            }), p && e.on("click", f), s.setItemGraphicEl(t, e), u.add(e);
          })[ge](function (t, e) {
            var n = l[P](e);n.updateData(s, t), n.off("click"), p && n.on("click", f), u.add(n), s.setItemGraphicEl(t, n);
          })[de](function (t) {
            var e = l[P](t);u[de](e);
          }).execute(), c && h && s.count() > 0 && "scale" !== d) {
            var m = s[k](0),
                v = Math.max(r[Ce](), r[Te]()) / 2,
                g = o.bind(u.removeClipPath, u);u.setClipPath(this._createClipPath(m.cx, m.cy, v, m.startAngle, m.clockwise, g, t));
          }this._data = s;
        }
      }, dispose: function () {}, _createClipPath: function (t, e, n, i, r, o, s) {
        var l = new a.Sector({ shape: { cx: t, cy: e, r0: 0, r: n, startAngle: i, endAngle: i, clockwise: r } });return a.initProps(l, { shape: { endAngle: i + (r ? 1 : -1) * Math.PI * 2 } }, s, o), l;
      }, containPoint: function (t, e) {
        var n = e[Ve](),
            i = n[k](0);if (i) {
          var r = t[0] - i.cx,
              a = t[1] - i.cy,
              o = Math.sqrt(r * r + a * a);return o <= i.r && o >= i.r0;
        }
      } });return l;
  }), e("echarts/chart/pie/PieSeries", [Ze, "../../data/List", Fe, R, "../../util/number", "../../data/helper/completeDimensions", "../../component/helper/selectableMixin", g], function (t) {
    var e = t("../../data/List"),
        n = t(Fe),
        i = t(R),
        r = t("../../util/number"),
        a = t("../../data/helper/completeDimensions"),
        o = t("../../component/helper/selectableMixin"),
        s = t(g).extendSeriesModel({ type: "series.pie", init: function (t) {
        s.superApply(this, "init", arguments), this.legendDataProvider = function () {
          return this.getRawData();
        }, this.updateSelectedMap(t.data), this._defaultLabelLine(t);
      }, mergeOption: function (t) {
        s.superCall(this, "mergeOption", t), this.updateSelectedMap(this[l].data);
      }, getInitialData: function (t) {
        var n = a(["value"], t.data),
            i = new e(n, this);return i.initData(t.data), i;
      }, getDataParams: function (t) {
        var e = this[Ve](),
            n = s.superCall(this, ee, t),
            i = [];return e.each("value", function (t) {
          i.push(t);
        }), n.percent = r.getPercentWithPrecision(i, t, e.hostModel.get("percentPrecision")), n.$vars.push("percent"), n;
      }, _defaultLabelLine: function (t) {
        i.defaultEmphasis(t.labelLine, ["show"]);var e = t.labelLine.normal,
            n = t.labelLine.emphasis;e.show = e.show && t.label.normal.show, n.show = n.show && t.label.emphasis.show;
      }, defaultOption: { zlevel: 0, z: 2, legendHoverLink: !0, hoverAnimation: !0, center: ["50%", "50%"], radius: [0, "75%"], clockwise: !0, startAngle: 90, minAngle: 0, selectedOffset: 10, avoidLabelOverlap: !0, percentPrecision: 2, stillShowZeroSum: !0, label: { normal: { rotate: !1, show: !0, position: "outer" }, emphasis: {} }, labelLine: { normal: { show: !0, length: 15, length2: 15, smooth: !1, lineStyle: { width: 1, type: "solid" } } }, itemStyle: { normal: { borderWidth: 1 }, emphasis: {} }, animationType: "expansion", animationEasing: "cubicOut", data: [] } });return n.mixin(s, o), s;
  }), e("echarts/action/createDataSelectAction", [Ze, "../echarts", Fe], function (t) {
    var e = t("../echarts"),
        n = t(Fe);return function (t, i) {
      n.each(i, function (n) {
        n[ge] = "updateView", e.registerAction(n, function (e, i) {
          var r = {};return i[Ae]({ mainType: "series", subType: t, query: e }, function (t) {
            t[n.method] && t[n.method](e.name);var i = t[Ve]();i.each(function (e) {
              var n = i[p](e);r[n] = t.isSelected(n) || !1;
            });
          }), { name: e.name, selected: r };
        });
      });
    };
  }), e("echarts/visual/dataColor", [Ze], function () {
    return function (t, e) {
      var n = {};e.eachRawSeriesByType(t, function (t) {
        var i = t.getRawData(),
            r = {};if (!e.isSeriesFiltered(t)) {
          var a = t[Ve]();a.each(function (t) {
            var e = a.getRawIndex(t);r[e] = t;
          }), i.each(function (e) {
            var o = r[e],
                s = null != o && a[xe](o, "color", !0);if (s) i.setItemVisual(e, "color", s);else {
              var l = i[w](e),
                  u = l.get("itemStyle.normal.color") || t.getColorFromPalette(i[p](e), n);i.setItemVisual(e, "color", u), null != o && a.setItemVisual(o, "color", u);
            }
          });
        }
      });
    };
  }), e("echarts/chart/pie/pieLayout", [Ze, "../../util/number", "./labelLayout", Fe], function (t) {
    var e = t("../../util/number"),
        n = e[m],
        i = t("./labelLayout"),
        r = t(Fe),
        a = 2 * Math.PI,
        o = Math.PI / 180;return function (t, l, u) {
      l.eachSeriesByType(t, function (t) {
        var l = t.get(s),
            c = t.get("radius");r[Y](c) || (c = [0, c]), r[Y](l) || (l = [l, l]);var h = u[Ce](),
            d = u[Te](),
            f = Math.min(h, d),
            p = n(l[0], h),
            m = n(l[1], d),
            v = n(c[0], f / 2),
            g = n(c[1], f / 2),
            y = t[Ve](),
            x = -t.get("startAngle") * o,
            _ = t.get("minAngle") * o,
            b = 0;y.each("value", function (t) {
          !isNaN(t) && b++;
        });var w = y.getSum("value"),
            M = Math.PI / (w || b) * 2,
            S = t.get("clockwise"),
            A = t.get("roseType"),
            P = t.get("stillShowZeroSum"),
            T = y[B]("value");T[0] = 0;var C = a,
            L = 0,
            I = x,
            D = S ? 1 : -1;if (y.each("value", function (t, n) {
          var i;if (isNaN(t)) return void y.setItemLayout(n, { angle: 0 / 0, startAngle: 0 / 0, endAngle: 0 / 0, clockwise: S, cx: p, cy: m, r0: v, r: A ? 0 / 0 : g });i = "area" !== A ? 0 === w && P ? M : t * M : a / b, _ > i ? (i = _, C -= _) : L += t;var r = I + D * i;y.setItemLayout(n, { angle: i, startAngle: I, endAngle: r, clockwise: S, cx: p, cy: m, r0: v, r: A ? e.linearMap(t, T, [v, g]) : g }), I = r;
        }, !0), a > C && b) if (.001 >= C) {
          var z = a / b;y.each("value", function (t, e) {
            if (!isNaN(t)) {
              var n = y[k](e);n.angle = z, n.startAngle = x + D * e * z, n.endAngle = x + D * (e + 1) * z;
            }
          });
        } else M = C / L, I = x, y.each("value", function (t, e) {
          if (!isNaN(t)) {
            var n = y[k](e),
                i = n.angle === _ ? _ : t * M;n.startAngle = I, n.endAngle = I + D * i, I += D * i;
          }
        });i(t, g, h, d);
      });
    };
  }), e("echarts/processor/dataFilter", [], function () {
    return function (t, e) {
      var n = e.findComponents({ mainType: "legend" });n && n[we] && e.eachSeriesByType(t, function (t) {
        var e = t[Ve]();e.filterSelf(function (t) {
          for (var i = e[p](t), r = 0; r < n[we]; r++) if (!n[r].isSelected(i)) return !1;return !0;
        }, this);
      }, this);
    };
  }), e("zrender/core/env", [], function () {
    function t(t) {
      var e = {},
          n = {},
          i = t.match(/Firefox\/([\d.]+)/),
          r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
          a = t.match(/Edge\/([\d.]+)/),
          o = /micromessenger/i.test(t);return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), a && (n.edge = !0, n.version = a[1]), o && (n.weChat = !0), { browser: n, os: e, node: !1, canvasSupported: document.createElement(ze)[N] ? !0 : !1, touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge, pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 11) };
    }var e = {};return e = typeof navigator === o ? { browser: {}, os: {}, node: !0, canvasSupported: !0 } : t(navigator.userAgent);
  }), e("echarts/ExtensionAPI", [Ze, Fe], function (t) {
    function e(t) {
      n.each(i, function (e) {
        this[e] = n.bind(t[e], t);
      }, this);
    }var n = t(Fe),
        i = ["getDom", "getZr", Ce, Te, "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", ke, "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"];return e;
  }), e("echarts/CoordinateSystem", [Ze, Fe], function (t) {
    function e() {
      this._coordinateSystems = [];
    }var n = t(Fe),
        i = {};return e[Re] = { constructor: e, create: function (t, e) {
        var r = [];n.each(i, function (n) {
          var i = n[ye](t, e);r = r[pe](i || []);
        }), this._coordinateSystems = r;
      }, update: function (t, e) {
        n.each(this._coordinateSystems, function (n) {
          n[ge] && n[ge](t, e);
        });
      }, getCoordinateSystems: function () {
        return this._coordinateSystems.slice();
      } }, e.register = function (t, e) {
      i[t] = e;
    }, e.get = function (t) {
      return i[t];
    }, e;
  }), e("echarts/model/Global", [Ze, Fe, "../util/model", "./Model", "./Component", "./globalDefault", "./mixin/colorPalette"], function (t) {
    function e(t, e) {
      u.each(e, function (e, n) {
        y.hasClass(n) || ("object" == typeof e ? t[n] = t[n] ? u.merge(t[n], e, !1) : u.clone(e) : null == t[n] && (t[n] = e));
      });
    }function n(t) {
      t = t, this[l] = {}, this[l][_] = 1, this._componentsMap = u.createHashMap({ series: [] }), this._seriesIndices = null, e(t, this._theme[l]), u.merge(t, x, !1), this.mergeOption(t);
    }function i(t, e) {
      u[Y](e) || (e = e ? [e] : []);var n = {};return d(e, function (e) {
        n[e] = (t.get(e) || []).slice();
      }), n;
    }function r(t, e, n) {
      var i = e.type ? e.type : n ? n.subType : y.determineSubType(t, e);return i;
    }function a(t) {
      return p(t, function (t) {
        return t[se];
      }) || [];
    }function o(t, e) {
      return e.hasOwnProperty("subType") ? f(t, function (t) {
        return t.subType === e.subType;
      }) : t;
    }function s(t) {}var u = t(Fe),
        c = t("../util/model"),
        h = t("./Model"),
        d = u.each,
        f = u.filter,
        p = u.map,
        m = u[Y],
        v = u[be],
        g = u[Le],
        y = t("./Component"),
        x = t("./globalDefault"),
        _ = "\x00_ec_inner",
        b = h[he]({ constructor: b, init: function (t, e, n, i) {
        n = n || {}, this[l] = null, this._theme = new h(n), this._optionManager = i;
      }, setOption: function (t, e) {
        u.assert(!(_ in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null);
      }, resetOption: function (t) {
        var e = !1,
            i = this._optionManager;if (!t || "recreate" === t) {
          var r = i.mountOption("recreate" === t);this[l] && "recreate" !== t ? (this.restoreData(), this.mergeOption(r)) : n.call(this, r), e = !0;
        }if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
          var a = i.getTimelineOption(this);a && (this.mergeOption(a), e = !0);
        }if (!t || "recreate" === t || "media" === t) {
          var o = i.getMediaOption(this, this._api);o[we] && d(o, function (t) {
            this.mergeOption(t, e = !0);
          }, this);
        }return e;
      }, mergeOption: function (t) {
        function e(e, s) {
          var h = c.normalizeToArray(t[e]),
              f = c.mappingToExists(o.get(e), h);c.makeIdAndName(f), d(f, function (t) {
            var n = t[l];g(n) && (t.keyInfo[le] = e, t.keyInfo.subType = r(e, n, t.exist));
          });var p = i(o, s);n[e] = [], o.set(e, []), d(f, function (t, i) {
            var r = t.exist,
                a = t[l];if (u.assert(g(a) || r, "Empty component definition"), a) {
              var s = y.getClass(e, t.keyInfo.subType, !0);if (r && r instanceof s) r.name = t.keyInfo.name, r.mergeOption(a, this), r.optionUpdated(a, !1);else {
                var c = u[he]({ dependentModels: p, componentIndex: i }, t.keyInfo);r = new s(a, this, this, c), u[he](r, c), r.init(a, this, this, c), r.optionUpdated(null, !0);
              }
            } else r.mergeOption({}, this), r.optionUpdated({}, !1);o.get(e)[i] = r, n[e][i] = r[l];
          }, this), e === fe && (this._seriesIndices = a(o.get(fe)));
        }var n = this[l],
            o = this._componentsMap,
            s = [];d(t, function (t, e) {
          null != t && (y.hasClass(e) ? s.push(e) : n[e] = null == n[e] ? u.clone(t) : u.merge(n[e], t, !0));
        }), y.topologicalTravel(s, y.getAllClassMainTypes(), e, this), this._seriesIndices = this._seriesIndices || [];
      }, getOption: function () {
        var t = u.clone(this[l]);return d(t, function (e, n) {
          if (y.hasClass(n)) {
            for (var e = c.normalizeToArray(e), i = e[we] - 1; i >= 0; i--) c.isIdInner(e[i]) && e[ae](i, 1);t[n] = e;
          }
        }), delete t[_], t;
      }, getTheme: function () {
        return this._theme;
      }, getComponent: function (t, e) {
        var n = this._componentsMap.get(t);return n ? n[e || 0] : void 0;
      }, queryComponents: function (t) {
        var e = t[le];if (!e) return [];var n = t.index,
            i = t.id,
            r = t.name,
            a = this._componentsMap.get(e);if (!a || !a[we]) return [];var s;if (null != n) m(n) || (n = [n]), s = f(p(n, function (t) {
          return a[t];
        }), function (t) {
          return !!t;
        });else if (null != i) {
          var l = m(i);s = f(a, function (t) {
            return l && v(i, t.id) >= 0 || !l && t.id === i;
          });
        } else if (null != r) {
          var u = m(r);s = f(a, function (t) {
            return u && v(r, t.name) >= 0 || !u && t.name === r;
          });
        } else s = a.slice();return o(s, t);
      }, findComponents: function (t) {
        function e(t) {
          var e = r + "Index",
              n = r + "Id",
              i = r + "Name";return !t || null == t[e] && null == t[n] && null == t[i] ? null : { mainType: r, index: t[e], id: t[n], name: t[i] };
        }function n(e) {
          return t.filter ? f(e, t.filter) : e;
        }var i = t.query,
            r = t[le],
            a = e(i),
            s = a ? this.queryComponents(a) : this._componentsMap.get(r);return n(o(s, t));
      }, eachComponent: function (t, e, n) {
        var i = this._componentsMap;if (typeof t === j) n = e, e = t, i.each(function (t, i) {
          d(t, function (t, r) {
            e.call(n, i, t, r);
          });
        });else if (u[q](t)) d(i.get(t), e, n);else if (g(t)) {
          var r = this.findComponents(t);d(r, e, n);
        }
      }, getSeriesByName: function (t) {
        var e = this._componentsMap.get(fe);return f(e, function (e) {
          return e.name === t;
        });
      }, getSeriesByIndex: function (t) {
        return this._componentsMap.get(fe)[t];
      }, getSeriesByType: function (t) {
        var e = this._componentsMap.get(fe);return f(e, function (e) {
          return e.subType === t;
        });
      }, getSeries: function () {
        return this._componentsMap.get(fe).slice();
      }, eachSeries: function (t, e) {
        s(this), d(this._seriesIndices, function (n) {
          var i = this._componentsMap.get(fe)[n];t.call(e, i, n);
        }, this);
      }, eachRawSeries: function (t, e) {
        d(this._componentsMap.get(fe), t, e);
      }, eachSeriesByType: function (t, e, n) {
        s(this), d(this._seriesIndices, function (i) {
          var r = this._componentsMap.get(fe)[i];r.subType === t && e.call(n, r, i);
        }, this);
      }, eachRawSeriesByType: function (t, e, n) {
        return d(this.getSeriesByType(t), e, n);
      }, isSeriesFiltered: function (t) {
        return s(this), u[be](this._seriesIndices, t[se]) < 0;
      }, getCurrentSeriesIndices: function () {
        return (this._seriesIndices || []).slice();
      }, filterSeries: function (t, e) {
        s(this);var n = f(this._componentsMap.get(fe), t, e);this._seriesIndices = a(n);
      }, restoreData: function () {
        var t = this._componentsMap;this._seriesIndices = a(t.get(fe));var e = [];t.each(function (t, n) {
          e.push(n);
        }), y.topologicalTravel(e, y.getAllClassMainTypes(), function (e) {
          d(t.get(e), function (t) {
            t.restoreData();
          });
        });
      } });return u.mixin(b, t("./mixin/colorPalette")), b;
  }), e("echarts/model/OptionManager", [Ze, Fe, "../util/model", "./Component"], function (t) {
    function e(t) {
      this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption;
    }function n(t, e, n) {
      var i,
          r,
          a = [],
          o = [],
          u = t.timeline;if (t.baseOption && (r = t.baseOption), (u || t.options) && (r = r || {}, a = (t.options || []).slice()), t.media) {
        r = r || {};var c = t.media;h(c, function (t) {
          t && t[l] && (t.query ? o.push(t) : i || (i = t));
        });
      }return r || (r = t), r.timeline || (r.timeline = u), h([r][pe](a)[pe](s.map(o, function (t) {
        return t[l];
      })), function (t) {
        h(e, function (e) {
          e(t, n);
        });
      }), { baseOption: r, timelineOptions: a, mediaDefault: i, mediaList: o };
    }function i(t, e, n) {
      var i = { width: e, height: n, aspectratio: e / n },
          a = !0;return s.each(t, function (t, e) {
        var n = e.match(m);if (n && n[1] && n[2]) {
          var o = n[1],
              s = n[2][Ee]();r(i[s], t, o) || (a = !1);
        }
      }), a;
    }function r(t, e, n) {
      return "min" === n ? t >= e : "max" === n ? e >= t : t === e;
    }function a(t, e) {
      return t.join(",") === e.join(",");
    }function o(t, e) {
      e = e || {}, h(e, function (e, n) {
        if (null != e) {
          var i = t[n];
          if (c.hasClass(n)) {
            e = u.normalizeToArray(e), i = u.normalizeToArray(i);var r = u.mappingToExists(i, e);t[n] = f(r, function (t) {
              return t[l] && t.exist ? p(t.exist, t[l], !0) : t.exist || t[l];
            });
          } else t[n] = p(i, e, !0);
        }
      });
    }var s = t(Fe),
        u = t("../util/model"),
        c = t("./Component"),
        h = s.each,
        d = s.clone,
        f = s.map,
        p = s.merge,
        m = /^(min|max)?(.+)$/;return e[Re] = { constructor: e, setOption: function (t, e) {
        t = d(t, !0);var i = this._optionBackup,
            r = n.call(this, t, e, !i);this._newBaseOption = r.baseOption, i ? (o(i.baseOption, r.baseOption), r.timelineOptions[we] && (i.timelineOptions = r.timelineOptions), r.mediaList[we] && (i.mediaList = r.mediaList), r.mediaDefault && (i.mediaDefault = r.mediaDefault)) : this._optionBackup = r;
      }, mountOption: function (t) {
        var e = this._optionBackup;return this._timelineOptions = f(e.timelineOptions, d), this._mediaList = f(e.mediaList, d), this._mediaDefault = d(e.mediaDefault), this._currentMediaIndices = [], d(t ? e.baseOption : this._newBaseOption);
      }, getTimelineOption: function (t) {
        var e,
            n = this._timelineOptions;if (n[we]) {
          var i = t.getComponent("timeline");i && (e = d(n[i.getCurrentIndex()], !0));
        }return e;
      }, getMediaOption: function () {
        var t = this._api[Ce](),
            e = this._api[Te](),
            n = this._mediaList,
            r = this._mediaDefault,
            o = [],
            s = [];if (!n[we] && !r) return s;for (var u = 0, c = n[we]; c > u; u++) i(n[u].query, t, e) && o.push(u);return !o[we] && r && (o = [-1]), o[we] && !a(o, this._currentMediaIndices) && (s = f(o, function (t) {
          return d(-1 === t ? r[l] : n[t][l]);
        })), this._currentMediaIndices = o, s;
      } }, e;
  }), e("echarts/model/Series", [Ze, Fe, "../util/format", "../util/clazz", "../util/model", "./Component", "./mixin/colorPalette", "zrender/core/env", "../util/layout"], function (t) {
    var e = t(Fe),
        n = t("../util/format"),
        i = t("../util/clazz"),
        r = t("../util/model"),
        a = t("./Component"),
        o = t("./mixin/colorPalette"),
        s = t("zrender/core/env"),
        u = t("../util/layout"),
        c = i.set,
        h = i.get,
        d = n.encodeHTML,
        f = n.addCommas,
        m = a[he]({ type: "series.__base__", seriesIndex: 0, coordinateSystem: null, defaultOption: null, legendDataProvider: null, visualColorAccessPath: "itemStyle.normal.color", layoutMode: null, init: function (t, e, n) {
        this[ne] = this[se], this.mergeDefaultAndTheme(t, n);var i = this.getInitialData(t, n);c(this, "dataBeforeProcessed", i), this.restoreData();
      }, mergeDefaultAndTheme: function (t, n) {
        var i = this.layoutMode,
            a = i ? u.getLayoutParams(t) : {};e.merge(t, n.getTheme().get(this.subType)), e.merge(t, this.getDefaultOption()), r.defaultEmphasis(t.label, r.LABEL_OPTIONS), this.fillDataTextStyle(t.data), i && u.mergeLayoutParam(t, a, i);
      }, mergeOption: function (t, n) {
        t = e.merge(this[l], t, !0), this.fillDataTextStyle(t.data);var i = this.layoutMode;i && u.mergeLayoutParam(this[l], t, i);var r = this.getInitialData(t, n);r && (c(this, "data", r), c(this, "dataBeforeProcessed", r.cloneShallow()));
      }, fillDataTextStyle: function (t) {
        if (t) for (var e = 0; e < t[we]; e++) t[e] && t[e].label && r.defaultEmphasis(t[e].label, r.LABEL_OPTIONS);
      }, getInitialData: function () {}, getData: function (t) {
        var e = h(this, "data");return null == t ? e : e.getLinkedData(t);
      }, setData: function (t) {
        c(this, "data", t);
      }, getRawData: function () {
        return h(this, "dataBeforeProcessed");
      }, coordDimToDataDim: function (t) {
        return r[_](this[Ve](), t);
      }, dataDimToCoordDim: function (t) {
        return r.dataDimToCoordDim(this[Ve](), t);
      }, getBaseAxis: function () {
        var t = this[_e];return t && t.getBaseAxis && t.getBaseAxis();
      }, formatTooltip: function (t, i) {
        function a(a) {
          function s(t, e) {
            var r = o.getDimensionInfo(e);if (r && r.otherDims.tooltip !== !1) {
              var a = r.type,
                  s = (l ? "- " + (r.tooltipName || r.name) + ": " : "") + (a === S ? t + "" : "time" === a ? i ? "" : n.formatTime("yyyy/MM/dd hh:mm:ss", t) : f(t));s && u.push(d(s));
            }
          }var l = e.reduce(a, function (t, e, n) {
            var i = o.getDimensionInfo(n);return t |= i && i.tooltip !== !1 && null != i.tooltipName;
          }, 0),
              u = [],
              c = r.otherDimToDataDim(o, "tooltip");return c[we] ? e.each(c, function (e) {
            s(o.get(e, t), e);
          }) : e.each(a, s), (l ? "<br/>" : "") + u.join(l ? "<br/>" : ", ");
        }var o = h(this, "data"),
            s = this[M](t),
            l = e[Y](s) ? a(s) : d(f(s)),
            u = o[p](t),
            c = o[xe](t, "color");e[Le](c) && c[ve] && (c = (c[ve][0] || {}).color), c = c || "transparent";var m = n.getTooltipMarker(c),
            v = this.name;return "\x00-" === v && (v = ""), v = v ? d(v) + (i ? ": " : "<br/>") : "", i ? m + v + l : v + m + (u ? d(u) + ": " + l : l);
      }, isAnimationEnabled: function () {
        if (s.node) return !1;var t = this[b](Ie);return t && this[Ve]().count() > this[b]("animationThreshold") && (t = !1), t;
      }, restoreData: function () {
        c(this, "data", h(this, "dataBeforeProcessed").cloneShallow());
      }, getColorFromPalette: function (t, e) {
        var n = this[F],
            i = o.getColorFromPalette.call(this, t, e);return i || (i = n.getColorFromPalette(t, e)), i;
      }, getAxisTooltipData: null, getTooltipPosition: null });return e.mixin(m, r.dataFormatMixin), e.mixin(m, o), m;
  }), e("echarts/view/Component", [Ze, "zrender/container/Group", "../util/component", "../util/clazz"], function (t) {
    var e = t("zrender/container/Group"),
        n = t("../util/component"),
        i = t("../util/clazz"),
        r = function () {
      this.group = new e(), this.uid = n.getUID("viewComponent");
    };r[Re] = { constructor: r, init: function () {}, render: function () {}, dispose: function () {} };var a = r[Re];return a.updateView = a.updateLayout = a.updateVisual = function () {}, i.enableClassExtend(r), i.enableClassManagement(r, { registerWhenExtend: !0 }), r;
  }), e("echarts/model/Component", [Ze, "./Model", Fe, "../util/component", "../util/clazz", "../util/layout", "./mixin/boxLayout"], function (t) {
    function e(t) {
      var e = [];return i.each(u.getClassesByMainType(t), function (t) {
        r.apply(e, t[Re].dependencies || []);
      }), i.map(e, function (t) {
        return o.parseClassType(t).main;
      });
    }var n = t("./Model"),
        i = t(Fe),
        r = Array[Re].push,
        a = t("../util/component"),
        o = t("../util/clazz"),
        s = t("../util/layout"),
        u = n[he]({ type: "component", id: "", name: "", mainType: "", subType: "", componentIndex: 0, defaultOption: null, ecModel: null, dependentModels: [], uid: null, layoutMode: null, $constructor: function (t, e, i, r) {
        n.call(this, t, e, i, r), this.uid = a.getUID("componentModel");
      }, init: function (t, e, n) {
        this.mergeDefaultAndTheme(t, n);
      }, mergeDefaultAndTheme: function (t, e) {
        var n = this.layoutMode,
            r = n ? s.getLayoutParams(t) : {},
            a = e.getTheme();i.merge(t, a.get(this[le])), i.merge(t, this.getDefaultOption()), n && s.mergeLayoutParam(t, r, n);
      }, mergeOption: function (t) {
        i.merge(this[l], t, !0);var e = this.layoutMode;e && s.mergeLayoutParam(this[l], t, e);
      }, optionUpdated: function () {}, getDefaultOption: function () {
        if (!o.hasOwn(this, "__defaultOption")) {
          for (var t = [], e = this.constructor; e;) {
            var n = e[Re].defaultOption;n && t.push(n), e = e.superClass;
          }for (var r = {}, a = t[we] - 1; a >= 0; a--) r = i.merge(r, t[a], !0);o.set(this, "__defaultOption", r);
        }return o.get(this, "__defaultOption");
      }, getReferringComponents: function (t) {
        return this[F].queryComponents({ mainType: t, index: this.get(t + "Index", !0), id: this.get(t + "Id", !0) });
      } });return o.enableClassManagement(u, { registerWhenExtend: !0 }), a.enableSubTypeDefaulter(u), a.enableTopologicalTravel(u, e), i.mixin(u, t("./mixin/boxLayout")), u;
  }), e("echarts/view/Chart", [Ze, "zrender/container/Group", "../util/component", "../util/clazz", "../util/model", Fe], function (t) {
    function e() {
      this.group = new r(), this.uid = a.getUID("viewChart");
    }function n(t, e) {
      if (t && (t[ue](e), "group" === t.type)) for (var i = 0; i < t.childCount(); i++) n(t.childAt(i), e);
    }function i(t, e, i) {
      var r = s.queryDataIndex(t, e);null != r ? l.each(s.normalizeToArray(r), function (e) {
        n(t[P](e), i);
      }) : t[C](function (t) {
        n(t, i);
      });
    }var r = t("zrender/container/Group"),
        a = t("../util/component"),
        o = t("../util/clazz"),
        s = t("../util/model"),
        l = t(Fe);e[Re] = { type: "chart", init: function () {}, render: function () {}, highlight: function (t, e, n, r) {
        i(t[Ve](), r, "emphasis");
      }, downplay: function (t, e, n, r) {
        i(t[Ve](), r, "normal");
      }, remove: function () {
        this.group[H]();
      }, dispose: function () {} };var u = e[Re];return u.updateView = u.updateLayout = u.updateVisual = function (t, e, n, i) {
      this.render(t, e, n, i);
    }, o.enableClassExtend(e, [oe]), o.enableClassManagement(e, { registerWhenExtend: !0 }), e;
  }), e("echarts/util/graphic", [Ze, Fe, "zrender/tool/path", "zrender/graphic/Path", "zrender/tool/color", "zrender/core/matrix", Be, "zrender/mixin/Transformable", "zrender/core/BoundingRect", "zrender/container/Group", "zrender/graphic/Image", "zrender/graphic/Text", "zrender/graphic/shape/Circle", "zrender/graphic/shape/Sector", "zrender/graphic/shape/Ring", "zrender/graphic/shape/Polygon", "zrender/graphic/shape/Polyline", "zrender/graphic/shape/Rect", "zrender/graphic/shape/Line", "zrender/graphic/shape/BezierCurve", "zrender/graphic/shape/Arc", "zrender/graphic/CompoundPath", "zrender/graphic/LinearGradient", "zrender/graphic/RadialGradient"], function (t) {
    function e(t) {
      return null != t && "none" != t;
    }function n(t) {
      return typeof t === Oe ? T.lift(t, -.1) : t;
    }function o(t) {
      if (t.__hoverStlDirty) {
        var i = t.style.stroke,
            r = t.style.fill,
            a = t.__hoverStl;a.fill = a.fill || (e(r) ? n(r) : null), a.stroke = a.stroke || (e(i) ? n(i) : null);var o = {};for (var s in a) a.hasOwnProperty(s) && (o[s] = t.style[s]);t.__normalStl = o, t.__hoverStlDirty = !1;
      }
    }function l(t) {
      t.__isHover || (o(t), t.useHoverLayer ? t.__zr && t.__zr.addHover(t, t.__hoverStl) : (t[J](t.__hoverStl), t.z2 += 1), t.__isHover = !0);
    }function c(t) {
      if (t.__isHover) {
        var e = t.__normalStl;t.useHoverLayer ? t.__zr && t.__zr.removeHover(t) : (e && t[J](e), t.z2 -= 1), t.__isHover = !1;
      }
    }function p(t) {
      "group" === t.type ? t[te](function (t) {
        "group" !== t.type && l(t);
      }) : l(t);
    }function m(t) {
      "group" === t.type ? t[te](function (t) {
        "group" !== t.type && c(t);
      }) : c(t);
    }function v(t, e) {
      t.__hoverStl = t.hoverStyle || e || {}, t.__hoverStlDirty = !0, t.__isHover && o(t);
    }function g(t) {
      this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && p(this);
    }function y(t) {
      this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && m(this);
    }function x() {
      this.__isEmphasis = !0, p(this);
    }function _() {
      this.__isEmphasis = !1, m(this);
    }function w(t, e, n, i, r, a) {
      typeof r === j && (a = r, r = null);var o = i && i.isAnimationEnabled();if (o) {
        var s = t ? "Update" : "",
            l = i[b]("animationDuration" + s),
            u = i[b]("animationEasing" + s),
            c = i[b]("animationDelay" + s);typeof c === j && (c = c(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), typeof l === j && (l = l(r)), l > 0 ? e.animateTo(n, l, c || 0, u, a) : (e[Pe](), e.attr(n), a && a());
      } else e[Pe](), e.attr(n), a && a();
    }var M = t(Fe),
        S = t("zrender/tool/path"),
        P = t("zrender/graphic/Path"),
        T = t("zrender/tool/color"),
        C = t("zrender/core/matrix"),
        k = t(Be),
        I = t("zrender/mixin/Transformable"),
        D = t("zrender/core/BoundingRect"),
        z = Math.round,
        O = Math.max,
        R = Math.min,
        E = {};return E.Group = t("zrender/container/Group"), E.Image = t("zrender/graphic/Image"), E.Text = t("zrender/graphic/Text"), E.Circle = t("zrender/graphic/shape/Circle"), E.Sector = t("zrender/graphic/shape/Sector"), E.Ring = t("zrender/graphic/shape/Ring"), E.Polygon = t("zrender/graphic/shape/Polygon"), E.Polyline = t("zrender/graphic/shape/Polyline"), E.Rect = t("zrender/graphic/shape/Rect"), E.Line = t("zrender/graphic/shape/Line"), E.BezierCurve = t("zrender/graphic/shape/BezierCurve"), E.Arc = t("zrender/graphic/shape/Arc"), E.CompoundPath = t("zrender/graphic/CompoundPath"), E.LinearGradient = t("zrender/graphic/LinearGradient"), E.RadialGradient = t("zrender/graphic/RadialGradient"), E.BoundingRect = D, E.extendShape = function (t) {
      return P[he](t);
    }, E.extendPath = function (t, e) {
      return S.extendFromString(t, e);
    }, E.makePath = function (t, e, n, i) {
      var r = S.createFromString(t, e),
          o = r[a]();if (n) {
        var l = o.width / o[De];if (i === s) {
          var u,
              c = n[De] * l;c <= n.width ? u = n[De] : (c = n.width, u = c / l);var h = n.x + n.width / 2,
              d = n.y + n[De] / 2;n.x = h - c / 2, n.y = d - u / 2, n.width = c, n[De] = u;
        }E.resizePath(r, n);
      }return r;
    }, E.mergePath = S.mergePath, E.resizePath = function (t, e) {
      if (t[r]) {
        var n = t[a](),
            i = n.calculateTransform(e);t[r](i);
      }
    }, E.subPixelOptimizeLine = function (t) {
      var e = E.subPixelOptimize,
          n = t.shape,
          r = t.style[i];return z(2 * n.x1) === z(2 * n.x2) && (n.x1 = n.x2 = e(n.x1, r, !0)), z(2 * n.y1) === z(2 * n.y2) && (n.y1 = n.y2 = e(n.y1, r, !0)), t;
    }, E.subPixelOptimizeRect = function (t) {
      var e = E.subPixelOptimize,
          n = t.shape,
          r = t.style[i],
          a = n.x,
          o = n.y,
          s = n.width,
          l = n[De];return n.x = e(n.x, r, !0), n.y = e(n.y, r, !0), n.width = Math.max(e(a + s, r, !1) - n.x, 0 === s ? 0 : 1), n[De] = Math.max(e(o + l, r, !1) - n.y, 0 === l ? 0 : 1), t;
    }, E.subPixelOptimize = function (t, e, n) {
      var i = z(2 * t);return (i + z(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
    }, E.setHoverStyle = function (t, e, n) {
      t.__hoverSilentOnTouch = n && n.hoverSilentOnTouch, "group" === t.type ? t[te](function (t) {
        "group" !== t.type && v(t, e);
      }) : v(t, e), t.on(re, g).on(ie, y), t.on("emphasis", x).on("normal", _);
    }, E.setText = function (t, e, n) {
      var i = e[b](A) || "inside",
          r = e[b](L),
          a = i[be]("inside") >= 0 ? "white" : n,
          o = e[ke](f);M[he](t, { textDistance: e[b]("distance") || 5, textFont: o[h](), textPosition: i, textOffset: r, textFill: o[d]() || a });
    }, E[h] = function (t, e) {
      var n = e && e[ke](f);return [t.fontStyle || n && n[b]("fontStyle") || "", t.fontWeight || n && n[b]("fontWeight") || "", (t.fontSize || n && n[b]("fontSize") || 12) + "px", t.fontFamily || n && n[b]("fontFamily") || "sans-serif"].join(" ");
    }, E.updateProps = function (t, e, n, i, r) {
      w(!0, t, e, n, i, r);
    }, E.initProps = function (t, e, n, i, r) {
      w(!1, t, e, n, i, r);
    }, E.getTransform = function (t, e) {
      for (var n = C.identity([]); t && t !== e;) C.mul(n, t.getLocalTransform(), n), t = t[Q];return n;
    }, E[r] = function (t, e, n) {
      return e && !M.isArrayLike(e) && (e = I.getLocalTransform(e)), n && (e = C.invert([], e)), k[r]([], t, e);
    }, E.transformDirection = function (t, e, n) {
      var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),
          a = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),
          o = ["left" === t ? -i : "right" === t ? i : 0, "top" === t ? -a : t === Me ? a : 0];return o = E[r](o, e, n), Math.abs(o[0]) > Math.abs(o[1]) ? o[0] > 0 ? "right" : "left" : o[1] > 0 ? Me : "top";
    }, E.groupTransition = function (t, e, n) {
      function i(t) {
        var e = {};return t[te](function (t) {
          !t.isGroup && t.anid && (e[t.anid] = t);
        }), e;
      }function r(t) {
        var e = { position: k.clone(t[A]), rotation: t[u] };return t.shape && (e.shape = M[he]({}, t.shape)), e;
      }if (t && e) {
        var a = i(t);e[te](function (t) {
          if (!t.isGroup && t.anid) {
            var e = a[t.anid];if (e) {
              var i = r(t);t.attr(r(e)), E.updateProps(t, i, n, t.dataIndex);
            }
          }
        });
      }
    }, E.clipPointsByRect = function (t, e) {
      return M.map(t, function (t) {
        var n = t[0];n = O(n, e.x), n = R(n, e.x + e.width);var i = t[1];return i = O(i, e.y), i = R(i, e.y + e[De]), [n, i];
      });
    }, E.clipRectByRect = function (t, e) {
      var n = O(t.x, e.x),
          i = R(t.x + t.width, e.x + e.width),
          r = O(t.y, e.y),
          a = R(t.y + t[De], e.y + e[De]);return i >= n && a >= r ? { x: n, y: r, width: i - n, height: a - r } : void 0;
    }, E;
  }), e("echarts/util/model", [Ze, "./format", "./number", "../model/Model", Fe], function (t) {
    function e(t, e) {
      return t && t.hasOwnProperty(e);
    }var n = t("./format"),
        i = t("./number"),
        r = t("../model/Model"),
        a = t(Fe),
        o = a.each,
        s = a[Le],
        u = {};return u.normalizeToArray = function (t) {
      return t instanceof Array ? t : null == t ? [] : [t];
    }, u.defaultEmphasis = function (t, e) {
      if (t) {
        var n = t.emphasis = t.emphasis || {},
            i = t.normal = t.normal || {};o(e, function (t) {
          var e = a[y](n[t], i[t]);null != e && (n[t] = e);
        });
      }
    }, u.LABEL_OPTIONS = [A, L, "show", f, "distance", "formatter"], u.getDataItemValue = function (t) {
      return t && (null == t.value ? t : t.value);
    }, u.isDataItemOption = function (t) {
      return s(t) && !(t instanceof Array);
    }, u.converDataValue = function (t, e) {
      var n = e && e.type;return n === S ? t : ("time" === n && typeof t !== U && null != t && "-" !== t && (t = +i.parseDate(t)), null == t || "" === t ? 0 / 0 : +t);
    }, u.createDataFormatModel = function (t, e) {
      var n = new r();return a.mixin(n, u.dataFormatMixin), n[ne] = e[ne], n.name = e.name || "", n[le] = e[le], n.subType = e.subType, n[Ve] = function () {
        return t;
      }, n;
    }, u.dataFormatMixin = { getDataParams: function (t, e) {
        var i = this[Ve](e),
            r = this[M](t, e),
            a = i.getRawIndex(t),
            o = i[p](t, !0),
            s = i.getRawDataItem(t),
            l = i[xe](t, "color");return { componentType: this[le], componentSubType: this.subType, seriesType: this[le] === fe ? this.subType : null, seriesIndex: this[ne], seriesId: this.id, seriesName: this.name, name: o, dataIndex: a, data: s, dataType: e, value: r, color: l, marker: n.getTooltipMarker(l), $vars: ["seriesName", "name", "value"] };
      }, getFormattedLabel: function (t, e, i, r, a) {
        e = e || "normal";var o = this[Ve](i),
            s = o[w](t),
            l = this[ee](t, i);null != r && l.value instanceof Array && (l.value = l.value[r]);var u = s.get([a || "label", e, "formatter"]);return typeof u === j ? (l.status = e, u(l)) : typeof u === Oe ? n.formatTpl(u, l) : void 0;
      }, getRawValue: function (t, e) {
        var n = this[Ve](e),
            i = n.getRawDataItem(t);return null != i ? !s(i) || i instanceof Array ? i : i.value : void 0;
      }, formatTooltip: a.noop }, u.mappingToExists = function (t, e) {
      e = (e || []).slice();var n = a.map(t || [], function (t) {
        return { exist: t };
      });return o(e, function (t, i) {
        if (s(t)) {
          for (var r = 0; r < n[we]; r++) if (!n[r][l] && null != t.id && n[r].exist.id === t.id + "") return n[r][l] = t, void (e[i] = null);for (var r = 0; r < n[we]; r++) {
            var a = n[r].exist;if (!(n[r][l] || null != a.id && null != t.id || null == t.name || u.isIdInner(t) || u.isIdInner(a) || a.name !== t.name + "")) return n[r][l] = t, void (e[i] = null);
          }
        }
      }), o(e, function (t) {
        if (s(t)) {
          for (var e = 0; e < n[we]; e++) {
            var i = n[e].exist;if (!n[e][l] && !u.isIdInner(i) && null == t.id) {
              n[e][l] = t;break;
            }
          }e >= n[we] && n.push({ option: t });
        }
      }), n;
    }, u.makeIdAndName = function (t) {
      var e = a.createHashMap();o(t, function (t) {
        var n = t.exist;n && e.set(n.id, t);
      }), o(t, function (t) {
        var n = t[l];a.assert(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {});
      }), o(t, function (t) {
        var n = t.exist,
            i = t[l],
            r = t.keyInfo;if (s(i)) {
          if (r.name = null != i.name ? i.name + "" : n ? n.name : "\x00-", n) r.id = n.id;else if (null != i.id) r.id = i.id + "";else {
            var a = 0;do r.id = "\x00" + r.name + "\x00" + a++; while (e.get(r.id));
          }e.set(r.id, t);
        }
      });
    }, u.isIdInner = function (t) {
      return s(t) && t.id && 0 === (t.id + "")[be]("\x00_ec_\x00");
    }, u.compressBatches = function (t, e) {
      function n(t, e, n) {
        for (var i = 0, r = t[we]; r > i; i++) for (var a = t[i].seriesId, o = u.normalizeToArray(t[i].dataIndex), s = n && n[a], l = 0, c = o[we]; c > l; l++) {
          var h = o[l];s && s[h] ? s[h] = null : (e[a] || (e[a] = {}))[h] = 1;
        }
      }function i(t, e) {
        var n = [];for (var r in t) if (t.hasOwnProperty(r) && null != t[r]) if (e) n.push(+r);else {
          var a = i(t[r], !0);a[we] && n.push({ seriesId: r, dataIndex: a });
        }return n;
      }var r = {},
          a = {};return n(t || [], r), n(e || [], a, r), [i(r), i(a)];
    }, u.queryDataIndex = function (t, e) {
      return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? a[Y](e.dataIndex) ? a.map(e.dataIndex, function (e) {
        return t.indexOfRawIndex(e);
      }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? a[Y](e.name) ? a.map(e.name, function (e) {
        return t.indexOfName(e);
      }) : t.indexOfName(e.name) : void 0;
    }, u.makeGetter = function () {
      var t = 0;return function () {
        var e = "\x00__ec_prop_getter_" + t++;return function (t) {
          return t[e] || (t[e] = {});
        };
      };
    }(), u.parseFinder = function (t, n, i) {
      if (a[q](n)) {
        var r = {};r[n + "Index"] = 0, n = r;
      }var s = i && i.defaultMainType;!s || e(n, s + "Index") || e(n, s + "Id") || e(n, s + "Name") || (n[s + "Index"] = 0);var l = {};return o(n, function (e, r) {
        var e = n[r];if ("dataIndex" === r || "dataIndexInside" === r) return void (l[r] = e);var o = r.match(/^(\w+)(Index|Id|Name)$/) || [],
            s = o[1],
            u = (o[2] || "")[Ee]();if (!(!s || !u || null == e || "index" === u && "none" === e || i && i.includeMainTypes && a[be](i.includeMainTypes, s) < 0)) {
          var c = { mainType: s };("index" !== u || "all" !== e) && (c[u] = e);var h = t.queryComponents(c);l[s + "Models"] = h, l[s + "Model"] = h[0];
        }
      }), l;
    }, u.dataDimToCoordDim = function (t, e) {
      var n = t[X];e = t.getDimension(e);for (var i = 0; i < n[we]; i++) {
        var r = t.getDimensionInfo(n[i]);if (r.name === e) return r.coordDim;
      }
    }, u[_] = function (t, e) {
      var n = [];return o(t[X], function (i) {
        var r = t.getDimensionInfo(i);r.coordDim === e && (n[r.coordDimIndex] = r.name);
      }), n;
    }, u.otherDimToDataDim = function (t, e) {
      var n = [];return o(t[X], function (i) {
        var r = t.getDimensionInfo(i),
            a = r.otherDims,
            o = a[e];null != o && o !== !1 && (n[o] = r.name);
      }), n;
    }, u;
  }), e("echarts/util/throttle", [], function () {
    var t = {},
        e = "\x00__throttleOriginMethod",
        n = "\x00__throttleRate",
        i = "\x00__throttleType";return t.throttle = function (t, e, n) {
      function i() {
        c = new Date().getTime(), h = null, t.apply(o, s || []);
      }var r,
          a,
          o,
          s,
          l,
          u = 0,
          c = 0,
          h = null;e = e || 0;var d = function () {
        r = new Date().getTime(), o = this, s = arguments;var t = l || e,
            d = l || n;l = null, a = r - (d ? u : c) - t, clearTimeout(h), d ? h = setTimeout(i, t) : a >= 0 ? i() : h = setTimeout(i, -a), u = r;
      };return d.clear = function () {
        h && (clearTimeout(h), h = null);
      }, d.debounceNextCall = function (t) {
        l = t;
      }, d;
    }, t.createOrUpdate = function (r, a, o, s) {
      var l = r[a];if (l) {
        var u = l[e] || l,
            c = l[i],
            h = l[n];if (h !== o || c !== s) {
          if (null == o || !s) return r[a] = u;l = r[a] = t.throttle(u, o, "debounce" === s), l[e] = u, l[i] = s, l[n] = o;
        }return l;
      }
    }, t.clear = function (t, n) {
      var i = t[n];i && i[e] && (t[n] = i[e]);
    }, t;
  }), e("zrender/zrender", [Ze, "./core/guid", "./core/env", "./core/util", "./Handler", "./Storage", "./animation/Animation", "./dom/HandlerProxy", "./Painter"], function (t) {
    function e(t) {
      delete h[t];
    }var n = t("./core/guid"),
        i = t("./core/env"),
        r = t("./core/util"),
        a = t("./Handler"),
        o = t("./Storage"),
        s = t("./animation/Animation"),
        l = t("./dom/HandlerProxy"),
        u = !i.canvasSupported,
        c = { canvas: t("./Painter") },
        h = {},
        d = {};d.version = "3.5.2", d.init = function (t, e) {
      var i = new f(n(), t, e);return h[i.id] = i, i;
    }, d[oe] = function (t) {
      if (t) t[oe]();else {
        for (var e in h) h.hasOwnProperty(e) && h[e][oe]();h = {};
      }return d;
    }, d.getInstance = function (t) {
      return h[t];
    }, d.registerPainter = function (t, e) {
      c[t] = e;
    };var f = function (t, e, n) {
      n = n || {}, this.dom = e, this.id = t;var h = this,
          d = new o(),
          f = n.renderer;if (u) {
        if (!c.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");f = "vml";
      } else f && c[f] || (f = ze);var p = new c[f](e, d, n);this.storage = d, this.painter = p;var m = i.node ? null : new l(p.getViewportRoot());this.handler = new a(d, p, m, p.root), this[Ie] = new s({ stage: { update: r.bind(this.flush, this) } }), this[Ie].start(), this._needsRefresh;var v = d.delFromStorage,
          g = d.addToStorage;d.delFromStorage = function (t) {
        v.call(d, t), t && t.removeSelfFromZr(h);
      }, d.addToStorage = function (t) {
        g.call(d, t), t.addSelfToZr(h);
      };
    };return f[Re] = { constructor: f, getId: function () {
        return this.id;
      }, add: function (t) {
        this.storage.addRoot(t), this._needsRefresh = !0;
      }, remove: function (t) {
        this.storage.delRoot(t), this._needsRefresh = !0;
      }, configLayer: function (t, e) {
        this.painter.configLayer(t, e), this._needsRefresh = !0;
      }, refreshImmediately: function () {
        this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1;
      }, refresh: function () {
        this._needsRefresh = !0;
      }, flush: function () {
        this._needsRefresh && this.refreshImmediately(), this._needsRefreshHover && this.refreshHoverImmediately();
      }, addHover: function (t, e) {
        this.painter.addHover && (this.painter.addHover(t, e), this.refreshHover());
      }, removeHover: function (t) {
        this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover());
      }, clearHover: function () {
        this.painter.clearHover && (this.painter.clearHover(), this.refreshHover());
      }, refreshHover: function () {
        this._needsRefreshHover = !0;
      }, refreshHoverImmediately: function () {
        this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover();
      }, resize: function (t) {
        t = t || {}, this.painter.resize(t.width, t[De]), this.handler.resize();
      }, clearAnimation: function () {
        this[Ie].clear();
      }, getWidth: function () {
        return this.painter[Ce]();
      }, getHeight: function () {
        return this.painter[Te]();
      }, pathToImage: function (t, e) {
        return this.painter.pathToImage(t, e);
      }, setCursorStyle: function (t) {
        this.handler.setCursorStyle(t);
      }, findHover: function (t, e) {
        return this.handler.findHover(t, e);
      }, on: function (t, e, n) {
        this.handler.on(t, e, n);
      }, off: function (t, e) {
        this.handler.off(t, e);
      }, trigger: function (t, e) {
        this.handler[ue](t, e);
      }, clear: function () {
        this.storage.delRoot(), this.painter.clear();
      }, dispose: function () {
        this[Ie].stop(), this.clear(), this.storage[oe](), this.painter[oe](), this.handler[oe](), this[Ie] = this.storage = this.painter = this.handler = null, e(this.id);
      } }, d;
  }), e("zrender/core/timsort", [], function () {
    function t(t) {
      for (var e = 0; t >= l;) e |= 1 & t, t >>= 1;return t + e;
    }function e(t, e, i, r) {
      var a = e + 1;if (a === i) return 1;if (r(t[a++], t[e]) < 0) {
        for (; i > a && r(t[a], t[a - 1]) < 0;) a++;n(t, e, a);
      } else for (; i > a && r(t[a], t[a - 1]) >= 0;) a++;return a - e;
    }function n(t, e, n) {
      for (n--; n > e;) {
        var i = t[e];t[e++] = t[n], t[n--] = i;
      }
    }function i(t, e, n, i, r) {
      for (i === e && i++; n > i; i++) {
        for (var a, o = t[i], s = e, l = i; l > s;) a = s + l >>> 1, r(o, t[a]) < 0 ? l = a : s = a + 1;var u = i - s;switch (u) {case 3:
            t[s + 3] = t[s + 2];case 2:
            t[s + 2] = t[s + 1];case 1:
            t[s + 1] = t[s];break;default:
            for (; u > 0;) t[s + u] = t[s + u - 1], u--;}t[s] = o;
      }
    }function r(t, e, n, i, r, a) {
      var o = 0,
          s = 0,
          l = 1;if (a(t, e[n + r]) > 0) {
        for (s = i - r; s > l && a(t, e[n + r + l]) > 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);l > s && (l = s), o += r, l += r;
      } else {
        for (s = r + 1; s > l && a(t, e[n + r - l]) <= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);l > s && (l = s);var u = o;o = r - l, l = r - u;
      }for (o++; l > o;) {
        var c = o + (l - o >>> 1);a(t, e[n + c]) > 0 ? o = c + 1 : l = c;
      }return l;
    }function a(t, e, n, i, r, a) {
      var o = 0,
          s = 0,
          l = 1;if (a(t, e[n + r]) < 0) {
        for (s = r + 1; s > l && a(t, e[n + r - l]) < 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);l > s && (l = s);var u = o;o = r - l, l = r - u;
      } else {
        for (s = i - r; s > l && a(t, e[n + r + l]) >= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);l > s && (l = s), o += r, l += r;
      }for (o++; l > o;) {
        var c = o + (l - o >>> 1);a(t, e[n + c]) < 0 ? l = c : o = c + 1;
      }return l;
    }function o(t, e) {
      function n(t, e) {
        d[y] = t, f[y] = e, y += 1;
      }function i() {
        for (; y > 1;) {
          var t = y - 2;if (t >= 1 && f[t - 1] <= f[t] + f[t + 1] || t >= 2 && f[t - 2] <= f[t] + f[t - 1]) f[t - 1] < f[t + 1] && t--;else if (f[t] > f[t + 1]) break;s(t);
        }
      }function o() {
        for (; y > 1;) {
          var t = y - 2;t > 0 && f[t - 1] < f[t + 1] && t--, s(t);
        }
      }function s(n) {
        var i = d[n],
            o = f[n],
            s = d[n + 1],
            u = f[n + 1];f[n] = o + u, n === y - 3 && (d[n + 1] = d[n + 2], f[n + 1] = f[n + 2]), y--;var c = a(t[s], t, i, o, 0, e);i += c, o -= c, 0 !== o && (u = r(t[i + o - 1], t, s, u, u - 1, e), 0 !== u && (u >= o ? l(i, o, s, u) : h(i, o, s, u)));
      }function l(n, i, o, s) {
        var l = 0;for (l = 0; i > l; l++) x[l] = t[n + l];var c = 0,
            h = o,
            d = n;if (t[d++] = t[h++], 0 !== --s) {
          if (1 === i) {
            for (l = 0; s > l; l++) t[d + l] = t[h + l];return void (t[d + s] = x[c]);
          }for (var f, m, v, g = p;;) {
            f = 0, m = 0, v = !1;do if (e(t[h], x[c]) < 0) {
              if (t[d++] = t[h++], m++, f = 0, 0 === --s) {
                v = !0;break;
              }
            } else if (t[d++] = x[c++], f++, m = 0, 1 === --i) {
              v = !0;break;
            } while (g > (f | m));if (v) break;do {
              if (f = a(t[h], x, c, i, 0, e), 0 !== f) {
                for (l = 0; f > l; l++) t[d + l] = x[c + l];if (d += f, c += f, i -= f, 1 >= i) {
                  v = !0;break;
                }
              }if (t[d++] = t[h++], 0 === --s) {
                v = !0;break;
              }if (m = r(x[c], t, h, s, 0, e), 0 !== m) {
                for (l = 0; m > l; l++) t[d + l] = t[h + l];if (d += m, h += m, s -= m, 0 === s) {
                  v = !0;break;
                }
              }if (t[d++] = x[c++], 1 === --i) {
                v = !0;break;
              }g--;
            } while (f >= u || m >= u);if (v) break;0 > g && (g = 0), g += 2;
          }if (p = g, 1 > p && (p = 1), 1 === i) {
            for (l = 0; s > l; l++) t[d + l] = t[h + l];t[d + s] = x[c];
          } else {
            if (0 === i) throw new Error();for (l = 0; i > l; l++) t[d + l] = x[c + l];
          }
        } else for (l = 0; i > l; l++) t[d + l] = x[c + l];
      }function h(n, i, o, s) {
        var l = 0;for (l = 0; s > l; l++) x[l] = t[o + l];var c = n + i - 1,
            h = s - 1,
            d = o + s - 1,
            f = 0,
            m = 0;if (t[d--] = t[c--], 0 !== --i) {
          if (1 === s) {
            for (d -= i, c -= i, m = d + 1, f = c + 1, l = i - 1; l >= 0; l--) t[m + l] = t[f + l];return void (t[d] = x[h]);
          }for (var v = p;;) {
            var g = 0,
                y = 0,
                _ = !1;do if (e(x[h], t[c]) < 0) {
              if (t[d--] = t[c--], g++, y = 0, 0 === --i) {
                _ = !0;break;
              }
            } else if (t[d--] = x[h--], y++, g = 0, 1 === --s) {
              _ = !0;break;
            } while (v > (g | y));if (_) break;do {
              if (g = i - a(x[h], t, n, i, i - 1, e), 0 !== g) {
                for (d -= g, c -= g, i -= g, m = d + 1, f = c + 1, l = g - 1; l >= 0; l--) t[m + l] = t[f + l];if (0 === i) {
                  _ = !0;break;
                }
              }if (t[d--] = x[h--], 1 === --s) {
                _ = !0;break;
              }if (y = s - r(t[c], x, 0, s, s - 1, e), 0 !== y) {
                for (d -= y, h -= y, s -= y, m = d + 1, f = h + 1, l = 0; y > l; l++) t[m + l] = x[f + l];if (1 >= s) {
                  _ = !0;break;
                }
              }if (t[d--] = t[c--], 0 === --i) {
                _ = !0;break;
              }v--;
            } while (g >= u || y >= u);if (_) break;0 > v && (v = 0), v += 2;
          }if (p = v, 1 > p && (p = 1), 1 === s) {
            for (d -= i, c -= i, m = d + 1, f = c + 1, l = i - 1; l >= 0; l--) t[m + l] = t[f + l];t[d] = x[h];
          } else {
            if (0 === s) throw new Error();for (f = d - (s - 1), l = 0; s > l; l++) t[f + l] = x[l];
          }
        } else for (f = d - (s - 1), l = 0; s > l; l++) t[f + l] = x[l];
      }var d,
          f,
          p = u,
          m = 0,
          v = c,
          g = 0,
          y = 0;m = t[we], 2 * c > m && (v = m >>> 1);var x = [];g = 120 > m ? 5 : 1542 > m ? 10 : 119151 > m ? 19 : 40, d = [], f = [], this.mergeRuns = i, this.forceMergeRuns = o, this.pushRun = n;
    }function s(n, r, a, s) {
      a || (a = 0), s || (s = n[we]);var u = s - a;if (!(2 > u)) {
        var c = 0;if (l > u) return c = e(n, a, s, r), void i(n, a, s, a + c, r);var h = new o(n, r),
            d = t(u);do {
          if (c = e(n, a, s, r), d > c) {
            var f = u;f > d && (f = d), i(n, a, a + f, a + c, r), c = f;
          }h.pushRun(a, c), h.mergeRuns(), u -= c, a += c;
        } while (0 !== u);h.forceMergeRuns();
      }
    }var l = 32,
        u = 7,
        c = 256;return s;
  }), e("echarts/visual/seriesColor", [Ze, "zrender/graphic/Gradient"], function (t) {
    var e = t("zrender/graphic/Gradient");return function (t) {
      function n(n) {
        var i = (n.visualColorAccessPath || "itemStyle.normal.color").split("."),
            r = n[Ve](),
            a = n.get(i) || n.getColorFromPalette(n.get("name"));r.setVisual("color", a), t.isSeriesFiltered(n) || (typeof a !== j || a instanceof e || r.each(function (t) {
          r.setItemVisual(t, "color", a(n[ee](t)));
        }), r.each(function (t) {
          var e = r[w](t),
              n = e.get(i, !0);null != n && r.setItemVisual(t, "color", n);
        }));
      }t.eachRawSeries(n);
    };
  }), e("zrender/mixin/Eventful", [Ze], function () {
    var t = Array[Re].slice,
        e = function () {
      this._$handlers = {};
    };return e[Re] = { constructor: e, one: function (t, e, n) {
        var i = this._$handlers;if (!e || !t) return this;i[t] || (i[t] = []);for (var r = 0; r < i[t][we]; r++) if (i[t][r].h === e) return this;return i[t].push({ h: e, one: !0, ctx: n || this }), this;
      }, on: function (t, e, n) {
        var i = this._$handlers;if (!e || !t) return this;i[t] || (i[t] = []);for (var r = 0; r < i[t][we]; r++) if (i[t][r].h === e) return this;return i[t].push({ h: e, one: !1, ctx: n || this }), this;
      }, isSilent: function (t) {
        var e = this._$handlers;return e[t] && e[t][we];
      }, off: function (t, e) {
        var n = this._$handlers;if (!t) return this._$handlers = {}, this;if (e) {
          if (n[t]) {
            for (var i = [], r = 0, a = n[t][we]; a > r; r++) n[t][r].h != e && i.push(n[t][r]);n[t] = i;
          }n[t] && 0 === n[t][we] && delete n[t];
        } else delete n[t];return this;
      }, trigger: function (e) {
        if (this._$handlers[e]) {
          var n = arguments,
              i = n[we];i > 3 && (n = t.call(n, 1));for (var r = this._$handlers[e], a = r[we], o = 0; a > o;) {
            switch (i) {case 1:
                r[o].h.call(r[o].ctx);break;case 2:
                r[o].h.call(r[o].ctx, n[1]);break;case 3:
                r[o].h.call(r[o].ctx, n[1], n[2]);break;default:
                r[o].h.apply(r[o].ctx, n);}r[o].one ? (r[ae](o, 1), a--) : o++;
          }
        }return this;
      }, triggerWithContext: function (e) {
        if (this._$handlers[e]) {
          var n = arguments,
              i = n[we];i > 4 && (n = t.call(n, 1, n[we] - 1));for (var r = n[n[we] - 1], a = this._$handlers[e], o = a[we], s = 0; o > s;) {
            switch (i) {case 1:
                a[s].h.call(r);break;case 2:
                a[s].h.call(r, n[1]);break;case 3:
                a[s].h.call(r, n[1], n[2]);break;default:
                a[s].h.apply(r, n);}a[s].one ? (a[ae](s, 1), o--) : s++;
          }
        }return this;
      } }, e;
  }), e("zrender/tool/color", [Ze, "../core/LRU"], function (t) {
    function e(t) {
      return t = Math.round(t), 0 > t ? 0 : t > 255 ? 255 : t;
    }function n(t) {
      return t = Math.round(t), 0 > t ? 0 : t > 360 ? 360 : t;
    }function i(t) {
      return 0 > t ? 0 : t > 1 ? 1 : t;
    }function r(t) {
      return e(t[we] && "%" === t.charAt(t[we] - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));
    }function a(t) {
      return i(t[we] && "%" === t.charAt(t[we] - 1) ? parseFloat(t) / 100 : parseFloat(t));
    }function o(t, e, n) {
      return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t;
    }function s(t, e, n) {
      return t + (e - t) * n;
    }function l(t, e, n, i, r) {
      return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t;
    }function u(t, e) {
      return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
    }function c(t, e) {
      S && u(S, e), S = M.put(t, S || e.slice());
    }function h(t, e) {
      if (t) {
        e = e || [];var n = M.get(t);if (n) return u(e, n);t += "";var i = t[$](/ /g, "")[Ee]();if (i in w) return u(e, w[i]), c(t, e), e;if ("#" !== i.charAt(0)) {
          var o = i[be]("("),
              s = i[be](")");if (-1 !== o && s + 1 === i[we]) {
            var h = i.substr(0, o),
                f = i.substr(o + 1, s - (o + 1)).split(","),
                p = 1;switch (h) {case "rgba":
                if (4 !== f[we]) return void l(e, 0, 0, 0, 1);p = a(f.pop());case "rgb":
                return 3 !== f[we] ? void l(e, 0, 0, 0, 1) : (l(e, r(f[0]), r(f[1]), r(f[2]), p), c(t, e), e);case "hsla":
                return 4 !== f[we] ? void l(e, 0, 0, 0, 1) : (f[3] = a(f[3]), d(f, e), c(t, e), e);case "hsl":
                return 3 !== f[we] ? void l(e, 0, 0, 0, 1) : (d(f, e), c(t, e), e);default:
                return;}
          }l(e, 0, 0, 0, 1);
        } else {
          if (4 === i[we]) {
            var m = parseInt(i.substr(1), 16);return m >= 0 && 4095 >= m ? (l(e, (3840 & m) >> 4 | (3840 & m) >> 8, 240 & m | (240 & m) >> 4, 15 & m | (15 & m) << 4, 1), c(t, e), e) : void l(e, 0, 0, 0, 1);
          }if (7 === i[we]) {
            var m = parseInt(i.substr(1), 16);return m >= 0 && 16777215 >= m ? (l(e, (16711680 & m) >> 16, (65280 & m) >> 8, 255 & m, 1), c(t, e), e) : void l(e, 0, 0, 0, 1);
          }
        }
      }
    }function d(t, n) {
      var i = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
          r = a(t[1]),
          s = a(t[2]),
          u = .5 >= s ? s * (r + 1) : s + r - s * r,
          c = 2 * s - u;return n = n || [], l(n, e(255 * o(c, u, i + 1 / 3)), e(255 * o(c, u, i)), e(255 * o(c, u, i - 1 / 3)), 1), 4 === t[we] && (n[3] = t[3]), n;
    }function f(t) {
      if (t) {
        var e,
            n,
            i = t[0] / 255,
            r = t[1] / 255,
            a = t[2] / 255,
            o = Math.min(i, r, a),
            s = Math.max(i, r, a),
            l = s - o,
            u = (s + o) / 2;if (0 === l) e = 0, n = 0;else {
          n = .5 > u ? l / (s + o) : l / (2 - s - o);var c = ((s - i) / 6 + l / 2) / l,
              h = ((s - r) / 6 + l / 2) / l,
              d = ((s - a) / 6 + l / 2) / l;i === s ? e = d - h : r === s ? e = 1 / 3 + c - d : a === s && (e = 2 / 3 + h - c), 0 > e && (e += 1), e > 1 && (e -= 1);
        }var f = [360 * e, n, u];return null != t[3] && f.push(t[3]), f;
      }
    }function p(t, e) {
      var n = h(t);if (n) {
        for (var i = 0; 3 > i; i++) n[i] = 0 > e ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0;return _(n, 4 === n[we] ? "rgba" : "rgb");
      }
    }function m(t) {
      var e = h(t);return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;
    }function v(t, n, r) {
      if (n && n[we] && t >= 0 && 1 >= t) {
        r = r || [];var a = t * (n[we] - 1),
            o = Math.floor(a),
            l = Math.ceil(a),
            u = n[o],
            c = n[l],
            h = a - o;return r[0] = e(s(u[0], c[0], h)), r[1] = e(s(u[1], c[1], h)), r[2] = e(s(u[2], c[2], h)), r[3] = i(s(u[3], c[3], h)), r;
      }
    }function g(t, n, r) {
      if (n && n[we] && t >= 0 && 1 >= t) {
        var a = t * (n[we] - 1),
            o = Math.floor(a),
            l = Math.ceil(a),
            u = h(n[o]),
            c = h(n[l]),
            d = a - o,
            f = _([e(s(u[0], c[0], d)), e(s(u[1], c[1], d)), e(s(u[2], c[2], d)), i(s(u[3], c[3], d))], "rgba");return r ? { color: f, leftIndex: o, rightIndex: l, value: a } : f;
      }
    }function y(t, e, i, r) {
      return t = h(t), t ? (t = f(t), null != e && (t[0] = n(e)), null != i && (t[1] = a(i)), null != r && (t[2] = a(r)), _(d(t), "rgba")) : void 0;
    }function x(t, e) {
      return t = h(t), t && null != e ? (t[3] = i(e), _(t, "rgba")) : void 0;
    }function _(t, e) {
      if (t && t[we]) {
        var n = t[0] + "," + t[1] + "," + t[2];return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")";
      }
    }var b = t("../core/LRU"),
        w = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255, 1], antiquewhite: [250, 235, 215, 1], aqua: [0, 255, 255, 1], aquamarine: [127, 255, 212, 1], azure: [240, 255, 255, 1], beige: [245, 245, 220, 1], bisque: [255, 228, 196, 1], black: [0, 0, 0, 1], blanchedalmond: [255, 235, 205, 1], blue: [0, 0, 255, 1], blueviolet: [138, 43, 226, 1], brown: [165, 42, 42, 1], burlywood: [222, 184, 135, 1], cadetblue: [95, 158, 160, 1], chartreuse: [127, 255, 0, 1], chocolate: [210, 105, 30, 1], coral: [255, 127, 80, 1], cornflowerblue: [100, 149, 237, 1], cornsilk: [255, 248, 220, 1], crimson: [220, 20, 60, 1], cyan: [0, 255, 255, 1], darkblue: [0, 0, 139, 1], darkcyan: [0, 139, 139, 1], darkgoldenrod: [184, 134, 11, 1], darkgray: [169, 169, 169, 1], darkgreen: [0, 100, 0, 1], darkgrey: [169, 169, 169, 1], darkkhaki: [189, 183, 107, 1], darkmagenta: [139, 0, 139, 1], darkolivegreen: [85, 107, 47, 1], darkorange: [255, 140, 0, 1], darkorchid: [153, 50, 204, 1], darkred: [139, 0, 0, 1], darksalmon: [233, 150, 122, 1], darkseagreen: [143, 188, 143, 1], darkslateblue: [72, 61, 139, 1], darkslategray: [47, 79, 79, 1], darkslategrey: [47, 79, 79, 1], darkturquoise: [0, 206, 209, 1], darkviolet: [148, 0, 211, 1], deeppink: [255, 20, 147, 1], deepskyblue: [0, 191, 255, 1], dimgray: [105, 105, 105, 1], dimgrey: [105, 105, 105, 1], dodgerblue: [30, 144, 255, 1], firebrick: [178, 34, 34, 1], floralwhite: [255, 250, 240, 1], forestgreen: [34, 139, 34, 1], fuchsia: [255, 0, 255, 1], gainsboro: [220, 220, 220, 1], ghostwhite: [248, 248, 255, 1], gold: [255, 215, 0, 1], goldenrod: [218, 165, 32, 1], gray: [128, 128, 128, 1], green: [0, 128, 0, 1], greenyellow: [173, 255, 47, 1], grey: [128, 128, 128, 1], honeydew: [240, 255, 240, 1], hotpink: [255, 105, 180, 1], indianred: [205, 92, 92, 1], indigo: [75, 0, 130, 1], ivory: [255, 255, 240, 1], khaki: [240, 230, 140, 1], lavender: [230, 230, 250, 1], lavenderblush: [255, 240, 245, 1], lawngreen: [124, 252, 0, 1], lemonchiffon: [255, 250, 205, 1], lightblue: [173, 216, 230, 1], lightcoral: [240, 128, 128, 1], lightcyan: [224, 255, 255, 1], lightgoldenrodyellow: [250, 250, 210, 1], lightgray: [211, 211, 211, 1], lightgreen: [144, 238, 144, 1], lightgrey: [211, 211, 211, 1], lightpink: [255, 182, 193, 1], lightsalmon: [255, 160, 122, 1], lightseagreen: [32, 178, 170, 1], lightskyblue: [135, 206, 250, 1], lightslategray: [119, 136, 153, 1], lightslategrey: [119, 136, 153, 1], lightsteelblue: [176, 196, 222, 1], lightyellow: [255, 255, 224, 1], lime: [0, 255, 0, 1], limegreen: [50, 205, 50, 1], linen: [250, 240, 230, 1], magenta: [255, 0, 255, 1], maroon: [128, 0, 0, 1], mediumaquamarine: [102, 205, 170, 1], mediumblue: [0, 0, 205, 1], mediumorchid: [186, 85, 211, 1], mediumpurple: [147, 112, 219, 1], mediumseagreen: [60, 179, 113, 1], mediumslateblue: [123, 104, 238, 1], mediumspringgreen: [0, 250, 154, 1], mediumturquoise: [72, 209, 204, 1], mediumvioletred: [199, 21, 133, 1], midnightblue: [25, 25, 112, 1], mintcream: [245, 255, 250, 1], mistyrose: [255, 228, 225, 1], moccasin: [255, 228, 181, 1], navajowhite: [255, 222, 173, 1], navy: [0, 0, 128, 1], oldlace: [253, 245, 230, 1], olive: [128, 128, 0, 1], olivedrab: [107, 142, 35, 1], orange: [255, 165, 0, 1], orangered: [255, 69, 0, 1], orchid: [218, 112, 214, 1], palegoldenrod: [238, 232, 170, 1], palegreen: [152, 251, 152, 1], paleturquoise: [175, 238, 238, 1], palevioletred: [219, 112, 147, 1], papayawhip: [255, 239, 213, 1], peachpuff: [255, 218, 185, 1], peru: [205, 133, 63, 1], pink: [255, 192, 203, 1], plum: [221, 160, 221, 1], powderblue: [176, 224, 230, 1], purple: [128, 0, 128, 1], red: [255, 0, 0, 1], rosybrown: [188, 143, 143, 1], royalblue: [65, 105, 225, 1], saddlebrown: [139, 69, 19, 1], salmon: [250, 128, 114, 1], sandybrown: [244, 164, 96, 1], seagreen: [46, 139, 87, 1], seashell: [255, 245, 238, 1], sienna: [160, 82, 45, 1], silver: [192, 192, 192, 1], skyblue: [135, 206, 235, 1], slateblue: [106, 90, 205, 1], slategray: [112, 128, 144, 1], slategrey: [112, 128, 144, 1], snow: [255, 250, 250, 1], springgreen: [0, 255, 127, 1], steelblue: [70, 130, 180, 1], tan: [210, 180, 140, 1], teal: [0, 128, 128, 1], thistle: [216, 191, 216, 1], tomato: [255, 99, 71, 1], turquoise: [64, 224, 208, 1], violet: [238, 130, 238, 1], wheat: [245, 222, 179, 1], white: [255, 255, 255, 1], whitesmoke: [245, 245, 245, 1], yellow: [255, 255, 0, 1], yellowgreen: [154, 205, 50, 1] },
        M = new b(20),
        S = null;
    return { parse: h, lift: p, toHex: m, fastMapToColor: v, mapToColor: g, modifyHSL: y, modifyAlpha: x, stringify: _ };
  }), e("echarts/preprocessor/backwardCompat", [Ze, Fe, "./helper/compatStyle"], function (t) {
    function e(t, e) {
      e = e.split(",");for (var n = t, i = 0; i < e[we] && (n = n && n[e[i]], null != n); i++);return n;
    }function n(t, e, n, i) {
      e = e.split(",");for (var r, a = t, o = 0; o < e[we] - 1; o++) r = e[o], null == a[r] && (a[r] = {}), a = a[r];(i || null == a[e[o]]) && (a[e[o]] = n);
    }function i(t) {
      u(o, function (e) {
        e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);
      });
    }var r = t(Fe),
        a = t("./helper/compatStyle"),
        o = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", Me]],
        s = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
        l = ["bar", "boxplot", "candlestick", "chord", "effectScatter", "funnel", "gauge", "lines", "graph", "heatmap", "line", "map", "parallel", "pie", "radar", "sankey", "scatter", "treemap"],
        u = r.each;return function (t) {
      u(t[fe], function (t) {
        if (r[Le](t)) {
          var o = t.type;if (a(t), ("pie" === o || "gauge" === o) && null != t.clockWise && (t.clockwise = t.clockWise), "gauge" === o) {
            var s = e(t, "pointer.color");null != s && n(t, "itemStyle.normal.color", s);
          }for (var u = 0; u < l[we]; u++) if (l[u] === t.type) {
            i(t);break;
          }
        }
      }), t.dataRange && (t.visualMap = t.dataRange), u(s, function (e) {
        var n = t[e];n && (r[Y](n) || (n = [n]), u(n, function (t) {
          i(t);
        }));
      });
    };
  }), e("echarts/loading/default", [Ze, "../util/graphic", Fe], function (t) {
    var e = t("../util/graphic"),
        n = t(Fe),
        i = Math.PI;return function (t, r) {
      r = r || {}, n[ce](r, { text: "loading", color: "#c23531", textColor: "#000", maskColor: "rgba(255, 255, 255, 0.8)", zlevel: 0 });var a = new e.Rect({ style: { fill: r.maskColor }, zlevel: r[K], z: 1e4 }),
          o = new e.Arc({ shape: { startAngle: -i / 2, endAngle: -i / 2 + .1, r: 10 }, style: { stroke: r.color, lineCap: "round", lineWidth: 5 }, zlevel: r[K], z: 10001 }),
          s = new e.Rect({ style: { fill: "none", text: r.text, textPosition: "right", textDistance: 10, textFill: r.textColor }, zlevel: r[K], z: 10001 });o.animateShape(!0).when(1e3, { endAngle: 3 * i / 2 }).start("circularInOut"), o.animateShape(!0).when(1e3, { startAngle: 3 * i / 2 }).delay(300).start("circularInOut");var l = new e.Group();return l.add(o), l.add(s), l.add(a), l.resize = function () {
        var e = t[Ce]() / 2,
            n = t[Te]() / 2;o.setShape({ cx: e, cy: n });var i = o.shape.r;s.setShape({ x: e - i, y: n - i, width: 2 * i, height: 2 * i }), a.setShape({ x: 0, y: 0, width: t[Ce](), height: t[Te]() });
      }, l.resize(), l;
    };
  }), e("echarts/data/List", [Ze, "../model/Model", "./DataDiffer", Fe, "../util/model"], function (t) {
    function e(t, e) {
      f.each(g[pe](e.__wrappedMethods || []), function (n) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }), t.__wrappedMethods = e.__wrappedMethods;
    }function n(t) {
      this._array = t || [];
    }function i(t) {
      return f[Y](t) || (t = [t]), t;
    }function r(t, n) {
      var i = t[X],
          r = new y(f.map(i, t.getDimensionInfo, t), t.hostModel);e(r, t);for (var a = r._storage = {}, o = t._storage, s = 0; s < i[we]; s++) {
        var l = i[s],
            u = o[l];a[l] = f[be](n, l) >= 0 ? new u.constructor(o[l][we]) : o[l];
      }return r;
    }var a = o,
        s = typeof window === o ? global : window,
        l = typeof s.Float64Array === a ? Array : s.Float64Array,
        u = typeof s.Int32Array === a ? Array : s.Int32Array,
        c = { "float": l, "int": u, ordinal: Array, number: Array, time: Array },
        h = t("../model/Model"),
        d = t("./DataDiffer"),
        f = t(Fe),
        m = t("../util/model"),
        v = f[Le],
        g = ["stackedOn", "hasItemOption", "_nameList", "_idList", "_rawData"];n[Re].pure = !1, n[Re].count = function () {
      return this._array[we];
    }, n[Re].getItem = function (t) {
      return this._array[t];
    };var y = function (t, e) {
      t = t || ["x", "y"];for (var n = {}, i = [], r = 0; r < t[we]; r++) {
        var a,
            o = {};typeof t[r] === Oe ? (a = t[r], o = { name: a, coordDim: a, coordDimIndex: 0, stackable: !1, type: "number" }) : (o = t[r], a = o.name, o.type = o.type || U, o.coordDim || (o.coordDim = a, o.coordDimIndex = 0)), o.otherDims = o.otherDims || {}, i.push(a), n[a] = o;
      }this[X] = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, this.indices = [], this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this.stackedOn = null, this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._rawData, this._extent;
    },
        x = y[Re];x.type = "list", x.hasItemOption = !0, x.getDimension = function (t) {
      return isNaN(t) || (t = this[X][t] || t), t;
    }, x.getDimensionInfo = function (t) {
      return f.clone(this._dimensionInfos[this.getDimension(t)]);
    }, x.initData = function (t, e, i) {
      t = t || [];var r = f[Y](t);r && (t = new n(t)), this._rawData = t;var a,
          o = this._storage = {},
          s = this.indices = [],
          l = this[X],
          u = this._dimensionInfos,
          h = t.count(),
          d = [],
          p = {};e = e || [];for (var v = 0; v < l[we]; v++) {
        var g = u[l[v]];0 === g.otherDims.itemName && (a = v);var y = c[g.type];o[l[v]] = new y(h);
      }var x = this;i || (x.hasItemOption = !1), i = i || function (t, e, n, i) {
        var r = m.getDataItemValue(t);return m.isDataItemOption(t) && (x.hasItemOption = !0), m.converDataValue(r instanceof Array ? r[i] : r, u[e]);
      };for (var v = 0; h > v; v++) {
        for (var _ = t.getItem(v), b = 0; b < l[we]; b++) {
          var w = l[b],
              M = o[w];M[v] = i(_, w, v, b);
        }s.push(v);
      }for (var v = 0; h > v; v++) {
        var _ = t.getItem(v);!e[v] && _ && (null != _.name ? e[v] = _.name : null != a && (e[v] = o[l[a]][v]));var S = e[v] || "",
            A = _ && _.id;!A && S && (p[S] = p[S] || 0, A = S, p[S] > 0 && (A += "__ec__" + p[S]), p[S]++), A && (d[v] = A);
      }this._nameList = e, this._idList = d;
    }, x.count = function () {
      return this.indices[we];
    }, x.get = function (t, e, n) {
      var i = this._storage,
          r = this.indices[e];if (null == r || !i[t]) return 0 / 0;var a = i[t][r];if (n) {
        var o = this._dimensionInfos[t];if (o && o.stackable) for (var s = this.stackedOn; s;) {
          var l = s.get(t, e);(a >= 0 && l > 0 || 0 >= a && 0 > l) && (a += l), s = s.stackedOn;
        }
      }return a;
    }, x.getValues = function (t, e, n) {
      var i = [];f[Y](t) || (n = e, e = t, t = this[X]);for (var r = 0, a = t[we]; a > r; r++) i.push(this.get(t[r], e, n));return i;
    }, x.hasValue = function (t) {
      for (var e = this[X], n = this._dimensionInfos, i = 0, r = e[we]; r > i; i++) if (n[e[i]].type !== S && isNaN(this.get(e[i], t))) return !1;return !0;
    }, x[B] = function (t, e, n) {
      t = this.getDimension(t);var i = this._storage[t],
          r = this.getDimensionInfo(t);e = r && r.stackable && e;var a,
          o = (this._extent || (this._extent = {}))[t + !!e];if (o) return o;if (i) {
        for (var s = 1 / 0, l = -1 / 0, u = 0, c = this.count(); c > u; u++) a = this.get(t, u, e), (!n || n(a, t, u)) && (s > a && (s = a), a > l && (l = a));return this._extent[t + !!e] = [s, l];
      }return [1 / 0, -1 / 0];
    }, x.getSum = function (t, e) {
      var n = this._storage[t],
          i = 0;if (n) for (var r = 0, a = this.count(); a > r; r++) {
        var o = this.get(t, r, e);isNaN(o) || (i += o);
      }return i;
    }, x[be] = function (t, e) {
      var n = this._storage,
          i = n[t],
          r = this.indices;if (i) for (var a = 0, o = r[we]; o > a; a++) {
        var s = r[a];if (i[s] === e) return a;
      }return -1;
    }, x.indexOfName = function (t) {
      for (var e = this.indices, n = this._nameList, i = 0, r = e[we]; r > i; i++) {
        var a = e[i];if (n[a] === t) return i;
      }return -1;
    }, x.indexOfRawIndex = function (t) {
      var e = this.indices,
          n = e[t];if (null != n && n === t) return t;for (var i = 0, r = e[we] - 1; r >= i;) {
        var a = (i + r) / 2 | 0;if (e[a] < t) i = a + 1;else {
          if (!(e[a] > t)) return a;r = a - 1;
        }
      }return -1;
    }, x.indicesOfNearest = function (t, e, n, i) {
      var r = this._storage,
          a = r[t],
          o = [];if (!a) return o;null == i && (i = 1 / 0);for (var s = Number.MAX_VALUE, l = -1, u = 0, c = this.count(); c > u; u++) {
        var h = e - this.get(t, u, n),
            d = Math.abs(h);i >= h && s >= d && ((s > d || h >= 0 && 0 > l) && (s = d, l = h, o[we] = 0), o.push(u));
      }return o;
    }, x.getRawIndex = function (t) {
      var e = this.indices[t];return null == e ? -1 : e;
    }, x.getRawDataItem = function (t) {
      return this._rawData.getItem(this.getRawIndex(t));
    }, x[p] = function (t) {
      return this._nameList[this.indices[t]] || "";
    }, x.getId = function (t) {
      return this._idList[this.indices[t]] || this.getRawIndex(t) + "";
    }, x.each = function (t, e, n, r) {
      typeof t === j && (r = n, n = e, e = t, t = []), t = f.map(i(t), this.getDimension, this);var a = [],
          o = t[we],
          s = this.indices;r = r || this;for (var l = 0; l < s[we]; l++) switch (o) {case 0:
          e.call(r, l);break;case 1:
          e.call(r, this.get(t[0], l, n), l);break;case 2:
          e.call(r, this.get(t[0], l, n), this.get(t[1], l, n), l);break;default:
          for (var u = 0; o > u; u++) a[u] = this.get(t[u], l, n);a[u] = l, e.apply(r, a);}
    }, x.filterSelf = function (t, e, n, r) {
      typeof t === j && (r = n, n = e, e = t, t = []), t = f.map(i(t), this.getDimension, this);var a = [],
          o = [],
          s = t[we],
          l = this.indices;r = r || this;for (var u = 0; u < l[we]; u++) {
        var c;if (s) {
          if (1 === s) c = e.call(r, this.get(t[0], u, n), u);else {
            for (var h = 0; s > h; h++) o[h] = this.get(t[h], u, n);o[h] = u, c = e.apply(r, o);
          }
        } else c = e.call(r, u);c && a.push(l[u]);
      }return this.indices = a, this._extent = {}, this;
    }, x.mapArray = function (t, e, n, i) {
      typeof t === j && (i = n, n = e, e = t, t = []);var r = [];return this.each(t, function () {
        r.push(e && e.apply(this, arguments));
      }, n, i), r;
    }, x.map = function (t, e, n, a) {
      t = f.map(i(t), this.getDimension, this);var o = r(this, t),
          s = o.indices = this.indices,
          l = o._storage,
          u = [];return this.each(t, function () {
        var n = arguments[arguments[we] - 1],
            i = e && e.apply(this, arguments);if (null != i) {
          typeof i === U && (u[0] = i, i = u);for (var r = 0; r < i[we]; r++) {
            var a = t[r],
                o = l[a],
                c = s[n];o && (o[c] = i[r]);
          }
        }
      }, n, a), o;
    }, x.downSample = function (t, e, n, i) {
      for (var a = r(this, [t]), o = this._storage, s = a._storage, l = this.indices, u = a.indices = [], c = [], h = [], d = Math.floor(1 / e), f = s[t], p = this.count(), m = 0; m < o[t][we]; m++) s[t][m] = o[t][m];for (var m = 0; p > m; m += d) {
        d > p - m && (d = p - m, c[we] = d);for (var v = 0; d > v; v++) {
          var g = l[m + v];c[v] = f[g], h[v] = g;
        }var y = n(c),
            g = h[i(c, y) || 0];f[g] = y, u.push(g);
      }return a;
    }, x[w] = function (t) {
      var e = this.hostModel;return t = this.indices[t], new h(this._rawData.getItem(t), e, e && e[F]);
    }, x.diff = function (t) {
      var e,
          n = this._idList,
          i = t && t._idList,
          r = "e\x00\x00";return new d(t ? t.indices : [], this.indices, function (t) {
        return null != (e = i[t]) ? e : r + t;
      }, function (t) {
        return null != (e = n[t]) ? e : r + t;
      });
    }, x.getVisual = function (t) {
      var e = this._visual;return e && e[t];
    }, x.setVisual = function (t, e) {
      if (v(t)) for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]);else this._visual = this._visual || {}, this._visual[t] = e;
    }, x.setLayout = function (t, e) {
      if (v(t)) for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]);else this._layout[t] = e;
    }, x.getLayout = function (t) {
      return this._layout[t];
    }, x[k] = function (t) {
      return this._itemLayouts[t];
    }, x.setItemLayout = function (t, e, n) {
      this._itemLayouts[t] = n ? f[he](this._itemLayouts[t] || {}, e) : e;
    }, x.clearItemLayouts = function () {
      this._itemLayouts[we] = 0;
    }, x[xe] = function (t, e, n) {
      var i = this._itemVisuals[t],
          r = i && i[e];return null != r || n ? r : this.getVisual(e);
    }, x.setItemVisual = function (t, e, n) {
      var i = this._itemVisuals[t] || {};if (this._itemVisuals[t] = i, v(e)) for (var r in e) e.hasOwnProperty(r) && (i[r] = e[r]);else i[e] = n;
    }, x.clearAllVisual = function () {
      this._visual = {}, this._itemVisuals = [];
    };var _ = function (t) {
      t[ne] = this[ne], t.dataIndex = this.dataIndex, t.dataType = this.dataType;
    };return x.setItemGraphicEl = function (t, e) {
      var n = this.hostModel;e && (e.dataIndex = t, e.dataType = this.dataType, e[ne] = n && n[ne], "group" === e.type && e[te](_, e)), this._graphicEls[t] = e;
    }, x[P] = function (t) {
      return this._graphicEls[t];
    }, x[C] = function (t, e) {
      f.each(this._graphicEls, function (n, i) {
        n && t && t.call(e, n, i);
      });
    }, x.cloneShallow = function () {
      var t = f.map(this[X], this.getDimensionInfo, this),
          n = new y(t, this.hostModel);return n._storage = this._storage, e(n, this), n.indices = this.indices.slice(), this._extent && (n._extent = f[he]({}, this._extent)), n;
    }, x.wrapMethod = function (t, e) {
      var n = this[t];typeof n === j && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function () {
        var t = n.apply(this, arguments);return e.apply(this, [t][pe](f.slice(arguments)));
      });
    }, x.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], x.CHANGABLE_METHODS = ["filterSelf"], y;
  }), e("echarts/model/Model", [Ze, Fe, "../util/clazz", "zrender/core/env", "./mixin/lineStyle", "./mixin/areaStyle", "./mixin/textStyle", "./mixin/itemStyle"], function (t) {
    function e(t, e, n) {
      this.parentModel = e, this[F] = n, this[l] = t;
    }function n(t, e, n) {
      for (var i = 0; i < e[we] && (!e[i] || (t = t && "object" == typeof t ? t[e[i]] : null, null != t)); i++);return null == t && n && (t = n.get(e)), t;
    }function i(t, e) {
      var n = a.get(t, "getParent");return n ? n.call(t, e) : t.parentModel;
    }var r = t(Fe),
        a = t("../util/clazz"),
        o = t("zrender/core/env");e[Re] = { constructor: e, init: null, mergeOption: function (t) {
        r.merge(this[l], t, !0);
      }, get: function (t, e) {
        return null == t ? this[l] : n(this[l], this.parsePath(t), !e && i(this, t));
      }, getShallow: function (t, e) {
        var n = this[l],
            r = null == n ? n : n[t],
            a = !e && i(this, t);return null == r && a && (r = a[b](t)), r;
      }, getModel: function (t, r) {
        var a,
            o = null == t ? this[l] : n(this[l], t = this.parsePath(t));return r = r || (a = i(this, t)) && a[ke](t), new e(o, r, this[F]);
      }, isEmpty: function () {
        return null == this[l];
      }, restoreData: function () {}, clone: function () {
        var t = this.constructor;return new t(r.clone(this[l]));
      }, setReadOnly: function (t) {
        a.setReadOnly(this, t);
      }, parsePath: function (t) {
        return typeof t === Oe && (t = t.split(".")), t;
      }, customizeGetParent: function (t) {
        a.set(this, "getParent", t);
      }, isAnimationEnabled: function () {
        if (!o.node) {
          if (null != this[l][Ie]) return !!this[l][Ie];if (this.parentModel) return this.parentModel.isAnimationEnabled();
        }
      } }, a.enableClassExtend(e);var s = r.mixin;return s(e, t("./mixin/lineStyle")), s(e, t("./mixin/areaStyle")), s(e, t("./mixin/textStyle")), s(e, t("./mixin/itemStyle")), e;
  }), e("echarts/util/number", [Ze, Fe], function (t) {
    function e(t) {
      return t[$](/^\s+/, "")[$](/\s+$/, "");
    }function n(t) {
      return Math.floor(Math.log(t) / Math.LN10);
    }var i = t(Fe),
        r = {},
        a = 1e-4;r.linearMap = function (t, e, n, i) {
      var r = e[1] - e[0],
          a = n[1] - n[0];if (0 === r) return 0 === a ? n[0] : (n[0] + n[1]) / 2;if (i) {
        if (r > 0) {
          if (t <= e[0]) return n[0];if (t >= e[1]) return n[1];
        } else {
          if (t >= e[0]) return n[0];if (t <= e[1]) return n[1];
        }
      } else {
        if (t === e[0]) return n[0];if (t === e[1]) return n[1];
      }return (t - e[0]) / r * a + n[0];
    }, r[m] = function (t, n) {
      switch (t) {case s:case z:
          t = "50%";break;case "left":case "top":
          t = "0%";break;case "right":case Me:
          t = "100%";}return typeof t === Oe ? e(t).match(/%$/) ? parseFloat(t) / 100 * n : parseFloat(t) : null == t ? 0 / 0 : +t;
    }, r.round = function (t, e, n) {
      return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), n ? t : +t;
    }, r.asc = function (t) {
      return t.sort(function (t, e) {
        return t - e;
      }), t;
    }, r.getPrecision = function (t) {
      if (t = +t, isNaN(t)) return 0;for (var e = 1, n = 0; Math.round(t * e) / e !== t;) e *= 10, n++;return n;
    }, r.getPrecisionSafe = function (t) {
      var e = t.toString(),
          n = e[be]("e");if (n > 0) {
        var i = +e.slice(n + 1);return 0 > i ? -i : 0;
      }var r = e[be](".");return 0 > r ? 0 : e[we] - 1 - r;
    }, r.getPixelPrecision = function (t, e) {
      var n = Math.log,
          i = Math.LN10,
          r = Math.floor(n(t[1] - t[0]) / i),
          a = Math.round(n(Math.abs(e[1] - e[0])) / i),
          o = Math.min(Math.max(-r + a, 0), 20);return isFinite(o) ? o : 20;
    }, r.getPercentWithPrecision = function (t, e, n) {
      if (!t[e]) return 0;var r = i.reduce(t, function (t, e) {
        return t + (isNaN(e) ? 0 : e);
      }, 0);if (0 === r) return 0;for (var a = Math.pow(10, n), o = i.map(t, function (t) {
        return (isNaN(t) ? 0 : t) / r * a * 100;
      }), s = 100 * a, l = i.map(o, function (t) {
        return Math.floor(t);
      }), u = i.reduce(l, function (t, e) {
        return t + e;
      }, 0), c = i.map(o, function (t, e) {
        return t - l[e];
      }); s > u;) {
        for (var h = Number.NEGATIVE_INFINITY, d = null, f = 0, p = c[we]; p > f; ++f) c[f] > h && (h = c[f], d = f);++l[d], c[d] = 0, ++u;
      }return l[e] / a;
    }, r.MAX_SAFE_INTEGER = 9007199254740991, r.remRadian = function (t) {
      var e = 2 * Math.PI;return (t % e + e) % e;
    }, r.isRadianAroundZero = function (t) {
      return t > -a && a > t;
    };var o = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;return r.getTimezoneOffset = function () {
      return new Date().getTimezoneOffset();
    }, r.parseDate = function (t) {
      if (t instanceof Date) return t;if (typeof t === Oe) {
        var e = o.exec(t);if (!e) return new Date(0 / 0);var n = r.getTimezoneOffset(),
            i = e[8] ? "Z" === e[8].toUpperCase() ? n : 60 * +e[8].slice(0, 3) + n : 0;return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0) - i, +e[6] || 0, +e[7] || 0);
      }return new Date(null == t ? 0 / 0 : Math.round(t));
    }, r.quantity = function (t) {
      return Math.pow(10, n(t));
    }, r.nice = function (t, e) {
      var i,
          r = n(t),
          a = Math.pow(10, r),
          o = t / a;return i = e ? 1.5 > o ? 1 : 2.5 > o ? 2 : 4 > o ? 3 : 7 > o ? 5 : 10 : 1 > o ? 1 : 2 > o ? 2 : 3 > o ? 3 : 5 > o ? 5 : 10, t = i * a, r >= -20 ? +t.toFixed(0 > r ? -r : 0) : t;
    }, r.reformIntervals = function (t) {
      function e(t, n, i) {
        return t.interval[i] < n.interval[i] || t.interval[i] === n.interval[i] && (t.close[i] - n.close[i] === (i ? -1 : 1) || !i && e(t, n, 1));
      }t.sort(function (t, n) {
        return e(t, n, 0) ? -1 : 1;
      });for (var n = -1 / 0, i = 1, r = 0; r < t[we];) {
        for (var a = t[r].interval, o = t[r].close, s = 0; 2 > s; s++) a[s] <= n && (a[s] = n, o[s] = s ? 1 : 1 - i), n = a[s], i = o[s];a[0] === a[1] && o[0] * o[1] !== 1 ? t[ae](r, 1) : r++;
      }return t;
    }, r.isNumeric = function (t) {
      return t - parseFloat(t) >= 0;
    }, r;
  }), e("echarts/coord/Axis", [Ze, "../util/number", Fe, "./axisHelper"], function (t) {
    function e(t, e) {
      var n = t[1] - t[0],
          i = e,
          r = n / i / 2;t[0] += r, t[1] -= r;
    }var n = t("../util/number"),
        i = n.linearMap,
        r = t(Fe),
        a = t("./axisHelper"),
        o = [0, 1],
        s = function (t, e, n) {
      this.dim = t, this.scale = e, this._extent = n || [0, 0], this.inverse = !1, this.onBand = !1, this._labelInterval;
    };return s[Re] = { constructor: s, contain: function (t) {
        var e = this._extent,
            n = Math.min(e[0], e[1]),
            i = Math.max(e[0], e[1]);return t >= n && i >= t;
      }, containData: function (t) {
        return this[G](this[I](t));
      }, getExtent: function () {
        return this._extent.slice();
      }, getPixelPrecision: function (t) {
        return n.getPixelPrecision(t || this.scale[V](), this._extent);
      }, setExtent: function (t, e) {
        var n = this._extent;n[0] = t, n[1] = e;
      }, dataToCoord: function (t, n) {
        var r = this._extent,
            a = this.scale;return t = a[Z](t), this.onBand && a.type === S && (r = r.slice(), e(r, a.count())), i(t, o, r, n);
      }, coordToData: function (t, n) {
        var r = this._extent,
            a = this.scale;this.onBand && a.type === S && (r = r.slice(), e(r, a.count()));var s = i(t, r, o, n);return this.scale.scale(s);
      }, pointToData: function () {}, getTicksCoords: function (t) {
        if (this.onBand && !t) {
          for (var e = this.getBands(), n = [], i = 0; i < e[we]; i++) n.push(e[i][0]);return e[i - 1] && n.push(e[i - 1][1]), n;
        }return r.map(this.scale.getTicks(), this[I], this);
      }, getLabelsCoords: function () {
        return r.map(this.scale.getTicks(), this[I], this);
      }, getBands: function () {
        for (var t = this[V](), e = [], n = this.scale.count(), i = t[0], r = t[1], a = r - i, o = 0; n > o; o++) e.push([a * o / n + i, a * (o + 1) / n + i]);return e;
      }, getBandWidth: function () {
        var t = this._extent,
            e = this.scale[V](),
            n = e[1] - e[0] + (this.onBand ? 1 : 0);0 === n && (n = 1);var i = Math.abs(t[1] - t[0]);return Math.abs(i) / n;
      }, getLabelInterval: function () {
        var t = this._labelInterval;if (!t) {
          var e = this.model,
              n = e[ke]("axisLabel"),
              i = n.get("interval");this.type !== x || "auto" !== i ? t = "auto" === i ? 0 : i : this.isHorizontal && (t = a.getAxisLabelInterval(r.map(this.scale.getTicks(), this[I], this), e.getFormattedLabels(), n[ke](f)[h](), this.isHorizontal())), this._labelInterval = t;
        }return t;
      } }, s;
  }), e("echarts/util/format", [Ze, Fe, "./number", "zrender/contain/text"], function (t) {
    var e = t(Fe),
        n = t("./number"),
        i = t("zrender/contain/text"),
        r = {};r.addCommas = function (t) {
      return isNaN(t) ? "-" : (t = (t + "").split("."), t[0][$](/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t[we] > 1 ? "." + t[1] : ""));
    }, r.toCamelCase = function (t, e) {
      return t = (t || "")[Ee]()[$](/-(.)/g, function (t, e) {
        return e.toUpperCase();
      }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;
    }, r.normalizeCssArray = function (t) {
      var e = t[we];return typeof t === U ? [t, t, t, t] : 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t;
    };var a = r.encodeHTML = function (t) {
      return String(t)[$](/&/g, "&amp;")[$](/</g, "&lt;")[$](/>/g, "&gt;")[$](/"/g, "&quot;")[$](/'/g, "&#39;");
    },
        o = ["a", "b", "c", "d", "e", "f", "g"],
        s = function (t, e) {
      return "{" + t + (null == e ? "" : e) + "}";
    };r.formatTpl = function (t, n, i) {
      e[Y](n) || (n = [n]);var r = n[we];if (!r) return "";for (var l = n[0].$vars || [], u = 0; u < l[we]; u++) {
        var c = o[u],
            h = s(c, 0);t = t[$](s(c), i ? a(h) : h);
      }for (var d = 0; r > d; d++) for (var f = 0; f < l[we]; f++) {
        var h = n[d][l[f]];t = t[$](s(o[f], d), i ? a(h) : h);
      }return t;
    }, r.formatTplSimple = function (t, n, i) {
      return e.each(n, function (e, n) {
        t = t[$]("{" + n + "}", i ? a(e) : e);
      }), t;
    }, r.getTooltipMarker = function (t, e) {
      return t ? '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + r.encodeHTML(t) + ";" + (e || "") + '"></span>' : "";
    };var l = function (t) {
      return 10 > t ? "0" + t : t;
    };return r.formatTime = function (t, e, i) {
      ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");var r = n.parseDate(e),
          a = i ? "UTC" : "",
          o = r["get" + a + "FullYear"](),
          s = r["get" + a + "Month"]() + 1,
          u = r["get" + a + "Date"](),
          c = r["get" + a + "Hours"](),
          h = r["get" + a + "Minutes"](),
          d = r["get" + a + "Seconds"]();return t = t[$]("MM", l(s))[Ee]()[$]("yyyy", o)[$]("yy", o % 100)[$]("dd", l(u))[$]("d", u)[$]("hh", l(c))[$]("h", c)[$]("mm", l(h))[$]("m", h)[$]("ss", l(d))[$]("s", d);
    }, r.capitalFirst = function (t) {
      return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;
    }, r.truncateText = i.truncateText, r;
  }), e("zrender/core/matrix", [], function () {
    var t = typeof Float32Array === o ? Array : Float32Array,
        e = { create: function () {
        var n = new t(6);return e.identity(n), n;
      }, identity: function (t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
      }, copy: function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
      }, mul: function (t, e, n) {
        var i = e[0] * n[0] + e[2] * n[1],
            r = e[1] * n[0] + e[3] * n[1],
            a = e[0] * n[2] + e[2] * n[3],
            o = e[1] * n[2] + e[3] * n[3],
            s = e[0] * n[4] + e[2] * n[5] + e[4],
            l = e[1] * n[4] + e[3] * n[5] + e[5];return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t;
      }, translate: function (t, e, n) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], t;
      }, rotate: function (t, e, n) {
        var i = e[0],
            r = e[2],
            a = e[4],
            o = e[1],
            s = e[3],
            l = e[5],
            u = Math.sin(n),
            c = Math.cos(n);return t[0] = i * c + o * u, t[1] = -i * u + o * c, t[2] = r * c + s * u, t[3] = -r * u + c * s, t[4] = c * a + u * l, t[5] = c * l - u * a, t;
      }, scale: function (t, e, n) {
        var i = n[0],
            r = n[1];return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, t[5] = e[5] * r, t;
      }, invert: function (t, e) {
        var n = e[0],
            i = e[2],
            r = e[4],
            a = e[1],
            o = e[3],
            s = e[5],
            l = n * o - a * i;return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null;
      } };return e;
  }), e(Be, [], function () {
    var t = typeof Float32Array === o ? Array : Float32Array,
        e = { create: function (e, n) {
        var i = new t(2);return null == e && (e = 0), null == n && (n = 0), i[0] = e, i[1] = n, i;
      }, copy: function (t, e) {
        return t[0] = e[0], t[1] = e[1], t;
      }, clone: function (e) {
        var n = new t(2);return n[0] = e[0], n[1] = e[1], n;
      }, set: function (t, e, n) {
        return t[0] = e, t[1] = n, t;
      }, add: function (t, e, n) {
        return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;
      }, scaleAndAdd: function (t, e, n, i) {
        return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t;
      }, sub: function (t, e, n) {
        return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;
      }, len: function (t) {
        return Math.sqrt(this.lenSquare(t));
      }, lenSquare: function (t) {
        return t[0] * t[0] + t[1] * t[1];
      }, mul: function (t, e, n) {
        return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t;
      }, div: function (t, e, n) {
        return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t;
      }, dot: function (t, e) {
        return t[0] * e[0] + t[1] * e[1];
      }, scale: function (t, e, n) {
        return t[0] = e[0] * n, t[1] = e[1] * n, t;
      }, normalize: function (t, n) {
        var i = e.len(n);return 0 === i ? (t[0] = 0, t[1] = 0) : (t[0] = n[0] / i, t[1] = n[1] / i), t;
      }, distance: function (t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
      }, distanceSquare: function (t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
      }, negate: function (t, e) {
        return t[0] = -e[0], t[1] = -e[1], t;
      }, lerp: function (t, e, n, i) {
        return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t;
      }, applyTransform: function (t, e, n) {
        var i = e[0],
            r = e[1];return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;
      }, min: function (t, e, n) {
        return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;
      }, max: function (t, e, n) {
        return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;
      } };return e[we] = e.len, e.lengthSquare = e.lenSquare, e.dist = e.distance, e.distSquare = e.distanceSquare, e;
  }), e("echarts/helper", [Ze, "./chart/helper/createListFromArray", "./util/symbol", "./coord/axisHelper", "./coord/axisModelCommonMixin", "./model/Model", Fe, "./data/helper/completeDimensions"], function (t) {
    var e = t("./chart/helper/createListFromArray"),
        n = t("./util/symbol"),
        i = t("./coord/axisHelper"),
        r = t("./coord/axisModelCommonMixin"),
        a = t("./model/Model"),
        o = t(Fe);return { createList: function (t) {
        var n = t.get("data");return e(n, t, t[F]);
      }, completeDimensions: t("./data/helper/completeDimensions"), createSymbol: n.createSymbol, createScale: function (t, e) {
        var n = e;e instanceof a || (n = new a(e), o.mixin(n, r));var s = i.createScaleByModel(n);return s.setExtent(t[0], t[1]), i.niceScaleExtent(s, n), s;
      }, mixinAxisModelCommonMethods: function (t) {
        o.mixin(t, r);
      } };
  }), e("echarts/component/legend/LegendModel", [Ze, Fe, "../../model/Model", g], function (t) {
    var e = t(Fe),
        n = t("../../model/Model"),
        i = t(g).extendComponentModel({ type: "legend", dependencies: [fe], layoutMode: { type: "box", ignoreSize: !0 }, init: function (t, e, n) {
        this.mergeDefaultAndTheme(t, n), t.selected = t.selected || {};
      }, mergeOption: function (t) {
        i.superCall(this, "mergeOption", t);
      }, optionUpdated: function () {
        this._updateData(this[F]);var t = this._data;if (t[0] && "single" === this.get("selectedMode")) {
          for (var e = !1, n = 0; n < t[we]; n++) {
            var i = t[n].get("name");if (this.isSelected(i)) {
              this.select(i), e = !0;break;
            }
          }!e && this.select(t[0].get("name"));
        }
      }, _updateData: function (t) {
        var i = e.map(this.get("data") || [], function (t) {
          return (typeof t === Oe || typeof t === U) && (t = { name: t }), new n(t, this, this[F]);
        }, this);this._data = i;var r = e.map(t.getSeries(), function (t) {
          return t.name;
        });t[me](function (t) {
          if (t.legendDataProvider) {
            var e = t.legendDataProvider();r = r[pe](e.mapArray(e[p]));
          }
        }), this._availableNames = r;
      }, getData: function () {
        return this._data;
      }, select: function (t) {
        var n = this[l].selected,
            i = this.get("selectedMode");if ("single" === i) {
          var r = this._data;e.each(r, function (t) {
            n[t.get("name")] = !1;
          });
        }n[t] = !0;
      }, unSelect: function (t) {
        "single" !== this.get("selectedMode") && (this[l].selected[t] = !1);
      }, toggleSelected: function (t) {
        var e = this[l].selected;e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t);
      }, isSelected: function (t) {
        var n = this[l].selected;return !(n.hasOwnProperty(t) && !n[t]) && e[be](this._availableNames, t) >= 0;
      }, defaultOption: { zlevel: 0, z: 4, show: !0, orient: "horizontal", left: "center", top: "top", align: "auto", backgroundColor: "rgba(0,0,0,0)", borderColor: "#ccc", borderWidth: 0, padding: 5, itemGap: 10, itemWidth: 25, itemHeight: 14, inactiveColor: "#ccc", textStyle: { color: "#333" }, selectedMode: !0, tooltip: { show: !1 } } });return i;
  }), e("echarts/component/legend/legendAction", [Ze, g, Fe], function (t) {
    function e(t, e, n) {
      var r,
          a = {},
          o = "toggleSelected" === t;return n[Ae]("legend", function (n) {
        o && null != r ? n[r ? "select" : "unSelect"](e.name) : (n[t](e.name), r = n.isSelected(e.name));var s = n[Ve]();i.each(s, function (t) {
          var e = t.get("name");if ("\n" !== e && "" !== e) {
            var i = n.isSelected(e);a[e] = a.hasOwnProperty(e) ? a[e] && i : i;
          }
        });
      }), { name: e.name, selected: a };
    }var n = t(g),
        i = t(Fe);n.registerAction("legendToggleSelect", "legendselectchanged", i.curry(e, "toggleSelected")), n.registerAction("legendSelect", "legendselected", i.curry(e, "select")), n.registerAction("legendUnSelect", "legendunselected", i.curry(e, "unSelect"));
  }), e("echarts/component/legend/LegendView", [Ze, Fe, "../../util/symbol", E, "../helper/listComponent", g], function (t) {
    function e(t, e) {
      e.dispatchAction({ type: "legendToggleSelect", name: t });
    }function n(t, e, n) {
      var i = n.getZr().storage.getDisplayList()[0];i && i.useHoverLayer || t.get("legendHoverLink") && n.dispatchAction({ type: "highlight", seriesName: t.name, name: e });
    }function i(t, e, n) {
      var i = n.getZr().storage.getDisplayList()[0];i && i.useHoverLayer || t.get("legendHoverLink") && n.dispatchAction({ type: "downplay", seriesName: t.name, name: e });
    }var r = t(Fe),
        o = t("../../util/symbol"),
        s = t(E),
        u = t("../helper/listComponent"),
        c = r.curry;return t(g).extendComponentView({ type: "legend", init: function () {
        this._symbolTypeStore = {};
      }, render: function (t, a, o) {
        var l = this.group;if (l[H](), t.get("show")) {
          var h = t.get("selectedMode"),
              d = t.get("align");"auto" === d && (d = "right" === t.get("left") && "vertical" === t.get("orient") ? "right" : "left");var f = r.createHashMap();r.each(t[Ve](), function (r) {
            var u = r.get("name");if ("" === u || "\n" === u) return void l.add(new s.Group({ newline: !0 }));var p = a.getSeriesByName(u)[0];if (!f.get(u)) if (p) {
              var m = p[Ve](),
                  v = m.getVisual("color");typeof v === j && (v = v(p[ee](0)));var g = m.getVisual("legendSymbol") || "roundRect",
                  y = m.getVisual("symbol"),
                  x = this._createItem(u, r, t, g, y, d, v, h);x.on("click", c(e, u, o)).on(re, c(n, p, null, o)).on(ie, c(i, p, null, o)), f.set(u, !0);
            } else a.eachRawSeries(function (a) {
              if (!f.get(u) && a.legendDataProvider) {
                var s = a.legendDataProvider(),
                    l = s.indexOfName(u);if (0 > l) return;var p = s[xe](l, "color"),
                    m = "roundRect",
                    v = this._createItem(u, r, t, m, null, d, p, h);v.on("click", c(e, u, o)).on(re, c(n, a, u, o)).on(ie, c(i, a, u, o)), f.set(u, !0);
              }
            }, this);
          }, this), u.layout(l, t, o), u.addBackground(l, t);
        }
      }, _createItem: function (t, e, n, i, u, c, p, m) {
        var v = n.get("itemWidth"),
            g = n.get("itemHeight"),
            y = n.get("inactiveColor"),
            x = n.isSelected(t),
            _ = new s.Group(),
            b = e[ke](f),
            w = e.get("icon"),
            M = e[ke]("tooltip"),
            S = M.parentModel;if (i = w || i, _.add(o.createSymbol(i, 0, 0, v, g, x ? p : y)), !w && u && (u !== i || "none" == u)) {
          var A = .8 * g;"none" === u && (u = "circle"), _.add(o.createSymbol(u, (v - A) / 2, (g - A) / 2, A, A, x ? p : y));
        }var P = "left" === c ? v + 5 : -5,
            T = c,
            C = n.get("formatter"),
            k = t;typeof C === Oe && C ? k = C[$]("{name}", null != t ? t : "") : typeof C === j && (k = C(t));var L = new s.Text({ style: { text: k, x: P, y: g / 2, fill: x ? b[d]() : y, textFont: b[h](), textAlign: T, textVerticalAlign: "middle" } });_.add(L);var I = new s.Rect({ shape: _[a](), invisible: !0, tooltip: M.get("show") ? r[he]({ content: t, formatter: S.get("formatter", !0) || function () {
              return t;
            }, formatterParams: { componentType: "legend", legendIndex: n[se], name: t, $vars: ["name"] } }, M[l]) : null });return _.add(I), _.eachChild(function (t) {
          t.silent = !0;
        }), I.silent = !m, this.group.add(_), s.setHoverStyle(_), _;
      } });
  }), e("echarts/component/legend/legendFilter", [], function () {
    return function (t) {
      var e = t.findComponents({ mainType: "legend" });e && e[we] && t.filterSeries(function (t) {
        for (var n = 0; n < e[we]; n++) if (!e[n].isSelected(t.name)) return !1;return !0;
      });
    };
  }), e("echarts/component/marker/MarkPointModel", [Ze, "./MarkerModel"], function (t) {
    return t("./MarkerModel")[he]({ type: "markPoint", defaultOption: { zlevel: 0, z: 5, symbol: "pin", symbolSize: 50, tooltip: { trigger: "item" }, label: { normal: { show: !0, position: "inside" }, emphasis: { show: !0 } }, itemStyle: { normal: { borderWidth: 2 } } } });
  }), e("echarts/component/marker/MarkPointView", [Ze, "../../chart/helper/SymbolDraw", Fe, "../../util/number", "../../data/List", "./markerHelper", "./MarkerView"], function (t) {
    function e(t, e, n) {
      var i = e[_e];t.each(function (r) {
        var o,
            s = t[w](r),
            l = a[m](s.get("x"), n[Ce]()),
            u = a[m](s.get("y"), n[Te]());if (isNaN(l) || isNaN(u)) {
          if (e.getMarkerPosition) o = e.getMarkerPosition(t.getValues(t[X], r));else if (i) {
            var c = t.get(i[X][0], r),
                h = t.get(i[X][1], r);o = i.dataToPoint([c, h]);
          }
        } else o = [l, u];isNaN(l) || (o[0] = l), isNaN(u) || (o[1] = u), t.setItemLayout(r, o);
      });
    }function n(t, e, n) {
      var i;i = t ? r.map(t && t[X], function (t) {
        var n = e[Ve]().getDimensionInfo(e[_](t)[0]) || {};return n.name = t, n;
      }) : [{ name: "value", type: "float" }];var a = new o(i, n),
          l = r.map(n.get("data"), r.curry(s.dataTransform, e));return t && (l = r.filter(l, r.curry(s.dataFilter, t))), a.initData(l, null, t ? s.dimValueGetter : function (t) {
        return t.value;
      }), a;
    }var i = t("../../chart/helper/SymbolDraw"),
        r = t(Fe),
        a = t("../../util/number"),
        o = t("../../data/List"),
        s = t("./markerHelper");t("./MarkerView")[he]({ type: "markPoint", updateLayout: function (t, n, i) {
        n[me](function (t) {
          var n = t.markPointModel;n && (e(n[Ve](), t, i), this.markerGroupMap.get(t.id).updateLayout(n));
        }, this);
      }, renderSeries: function (t, r, a, o) {
        var s = t[_e],
            l = t.id,
            u = t[Ve](),
            c = this.markerGroupMap,
            h = c.get(l) || c.set(l, new i()),
            d = n(s, t, r);r.setData(d), e(r[Ve](), t, o), d.each(function (t) {
          var e = d[w](t),
              n = e[b]("symbolSize");typeof n === j && (n = n(r[M](t), r[ee](t))), d.setItemVisual(t, { symbolSize: n, color: e.get("itemStyle.normal.color") || u.getVisual("color"), symbol: e[b]("symbol") });
        }), h.updateData(d), this.group.add(h.group), d[C](function (t) {
          t[te](function (t) {
            t.dataModel = r;
          });
        }), h.__keep = !0, h.group.silent = r.get("silent") || t.get("silent");
      } });
  }), e("echarts/component/marker/MarkLineModel", [Ze, "./MarkerModel"], function (t) {
    return t("./MarkerModel")[he]({ type: "markLine", defaultOption: { zlevel: 0, z: 5, symbol: ["circle", "arrow"], symbolSize: [8, 16], precision: 2, tooltip: { trigger: "item" }, label: { normal: { show: !0, position: "end" }, emphasis: { show: !0 } }, lineStyle: { normal: { type: "dashed" }, emphasis: { width: 3 } }, animationEasing: "linear" } });
  }), e("echarts/component/marker/MarkLineView", [Ze, Fe, "../../data/List", "../../util/number", "./markerHelper", "../../chart/helper/LineDraw", "./MarkerView"], function (t) {
    function e(t) {
      return !isNaN(t) && !isFinite(t);
    }function n(t, n, i, r) {
      var a = 1 - t,
          o = r[X][t];return e(n[a]) && e(i[a]) && n[t] === i[t] && r[O](o).containData(n[t]);
    }function i(t, e) {
      if ("cartesian2d" === t.type) {
        var i = e[0].coord,
            r = e[1].coord;if (i && r && (n(1, i, r, t) || n(0, i, r, t))) return !0;
      }return u.dataFilter(t, e[0]) && u.dataFilter(t, e[1]);
    }function r(t, n, i, r, a) {
      var o,
          s = r[_e],
          u = t[w](n),
          c = l[m](u.get("x"), a[Ce]()),
          h = l[m](u.get("y"), a[Te]());if (isNaN(c) || isNaN(h)) {
        if (r.getMarkerPosition) o = r.getMarkerPosition(t.getValues(t[X], n));else {
          var d = s[X],
              f = t.get(d[0], n),
              p = t.get(d[1], n);o = s.dataToPoint([f, p]);
        }if ("cartesian2d" === s.type) {
          var v = s[O]("x"),
              g = s[O]("y"),
              d = s[X];e(t.get(d[0], n)) ? o[0] = v[D](v[V]()[i ? 0 : 1]) : e(t.get(d[1], n)) && (o[1] = g[D](g[V]()[i ? 0 : 1]));
        }isNaN(c) || (o[0] = c), isNaN(h) || (o[1] = h);
      } else o = [c, h];t.setItemLayout(n, o);
    }function a(t, e, n) {
      var r;r = t ? o.map(t && t[X], function (t) {
        var n = e[Ve]().getDimensionInfo(e[_](t)[0]) || {};return n.name = t, n;
      }) : [{ name: "value", type: "float" }];var a = new s(r, n),
          l = new s(r, n),
          c = new s([], n),
          d = o.map(n.get("data"), o.curry(h, e, t, n));t && (d = o.filter(d, o.curry(i, t)));var f = t ? u.dimValueGetter : function (t) {
        return t.value;
      };return a.initData(o.map(d, function (t) {
        return t[0];
      }), null, f), l.initData(o.map(d, function (t) {
        return t[1];
      }), null, f), c.initData(o.map(d, function (t) {
        return t[2];
      })), c.hasItemOption = !0, { from: a, to: l, line: c };
    }var o = t(Fe),
        s = t("../../data/List"),
        l = t("../../util/number"),
        u = t("./markerHelper"),
        c = t("../../chart/helper/LineDraw"),
        h = function (t, e, n, i) {
      var r = t[Ve](),
          a = i.type;if (!o[Y](i) && ("min" === a || "max" === a || "average" === a || null != i.xAxis || null != i.yAxis)) {
        var s, l, c;if (null != i.yAxis || null != i.xAxis) l = null != i.yAxis ? "y" : "x", s = e[O](l), c = o[y](i.yAxis, i.xAxis);else {
          var h = u.getAxisInfo(i, r, e, t);l = h.valueDataDim, s = h.valueAxis, c = u.numCalculate(r, l, a);
        }var d = "x" === l ? 0 : 1,
            f = 1 - d,
            p = o.clone(i),
            m = {};p.type = null, p.coord = [], m.coord = [], p.coord[f] = -1 / 0, m.coord[f] = 1 / 0;var v = n.get("precision");v >= 0 && typeof c === U && (c = +c.toFixed(v)), p.coord[d] = m.coord[d] = c, i = [p, m, { type: a, valueIndex: i.valueIndex, value: c }];
      }return i = [u.dataTransform(t, i[0]), u.dataTransform(t, i[1]), o[he]({}, i[2])], i[2].type = i[2].type || "", o.merge(i[2], i[0]), o.merge(i[2], i[1]), i;
    };t("./MarkerView")[he]({ type: "markLine", updateLayout: function (t, e, n) {
        e[me](function (t) {
          var e = t.markLineModel;if (e) {
            var i = e[Ve](),
                a = e.__from,
                o = e.__to;a.each(function (e) {
              r(a, e, !0, t, n), r(o, e, !1, t, n);
            }), i.each(function (t) {
              i.setItemLayout(t, [a[k](t), o[k](t)]);
            }), this.markerGroupMap.get(t.id).updateLayout();
          }
        }, this);
      }, renderSeries: function (t, e, n, i) {
        function s(e, n, a) {
          var o = e[w](n);r(e, n, a, t, i), e.setItemVisual(n, { symbolSize: o.get("symbolSize") || x[a ? 0 : 1], symbol: o.get("symbol", !0) || y[a ? 0 : 1], color: o.get("itemStyle.normal.color") || h.getVisual("color") });
        }var l = t[_e],
            u = t.id,
            h = t[Ve](),
            d = this.markerGroupMap,
            f = d.get(u) || d.set(u, new c());this.group.add(f.group);var p = a(l, t, e),
            m = p.from,
            v = p.to,
            g = p.line;e.__from = m, e.__to = v, e.setData(g);var y = e.get("symbol"),
            x = e.get("symbolSize");o[Y](y) || (y = [y, y]), typeof x === U && (x = [x, x]), p.from.each(function (t) {
          s(m, t, !0), s(v, t, !1);
        }), g.each(function (t) {
          var e = g[w](t).get("lineStyle.normal.color");g.setItemVisual(t, { color: e || m[xe](t, "color") }), g.setItemLayout(t, [m[k](t), v[k](t)]), g.setItemVisual(t, { fromSymbolSize: m[xe](t, "symbolSize"), fromSymbol: m[xe](t, "symbol"), toSymbolSize: v[xe](t, "symbolSize"), toSymbol: v[xe](t, "symbol") });
        }), f.updateData(g), p.line[C](function (t) {
          t[te](function (t) {
            t.dataModel = e;
          });
        }), f.__keep = !0, f.group.silent = e.get("silent") || t.get("silent");
      } });
  }), e("echarts/component/dataZoom/typeDefaulter", [Ze, "../../model/Component"], function (t) {
    t("../../model/Component").registerSubTypeDefaulter("dataZoom", function () {
      return "slider";
    });
  }), e("echarts/component/axis", [Ze, "../coord/cartesian/AxisModel", "./axis/CartesianAxisView"], function (t) {
    t("../coord/cartesian/AxisModel"), t("./axis/CartesianAxisView");
  }), e("echarts/component/dataZoom/DataZoomModel", [Ze, Fe, "zrender/core/env", g, R, Ne, "./AxisProxy"], function (t) {
    function e(t) {
      var e = {};return c(["start", "end", "startValue", "endValue", "throttle"], function (n) {
        t.hasOwnProperty(n) && (e[n] = t[n]);
      }), e;
    }function n(t, e) {
      c([["start", "startValue"], ["end", "endValue"]], function (n, i) {
        var r = t._rangePropMode;null != e[n[0]] ? r[i] = "percent" : null != e[n[1]] && (r[i] = "value");
      });
    }var i = t(Fe),
        r = t("zrender/core/env"),
        a = t(g),
        o = t(R),
        s = t(Ne),
        u = t("./AxisProxy"),
        c = i.each,
        h = s.eachAxisDim,
        d = a.extendComponentModel({ type: "dataZoom", dependencies: ["xAxis", "yAxis", "zAxis", "radiusAxis", "angleAxis", "singleAxis", fe], defaultOption: { zlevel: 0, z: 4, orient: null, xAxisIndex: null, yAxisIndex: null, filterMode: "filter", throttle: null, start: 0, end: 100, startValue: null, endValue: null, minSpan: null, maxSpan: null, minValueSpan: null, maxValueSpan: null }, init: function (t, n, i) {
        this._dataIntervalByAxis = {}, this._dataInfo = {}, this._axisProxies = {}, this.textStyleModel, this._autoThrottle = !0, this._rangePropMode = ["percent", "percent"];var r = e(t);this.mergeDefaultAndTheme(t, i), this.doInit(r);
      }, mergeOption: function (t) {
        var n = e(t);i.merge(this[l], t, !0), this.doInit(n);
      }, doInit: function (t) {
        var e = this[l];r.canvasSupported || (e.realtime = !1), this._setDefaultThrottle(t), n(this, t), c([["start", "startValue"], ["end", "endValue"]], function (t, n) {
          "value" === this._rangePropMode[n] && (e[t[0]] = null);
        }, this), this.textStyleModel = this[ke](f), this._resetTarget(), this._giveAxisProxies();
      }, _giveAxisProxies: function () {
        var t = this._axisProxies;this.eachTargetAxis(function (e, n, i, r) {
          var a = this.dependentModels[e.axis][n],
              o = a.__dzAxisProxy || (a.__dzAxisProxy = new u(e.name, n, this, r));t[e.name + "_" + n] = o;
        }, this);
      }, _resetTarget: function () {
        var t = this[l],
            e = this._judgeAutoMode();h(function (e) {
          var n = e.axisIndex;t[n] = o.normalizeToArray(t[n]);
        }, this), "axisIndex" === e ? this._autoSetAxisIndex() : "orient" === e && this._autoSetOrient();
      }, _judgeAutoMode: function () {
        var t = this[l],
            e = !1;h(function (n) {
          null != t[n.axisIndex] && (e = !0);
        }, this);var n = t.orient;return null == n && e ? "orient" : e ? void 0 : (null == n && (t.orient = "horizontal"), "axisIndex");
      }, _autoSetAxisIndex: function () {
        var t = !0,
            e = this.get("orient", !0),
            n = this[l],
            r = this.dependentModels;if (t) {
          var a = "vertical" === e ? "y" : "x";r[a + "Axis"][we] ? (n[a + "AxisIndex"] = [0], t = !1) : c(r.singleAxis, function (i) {
            t && i.get("orient", !0) === e && (n.singleAxisIndex = [i[se]], t = !1);
          });
        }t && h(function (e) {
          if (t) {
            var i = [],
                r = this.dependentModels[e.axis];if (r[we] && !i[we]) for (var a = 0, o = r[we]; o > a; a++) r[a].get("type") === x && i.push(a);n[e.axisIndex] = i, i[we] && (t = !1);
          }
        }, this), t && this[F][me](function (t) {
          this._isSeriesHasAllAxesTypeOf(t, "value") && h(function (e) {
            var r = n[e.axisIndex],
                a = t.get(e.axisIndex),
                o = t.get(e.axisId),
                s = t[F].queryComponents({ mainType: e.axis, index: a, id: o })[0];a = s[se], i[be](r, a) < 0 && r.push(a);
          });
        }, this);
      }, _autoSetOrient: function () {
        var t;this.eachTargetAxis(function (e) {
          !t && (t = e.name);
        }, this), this[l].orient = "y" === t ? "vertical" : "horizontal";
      }, _isSeriesHasAllAxesTypeOf: function (t, e) {
        var n = !0;return h(function (i) {
          var r = t.get(i.axisIndex),
              a = this.dependentModels[i.axis][r];a && a.get("type") === e || (n = !1);
        }, this), n;
      }, _setDefaultThrottle: function (t) {
        if (t.hasOwnProperty("throttle") && (this._autoThrottle = !1), this._autoThrottle) {
          var e = this[F][l];this[l].throttle = e[Ie] && e.animationDurationUpdate > 0 ? 100 : 20;
        }
      }, getFirstTargetAxisModel: function () {
        var t;return h(function (e) {
          if (null == t) {
            var n = this.get(e.axisIndex);n[we] && (t = this.dependentModels[e.axis][n[0]]);
          }
        }, this), t;
      }, eachTargetAxis: function (t, e) {
        var n = this[F];h(function (i) {
          c(this.get(i.axisIndex), function (r) {
            t.call(e, i, r, this, n);
          }, this);
        }, this);
      }, getAxisProxy: function (t, e) {
        return this._axisProxies[t + "_" + e];
      }, getAxisModel: function (t, e) {
        var n = this.getAxisProxy(t, e);return n && n.getAxisModel();
      }, setRawRange: function (t, e) {
        c(["start", "end", "startValue", "endValue"], function (e) {
          this[l][e] = t[e];
        }, this), !e && n(this, t);
      }, getPercentRange: function () {
        var t = this.findRepresentativeAxisProxy();return t ? t.getDataPercentWindow() : void 0;
      }, getValueRange: function (t, e) {
        if (null != t || null != e) return this.getAxisProxy(t, e).getDataValueWindow();var n = this.findRepresentativeAxisProxy();return n ? n.getDataValueWindow() : void 0;
      }, findRepresentativeAxisProxy: function (t) {
        if (t) return t.__dzAxisProxy;var e = this._axisProxies;for (var n in e) if (e.hasOwnProperty(n) && e[n].hostedBy(this)) return e[n];for (var n in e) if (e.hasOwnProperty(n) && !e[n].hostedBy(this)) return e[n];
      }, getRangePropMode: function () {
        return this._rangePropMode.slice();
      } });return d;
  }), e("echarts/component/dataZoom/DataZoomView", [Ze, "../../view/Component"], function (t) {
    var e = t("../../view/Component");return e[he]({ type: "dataZoom", render: function (t, e, n) {
        this.dataZoomModel = t, this[F] = e, this.api = n;
      }, getTargetCoordInfo: function () {
        function t(t, e, n, i) {
          for (var r, a = 0; a < n[we]; a++) if (n[a].model === t) {
            r = n[a];break;
          }r || n.push(r = { model: t, axisModels: [], coordIndex: i }), r.axisModels.push(e);
        }var e = this.dataZoomModel,
            n = this[F],
            i = {};return e.eachTargetAxis(function (e, r) {
          var a = n.getComponent(e.axis, r);if (a) {
            var o = a.getCoordSysModel();o && t(o, a, i[o[le]] || (i[o[le]] = []), o[se]);
          }
        }, this), i;
      } });
  }), e("echarts/component/dataZoom/SliderZoomModel", [Ze, "./DataZoomModel"], function (t) {
    var e = t("./DataZoomModel"),
        n = e[he]({ type: "dataZoom.slider", layoutMode: "box", defaultOption: { show: !0, right: "ph", top: "ph", width: "ph", height: "ph", left: null, bottom: null, backgroundColor: "rgba(47,69,84,0)", dataBackground: { lineStyle: { color: "#2f4554", width: .5, opacity: .3 }, areaStyle: { color: "rgba(47,69,84,0.3)", opacity: .3 } }, borderColor: "#ddd", fillerColor: "rgba(167,183,204,0.4)", handleIcon: "M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z", handleSize: "100%", handleStyle: { color: "#a7b7cc" }, labelPrecision: null, labelFormatter: null, showDetail: !0, showDataShadow: "auto", realtime: !0, zoomLock: !1, textStyle: { color: "#333" } } });return n;
  }), e("echarts/component/dataZoom/SliderZoomView", [Ze, Fe, E, "../../util/throttle", "./DataZoomView", "../../util/number", "../../util/layout", "../helper/sliderMove", "zrender/core/event"], function (t) {
    function e(t) {
      var e = { x: "y", y: "x", radius: "angle", angle: "radius" };return e[t];
    }var n = t(Fe),
        i = t(E),
        o = t("../../util/throttle"),
        u = t("./DataZoomView"),
        c = i.Rect,
        f = t("../../util/number"),
        p = f.linearMap,
        v = t("../../util/layout"),
        g = t("../helper/sliderMove"),
        y = t("zrender/core/event"),
        _ = f.asc,
        b = n.bind,
        w = n.each,
        M = 7,
        S = 1,
        P = 30,
        C = "horizontal",
        k = "vertical",
        L = 5,
        I = ["line", "bar", "candlestick", "scatter"],
        D = u[he]({ type: "dataZoom.slider", init: function (t, e) {
        this._displayables = {}, this._orient, this._range, this._handleEnds, this._size, this._handleWidth, this._handleHeight, this._location, this._dragging, this._dataShadowInfo, this.api = e;
      }, render: function (t, e, n, i) {
        return D.superApply(this, "render", arguments), o.createOrUpdate(this, "_dispatchZoomAction", this.dataZoomModel.get("throttle"), "fixRate"), this._orient = t.get("orient"), this.dataZoomModel.get("show") === !1 ? void this.group[H]() : (i && "dataZoom" === i.type && i.from === this.uid || this._buildView(), void this._updateView());
      }, remove: function () {
        D.superApply(this, de, arguments), o.clear(this, "_dispatchZoomAction");
      }, dispose: function () {
        D.superApply(this, oe, arguments), o.clear(this, "_dispatchZoomAction");
      }, _buildView: function () {
        var t = this.group;t[H](), this._resetLocation(), this._resetInterval();var e = this._displayables.barGroup = new i.Group();this._renderBackground(), this._renderHandle(), this._renderDataShadow(), t.add(e), this._positionGroup();
      }, _resetLocation: function () {
        var t = this.dataZoomModel,
            e = this.api,
            i = this._findCoordRect(),
            r = { width: e[Ce](), height: e[Te]() },
            a = this._orient === C ? { right: r.width - i.x - i.width, top: r[De] - P - M, width: i.width, height: P } : { right: M, top: i.y, width: P, height: i[De] },
            o = v.getLayoutParams(t[l]);n.each(["right", "top", "width", De], function (t) {
          "ph" === o[t] && (o[t] = a[t]);
        });var s = v.getLayoutRect(o, r, t.padding);this._location = { x: s.x, y: s.y }, this._size = [s.width, s[De]], this._orient === k && this._size.reverse();
      }, _positionGroup: function () {
        var t = this.group,
            e = this._location,
            n = this._orient,
            i = this.dataZoomModel.getFirstTargetAxisModel(),
            r = i && i.get("inverse"),
            o = this._displayables.barGroup,
            s = (this._dataShadowInfo || {}).otherAxisInverse;o.attr(n !== C || r ? n === C && r ? { scale: s ? [-1, 1] : [-1, -1] } : n !== k || r ? { scale: s ? [-1, -1] : [-1, 1], rotation: Math.PI / 2 } : { scale: s ? [1, -1] : [1, 1], rotation: Math.PI / 2 } : { scale: s ? [1, 1] : [1, -1] });var l = t[a]([o]);t.attr(A, [e.x - l.x, e.y - l.y]);
      }, _getViewExtent: function () {
        return [0, this._size[0]];
      }, _renderBackground: function () {
        var t = this.dataZoomModel,
            e = this._size,
            i = this._displayables.barGroup;i.add(new c({ silent: !0, shape: { x: 0, y: 0, width: e[0], height: e[1] }, style: { fill: t.get("backgroundColor") }, z2: -40 })), i.add(new c({ shape: { x: 0, y: 0, width: e[0], height: e[1] }, style: { fill: "transparent" }, z2: 0, onclick: n.bind(this._onClickPanelClick, this) }));
      }, _renderDataShadow: function () {
        var t = this._dataShadowInfo = this._prepareDataShadowInfo();if (t) {
          var e = this._size,
              r = t[fe],
              a = r.getRawData(),
              o = r.getShadowDim ? r.getShadowDim() : t.otherDim;if (null != o) {
            var s = a[B](o),
                l = .3 * (s[1] - s[0]);s = [s[0] - l, s[1] + l];var u,
                c = [0, e[1]],
                h = [0, e[0]],
                d = [[e[0], 0], [0, 0]],
                f = [],
                m = h[1] / (a.count() - 1),
                v = 0,
                g = Math.round(a.count() / e[0]);a.each([o], function (t, e) {
              if (g > 0 && e % g) return void (v += m);var n = null == t || isNaN(t) || "" === t,
                  i = n ? 0 : p(t, s, c, !0);n && !u && e ? (d.push([d[d[we] - 1][0], 0]), f.push([f[f[we] - 1][0], 0])) : !n && u && (d.push([v, 0]), f.push([v, 0])), d.push([v, i]), f.push([v, i]), v += m, u = n;
            });var y = this.dataZoomModel;this._displayables.barGroup.add(new i.Polygon({ shape: { points: d }, style: n[ce]({ fill: y.get("dataBackgroundColor") }, y[ke]("dataBackground.areaStyle").getAreaStyle()), silent: !0, z2: -20 })), this._displayables.barGroup.add(new i.Polyline({ shape: { points: f }, style: y[ke]("dataBackground.lineStyle")[T](), silent: !0, z2: -19 }));
          }
        }
      }, _prepareDataShadowInfo: function () {
        var t = this.dataZoomModel,
            i = t.get("showDataShadow");if (i !== !1) {
          var r,
              a = this[F];return t.eachTargetAxis(function (o, s) {
            var l = t.getAxisProxy(o.name, s).getTargetSeriesModels();n.each(l, function (t) {
              if (!(r || i !== !0 && n[be](I, t.get("type")) < 0)) {
                var l,
                    u = a.getComponent(o.axis, s).axis,
                    c = e(o.name),
                    h = t[_e];null != c && h.getOtherAxis && (l = h.getOtherAxis(u).inverse), r = { thisAxis: u, series: t, thisDim: o.name, otherDim: c, otherAxisInverse: l };
              }
            }, this);
          }, this), r;
        }
      }, _renderHandle: function () {
        var t = this._displayables,
            e = t.handles = [],
            n = t.handleLabels = [],
            r = this._displayables.barGroup,
            o = this._size,
            l = this.dataZoomModel;r.add(t.filler = new c({ draggable: !0, cursor: "move", drift: b(this._onDragMove, this, "all"), onmousemove: function (t) {
            y.stop(t.event);
          }, ondragstart: b(this._showDataInfo, this, !0), ondragend: b(this._onDragEnd, this), onmouseover: b(this._showDataInfo, this, !0), onmouseout: b(this._showDataInfo, this, !1), style: { fill: l.get("fillerColor"), textPosition: "inside" } })), r.add(new c(i.subPixelOptimizeRect({ silent: !0, shape: { x: 0, y: 0, width: o[0], height: o[1] }, style: { stroke: l.get("dataBackgroundColor") || l.get("borderColor"), lineWidth: S, fill: "rgba(0,0,0,0)" } })));var u = l.get("handleIcon");w([0, 1], function (t) {
          var o = { style: { strokeNoScale: !0 }, rectHover: !0, cursor: "vertical" === this._orient ? "ns-resize" : "ew-resize", draggable: !0, drift: b(this._onDragMove, this, t), onmousemove: function (t) {
              y.stop(t.event);
            }, ondragend: b(this._onDragEnd, this), onmouseover: b(this._showDataInfo, this, !0), onmouseout: b(this._showDataInfo, this, !1) },
              c = { x: -1, y: 0, width: 2, height: 2 },
              p = 0 === u[be]("image://") ? (c.image = u.slice(8), o.style = c, new i.Image(o)) : i.makePath(u[$]("path://", ""), o, c, s),
              v = p[a]();this._handleHeight = f[m](l.get("handleSize"), this._size[1]), this._handleWidth = v.width / v[De] * this._handleHeight, p[J](l[ke]("handleStyle").getItemStyle());var g = l.get("handleColor");null != g && (p.style.fill = g), r.add(e[t] = p);var x = l.textStyleModel;this.group.add(n[t] = new i.Text({ silent: !0, invisible: !0, style: { x: 0, y: 0, text: "", textVerticalAlign: "middle", textAlign: "center", fill: x[d](), textFont: x[h]() }, z2: 10 }));
        }, this);
      }, _resetInterval: function () {
        var t = this._range = this.dataZoomModel.getPercentRange(),
            e = this._getViewExtent();this._handleEnds = [p(t[0], [0, 100], e, !0), p(t[1], [0, 100], e, !0)];
      }, _updateInterval: function (t, e) {
        var n = this.dataZoomModel,
            i = this._handleEnds,
            r = this._getViewExtent(),
            a = n.findRepresentativeAxisProxy().getMinMaxSpan(),
            o = [0, 100];g(e, i, r, n.get("zoomLock") ? "all" : t, null != a.minSpan ? p(a.minSpan, o, r, !0) : null, null != a.maxSpan ? p(a.maxSpan, o, r, !0) : null), this._range = _([p(i[0], r, o, !0), p(i[1], r, o, !0)]);
      }, _updateView: function (t) {
        var e = this._displayables,
            n = this._handleEnds,
            i = _(n.slice()),
            r = this._size;w([0, 1], function (t) {
          var i = e.handles[t],
              a = this._handleHeight;i.attr({ scale: [a / 2, a / 2], position: [n[t], r[1] / 2 - a / 2] });
        }, this), e.filler.setShape({ x: i[0], y: 0, width: i[1] - i[0], height: r[1] }), this._updateDataInfo(t);
      }, _updateDataInfo: function (t) {
        function e(t) {
          var e = i.getTransform(a.handles[t][Q], this.group),
              n = i.transformDirection(0 === t ? "right" : "left", e),
              c = this._handleWidth / 2 + L,
              h = i[r]([p[t] + (0 === t ? -c : c), this._size[1] / 2], e);o[t][J]({ x: h[0], y: h[1], textVerticalAlign: l === C ? z : n, textAlign: l === C ? n : s, text: u[t] });
        }var n = this.dataZoomModel,
            a = this._displayables,
            o = a.handleLabels,
            l = this._orient,
            u = ["", ""];if (n.get("showDetail")) {
          var c = n.findRepresentativeAxisProxy();if (c) {
            var h = c.getAxisModel().axis,
                d = this._range,
                f = t ? c.calculateDataWindow({ start: d[0], end: d[1] }).valueWindow : c.getDataValueWindow();u = [this._formatLabel(f[0], h), this._formatLabel(f[1], h)];
          }
        }var p = _(this._handleEnds.slice());e.call(this, 0), e.call(this, 1);
      }, _formatLabel: function (t, e) {
        var i = this.dataZoomModel,
            r = i.get("labelFormatter"),
            a = i.get("labelPrecision");(null == a || "auto" === a) && (a = e.getPixelPrecision());var o = null == t || isNaN(t) ? "" : e.type === x || "time" === e.type ? e.scale.getLabel(Math.round(t)) : t.toFixed(Math.min(a, 20));return n.isFunction(r) ? r(t, o) : n[q](r) ? r[$]("{value}", o) : o;
      }, _showDataInfo: function (t) {
        t = this._dragging || t;var e = this._displayables.handleLabels;e[0].attr("invisible", !t), e[1].attr("invisible", !t);
      }, _onDragMove: function (t, e, n) {
        this._dragging = !0;var a = this._displayables.barGroup.getLocalTransform(),
            o = i[r]([e, n], a, !0);this._updateInterval(t, o[0]);var s = this.dataZoomModel.get("realtime");this._updateView(!s), s && s && this._dispatchZoomAction();
      }, _onDragEnd: function () {
        this._dragging = !1, this._showDataInfo(!1), this._dispatchZoomAction();
      }, _onClickPanelClick: function (t) {
        var e = this._size,
            n = this._displayables.barGroup.transformCoordToLocal(t.offsetX, t.offsetY);if (!(n[0] < 0 || n[0] > e[0] || n[1] < 0 || n[1] > e[1])) {
          var i = this._handleEnds,
              r = (i[0] + i[1]) / 2;this._updateInterval("all", n[0] - r), this._updateView(), this._dispatchZoomAction();
        }
      }, _dispatchZoomAction: function () {
        var t = this._range;this.api.dispatchAction({ type: "dataZoom", from: this.uid, dataZoomId: this.dataZoomModel.id, start: t[0], end: t[1] });
      }, _findCoordRect: function () {
        var t;if (w(this.getTargetCoordInfo(), function (e) {
          if (!t && e[we]) {
            var n = e[0].model[_e];t = n.getRect && n.getRect();
          }
        }), !t) {
          var e = this.api[Ce](),
              n = this.api[Te]();t = { x: .2 * e, y: .2 * n, width: .6 * e, height: .6 * n };
        }return t;
      } });return D;
  }), e("echarts/component/dataZoom/InsideZoomModel", [Ze, "./DataZoomModel"], function (t) {
    return t("./DataZoomModel")[he]({ type: "dataZoom.inside", defaultOption: { disabled: !1, zoomLock: !1, zoomOnMouseWheel: !0, moveOnMouseMove: !0, preventDefaultMouseMove: !0 } });
  }), e("echarts/component/dataZoom/InsideZoomView", [Ze, "./DataZoomView", Fe, "../helper/sliderMove", "./roams"], function (t) {
    var e = t("./DataZoomView"),
        n = t(Fe),
        i = t("../helper/sliderMove"),
        r = t("./roams"),
        a = n.bind,
        o = e[he]({ type: "dataZoom.inside", init: function () {
        this._range;
      }, render: function (t, e, i, s) {
        o.superApply(this, "render", arguments), r.shouldRecordRange(s, t.id) && (this._range = t.getPercentRange()), n.each(this.getTargetCoordInfo(), function (e, o) {
          var s = n.map(e, function (t) {
            return r.generateCoordId(t.model);
          });n.each(e, function (e) {
            var n = e.model,
                u = t[l];r.register(i, { coordId: r.generateCoordId(n), allCoordIds: s, containsPoint: function (t, e, i) {
                return n[_e].containPoint([e, i]);
              }, dataZoomId: t.id, throttleRate: t.get("throttle", !0), panGetRange: a(this._onPan, this, e, o), zoomGetRange: a(this._onZoom, this, e, o), zoomLock: u.zoomLock, disabled: u.disabled, roamControllerOpt: { zoomOnMouseWheel: u.zoomOnMouseWheel, moveOnMouseMove: u.moveOnMouseMove, preventDefaultMouseMove: u.preventDefaultMouseMove } });
          }, this);
        }, this);
      }, dispose: function () {
        r.unregister(this.api, this.dataZoomModel.id), o.superApply(this, oe, arguments), this._range = null;
      }, _onPan: function (t, e, n, r, a, o, l, u, c) {
        var h = this._range.slice(),
            d = t.axisModels[0];if (d) {
          var f = s[e]([o, l], [u, c], d, n, t),
              p = f.signal * (h[1] - h[0]) * f.pixel / f.pixelLength;return i(p, h, [0, 100], "all"), this._range = h;
        }
      }, _onZoom: function (t, e, n, r, a, o) {
        var l = this._range.slice(),
            u = t.axisModels[0];if (u) {
          var c = s[e](null, [a, o], u, n, t),
              h = (c.signal > 0 ? c.pixelStart + c.pixelLength - c.pixel : c.pixel - c.pixelStart) / c.pixelLength * (l[1] - l[0]) + l[0];r = Math.max(1 / r, 0), l[0] = (l[0] - h) * r + h, l[1] = (l[1] - h) * r + h;var d = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();return i(0, l, [0, 100], 0, d.minSpan, d.maxSpan), this._range = l;
        }
      } }),
        s = { grid: function (t, e, n, i, r) {
        var a = n.axis,
            o = {},
            s = r.model[_e].getRect();return t = t || [0, 0], "x" === a.dim ? (o.pixel = e[0] - t[0], o.pixelLength = s.width, o.pixelStart = s.x, o.signal = a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1], o.pixelLength = s[De], o.pixelStart = s.y, o.signal = a.inverse ? -1 : 1), o;
      }, polar: function (t, e, n, i, r) {
        var a = n.axis,
            o = {},
            s = r.model[_e],
            l = s.getRadiusAxis()[V](),
            u = s.getAngleAxis()[V]();return t = t ? s.pointToCoord(t) : [0, 0], e = s.pointToCoord(e), "radiusAxis" === n[le] ? (o.pixel = e[0] - t[0], o.pixelLength = l[1] - l[0], o.pixelStart = l[0], o.signal = a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1], o.pixelLength = u[1] - u[0], o.pixelStart = u[0], o.signal = a.inverse ? -1 : 1), o;
      }, singleAxis: function (t, e, n, i, r) {
        var a = n.axis,
            o = r.model[_e].getRect(),
            s = {};return t = t || [0, 0], "horizontal" === a.orient ? (s.pixel = e[0] - t[0], s.pixelLength = o.width, s.pixelStart = o.x, s.signal = a.inverse ? 1 : -1) : (s.pixel = e[1] - t[1], s.pixelLength = o[De], s.pixelStart = o.y, s.signal = a.inverse ? -1 : 1), s;
      } };return o;
  }), e("echarts/component/dataZoom/dataZoomProcessor", [Ze, g], function (t) {
    function e(t, e, n) {
      n.getAxisProxy(t.name, e).reset(n);
    }function n(t, e, n) {
      n.getAxisProxy(t.name, e).filterData(n);
    }var i = t(g);i.registerProcessor(function (t) {
      t[Ae]("dataZoom", function (t) {
        t.eachTargetAxis(e), t.eachTargetAxis(n);
      }), t[Ae]("dataZoom", function (t) {
        var e = t.findRepresentativeAxisProxy(),
            n = e.getDataPercentWindow(),
            i = e.getDataValueWindow();t.setRawRange({ start: n[0], end: n[1], startValue: i[0], endValue: i[1] }, !0);
      });
    });
  }), e("echarts/component/dataZoom/dataZoomAction", [Ze, Fe, Ne, g], function (t) {
    var e = t(Fe),
        n = t(Ne),
        i = t(g);i.registerAction("dataZoom", function (t, i) {
      var r = n.createLinkedNodesFinder(e.bind(i[Ae], i, "dataZoom"), n.eachAxisDim, function (t, e) {
        return t.get(e.axisIndex);
      }),
          a = [];i[Ae]({ mainType: "dataZoom", query: t }, function (t) {
        a.push.apply(a, r(t).nodes);
      }), e.each(a, function (e) {
        e.setRawRange({ start: t.start, end: t.end, startValue: t.startValue, endValue: t.endValue });
      });
    });
  }), e("echarts/scale/helper", [Ze, "../util/number"], function (t) {
    function e(t, e, n) {
      t[e] = Math.max(Math.min(t[e], n[1]), n[0]);
    }var n = t("../util/number"),
        i = n.round,
        r = {};return r.intervalScaleNiceTicks = function (t, e, a) {
      var o = {},
          s = t[1] - t[0],
          l = o.interval = n.nice(s / e, !0);null != a && a > l && (l = o.interval = a);var u = o.intervalPrecision = r.getIntervalPrecision(l),
          c = o.niceTickExtent = [i(Math.ceil(t[0] / l) * l, u), i(Math.floor(t[1] / l) * l, u)];return r.fixExtent(c, t), o;
    }, r.getIntervalPrecision = function (t) {
      return n.getPrecisionSafe(t) + 2;
    }, r.fixExtent = function (t, n) {
      !isFinite(t[0]) && (t[0] = n[0]), !isFinite(t[1]) && (t[1] = n[1]), e(t, 0, n), e(t, 1, n), t[0] > t[1] && (t[0] = t[1]);
    }, r.intervalScaleGetTicks = function (t, e, n, r) {
      var a = [];if (!t) return a;var o = 1e4;e[0] < n[0] && a.push(e[0]);for (var s = n[0]; s <= n[1] && (a.push(s), s = i(s + t, r), s !== a[a[we] - 1]);) if (a[we] > o) return [];return e[1] > (a[we] ? a[a[we] - 1] : n[1]) && a.push(e[1]), a;
    }, r;
  }), e("echarts/scale/Interval", [Ze, "../util/number", "../util/format", "./Scale", Ne], function (t) {
    var e = t("../util/number"),
        n = t("../util/format"),
        i = t("./Scale"),
        r = t(Ne),
        a = e.round,
        o = i[he]({ type: "interval", _interval: 0, _intervalPrecision: 2, setExtent: function (t, e) {
        var n = this._extent;isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));
      }, unionExtent: function (t) {
        var e = this._extent;t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), o[Re].setExtent.call(this, e[0], e[1]);
      }, getInterval: function () {
        return this._interval;
      }, setInterval: function (t) {
        this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = r.getIntervalPrecision(t);
      }, getTicks: function () {
        return r.intervalScaleGetTicks(this._interval, this._extent, this._niceExtent, this._intervalPrecision);
      }, getTicksLabels: function () {
        for (var t = [], e = this.getTicks(), n = 0; n < e[we]; n++) t.push(this.getLabel(e[n]));return t;
      }, getLabel: function (t, i) {
        if (null == t) return "";var r = i && i.precision;return null == r ? r = e.getPrecisionSafe(t) || 0 : "auto" === r && (r = this._intervalPrecision), t = a(t, r, !0), n.addCommas(t);
      }, niceTicks: function (t, e) {
        t = t || 5;var n = this._extent,
            i = n[1] - n[0];if (isFinite(i)) {
          0 > i && (i = -i, n.reverse());var a = r.intervalScaleNiceTicks(n, t, e);this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent;
        }
      }, niceExtent: function (t) {
        var e = this._extent;if (e[0] === e[1]) if (0 !== e[0]) {
          var n = e[0];t.fixMax ? e[0] -= n / 2 : (e[1] += n / 2, e[0] -= n / 2);
        } else e[1] = 1;var i = e[1] - e[0];isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval);var r = this._interval;t.fixMin || (e[0] = a(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = a(Math.ceil(e[1] / r) * r));
      } });return o[ye] = function () {
      return new o();
    }, o;
  }), e("echarts/scale/Scale", [Ze, "../util/clazz"], function (t) {
    function e(t) {
      this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments);
    }var n = t("../util/clazz"),
        i = e[Re];return i.parse = function (t) {
      return t;
    }, i.getSetting = function (t) {
      return this._setting[t];
    }, i[G] = function (t) {
      var e = this._extent;return t >= e[0] && t <= e[1];
    }, i[Z] = function (t) {
      var e = this._extent;return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0]);
    }, i.scale = function (t) {
      var e = this._extent;return t * (e[1] - e[0]) + e[0];
    }, i.unionExtent = function (t) {
      var e = this._extent;t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
    }, i.unionExtentFromData = function (t, e) {
      this.unionExtent(t[B](e, !0));
    }, i[V] = function () {
      return this._extent.slice();
    }, i.setExtent = function (t, e) {
      var n = this._extent;isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e);
    }, i.getTicksLabels = function () {
      for (var t = [], e = this.getTicks(), n = 0; n < e[we]; n++) t.push(this.getLabel(e[n]));return t;
    }, i.isBlank = function () {
      return this._isBlank;
    }, i.setBlank = function (t) {
      this._isBlank = t;
    }, n.enableClassExtend(e), n.enableClassManagement(e, { registerWhenExtend: !0 }), e;
  }), e("echarts/util/layout", [Ze, Fe, "zrender/core/BoundingRect", "./number", "./format"], function (t) {
    function e(t, e, n, i, r) {
      var o = 0,
          s = 0;null == i && (i = 1 / 0), null == r && (r = 1 / 0);var l = 0;e.eachChild(function (u, c) {
        var h,
            d,
            f = u[A],
            p = u[a](),
            m = e.childAt(c + 1),
            v = m && m[a]();if ("horizontal" === t) {
          var g = p.width + (v ? -v.x + p.x : 0);h = o + g, h > i || u.newline ? (o = 0, h = g, s += l + n, l = p[De]) : l = Math.max(l, p[De]);
        } else {
          var y = p[De] + (v ? -v.y + p.y : 0);d = s + y, d > r || u.newline ? (o += l + n, s = 0, d = y, l = p.width) : l = Math.max(l, p.width);
        }u.newline || (f[0] = o, f[1] = s, "horizontal" === t ? o = h + n : s = d + n);
      });
    }var n = t(Fe),
        i = t("zrender/core/BoundingRect"),
        o = t("./number"),
        l = t("./format"),
        u = o[m],
        c = n.each,
        h = {},
        d = h.LOCATION_PARAMS = ["left", "right", "top", Me, "width", De],
        f = h.HV_NAMES = [["width", "left", "right"], [De, "top", Me]];return h.box = e, h.vbox = n.curry(e, "vertical"), h.hbox = n.curry(e, "horizontal"), h.getAvailableSize = function (t, e, n) {
      var i = e.width,
          r = e[De],
          a = u(t.x, i),
          o = u(t.y, r),
          s = u(t.x2, i),
          c = u(t.y2, r);return (isNaN(a) || isNaN(parseFloat(t.x))) && (a = 0), (isNaN(s) || isNaN(parseFloat(t.x2))) && (s = i), (isNaN(o) || isNaN(parseFloat(t.y))) && (o = 0), (isNaN(c) || isNaN(parseFloat(t.y2))) && (c = r), n = l.normalizeCssArray(n || 0), { width: Math.max(s - a - n[1] - n[3], 0), height: Math.max(c - o - n[0] - n[2], 0) };
    }, h.getLayoutRect = function (t, e, n) {
      n = l.normalizeCssArray(n || 0);var r = e.width,
          a = e[De],
          o = u(t.left, r),
          c = u(t.top, a),
          h = u(t.right, r),
          d = u(t[Me], a),
          f = u(t.width, r),
          p = u(t[De], a),
          m = n[2] + n[0],
          v = n[1] + n[3],
          g = t.aspect;switch (isNaN(f) && (f = r - h - v - o), isNaN(p) && (p = a - d - m - c), isNaN(f) && isNaN(p) && (g > r / a ? f = .8 * r : p = .8 * a), null != g && (isNaN(f) && (f = g * p), isNaN(p) && (p = f / g)), isNaN(o) && (o = r - h - f - v), isNaN(c) && (c = a - d - p - m), t.left || t.right) {case s:
          o = r / 2 - f / 2 - n[3];break;case "right":
          o = r - f - v;}switch (t.top || t[Me]) {case z:case s:
          c = a / 2 - p / 2 - n[0];break;case Me:
          c = a - p - m;}o = o || 0, c = c || 0, isNaN(f) && (f = r - o - (h || 0)), isNaN(p) && (p = a - c - (d || 0));var y = new i(o + n[3], c + n[0], f, p);return y.margin = n, y;
    }, h.positionElement = function (t, e, o, s, l) {
      var u = !l || !l.hv || l.hv[0],
          c = !l || !l.hv || l.hv[1],
          d = l && l.boundingMode || "all";if (u || c) {
        var f;if ("raw" === d) f = "group" === t.type ? new i(0, 0, +e.width || 0, +e[De] || 0) : t[a]();else if (f = t[a](), t.needLocalTransform()) {
          var p = t.getLocalTransform();f = f.clone(), f[r](p);
        }e = h.getLayoutRect(n[ce]({ width: f.width, height: f[De] }, e), o, s);var m = t[A],
            v = u ? e.x - f.x : 0,
            g = c ? e.y - f.y : 0;t.attr(A, "raw" === d ? [v, g] : [m[0] + v, m[1] + g]);
      }
    }, h.sizeCalculable = function (t, e) {
      return null != t[f[e][0]] || null != t[f[e][1]] && null != t[f[e][2]];
    }, h.mergeLayoutParam = function (t, e, i) {
      function r(n, i) {
        var r = {},
            s = 0,
            u = {},
            h = 0,
            d = 2;if (c(n, function (e) {
          u[e] = t[e];
        }), c(n, function (t) {
          a(e, t) && (r[t] = u[t] = e[t]), o(r, t) && s++, o(u, t) && h++;
        }), l[i]) return o(e, n[1]) ? u[n[2]] = null : o(e, n[2]) && (u[n[1]] = null), u;if (h !== d && s) {
          if (s >= d) return r;for (var f = 0; f < n[we]; f++) {
            var p = n[f];if (!a(r, p) && a(t, p)) {
              r[p] = t[p];break;
            }
          }return r;
        }return u;
      }function a(t, e) {
        return t.hasOwnProperty(e);
      }function o(t, e) {
        return null != t[e] && "auto" !== t[e];
      }function s(t, e, n) {
        c(t, function (t) {
          e[t] = n[t];
        });
      }!n[Le](i) && (i = {});var l = i.ignoreSize;!n[Y](l) && (l = [l, l]);var u = r(f[0], 0),
          h = r(f[1], 1);s(f[0], t, u), s(f[1], t, h);
    }, h.getLayoutParams = function (t) {
      return h.copyLayoutParams({}, t);
    }, h.copyLayoutParams = function (t, e) {
      return e && t && c(d, function (n) {
        e.hasOwnProperty(n) && (t[n] = e[n]);
      }), t;
    }, h;
  }), e("echarts/coord/axisHelper", [Ze, "../scale/Ordinal", "../scale/Interval", "../scale/Time", "../scale/Log", "../scale/Scale", "../util/number", Fe, "zrender/contain/text"], function (t) {
    var e = t("../scale/Ordinal"),
        n = t("../scale/Interval");t("../scale/Time"), t("../scale/Log");var i = t("../scale/Scale"),
        r = t("../util/number"),
        o = t(Fe),
        l = t("zrender/contain/text"),
        u = {};return u.getScaleExtent = function (t, e) {
      var n,
          i,
          a,
          s = t.type,
          l = e.getMin(),
          u = e.getMax(),
          c = null != l,
          h = null != u,
          d = t[V]();return s === S ? n = (e.get("data") || [])[we] : (i = e.get("boundaryGap"), o[Y](i) || (i = [i || 0, i || 0]), "boolean" == typeof i[0] && (i = [0, 0]), i[0] = r[m](i[0], 1), i[1] = r[m](i[1], 1), a = d[1] - d[0] || Math.abs(d[0])), null == l && (l = s === S ? n ? 0 : 0 / 0 : d[0] - i[0] * a), null == u && (u = s === S ? n ? n - 1 : 0 / 0 : d[1] + i[1] * a), "dataMin" === l && (l = d[0]), "dataMax" === u && (u = d[1]), (null == l || !isFinite(l)) && (l = 0 / 0), (null == u || !isFinite(u)) && (u = 0 / 0), t.setBlank(o.eqNaN(l) || o.eqNaN(u)), e.getNeedCrossZero() && (l > 0 && u > 0 && !c && (l = 0), 0 > l && 0 > u && !h && (u = 0)), [l, u];
    }, u.niceScaleExtent = function (t, e) {
      var n = u.getScaleExtent(t, e),
          i = null != e.getMin(),
          r = null != e.getMax(),
          a = e.get("splitNumber");"log" === t.type && (t.base = e.get("logBase")), t.setExtent(n[0], n[1]), t.niceExtent({ splitNumber: a, fixMin: i, fixMax: r, minInterval: "interval" === t.type ? e.get("minInterval") : null });var o = e.get("interval");null != o && t.setInterval && t.setInterval(o);
    }, u.createScaleByModel = function (t, r) {
      if (r = r || t.get("type")) switch (r) {case x:
          return new e(t.getCategories(), [1 / 0, -1 / 0]);case "value":
          return new n();default:
          return (i.getClass(r) || n)[ye](t);}
    }, u.ifAxisCrossZero = function (t) {
      var e = t.scale[V](),
          n = e[0],
          i = e[1];return !(n > 0 && i > 0 || 0 > n && 0 > i);
    }, u.getAxisLabelInterval = function (t, e, n, i) {
      var r,
          o = 0,
          u = 0,
          c = 1;e[we] > 40 && (c = Math.floor(e[we] / 40));for (var h = 0; h < t[we]; h += c) {
        var d = t[h],
            f = l[a](e[h], n, s, "top");f[i ? "x" : "y"] += d, f[i ? "width" : De] *= 1.3, r ? r.intersect(f) ? (u++, o = Math.max(o, u)) : (r.union(f), u = 0) : r = f.clone();
      }return 0 === o && c > 1 ? c : (o + 1) * c - 1;
    }, u.getFormattedLabels = function (t, e) {
      var n = t.scale,
          i = n.getTicksLabels(),
          r = n.getTicks();return typeof e === Oe ? (e = function (t) {
        return function (e) {
          return t[$]("{value}", null != e ? e : "");
        };
      }(e), o.map(i, e)) : typeof e === j ? o.map(r, function (n, i) {
        return e(u.getAxisRawValue(t, n), i);
      }, this) : i;
    }, u.getAxisRawValue = function (t, e) {
      return t.type === x ? t.scale.getLabel(e) : e;
    }, u;
  }), e("echarts/coord/cartesian/Cartesian2D", [Ze, Fe, "./Cartesian"], function (t) {
    function e(t) {
      i.call(this, t);
    }var n = t(Fe),
        i = t("./Cartesian");return e[Re] = { constructor: e, type: "cartesian2d", dimensions: ["x", "y"], getBaseAxis: function () {
        return this.getAxesByScale(S)[0] || this.getAxesByScale("time")[0] || this[O]("x");
      }, containPoint: function (t) {
        var e = this[O]("x"),
            n = this[O]("y");return e[G](e.toLocalCoord(t[0])) && n[G](n.toLocalCoord(t[1]));
      }, containData: function (t) {
        return this[O]("x").containData(t[0]) && this[O]("y").containData(t[1]);
      }, dataToPoints: function (t, e) {
        return t.mapArray(["x", "y"], function (t, e) {
          return this.dataToPoint([t, e]);
        }, e, this);
      }, dataToPoint: function (t, e) {
        var n = this[O]("x"),
            i = this[O]("y");return [n[D](n[I](t[0], e)), i[D](i[I](t[1], e))];
      }, pointToData: function (t, e) {
        var n = this[O]("x"),
            i = this[O]("y");return [n.coordToData(n.toLocalCoord(t[0]), e), i.coordToData(i.toLocalCoord(t[1]), e)];
      }, getOtherAxis: function (t) {
        return this[O]("x" === t.dim ? "y" : "x");
      } }, n[W](e, i), e;
  }), e("echarts/coord/cartesian/Axis2D", [Ze, Fe, "../Axis"], function (t) {
    var e = t(Fe),
        n = t("../Axis"),
        i = function (t, e, i, r, a) {
      n.call(this, t, e, i), this.type = r || "value", this[A] = a || Me;
    };return i[Re] = { constructor: i, index: 0, onZero: !1, model: null, isHorizontal: function () {
        var t = this[A];return "top" === t || t === Me;
      }, getGlobalExtent: function (t) {
        var e = this[V]();return e[0] = this[D](e[0]), e[1] = this[D](e[1]), t && e[0] > e[1] && e.reverse(), e;
      }, getOtherAxis: function () {
        this.grid.getOtherAxis();
      }, isLabelIgnored: function (t) {
        if (this.type === x) {
          var e = this.getLabelInterval();return typeof e === j && !e(t, this.scale.getLabel(t)) || t % (e + 1);
        }
      }, pointToData: function (t, e) {
        return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e);
      }, toLocalCoord: null, toGlobalCoord: null }, e[W](i, n), i;
  }), e("echarts/coord/cartesian/GridModel", [Ze, "./AxisModel", "../../model/Component"], function (t) {
    t("./AxisModel");var e = t("../../model/Component");return e[he]({ type: "grid", dependencies: ["xAxis", "yAxis"], layoutMode: "box", coordinateSystem: null, defaultOption: { show: !1, zlevel: 0, z: 0, left: "10%", top: 60, right: "10%", bottom: 60, containLabel: !1, backgroundColor: "rgba(0,0,0,0)", borderWidth: 1, borderColor: "#ccc" } });
  }), e("echarts/model/globalDefault", [], function () {
    var t = "";return typeof navigator !== o && (t = navigator.platform || ""), { color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"], textStyle: { fontFamily: t.match(/^Win/) ? "Microsoft YaHei" : "sans-serif", fontSize: 12, fontStyle: "normal", fontWeight: "normal" }, blendMode: null, animation: "auto", animationDuration: 1e3, animationDurationUpdate: 300, animationEasing: "exponentialOut", animationEasingUpdate: "cubicOut", animationThreshold: 2e3, progressiveThreshold: 3e3, progressive: 400, hoverLayerThreshold: 3e3, useUTC: !1 };
  }), e("echarts/model/mixin/colorPalette", [Ze, "../../util/clazz"], function (t) {
    var e = t("../../util/clazz"),
        n = e.set,
        i = e.get;return { clearColorPalette: function () {
        n(this, "colorIdx", 0), n(this, "colorNameMap", {});
      }, getColorFromPalette: function (t, e) {
        e = e || this;var r = i(e, "colorIdx") || 0,
            a = i(e, "colorNameMap") || n(e, "colorNameMap", {});if (a.hasOwnProperty(t)) return a[t];var o = this.get("color", !0) || [];if (o[we]) {
          var s = o[r];return t && (a[t] = s), n(e, "colorIdx", (r + 1) % o[we]), s;
        }
      } };
  }), e("zrender/tool/path", [Ze, "../graphic/Path", "../core/PathProxy", "./transformPath"], function (t) {
    function e(t, e, n, i, r, a, o, s, l, f, v) {
      var g = l * (d / 180),
          y = h(g) * (t - n) / 2 + c(g) * (e - i) / 2,
          x = -1 * c(g) * (t - n) / 2 + h(g) * (e - i) / 2,
          _ = y * y / (o * o) + x * x / (s * s);_ > 1 && (o *= u(_), s *= u(_));var b = (r === a ? -1 : 1) * u((o * o * s * s - o * o * x * x - s * s * y * y) / (o * o * x * x + s * s * y * y)) || 0,
          w = b * o * x / s,
          M = b * -s * y / o,
          S = (t + n) / 2 + h(g) * w - c(g) * M,
          A = (e + i) / 2 + c(g) * w + h(g) * M,
          P = m([1, 0], [(y - w) / o, (x - M) / s]),
          T = [(y - w) / o, (x - M) / s],
          C = [(-1 * y - w) / o, (-1 * x - M) / s],
          k = m(T, C);p(T, C) <= -1 && (k = d), p(T, C) >= 1 && (k = 0), 0 === a && k > 0 && (k -= 2 * d), 1 === a && 0 > k && (k += 2 * d), v.addData(f, S, A, o, s, P, k, g, a);
    }function n(t) {
      if (!t) return [];var n,
          i = t[$](/-/g, " -")[$](/  /g, " ")[$](/ /g, ",")[$](/,,/g, ",");for (n = 0; n < l[we]; n++) i = i[$](new RegExp(l[n], "g"), "|" + l[n]);var r,
          a = i.split("|"),
          s = 0,
          u = 0,
          c = new o(),
          h = o.CMD;for (n = 1; n < a[we]; n++) {
        var d,
            f = a[n],
            p = f.charAt(0),
            m = 0,
            v = f.slice(1)[$](/e,-/g, "e-").split(",");v[we] > 0 && "" === v[0] && v.shift();for (var g = 0; g < v[we]; g++) v[g] = parseFloat(v[g]);for (; m < v[we] && !isNaN(v[m]) && !isNaN(v[0]);) {
          var y,
              x,
              _,
              b,
              w,
              M,
              S,
              A = s,
              P = u;switch (p) {case "l":
              s += v[m++], u += v[m++], d = h.L, c.addData(d, s, u);break;case "L":
              s = v[m++], u = v[m++], d = h.L, c.addData(d, s, u);break;case "m":
              s += v[m++], u += v[m++], d = h.M, c.addData(d, s, u), p = "l";break;case "M":
              s = v[m++], u = v[m++], d = h.M, c.addData(d, s, u), p = "L";break;case "h":
              s += v[m++], d = h.L, c.addData(d, s, u);break;case "H":
              s = v[m++], d = h.L, c.addData(d, s, u);break;case "v":
              u += v[m++], d = h.L, c.addData(d, s, u);break;case "V":
              u = v[m++], d = h.L, c.addData(d, s, u);break;case "C":
              d = h.C, c.addData(d, v[m++], v[m++], v[m++], v[m++], v[m++], v[m++]), s = v[m - 2], u = v[m - 1];break;case "c":
              d = h.C, c.addData(d, v[m++] + s, v[m++] + u, v[m++] + s, v[m++] + u, v[m++] + s, v[m++] + u), s += v[m - 2], u += v[m - 1];break;case "S":
              y = s, x = u;var T = c.len(),
                  C = c.data;r === h.C && (y += s - C[T - 4], x += u - C[T - 3]), d = h.C, A = v[m++], P = v[m++], s = v[m++], u = v[m++], c.addData(d, y, x, A, P, s, u);break;case "s":
              y = s, x = u;var T = c.len(),
                  C = c.data;r === h.C && (y += s - C[T - 4], x += u - C[T - 3]), d = h.C, A = s + v[m++], P = u + v[m++], s += v[m++], u += v[m++], c.addData(d, y, x, A, P, s, u);break;case "Q":
              A = v[m++], P = v[m++], s = v[m++], u = v[m++], d = h.Q, c.addData(d, A, P, s, u);break;case "q":
              A = v[m++] + s, P = v[m++] + u, s += v[m++], u += v[m++], d = h.Q, c.addData(d, A, P, s, u);break;case "T":
              y = s, x = u;var T = c.len(),
                  C = c.data;r === h.Q && (y += s - C[T - 4], x += u - C[T - 3]), s = v[m++], u = v[m++], d = h.Q, c.addData(d, y, x, s, u);break;case "t":
              y = s, x = u;var T = c.len(),
                  C = c.data;r === h.Q && (y += s - C[T - 4], x += u - C[T - 3]), s += v[m++], u += v[m++], d = h.Q, c.addData(d, y, x, s, u);break;case "A":
              _ = v[m++], b = v[m++], w = v[m++], M = v[m++], S = v[m++], A = s, P = u, s = v[m++], u = v[m++], d = h.A, e(A, P, s, u, M, S, _, b, w, d, c);break;case "a":
              _ = v[m++], b = v[m++], w = v[m++], M = v[m++], S = v[m++], A = s, P = u, s += v[m++], u += v[m++], d = h.A, e(A, P, s, u, M, S, _, b, w, d, c);}
        }("z" === p || "Z" === p) && (d = h.Z, c.addData(d)), r = d;
      }return c.toStatic(), c;
    }function i(t, e) {
      var i = n(t);return e = e || {}, e.buildPath = function (t) {
        if (t.setData) {
          t.setData(i.data);var e = t[N]();e && t.rebuildPath(e);
        } else {
          var e = t;i.rebuildPath(e);
        }
      }, e[r] = function (t) {
        s(i, t), this.dirty(!0);
      }, e;
    }var a = t("../graphic/Path"),
        o = t("../core/PathProxy"),
        s = t("./transformPath"),
        l = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"],
        u = Math.sqrt,
        c = Math.sin,
        h = Math.cos,
        d = Math.PI,
        f = function (t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    },
        p = function (t, e) {
      return (t[0] * e[0] + t[1] * e[1]) / (f(t) * f(e));
    },
        m = function (t, e) {
      return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(p(t, e));
    };return { createFromString: function (t, e) {
        return new a(i(t, e));
      }, extendFromString: function (t, e) {
        return a[he](i(t, e));
      }, mergePath: function (t, e) {
        for (var n = [], i = t[we], r = 0; i > r; r++) {
          var o = t[r];o.path || o.createPathProxy(), o.__dirtyPath && o.buildPath(o.path, o.shape, !0), n.push(o.path);
        }var s = new a(e);return s.createPathProxy(), s.buildPath = function (t) {
          t.appendPath(n);var e = t[N]();e && t.rebuildPath(e);
        }, s;
      } };
  }), e("zrender/mixin/Transformable", [Ze, "../core/matrix", "../core/vector"], function (t) {
    function e(t) {
      return t > o || -o > t;
    }var n = t("../core/matrix"),
        i = t("../core/vector"),
        a = n.identity,
        o = 5e-5,
        s = function (t) {
      t = t || {}, t[A] || (this[A] = [0, 0]), null == t[u] && (this[u] = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null;
    },
        l = s[Re];l.transform = null, l.needLocalTransform = function () {
      return e(this[u]) || e(this[A][0]) || e(this[A][1]) || e(this.scale[0] - 1) || e(this.scale[1] - 1);
    }, l.updateTransform = function () {
      var t = this[Q],
          e = t && t.transform,
          i = this.needLocalTransform(),
          r = this.transform;return i || e ? (r = r || n[ye](), i ? this.getLocalTransform(r) : a(r), e && (i ? n.mul(r, t.transform, r) : n.copy(r, t.transform)), this.transform = r, this.invTransform = this.invTransform || n[ye](), void n.invert(this.invTransform, r)) : void (r && a(r));
    }, l.getLocalTransform = function (t) {
      return s.getLocalTransform(this, t);
    }, l.setTransform = function (t) {
      var e = this.transform,
          n = t.dpr || 1;e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0);
    }, l.restoreTransform = function (t) {
      var e = t.dpr || 1;t.setTransform(e, 0, 0, e, 0, 0);
    };var c = [];return l.decomposeTransform = function () {
      if (this.transform) {
        var t = this[Q],
            i = this.transform;t && t.transform && (n.mul(c, t.invTransform, i), i = c);var r = i[0] * i[0] + i[1] * i[1],
            a = i[2] * i[2] + i[3] * i[3],
            o = this[A],
            s = this.scale;e(r - 1) && (r = Math.sqrt(r)), e(a - 1) && (a = Math.sqrt(a)), i[0] < 0 && (r = -r), i[3] < 0 && (a = -a), o[0] = i[4], o[1] = i[5], s[0] = r, s[1] = a, this[u] = Math.atan2(-i[1] / a, i[0] / r);
      }
    }, l.getGlobalScale = function () {
      var t = this.transform;if (!t) return [1, 1];var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]),
          n = Math.sqrt(t[2] * t[2] + t[3] * t[3]);return t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), [e, n];
    }, l.transformCoordToLocal = function (t, e) {
      var n = [t, e],
          a = this.invTransform;return a && i[r](n, n, a), n;
    }, l.transformCoordToGlobal = function (t, e) {
      var n = [t, e],
          a = this.transform;return a && i[r](n, n, a), n;
    }, s.getLocalTransform = function (t, e) {
      e = e || [], a(e);var i = t.origin,
          r = t.scale || [1, 1],
          o = t[u] || 0,
          s = t[A] || [0, 0];return i && (e[4] -= i[0], e[5] -= i[1]), n.scale(e, e, r), o && n.rotate(e, e, o), i && (e[4] += i[0], e[5] += i[1]), e[4] += s[0], e[5] += s[1], e;
    }, s;
  }), e("zrender/graphic/Path", [Ze, "./Displayable", "../core/util", "../core/PathProxy", "../contain/path", "./Pattern"], function (t) {
    function e(t) {
      r.call(this, t), this.path = null;
    }var r = t("./Displayable"),
        o = t("../core/util"),
        s = t("../core/PathProxy"),
        l = t("../contain/path"),
        u = t("./Pattern"),
        c = u[Re].getCanvasPattern,
        h = Math.abs,
        d = new s(!0);return e[Re] = { constructor: e, type: "path", __dirtyPath: !0, strokeContainThreshold: 5, brush: function (t, e) {
        var i = this.style,
            r = this.path || d,
            o = i.hasStroke(),
            s = i.hasFill(),
            l = i.fill,
            u = i.stroke,
            h = s && !!l[ve],
            f = o && !!u[ve],
            p = s && !!l.image,
            m = o && !!u.image;if (i.bind(t, this, e), this.setTransform(t), this[n]) {
          var v;h && (v = v || this[a](), this._fillGradient = i.getGradient(t, l, v)), f && (v = v || this[a](), this._strokeGradient = i.getGradient(t, u, v));
        }h ? t.fillStyle = this._fillGradient : p && (t.fillStyle = c.call(l, t)), f ? t.strokeStyle = this._strokeGradient : m && (t.strokeStyle = c.call(u, t));var g = i.lineDash,
            y = i.lineDashOffset,
            x = !!t.setLineDash,
            _ = this.getGlobalScale();r.setScale(_[0], _[1]), this.__dirtyPath || g && !x && o ? (r.beginPath(t), g && !x && (r.setLineDash(g), r.setLineDashOffset(y)), this.buildPath(r, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), s && r.fill(t), g && x && (t.setLineDash(g), t.lineDashOffset = y), o && r.stroke(t), g && x && t.setLineDash([]), this.restoreTransform(t), null != i.text && this.drawRectText(t, this[a]());
      }, buildPath: function () {}, createPathProxy: function () {
        this.path = new s();
      }, getBoundingRect: function () {
        var t = this._rect,
            e = this.style,
            r = !t;if (r) {
          var o = this.path;o || (o = this.path = new s()), this.__dirtyPath && (o.beginPath(), this.buildPath(o, this.shape, !1)), t = o[a]();
        }if (this._rect = t, e.hasStroke()) {
          var l = this._rectWithStroke || (this._rectWithStroke = t.clone());if (this[n] || r) {
            l.copy(t);var u = e[i],
                c = e.strokeNoScale ? this.getLineScale() : 1;e.hasFill() || (u = Math.max(u, this.strokeContainThreshold || 4)), c > 1e-10 && (l.width += u / c, l[De] += u / c, l.x -= u / c / 2, l.y -= u / c / 2);
          }return l;
        }return t;
      }, contain: function (t, e) {
        var n = this.transformCoordToLocal(t, e),
            r = this[a](),
            o = this.style;if (t = n[0], e = n[1], r[G](t, e)) {
          var s = this.path.data;if (o.hasStroke()) {
            var u = o[i],
                c = o.strokeNoScale ? this.getLineScale() : 1;if (c > 1e-10 && (o.hasFill() || (u = Math.max(u, this.strokeContainThreshold)), l.containStroke(s, u / c, t, e))) return !0;
          }if (o.hasFill()) return l[G](s, t, e);
        }return !1;
      }, dirty: function (t) {
        null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this[n] = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty();
      }, animateShape: function (t) {
        return this.animate("shape", t);
      }, attrKV: function (t, e) {
        "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : r[Re].attrKV.call(this, t, e);
      }, setShape: function (t, e) {
        var n = this.shape;if (n) {
          if (o[Le](t)) for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);else n[t] = e;this.dirty(!0);
        }return this;
      }, getLineScale: function () {
        var t = this.transform;return t && h(t[0] - 1) > 1e-10 && h(t[3] - 1) > 1e-10 ? Math.sqrt(h(t[0] * t[3] - t[2] * t[1])) : 1;
      } }, e[he] = function (t) {
      var n = function (n) {
        e.call(this, n), t.style && this.style.extendFrom(t.style, !1);var i = t.shape;if (i) {
          this.shape = this.shape || {};var r = this.shape;for (var a in i) !r.hasOwnProperty(a) && i.hasOwnProperty(a) && (r[a] = i[a]);
        }t.init && t.init.call(this, n);
      };o[W](n, e);for (var i in t) "style" !== i && "shape" !== i && (n[Re][i] = t[i]);return n;
    }, o[W](e, r), e;
  }), e("zrender/core/BoundingRect", [Ze, "./vector", "./matrix"], function (t) {
    function e(t, e, n, i) {
      0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = n, this[De] = i;
    }var n = t("./vector"),
        i = t("./matrix"),
        a = n[r],
        o = Math.min,
        s = Math.max;return e[Re] = { constructor: e, union: function (t) {
        var e = o(t.x, this.x),
            n = o(t.y, this.y);this.width = s(t.x + t.width, this.x + this.width) - e, this[De] = s(t.y + t[De], this.y + this[De]) - n, this.x = e, this.y = n;
      }, applyTransform: function () {
        var t = [],
            e = [],
            n = [],
            i = [];return function (r) {
          if (r) {
            t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this[De], a(t, t, r), a(e, e, r), a(n, n, r), a(i, i, r), this.x = o(t[0], e[0], n[0], i[0]), this.y = o(t[1], e[1], n[1], i[1]);var l = s(t[0], e[0], n[0], i[0]),
                u = s(t[1], e[1], n[1], i[1]);this.width = l - this.x, this[De] = u - this.y;
          }
        };
      }(), calculateTransform: function (t) {
        var e = this,
            n = t.width / e.width,
            r = t[De] / e[De],
            a = i[ye]();return i.translate(a, a, [-e.x, -e.y]), i.scale(a, a, [n, r]), i.translate(a, a, [t.x, t.y]), a;
      }, intersect: function (t) {
        if (!t) return !1;t instanceof e || (t = e[ye](t));var n = this,
            i = n.x,
            r = n.x + n.width,
            a = n.y,
            o = n.y + n[De],
            s = t.x,
            l = t.x + t.width,
            u = t.y,
            c = t.y + t[De];return !(s > r || i > l || u > o || a > c);
      }, contain: function (t, e) {
        var n = this;return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n[De];
      }, clone: function () {
        return new e(this.x, this.y, this.width, this[De]);
      }, copy: function (t) {
        this.x = t.x, this.y = t.y, this.width = t.width, this[De] = t[De];
      }, plain: function () {
        return { x: this.x, y: this.y, width: this.width, height: this[De] };
      } }, e[ye] = function (t) {
      return new e(t.x, t.y, t.width, t[De]);
    }, e;
  }), e("zrender/container/Group", [Ze, "../core/util", "../Element", "../core/BoundingRect"], function (t) {
    var e = t("../core/util"),
        i = t("../Element"),
        o = t("../core/BoundingRect"),
        s = function (t) {
      t = t || {}, i.call(this, t);for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);this._children = [], this.__storage = null, this[n] = !0;
    };return s[Re] = { constructor: s, isGroup: !0, type: "group", silent: !1, children: function () {
        return this._children.slice();
      }, childAt: function (t) {
        return this._children[t];
      }, childOfName: function (t) {
        for (var e = this._children, n = 0; n < e[we]; n++) if (e[n].name === t) return e[n];
      }, childCount: function () {
        return this._children[we];
      }, add: function (t) {
        return t && t !== this && t[Q] !== this && (this._children.push(t), this._doAdd(t)), this;
      }, addBefore: function (t, e) {
        if (t && t !== this && t[Q] !== this && e && e[Q] === this) {
          var n = this._children,
              i = n[be](e);i >= 0 && (n[ae](i, 0, t), this._doAdd(t));
        }return this;
      }, _doAdd: function (t) {
        t[Q] && t[Q][de](t), t[Q] = this;var e = this.__storage,
            n = this.__zr;e && e !== t.__storage && (e.addToStorage(t), t instanceof s && t.addChildrenToStorage(e)), n && n.refresh();
      }, remove: function (t) {
        var n = this.__zr,
            i = this.__storage,
            r = this._children,
            a = e[be](r, t);return 0 > a ? this : (r[ae](a, 1), t[Q] = null, i && (i.delFromStorage(t), t instanceof s && t.delChildrenFromStorage(i)), n && n.refresh(), this);
      }, removeAll: function () {
        var t,
            e,
            n = this._children,
            i = this.__storage;for (e = 0; e < n[we]; e++) t = n[e], i && (i.delFromStorage(t), t instanceof s && t.delChildrenFromStorage(i)), t[Q] = null;return n[we] = 0, this;
      }, eachChild: function (t, e) {
        for (var n = this._children, i = 0; i < n[we]; i++) {
          var r = n[i];t.call(e, r, i);
        }return this;
      }, traverse: function (t, e) {
        for (var n = 0; n < this._children[we]; n++) {
          var i = this._children[n];t.call(e, i), "group" === i.type && i[te](t, e);
        }return this;
      }, addChildrenToStorage: function (t) {
        for (var e = 0; e < this._children[we]; e++) {
          var n = this._children[e];t.addToStorage(n), n instanceof s && n.addChildrenToStorage(t);
        }
      }, delChildrenFromStorage: function (t) {
        for (var e = 0; e < this._children[we]; e++) {
          var n = this._children[e];t.delFromStorage(n), n instanceof s && n.delChildrenFromStorage(t);
        }
      }, dirty: function () {
        return this[n] = !0, this.__zr && this.__zr.refresh(), this;
      }, getBoundingRect: function (t) {
        for (var e = null, n = new o(0, 0, 0, 0), i = t || this._children, s = [], l = 0; l < i[we]; l++) {
          var u = i[l];if (!u[Se] && !u.invisible) {
            var c = u[a](),
                h = u.getLocalTransform(s);h ? (n.copy(c), n[r](h), e = e || n.clone(), e.union(n)) : (e = e || c.clone(), e.union(c));
          }
        }return e || n;
      } }, e[W](s, i), s;
  }), e("zrender/graphic/Image", [Ze, "./Displayable", "../core/BoundingRect", "../core/util", "../core/LRU"], function (t) {
    function e(t) {
      n.call(this, t);
    }var n = t("./Displayable"),
        i = t("../core/BoundingRect"),
        r = t("../core/util"),
        o = t("../core/LRU"),
        s = new o(50);return e[Re] = { constructor: e, type: "image", brush: function (t, e) {
        var n,
            i = this.style,
            r = i.image;if (i.bind(t, this, e), n = typeof r === Oe ? this._image : r, !n && r) {
          var o = s.get(r);if (!o) return n = new Image(), n.onload = function () {
            n.onload = null;for (var t = 0; t < o.pending[we]; t++) o.pending[t].dirty();
          }, o = { image: n, pending: [this] }, n.src = r, s.put(r, o), void (this._image = n);if (n = o.image, this._image = n, !n.width || !n[De]) return void o.pending.push(this);
        }if (n) {
          var l = i.x || 0,
              u = i.y || 0;if (!n.width || !n[De]) return;var c = i.width,
              h = i[De],
              d = n.width / n[De];if (null == c && null != h ? c = h * d : null == h && null != c ? h = c / d : null == c && null == h && (c = n.width, h = n[De]), this.setTransform(t), i.sWidth && i.sHeight) {
            var f = i.sx || 0,
                p = i.sy || 0;t.drawImage(n, f, p, i.sWidth, i.sHeight, l, u, c, h);
          } else if (i.sx && i.sy) {
            var f = i.sx,
                p = i.sy,
                m = c - f,
                v = h - p;t.drawImage(n, f, p, m, v, l, u, c, h);
          } else t.drawImage(n, l, u, c, h);this.restoreTransform(t), null != i.text && this.drawRectText(t, this[a]());
        }
      }, getBoundingRect: function () {
        var t = this.style;return this._rect || (this._rect = new i(t.x || 0, t.y || 0, t.width || 0, t[De] || 0)), this._rect;
      } }, r[W](e, n), e;
  }), e("zrender/graphic/Text", [Ze, "./Displayable", "../core/util", "../contain/text"], function (t) {
    var e = t("./Displayable"),
        n = t("../core/util"),
        r = t("../contain/text"),
        o = function (t) {
      e.call(this, t);
    };return o[Re] = { constructor: o, type: "text", brush: function (t, e) {
        var n = this.style,
            i = n.x || 0,
            o = n.y || 0,
            s = n.text;if (null != s && (s += ""), n.bind(t, this, e), s) {
          this.setTransform(t);var l,
              u = n[c],
              h = n.textFont || n.font;if (n.textVerticalAlign) {
            var d = r[a](s, h, n[c], "top");switch (l = z, n.textVerticalAlign) {case z:
                o -= d[De] / 2 - d.lineHeight / 2;break;case Me:
                o -= d[De] - d.lineHeight / 2;break;default:
                o += d.lineHeight / 2;}
          } else l = n.textBaseline;t.font = h || "12px sans-serif", t[c] = u || "left", t[c] !== u && (t[c] = "left"), t.textBaseline = l || "alphabetic", t.textBaseline !== l && (t.textBaseline = "alphabetic");for (var f = r.measureText("国", t.font).width, p = s.split("\n"), m = 0; m < p[we]; m++) n.hasStroke() && t.strokeText(p[m], i, o), n.hasFill() && t.fillText(p[m], i, o), o += f;this.restoreTransform(t);
        }
      }, getBoundingRect: function () {
        var t = this.style;if (!this._rect) {
          var e = t.textVerticalAlign,
              n = r[a](t.text + "", t.textFont || t.font, t[c], e ? "top" : t.textBaseline);switch (e) {case z:
              n.y -= n[De] / 2;break;case Me:
              n.y -= n[De];}if (n.x += t.x || 0, n.y += t.y || 0, t.hasStroke()) {
            var o = t[i];n.x -= o / 2, n.y -= o / 2, n.width += o, n[De] += o;
          }this._rect = n;
        }return this._rect;
      } }, n[W](o, e), o;
  }), e("zrender/graphic/shape/Circle", [Ze, "../Path"], function (t) {
    return t("../Path")[he]({ type: "circle", shape: { cx: 0, cy: 0, r: 0 }, buildPath: function (t, e, n) {
        n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
      } });
  }), e("zrender/graphic/shape/Sector", [Ze, "../../core/env", "../Path"], function (t) {
    var e = t("../../core/env"),
        n = t("../Path"),
        i = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]];return n[he]({ type: "sector", shape: { cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 }, brush: e.browser.ie && e.browser.version >= 11 ? function () {
        var t,
            e = this.__clipPaths,
            r = this.style;if (e) for (var a = 0; a < e[we]; a++) {
          var o = e[a] && e[a].shape;if (o && o.startAngle === o.endAngle) {
            for (var s = 0; s < i[we]; s++) i[s][2] = r[i[s][0]], r[i[s][0]] = i[s][1];t = !0;break;
          }
        }if (n[Re].brush.apply(this, arguments), t) for (var s = 0; s < i[we]; s++) r[i[s][0]] = i[s][2];
      } : n[Re].brush, buildPath: function (t, e) {
        var n = e.cx,
            i = e.cy,
            r = Math.max(e.r0 || 0, 0),
            a = Math.max(e.r, 0),
            o = e.startAngle,
            s = e.endAngle,
            l = e.clockwise,
            u = Math.cos(o),
            c = Math.sin(o);t.moveTo(u * r + n, c * r + i), t.lineTo(u * a + n, c * a + i), t.arc(n, i, a, o, s, !l), t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), t.closePath();
      } });
  }), e("zrender/graphic/shape/Ring", [Ze, "../Path"], function (t) {
    return t("../Path")[he]({ type: "ring", shape: { cx: 0, cy: 0, r: 0, r0: 0 }, buildPath: function (t, e) {
        var n = e.cx,
            i = e.cy,
            r = 2 * Math.PI;t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0);
      } });
  }), e("zrender/graphic/shape/Polygon", [Ze, "../helper/poly", "../Path"], function (t) {
    var e = t("../helper/poly");return t("../Path")[he]({ type: "polygon", shape: { points: null, smooth: !1, smoothConstraint: null }, buildPath: function (t, n) {
        e.buildPath(t, n, !0);
      } });
  }), e("zrender/graphic/shape/Polyline", [Ze, "../helper/poly", "../Path"], function (t) {
    var e = t("../helper/poly");return t("../Path")[he]({ type: "polyline", shape: { points: null, smooth: !1, smoothConstraint: null }, style: { stroke: "#000", fill: null }, buildPath: function (t, n) {
        e.buildPath(t, n, !1);
      } });
  }), e("zrender/graphic/shape/Rect", [Ze, "../helper/roundRect", "../Path"], function (t) {
    var e = t("../helper/roundRect");return t("../Path")[he]({ type: "rect", shape: { r: 0, x: 0, y: 0, width: 0, height: 0 }, buildPath: function (t, n) {
        var i = n.x,
            r = n.y,
            a = n.width,
            o = n[De];n.r ? e.buildPath(t, n) : t.rect(i, r, a, o), t.closePath();
      } });
  }), e("zrender/graphic/shape/Line", [Ze, "../Path"], function (t) {
    return t("../Path")[he]({ type: "line", shape: { x1: 0, y1: 0, x2: 0, y2: 0, percent: 1 }, style: { stroke: "#000", fill: null }, buildPath: function (t, e) {
        var n = e.x1,
            i = e.y1,
            r = e.x2,
            a = e.y2,
            o = e.percent;0 !== o && (t.moveTo(n, i), 1 > o && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), t.lineTo(r, a));
      }, pointAt: function (t) {
        var e = this.shape;return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t];
      } });
  }), e("zrender/graphic/shape/BezierCurve", [Ze, "../../core/curve", "../../core/vector", "../Path"], function (t) {
    function e(t, e, n) {
      var i = t.cpx2,
          r = t.cpy2;return null === i || null === r ? [(n ? u : s)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? u : s)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(n ? l : o)(t.x1, t.cpx1, t.x2, e), (n ? l : o)(t.y1, t.cpy1, t.y2, e)];
    }var n = t("../../core/curve"),
        i = t("../../core/vector"),
        r = n.quadraticSubdivide,
        a = n.cubicSubdivide,
        o = n.quadraticAt,
        s = n.cubicAt,
        l = n.quadraticDerivativeAt,
        u = n.cubicDerivativeAt,
        c = [];return t("../Path")[he]({ type: "bezier-curve", shape: { x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1 }, style: { stroke: "#000", fill: null }, buildPath: function (t, e) {
        var n = e.x1,
            i = e.y1,
            o = e.x2,
            s = e.y2,
            l = e.cpx1,
            u = e.cpy1,
            h = e.cpx2,
            d = e.cpy2,
            f = e.percent;0 !== f && (t.moveTo(n, i), null == h || null == d ? (1 > f && (r(n, l, o, f, c), l = c[1], o = c[2], r(i, u, s, f, c), u = c[1], s = c[2]), t.quadraticCurveTo(l, u, o, s)) : (1 > f && (a(n, l, h, o, f, c), l = c[1], h = c[2], o = c[3], a(i, u, d, s, f, c), u = c[1], d = c[2], s = c[3]), t.bezierCurveTo(l, u, h, d, o, s)));
      }, pointAt: function (t) {
        return e(this.shape, t, !1);
      }, tangentAt: function (t) {
        var n = e(this.shape, t, !0);return i[Z](n, n);
      } });
  }), e("zrender/graphic/shape/Arc", [Ze, "../Path"], function (t) {
    return t("../Path")[he]({ type: "arc", shape: { cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 }, style: { stroke: "#000", fill: null }, buildPath: function (t, e) {
        var n = e.cx,
            i = e.cy,
            r = Math.max(e.r, 0),
            a = e.startAngle,
            o = e.endAngle,
            s = e.clockwise,
            l = Math.cos(a),
            u = Math.sin(a);t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, a, o, !s);
      } });
  }), e("zrender/graphic/CompoundPath", [Ze, "./Path"], function (t) {
    var e = t("./Path");return e[he]({ type: "compound", shape: { paths: null }, _updatePathDirty: function () {
        for (var t = this.__dirtyPath, e = this.shape.paths, i = 0; i < e[we]; i++) t = t || e[i].__dirtyPath;this.__dirtyPath = t, this[n] = this[n] || t;
      }, beforeBrush: function () {
        this._updatePathDirty();for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t[we]; n++) t[n].path || t[n].createPathProxy(), t[n].path.setScale(e[0], e[1]);
      }, buildPath: function (t, e) {
        for (var n = e.paths || [], i = 0; i < n[we]; i++) n[i].buildPath(t, n[i].shape, !0);
      }, afterBrush: function () {
        for (var t = this.shape.paths, e = 0; e < t[we]; e++) t[e].__dirtyPath = !1;
      }, getBoundingRect: function () {
        return this._updatePathDirty(), e[Re][a].call(this);
      } });
  }), e("zrender/graphic/LinearGradient", [Ze, "../core/util", "./Gradient"], function (t) {
    var e = t("../core/util"),
        n = t("./Gradient"),
        i = function (t, e, i, r, a, o) {
      this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == i ? 1 : i, this.y2 = null == r ? 0 : r, this.type = "linear", this.global = o || !1, n.call(this, a);
    };return i[Re] = { constructor: i }, e[W](i, n), i;
  }), e("zrender/graphic/RadialGradient", [Ze, "../core/util", "./Gradient"], function (t) {
    var e = t("../core/util"),
        n = t("./Gradient"),
        i = function (t, e, i, r, a) {
      this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == i ? .5 : i, this.type = "radial", this.global = a || !1, n.call(this, r);
    };return i[Re] = { constructor: i }, e[W](i, n), i;
  }), e("zrender/contain/text", [Ze, "../core/util", "../core/BoundingRect"], function (t) {
    function e(t, e) {
      var n = t + ":" + e;if (o[n]) return o[n];for (var i = (t + "").split("\n"), r = 0, a = 0, s = i[we]; s > a; a++) r = Math.max(f.measureText(i[a], e).width, r);return l > u && (l = 0, o = {}), l++, o[n] = r, r;
    }function n(t, n, i, r) {
      var a = ((t || "") + "").split("\n")[we],
          o = e(t, n),
          l = e("国", n),
          u = a * l,
          c = new h(0, 0, o, u);switch (c.lineHeight = l, r) {case Me:case "alphabetic":
          c.y -= l;break;case z:
          c.y -= l / 2;}switch (i) {case "end":case "right":
          c.x -= c.width;break;case s:
          c.x -= c.width / 2;}return c;
    }function i(t, e, n, i) {
      var r = e.x,
          a = e.y,
          o = e[De],
          l = e.width,
          u = n[De],
          c = n.lineHeight,
          h = o / 2 - u / 2 + c,
          d = "left";switch (t) {case "left":
          r -= i, a += h, d = "right";break;case "right":
          r += i + l, a += h, d = "left";break;case "top":
          r += l / 2, a -= i + u - c, d = s;break;case Me:
          r += l / 2, a += o + i + c, d = s;break;case "inside":
          r += l / 2, a += h, d = s;break;case "insideLeft":
          r += i, a += h, d = "left";break;case "insideRight":
          r += l - i, a += h, d = "right";break;case "insideTop":
          r += l / 2, a += i + c, d = s;break;case "insideBottom":
          r += l / 2, a += o - u - i + c, d = s;break;case "insideTopLeft":
          r += i, a += i + c, d = "left";break;case "insideTopRight":
          r += l - i, a += i + c, d = "right";break;case "insideBottomLeft":
          r += i, a += o - u - i + c;break;case "insideBottomRight":
          r += l - i, a += o - u - i + c, d = "right";}return { x: r, y: a, textAlign: d, textBaseline: "alphabetic" };
    }function r(t, n, i, r, o) {
      if (!n) return "";o = o || {}, r = d(r, "...");for (var s = d(o.maxIterations, 2), l = d(o.minChar, 0), u = e("国", i), c = e("a", i), h = d(o.placeholder, ""), f = n = Math.max(0, n - 1), p = 0; l > p && f >= c; p++) f -= c;var m = e(r);m > f && (r = "", m = 0), f = n - m;for (var v = (t + "").split("\n"), p = 0, g = v[we]; g > p; p++) {
        var y = v[p],
            x = e(y, i);if (!(n >= x)) {
          for (var _ = 0;; _++) {
            if (f >= x || _ >= s) {
              y += r;break;
            }var b = 0 === _ ? a(y, f, c, u) : x > 0 ? Math.floor(y[we] * f / x) : 0;y = y.substr(0, b), x = e(y, i);
          }"" === y && (y = h), v[p] = y;
        }
      }return v.join("\n");
    }function a(t, e, n, i) {
      for (var r = 0, a = 0, o = t[we]; o > a && e > r; a++) {
        var s = t.charCodeAt(a);r += s >= 0 && 127 >= s ? n : i;
      }return a;
    }var o = {},
        l = 0,
        u = 5e3,
        c = t("../core/util"),
        h = t("../core/BoundingRect"),
        d = c[y],
        f = { getWidth: e, getBoundingRect: n, adjustTextPositionOnRect: i, truncateText: r, measureText: function (t, e) {
        var n = c[N]();return n.font = e || "12px sans-serif", n.measureText(t);
      } };return f;
  }), e("echarts/util/clazz", [Ze, Fe], function (t) {
    function e(t) {
      r.assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');
    }function n(t, e) {
      var n = r.slice(arguments, 2);return this.superClass[Re][e].apply(t, n);
    }function i(t, e, n) {
      return this.superClass[Re][e].apply(t, n);
    }var r = t(Fe),
        a = {},
        o = ".",
        s = "___EC__COMPONENT__CONTAINER___",
        l = "\x00ec_\x00";a.set = function (t, e, n) {
      return t[l + e] = n;
    }, a.get = function (t, e) {
      return t[l + e];
    }, a.hasOwn = function (t, e) {
      return t.hasOwnProperty(l + e);
    };var u = a.parseClassType = function (t) {
      var e = { main: "", sub: "" };return t && (t = t.split(o), e.main = t[0] || "", e.sub = t[1] || ""), e;
    };return a.enableClassExtend = function (t, e) {
      t.$constructor = t, t[he] = function (t) {
        var e = this,
            a = function () {
          t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments);
        };return r[he](a[Re], t), a[he] = this[he], a.superCall = n, a.superApply = i, r[W](a, this), a.superClass = e, a;
      };
    }, a.enableClassManagement = function (t, n) {
      function i(t) {
        var e = a[t.main];return e && e[s] || (e = a[t.main] = {}, e[s] = !0), e;
      }n = n || {};var a = {};if (t.registerClass = function (t, n) {
        if (n) if (e(n), n = u(n), n.sub) {
          if (n.sub !== s) {
            var r = i(n);r[n.sub] = t;
          }
        } else a[n.main] = t;return t;
      }, t.getClass = function (t, e, n) {
        var i = a[t];if (i && i[s] && (i = e ? i[e] : null), n && !i) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");return i;
      }, t.getClassesByMainType = function (t) {
        t = u(t);var e = [],
            n = a[t.main];return n && n[s] ? r.each(n, function (t, n) {
          n !== s && e.push(t);
        }) : e.push(n), e;
      }, t.hasClass = function (t) {
        return t = u(t), !!a[t.main];
      }, t.getAllClassMainTypes = function () {
        var t = [];return r.each(a, function (e, n) {
          t.push(n);
        }), t;
      }, t.hasSubTypes = function (t) {
        t = u(t);var e = a[t.main];return e && e[s];
      }, t.parseClassType = u, n.registerWhenExtend) {
        var o = t[he];o && (t[he] = function (e) {
          var n = o.call(this, e);return t.registerClass(n, e.type);
        });
      }return t;
    }, a.setReadOnly = function () {}, a;
  }), e("echarts/model/mixin/lineStyle", [Ze, "./makeStyleMapper"], function (t) {
    var e = t("./makeStyleMapper")([[i, "width"], ["stroke", "color"], [v], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]);return { getLineStyle: function (t) {
        var n = e.call(this, t),
            r = this.getLineDash(n[i]);return r && (n.lineDash = r), n;
      }, getLineDash: function (t) {
        null == t && (t = 1);var e = this.get("type"),
            n = Math.max(t, 2),
            i = 4 * t;return "solid" === e || null == e ? null : "dashed" === e ? [i, i] : [n, n];
      } };
  }), e("echarts/model/mixin/areaStyle", [Ze, "./makeStyleMapper"], function (t) {
    return { getAreaStyle: t("./makeStyleMapper")([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], [v], ["shadowColor"]]) };
  }), e("echarts/model/mixin/textStyle", [Ze, "zrender/contain/text", E], function (t) {
    var e = t("zrender/contain/text"),
        n = t(E);return { getTextColor: function () {
        var t = this[F];return this[b]("color") || t && t.get("textStyle.color");
      }, getFont: function () {
        return n[h]({ fontStyle: this[b]("fontStyle"), fontWeight: this[b]("fontWeight"), fontSize: this[b]("fontSize"), fontFamily: this[b]("fontFamily") }, this[F]);
      }, getTextRect: function (t) {
        return e[a](t, this[h](), this[b]("align"), this[b]("baseline"));
      }, truncateText: function (t, n, i, r) {
        return e.truncateText(t, n, this[h](), i, r);
      } };
  }), e("echarts/model/mixin/itemStyle", [Ze, "./makeStyleMapper"], function (t) {
    var e = t("./makeStyleMapper")([["fill", "color"], ["stroke", "borderColor"], [i, "borderWidth"], [v], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], [c]]);return { getItemStyle: function (t, n) {
        var i = e.call(this, t, n),
            r = this.getBorderLineDash();return r && (i.lineDash = r), i;
      }, getBorderLineDash: function () {
        var t = this.get("borderType");return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1];
      } };
  }), e("echarts/component/marker/MarkerModel", [Ze, R, Fe, "zrender/core/env", "../../util/format", g], function (t) {
    function e(t) {
      n.defaultEmphasis(t.label, n.LABEL_OPTIONS);
    }var n = t(R),
        i = t(Fe),
        r = t("zrender/core/env"),
        a = t("../../util/format"),
        o = a.addCommas,
        s = a.encodeHTML,
        l = t(g).extendComponentModel({ type: "marker", dependencies: [fe, "grid", "polar", "geo"], init: function (t, e, n, i) {
        this.mergeDefaultAndTheme(t, n), this.mergeOption(t, n, i.createdBySelf, !0);
      }, isAnimationEnabled: function () {
        if (r.node) return !1;var t = this.__hostSeries;return this[b](Ie) && t && t.isAnimationEnabled();
      }, mergeOption: function (t, n, r, a) {
        var o = this.constructor,
            s = this[le] + "Model";r || n[me](function (t) {
          var r = t.get(this[le]),
              l = t[s];return r && r.data ? (l ? l.mergeOption(r, n, !0) : (a && e(r), i.each(r.data, function (t) {
            t instanceof Array ? (e(t[0]), e(t[1])) : e(t);
          }), l = new o(r, this, n), i[he](l, { mainType: this[le], seriesIndex: t[ne], name: t.name, createdBySelf: !0 }), l.__hostSeries = t), void (t[s] = l)) : void (t[s] = null);
        }, this);
      }, formatTooltip: function (t) {
        var e = this[Ve](),
            n = this[M](t),
            r = i[Y](n) ? i.map(n, o).join(", ") : o(n),
            a = e[p](t),
            l = s(this.name);return (null != n || a) && (l += "<br />"), a && (l += s(a), null != n && (l += " : ")), null != n && (l += s(r)), l;
      }, getData: function () {
        return this._data;
      }, setData: function (t) {
        this._data = t;
      } });return i.mixin(l, n.dataFormatMixin), l;
  }), e("echarts/util/component", [Ze, Fe, "./clazz"], function (t) {
    var e = t(Fe),
        n = t("./clazz"),
        i = n.parseClassType,
        r = 0,
        a = {},
        o = "_";return a.getUID = function (t) {
      return [t || "", r++, Math.random()].join(o);
    }, a.enableSubTypeDefaulter = function (t) {
      var e = {};return t.registerSubTypeDefaulter = function (t, n) {
        t = i(t), e[t.main] = n;
      }, t.determineSubType = function (n, r) {
        var a = r.type;if (!a) {
          var o = i(n).main;t.hasSubTypes(n) && e[o] && (a = e[o](r));
        }return a;
      }, t;
    }, a.enableTopologicalTravel = function (t, n) {
      function i(t) {
        var i = {},
            o = [];return e.each(t, function (s) {
          var l = r(i, s),
              u = l.originalDeps = n(s),
              c = a(u, t);l.entryCount = c[we], 0 === l.entryCount && o.push(s), e.each(c, function (t) {
            e[be](l.predecessor, t) < 0 && l.predecessor.push(t);var n = r(i, t);e[be](n.successor, t) < 0 && n.successor.push(s);
          });
        }), { graph: i, noEntryList: o };
      }function r(t, e) {
        return t[e] || (t[e] = { predecessor: [], successor: [] }), t[e];
      }function a(t, n) {
        var i = [];return e.each(t, function (t) {
          e[be](n, t) >= 0 && i.push(t);
        }), i;
      }t.topologicalTravel = function (t, n, r, a) {
        function o(t) {
          u[t].entryCount--, 0 === u[t].entryCount && c.push(t);
        }function s(t) {
          h[t] = !0, o(t);
        }if (t[we]) {
          var l = i(n),
              u = l.graph,
              c = l.noEntryList,
              h = {};for (e.each(t, function (t) {
            h[t] = !0;
          }); c[we];) {
            var d = c.pop(),
                f = u[d],
                p = !!h[d];p && (r.call(a, d, f.originalDeps.slice()), delete h[d]), e.each(f.successor, p ? s : o);
          }e.each(h, function () {
            throw new Error("Circle dependency may exists");
          });
        }
      };
    }, a;
  }), e("echarts/model/mixin/boxLayout", [Ze], function () {
    return { getBoxLayoutParams: function () {
        return { left: this.get("left"), top: this.get("top"), right: this.get("right"), bottom: this.get(Me), width: this.get("width"), height: this.get(De) };
      } };
  }), e("zrender/core/PathProxy", [Ze, "./curve", "./vector", "./bbox", "./BoundingRect", "../config"], function (t) {
    var e = t("./curve"),
        n = t("./vector"),
        i = t("./bbox"),
        r = t("./BoundingRect"),
        a = t("../config").devicePixelRatio,
        s = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },
        l = [],
        u = [],
        c = [],
        h = [],
        d = Math.min,
        f = Math.max,
        p = Math.cos,
        m = Math.sin,
        v = Math.sqrt,
        g = Math.abs,
        y = typeof Float32Array != o,
        x = function (t) {
      this._saveData = !t, this._saveData && (this.data = []), this._ctx = null;
    };return x[Re] = { constructor: x, _xi: 0, _yi: 0, _x0: 0, _y0: 0, _ux: 0, _uy: 0, _len: 0, _lineDash: null, _dashOffset: 0, _dashIdx: 0, _dashSum: 0, setScale: function (t, e) {
        this._ux = g(1 / a / t) || 0, this._uy = g(1 / a / e) || 0;
      }, getContext: function () {
        return this._ctx;
      }, beginPath: function (t) {
        return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;
      }, moveTo: function (t, e) {
        return this.addData(s.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
      }, lineTo: function (t, e) {
        var n = g(t - this._xi) > this._ux || g(e - this._yi) > this._uy || this._len < 5;return this.addData(s.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), n && (this._xi = t, this._yi = e), this;
      }, bezierCurveTo: function (t, e, n, i, r, a) {
        return this.addData(s.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), this._xi = r, this._yi = a, this;
      }, quadraticCurveTo: function (t, e, n, i) {
        return this.addData(s.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), this._xi = n, this._yi = i, this;
      }, arc: function (t, e, n, i, r, a) {
        return this.addData(s.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), this._xi = p(r) * n + t, this._yi = m(r) * n + t, this;
      }, arcTo: function (t, e, n, i, r) {
        return this._ctx && this._ctx.arcTo(t, e, n, i, r), this;
      }, rect: function (t, e, n, i) {
        return this._ctx && this._ctx.rect(t, e, n, i), this.addData(s.R, t, e, n, i), this;
      }, closePath: function () {
        this.addData(s.Z);var t = this._ctx,
            e = this._x0,
            n = this._y0;return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, this._yi = n, this;
      }, fill: function (t) {
        t && t.fill(), this.toStatic();
      }, stroke: function (t) {
        t && t.stroke(), this.toStatic();
      }, setLineDash: function (t) {
        if (t instanceof Array) {
          this._lineDash = t, this._dashIdx = 0;for (var e = 0, n = 0; n < t[we]; n++) e += t[n];this._dashSum = e;
        }return this;
      }, setLineDashOffset: function (t) {
        return this._dashOffset = t, this;
      }, len: function () {
        return this._len;
      }, setData: function (t) {
        var e = t[we];
        this.data && this.data[we] == e || !y || (this.data = new Float32Array(e));for (var n = 0; e > n; n++) this.data[n] = t[n];this._len = e;
      }, appendPath: function (t) {
        t instanceof Array || (t = [t]);for (var e = t[we], n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();y && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));for (var r = 0; e > r; r++) for (var a = t[r].data, o = 0; o < a[we]; o++) this.data[i++] = a[o];this._len = i;
      }, addData: function (t) {
        if (this._saveData) {
          var e = this.data;this._len + arguments[we] > e[we] && (this._expandData(), e = this.data);for (var n = 0; n < arguments[we]; n++) e[this._len++] = arguments[n];this._prevCmd = t;
        }
      }, _expandData: function () {
        if (!(this.data instanceof Array)) {
          for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];this.data = t;
        }
      }, _needsDash: function () {
        return this._lineDash;
      }, _dashedLineTo: function (t, e) {
        var n,
            i,
            r = this._dashSum,
            a = this._dashOffset,
            o = this._lineDash,
            s = this._ctx,
            l = this._xi,
            u = this._yi,
            c = t - l,
            h = e - u,
            p = v(c * c + h * h),
            m = l,
            g = u,
            y = o[we];for (c /= p, h /= p, 0 > a && (a = r + a), a %= r, m -= a * c, g -= a * h; c > 0 && t >= m || 0 > c && m >= t || 0 == c && (h > 0 && e >= g || 0 > h && g >= e);) i = this._dashIdx, n = o[i], m += c * n, g += h * n, this._dashIdx = (i + 1) % y, c > 0 && l > m || 0 > c && m > l || h > 0 && u > g || 0 > h && g > u || s[i % 2 ? "moveTo" : "lineTo"](c >= 0 ? d(m, t) : f(m, t), h >= 0 ? d(g, e) : f(g, e));c = m - t, h = g - e, this._dashOffset = -v(c * c + h * h);
      }, _dashedBezierTo: function (t, n, i, r, a, o) {
        var s,
            l,
            u,
            c,
            h,
            d = this._dashSum,
            f = this._dashOffset,
            p = this._lineDash,
            m = this._ctx,
            g = this._xi,
            y = this._yi,
            x = e.cubicAt,
            _ = 0,
            b = this._dashIdx,
            w = p[we],
            M = 0;for (0 > f && (f = d + f), f %= d, s = 0; 1 > s; s += .1) l = x(g, t, i, a, s + .1) - x(g, t, i, a, s), u = x(y, n, r, o, s + .1) - x(y, n, r, o, s), _ += v(l * l + u * u);for (; w > b && (M += p[b], !(M > f)); b++);for (s = (M - f) / _; 1 >= s;) c = x(g, t, i, a, s), h = x(y, n, r, o, s), b % 2 ? m.moveTo(c, h) : m.lineTo(c, h), s += p[b] / _, b = (b + 1) % w;b % 2 !== 0 && m.lineTo(a, o), l = a - c, u = o - h, this._dashOffset = -v(l * l + u * u);
      }, _dashedQuadraticTo: function (t, e, n, i) {
        var r = n,
            a = i;n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, n, i, r, a);
      }, toStatic: function () {
        var t = this.data;t instanceof Array && (t[we] = this._len, y && (this.data = new Float32Array(t)));
      }, getBoundingRect: function () {
        l[0] = l[1] = c[0] = c[1] = Number.MAX_VALUE, u[0] = u[1] = h[0] = h[1] = -Number.MAX_VALUE;for (var t = this.data, e = 0, a = 0, o = 0, d = 0, f = 0; f < t[we];) {
          var v = t[f++];switch (1 == f && (e = t[f], a = t[f + 1], o = e, d = a), v) {case s.M:
              o = t[f++], d = t[f++], e = o, a = d, c[0] = o, c[1] = d, h[0] = o, h[1] = d;break;case s.L:
              i.fromLine(e, a, t[f], t[f + 1], c, h), e = t[f++], a = t[f++];break;case s.C:
              i.fromCubic(e, a, t[f++], t[f++], t[f++], t[f++], t[f], t[f + 1], c, h), e = t[f++], a = t[f++];break;case s.Q:
              i.fromQuadratic(e, a, t[f++], t[f++], t[f], t[f + 1], c, h), e = t[f++], a = t[f++];break;case s.A:
              var g = t[f++],
                  y = t[f++],
                  x = t[f++],
                  _ = t[f++],
                  b = t[f++],
                  w = t[f++] + b,
                  M = (t[f++], 1 - t[f++]);1 == f && (o = p(b) * x + g, d = m(b) * _ + y), i.fromArc(g, y, x, _, b, w, M, c, h), e = p(w) * x + g, a = m(w) * _ + y;break;case s.R:
              o = e = t[f++], d = a = t[f++];var S = t[f++],
                  A = t[f++];i.fromLine(o, d, o + S, d + A, c, h);break;case s.Z:
              e = o, a = d;}n.min(l, l, c), n.max(u, u, h);
        }return 0 === f && (l[0] = l[1] = u[0] = u[1] = 0), new r(l[0], l[1], u[0] - l[0], u[1] - l[1]);
      }, rebuildPath: function (t) {
        for (var e, n, i, r, a, o, l = this.data, u = this._ux, c = this._uy, h = this._len, d = 0; h > d;) {
          var f = l[d++];switch (1 == d && (i = l[d], r = l[d + 1], e = i, n = r), f) {case s.M:
              e = i = l[d++], n = r = l[d++], t.moveTo(i, r);break;case s.L:
              a = l[d++], o = l[d++], (g(a - i) > u || g(o - r) > c || d === h - 1) && (t.lineTo(a, o), i = a, r = o);break;case s.C:
              t.bezierCurveTo(l[d++], l[d++], l[d++], l[d++], l[d++], l[d++]), i = l[d - 2], r = l[d - 1];break;case s.Q:
              t.quadraticCurveTo(l[d++], l[d++], l[d++], l[d++]), i = l[d - 2], r = l[d - 1];break;case s.A:
              var v = l[d++],
                  y = l[d++],
                  x = l[d++],
                  _ = l[d++],
                  b = l[d++],
                  w = l[d++],
                  M = l[d++],
                  S = l[d++],
                  A = x > _ ? x : _,
                  P = x > _ ? 1 : x / _,
                  T = x > _ ? _ / x : 1,
                  C = Math.abs(x - _) > .001,
                  k = b + w;C ? (t.translate(v, y), t.rotate(M), t.scale(P, T), t.arc(0, 0, A, b, k, 1 - S), t.scale(1 / P, 1 / T), t.rotate(-M), t.translate(-v, -y)) : t.arc(v, y, A, b, k, 1 - S), 1 == d && (e = p(b) * x + v, n = m(b) * _ + y), i = p(k) * x + v, r = m(k) * _ + y;break;case s.R:
              e = i = l[d], n = r = l[d + 1], t.rect(l[d++], l[d++], l[d++], l[d++]);break;case s.Z:
              t.closePath(), i = e, r = n;}
        }
      } }, x.CMD = s, x;
  }), e("zrender/tool/transformPath", [Ze, "../core/PathProxy", "../core/vector"], function (t) {
    function e(t, e) {
      var i,
          r,
          u,
          c,
          h,
          d,
          f = t.data,
          p = n.M,
          m = n.C,
          v = n.L,
          g = n.R,
          y = n.A,
          x = n.Q;for (u = 0, c = 0; u < f[we];) {
        switch (i = f[u++], c = u, r = 0, i) {case p:
            r = 1;break;case v:
            r = 1;break;case m:
            r = 3;break;case x:
            r = 2;break;case y:
            var _ = e[4],
                b = e[5],
                w = s(e[0] * e[0] + e[1] * e[1]),
                M = s(e[2] * e[2] + e[3] * e[3]),
                S = l(-e[1] / M, e[0] / w);f[u] *= w, f[u++] += _, f[u] *= M, f[u++] += b, f[u++] *= w, f[u++] *= M, f[u++] += S, f[u++] += S, u += 2, c = u;break;case g:
            d[0] = f[u++], d[1] = f[u++], a(d, d, e), f[c++] = d[0], f[c++] = d[1], d[0] += f[u++], d[1] += f[u++], a(d, d, e), f[c++] = d[0], f[c++] = d[1];}for (h = 0; r > h; h++) {
          var d = o[h];d[0] = f[u++], d[1] = f[u++], a(d, d, e), f[c++] = d[0], f[c++] = d[1];
        }
      }
    }var n = t("../core/PathProxy").CMD,
        i = t("../core/vector"),
        a = i[r],
        o = [[], [], []],
        s = Math.sqrt,
        l = Math.atan2;return e;
  }), e("zrender/graphic/Displayable", [Ze, "../core/util", "./Style", "../Element", "./mixin/RectText"], function (t) {
    function e(t) {
      t = t || {}, o.call(this, t);for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);this.style = new r(t.style), this._rect = null, this.__clipPaths = [];
    }var i = t("../core/util"),
        r = t("./Style"),
        o = t("../Element"),
        s = t("./mixin/RectText");return e[Re] = { constructor: e, type: "displayable", __dirty: !0, invisible: !1, z: 0, z2: 0, zlevel: 0, draggable: !1, dragging: !1, silent: !1, culling: !1, cursor: "pointer", rectHover: !1, progressive: -1, beforeBrush: function () {}, afterBrush: function () {}, brush: function () {}, getBoundingRect: function () {}, contain: function (t, e) {
        return this.rectContain(t, e);
      }, traverse: function (t, e) {
        t.call(e, this);
      }, rectContain: function (t, e) {
        var n = this.transformCoordToLocal(t, e),
            i = this[a]();return i[G](n[0], n[1]);
      }, dirty: function () {
        this[n] = !0, this._rect = null, this.__zr && this.__zr.refresh();
      }, animateStyle: function (t) {
        return this.animate("style", t);
      }, attrKV: function (t, e) {
        "style" !== t ? o[Re].attrKV.call(this, t, e) : this.style.set(e);
      }, setStyle: function (t, e) {
        return this.style.set(t, e), this.dirty(!1), this;
      }, useStyle: function (t) {
        return this.style = new r(t), this.dirty(!1), this;
      } }, i[W](e, o), i.mixin(e, s), e;
  }), e("zrender/contain/path", [Ze, "../core/PathProxy", "./line", "./cubic", "./quadratic", "./arc", "./util", "../core/curve", "./windingLine"], function (t) {
    function e(t, e) {
      return Math.abs(t - e) < g;
    }function n() {
      var t = x[0];x[0] = x[1], x[1] = t;
    }function i(t, e, i, r, a, o, s, l, u, c) {
      if (c > e && c > r && c > o && c > l || e > c && r > c && o > c && l > c) return 0;var h = f.cubicRootAt(e, r, o, l, c, y);if (0 === h) return 0;for (var d, p, m = 0, v = -1, g = 0; h > g; g++) {
        var _ = y[g],
            b = 0 === _ || 1 === _ ? .5 : 1,
            w = f.cubicAt(t, i, a, s, _);u > w || (0 > v && (v = f.cubicExtrema(e, r, o, l, x), x[1] < x[0] && v > 1 && n(), d = f.cubicAt(e, r, o, l, x[0]), v > 1 && (p = f.cubicAt(e, r, o, l, x[1]))), m += 2 == v ? _ < x[0] ? e > d ? b : -b : _ < x[1] ? d > p ? b : -b : p > l ? b : -b : _ < x[0] ? e > d ? b : -b : d > l ? b : -b);
      }return m;
    }function r(t, e, n, i, r, a, o, s) {
      if (s > e && s > i && s > a || e > s && i > s && a > s) return 0;var l = f.quadraticRootAt(e, i, a, s, y);if (0 === l) return 0;var u = f.quadraticExtremum(e, i, a);if (u >= 0 && 1 >= u) {
        for (var c = 0, h = f.quadraticAt(e, i, a, u), d = 0; l > d; d++) {
          var p = 0 === y[d] || 1 === y[d] ? .5 : 1,
              m = f.quadraticAt(t, n, r, y[d]);o > m || (c += y[d] < u ? e > h ? p : -p : h > a ? p : -p);
        }return c;
      }var p = 0 === y[0] || 1 === y[0] ? .5 : 1,
          m = f.quadraticAt(t, n, r, y[0]);return o > m ? 0 : e > a ? p : -p;
    }function a(t, e, n, i, r, a, o, s) {
      if (s -= e, s > n || -n > s) return 0;var l = Math.sqrt(n * n - s * s);y[0] = -l, y[1] = l;var u = Math.abs(i - r);if (1e-4 > u) return 0;if (1e-4 > u % v) {
        i = 0, r = v;var c = a ? 1 : -1;return o >= y[0] + t && o <= y[1] + t ? c : 0;
      }if (a) {
        var l = i;i = d(r), r = d(l);
      } else i = d(i), r = d(r);i > r && (r += v);for (var h = 0, f = 0; 2 > f; f++) {
        var p = y[f];if (p + t > o) {
          var m = Math.atan2(s, p),
              c = a ? 1 : -1;0 > m && (m = v + m), (m >= i && r >= m || m + v >= i && r >= m + v) && (m > Math.PI / 2 && m < 1.5 * Math.PI && (c = -c), h += c);
        }
      }return h;
    }function o(t, n, o, l, d) {
      for (var f = 0, v = 0, g = 0, y = 0, x = 0, _ = 0; _ < t[we];) {
        var b = t[_++];switch (b === s.M && _ > 1 && (o || (f += p(v, g, y, x, l, d))), 1 == _ && (v = t[_], g = t[_ + 1], y = v, x = g), b) {case s.M:
            y = t[_++], x = t[_++], v = y, g = x;break;case s.L:
            if (o) {
              if (m(v, g, t[_], t[_ + 1], n, l, d)) return !0;
            } else f += p(v, g, t[_], t[_ + 1], l, d) || 0;v = t[_++], g = t[_++];break;case s.C:
            if (o) {
              if (u.containStroke(v, g, t[_++], t[_++], t[_++], t[_++], t[_], t[_ + 1], n, l, d)) return !0;
            } else f += i(v, g, t[_++], t[_++], t[_++], t[_++], t[_], t[_ + 1], l, d) || 0;v = t[_++], g = t[_++];break;case s.Q:
            if (o) {
              if (c.containStroke(v, g, t[_++], t[_++], t[_], t[_ + 1], n, l, d)) return !0;
            } else f += r(v, g, t[_++], t[_++], t[_], t[_ + 1], l, d) || 0;v = t[_++], g = t[_++];break;case s.A:
            var w = t[_++],
                M = t[_++],
                S = t[_++],
                A = t[_++],
                P = t[_++],
                T = t[_++],
                C = (t[_++], 1 - t[_++]),
                k = Math.cos(P) * S + w,
                L = Math.sin(P) * A + M;_ > 1 ? f += p(v, g, k, L, l, d) : (y = k, x = L);var I = (l - w) * A / S + w;if (o) {
              if (h.containStroke(w, M, A, P, P + T, C, n, I, d)) return !0;
            } else f += a(w, M, A, P, P + T, C, I, d);v = Math.cos(P + T) * S + w, g = Math.sin(P + T) * A + M;break;case s.R:
            y = v = t[_++], x = g = t[_++];var D = t[_++],
                z = t[_++],
                k = y + D,
                L = x + z;if (o) {
              if (m(y, x, k, x, n, l, d) || m(k, x, k, L, n, l, d) || m(k, L, y, L, n, l, d) || m(y, L, y, x, n, l, d)) return !0;
            } else f += p(k, x, k, L, l, d), f += p(y, L, y, x, l, d);break;case s.Z:
            if (o) {
              if (m(v, g, y, x, n, l, d)) return !0;
            } else f += p(v, g, y, x, l, d);v = y, g = x;}
      }return o || e(g, x) || (f += p(v, g, y, x, l, d) || 0), 0 !== f;
    }var s = t("../core/PathProxy").CMD,
        l = t("./line"),
        u = t("./cubic"),
        c = t("./quadratic"),
        h = t("./arc"),
        d = t("./util").normalizeRadian,
        f = t("../core/curve"),
        p = t("./windingLine"),
        m = l.containStroke,
        v = 2 * Math.PI,
        g = 1e-4,
        y = [-1, -1, -1],
        x = [-1, -1];return { contain: function (t, e, n) {
        return o(t, 0, !1, e, n);
      }, containStroke: function (t, e, n, i) {
        return o(t, e, !0, n, i);
      } };
  }), e("echarts/scale/Ordinal", [Ze, Fe, "./Scale"], function (t) {
    var e = t(Fe),
        n = t("./Scale"),
        i = n[Re],
        r = n[he]({ type: "ordinal", init: function (t, e) {
        this._data = t, this._extent = e || [0, t[we] - 1];
      }, parse: function (t) {
        return typeof t === Oe ? e[be](this._data, t) : Math.round(t);
      }, contain: function (t) {
        return t = this.parse(t), i[G].call(this, t) && null != this._data[t];
      }, normalize: function (t) {
        return i[Z].call(this, this.parse(t));
      }, scale: function (t) {
        return Math.round(i.scale.call(this, t));
      }, getTicks: function () {
        for (var t = [], e = this._extent, n = e[0]; n <= e[1];) t.push(n), n++;return t;
      }, getLabel: function (t) {
        return this._data[t];
      }, count: function () {
        return this._extent[1] - this._extent[0] + 1;
      }, unionExtentFromData: function (t, e) {
        this.unionExtent(t[B](e, !1));
      }, niceTicks: e.noop, niceExtent: e.noop });return r[ye] = function () {
      return new r();
    }, r;
  }), e("zrender/graphic/Pattern", [Ze], function () {
    var t = function (t, e) {
      this.image = t, this.repeat = e, this.type = "pattern";
    };return t[Re].getCanvasPattern = function (t) {
      return t.createPattern(this.image, this.repeat || "repeat");
    }, t;
  }), e("echarts/model/mixin/makeStyleMapper", [Ze, Fe], function (t) {
    var e = t(Fe);return function (t) {
      for (var n = 0; n < t[we]; n++) t[n][1] || (t[n][1] = t[n][0]);return function (n, i) {
        for (var r = {}, a = 0; a < t[we]; a++) {
          var o = t[a][1];if (!(n && e[be](n, o) >= 0 || i && e[be](i, o) < 0)) {
            var s = this[b](o);null != s && (r[t[a][0]] = s);
          }
        }return r;
      };
    };
  }), e("zrender/Element", [Ze, "./core/guid", "./mixin/Eventful", "./mixin/Transformable", "./mixin/Animatable", "./core/util"], function (t) {
    var e = t("./core/guid"),
        n = t("./mixin/Eventful"),
        i = t("./mixin/Transformable"),
        r = t("./mixin/Animatable"),
        a = t("./core/util"),
        o = function (t) {
      i.call(this, t), n.call(this, t), r.call(this, t), this.id = t.id || e();
    };return o[Re] = { type: "element", name: "", __zr: null, ignore: !1, clipPath: null, drift: function (t, e) {
        switch (this.draggable) {case "horizontal":
            e = 0;break;case "vertical":
            t = 0;}var n = this.transform;n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.dirty(!1);
      }, beforeUpdate: function () {}, afterUpdate: function () {}, update: function () {
        this.updateTransform();
      }, traverse: function () {}, attrKV: function (t, e) {
        if (t === A || "scale" === t || "origin" === t) {
          if (e) {
            var n = this[t];n || (n = this[t] = []), n[0] = e[0], n[1] = e[1];
          }
        } else this[t] = e;
      }, hide: function () {
        this[Se] = !0, this.__zr && this.__zr.refresh();
      }, show: function () {
        this[Se] = !1, this.__zr && this.__zr.refresh();
      }, attr: function (t, e) {
        if (typeof t === Oe) this.attrKV(t, e);else if (a[Le](t)) for (var n in t) t.hasOwnProperty(n) && this.attrKV(n, t[n]);return this.dirty(!1), this;
      }, setClipPath: function (t) {
        var e = this.__zr;e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1);
      }, removeClipPath: function () {
        var t = this.clipPath;t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1));
      }, addSelfToZr: function (t) {
        this.__zr = t;var e = this.animators;if (e) for (var n = 0; n < e[we]; n++) t[Ie].addAnimator(e[n]);this.clipPath && this.clipPath.addSelfToZr(t);
      }, removeSelfFromZr: function (t) {
        this.__zr = null;var e = this.animators;if (e) for (var n = 0; n < e[we]; n++) t[Ie].removeAnimator(e[n]);this.clipPath && this.clipPath.removeSelfFromZr(t);
      } }, a.mixin(o, r), a.mixin(o, i), a.mixin(o, n), o;
  }), e("zrender/graphic/Style", [Ze], function () {
    function t(t, e, n) {
      var i = null == e.x ? 0 : e.x,
          r = null == e.x2 ? 1 : e.x2,
          a = null == e.y ? 0 : e.y,
          o = null == e.y2 ? 0 : e.y2;e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n[De] + n.y, o = o * n[De] + n.y);var s = t.createLinearGradient(i, a, r, o);return s;
    }function e(t, e, n) {
      var i = n.width,
          r = n[De],
          a = Math.min(i, r),
          o = null == e.x ? .5 : e.x,
          s = null == e.y ? .5 : e.y,
          l = null == e.r ? .5 : e.r;e.global || (o = o * i + n.x, s = s * r + n.y, l *= a);var u = t.createRadialGradient(o, s, 0, o, s, l);return u;
    }var n = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]],
        r = function (t) {
      this.extendFrom(t);
    };r[Re] = { constructor: r, fill: "#000000", stroke: null, opacity: 1, lineDash: null, lineDashOffset: 0, shadowBlur: 0, shadowOffsetX: 0, shadowOffsetY: 0, lineWidth: 1, strokeNoScale: !1, text: null, textFill: "#000", textStroke: null, textPosition: "inside", textPositionRect: null, textOffset: null, textBaseline: null, textAlign: null, textVerticalAlign: null, textDistance: 5, textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textTransform: !1, textRotation: 0, blend: null, bind: function (t, e, r) {
        for (var a = this, o = r && r.style, s = !o, l = 0; l < n[we]; l++) {
          var u = n[l],
              c = u[0];(s || a[c] !== o[c]) && (t[c] = a[c] || u[1]);
        }if ((s || a.fill !== o.fill) && (t.fillStyle = a.fill), (s || a.stroke !== o.stroke) && (t.strokeStyle = a.stroke), (s || a[v] !== o[v]) && (t.globalAlpha = null == a[v] ? 1 : a[v]), (s || a.blend !== o.blend) && (t.globalCompositeOperation = a.blend || "source-over"), this.hasStroke()) {
          var h = a[i];t[i] = h / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);
        }
      }, hasFill: function () {
        var t = this.fill;return null != t && "none" !== t;
      }, hasStroke: function () {
        var t = this.stroke;return null != t && "none" !== t && this[i] > 0;
      }, extendFrom: function (t, e) {
        if (t) {
          var n = this;for (var i in t) !t.hasOwnProperty(i) || !e && n.hasOwnProperty(i) || (n[i] = t[i]);
        }
      }, set: function (t, e) {
        typeof t === Oe ? this[t] = e : this.extendFrom(t, !0);
      }, clone: function () {
        var t = new this.constructor();return t.extendFrom(this, !0), t;
      }, getGradient: function (n, i, r) {
        for (var a = "radial" === i.type ? e : t, o = a(n, i, r), s = i[ve], l = 0; l < s[we]; l++) o.addColorStop(s[l][L], s[l].color);return o;
      } };for (var a = r[Re], o = 0; o < n[we]; o++) {
      var s = n[o];s[0] in a || (a[s[0]] = s[1]);
    }return r.getGradient = a.getGradient, r;
  }), e("zrender/graphic/mixin/RectText", [Ze, "../../contain/text", "../../core/BoundingRect"], function (t) {
    function e(t, e) {
      return typeof t === Oe ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;
    }var n = t("../../contain/text"),
        i = t("../../core/BoundingRect"),
        o = new i(),
        s = function () {};return s[Re] = { constructor: s, drawRectText: function (t, i, s) {
        var l = this.style,
            u = l.text;if (null != u && (u += ""), u) {
          t.save();var h,
              d,
              f = l.textPosition,
              p = l.textOffset,
              m = l.textDistance,
              v = l[c],
              g = l.textFont || l.font,
              y = l.textBaseline,
              x = l.textVerticalAlign;i = l.textPositionRect || i, s = s || n[a](u, g, v, y);var _ = this.transform;if (l.textTransform ? this.setTransform(t) : _ && (o.copy(i), o[r](_), i = o), f instanceof Array) {
            if (h = i.x + e(f[0], i.width), d = i.y + e(f[1], i[De]), v = v || "left", y = y || "top", x) {
              switch (x) {case z:
                  d -= s[De] / 2 - s.lineHeight / 2;break;case Me:
                  d -= s[De] - s.lineHeight / 2;break;default:
                  d += s.lineHeight / 2;}y = z;
            }
          } else {
            var b = n.adjustTextPositionOnRect(f, i, s, m);h = b.x, d = b.y, v = v || b[c], y = y || b.textBaseline;
          }p && (h += p[0], d += p[1]), t[c] = v || "left", t.textBaseline = y || "alphabetic";var w = l.textFill,
              M = l.textStroke;w && (t.fillStyle = w), M && (t.strokeStyle = M), t.font = g || "12px sans-serif", t.shadowBlur = l.textShadowBlur, t.shadowColor = l.textShadowColor || "transparent", t.shadowOffsetX = l.textShadowOffsetX, t.shadowOffsetY = l.textShadowOffsetY;var S = u.split("\n");l.textRotation && (_ && t.translate(_[4], _[5]), t.rotate(l.textRotation), _ && t.translate(-_[4], -_[5]));for (var A = 0; A < S[we]; A++) M && t.strokeText(S[A], h, d), w && t.fillText(S[A], h, d), d += s.lineHeight;t.restore();
        }
      } }, s;
  }), e("echarts/coord/cartesian/Cartesian", [Ze, Fe], function (t) {
    function e(t) {
      return this._axes[t];
    }var n = t(Fe),
        i = function (t) {
      this._axes = {}, this._dimList = [], this.name = t || "";
    };return i[Re] = { constructor: i, type: "cartesian", getAxis: function (t) {
        return this._axes[t];
      }, getAxes: function () {
        return n.map(this._dimList, e, this);
      }, getAxesByScale: function (t) {
        return t = t[Ee](), n.filter(this.getAxes(), function (e) {
          return e.scale.type === t;
        });
      }, addAxis: function (t) {
        var e = t.dim;this._axes[e] = t, this._dimList.push(e);
      }, dataToCoord: function (t) {
        return this._dataCoordConvert(t, I);
      }, coordToData: function (t) {
        return this._dataCoordConvert(t, "coordToData");
      }, _dataCoordConvert: function (t, e) {
        for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n[we]; r++) {
          var a = n[r],
              o = this._axes[a];i[a] = o[e](t[a]);
        }return i;
      } }, i;
  }), e("zrender/core/guid", [], function () {
    var t = 2311;return function () {
      return t++;
    };
  }), e("zrender/mixin/Animatable", [Ze, "../animation/Animator", "../core/util", "../core/log"], function (t) {
    var e = t("../animation/Animator"),
        n = t("../core/util"),
        i = n[q],
        r = n.isFunction,
        a = n[Le],
        o = t("../core/log"),
        s = function () {
      this.animators = [];
    };return s[Re] = { constructor: s, animate: function (t, i) {
        var r,
            a = !1,
            s = this,
            l = this.__zr;if (t) {
          var u = t.split("."),
              c = s;a = "shape" === u[0];for (var h = 0, d = u[we]; d > h; h++) c && (c = c[u[h]]);c && (r = c);
        } else r = s;if (!r) return void o('Property "' + t + '" is not existed in element ' + s.id);var f = s.animators,
            p = new e(r, i);return p.during(function () {
          s.dirty(a);
        }).done(function () {
          f[ae](n[be](f, p), 1);
        }), f.push(p), l && l[Ie].addAnimator(p), p;
      }, stopAnimation: function (t) {
        for (var e = this.animators, n = e[we], i = 0; n > i; i++) e[i].stop(t);return e[we] = 0, this;
      }, animateTo: function (t, e, n, a, o) {
        function s() {
          u--, u || o && o();
        }i(n) ? (o = a, a = n, n = 0) : r(a) ? (o = a, a = "linear", n = 0) : r(n) ? (o = n, n = 0) : r(e) ? (o = e, e = 500) : e || (e = 500), this[Pe](), this._animateToShallow("", this, t, e, n, a, o);var l = this.animators.slice(),
            u = l[we];u || o && o();for (var c = 0; c < l[we]; c++) l[c].done(s).start(a);
      }, _animateToShallow: function (t, e, i, r, o) {
        var s = {},
            l = 0;for (var u in i) if (i.hasOwnProperty(u)) if (null != e[u]) a(i[u]) && !n.isArrayLike(i[u]) ? this._animateToShallow(t ? t + "." + u : u, e[u], i[u], r, o) : (s[u] = i[u], l++);else if (null != i[u]) if (t) {
          var c = {};c[t] = {}, c[t][u] = i[u], this.attr(c);
        } else this.attr(u, i[u]);return l > 0 && this.animate(t, !1).when(null == r ? 500 : r, s).delay(o || 0), this;
      } }, s;
  }), e("echarts/coord/cartesian/AxisModel", [Ze, "../../model/Component", Fe, "../axisModelCreator", "../axisModelCommonMixin"], function (t) {
    function e(t, e) {
      return e.type || (e.data ? x : "value");
    }var n = t("../../model/Component"),
        i = t(Fe),
        r = t("../axisModelCreator"),
        a = n[he]({ type: "cartesian2dAxis", axis: null, init: function () {
        a.superApply(this, "init", arguments), this.resetRange();
      }, mergeOption: function () {
        a.superApply(this, "mergeOption", arguments), this.resetRange();
      }, restoreData: function () {
        a.superApply(this, "restoreData", arguments), this.resetRange();
      }, getCoordSysModel: function () {
        return this[F].queryComponents({ mainType: "grid", index: this[l].gridIndex, id: this[l].gridId })[0];
      } });i.merge(a[Re], t("../axisModelCommonMixin"));var o = { offset: 0 };return r("x", a, e, o), r("y", a, e, o), a;
  }), e("echarts/coord/axisModelCommonMixin", [Ze, Fe, "./axisHelper"], function (t) {
    function e(t) {
      return n[Le](t) && null != t.value ? t.value : t + "";
    }var n = t(Fe),
        i = t("./axisHelper");return { getFormattedLabels: function () {
        return i.getFormattedLabels(this.axis, this.get("axisLabel.formatter"));
      }, getCategories: function () {
        return this.get("type") === x && n.map(this.get("data"), e);
      }, getMin: function (t) {
        var e = this[l],
            i = t || null == e.rangeStart ? e.min : e.rangeStart;return this.axis && null != i && "dataMin" !== i && !n.eqNaN(i) && (i = this.axis.scale.parse(i)), i;
      }, getMax: function (t) {
        var e = this[l],
            i = t || null == e.rangeEnd ? e.max : e.rangeEnd;return this.axis && null != i && "dataMax" !== i && !n.eqNaN(i) && (i = this.axis.scale.parse(i)), i;
      }, getNeedCrossZero: function () {
        var t = this[l];return null != t.rangeStart || null != t.rangeEnd ? !1 : !t.scale;
      }, getCoordSysModel: n.noop, setRange: function (t, e) {
        this[l].rangeStart = t, this[l].rangeEnd = e;
      }, resetRange: function () {
        this[l].rangeStart = this[l].rangeEnd = null;
      } };
  }), e("echarts/coord/axisModelCreator", [Ze, "./axisDefault", Fe, "../model/Component", "../util/layout"], function (t) {
    var e = t("./axisDefault"),
        n = t(Fe),
        i = t("../model/Component"),
        r = t("../util/layout"),
        a = ["value", x, "time", "log"];return function (t, o, s, l) {
      n.each(a, function (i) {
        o[he]({ type: t + "Axis." + i, mergeDefaultAndTheme: function (e, a) {
            var o = this.layoutMode,
                l = o ? r.getLayoutParams(e) : {},
                u = a.getTheme();n.merge(e, u.get(i + "Axis")), n.merge(e, this.getDefaultOption()), e.type = s(t, e), o && r.mergeLayoutParam(e, l, o);
          }, defaultOption: n.mergeAll([{}, e[i + "Axis"], l], !0) });
      }), i.registerSubTypeDefaulter(t + "Axis", n.curry(s, t));
    };
  }), e("zrender/animation/Animator", [Ze, "./Clip", "../tool/color", "../core/util"], function (t) {
    function e(t, e) {
      return t[e];
    }function n(t, e, n) {
      t[e] = n;
    }function i(t, e, n) {
      return (e - t) * n + t;
    }function r(t, e, n) {
      return n > .5 ? e : t;
    }function a(t, e, n, r, a) {
      var o = t[we];if (1 == a) for (var s = 0; o > s; s++) r[s] = i(t[s], e[s], n);else for (var l = o && t[0][we], s = 0; o > s; s++) for (var u = 0; l > u; u++) r[s][u] = i(t[s][u], e[s][u], n);
    }function o(t, e, n) {
      var i = t[we],
          r = e[we];if (i !== r) {
        var a = i > r;if (a) t[we] = r;else for (var o = i; r > o; o++) t.push(1 === n ? e[o] : y.call(e[o]));
      }for (var s = t[0] && t[0][we], o = 0; o < t[we]; o++) if (1 === n) isNaN(t[o]) && (t[o] = e[o]);else for (var l = 0; s > l; l++) isNaN(t[o][l]) && (t[o][l] = e[o][l]);
    }function s(t, e, n) {
      if (t === e) return !0;var i = t[we];if (i !== e[we]) return !1;if (1 === n) {
        for (var r = 0; i > r; r++) if (t[r] !== e[r]) return !1;
      } else for (var a = t[0][we], r = 0; i > r; r++) for (var o = 0; a > o; o++) if (t[r][o] !== e[r][o]) return !1;return !0;
    }function l(t, e, n, i, r, a, o, s, l) {
      var c = t[we];if (1 == l) for (var h = 0; c > h; h++) s[h] = u(t[h], e[h], n[h], i[h], r, a, o);else for (var d = t[0][we], h = 0; c > h; h++) for (var f = 0; d > f; f++) s[h][f] = u(t[h][f], e[h][f], n[h][f], i[h][f], r, a, o);
    }function u(t, e, n, i, r, a, o) {
      var s = .5 * (n - t),
          l = .5 * (i - e);return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }function c(t) {
      if (g(t)) {
        var e = t[we];if (g(t[0])) {
          for (var n = [], i = 0; e > i; i++) n.push(y.call(t[i]));return n;
        }return y.call(t);
      }return t;
    }function h(t) {
      return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")";
    }function d(t) {
      var e = t[t[we] - 1].value;return g(e && e[0]) ? 2 : 1;
    }function f(t, e, n, c, f) {
      var v = t._getter,
          y = t._setter,
          x = "spline" === e,
          _ = c[we];if (_) {
        var b,
            w = c[0].value,
            M = g(w),
            S = !1,
            A = !1,
            P = M ? d(c) : 0;c.sort(function (t, e) {
          return t.time - e.time;
        }), b = c[_ - 1].time;for (var T = [], C = [], k = c[0].value, L = !0, I = 0; _ > I; I++) {
          T.push(c[I].time / b);var D = c[I].value;if (M && s(D, k, P) || !M && D === k || (L = !1), k = D, typeof D == Oe) {
            var z = m.parse(D);z ? (D = z, S = !0) : A = !0;
          }C.push(D);
        }if (!L) {
          for (var O = C[_ - 1], I = 0; _ - 1 > I; I++) M ? o(C[I], O, P) : !isNaN(C[I]) || isNaN(O) || A || S || (C[I] = O);M && o(v(t._target, f), O, P);var R,
              E,
              N,
              B,
              V,
              F,
              Z = 0,
              G = 0;if (S) var H = [0, 0, 0, 0];var q = function (t, e) {
            var n;if (0 > e) n = 0;else if (G > e) {
              for (R = Math.min(Z + 1, _ - 1), n = R; n >= 0 && !(T[n] <= e); n--);n = Math.min(n, _ - 2);
            } else {
              for (n = Z; _ > n && !(T[n] > e); n++);n = Math.min(n - 1, _ - 2);
            }Z = n, G = e;var o = T[n + 1] - T[n];if (0 !== o) if (E = (e - T[n]) / o, x) {
              if (B = C[n], N = C[0 === n ? n : n - 1], V = C[n > _ - 2 ? _ - 1 : n + 1], F = C[n > _ - 3 ? _ - 1 : n + 2], M) l(N, B, V, F, E, E * E, E * E * E, v(t, f), P);else {
                var s;if (S) s = l(N, B, V, F, E, E * E, E * E * E, H, 1), s = h(H);else {
                  if (A) return r(B, V, E);s = u(N, B, V, F, E, E * E, E * E * E);
                }y(t, f, s);
              }
            } else if (M) a(C[n], C[n + 1], E, v(t, f), P);else {
              var s;if (S) a(C[n], C[n + 1], E, H, 1), s = h(H);else {
                if (A) return r(C[n], C[n + 1], E);s = i(C[n], C[n + 1], E);
              }y(t, f, s);
            }
          },
              W = new p({ target: t._target, life: b, loop: t._loop, delay: t._delay, onframe: q, ondestroy: n });return e && "spline" !== e && (W.easing = e), W;
        }
      }
    }var p = t("./Clip"),
        m = t("../tool/color"),
        v = t("../core/util"),
        g = v.isArrayLike,
        y = Array[Re].slice,
        x = function (t, i, r, a) {
      this._tracks = {}, this._target = t, this._loop = i || !1, this._getter = r || e, this._setter = a || n, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = [];
    };return x[Re] = { when: function (t, e) {
        var n = this._tracks;for (var i in e) if (e.hasOwnProperty(i)) {
          if (!n[i]) {
            n[i] = [];var r = this._getter(this._target, i);if (null == r) continue;0 !== t && n[i].push({ time: 0, value: c(r) });
          }n[i].push({ time: t, value: e[i] });
        }return this;
      }, during: function (t) {
        return this._onframeList.push(t), this;
      }, pause: function () {
        for (var t = 0; t < this._clipList[we]; t++) this._clipList[t].pause();this._paused = !0;
      }, resume: function () {
        for (var t = 0; t < this._clipList[we]; t++) this._clipList[t].resume();this._paused = !1;
      }, isPaused: function () {
        return !!this._paused;
      }, _doneCallback: function () {
        this._tracks = {}, this._clipList[we] = 0;for (var t = this._doneList, e = t[we], n = 0; e > n; n++) t[n].call(this);
      }, start: function (t) {
        var e,
            n = this,
            i = 0,
            r = function () {
          i--, i || n._doneCallback();
        };for (var a in this._tracks) if (this._tracks.hasOwnProperty(a)) {
          var o = f(this, t, r, this._tracks[a], a);o && (this._clipList.push(o), i++, this[Ie] && this[Ie].addClip(o), e = o);
        }if (e) {
          var s = e.onframe;e.onframe = function (t, e) {
            s(t, e);for (var i = 0; i < n._onframeList[we]; i++) n._onframeList[i](t, e);
          };
        }return i || this._doneCallback(), this;
      }, stop: function (t) {
        for (var e = this._clipList, n = this[Ie], i = 0; i < e[we]; i++) {
          var r = e[i];t && r.onframe(this._target, 1), n && n.removeClip(r);
        }e[we] = 0;
      }, delay: function (t) {
        return this._delay = t, this;
      }, done: function (t) {
        return t && this._doneList.push(t), this;
      }, getClips: function () {
        return this._clipList;
      } }, x;
  }), e("zrender/core/log", [Ze, "../config"], function (t) {
    var e = t("../config");return function () {
      if (0 !== e.debugMode) if (1 == e.debugMode) for (var t in arguments) throw new Error(arguments[t]);else if (e.debugMode > 1) for (var t in arguments) console.log(arguments[t]);
    };
  }), e("zrender/animation/Clip", [Ze, "./easing"], function (t) {
    function e(t) {
      this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null == t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1;
    }var n = t("./easing");return e[Re] = { constructor: e, step: function (t, e) {
        if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void (this._pausedTime += e);var i = (t - this._startTime - this._pausedTime) / this._life;if (!(0 > i)) {
          i = Math.min(i, 1);var r = this.easing,
              a = typeof r == Oe ? n[r] : r,
              o = typeof a === j ? a(i) : i;return this.fire("frame", o), 1 == i ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null;
        }
      }, restart: function (t) {
        var e = (t - this._startTime - this._pausedTime) % this._life;this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1;
      }, fire: function (t, e) {
        t = "on" + t, this[t] && this[t](this._target, e);
      }, pause: function () {
        this._paused = !0;
      }, resume: function () {
        this._paused = !1;
      } }, e;
  }), e("zrender/animation/easing", [], function () {
    var t = { linear: function (t) {
        return t;
      }, quadraticIn: function (t) {
        return t * t;
      }, quadraticOut: function (t) {
        return t * (2 - t);
      }, quadraticInOut: function (t) {
        return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
      }, cubicIn: function (t) {
        return t * t * t;
      }, cubicOut: function (t) {
        return --t * t * t + 1;
      }, cubicInOut: function (t) {
        return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
      }, quarticIn: function (t) {
        return t * t * t * t;
      }, quarticOut: function (t) {
        return 1 - --t * t * t * t;
      }, quarticInOut: function (t) {
        return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
      }, quinticIn: function (t) {
        return t * t * t * t * t;
      }, quinticOut: function (t) {
        return --t * t * t * t * t + 1;
      }, quinticInOut: function (t) {
        return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
      }, sinusoidalIn: function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
      }, sinusoidalOut: function (t) {
        return Math.sin(t * Math.PI / 2);
      }, sinusoidalInOut: function (t) {
        return .5 * (1 - Math.cos(Math.PI * t));
      }, exponentialIn: function (t) {
        return 0 === t ? 0 : Math.pow(1024, t - 1);
      }, exponentialOut: function (t) {
        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
      }, exponentialInOut: function (t) {
        return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2);
      }, circularIn: function (t) {
        return 1 - Math.sqrt(1 - t * t);
      }, circularOut: function (t) {
        return Math.sqrt(1 - --t * t);
      }, circularInOut: function (t) {
        return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      }, elasticIn: function (t) {
        var e,
            n = .1,
            i = .4;return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i)));
      }, elasticOut: function (t) {
        var e,
            n = .1,
            i = .4;return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / i) + 1);
      }, elasticInOut: function (t) {
        var e,
            n = .1,
            i = .4;return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) * .5 + 1);
      }, backIn: function (t) {
        var e = 1.70158;return t * t * ((e + 1) * t - e);
      }, backOut: function (t) {
        var e = 1.70158;return --t * t * ((e + 1) * t + e) + 1;
      }, backInOut: function (t) {
        var e = 2.5949095;return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
      }, bounceIn: function (e) {
        return 1 - t.bounceOut(1 - e);
      }, bounceOut: function (t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
      }, bounceInOut: function (e) {
        return .5 > e ? .5 * t.bounceIn(2 * e) : .5 * t.bounceOut(2 * e - 1) + .5;
      } };return t;
  }), e("zrender/core/LRU", [Ze], function () {
    var t = function () {
      this.head = null, this.tail = null, this._len = 0;
    },
        e = t[Re];e.insert = function (t) {
      var e = new n(t);return this.insertEntry(e), e;
    }, e.insertEntry = function (t) {
      this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
    }, e[de] = function (t) {
      var e = t.prev,
          n = t.next;e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
    }, e.len = function () {
      return this._len;
    }, e.clear = function () {
      this.head = this.tail = null, this._len = 0;
    };var n = function (t) {
      this.value = t, this.next, this.prev;
    },
        i = function (e) {
      this._list = new t(), this._map = {}, this._maxSize = e || 10, this._lastRemovedEntry = null;
    },
        r = i[Re];return r.put = function (t, e) {
      var i = this._list,
          r = this._map,
          a = null;if (null == r[t]) {
        var o = i.len(),
            s = this._lastRemovedEntry;if (o >= this._maxSize && o > 0) {
          var l = i.head;i[de](l), delete r[l.key], a = l.value, this._lastRemovedEntry = l;
        }s ? s.value = e : s = new n(e), s.key = t, i.insertEntry(s), r[t] = s;
      }return a;
    }, r.get = function (t) {
      var e = this._map[t],
          n = this._list;return null != e ? (e !== n.tail && (n[de](e), n.insertEntry(e)), e.value) : void 0;
    }, r.clear = function () {
      this._list.clear(), this._map = {};
    }, i;
  }), e("zrender/config", [], function () {
    var t = 1;typeof window !== o && (t = Math.max(window.devicePixelRatio || 1, 1));var e = { debugMode: 0, devicePixelRatio: t };return e;
  }), e("zrender/core/curve", [Ze, "./vector"], function (t) {
    function e(t) {
      return t > -_ && _ > t;
    }function n(t) {
      return t > _ || -_ > t;
    }function i(t, e, n, i, r) {
      var a = 1 - r;return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n);
    }function r(t, e, n, i, r) {
      var a = 1 - r;return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r);
    }function a(t, n, i, r, a, o) {
      var s = r + 3 * (n - i) - t,
          l = 3 * (i - 2 * n + t),
          u = 3 * (n - t),
          c = t - a,
          h = l * l - 3 * s * u,
          d = l * u - 9 * s * c,
          f = u * u - 3 * l * c,
          p = 0;if (e(h) && e(d)) {
        if (e(l)) o[0] = 0;else {
          var m = -u / l;m >= 0 && 1 >= m && (o[p++] = m);
        }
      } else {
        var v = d * d - 4 * h * f;if (e(v)) {
          var g = d / h,
              m = -l / s + g,
              _ = -g / 2;m >= 0 && 1 >= m && (o[p++] = m), _ >= 0 && 1 >= _ && (o[p++] = _);
        } else if (v > 0) {
          var b = x(v),
              S = h * l + 1.5 * s * (-d + b),
              A = h * l + 1.5 * s * (-d - b);S = 0 > S ? -y(-S, M) : y(S, M), A = 0 > A ? -y(-A, M) : y(A, M);var m = (-l - (S + A)) / (3 * s);m >= 0 && 1 >= m && (o[p++] = m);
        } else {
          var P = (2 * h * l - 3 * s * d) / (2 * x(h * h * h)),
              T = Math.acos(P) / 3,
              C = x(h),
              k = Math.cos(T),
              m = (-l - 2 * C * k) / (3 * s),
              _ = (-l + C * (k + w * Math.sin(T))) / (3 * s),
              L = (-l + C * (k - w * Math.sin(T))) / (3 * s);m >= 0 && 1 >= m && (o[p++] = m), _ >= 0 && 1 >= _ && (o[p++] = _), L >= 0 && 1 >= L && (o[p++] = L);
        }
      }return p;
    }function o(t, i, r, a, o) {
      var s = 6 * r - 12 * i + 6 * t,
          l = 9 * i + 3 * a - 3 * t - 9 * r,
          u = 3 * i - 3 * t,
          c = 0;if (e(l)) {
        if (n(s)) {
          var h = -u / s;h >= 0 && 1 >= h && (o[c++] = h);
        }
      } else {
        var d = s * s - 4 * l * u;if (e(d)) o[0] = -s / (2 * l);else if (d > 0) {
          var f = x(d),
              h = (-s + f) / (2 * l),
              p = (-s - f) / (2 * l);h >= 0 && 1 >= h && (o[c++] = h), p >= 0 && 1 >= p && (o[c++] = p);
        }
      }return c;
    }function s(t, e, n, i, r, a) {
      var o = (e - t) * r + t,
          s = (n - e) * r + e,
          l = (i - n) * r + n,
          u = (s - o) * r + o,
          c = (l - s) * r + s,
          h = (c - u) * r + u;a[0] = t, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = c, a[6] = l, a[7] = i;
    }function l(t, e, n, r, a, o, s, l, u, c, h) {
      var d,
          f,
          p,
          m,
          v,
          y = .005,
          _ = 1 / 0;S[0] = u, S[1] = c;for (var w = 0; 1 > w; w += .05) A[0] = i(t, n, a, s, w), A[1] = i(e, r, o, l, w), m = g(S, A), _ > m && (d = w, _ = m);_ = 1 / 0;for (var M = 0; 32 > M && !(b > y); M++) f = d - y, p = d + y, A[0] = i(t, n, a, s, f), A[1] = i(e, r, o, l, f), m = g(A, S), f >= 0 && _ > m ? (d = f, _ = m) : (P[0] = i(t, n, a, s, p), P[1] = i(e, r, o, l, p), v = g(P, S), 1 >= p && _ > v ? (d = p, _ = v) : y *= .5);return h && (h[0] = i(t, n, a, s, d), h[1] = i(e, r, o, l, d)), x(_);
    }function u(t, e, n, i) {
      var r = 1 - i;return r * (r * t + 2 * i * e) + i * i * n;
    }function c(t, e, n, i) {
      return 2 * ((1 - i) * (e - t) + i * (n - e));
    }function h(t, i, r, a, o) {
      var s = t - 2 * i + r,
          l = 2 * (i - t),
          u = t - a,
          c = 0;if (e(s)) {
        if (n(l)) {
          var h = -u / l;h >= 0 && 1 >= h && (o[c++] = h);
        }
      } else {
        var d = l * l - 4 * s * u;if (e(d)) {
          var h = -l / (2 * s);h >= 0 && 1 >= h && (o[c++] = h);
        } else if (d > 0) {
          var f = x(d),
              h = (-l + f) / (2 * s),
              p = (-l - f) / (2 * s);h >= 0 && 1 >= h && (o[c++] = h), p >= 0 && 1 >= p && (o[c++] = p);
        }
      }return c;
    }function d(t, e, n) {
      var i = t + n - 2 * e;return 0 === i ? .5 : (t - e) / i;
    }function f(t, e, n, i, r) {
      var a = (e - t) * i + t,
          o = (n - e) * i + e,
          s = (o - a) * i + a;r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n;
    }function p(t, e, n, i, r, a, o, s, l) {
      var c,
          h = .005,
          d = 1 / 0;S[0] = o, S[1] = s;for (var f = 0; 1 > f; f += .05) {
        A[0] = u(t, n, r, f), A[1] = u(e, i, a, f);var p = g(S, A);d > p && (c = f, d = p);
      }d = 1 / 0;for (var m = 0; 32 > m && !(b > h); m++) {
        var v = c - h,
            y = c + h;
        A[0] = u(t, n, r, v), A[1] = u(e, i, a, v);var p = g(A, S);if (v >= 0 && d > p) c = v, d = p;else {
          P[0] = u(t, n, r, y), P[1] = u(e, i, a, y);var _ = g(P, S);1 >= y && d > _ ? (c = y, d = _) : h *= .5;
        }
      }return l && (l[0] = u(t, n, r, c), l[1] = u(e, i, a, c)), x(d);
    }var m = t("./vector"),
        v = m[ye],
        g = m.distSquare,
        y = Math.pow,
        x = Math.sqrt,
        _ = 1e-8,
        b = 1e-4,
        w = x(3),
        M = 1 / 3,
        S = v(),
        A = v(),
        P = v();return { cubicAt: i, cubicDerivativeAt: r, cubicRootAt: a, cubicExtrema: o, cubicSubdivide: s, cubicProjectPoint: l, quadraticAt: u, quadraticDerivativeAt: c, quadraticRootAt: h, quadraticExtremum: d, quadraticSubdivide: f, quadraticProjectPoint: p };
  }), e("zrender/core/bbox", [Ze, "./vector", "./curve"], function (t) {
    var e = t("./vector"),
        n = t("./curve"),
        i = {},
        r = Math.min,
        a = Math.max,
        o = Math.sin,
        s = Math.cos,
        l = e[ye](),
        u = e[ye](),
        c = e[ye](),
        h = 2 * Math.PI;i.fromPoints = function (t, e, n) {
      if (0 !== t[we]) {
        var i,
            o = t[0],
            s = o[0],
            l = o[0],
            u = o[1],
            c = o[1];for (i = 1; i < t[we]; i++) o = t[i], s = r(s, o[0]), l = a(l, o[0]), u = r(u, o[1]), c = a(c, o[1]);e[0] = s, e[1] = u, n[0] = l, n[1] = c;
      }
    }, i.fromLine = function (t, e, n, i, o, s) {
      o[0] = r(t, n), o[1] = r(e, i), s[0] = a(t, n), s[1] = a(e, i);
    };var d = [],
        f = [];return i.fromCubic = function (t, e, i, o, s, l, u, c, h, p) {
      var m,
          v = n.cubicExtrema,
          g = n.cubicAt,
          y = v(t, i, s, u, d);for (h[0] = 1 / 0, h[1] = 1 / 0, p[0] = -1 / 0, p[1] = -1 / 0, m = 0; y > m; m++) {
        var x = g(t, i, s, u, d[m]);h[0] = r(x, h[0]), p[0] = a(x, p[0]);
      }for (y = v(e, o, l, c, f), m = 0; y > m; m++) {
        var _ = g(e, o, l, c, f[m]);h[1] = r(_, h[1]), p[1] = a(_, p[1]);
      }h[0] = r(t, h[0]), p[0] = a(t, p[0]), h[0] = r(u, h[0]), p[0] = a(u, p[0]), h[1] = r(e, h[1]), p[1] = a(e, p[1]), h[1] = r(c, h[1]), p[1] = a(c, p[1]);
    }, i.fromQuadratic = function (t, e, i, o, s, l, u, c) {
      var h = n.quadraticExtremum,
          d = n.quadraticAt,
          f = a(r(h(t, i, s), 1), 0),
          p = a(r(h(e, o, l), 1), 0),
          m = d(t, i, s, f),
          v = d(e, o, l, p);u[0] = r(t, s, m), u[1] = r(e, l, v), c[0] = a(t, s, m), c[1] = a(e, l, v);
    }, i.fromArc = function (t, n, i, r, a, d, f, p, m) {
      var v = e.min,
          g = e.max,
          y = Math.abs(a - d);if (1e-4 > y % h && y > 1e-4) return p[0] = t - i, p[1] = n - r, m[0] = t + i, void (m[1] = n + r);if (l[0] = s(a) * i + t, l[1] = o(a) * r + n, u[0] = s(d) * i + t, u[1] = o(d) * r + n, v(p, l, u), g(m, l, u), a %= h, 0 > a && (a += h), d %= h, 0 > d && (d += h), a > d && !f ? d += h : d > a && f && (a += h), f) {
        var x = d;d = a, a = x;
      }for (var _ = 0; d > _; _ += Math.PI / 2) _ > a && (c[0] = s(_) * i + t, c[1] = o(_) * r + n, v(p, c, p), g(m, c, m));
    }, i;
  }), e("zrender/contain/line", [], function () {
    return { containStroke: function (t, e, n, i, r, a, o) {
        if (0 === r) return !1;var s = r,
            l = 0,
            u = t;if (o > e + s && o > i + s || e - s > o && i - s > o || a > t + s && a > n + s || t - s > a && n - s > a) return !1;if (t === n) return Math.abs(a - t) <= s / 2;l = (e - i) / (t - n), u = (t * i - n * e) / (t - n);var c = l * a - o + u,
            h = c * c / (l * l + 1);return s / 2 * s / 2 >= h;
      } };
  }), e("zrender/contain/quadratic", [Ze, "../core/curve"], function (t) {
    var e = t("../core/curve");return { containStroke: function (t, n, i, r, a, o, s, l, u) {
        if (0 === s) return !1;var c = s;if (u > n + c && u > r + c && u > o + c || n - c > u && r - c > u && o - c > u || l > t + c && l > i + c && l > a + c || t - c > l && i - c > l && a - c > l) return !1;var h = e.quadraticProjectPoint(t, n, i, r, a, o, l, u, null);return c / 2 >= h;
      } };
  }), e("zrender/contain/cubic", [Ze, "../core/curve"], function (t) {
    var e = t("../core/curve");return { containStroke: function (t, n, i, r, a, o, s, l, u, c, h) {
        if (0 === u) return !1;var d = u;if (h > n + d && h > r + d && h > o + d && h > l + d || n - d > h && r - d > h && o - d > h && l - d > h || c > t + d && c > i + d && c > a + d && c > s + d || t - d > c && i - d > c && a - d > c && s - d > c) return !1;var f = e.cubicProjectPoint(t, n, i, r, a, o, s, l, c, h, null);return d / 2 >= f;
      } };
  }), e("zrender/contain/windingLine", [], function () {
    return function (t, e, n, i, r, a) {
      if (a > e && a > i || e > a && i > a) return 0;if (i === e) return 0;var o = e > i ? 1 : -1,
          s = (a - e) / (i - e);(1 === s || 0 === s) && (o = e > i ? .5 : -.5);var l = s * (n - t) + t;return l > r ? o : 0;
    };
  }), e("zrender/contain/arc", [Ze, "./util"], function (t) {
    var e = t("./util").normalizeRadian,
        n = 2 * Math.PI;return { containStroke: function (t, i, r, a, o, s, l, u, c) {
        if (0 === l) return !1;var h = l;u -= t, c -= i;var d = Math.sqrt(u * u + c * c);if (d - h > r || r > d + h) return !1;if (Math.abs(a - o) % n < 1e-4) return !0;if (s) {
          var f = a;a = e(o), o = e(f);
        } else a = e(a), o = e(o);a > o && (o += n);var p = Math.atan2(c, u);return 0 > p && (p += n), p >= a && o >= p || p + n >= a && o >= p + n;
      } };
  }), e("zrender/contain/util", [Ze], function () {
    var t = 2 * Math.PI;return { normalizeRadian: function (e) {
        return e %= t, 0 > e && (e += t), e;
      } };
  }), e("zrender/graphic/helper/poly", [Ze, "./smoothSpline", "./smoothBezier"], function (t) {
    var e = t("./smoothSpline"),
        n = t("./smoothBezier");return { buildPath: function (t, i, r) {
        var a = i.points,
            o = i.smooth;if (a && a[we] >= 2) {
          if (o && "spline" !== o) {
            var s = n(a, o, r, i.smoothConstraint);t.moveTo(a[0][0], a[0][1]);for (var l = a[we], u = 0; (r ? l : l - 1) > u; u++) {
              var c = s[2 * u],
                  h = s[2 * u + 1],
                  d = a[(u + 1) % l];t.bezierCurveTo(c[0], c[1], h[0], h[1], d[0], d[1]);
            }
          } else {
            "spline" === o && (a = e(a, r)), t.moveTo(a[0][0], a[0][1]);for (var u = 1, f = a[we]; f > u; u++) t.lineTo(a[u][0], a[u][1]);
          }r && t.closePath();
        }
      } };
  }), e("zrender/graphic/helper/smoothSpline", [Ze, "../../core/vector"], function (t) {
    function e(t, e, n, i, r, a, o) {
      var s = .5 * (n - t),
          l = .5 * (i - e);return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }var n = t("../../core/vector");return function (t, i) {
      for (var r = t[we], a = [], o = 0, s = 1; r > s; s++) o += n.distance(t[s - 1], t[s]);var l = o / 2;l = r > l ? r : l;for (var s = 0; l > s; s++) {
        var u,
            c,
            h,
            d = s / (l - 1) * (i ? r : r - 1),
            f = Math.floor(d),
            p = d - f,
            m = t[f % r];i ? (u = t[(f - 1 + r) % r], c = t[(f + 1) % r], h = t[(f + 2) % r]) : (u = t[0 === f ? f : f - 1], c = t[f > r - 2 ? r - 1 : f + 1], h = t[f > r - 3 ? r - 1 : f + 2]);var v = p * p,
            g = p * v;a.push([e(u[0], m[0], c[0], h[0], p, v, g), e(u[1], m[1], c[1], h[1], p, v, g)]);
      }return a;
    };
  }), e("zrender/graphic/helper/smoothBezier", [Ze, "../../core/vector"], function (t) {
    var e = t("../../core/vector"),
        n = e.min,
        i = e.max,
        r = e.scale,
        a = e.distance,
        o = e.add;return function (t, s, l, u) {
      var c,
          h,
          d,
          f,
          p = [],
          m = [],
          v = [],
          g = [];if (u) {
        d = [1 / 0, 1 / 0], f = [-1 / 0, -1 / 0];for (var y = 0, x = t[we]; x > y; y++) n(d, d, t[y]), i(f, f, t[y]);n(d, d, u[0]), i(f, f, u[1]);
      }for (var y = 0, x = t[we]; x > y; y++) {
        var _ = t[y];if (l) c = t[y ? y - 1 : x - 1], h = t[(y + 1) % x];else {
          if (0 === y || y === x - 1) {
            p.push(e.clone(t[y]));continue;
          }c = t[y - 1], h = t[y + 1];
        }e.sub(m, h, c), r(m, m, s);var b = a(_, c),
            w = a(_, h),
            M = b + w;0 !== M && (b /= M, w /= M), r(v, m, -b), r(g, m, w);var S = o([], _, v),
            A = o([], _, g);u && (i(S, S, d), n(S, S, f), i(A, A, d), n(A, A, f)), p.push(S), p.push(A);
      }return l && p.push(p.shift()), p;
    };
  }), e("zrender/graphic/helper/roundRect", [Ze], function () {
    return { buildPath: function (t, e) {
        var n,
            i,
            r,
            a,
            o = e.x,
            s = e.y,
            l = e.width,
            u = e[De],
            c = e.r;0 > l && (o += l, l = -l), 0 > u && (s += u, u = -u), typeof c === U ? n = i = r = a = c : c instanceof Array ? 1 === c[we] ? n = i = r = a = c[0] : 2 === c[we] ? (n = r = c[0], i = a = c[1]) : 3 === c[we] ? (n = c[0], i = a = c[1], r = c[2]) : (n = c[0], i = c[1], r = c[2], a = c[3]) : n = i = r = a = 0;var h;n + i > l && (h = n + i, n *= l / h, i *= l / h), r + a > l && (h = r + a, r *= l / h, a *= l / h), i + r > u && (h = i + r, i *= u / h, r *= u / h), n + a > u && (h = n + a, n *= u / h, a *= u / h), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.quadraticCurveTo(o + l, s, o + l, s + i), t.lineTo(o + l, s + u - r), 0 !== r && t.quadraticCurveTo(o + l, s + u, o + l - r, s + u), t.lineTo(o + a, s + u), 0 !== a && t.quadraticCurveTo(o, s + u, o, s + u - a), t.lineTo(o, s + n), 0 !== n && t.quadraticCurveTo(o, s, o + n, s);
      } };
  }), e("zrender/graphic/Gradient", [Ze], function () {
    var t = function (t) {
      this[ve] = t || [];
    };return t[Re] = { constructor: t, addColorStop: function (t, e) {
        this[ve].push({ offset: t, color: e });
      } }, t;
  }), e("zrender/animation/Animation", [Ze, "../core/util", "../core/event", "./requestAnimationFrame", "./Animator"], function (t) {
    var e = t("../core/util"),
        n = t("../core/event").Dispatcher,
        i = t("./requestAnimationFrame"),
        r = t("./Animator"),
        a = function (t) {
      t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, n.call(this);
    };return a[Re] = { constructor: a, addClip: function (t) {
        this._clips.push(t);
      }, addAnimator: function (t) {
        t[Ie] = this;for (var e = t.getClips(), n = 0; n < e[we]; n++) this.addClip(e[n]);
      }, removeClip: function (t) {
        var n = e[be](this._clips, t);n >= 0 && this._clips[ae](n, 1);
      }, removeAnimator: function (t) {
        for (var e = t.getClips(), n = 0; n < e[we]; n++) this.removeClip(e[n]);t[Ie] = null;
      }, _update: function () {
        for (var t = new Date().getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n[we], r = [], a = [], o = 0; i > o; o++) {
          var s = n[o],
              l = s.step(t, e);l && (r.push(l), a.push(s));
        }for (var o = 0; i > o;) n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;i = r[we];for (var o = 0; i > o; o++) a[o].fire(r[o]);this._time = t, this.onframe(e), this[ue]("frame", e), this.stage[ge] && this.stage[ge]();
      }, _startLoop: function () {
        function t() {
          e._running && (i(t), !e._paused && e._update());
        }var e = this;this._running = !0, i(t);
      }, start: function () {
        this._time = new Date().getTime(), this._pausedTime = 0, this._startLoop();
      }, stop: function () {
        this._running = !1;
      }, pause: function () {
        this._paused || (this._pauseStart = new Date().getTime(), this._paused = !0);
      }, resume: function () {
        this._paused && (this._pausedTime += new Date().getTime() - this._pauseStart, this._paused = !1);
      }, clear: function () {
        this._clips = [];
      }, animate: function (t, e) {
        e = e || {};var n = new r(t, e.loop, e.getter, e.setter);return this.addAnimator(n), n;
      } }, e.mixin(a, n), a;
  }), e("zrender/Storage", [Ze, "./core/util", "./core/env", "./container/Group", "./core/timsort"], function (t) {
    function e(t, e) {
      return t[K] === e[K] ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t[K] - e[K];
    }var i = t("./core/util"),
        r = t("./core/env"),
        a = t("./container/Group"),
        o = t("./core/timsort"),
        s = function () {
      this._roots = [], this._displayList = [], this._displayListLen = 0;
    };return s[Re] = { constructor: s, traverse: function (t, e) {
        for (var n = 0; n < this._roots[we]; n++) this._roots[n][te](t, e);
      }, getDisplayList: function (t, e) {
        return e = e || !1, t && this.updateDisplayList(e), this._displayList;
      }, updateDisplayList: function (t) {
        this._displayListLen = 0;for (var n = this._roots, i = this._displayList, a = 0, s = n[we]; s > a; a++) this._updateAndAddDisplayable(n[a], null, t);i[we] = this._displayListLen, r.canvasSupported && o(i, e);
      }, _updateAndAddDisplayable: function (t, e, i) {
        if (!t[Se] || i) {
          t.beforeUpdate(), t[n] && t[ge](), t.afterUpdate();var r = t.clipPath;if (r) {
            e = e ? e.slice() : [];for (var a = r, o = t; a;) a[Q] = o, a.updateTransform(), e.push(a), o = a, a = a.clipPath;
          }if (t.isGroup) {
            for (var s = t._children, l = 0; l < s[we]; l++) {
              var u = s[l];t[n] && (u[n] = !0), this._updateAndAddDisplayable(u, e, i);
            }t[n] = !1;
          } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t;
        }
      }, addRoot: function (t) {
        t.__storage !== this && (t instanceof a && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t));
      }, delRoot: function (t) {
        if (null == t) {
          for (var e = 0; e < this._roots[we]; e++) {
            var n = this._roots[e];n instanceof a && n.delChildrenFromStorage(this);
          }return this._roots = [], this._displayList = [], void (this._displayListLen = 0);
        }if (t instanceof Array) for (var e = 0, r = t[we]; r > e; e++) this.delRoot(t[e]);else {
          var o = i[be](this._roots, t);o >= 0 && (this.delFromStorage(t), this._roots[ae](o, 1), t instanceof a && t.delChildrenFromStorage(this));
        }
      }, addToStorage: function (t) {
        return t.__storage = this, t.dirty(!1), this;
      }, delFromStorage: function (t) {
        return t && (t.__storage = null), this;
      }, dispose: function () {
        this._renderList = this._roots = null;
      }, displayableSortFunc: e }, s;
  }), e("zrender/dom/HandlerProxy", [Ze, "../core/event", "../core/util", "../mixin/Eventful", "../core/env", "../core/GestureMgr"], function (t) {
    function e(t) {
      return "mousewheel" === t && c.browser.firefox ? "DOMMouseScroll" : t;
    }function n(t, e, n) {
      var i = t._gestureMgr;"start" === n && i.clear();var r = i.recognize(e, t.handler.findHover(e.zrX, e.zrY, null).target, t.dom);if ("end" === n && i.clear(), r) {
        var a = r.type;e.gestureEvent = a, t.handler.dispatchToElement({ target: r.target }, a, r.event);
      }
    }function i(t) {
      t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function () {
        t._touching = !1;
      }, 700);
    }function r(t) {
      var e = t.pointerType;return "pen" === e || "touch" === e;
    }function a(t) {
      function e(t, e) {
        return function () {
          return e._touching ? void 0 : t.apply(e, arguments);
        };
      }l.each(g, function (e) {
        t._handlers[e] = l.bind(_[e], t);
      }), l.each(x, function (e) {
        t._handlers[e] = l.bind(_[e], t);
      }), l.each(v, function (n) {
        t._handlers[n] = e(_[n], t);
      });
    }function o(t) {
      function n(n, i) {
        l.each(n, function (n) {
          d(t, e(n), i._handlers[n]);
        }, i);
      }u.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._gestureMgr = new h(), this._handlers = {}, a(this), c.pointerEventsSupported ? n(x, this) : (c.touchEventsSupported && n(g, this), n(v, this));
    }var s = t("../core/event"),
        l = t("../core/util"),
        u = t("../mixin/Eventful"),
        c = t("../core/env"),
        h = t("../core/GestureMgr"),
        d = s.addEventListener,
        f = s.removeEventListener,
        p = s.normalizeEvent,
        m = 300,
        v = ["click", "dblclick", "mousewheel", ie, "mouseup", "mousedown", "mousemove", "contextmenu"],
        g = ["touchstart", "touchend", "touchmove"],
        y = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 },
        x = l.map(v, function (t) {
      var e = t[$]("mouse", "pointer");return y[e] ? e : t;
    }),
        _ = { mousemove: function (t) {
        t = p(this.dom, t), this[ue]("mousemove", t);
      }, mouseout: function (t) {
        t = p(this.dom, t);var e = t.toElement || t.relatedTarget;if (e != this.dom) for (; e && 9 != e.nodeType;) {
          if (e === this.dom) return;e = e.parentNode;
        }this[ue](ie, t);
      }, touchstart: function (t) {
        t = p(this.dom, t), t.zrByTouch = !0, this._lastTouchMoment = new Date(), n(this, t, "start"), _.mousemove.call(this, t), _.mousedown.call(this, t), i(this);
      }, touchmove: function (t) {
        t = p(this.dom, t), t.zrByTouch = !0, n(this, t, "change"), _.mousemove.call(this, t), i(this);
      }, touchend: function (t) {
        t = p(this.dom, t), t.zrByTouch = !0, n(this, t, "end"), _.mouseup.call(this, t), +new Date() - this._lastTouchMoment < m && _.click.call(this, t), i(this);
      }, pointerdown: function (t) {
        _.mousedown.call(this, t);
      }, pointermove: function (t) {
        r(t) || _.mousemove.call(this, t);
      }, pointerup: function (t) {
        _.mouseup.call(this, t);
      }, pointerout: function (t) {
        r(t) || _[ie].call(this, t);
      } };l.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
      _[t] = function (e) {
        e = p(this.dom, e), this[ue](t, e);
      };
    });var b = o[Re];return b[oe] = function () {
      for (var t = v[pe](g), n = 0; n < t[we]; n++) {
        var i = t[n];f(this.dom, e(i), this._handlers[i]);
      }
    }, b.setCursor = function (t) {
      this.dom.style.cursor = t || "default";
    }, l.mixin(o, u), o;
  }), e("echarts/coord/axisDefault", [Ze, Fe], function (t) {
    var e = t(Fe),
        n = { show: !0, zlevel: 0, z: 0, inverse: !1, name: "", nameLocation: "end", nameRotate: null, nameTruncate: { maxWidth: null, ellipsis: "...", placeholder: "." }, nameTextStyle: {}, nameGap: 15, silent: !1, triggerEvent: !1, tooltip: { show: !1 }, axisPointer: {}, axisLine: { show: !0, onZero: !0, lineStyle: { color: "#333", width: 1, type: "solid" } }, axisTick: { show: !0, inside: !1, length: 5, lineStyle: { width: 1 } }, axisLabel: { show: !0, inside: !1, rotate: 0, showMinLabel: null, showMaxLabel: null, margin: 8, textStyle: { fontSize: 12 } }, splitLine: { show: !0, lineStyle: { color: ["#ccc"], width: 1, type: "solid" } }, splitArea: { show: !1, areaStyle: { color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"] } } },
        i = e.merge({ boundaryGap: !0, splitLine: { show: !1 }, axisTick: { alignWithLabel: !1, interval: "auto" }, axisLabel: { interval: "auto" } }, n),
        r = e.merge({ boundaryGap: [0, 0], splitNumber: 5 }, n),
        a = e[ce]({ scale: !0, min: "dataMin", max: "dataMax" }, r),
        o = e[ce]({ scale: !0, logBase: 10 }, r);return { categoryAxis: i, valueAxis: r, timeAxis: a, logAxis: o };
  }), e("zrender/Handler", [Ze, "./core/util", "./mixin/Draggable", "./mixin/Eventful"], function (t) {
    function e(t, e, n) {
      return { type: t, event: n, target: e.target, topTarget: e.topTarget, cancelBubble: !1, offsetX: n.zrX, offsetY: n.zrY, gestureEvent: n.gestureEvent, pinchX: n.pinchX, pinchY: n.pinchY, pinchScale: n.pinchScale, wheelDelta: n.zrDelta, zrByTouch: n.zrByTouch };
    }function n() {}function i(t, e, n) {
      if (t[t.rectHover ? "rectContain" : G](e, n)) {
        for (var i, r = t; r;) {
          if (r.clipPath && !r.clipPath[G](e, n)) return !1;r.silent && (i = !0), r = r[Q];
        }return i ? s : !0;
      }return !1;
    }var r = t("./core/util"),
        a = t("./mixin/Draggable"),
        o = t("./mixin/Eventful"),
        s = "silent";n[Re][oe] = function () {};var l = ["click", "dblclick", "mousewheel", ie, "mouseup", "mousedown", "mousemove", "contextmenu"],
        u = function (t, e, i, s) {
      o.call(this), this.storage = t, this.painter = e, this.painterRoot = s, i = i || new n(), this.proxy = i, i.handler = this, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, a.call(this), r.each(l, function (t) {
        i.on && i.on(t, this[t], this);
      }, this);
    };return u[Re] = { constructor: u, mousemove: function (t) {
        var e = t.zrX,
            n = t.zrY,
            i = this._hovered,
            r = this._hovered = this.findHover(e, n),
            a = r.target,
            o = i.target,
            s = this.proxy;s.setCursor && s.setCursor(a ? a.cursor : "default"), o && a !== o && o.__zr && this.dispatchToElement(i, ie, t), this.dispatchToElement(r, "mousemove", t), a && a !== o && this.dispatchToElement(r, re, t);
      }, mouseout: function (t) {
        this.dispatchToElement(this._hovered, ie, t);var e,
            n = t.toElement || t.relatedTarget;do n = n && n.parentNode; while (n && 9 != n.nodeType && !(e = n === this.painterRoot));!e && this[ue]("globalout", { event: t });
      }, resize: function () {
        this._hovered = {};
      }, dispatch: function (t, e) {
        var n = this[t];n && n.call(this, e);
      }, dispose: function () {
        this.proxy[oe](), this.storage = this.proxy = this.painter = null;
      }, setCursorStyle: function (t) {
        var e = this.proxy;e.setCursor && e.setCursor(t);
      }, dispatchToElement: function (t, n, i) {
        t = t || {};for (var r = "on" + n, a = e(n, t, i), o = t.target; o && (o[r] && (a.cancelBubble = o[r].call(o, a)), o[ue](n, a), o = o[Q], !a.cancelBubble););a.cancelBubble || (this[ue](n, a), this.painter && this.painter.eachOtherLayer(function (t) {
          typeof t[r] == j && t[r].call(t, a), t[ue] && t[ue](n, a);
        }));
      }, findHover: function (t, e, n) {
        for (var r = this.storage.getDisplayList(), a = {}, o = r[we] - 1; o >= 0; o--) {
          var l;if (r[o] !== n && !r[o][Se] && (l = i(r[o], t, e)) && (!a.topTarget && (a.topTarget = r[o]), l !== s)) {
            a.target = r[o];break;
          }
        }return a;
      } }, r.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
      u[Re][t] = function (e) {
        var n = this.findHover(e.zrX, e.zrY),
            i = n.target;if ("mousedown" === t) this._downel = i, this._upel = i;else if ("mosueup" === t) this._upel = i;else if ("click" === t && this._downel !== this._upel) return;this.dispatchToElement(n, t, e);
      };
    }), r.mixin(u, o), r.mixin(u, a), u;
  }), e("zrender/Painter", [Ze, "./config", "./core/util", "./core/log", "./core/BoundingRect", "./core/timsort", "./Layer", "./animation/requestAnimationFrame", "./graphic/Image"], function (t) {
    function e(t) {
      return parseInt(t, 10);
    }function o(t) {
      return t ? t.__builtin__ ? !0 : typeof t.resize !== j || typeof t.refresh !== j ? !1 : !0 : !1;
    }function s(t) {
      t.__unusedCount++;
    }function l(t) {
      1 == t.__unusedCount && t.clear();
    }function c(t, e, n) {
      return M.copy(t[a]()), t.transform && M[r](t.transform), S.width = e, S[De] = n, !M.intersect(S);
    }function h(t, e) {
      if (t == e) return !1;if (!t || !e || t[we] !== e[we]) return !0;for (var n = 0; n < t[we]; n++) if (t[n] !== e[n]) return !0;
    }function d(t, e) {
      for (var n = 0; n < t[we]; n++) {
        var i = t[n];i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e);
      }
    }function f(t, e) {
      var n = document.createElement("div");return n.style.cssText = ["position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", n;
    }var p = t("./config"),
        m = t("./core/util"),
        g = t("./core/log"),
        y = t("./core/BoundingRect"),
        x = t("./core/timsort"),
        _ = t("./Layer"),
        b = t("./animation/requestAnimationFrame"),
        w = 5,
        M = new y(0, 0, 0, 0),
        S = new y(0, 0, 0, 0),
        P = function (t, e, n) {
      var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();this._opts = n = m[he]({}, n || {}), this.dpr = n.devicePixelRatio || p.devicePixelRatio, this._singleCanvas = i, this.root = t;var r = t.style;r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;var a = this._zlevelList = [],
          o = this._layers = {};if (this._layerConfig = {}, i) {
        null != n.width && (t.width = n.width), null != n[De] && (t[De] = n[De]);var s = t.width,
            l = t[De];this._width = s, this._height = l;var u = new _(t, this, 1);u.initContext(), o[0] = u, a.push(0), this._domRoot = t;
      } else {
        this._width = this._getSize(0), this._height = this._getSize(1);var c = this._domRoot = f(this._width, this._height);t.appendChild(c);
      }this._progressiveLayers = [], this._hoverlayer, this._hoverElements = [];
    };return P[Re] = { constructor: P, isSingleCanvas: function () {
        return this._singleCanvas;
      }, getViewportRoot: function () {
        return this._domRoot;
      }, refresh: function (t) {
        var e = this.storage.getDisplayList(!0),
            n = this._zlevelList;this._paintList(e, t);for (var i = 0; i < n[we]; i++) {
          var r = n[i],
              a = this._layers[r];!a.__builtin__ && a.refresh && a.refresh();
        }return this.refreshHover(), this._progressiveLayers[we] && this._startProgessive(), this;
      }, addHover: function (t, e) {
        if (!t.__hoverMir) {
          var n = new t.constructor({ style: t.style, shape: t.shape });n.__from = t, t.__hoverMir = n, n[J](e), this._hoverElements.push(n);
        }
      }, removeHover: function (t) {
        var e = t.__hoverMir,
            n = this._hoverElements,
            i = m[be](n, e);i >= 0 && n[ae](i, 1), t.__hoverMir = null;
      }, clearHover: function () {
        for (var t = this._hoverElements, e = 0; e < t[we]; e++) {
          var n = t[e].__from;n && (n.__hoverMir = null);
        }t[we] = 0;
      }, refreshHover: function () {
        var t = this._hoverElements,
            e = t[we],
            n = this._hoverlayer;if (n && n.clear(), e) {
          x(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(1e5));var i = {};n.ctx.save();for (var r = 0; e > r;) {
            var a = t[r],
                o = a.__from;o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t[ae](r, 1), o.__hoverMir = null, e--);
          }n.ctx.restore();
        }
      }, _startProgessive: function () {
        function t() {
          n === e._progressiveToken && e.storage && (e._doPaintList(e.storage.getDisplayList()), e._furtherProgressive ? (e._progress++, b(t)) : e._progressiveToken = -1);
        }var e = this;if (e._furtherProgressive) {
          var n = e._progressiveToken = +new Date();e._progress++, b(t);
        }
      }, _clearProgressive: function () {
        this._progressiveToken = -1, this._progress = 0, m.each(this._progressiveLayers, function (t) {
          t[n] && t.clear();
        });
      }, _paintList: function (t, e) {
        null == e && (e = !1), this._updateLayerStatus(t), this._clearProgressive(), this.eachBuiltinLayer(s), this._doPaintList(t, e), this.eachBuiltinLayer(l);
      }, _doPaintList: function (t, e) {
        function i(t) {
          var e = o.dpr || 1;o.save(), o.globalAlpha = 1, o.shadowBlur = 0, r[n] = !0, o.setTransform(1, 0, 0, 1, 0, 0), o.drawImage(t.dom, 0, 0, h * e, d * e), o.restore();
        }for (var r, a, o, s, l, u, c = 0, h = this._width, d = this._height, f = this._progress, p = 0, v = t[we]; v > p; p++) {
          var y = t[p],
              x = this._singleCanvas ? 0 : y[K],
              _ = y.__frame;if (0 > _ && l && (i(l), l = null), a !== x && (o && o.restore(), s = {}, a = x, r = this.getLayer(a), r.__builtin__ || g("ZLevel " + a + " has been used by unkown layer " + r.id), o = r.ctx, o.save(), r.__unusedCount = 0, (r[n] || e) && r.clear()), r[n] || e) {
            if (_ >= 0) {
              if (!l) {
                if (l = this._progressiveLayers[Math.min(c++, w - 1)], l.ctx.save(), l.renderScope = {}, l && l.__progress > l.__maxProgress) {
                  p = l.__nextIdxNotProg - 1;continue;
                }u = l.__progress, l[n] || (f = u), l.__progress = f + 1;
              }_ === f && this._doPaintEl(y, l, !0, l.renderScope);
            } else this._doPaintEl(y, r, e, s);y[n] = !1;
          }
        }l && i(l), o && o.restore(), this._furtherProgressive = !1, m.each(this._progressiveLayers, function (t) {
          t.__maxProgress >= t.__progress && (this._furtherProgressive = !0);
        }, this);
      }, _doPaintEl: function (t, e, i, r) {
        var a = e.ctx,
            o = t.transform;if (!(!e[n] && !i || t.invisible || 0 === t.style[v] || o && !o[0] && !o[3] || t.culling && c(t, this._width, this._height))) {
          var s = t.__clipPaths;(r.prevClipLayer !== e || h(s, r.prevElClipPaths)) && (r.prevElClipPaths && (r.prevClipLayer.ctx.restore(), r.prevClipLayer = r.prevElClipPaths = null, r.prevEl = null), s && (a.save(), d(s, a), r.prevClipLayer = e, r.prevElClipPaths = s)), t.beforeBrush && t.beforeBrush(a), t.brush(a, r.prevEl || null), r.prevEl = t, t.afterBrush && t.afterBrush(a);
        }
      }, getLayer: function (t) {
        if (this._singleCanvas) return this._layers[0];var e = this._layers[t];return e || (e = new _("zr_" + t, this, this.dpr), e.__builtin__ = !0, this._layerConfig[t] && m.merge(e, this._layerConfig[t], !0), this.insertLayer(t, e), e.initContext()), e;
      }, insertLayer: function (t, e) {
        var n = this._layers,
            i = this._zlevelList,
            r = i[we],
            a = null,
            s = -1,
            l = this._domRoot;if (n[t]) return void g("ZLevel " + t + " has been used already");if (!o(e)) return void g("Layer of zlevel " + t + " is not valid");if (r > 0 && t > i[0]) {
          for (s = 0; r - 1 > s && !(i[s] < t && i[s + 1] > t); s++);a = n[i[s]];
        }if (i[ae](s + 1, 0, t), n[t] = e, !e.virtual) if (a) {
          var u = a.dom;u.nextSibling ? l.insertBefore(e.dom, u.nextSibling) : l.appendChild(e.dom);
        } else l.firstChild ? l.insertBefore(e.dom, l.firstChild) : l.appendChild(e.dom);
      }, eachLayer: function (t, e) {
        var n,
            i,
            r = this._zlevelList;for (i = 0; i < r[we]; i++) n = r[i], t.call(e, this._layers[n], n);
      }, eachBuiltinLayer: function (t, e) {
        var n,
            i,
            r,
            a = this._zlevelList;for (r = 0; r < a[we]; r++) i = a[r], n = this._layers[i], n.__builtin__ && t.call(e, n, i);
      }, eachOtherLayer: function (t, e) {
        var n,
            i,
            r,
            a = this._zlevelList;for (r = 0; r < a[we]; r++) i = a[r], n = this._layers[i], n.__builtin__ || t.call(e, n, i);
      }, getLayers: function () {
        return this._layers;
      }, _updateLayerStatus: function (t) {
        var e = this._layers,
            i = this._progressiveLayers,
            r = {},
            a = {};this.eachBuiltinLayer(function (t, e) {
          r[e] = t.elCount, t.elCount = 0, t[n] = !1;
        }), m.each(i, function (t, e) {
          a[e] = t.elCount, t.elCount = 0, t[n] = !1;
        });for (var o, s, l = 0, u = 0, c = 0, h = t[we]; h > c; c++) {
          var d = t[c],
              f = this._singleCanvas ? 0 : d[K],
              p = e[f],
              v = d.progressive;if (p && (p.elCount++, p[n] = p[n] || d[n]), v >= 0) {
            s !== v && (s = v, u++);var g = d.__frame = u - 1;if (!o) {
              var y = Math.min(l, w - 1);o = i[y], o || (o = i[y] = new _("progressive", this, this.dpr), o.initContext()), o.__maxProgress = 0;
            }o[n] = o[n] || d[n], o.elCount++, o.__maxProgress = Math.max(o.__maxProgress, g), o.__maxProgress >= o.__progress && (p[n] = !0);
          } else d.__frame = -1, o && (o.__nextIdxNotProg = c, l++, o = null);
        }o && (l++, o.__nextIdxNotProg = c), this.eachBuiltinLayer(function (t, e) {
          r[e] !== t.elCount && (t[n] = !0);
        }), i[we] = Math.min(l, w), m.each(i, function (t, e) {
          a[e] !== t.elCount && (d[n] = !0), t[n] && (t.__progress = 0);
        });
      }, clear: function () {
        return this.eachBuiltinLayer(this._clearLayer), this;
      }, _clearLayer: function (t) {
        t.clear();
      }, configLayer: function (t, e) {
        if (e) {
          var n = this._layerConfig;n[t] ? m.merge(n[t], e, !0) : n[t] = e;var i = this._layers[t];i && m.merge(i, n[t], !0);
        }
      }, delLayer: function (t) {
        var e = this._layers,
            n = this._zlevelList,
            i = e[t];i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n[ae](m[be](n, t), 1));
      }, resize: function (t, e) {
        var n = this._domRoot;n.style.display = "none";var i = this._opts;if (null != t && (i.width = t), null != e && (i[De] = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width != t || e != this._height) {
          n.style.width = t + "px", n.style[De] = e + "px";for (var r in this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);m.each(this._progressiveLayers, function (n) {
            n.resize(t, e);
          }), this.refresh(!0);
        }return this._width = t, this._height = e, this;
      }, clearLayer: function (t) {
        var e = this._layers[t];e && e.clear();
      }, dispose: function () {
        this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
      }, getRenderedCanvas: function (t) {
        function e(t, e) {
          var i = o._zlevelList;null == t && (t = -1 / 0);for (var r, a = 0; a < i[we]; a++) {
            var s = i[a],
                l = o._layers[s];if (!l.__builtin__ && s > t && e > s) {
              r = l;break;
            }
          }r && r.renderToCanvas && (n.ctx.save(), r.renderToCanvas(n.ctx), n.ctx.restore());
        }if (t = t || {}, this._singleCanvas) return this._layers[0].dom;var n = new _("image", this, t.pixelRatio || this.dpr);n.initContext(), n.clearColor = t.backgroundColor, n.clear();for (var i, r = this.storage.getDisplayList(!0), a = {}, o = this, s = 0; s < r[we]; s++) {
          var l = r[s];l[K] !== i && (e(i, l[K]), i = l[K]), this._doPaintEl(l, n, !0, a);
        }return e(i, 1 / 0), n.dom;
      }, getWidth: function () {
        return this._width;
      }, getHeight: function () {
        return this._height;
      }, _getSize: function (t) {
        var n = this._opts,
            i = ["width", De][t],
            r = ["clientWidth", "clientHeight"][t],
            a = ["paddingLeft", "paddingTop"][t],
            o = ["paddingRight", "paddingBottom"][t];if (null != n[i] && "auto" !== n[i]) return parseFloat(n[i]);var s = this.root,
            l = document.defaultView.getComputedStyle(s);return (s[r] || e(l[i]) || e(s.style[i])) - (e(l[a]) || 0) - (e(l[o]) || 0) | 0;
      }, pathToImage: function (e, n) {
        n = n || this.dpr;var r = document.createElement(ze),
            o = r[N]("2d"),
            s = e[a](),
            l = e.style,
            c = l.shadowBlur,
            h = l.shadowOffsetX,
            d = l.shadowOffsetY,
            f = l.hasStroke() ? l[i] : 0,
            p = Math.max(f / 2, -h + c),
            m = Math.max(f / 2, h + c),
            v = Math.max(f / 2, -d + c),
            g = Math.max(f / 2, d + c),
            y = s.width + p + m,
            x = s[De] + v + g;r.width = y * n, r[De] = x * n, o.scale(n, n), o.clearRect(0, 0, y, x), o.dpr = n;var _ = { position: e[A], rotation: e[u], scale: e.scale };e[A] = [p - s.x, v - s.y], e[u] = 0, e.scale = [1, 1], e.updateTransform(), e && e.brush(o);var b = t("./graphic/Image"),
            w = new b({ style: { x: 0, y: 0, image: r } });return null != _[A] && (w[A] = e[A] = _[A]), null != _[u] && (w[u] = e[u] = _[u]), null != _.scale && (w.scale = e.scale = _.scale), w;
      } }, P;
  }), e("echarts/component/dataZoom/AxisProxy", [Ze, Fe, "../../util/number", Ne], function (t) {
    function e(t, e, i) {
      var r = [1 / 0, -1 / 0];return u(i, function (t) {
        var n = t[Ve]();n && u(t[_](e), function (t) {
          var e = n[B](t);e[0] < r[0] && (r[0] = e[0]), e[1] > r[1] && (r[1] = e[1]);
        });
      }), r[1] < r[0] && (r = [0 / 0, 0 / 0]), n(t, r), r;
    }function n(t, e) {
      var n = t.getAxisModel(),
          i = n.getMin(!0),
          r = n.get("type") === x,
          a = r && (n.get("data") || [])[we];null != i && "dataMin" !== i ? e[0] = i : r && (e[0] = a > 0 ? 0 : 0 / 0);var o = n.getMax(!0);return null != o && "dataMax" !== o ? e[1] = o : r && (e[1] = a > 0 ? a - 1 : 0 / 0), n.get("scale", !0) || (e[0] > 0 && (e[0] = 0), e[1] < 0 && (e[1] = 0)), e;
    }function i(t, e) {
      var n = t.getAxisModel(),
          i = t._percentWindow,
          r = t._valueWindow;if (i) {
        var a = o.getPixelPrecision(r, [0, 500]),
            s = e || 0 === i[0] && 100 === i[1];n.setRange(s ? null : +r[0].toFixed(a), s ? null : +r[1].toFixed(a));
      }
    }function r(t) {
      var e = t._minMaxSpan = {},
          n = t._dataZoomModel;u(["min", "max"], function (i) {
        e[i + "Span"] = n.get(i + "Span");var r = n.get(i + "ValueSpan");null != r && (e[i + "ValueSpan"] = r, r = t.getAxisModel().axis.scale.parse(r), null != r && (e[i + "Span"] = o.linearMap(r, t._dataExtent, [0, 100], !0)));
      });
    }var a = t(Fe),
        o = t("../../util/number"),
        s = t(Ne),
        u = a.each,
        c = o.asc,
        h = function (t, e, n, i) {
      this._dimName = t, this._axisIndex = e, this._valueWindow, this._percentWindow, this._dataExtent, this._minMaxSpan, this[F] = i, this._dataZoomModel = n;
    };return h[Re] = { constructor: h, hostedBy: function (t) {
        return this._dataZoomModel === t;
      }, getDataValueWindow: function () {
        return this._valueWindow.slice();
      }, getDataPercentWindow: function () {
        return this._percentWindow.slice();
      }, getTargetSeriesModels: function () {
        var t = [],
            e = this[F];return e[me](function (n) {
          if (s.isCoordSupported(n.get(_e))) {
            var i = this._dimName,
                r = e.queryComponents({ mainType: i + "Axis", index: n.get(i + "AxisIndex"), id: n.get(i + "AxisId") })[0];this._axisIndex === (r && r[se]) && t.push(n);
          }
        }, this), t;
      }, getAxisModel: function () {
        return this[F].getComponent(this._dimName + "Axis", this._axisIndex);
      }, getOtherAxisModel: function () {
        var t,
            e,
            n = this._dimName,
            i = this[F],
            r = this.getAxisModel(),
            a = "x" === n || "y" === n;a ? (e = "gridIndex", t = "x" === n ? "y" : "x") : (e = "polarIndex", t = "angle" === n ? "radius" : "angle");var o;return i[Ae](t + "Axis", function (t) {
          (t.get(e) || 0) === (r.get(e) || 0) && (o = t);
        }), o;
      }, getMinMaxSpan: function () {
        return a.clone(this._minMaxSpan);
      }, calculateDataWindow: function (t) {
        var e = this._dataExtent,
            n = this.getAxisModel(),
            i = n.axis.scale,
            r = this._dataZoomModel.getRangePropMode(),
            a = [0, 100],
            s = [t.start, t.end],
            l = [];return u(["startValue", "endValue"], function (e) {
          l.push(null != t[e] ? i.parse(t[e]) : null);
        }), u([0, 1], function (t) {
          var n = l[t],
              u = s[t];"percent" === r[t] ? (null == u && (u = a[t]), n = i.parse(o.linearMap(u, a, e, !0))) : u = o.linearMap(n, e, a, !0), l[t] = n, s[t] = u;
        }), { valueWindow: c(l), percentWindow: c(s) };
      }, reset: function (t) {
        if (t === this._dataZoomModel) {
          this._dataExtent = e(this, this._dimName, this.getTargetSeriesModels());var n = this.calculateDataWindow(t[l]);this._valueWindow = n.valueWindow, this._percentWindow = n.percentWindow, r(this), i(this);
        }
      }, restore: function (t) {
        t === this._dataZoomModel && (this._valueWindow = this._percentWindow = null, i(this, !0));
      }, filterData: function (t) {
        function e(t) {
          return t >= a[0] && t <= a[1];
        }if (t === this._dataZoomModel) {
          var n = this._dimName,
              i = this.getTargetSeriesModels(),
              r = t.get("filterMode"),
              a = this._valueWindow;if ("none" !== r) {
            var o = this.getOtherAxisModel();t.get("$fromToolbox") && o && o.get("type") === x && (r = "empty"), u(i, function (t) {
              var i = t[Ve](),
                  o = t[_](n);"weakFilter" === r ? i && i.filterSelf(function (t) {
                for (var e, n, r, s = 0; s < o[we]; s++) {
                  var l = i.get(o[s], t),
                      u = !isNaN(l),
                      c = l < a[0],
                      h = l > a[1];if (u && !c && !h) return !0;u && (r = !0), c && (e = !0), h && (n = !0);
                }return r && e && n;
              }) : i && u(o, function (n) {
                "empty" === r ? t.setData(i.map(n, function (t) {
                  return e(t) ? t : 0 / 0;
                })) : i.filterSelf(n, e);
              });
            });
          }
        }
      } }, h;
  }), e("echarts/component/dataZoom/helper", [Ze, "../../util/format", Fe], function (t) {
    var e = t("../../util/format"),
        n = t(Fe),
        i = {},
        r = ["x", "y", "z", "radius", "angle", "single"],
        a = ["cartesian2d", "polar", "singleAxis"];return i.isCoordSupported = function (t) {
      return n[be](a, t) >= 0;
    }, i.createNameEach = function (t, i) {
      t = t.slice();var r = n.map(t, e.capitalFirst);i = (i || []).slice();var a = n.map(i, e.capitalFirst);return function (e, o) {
        n.each(t, function (t, n) {
          for (var s = { name: t, capital: r[n] }, l = 0; l < i[we]; l++) s[i[l]] = t + a[l];e.call(o, s);
        });
      };
    }, i.eachAxisDim = i.createNameEach(r, ["axisIndex", "axis", "index", "id"]), i.createLinkedNodesFinder = function (t, e, i) {
      function r(t, e) {
        return n[be](e.nodes, t) >= 0;
      }function a(t, r) {
        var a = !1;return e(function (e) {
          n.each(i(t, e) || [], function (t) {
            r.records[e.name][t] && (a = !0);
          });
        }), a;
      }function o(t, r) {
        r.nodes.push(t), e(function (e) {
          n.each(i(t, e) || [], function (t) {
            r.records[e.name][t] = !0;
          });
        });
      }return function (n) {
        function i(t) {
          !r(t, s) && a(t, s) && (o(t, s), l = !0);
        }var s = { nodes: [], records: {} };if (e(function (t) {
          s.records[t.name] = {};
        }), !n) return s;o(n, s);var l;do l = !1, t(i); while (l);return s;
      };
    }, i;
  }), e("echarts/chart/bar/BaseBarSeries", [Ze, "../../model/Series", "../helper/createListFromArray"], function (t) {
    var e = t("../../model/Series"),
        n = t("../helper/createListFromArray");return e[he]({ type: "series.__base_bar__", getInitialData: function (t, e) {
        return n(t.data, this, e);
      }, getMarkerPosition: function (t) {
        var e = this[_e];if (e) {
          var n = e.dataToPoint(t, !0),
              i = this[Ve](),
              r = i.getLayout(L),
              a = i.getLayout("size"),
              o = e.getBaseAxis().isHorizontal() ? 0 : 1;return n[o] += r + a / 2, n;
        }return [0 / 0, 0 / 0];
      }, defaultOption: { zlevel: 0, z: 2, coordinateSystem: "cartesian2d", legendHoverLink: !0, barMinHeight: 0, barMinAngle: 0, itemStyle: { normal: {}, emphasis: {} } } });
  }), e("zrender/mixin/Draggable", [Ze], function () {
    function t() {
      this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this);
    }function e(t, e) {
      return { target: t, topTarget: e && e.topTarget };
    }return t[Re] = { constructor: t, _dragStart: function (t) {
        var n = t.target;n && n.draggable && (this._draggingTarget = n, n.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(e(n, t), "dragstart", t.event));
      }, _drag: function (t) {
        var n = this._draggingTarget;if (n) {
          var i = t.offsetX,
              r = t.offsetY,
              a = i - this._x,
              o = r - this._y;this._x = i, this._y = r, n.drift(a, o, t), this.dispatchToElement(e(n, t), "drag", t.event);var s = this.findHover(i, r, n).target,
              l = this._dropTarget;this._dropTarget = s, n !== s && (l && s !== l && this.dispatchToElement(e(l, t), "dragleave", t.event), s && s !== l && this.dispatchToElement(e(s, t), "dragenter", t.event));
        }
      }, _dragEnd: function (t) {
        var n = this._draggingTarget;n && (n.dragging = !1), this.dispatchToElement(e(n, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(e(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
      } }, t;
  }), e("echarts/chart/helper/createListFromArray", [Ze, "../../data/List", "../../data/helper/completeDimensions", Fe, R, "../../CoordinateSystem"], function (t) {
    function e(t) {
      for (var e = 0; e < t[we] && null == t[e];) e++;return t[e];
    }function n(t) {
      var n = e(t);return null != n && !u[Y](d(n));
    }function i(t, e, i) {
      t = t || [];var r = e.get(_e),
          a = p[r],
          m = h.get(r),
          v = { encodeDef: e.get("encode"), dimsDef: e.get(X) },
          g = a && a(t, e, i, v),
          y = g && g[X];y || (y = m && (m.getDimensionsInfo ? m.getDimensionsInfo() : m[X].slice()) || ["x", "y"], y = l(y, t, v));var x = g ? g.categoryIndex : -1,
          _ = new s(y, e),
          b = o(g, t),
          w = {},
          M = x >= 0 && n(t) ? function (t, e, n, i) {
        return c.isDataItemOption(t) && (_.hasItemOption = !0), i === x ? n : f(d(t), y[i]);
      } : function (t, e, n, i) {
        var r = d(t),
            a = f(r && r[i], y[i]);c.isDataItemOption(t) && (_.hasItemOption = !0);var o = g && g.categoryAxesModels;return o && o[e] && typeof a === Oe && (w[e] = w[e] || o[e].getCategories(), a = u[be](w[e], a), 0 > a && !isNaN(a) && (a = +a)), a;
      };return _.hasItemOption = !1, _.initData(t, b, M), _;
    }function r(t) {
      return t !== x && "time" !== t;
    }function a(t) {
      return t === x ? S : "time" === t ? "time" : "float";
    }function o(t, e) {
      var n,
          i = [],
          r = t && t[X][t.categoryIndex];if (r && (n = t.categoryAxesModels[r.name]), n) {
        var a = n.getCategories();if (a) {
          var o = e[we];if (u[Y](e[0]) && e[0][we] > 1) {
            i = [];for (var s = 0; o > s; s++) i[s] = a[e[s][t.categoryIndex || 0]];
          } else i = a.slice(0);
        }
      }return i;
    }var s = t("../../data/List"),
        l = t("../../data/helper/completeDimensions"),
        u = t(Fe),
        c = t(R),
        h = t("../../CoordinateSystem"),
        d = c.getDataItemValue,
        f = c.converDataValue,
        p = { cartesian2d: function (t, e, n, i) {
        var o = u.map(["xAxis", "yAxis"], function (t) {
          return n.queryComponents({ mainType: t, index: e.get(t + "Index"), id: e.get(t + "Id") })[0];
        }),
            s = o[0],
            c = o[1],
            h = s.get("type"),
            d = c.get("type"),
            f = [{ name: "x", type: a(h), stackable: r(h) }, { name: "y", type: a(d), stackable: r(d) }],
            p = h === x,
            m = d === x;f = l(f, t, i);var v = {};return p && (v.x = s), m && (v.y = c), { dimensions: f, categoryIndex: p ? 0 : m ? 1 : -1, categoryAxesModels: v };
      }, singleAxis: function (t, e, n, i) {
        var o = n.queryComponents({ mainType: "singleAxis", index: e.get("singleAxisIndex"), id: e.get("singleAxisId") })[0],
            s = o.get("type"),
            u = s === x,
            c = [{ name: "single", type: a(s), stackable: r(s) }];c = l(c, t, i);var h = {};return u && (h.single = o), { dimensions: c, categoryIndex: u ? 0 : -1, categoryAxesModels: h };
      }, polar: function (t, e, n, i) {
        var o = n.queryComponents({ mainType: "polar", index: e.get("polarIndex"), id: e.get("polarId") })[0],
            s = o.findAxisModel("angleAxis"),
            u = o.findAxisModel("radiusAxis"),
            c = u.get("type"),
            h = s.get("type"),
            d = [{ name: "radius", type: a(c), stackable: r(c) }, { name: "angle", type: a(h), stackable: r(h) }],
            f = h === x,
            p = c === x;d = l(d, t, i);var m = {};return p && (m.radius = u), f && (m.angle = s), { dimensions: d, categoryIndex: f ? 1 : p ? 0 : -1, categoryAxesModels: m };
      }, geo: function (t, e, n, i) {
        return { dimensions: l([{ name: "lng" }, { name: "lat" }], t, i) };
      } };return i;
  }), e("zrender/animation/requestAnimationFrame", [Ze], function () {
    return typeof window !== o && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {
      setTimeout(t, 16);
    };
  }), e("zrender/core/event", [Ze, "../mixin/Eventful", "./env"], function (t) {
    function e(t) {
      return t.getBoundingClientRect ? t.getBoundingClientRect() : { left: 0, top: 0 };
    }function n(t, e, n, r) {
      return n = n || {}, r || !u.canvasSupported ? i(t, e, n) : u.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : i(t, e, n), n;
    }function i(t, n, i) {
      var r = e(t);i.zrX = n.clientX - r.left, i.zrY = n.clientY - r.top;
    }function r(t, e, i) {
      if (e = e || window.event, null != e.zrX) return e;var r = e.type,
          a = r && r[be]("touch") >= 0;if (a) {
        var o = "touchend" != r ? e.targetTouches[0] : e.changedTouches[0];o && n(t, o, e, i);
      } else n(t, e, e, i), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;return e;
    }function a(t, e, n) {
      c ? t.addEventListener(e, n) : t.attachEvent("on" + e, n);
    }function s(t, e, n) {
      c ? t.removeEventListener(e, n) : t.detachEvent("on" + e, n);
    }var l = t("../mixin/Eventful"),
        u = t("./env"),
        c = typeof window !== o && !!window.addEventListener,
        h = c ? function (t) {
      t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;
    } : function (t) {
      t.returnValue = !1, t.cancelBubble = !0;
    };return { clientToLocal: n, normalizeEvent: r, addEventListener: a, removeEventListener: s, stop: h, Dispatcher: l };
  }), e("echarts/data/helper/completeDimensions", [Ze, Fe, R], function (t) {
    function e(t, e, r) {
      function h(t, e, n) {
        u[e] ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, v.set(e, !0));
      }function d(t, e, n) {
        if (n || null != e.get(t)) {
          for (var i = 0; null != e.get(t + i);) i++;t += i;
        }return e.set(t, !0), t;
      }e = e || [], r = r || {}, t = (t || []).slice();var f = (r.dimsDef || []).slice(),
          p = i.createHashMap(r.encodeDef),
          m = i.createHashMap(),
          v = i.createHashMap(),
          g = [],
          y = r.dimCount;if (null == y) {
        var x = n(e[0]);y = Math.max(i[Y](x) && x[we] || 1, t[we], f[we]), a(t, function (t) {
          var e = t.dimsDef;e && (y = Math.max(y, e[we]));
        });
      }for (var _ = 0; y > _; _++) {
        var b = o(f[_]) ? { name: f[_] } : f[_] || {},
            w = b.name,
            M = g[_] = { otherDims: {} };null != w && null == m.get(w) && (M.name = M.tooltipName = w, m.set(w, _)), null != b.type && (M.type = b.type);
      }p.each(function (t, e) {
        t = p.set(e, l(t).slice()), a(t, function (n, i) {
          o(n) && (n = m.get(n)), null != n && y > n && (t[i] = n, h(g[n], e, i));
        });
      });var A = 0;a(t, function (t) {
        var e, t, n, r;o(t) ? (e = t, t = {}) : (e = t.name, t = i.clone(t), n = t.dimsDef, r = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null);var u = l(p.get(e));if (!u[we]) for (var c = 0; c < (n && n[we] || 1); c++) {
          for (; A < g[we] && null != g[A].coordDim;) A++;A < g[we] && u.push(A++);
        }a(u, function (i, a) {
          var o = g[i];h(s(o, t), e, a), null == o.name && n && (o.name = o.tooltipName = n[a]), r && s(o.otherDims, r);
        });
      });for (var P = r.extraPrefix || "value", T = 0; y > T; T++) {
        var M = g[T] = g[T] || {},
            C = M.coordDim;null == C && (M.coordDim = d(P, v, r.extraFromZero), M.coordDimIndex = 0, M.isExtraCoord = !0), null == M.name && (M.name = d(M.coordDim, m)), null == M.type && c(e, T) && (M.type = S);
      }return g;
    }function n(t) {
      return i[Y](t) ? t : i[Le](t) ? t.value : t;
    }var i = t(Fe),
        r = t(R),
        a = i.each,
        o = i[q],
        s = i[ce],
        l = r.normalizeToArray,
        u = { tooltip: 1, label: 1, itemName: 1 },
        c = e.guessOrdinal = function (t, e) {
      for (var r = 0, a = t[we]; a > r; r++) {
        var s = n(t[r]);if (!i[Y](s)) return !1;var s = s[e];if (null != s && isFinite(s)) return !1;if (o(s) && "-" !== s) return !0;
      }return !1;
    };return e;
  }), e("echarts/data/DataDiffer", [Ze], function () {
    function t(t) {
      return t;
    }function e(e, n, i, r) {
      this._old = e, this._new = n, this._oldKeyGetter = i || t, this._newKeyGetter = r || t;
    }function n(t, e, n, i) {
      for (var r = 0; r < t[we]; r++) {
        var a = "_ec_" + i(t[r], r),
            o = e[a];null == o ? (n.push(a), e[a] = r) : (o[we] || (e[a] = o = [o]), o.push(r));
      }
    }return e[Re] = { constructor: e, add: function (t) {
        return this._add = t, this;
      }, update: function (t) {
        return this._update = t, this;
      }, remove: function (t) {
        return this._remove = t, this;
      }, execute: function () {
        var t,
            e = this._old,
            i = this._new,
            r = this._oldKeyGetter,
            a = this._newKeyGetter,
            o = {},
            s = {},
            l = [],
            u = [];for (n(e, o, l, r), n(i, s, u, a), t = 0; t < e[we]; t++) {
          var c = l[t],
              h = s[c];if (null != h) {
            var d = h[we];d ? (1 === d && (s[c] = null), h = h.unshift()) : s[c] = null, this._update && this._update(h, t);
          } else this._remove && this._remove(t);
        }for (var t = 0; t < u[we]; t++) {
          var c = u[t];if (s.hasOwnProperty(c)) {
            var h = s[c];if (null == h) continue;if (h[we]) for (var f = 0, d = h[we]; d > f; f++) this._add && this._add(h[f]);else this._add && this._add(h);
          }
        }
      } }, e;
  }), e("zrender/core/GestureMgr", [Ze, "./event"], function (t) {
    function e(t) {
      var e = t[1][0] - t[0][0],
          n = t[1][1] - t[0][1];return Math.sqrt(e * e + n * n);
    }function n(t) {
      return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2];
    }var i = t("./event"),
        r = function () {
      this._track = [];
    };r[Re] = { constructor: r, recognize: function (t, e, n) {
        return this._doTrack(t, e, n), this._recognize(t);
      }, clear: function () {
        return this._track[we] = 0, this;
      }, _doTrack: function (t, e, n) {
        var r = t.touches;if (r) {
          for (var a = { points: [], touches: [], target: e, event: t }, o = 0, s = r[we]; s > o; o++) {
            var l = r[o],
                u = i.clientToLocal(n, l, {});a.points.push([u.zrX, u.zrY]), a.touches.push(l);
          }this._track.push(a);
        }
      }, _recognize: function (t) {
        for (var e in a) if (a.hasOwnProperty(e)) {
          var n = a[e](this._track, t);if (n) return n;
        }
      } };var a = { pinch: function (t, i) {
        var r = t[we];if (r) {
          var a = (t[r - 1] || {}).points,
              o = (t[r - 2] || {}).points || a;if (o && o[we] > 1 && a && a[we] > 1) {
            var s = e(a) / e(o);!isFinite(s) && (s = 1), i.pinchScale = s;var l = n(a);return i.pinchX = l[0], i.pinchY = l[1], { type: "pinch", target: t[0].target, event: i };
          }
        }
      } };return r;
  }), e("echarts/chart/bar/helper", [Ze, Fe, E], function (t) {
    function e(t, e, n, r, a) {
      i.setText(t, e, n), t.text = r, "outside" === t.textPosition && (t.textPosition = a);
    }var n = t(Fe),
        i = t(E),
        r = {};return r.setLabel = function (t, i, r, a, o, s, l) {
      var u = r[ke]("label.normal"),
          c = r[ke]("label.emphasis");u.get("show") ? e(t, u, a, n[y](o.getFormattedLabel(s, "normal"), o[M](s)), l) : t.text = "", c.get("show") ? e(i, c, a, n[y](o.getFormattedLabel(s, "emphasis"), o[M](s)), l) : i.text = "";
    }, r;
  }), e("echarts/chart/bar/barItemStyle", [Ze, "../../model/mixin/makeStyleMapper"], function (t) {
    var e = t("../../model/mixin/makeStyleMapper")([["fill", "color"], ["stroke", "borderColor"], [i, "borderWidth"], ["stroke", "barBorderColor"], [i, "barBorderWidth"], [v], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]);return { getBarItemStyle: function (t) {
        var n = e.call(this, t);if (this.getBorderLineDash) {
          var i = this.getBorderLineDash();i && (n.lineDash = i);
        }return n;
      } };
  }), e("zrender/Layer", [Ze, "./core/util", "./config", "./graphic/Style", "./graphic/Pattern"], function (t) {
    function e() {
      return !1;
    }function n(t, e, n, i) {
      var r = document.createElement(e),
          a = n[Ce](),
          o = n[Te](),
          s = r.style;return s[A] = "absolute", s.left = 0, s.top = 0, s.width = a + "px", s[De] = o + "px", r.width = a * i, r[De] = o * i, r.setAttribute("data-zr-dom-id", t), r;
    }var i = t("./core/util"),
        r = t("./config"),
        a = t("./graphic/Style"),
        o = t("./graphic/Pattern"),
        s = function (t, a, o) {
      var s;o = o || r.devicePixelRatio, typeof t === Oe ? s = n(t, ze, a, o) : i[Le](t) && (s = t, t = s.id), this.id = t, this.dom = s;var l = s.style;l && (s.onselectstart = e, l["-webkit-user-select"] = "none", l["user-select"] = "none", l["-webkit-touch-callout"] = "none", l["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", l.padding = 0, l.margin = 0, l["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = a, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = o;
    };return s[Re] = { constructor: s, elCount: 0, __dirty: !0, initContext: function () {
        this.ctx = this.dom[N]("2d"), this.ctx.dpr = this.dpr;
      }, createBackBuffer: function () {
        var t = this.dpr;this.domBack = n("back-" + this.id, ze, this.painter, t), this.ctxBack = this.domBack[N]("2d"), 1 != t && this.ctxBack.scale(t, t);
      }, resize: function (t, e) {
        var n = this.dpr,
            i = this.dom,
            r = i.style,
            a = this.domBack;r.width = t + "px", r[De] = e + "px", i.width = t * n, i[De] = e * n, a && (a.width = t * n, a[De] = e * n, 1 != n && this.ctxBack.scale(n, n));
      }, clear: function (t) {
        var e = this.dom,
            n = this.ctx,
            i = e.width,
            r = e[De],
            s = this.clearColor,
            l = this.motionBlur && !t,
            u = this.lastFrameAlpha,
            c = this.dpr;if (l && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(e, 0, 0, i / c, r / c)), n.clearRect(0, 0, i, r), s) {
          var h;s[ve] ? (h = s.__canvasGradient || a.getGradient(n, s, { x: 0, y: 0, width: i, height: r }), s.__canvasGradient = h) : s.image && (h = o[Re].getCanvasPattern.call(s, n)), n.save(), n.fillStyle = h || s, n.fillRect(0, 0, i, r), n.restore();
        }if (l) {
          var d = this.domBack;n.save(), n.globalAlpha = u, n.drawImage(d, 0, 0, i, r), n.restore();
        }
      } }, s;
  }), e("echarts/preprocessor/helper/compatStyle", [Ze, Fe], function (t) {
    function e(t) {
      var e = t && t.itemStyle;e && n.each(i, function (i) {
        var r = e.normal,
            a = e.emphasis;r && r[i] && (t[i] = t[i] || {}, t[i].normal ? n.merge(t[i].normal, r[i]) : t[i].normal = r[i], r[i] = null), a && a[i] && (t[i] = t[i] || {}, t[i].emphasis ? n.merge(t[i].emphasis, a[i]) : t[i].emphasis = a[i], a[i] = null);
      });
    }var n = t(Fe),
        i = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];return function (t) {
      if (t) {
        e(t), e(t.markPoint), e(t.markLine);var i = t.data;if (i) {
          for (var r = 0; r < i[we]; r++) e(i[r]);var a = t.markPoint;if (a && a.data) for (var o = a.data, r = 0; r < o[we]; r++) e(o[r]);var s = t.markLine;if (s && s.data) for (var l = s.data, r = 0; r < l[we]; r++) n[Y](l[r]) ? (e(l[r][0]), e(l[r][1])) : e(l[r]);
        }
      }
    };
  }), e("echarts/util/symbol", [Ze, "./graphic", "zrender/core/BoundingRect"], function (t) {
    var e = t("./graphic"),
        n = t("zrender/core/BoundingRect"),
        i = e.extendShape({ type: "triangle", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function (t, e) {
        var n = e.cx,
            i = e.cy,
            r = e.width / 2,
            a = e[De] / 2;t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath();
      } }),
        r = e.extendShape({ type: "diamond", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function (t, e) {
        var n = e.cx,
            i = e.cy,
            r = e.width / 2,
            a = e[De] / 2;t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), t.closePath();
      } }),
        a = e.extendShape({ type: "pin", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function (t, e) {
        var n = e.x,
            i = e.y,
            r = e.width / 5 * 3,
            a = Math.max(r, e[De]),
            o = r / 2,
            s = o * o / (a - o),
            l = i - a + o + s,
            u = Math.asin(s / o),
            c = Math.cos(u) * o,
            h = Math.sin(u),
            d = Math.cos(u);t.arc(n, l, o, Math.PI - u, 2 * Math.PI + u);var f = .6 * o,
            p = .7 * o;t.bezierCurveTo(n + c - h * f, l + s + d * f, n, i - p, n, i), t.bezierCurveTo(n, i - p, n - c + h * f, l + s + d * f, n - c, l + s), t.closePath();
      } }),
        o = e.extendShape({ type: "arrow", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function (t, e) {
        var n = e[De],
            i = e.width,
            r = e.x,
            a = e.y,
            o = i / 3 * 2;t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), t.lineTo(r, a), t.closePath();
      } }),
        l = { line: e.Line, rect: e.Rect, roundRect: e.Rect, square: e.Rect, circle: e.Circle, diamond: r, pin: a, arrow: o, triangle: i },
        u = { line: function (t, e, n, i, r) {
        r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2;
      }, rect: function (t, e, n, i, r) {
        r.x = t, r.y = e, r.width = n, r[De] = i;
      }, roundRect: function (t, e, n, i, r) {
        r.x = t, r.y = e, r.width = n, r[De] = i, r.r = Math.min(n, i) / 4;
      }, square: function (t, e, n, i, r) {
        var a = Math.min(n, i);r.x = t, r.y = e, r.width = a, r[De] = a;
      }, circle: function (t, e, n, i, r) {
        r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2;
      }, diamond: function (t, e, n, i, r) {
        r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r[De] = i;
      }, pin: function (t, e, n, i, r) {
        r.x = t + n / 2, r.y = e + i / 2, r.width = n, r[De] = i;
      }, arrow: function (t, e, n, i, r) {
        r.x = t + n / 2, r.y = e + i / 2, r.width = n, r[De] = i;
      }, triangle: function (t, e, n, i, r) {
        r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r[De] = i;
      } },
        h = {};for (var d in l) l.hasOwnProperty(d) && (h[d] = new l[d]());var f = e.extendShape({ type: "symbol", shape: { symbolType: "", x: 0, y: 0, width: 0, height: 0 }, beforeBrush: function () {
        var t = this.style,
            e = this.shape;"pin" === e.symbolType && "inside" === t.textPosition && (t.textPosition = ["50%", "40%"], t[c] = s, t.textVerticalAlign = z);
      }, buildPath: function (t, e, n) {
        var i = e.symbolType,
            r = h[i];"none" !== e.symbolType && (r || (i = "rect", r = h[i]), u[i](e.x, e.y, e.width, e[De], r.shape), r.buildPath(t, r.shape, n));
      } }),
        p = function (t) {
      if ("image" !== this.type) {
        var e = this.style,
            n = this.shape;n && "line" === n.symbolType ? e.stroke = t : this.__isEmptyBrush ? (e.stroke = t, e.fill = "#fff") : (e.fill && (e.fill = t), e.stroke && (e.stroke = t)), this.dirty(!1);
      }
    },
        m = { createSymbol: function (t, i, r, a, o, s) {
        var l = 0 === t[be]("empty");l && (t = t.substr(5, 1)[Ee]() + t.substr(6));var u;return u = 0 === t[be]("image://") ? new e.Image({ style: { image: t.slice(8), x: i, y: r, width: a, height: o } }) : 0 === t[be]("path://") ? e.makePath(t.slice(7), {}, new n(i, r, a, o)) : new f({ shape: { symbolType: t, x: i, y: r, width: a, height: o } }), u.__isEmptyBrush = l, u.setColor = p, u.setColor(s), u;
      } };return m;
  }), e("echarts/component/axis/CartesianAxisView", [Ze, Fe, E, "./AxisBuilder", "./AxisView", "./cartesianAxisHelper"], function (t) {
    var e = t(Fe),
        n = t(E),
        i = t("./AxisBuilder"),
        r = t("./AxisView"),
        a = t("./cartesianAxisHelper"),
        o = i.ifIgnoreOnTick,
        s = i.getInterval,
        l = ["axisLine", "axisLabel", "axisTick", "axisName"],
        u = ["splitArea", "splitLine"],
        c = r[he]({ type: "cartesianAxis", axisPointerClass: "CartesianAxisPointer", render: function (t, r, o, s) {
        this.group[H]();var h = this._axisGroup;if (this._axisGroup = new n.Group(), this.group.add(this._axisGroup), t.get("show")) {
          var d = t.getCoordSysModel(),
              f = a.layout(d, t),
              p = new i(t, f);e.each(l, p.add, p), this._axisGroup.add(p.getGroup()), e.each(u, function (e) {
            t.get(e + ".show") && this["_" + e](t, d, f.labelInterval);
          }, this), n.groupTransition(h, this._axisGroup, t), c.superCall(this, "render", t, r, o, s);
        }
      }, _splitLine: function (t, i, r) {
        var a = t.axis;if (!a.scale.isBlank()) {
          var l = t[ke]("splitLine"),
              u = l[ke]("lineStyle"),
              c = u.get("color"),
              h = s(l, r);c = e[Y](c) ? c : [c];for (var d = i[_e].getRect(), f = a.isHorizontal(), p = 0, m = a.getTicksCoords(), v = a.scale.getTicks(), g = [], y = [], x = u[T](), _ = 0; _ < m[we]; _++) if (!o(a, _, h)) {
            var b = a[D](m[_]);f ? (g[0] = b, g[1] = d.y, y[0] = b, y[1] = d.y + d[De]) : (g[0] = d.x, g[1] = b, y[0] = d.x + d.width, y[1] = b);var w = p++ % c[we];this._axisGroup.add(new n.Line(n.subPixelOptimizeLine({ anid: "line_" + v[_], shape: { x1: g[0], y1: g[1], x2: y[0], y2: y[1] }, style: e[ce]({ stroke: c[w] }, x), silent: !0 })));
          }
        }
      }, _splitArea: function (t, i, r) {
        var a = t.axis;if (!a.scale.isBlank()) {
          var l = t[ke]("splitArea"),
              u = l[ke]("areaStyle"),
              c = u.get("color"),
              h = i[_e].getRect(),
              d = a.getTicksCoords(),
              f = a.scale.getTicks(),
              p = a[D](d[0]),
              m = a[D](d[0]),
              v = 0,
              g = s(l, r),
              y = u.getAreaStyle();c = e[Y](c) ? c : [c];for (var x = 1; x < d[we]; x++) if (!o(a, x, g)) {
            var _,
                b,
                w,
                M,
                S = a[D](d[x]);a.isHorizontal() ? (_ = p, b = h.y, w = S - _, M = h[De]) : (_ = h.x, b = m, w = h.width, M = S - b);var A = v++ % c[we];this._axisGroup.add(new n.Rect({ anid: "area_" + f[x], shape: { x: _, y: b, width: w, height: M }, style: e[ce]({ fill: c[A] }, y), silent: !0 })), p = _ + w, m = b + M;
          }
        }
      } });c[he]({ type: "xAxis" }), c[he]({ type: "yAxis" });
  }), e("echarts/chart/helper/SymbolDraw", [Ze, E, "./Symbol"], function (t) {
    function e(t) {
      this.group = new i.Group(), this._symbolCtor = t || r;
    }function n(t, e, n) {
      var i = t[k](e);return !(!i || isNaN(i[0]) || isNaN(i[1]) || n && n(e) || "none" === t[xe](e, "symbol"));
    }var i = t(E),
        r = t("./Symbol"),
        a = e[Re];return a.updateData = function (t, e) {
      var r = this.group,
          a = t.hostModel,
          o = this._data,
          s = this._symbolCtor,
          l = { itemStyle: a[ke]("itemStyle.normal").getItemStyle(["color"]), hoverItemStyle: a[ke]("itemStyle.emphasis").getItemStyle(), symbolRotate: a.get("symbolRotate"), symbolOffset: a.get("symbolOffset"), hoverAnimation: a.get("hoverAnimation"), labelModel: a[ke]("label.normal"), hoverLabelModel: a[ke]("label.emphasis"), cursorStyle: a.get("cursor") };t.diff(o).add(function (i) {
        var a = t[k](i);if (n(t, i, e)) {
          var o = new s(t, i, l);o.attr(A, a), t.setItemGraphicEl(i, o), r.add(o);
        }
      })[ge](function (u, c) {
        var h = o[P](c),
            d = t[k](u);return n(t, u, e) ? (h ? (h.updateData(t, u, l), i.updateProps(h, { position: d }, a)) : (h = new s(t, u), h.attr(A, d)), r.add(h), void t.setItemGraphicEl(u, h)) : void r[de](h);
      })[de](function (t) {
        var e = o[P](t);e && e.fadeOut(function () {
          r[de](e);
        });
      }).execute(), this._data = t;
    }, a.updateLayout = function () {
      var t = this._data;t && t[C](function (e, n) {
        var i = t[k](n);e.attr(A, i);
      });
    }, a[de] = function (t) {
      var e = this.group,
          n = this._data;n && (t ? n[C](function (t) {
        t.fadeOut(function () {
          e[de](t);
        });
      }) : e[H]());
    }, e;
  }), e("echarts/chart/line/lineAnimationDiff", [Ze], function () {
    function t(t) {
      return t >= 0 ? 1 : -1;
    }function e(e, n, i) {
      for (var r, a = e.getBaseAxis(), o = e.getOtherAxis(a), s = a.onZero ? 0 : o.scale[V]()[0], l = o.dim, u = "x" === l || "radius" === l ? 1 : 0, c = n.stackedOn, h = n.get(l, i); c && t(c.get(l, i)) === t(h);) {
        r = c;break;
      }var d = [];return d[u] = n.get(a.dim, i), d[1 - u] = r ? r.get(l, i, !0) : s, e.dataToPoint(d);
    }function n(t, e) {
      var n = [];return e.diff(t).add(function (t) {
        n.push({ cmd: "+", idx: t });
      })[ge](function (t, e) {
        n.push({ cmd: "=", idx: e, idx1: t });
      })[de](function (t) {
        n.push({ cmd: "-", idx: t });
      }).execute(), n;
    }return function (t, i, r, a, o, s) {
      for (var l = n(t, i), u = [], c = [], h = [], d = [], f = [], p = [], m = [], v = s[X], g = 0; g < l[we]; g++) {
        var y = l[g],
            x = !0;switch (y.cmd) {case "=":
            var _ = t[k](y.idx),
                b = i[k](y.idx1);(isNaN(_[0]) || isNaN(_[1])) && (_ = b.slice()), u.push(_), c.push(b), h.push(r[y.idx]), d.push(a[y.idx1]), m.push(i.getRawIndex(y.idx1));break;case "+":
            var w = y.idx;u.push(o.dataToPoint([i.get(v[0], w, !0), i.get(v[1], w, !0)])), c.push(i[k](w).slice()), h.push(e(o, i, w)), d.push(a[w]), m.push(i.getRawIndex(w));break;case "-":
            var w = y.idx,
                M = t.getRawIndex(w);M !== w ? (u.push(t[k](w)), c.push(s.dataToPoint([t.get(v[0], w, !0), t.get(v[1], w, !0)])), h.push(r[w]), d.push(e(s, t, w)), m.push(M)) : x = !1;}x && (f.push(y), p.push(p[we]));
      }p.sort(function (t, e) {
        return m[t] - m[e];
      });for (var S = [], A = [], P = [], T = [], C = [], g = 0; g < p[we]; g++) {
        var w = p[g];S[g] = u[w], A[g] = c[w], P[g] = h[w], T[g] = d[w], C[g] = f[w];
      }return { current: S, next: A, stackedOnCurrent: P, stackedOnNext: T, status: C };
    };
  }), e("echarts/chart/helper/Symbol", [Ze, Fe, "../../util/symbol", E, "../../util/number", "./labelHelper"], function (t) {
    function e(t, e) {
      var n = t[xe](e, "symbolSize");return n instanceof Array ? n.slice() : [+n, +n];
    }function n(t) {
      return [t[0] / 2, t[1] / 2];
    }function i(t, e, n) {
      s.Group.call(this), this.updateData(t, e, n);
    }function r(t, e) {
      this[Q].drift(t, e);
    }var a = t(Fe),
        o = t("../../util/symbol"),
        s = t(E),
        l = t("../../util/number"),
        c = t("./labelHelper"),
        h = i[Re];h._createSymbol = function (t, e, i, a) {
      this[H]();var l = e.hostModel,
          u = e[xe](i, "color"),
          c = o.createSymbol(t, -1, -1, 2, 2, u);c.attr({ z2: 100, culling: !0, scale: [0, 0] }), c.drift = r, s.initProps(c, { scale: n(a) }, l, i), this._symbolType = t, this.add(c);
    }, h.stopSymbolAnimation = function (t) {
      this.childAt(0)[Pe](t);
    }, h.getSymbolPath = function () {
      return this.childAt(0);
    }, h.getScale = function () {
      return this.childAt(0).scale;
    }, h.highlight = function () {
      this.childAt(0)[ue]("emphasis");
    }, h.downplay = function () {
      this.childAt(0)[ue]("normal");
    }, h.setZ = function (t, e) {
      var n = this.childAt(0);n[K] = t, n.z = e;
    }, h.setDraggable = function (t) {
      var e = this.childAt(0);e.draggable = t, e.cursor = t ? "move" : "pointer";
    }, h.updateData = function (t, i, r) {
      this.silent = !1;var a = t[xe](i, "symbol") || "circle",
          o = t.hostModel,
          l = e(t, i);if (a !== this._symbolType) this._createSymbol(a, t, i, l);else {
        var u = this.childAt(0);u.silent = !1, s.updateProps(u, { scale: n(l) }, o, i);
      }this._updateCommon(t, i, l, r), this._seriesModel = o;
    };var d = ["itemStyle", "normal"],
        f = ["itemStyle", "emphasis"],
        p = ["label", "normal"],
        g = ["label", "emphasis"];return h._updateCommon = function (t, e, i, r) {
      var o = this.childAt(0),
          h = t.hostModel,
          y = t[xe](e, "color");"image" !== o.type && o.useStyle({ strokeNoScale: !0 }), r = r || null;var x = r && r.itemStyle,
          _ = r && r.hoverItemStyle,
          M = r && r.symbolRotate,
          S = r && r.symbolOffset,
          P = r && r.labelModel,
          T = r && r.hoverLabelModel,
          C = r && r.hoverAnimation,
          k = r && r.cursorStyle;if (!r || t.hasItemOption) {
        var L = t[w](e);x = L[ke](d).getItemStyle(["color"]), _ = L[ke](f).getItemStyle(), M = L[b]("symbolRotate"), S = L[b]("symbolOffset"), P = L[ke](p), T = L[ke](g), C = L[b]("hoverAnimation"), k = L[b]("cursor");
      } else _ = a[he]({}, _);var I = o.style;o.attr(u, (M || 0) * Math.PI / 180 || 0), S && o.attr(A, [l[m](S[0], i[0]), l[m](S[1], i[1])]), k && o.attr("cursor", k), o.setColor(y), o[J](x);var D = t[xe](e, v);null != D && (I[v] = D);var z = c.findLabelValueDim(t);c.setTextToStyle(t, e, z, I, h, P, y), c.setTextToStyle(t, e, z, _, h, T, y), o.off(re).off(ie).off("emphasis").off("normal"), o.hoverStyle = _, s.setHoverStyle(o);var O = n(i);if (C && h.isAnimationEnabled()) {
        var R = function () {
          var t = O[1] / O[0];this.animateTo({ scale: [Math.max(1.1 * O[0], O[0] + 3), Math.max(1.1 * O[1], O[1] + 3 * t)] }, 400, "elasticOut");
        },
            E = function () {
          this.animateTo({ scale: O }, 400, "elasticOut");
        };o.on(re, R).on(ie, E).on("emphasis", R).on("normal", E);
      }
    }, h.fadeOut = function (t) {
      var e = this.childAt(0);this.silent = e.silent = !0, e.style.text = "", s.updateProps(e, { scale: [0, 0] }, this._seriesModel, this.dataIndex, t);
    }, a[W](i, s.Group), i;
  }), e("echarts/chart/line/poly", [Ze, "zrender/graphic/Path", Be], function (t) {
    function e(t) {
      return isNaN(t[0]) || isNaN(t[1]);
    }function n(t, n, i, r, f, p, m, v, g, y, x) {
      for (var _ = 0, b = i, w = 0; r > w; w++) {
        var M = n[b];if (b >= f || 0 > b) break;if (e(M)) {
          if (x) {
            b += p;continue;
          }break;
        }if (b === i) t[p > 0 ? "moveTo" : "lineTo"](M[0], M[1]), u(h, M);else if (g > 0) {
          var S = b + p,
              A = n[S];if (x) for (; A && e(n[S]);) S += p, A = n[S];var P = .5,
              T = n[_],
              A = n[S];if (!A || e(A)) u(d, M);else {
            e(A) && !x && (A = M), a.sub(c, A, T);var C, k;if ("x" === y || "y" === y) {
              var L = "x" === y ? 0 : 1;C = Math.abs(M[L] - T[L]), k = Math.abs(M[L] - A[L]);
            } else C = a.dist(M, T), k = a.dist(M, A);P = k / (k + C), l(d, M, c, -g * (1 - P));
          }o(h, h, v), s(h, h, m), o(d, d, v), s(d, d, m), t.bezierCurveTo(h[0], h[1], d[0], d[1], M[0], M[1]), l(h, M, c, g * P);
        } else t.lineTo(M[0], M[1]);_ = b, b += p;
      }return w;
    }function i(t, e) {
      var n = [1 / 0, 1 / 0],
          i = [-1 / 0, -1 / 0];if (e) for (var r = 0; r < t[we]; r++) {
        var a = t[r];a[0] < n[0] && (n[0] = a[0]), a[1] < n[1] && (n[1] = a[1]), a[0] > i[0] && (i[0] = a[0]), a[1] > i[1] && (i[1] = a[1]);
      }return { min: e ? n : i, max: e ? i : n };
    }var r = t("zrender/graphic/Path"),
        a = t(Be),
        o = a.min,
        s = a.max,
        l = a.scaleAndAdd,
        u = a.copy,
        c = [],
        h = [],
        d = [];return { Polyline: r[he]({ type: "ec-polyline", shape: { points: [], smooth: 0, smoothConstraint: !0, smoothMonotone: null, connectNulls: !1 }, style: { fill: null, stroke: "#000" }, buildPath: function (t, r) {
          var a = r.points,
              o = 0,
              s = a[we],
              l = i(a, r.smoothConstraint);if (r.connectNulls) {
            for (; s > 0 && e(a[s - 1]); s--);for (; s > o && e(a[o]); o++);
          }for (; s > o;) o += n(t, a, o, s, s, 1, l.min, l.max, r.smooth, r.smoothMonotone, r.connectNulls) + 1;
        } }), Polygon: r[he]({ type: "ec-polygon", shape: { points: [], stackedOnPoints: [], smooth: 0, stackedOnSmooth: 0, smoothConstraint: !0, smoothMonotone: null, connectNulls: !1 }, buildPath: function (t, r) {
          var a = r.points,
              o = r.stackedOnPoints,
              s = 0,
              l = a[we],
              u = r.smoothMonotone,
              c = i(a, r.smoothConstraint),
              h = i(o, r.smoothConstraint);if (r.connectNulls) {
            for (; l > 0 && e(a[l - 1]); l--);for (; l > s && e(a[s]); s++);
          }for (; l > s;) {
            var d = n(t, a, s, l, l, 1, c.min, c.max, r.smooth, u, r.connectNulls);n(t, o, s + d - 1, d, l, -1, h.min, h.max, r.stackedOnSmooth, u, r.connectNulls), s += d + 1, t.closePath();
          }
        } }) };
  }), e("echarts/component/helper/selectableMixin", [Ze, Fe], function (t) {
    var e = t(Fe);return { updateSelectedMap: function (t) {
        this._selectTargetMap = e.reduce(t || [], function (t, e) {
          return t.set(e.name, e), t;
        }, e.createHashMap());
      }, select: function (t) {
        var e = this._selectTargetMap,
            n = e.get(t),
            i = this.get("selectedMode");"single" === i && e.each(function (t) {
          t.selected = !1;
        }), n && (n.selected = !0);
      }, unSelect: function (t) {
        var e = this._selectTargetMap.get(t);e && (e.selected = !1);
      }, toggleSelected: function (t) {
        var e = this._selectTargetMap.get(t);return null != e ? (this[e.selected ? "unSelect" : "select"](t), e.selected) : void 0;
      }, isSelected: function (t) {
        var e = this._selectTargetMap.get(t);return e && e.selected;
      } };
  }), e("echarts/component/helper/listComponent", [Ze, "../../util/layout", "../../util/format", E], function (t) {
    function e(t, e, i) {
      n.positionElement(t, e.getBoxLayoutParams(), { width: i[Ce](), height: i[Te]() }, e.get("padding"));
    }var n = t("../../util/layout"),
        i = t("../../util/format"),
        r = t(E);return { layout: function (t, i, r) {
        var a = n.getLayoutRect(i.getBoxLayoutParams(), { width: r[Ce](), height: r[Te]() }, i.get("padding"));n.box(i.get("orient"), t, i.get("itemGap"), a.width, a[De]), e(t, i, r);
      }, addBackground: function (t, e) {
        var n = i.normalizeCssArray(e.get("padding")),
            o = t[a](),
            s = e.getItemStyle(["color", v]);s.fill = e.get("backgroundColor");var l = new r.Rect({ shape: { x: o.x - n[3], y: o.y - n[0], width: o.width + n[1] + n[3], height: o[De] + n[0] + n[2] }, style: s, silent: !0, z2: -1 });r.subPixelOptimizeRect(l), t.add(l);
      } };
  }), e("echarts/component/marker/MarkerView", [Ze, Fe, g], function (t) {
    var e = t(Fe);return t(g).extendComponentView({ type: "marker", init: function () {
        this.markerGroupMap = e.createHashMap();
      }, render: function (t, e, n) {
        var i = this.markerGroupMap;i.each(function (t) {
          t.__keep = !1;
        });var r = this.type + "Model";e[me](function (t) {
          var i = t[r];i && this.renderSeries(t, i, e, n);
        }, this), i.each(function (t) {
          !t.__keep && this.group[de](t.group);
        }, this);
      }, renderSeries: function () {} });
  }), e("echarts/component/marker/markerHelper", [Ze, Fe, "../../util/number"], function (t) {
    function e(t) {
      return !(isNaN(parseFloat(t.x)) && isNaN(parseFloat(t.y)));
    }function n(t) {
      return !isNaN(parseFloat(t.x)) && !isNaN(parseFloat(t.y));
    }function i(t, e, n) {
      var i = -1;do i = Math.max(o.getPrecision(t.get(e, n)), i), t = t.stackedOn; while (t);return i;
    }function r(t, e, n, r, a, o) {
      var s = [],
          l = p(e, r, t),
          u = e.indicesOfNearest(r, l, !0)[0];s[a] = e.get(n, u, !0), s[o] = e.get(r, u, !0);var c = i(e, r, u);return c >= 0 && (s[o] = +s[o].toFixed(c)), s;
    }var a = t(Fe),
        o = t("../../util/number"),
        s = a[be],
        l = a.curry,
        u = { min: l(r, "min"), max: l(r, "max"), average: l(r, "average") },
        c = function (t, e) {
      var i = t[Ve](),
          r = t[_e];if (e && !n(e) && !a[Y](e.coord) && r) {
        var o = r[X],
            l = h(e, i, r, t);if (e = a.clone(e), e.type && u[e.type] && l.baseAxis && l.valueAxis) {
          var c = s(o, l.baseAxis.dim),
              d = s(o, l.valueAxis.dim);e.coord = u[e.type](i, l.baseDataDim, l.valueDataDim, c, d), e.value = e.coord[d];
        } else {
          for (var f = [null != e.xAxis ? e.xAxis : e.radiusAxis, null != e.yAxis ? e.yAxis : e.angleAxis], m = 0; 2 > m; m++) if (u[f[m]]) {
            var v = t[_](o[m])[0];f[m] = p(i, v, f[m]);
          }e.coord = f;
        }
      }return e;
    },
        h = function (t, e, n, i) {
      var r = {};return null != t.valueIndex || null != t.valueDim ? (r.valueDataDim = null != t.valueIndex ? e.getDimension(t.valueIndex) : t.valueDim, r.valueAxis = n[O](i.dataDimToCoordDim(r.valueDataDim)), r.baseAxis = n.getOtherAxis(r.valueAxis), r.baseDataDim = i[_](r.baseAxis.dim)[0]) : (r.baseAxis = i.getBaseAxis(), r.valueAxis = n.getOtherAxis(r.baseAxis), r.baseDataDim = i[_](r.baseAxis.dim)[0], r.valueDataDim = i[_](r.valueAxis.dim)[0]), r;
    },
        d = function (t, n) {
      return t && t.containData && n.coord && !e(n) ? t.containData(n.coord) : !0;
    },
        f = function (t, e, n, i) {
      return 2 > i ? t.coord && t.coord[i] : t.value;
    },
        p = function (t, e, n) {
      if ("average" === n) {
        var i = 0,
            r = 0;return t.each(e, function (t) {
          isNaN(t) || (i += t, r++);
        }, !0), i / r;
      }return t[B](e, !0)["max" === n ? 1 : 0];
    };return { dataTransform: c, dataFilter: d, dimValueGetter: f, getAxisInfo: h, numCalculate: p };
  }), e("echarts/component/helper/sliderMove", [Ze], function () {
    function t(t, e) {
      var n = t[e] - t[1 - e];return { span: Math.abs(n), sign: n > 0 ? -1 : 0 > n ? 1 : e ? -1 : 1 };
    }function e(t, e) {
      return Math.min(e[1], Math.max(e[0], t));
    }return function (n, i, r, a, o, s) {
      i[0] = e(i[0], r), i[1] = e(i[1], r), n = n || 0;var l = r[1] - r[0];null != o && (o = e(o, [0, l])), null != s && (s = Math.max(s, null != o ? o : 0)), "all" === a && (o = s = Math.abs(i[1] - i[0]), a = 0);var u = t(i, a);i[a] += n;var c = o || 0,
          h = r.slice();u.sign < 0 ? h[0] += c : h[1] -= c, i[a] = e(i[a], h);var d = t(i, a);null != o && (d.sign !== u.sign || d.span < o) && (i[1 - a] = i[a] + u.sign * o);var d = t(i, a);return null != s && d.span > s && (i[1 - a] = i[a] + d.sign * s), i;
    };
  }), e("echarts/component/axis/AxisBuilder", [Ze, Fe, "../../util/format", E, "../../model/Model", "../../util/number", Be, "zrender/core/matrix"], function (t) {
    function e(t) {
      var e = { componentType: t[le] };return e[t[le] + "Index"] = t[se], e;
    }function n(t, e, n, i) {
      var r,
          a,
          o = b(n - t[u]),
          l = i[0] > i[1],
          c = "start" === e && !l || "start" !== e && l;return w(o - L / 2) ? (a = c ? Me : "top", r = s) : w(o - 1.5 * L) ? (a = c ? "top" : Me, r = s) : (a = z, r = 1.5 * L > o && o > L / 2 ? c ? "left" : "right" : c ? "right" : "left"), { rotation: o, textAlign: r, textVerticalAlign: a };
    }function i(t) {
      var e = t.get("tooltip");return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
    }function o(t, e) {
      var n = t.get("axisLabel.showMinLabel"),
          i = t.get("axisLabel.showMaxLabel"),
          r = e[0],
          a = e[1],
          o = e[e[we] - 1],
          s = e[e[we] - 2];n === !1 ? r[Se] = !0 : null != t.getMin() && l(r, a) && (n ? a[Se] = !0 : r[Se] = !0), i === !1 ? o[Se] = !0 : null != t.getMax() && l(s, o) && (i ? s[Se] = !0 : o[Se] = !0);
    }function l(t, e) {
      var n = t && t[a]().clone(),
          i = e && e[a]().clone();if (n && i) {
        var o = P.identity([]);return P.rotate(o, o, -t[u]), n[r](P.mul([], o, t.getLocalTransform())), i[r](P.mul([], o, e.getLocalTransform())), n.intersect(i);
      }
    }var p = t(Fe),
        m = t("../../util/format"),
        v = t(E),
        g = t("../../model/Model"),
        _ = t("../../util/number"),
        b = _.remRadian,
        w = _.isRadianAroundZero,
        M = t(Be),
        P = t("zrender/core/matrix"),
        C = M[r],
        k = p[y],
        L = Math.PI,
        D = function (t, e) {
      this.opt = e, this.axisModel = t, p[ce](e, { labelOffset: 0, nameDirection: 1, tickDirection: 1, labelDirection: 1, silent: !0 }), this.group = new v.Group();var n = new v.Group({ position: e[A].slice(), rotation: e[u] });n.updateTransform(), this._transform = n.transform, this._dumbGroup = n;
    };D[Re] = { constructor: D, hasBuilder: function (t) {
        return !!O[t];
      }, add: function (t) {
        O[t].call(this);
      }, getGroup: function () {
        return this.group;
      } };var O = { axisLine: function () {
        var t = this.opt,
            e = this.axisModel;if (e.get("axisLine.show")) {
          var n = this.axisModel.axis[V](),
              i = this._transform,
              r = [n[0], 0],
              a = [n[1], 0];i && (C(r, r, i), C(a, a, i)), this.group.add(new v.Line(v.subPixelOptimizeLine({ anid: "line", shape: { x1: r[0], y1: r[1], x2: a[0], y2: a[1] }, style: p[he]({ lineCap: "round" }, e[ke]("axisLine.lineStyle")[T]()), strokeContainThreshold: t.strokeContainThreshold || 5, silent: !0, z2: 1 })));
        }
      }, axisTick: function () {
        var t = this.axisModel,
            e = t.axis;if (t.get("axisTick.show") && !e.scale.isBlank()) for (var n = t[ke]("axisTick"), i = this.opt, r = n[ke]("lineStyle"), a = n.get(we), o = B(n, i.labelInterval), s = e.getTicksCoords(n.get("alignWithLabel")), l = e.scale.getTicks(), u = [], c = [], h = this._transform, d = 0; d < s[we]; d++) if (!N(e, d, o)) {
          var f = s[d];u[0] = f, u[1] = 0, c[0] = f, c[1] = i.tickDirection * a, h && (C(u, u, h), C(c, c, h)), this.group.add(new v.Line(v.subPixelOptimizeLine({ anid: "tick_" + l[d], shape: { x1: u[0], y1: u[1], x2: c[0], y2: c[1] }, style: p[ce](r[T](), { stroke: t.get("axisLine.lineStyle.color") }), z2: 2, silent: !0 })));
        }
      }, axisLabel: function () {
        var t = this.opt,
            n = this.axisModel,
            r = n.axis,
            a = k(t.axisLabelShow, n.get("axisLabel.show"));if (a && !r.scale.isBlank()) {
          var s = n[ke]("axisLabel"),
              l = s[ke](f),
              m = s.get("margin"),
              y = r.scale.getTicks(),
              _ = n.getFormattedLabels(),
              b = (k(t.labelRotate, s.get("rotate")) || 0) * L / 180,
              w = R(t[u], b, t.labelDirection),
              M = n.get("data"),
              S = [],
              A = i(n),
              P = n.get("triggerEvent");p.each(y, function (i, a) {
            if (!N(r, a, t.labelInterval)) {
              var o = l;M && M[i] && M[i][f] && (o = new g(M[i][f], l, n[F]));var s = o[d]() || n.get("axisLine.lineStyle.color"),
                  p = r[I](i),
                  y = [p, t.labelOffset + t.labelDirection * m],
                  b = r.scale.getLabel(i),
                  T = new v.Text({ anid: "label_" + i, style: { text: _[a], textAlign: o.get("align", !0) || w[c], textVerticalAlign: o.get("baseline", !0) || w.textVerticalAlign, textFont: o[h](), fill: typeof s === j ? s(r.type === x ? b : "value" === r.type ? i + "" : i, a) : s }, position: y, rotation: w[u], silent: A, z2: 10 });
              P && (T.eventData = e(n), T.eventData.targetType = "axisLabel", T.eventData.value = b), this._dumbGroup.add(T), T.updateTransform(), S.push(T), this.group.add(T), T.decomposeTransform();
            }
          }, this), o(n, S);
        }
      }, axisName: function () {
        var t = this.opt,
            r = this.axisModel,
            a = k(t.axisName, r.get("name"));if (a) {
          var o,
              s = r.get("nameLocation"),
              l = t.nameDirection,
              f = r[ke]("nameTextStyle"),
              g = r.get("nameGap") || 0,
              y = this.axisModel.axis[V](),
              x = y[0] > y[1] ? -1 : 1,
              _ = ["start" === s ? y[0] - x * g : "end" === s ? y[1] + x * g : (y[0] + y[1]) / 2, s === z ? t.labelOffset + l * g : 0],
              b = r.get("nameRotate");null != b && (b = b * L / 180);var w;s === z ? o = R(t[u], null != b ? b : t[u], l) : (o = n(t, s, b || 0, y), w = t.axisNameAvailableWidth, null != w && (w = Math.abs(w / Math.sin(o[u])), !isFinite(w) && (w = null)));var M = f[h](),
              S = r.get("nameTruncate", !0) || {},
              A = S.ellipsis,
              P = k(t.nameTruncateMaxWidth, S.maxWidth, w),
              T = null != A && null != P ? m.truncateText(a, P, M, A, { minChar: 2, placeholder: S.placeholder }) : a,
              C = r.get("tooltip", !0),
              I = r[le],
              D = { componentType: I, name: a, $vars: ["name"] };D[I + "Index"] = r[se];var O = new v.Text({ anid: "name", __fullText: a, __truncatedText: T, style: { text: T, textFont: M, fill: f[d]() || r.get("axisLine.lineStyle.color"), textAlign: o[c], textVerticalAlign: o.textVerticalAlign }, position: _, rotation: o[u], silent: i(r), z2: 1, tooltip: C && C.show ? p[he]({ content: a, formatter: function () {
                return a;
              }, formatterParams: D }, C) : null });r.get("triggerEvent") && (O.eventData = e(r), O.eventData.targetType = "axisName", O.eventData.name = a), this._dumbGroup.add(O), O.updateTransform(), this.group.add(O), O.decomposeTransform();
        }
      } },
        R = D.innerTextLayout = function (t, e, n) {
      var i,
          r,
          a = b(e - t);return w(a) ? (r = n > 0 ? "top" : Me, i = s) : w(a - L) ? (r = n > 0 ? Me : "top", i = s) : (r = z, i = a > 0 && L > a ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), { rotation: a, textAlign: i, textVerticalAlign: r };
    },
        N = D.ifIgnoreOnTick = function (t, e, n) {
      var i,
          r = t.scale;return r.type === S && (typeof n === j ? (i = r.getTicks()[e], !n(i, r.getLabel(i))) : e % (n + 1));
    },
        B = D.getInterval = function (t, e) {
      var n = t.get("interval");return (null == n || "auto" == n) && (n = e), n;
    };return D;
  }), e("echarts/chart/helper/LineDraw", [Ze, E, "./Line"], function (t) {
    function e(t) {
      return isNaN(t[0]) || isNaN(t[1]);
    }function n(t) {
      return !e(t[0]) && !e(t[1]);
    }function i(t) {
      this._ctor = t || a, this.group = new r.Group();
    }var r = t(E),
        a = t("./Line"),
        o = i[Re];return o.updateData = function (t) {
      var e = this._lineData,
          i = this.group,
          r = this._ctor,
          a = t.hostModel,
          o = { lineStyle: a[ke]("lineStyle.normal")[T](), hoverLineStyle: a[ke]("lineStyle.emphasis")[T](), labelModel: a[ke]("label.normal"), hoverLabelModel: a[ke]("label.emphasis") };t.diff(e).add(function (e) {
        if (n(t[k](e))) {
          var a = new r(t, e, o);t.setItemGraphicEl(e, a), i.add(a);
        }
      })[ge](function (a, s) {
        var l = e[P](s);return n(t[k](a)) ? (l ? l.updateData(t, a, o) : l = new r(t, a, o), t.setItemGraphicEl(a, l), void i.add(l)) : void i[de](l);
      })[de](function (t) {
        i[de](e[P](t));
      }).execute(), this._lineData = t;
    }, o.updateLayout = function () {
      var t = this._lineData;t[C](function (e, n) {
        e.updateLayout(t, n);
      }, this);
    }, o[de] = function () {
      this.group[H]();
    }, i;
  }), e("echarts/component/axis/AxisView", [Ze, "../axisPointer/modelHelper", g], function (t) {
    function e(t, e, a, o, s, l) {
      var u = r.getAxisPointerClass(t.axisPointerClass);if (u) {
        var c = i.getAxisPointerModel(e);c ? (t._axisPointer || (t._axisPointer = new u())).render(e, c, o, l) : n(t, o);
      }
    }function n(t, e, n) {
      var i = t._axisPointer;i && i[oe](e, n), t._axisPointer = null;
    }var i = t("../axisPointer/modelHelper"),
        r = t(g).extendComponentView({ type: "axis", _axisPointer: null, axisPointerClass: null, render: function (t, n, a, o) {
        this.axisPointerClass && i.fixValue(t), r.superApply(this, "render", arguments), e(this, t, n, a, o, !0);
      }, updateAxisPointer: function (t, n, i, r) {
        e(this, t, n, i, r, !1);
      }, remove: function (t, e) {
        var n = this._axisPointer;n && n[de](e), r.superApply(this, de, arguments);
      }, dispose: function (t, e) {
        n(this, e), r.superApply(this, oe, arguments);
      } }),
        a = [];return r.registerAxisPointerClass = function (t, e) {
      a[t] = e;
    }, r.getAxisPointerClass = function (t) {
      return t && a[t];
    }, r;
  }), e("echarts/component/axis/cartesianAxisHelper", [Ze, Fe], function (t) {
    var e = t(Fe),
        n = {};return n.layout = function (t, n, i) {
      function r(t) {
        var e = a[O](t);return e[D](e[I](0));
      }i = i || {};var a = t[_e],
          o = n.axis,
          s = {},
          l = o[A],
          c = o.onZero ? "onZero" : l,
          h = o.dim,
          d = a.getRect(),
          f = [d.x, d.x + d.width, d.y, d.y + d[De]],
          p = n.get(L) || 0,
          m = { x: { top: f[2] - p, bottom: f[3] + p }, y: { left: f[0] - p, right: f[1] + p } };m.x.onZero = Math.max(Math.min(r("y"), m.x[Me]), m.x.top), m.y.onZero = Math.max(Math.min(r("x"), m.y.right), m.y.left), s[A] = ["y" === h ? m.y[c] : f[0], "x" === h ? m.x[c] : f[3]], s[u] = Math.PI / 2 * ("x" === h ? 0 : 1);var v = { top: -1, bottom: 1, left: -1, right: 1 };s.labelDirection = s.tickDirection = s.nameDirection = v[l], s.labelOffset = o.onZero ? m[h][l] - m[h].onZero : 0, n.get("axisTick.inside") && (s.tickDirection = -s.tickDirection), e[y](i.labelInside, n.get("axisLabel.inside")) && (s.labelDirection = -s.labelDirection);var g = n.get("axisLabel.rotate");return s.labelRotate = "top" === c ? -g : g, s.labelInterval = o.getLabelInterval(), s.z2 = 1, s;
    }, n;
  }), e("echarts/chart/helper/labelHelper", [Ze, E, Fe, R], function (t) {
    var e = t(E),
        n = t(Fe),
        i = t(R),
        r = {};return r.findLabelValueDim = function (t) {
      var e,
          n = i.otherDimToDataDim(t, "label");if (n[we]) e = n[0];else for (var r, a = t[X].slice(); a[we] && (e = a.pop(), r = t.getDimensionInfo(e).type, r === S || "time" === r););return e;
    }, r.setTextToStyle = function (t, i, r, a, o, s, l) {
      null != r && s[b]("show") ? (e.setText(a, s, l), a.text = n[y](o.getFormattedLabel(i, "normal"), t.get(r, i))) : a.text = "";
    }, r;
  }), e("echarts/chart/pie/labelLayout", [Ze, "zrender/contain/text"], function (t) {
    function e(t, e, n, i, r, a, o) {
      function l(e, n, i) {
        for (var r = e; n > r; r++) if (t[r].y += i, r > e && n > r + 1 && t[r + 1].y > t[r].y + t[r][De]) return void u(r, i / 2);u(n - 1, i / 2);
      }function u(e, n) {
        for (var i = e; i >= 0 && (t[i].y -= n, !(i > 0 && t[i].y > t[i - 1].y + t[i - 1][De])); i--);
      }function c(t, e, n, i, r, a) {
        for (var o = a > 0 ? e ? Number.MAX_VALUE : 0 : e ? Number.MAX_VALUE : 0, l = 0, u = t[we]; u > l; l++) if (t[l][A] !== s) {
          var c = Math.abs(t[l].y - i),
              h = t[l].len,
              d = t[l].len2,
              f = r + h > c ? Math.sqrt((r + h + d) * (r + h + d) - c * c) : Math.abs(t[l].x - n);e && f >= o && (f = o - 10), !e && o >= f && (f = o + 10), t[l].x = n + f * a, o = f;
        }
      }t.sort(function (t, e) {
        return t.y - e.y;
      });for (var h, d = 0, f = t[we], p = [], m = [], v = 0; f > v; v++) h = t[v].y - d, 0 > h && l(v, f, -h, r), d = t[v].y + t[v][De];0 > o - d && u(f - 1, d - o);for (var v = 0; f > v; v++) t[v].y >= n ? m.push(t[v]) : p.push(t[v]);c(p, !1, e, n, i, r), c(m, !0, e, n, i, r);
    }function n(t, n, i, r, a, o) {
      for (var s = [], l = [], u = 0; u < t[we]; u++) t[u].x < n ? s.push(t[u]) : l.push(t[u]);e(l, n, i, r, 1, a, o), e(s, n, i, r, -1, a, o);for (var u = 0; u < t[we]; u++) {
        var c = t[u].linePoints;if (c) {
          var h = c[1][0] - c[2][0];c[2][0] = t[u].x < n ? t[u].x + 3 : t[u].x - 3, c[1][1] = c[2][1] = t[u].y, c[1][0] = c[2][0] + h;
        }
      }
    }var i = t("zrender/contain/text");return function (t, e, r, o) {
      var l,
          u,
          c = t[Ve](),
          d = [],
          m = !1;c.each(function (n) {
        var r,
            o,
            v,
            g,
            y = c[k](n),
            x = c[w](n),
            _ = x[ke]("label.normal"),
            b = _.get(A) || x.get("label.emphasis.position"),
            M = x[ke]("labelLine.normal"),
            S = M.get(we),
            P = M.get("length2"),
            T = (y.startAngle + y.endAngle) / 2,
            C = Math.cos(T),
            L = Math.sin(T);l = y.cx, u = y.cy;var I = "inside" === b || "inner" === b;if (b === s) r = y.cx, o = y.cy, g = s;else {
          var D = (I ? (y.r + y.r0) / 2 * C : y.r * C) + l,
              z = (I ? (y.r + y.r0) / 2 * L : y.r * L) + u;if (r = D + 3 * C, o = z + 3 * L, !I) {
            var O = D + C * (S + e - y.r),
                R = z + L * (S + e - y.r),
                E = O + (0 > C ? -1 : 1) * P,
                N = R;r = E + (0 > C ? -5 : 5), o = N, v = [[D, z], [O, R], [E, N]];
          }g = I ? s : C > 0 ? "left" : "right";
        }var B = _[ke](f)[h](),
            V = _.get("rotate") ? 0 > C ? -T + Math.PI : -T : 0,
            F = t.getFormattedLabel(n, "normal") || c[p](n),
            Z = i[a](F, B, g, "top");m = !!V, y.label = { x: r, y: o, position: b, height: Z[De], len: S, len2: P, linePoints: v, textAlign: g, verticalAlign: "middle", font: B, rotation: V }, I || d.push(y.label);
      }), !m && t.get("avoidLabelOverlap") && n(d, l, u, e, r, o);
    };
  }), e("echarts/component/dataZoom/roams", [Ze, Fe, "../../component/helper/RoamController", "../../util/throttle"], function (t) {
    function e(t) {
      var e = t.getZr();return e[f] || (e[f] = {});
    }function n(t, e) {
      var n = new c(t.getZr());return n.on("pan", d(r, e)), n.on("zoom", d(a, e)), n;
    }function i(t) {
      u.each(t, function (e, n) {
        e.count || (e.controller[oe](), delete t[n]);
      });
    }function r(t, e, n, i, r, a, s) {
      o(t, function (o) {
        return o.panGetRange(t.controller, e, n, i, r, a, s);
      });
    }function a(t, e, n, i) {
      o(t, function (r) {
        return r.zoomGetRange(t.controller, e, n, i);
      });
    }function o(t, e) {
      var n = [];u.each(t.dataZoomInfos, function (t) {
        var i = e(t);!t.disabled && i && n.push({ dataZoomId: t.dataZoomId, start: i[0], end: i[1] });
      }), t.dispatchAction(n);
    }function s(t, e) {
      t.dispatchAction({ type: "dataZoom", batch: e });
    }function l(t) {
      var e,
          n = {},
          i = { "true": 2, move: 1, "false": 0, undefined: -1 };return u.each(t, function (t) {
        var r = t.disabled ? !1 : t.zoomLock ? "move" : !0;i[r] > i[e] && (e = r), u[he](n, t.roamControllerOpt);
      }), { controlType: e, opt: n };
    }var u = t(Fe),
        c = t("../../component/helper/RoamController"),
        h = t("../../util/throttle"),
        d = u.curry,
        f = "\x00_ec_dataZoom_roams",
        p = { register: function (t, r) {
        var a = e(t),
            o = r.dataZoomId,
            c = r.coordId;u.each(a, function (t) {
          var e = t.dataZoomInfos;e[o] && u[be](r.allCoordIds, c) < 0 && (delete e[o], t.count--);
        }), i(a);var d = a[c];d || (d = a[c] = { coordId: c, dataZoomInfos: {}, count: 0 }, d.controller = n(t, d), d.dispatchAction = u.curry(s, t)), !d.dataZoomInfos[o] && d.count++, d.dataZoomInfos[o] = r;var f = l(d.dataZoomInfos);d.controller.enable(f.controlType, f.opt), d.controller.setPointerChecker(r.containsPoint), h.createOrUpdate(d, "dispatchAction", r.throttleRate, "fixRate");
      }, unregister: function (t, n) {
        var r = e(t);u.each(r, function (t) {
          t.controller[oe]();var e = t.dataZoomInfos;e[n] && (delete e[n], t.count--);
        }), i(r);
      }, shouldRecordRange: function (t, e) {
        if (t && "dataZoom" === t.type && t.batch) for (var n = 0, i = t.batch[we]; i > n; n++) if (t.batch[n].dataZoomId === e) return !1;return !0;
      }, generateCoordId: function (t) {
        return t.type + "\x00_" + t.id;
      } };return p;
  }), e("echarts/chart/helper/Line", [Ze, "../../util/symbol", Be, "./LinePath", E, Fe, "../../util/number"], function (t) {
    function e(t) {
      return "_" + t + "Type";
    }function i(t, e, n) {
      var i = e[xe](n, "color"),
          r = e[xe](n, t),
          a = e[xe](n, t + "Size");if (r && "none" !== r) {
        _[Y](a) || (a = [a, a]);var o = c.createSymbol(r, -a[0] / 2, -a[1] / 2, a[0], a[1], i);return o.name = t, o;
      }
    }function r(t) {
      var e = new g({ name: "line" });return a(e.shape, t), e;
    }function a(t, e) {
      var n = e[0],
          i = e[1],
          r = e[2];t.x1 = n[0], t.y1 = n[1], t.x2 = i[0], t.y2 = i[1], t.percent = 1, r ? (t.cpx1 = r[0], t.cpy1 = r[1]) : (t.cpx1 = 0 / 0, t.cpy1 = 0 / 0);
    }function o() {
      var t = this,
          e = t.childOfName("fromSymbol"),
          i = t.childOfName("toSymbol"),
          r = t.childOfName("label");if (e || i || !r[Se]) {
        for (var a = 1, o = this[Q]; o;) o.scale && (a /= o.scale[0]), o = o[Q];var l = t.childOfName("line");if (this[n] || l[n]) {
          var c = l.shape.percent,
              h = l.pointAt(0),
              d = l.pointAt(c),
              f = m.sub([], d, h);if (m[Z](f, f), e) {
            e.attr(A, h);var p = l.tangentAt(0);e.attr(u, Math.PI / 2 - Math.atan2(p[1], p[0])), e.attr("scale", [a * c, a * c]);
          }if (i) {
            i.attr(A, d);var p = l.tangentAt(1);i.attr(u, -Math.PI / 2 - Math.atan2(p[1], p[0])), i.attr("scale", [a * c, a * c]);
          }if (!r[Se]) {
            r.attr(A, d);var v,
                g,
                y,
                x = 5 * a;if ("end" === r.__position) v = [f[0] * x + d[0], f[1] * x + d[1]], g = f[0] > .8 ? "left" : f[0] < -.8 ? "right" : s, y = f[1] > .8 ? "top" : f[1] < -.8 ? Me : z;else if (r.__position === z) {
              var _ = c / 2,
                  p = l.tangentAt(_),
                  b = [p[1], -p[0]],
                  w = l.pointAt(_);b[1] > 0 && (b[0] = -b[0], b[1] = -b[1]), v = [w[0] + b[0] * x, w[1] + b[1] * x], g = s, y = Me;var M = -Math.atan2(p[1], p[0]);d[0] < h[0] && (M = Math.PI + M), r.attr(u, M);
            } else v = [-f[0] * x + h[0], -f[1] * x + h[1]], g = f[0] > .8 ? "right" : f[0] < -.8 ? "left" : s, y = f[1] > .8 ? Me : f[1] < -.8 ? "top" : z;r.attr({ style: { textVerticalAlign: r.__verticalAlign || y, textAlign: r.__textAlign || g }, position: v, scale: [a, a] });
          }
        }
      }
    }function l(t, e, n) {
      x.Group.call(this), this._createLine(t, e, n);
    }var c = t("../../util/symbol"),
        m = t(Be),
        g = t("./LinePath"),
        x = t(E),
        _ = t(Fe),
        S = t("../../util/number"),
        P = ["fromSymbol", "toSymbol"],
        C = l[Re];return C.beforeUpdate = o, C._createLine = function (t, n, a) {
      var o = t.hostModel,
          s = t[k](n),
          l = r(s);l.shape.percent = 0, x.initProps(l, { shape: { percent: 1 } }, o, n), this.add(l);var u = new x.Text({ name: "label" });this.add(u), _.each(P, function (r) {
        var a = i(r, t, n);this.add(a), this[e(r)] = t[xe](n, r);
      }, this), this._updateCommonStl(t, n, a);
    }, C.updateData = function (t, n, r) {
      var o = t.hostModel,
          s = this.childOfName("line"),
          l = t[k](n),
          u = { shape: {} };a(u.shape, l), x.updateProps(s, u, o, n), _.each(P, function (r) {
        var a = t[xe](n, r),
            o = e(r);if (this[o] !== a) {
          this[de](this.childOfName(r));var s = i(r, t, n);this.add(s);
        }this[o] = a;
      }, this), this._updateCommonStl(t, n, r);
    }, C._updateCommonStl = function (t, e, n) {
      var i = t.hostModel,
          r = this.childOfName("line"),
          a = n && n.lineStyle,
          o = n && n.hoverLineStyle,
          s = n && n.labelModel,
          l = n && n.hoverLabelModel;if (!n || t.hasItemOption) {
        var u = t[w](e);a = u[ke]("lineStyle.normal")[T](), o = u[ke]("lineStyle.emphasis")[T](), s = u[ke]("label.normal"), l = u[ke]("label.emphasis");
      }var c = t[xe](e, "color"),
          m = _[y](t[xe](e, v), a[v], 1);r.useStyle(_[ce]({ strokeNoScale: !0, fill: "none", stroke: c, opacity: m }, a)), r.hoverStyle = o, _.each(P, function (t) {
        var e = this.childOfName(t);e && (e.setColor(c), e[J]({ opacity: m }));
      }, this);var g,
          C,
          k = s[b]("show"),
          L = l[b]("show"),
          I = this.childOfName("label");if (k || L) {
        var D = i[M](e);C = null == D ? C = t[p](e) : isFinite(D) ? S.round(D) : D, g = c || "#000";
      }if (k) {
        var z = s[ke](f);I[J]({ text: _[y](i.getFormattedLabel(e, "normal", t.dataType), C), textFont: z[h](), fill: z[d]() || g }), I.__textAlign = z.get("align"), I.__verticalAlign = z.get("baseline"), I.__position = s.get(A);
      } else I[J]("text", "");if (L) {
        var O = l[ke](f);I.hoverStyle = { text: _[y](i.getFormattedLabel(e, "emphasis", t.dataType), C), textFont: O[h](), fill: O[d]() || g };
      } else I.hoverStyle = { text: "" };I[Se] = !k && !L, x.setHoverStyle(this);
    }, C.updateLayout = function (t, e) {
      this.setLinePoints(t[k](e));
    }, C.setLinePoints = function (t) {
      var e = this.childOfName("line");a(e.shape, t), e.dirty();
    }, _[W](l, x.Group), l;
  }), e("echarts/component/axisPointer/modelHelper", [Ze, Fe, "../../model/Model"], function (t) {
    function e(t, e, i) {
      var a = e.getComponent("tooltip"),
          s = e.getComponent("axisPointer"),
          l = s.get("link", !0) || [],
          u = [];c(i.getCoordinateSystems(), function (i) {
        function d(a, c, h) {
          var d = h.model[ke]("axisPointer", s),
              f = d.get("show");if (f && ("auto" !== f || a || o(d))) {
            null == c && (c = d.get("triggerTooltip")), d = a ? n(h, g, s, e, a, c) : d;var v = d.get("snap"),
                y = p(h.model),
                _ = c || v || h.type === x,
                b = t.axesInfo[y] = { key: y, axis: h, coordSys: i, axisPointerModel: d, triggerTooltip: c, involveSeries: _, snap: v, useHandle: o(d), seriesModels: [] };m[y] = b, t.seriesInvolved |= _;var w = r(l, h);if (null != w) {
              var M = u[w] || (u[w] = { axesInfo: {} });M.axesInfo[y] = b, M.mapper = l[w].mapper, b.linkGroup = M;
            }
          }
        }if (i.axisPointerEnabled) {
          var f = p(i.model),
              m = t.coordSysAxesInfo[f] = {};t.coordSysMap[f] = i;var v = i.model,
              g = v[ke]("tooltip", a);if (c(i.getAxes(), h(d, !1, null)), i.getTooltipAxes && a && g.get("show")) {
            var y = "axis" === g.get(ue),
                _ = "cross" === g.get("axisPointer.type"),
                b = i.getTooltipAxes(g.get("axisPointer.axis"));(y || _) && c(b.baseAxes, h(d, _ ? "cross" : !0, y)), _ && c(b.otherAxes, h(d, "cross", !1));
          }
        }
      });
    }function n(t, e, n, i, r, a) {
      var o = e[ke]("axisPointer"),
          l = {};c(["type", "snap", "lineStyle", "shadowStyle", "label", Ie, "animationDurationUpdate", "animationEasingUpdate", "z"], function (t) {
        l[t] = s.clone(o.get(t));
      }), l.snap = t.type !== x && !!a, "cross" === o.get("type") && (l.type = "line");var h = l.label || (l.label = {});if (null == h.show && (h.show = !1), "cross" === r && (h.show = !0, !a)) {
        var d = l.lineStyle = o.get("crossStyle");d && s[ce](h[f] || (h[f] = {}), d[f]);
      }return t.model[ke]("axisPointer", new u(l, n, i));
    }function i(t, e) {
      e[me](function (e) {
        var n = e[_e],
            i = e.get("tooltip.trigger", !0),
            r = e.get("tooltip.show", !0);n && "none" !== i && i !== !1 && "item" !== i && r !== !1 && e.get("axisPointer.show", !0) !== !1 && c(t.coordSysAxesInfo[p(n.model)], function (t) {
          var i = t.axis;n[O](i.dim) === i && (t.seriesModels.push(e), null == t.seriesDataCount && (t.seriesDataCount = 0), t.seriesDataCount += e[Ve]().count());
        });
      }, this);
    }function r(t, e) {
      for (var n = e.model, i = e.dim, r = 0; r < t[we]; r++) {
        var o = t[r] || {};if (a(o[i + "AxisId"], n.id) || a(o[i + "AxisIndex"], n[se]) || a(o[i + "AxisName"], n.name)) return r;
      }
    }function a(t, e) {
      return "all" === t || s[Y](t) && s[be](t, e) >= 0 || t === e;
    }function o(t) {
      return !!t.get("handle.show");
    }var s = t(Fe),
        u = t("../../model/Model"),
        c = s.each,
        h = s.curry,
        d = {};d.collect = function (t, n) {
      var r = { axesInfo: {}, seriesInvolved: !1, coordSysAxesInfo: {}, coordSysMap: {} };return e(r, t, n), r.seriesInvolved && i(r, t), r;
    }, d.fixValue = function (t) {
      var e = d.getAxisInfo(t);if (e) {
        var n = e.axisPointerModel,
            i = e.axis.scale,
            r = n[l],
            a = n.get("status"),
            s = n.get("value");null != s && (s = i.parse(s));var u = o(n);null == a && (r.status = u ? "show" : "hide");var c = i[V]().slice();c[0] > c[1] && c.reverse(), (null == s || s > c[1]) && (s = c[1]), s < c[0] && (s = c[0]), r.value = s, u && (r.status = e.axis.scale.isBlank() ? "hide" : "show");
      }
    }, d.getAxisInfo = function (t) {
      var e = (t[F].getComponent("axisPointer") || {}).coordSysAxesInfo;return e && e.axesInfo[p(t)];
    }, d.getAxisPointerModel = function (t) {
      var e = d.getAxisInfo(t);return e && e.axisPointerModel;
    };var p = d.makeKey = function (t) {
      return t.type + "||" + t.id;
    };return d;
  }), e("echarts/component/helper/RoamController", [Ze, "zrender/mixin/Eventful", Fe, "zrender/core/event", "./interactionMutex"], function (t) {
    function e(t) {
      this.pointerChecker, this._zr = t, this._opt = {};var e = c.bind,
          s = e(n, this),
          l = e(i, this),
          h = e(r, this),
          d = e(a, this),
          f = e(o, this);u.call(this), this.setPointerChecker = function (t) {
        this.pointerChecker = t;
      }, this.enable = function (e, n) {
        this.disable(), this._opt = c[ce](c.clone(n) || {}, { zoomOnMouseWheel: !0, moveOnMouseMove: !0, preventDefaultMouseMove: !0 }), null == e && (e = !0), (e === !0 || "move" === e || "pan" === e) && (t.on("mousedown", s), t.on("mousemove", l), t.on("mouseup", h)), (e === !0 || "scale" === e || "zoom" === e) && (t.on("mousewheel", d), t.on("pinch", f));
      }, this.disable = function () {
        t.off("mousedown", s), t.off("mousemove", l), t.off("mouseup", h), t.off("mousewheel", d), t.off("pinch", f);
      }, this[oe] = this.disable, this.isDragging = function () {
        return this._dragging;
      }, this.isPinching = function () {
        return this._pinching;
      };
    }function n(t) {
      if (!t.target || !t.target.draggable) {
        var e = t.offsetX,
            n = t.offsetY;this.pointerChecker && this.pointerChecker(t, e, n) && (this._x = e, this._y = n, this._dragging = !0);
      }
    }function i(t) {
      if (l(this, "moveOnMouseMove", t) && this._dragging && "pinch" !== t.gestureEvent && !d.isTaken(this._zr, "globalPan")) {
        var e = t.offsetX,
            n = t.offsetY,
            i = this._x,
            r = this._y,
            a = e - i,
            o = n - r;this._x = e, this._y = n, this._opt.preventDefaultMouseMove && h.stop(t.event), this[ue]("pan", a, o, i, r, e, n);
      }
    }function r() {
      this._dragging = !1;
    }function a(t) {
      if (l(this, "zoomOnMouseWheel", t) && 0 !== t.wheelDelta) {
        var e = t.wheelDelta > 0 ? 1.1 : 1 / 1.1;s.call(this, t, e, t.offsetX, t.offsetY);
      }
    }function o(t) {
      if (!d.isTaken(this._zr, "globalPan")) {
        var e = t.pinchScale > 1 ? 1.1 : 1 / 1.1;s.call(this, t, e, t.pinchX, t.pinchY);
      }
    }function s(t, e, n, i) {
      this.pointerChecker && this.pointerChecker(t, n, i) && (h.stop(t.event), this[ue]("zoom", e, n, i));
    }function l(t, e, n) {
      var i = t._opt[e];return i && (!c[q](i) || n.event[i + "Key"]);
    }var u = t("zrender/mixin/Eventful"),
        c = t(Fe),
        h = t("zrender/core/event"),
        d = t("./interactionMutex");return c.mixin(e, u), e;
  }), e("echarts/chart/helper/LinePath", [Ze, E, Be], function (t) {
    function e(t) {
      return isNaN(+t.cpx1) || isNaN(+t.cpy1);
    }var n = t(E),
        i = t(Be),
        r = n.Line[Re],
        a = n.BezierCurve[Re];return n.extendShape({ type: "ec-line", style: { stroke: "#000", fill: null }, shape: { x1: 0, y1: 0, x2: 0, y2: 0, percent: 1, cpx1: null, cpy1: null }, buildPath: function (t, n) {
        (e(n) ? r : a).buildPath(t, n);
      }, pointAt: function (t) {
        return e(this.shape) ? r.pointAt.call(this, t) : a.pointAt.call(this, t);
      }, tangentAt: function (t) {
        var n = this.shape,
            r = e(n) ? [n.x2 - n.x1, n.y2 - n.y1] : a.tangentAt.call(this, t);return i[Z](r, r);
      } });
  }), e("echarts/component/helper/interactionMutex", [Ze, g], function (t) {
    function e(t) {
      return t[n] || (t[n] = {});
    }var n = "\x00_ec_interaction_mutex",
        i = { take: function (t, n, i) {
        var r = e(t);r[n] = i;
      }, release: function (t, n, i) {
        var r = e(t),
            a = r[n];a === i && (r[n] = null);
      }, isTaken: function (t, n) {
        return !!e(t)[n];
      } };return t(g).registerAction({ type: "takeGlobalCursor", event: "globalCursorTaken", update: "update" }, function () {}), i;
  }), e("zrender", ["zrender/zrender"], function (t) {
    return t;
  }), e("echarts", ["echarts/echarts"], function (t) {
    return t;
  });var Ge = t("echarts");return Ge.graphic = t("echarts/util/graphic"), Ge.number = t("echarts/util/number"), Ge.format = t("echarts/util/format"), t("echarts/chart/bar"), t("echarts/chart/line"), t("echarts/chart/pie"), t("echarts/component/gridSimple"), t("echarts/component/legend"), t("echarts/component/markPoint"), t("echarts/component/markLine"), t("echarts/component/dataZoom"), Ge;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(10);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
	el: '#app',
	router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
	template: '<App/>',
	components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a },
	beforeCreate: function () {
		let user = localStorage.getItem('user');
		if (!user) {
			console.warn('未登录');
			__WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */].push('/login');
		}
	}
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-013d243a],.btn-danger[data-v-013d243a],.btn-default[data-v-013d243a],.btn-success[data-v-013d243a]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-013d243a]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-013d243a]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-013d243a]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-013d243a]:active{background-color:#4cae4c}.btn-danger[data-v-013d243a]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-013d243a]:active{background-color:#d43f3a}.card[data-v-013d243a]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line[data-v-013d243a],.line-bottom[data-v-013d243a],.line-top[data-v-013d243a]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-013d243a]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom[data-v-013d243a]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left[data-v-013d243a],.line-right[data-v-013d243a],.line-vertical[data-v-013d243a]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left[data-v-013d243a]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-013d243a]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-013d243a]{animation:shake-data-v-013d243a .4s linear}@keyframes shake-data-v-013d243a{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-013d243a],.fade-leave-active[data-v-013d243a]{transition:opacity .3s}.fade-enter[data-v-013d243a],.fade-leave-active[data-v-013d243a]{opacity:0}.load[data-v-013d243a]{margin:6px auto;position:relative;width:1.6rem;height:1.6rem;border-radius:50%;box-shadow:inset 0 0 0 .1rem #9c9fa4}.load i[data-v-013d243a]{position:absolute;clip:rect(0,1.6rem,1.6rem,.8rem);width:1.6rem;height:1.6rem;animation:load-circle-clipper-data-v-013d243a 1s ease-in-out infinite}.load i[data-v-013d243a]:after{position:absolute;clip:rect(0,1.6rem,1.6rem,.8rem);width:1.6rem;height:1.6rem;content:\"\";animation:load-circle-data-v-013d243a 1s ease-in-out infinite;border-radius:50%;box-shadow:inset 0 0 0 .1rem #3b3c3e}@keyframes load-circle-clipper-data-v-013d243a{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}@keyframes load-circle-data-v-013d243a{0%{transform:rotate(-180deg)}to{transform:rotate(180deg)}}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-0a3a7bac],.btn-danger[data-v-0a3a7bac],.btn-default[data-v-0a3a7bac],.btn-success[data-v-0a3a7bac]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-0a3a7bac]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-0a3a7bac]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-0a3a7bac]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-0a3a7bac]:active{background-color:#4cae4c}.btn-danger[data-v-0a3a7bac]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-0a3a7bac]:active{background-color:#d43f3a}.card[data-v-0a3a7bac],.user .user-info[data-v-0a3a7bac]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line[data-v-0a3a7bac],.line-bottom[data-v-0a3a7bac],.line-top[data-v-0a3a7bac]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-0a3a7bac]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom[data-v-0a3a7bac]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left[data-v-0a3a7bac],.line-right[data-v-0a3a7bac],.line-vertical[data-v-0a3a7bac]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left[data-v-0a3a7bac]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-0a3a7bac]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-0a3a7bac]{animation:shake-data-v-0a3a7bac .4s linear}@keyframes shake-data-v-0a3a7bac{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-0a3a7bac],.fade-leave-active[data-v-0a3a7bac]{transition:opacity .3s}.fade-enter[data-v-0a3a7bac],.fade-leave-active[data-v-0a3a7bac]{opacity:0}.user[data-v-0a3a7bac]{padding:20px 10px 58px}.user .user-info[data-v-0a3a7bac]{height:60px;line-height:60px;text-align:center}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-0e33f5fa],.btn-danger[data-v-0e33f5fa],.btn-default[data-v-0e33f5fa],.btn-success[data-v-0e33f5fa]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-0e33f5fa]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-0e33f5fa]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-0e33f5fa]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-0e33f5fa]:active{background-color:#4cae4c}.btn-danger[data-v-0e33f5fa]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-0e33f5fa]:active{background-color:#d43f3a}.card[data-v-0e33f5fa],.expenses-list ul li[data-v-0e33f5fa]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.expenses-edit .remark[data-v-0e33f5fa]:after,.expenses-list .add-expenses .edit .remark[data-v-0e33f5fa]:after,.expenses-list ul li .edit .remark[data-v-0e33f5fa]:after,.line[data-v-0e33f5fa],.line-bottom[data-v-0e33f5fa],.line-top[data-v-0e33f5fa]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-0e33f5fa]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.expenses-edit .remark[data-v-0e33f5fa]:after,.expenses-list .add-expenses .edit .remark[data-v-0e33f5fa]:after,.expenses-list ul li .edit .remark[data-v-0e33f5fa]:after,.line-bottom[data-v-0e33f5fa]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.expenses-edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]:after,.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]:after,.expenses-list ul li .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]:after,.line-left[data-v-0e33f5fa],.line-right[data-v-0e33f5fa],.line-vertical[data-v-0e33f5fa]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.expenses-edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]:after,.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]:after,.expenses-list ul li .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]:after,.line-left[data-v-0e33f5fa]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-0e33f5fa]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-0e33f5fa]{animation:shake-data-v-0e33f5fa .4s linear}@keyframes shake-data-v-0e33f5fa{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-0e33f5fa],.fade-leave-active[data-v-0e33f5fa]{transition:opacity .3s}.fade-enter[data-v-0e33f5fa],.fade-leave-active[data-v-0e33f5fa]{opacity:0}.color-1[data-v-0e33f5fa]{background-color:#add536}.color-2[data-v-0e33f5fa]{background-color:#72a4bb}.color-3[data-v-0e33f5fa]{background-color:#d5b936}.color-4[data-v-0e33f5fa]{background-color:#d54936}.expenses-edit[data-v-0e33f5fa],.expenses-list .add-expenses .edit[data-v-0e33f5fa],.expenses-list ul li .edit[data-v-0e33f5fa]{position:absolute;top:0;left:0;right:0;width:100%;height:276px;opacity:0;transition:opacity .3s;background-color:#fff}.expenses-edit input[data-v-0e33f5fa],.expenses-list .add-expenses .edit input[data-v-0e33f5fa],.expenses-list ul li .edit input[data-v-0e33f5fa]{border:none;background:transparent}.expenses-edit .money_category_item[data-v-0e33f5fa],.expenses-list .add-expenses .edit .money_category_item[data-v-0e33f5fa],.expenses-list ul li .edit .money_category_item[data-v-0e33f5fa]{height:124px;padding:0 30px;transition:background-color .3s}.expenses-edit .money_category_item .money[data-v-0e33f5fa],.expenses-list .add-expenses .edit .money_category_item .money[data-v-0e33f5fa],.expenses-list ul li .edit .money_category_item .money[data-v-0e33f5fa]{width:70%;height:64px;float:left;overflow:hidden}.expenses-edit .money_category_item .money input[data-v-0e33f5fa],.expenses-list .add-expenses .edit .money_category_item .money input[data-v-0e33f5fa],.expenses-list ul li .edit .money_category_item .money input[data-v-0e33f5fa]{color:#fff;font-size:2rem;height:64px;line-height:40px;padding:12px 2px}.expenses-edit .money_category_item .category[data-v-0e33f5fa],.expenses-list .add-expenses .edit .money_category_item .category[data-v-0e33f5fa],.expenses-list ul li .edit .money_category_item .category[data-v-0e33f5fa]{width:30%;float:right;text-align:right;color:#fff;line-height:64px;font-size:.9rem}.expenses-edit .money_category_item .item[data-v-0e33f5fa],.expenses-list .add-expenses .edit .money_category_item .item[data-v-0e33f5fa],.expenses-list ul li .edit .money_category_item .item[data-v-0e33f5fa]{clear:both;width:100%;height:60px;border-top:2px dashed #fff}.expenses-edit .money_category_item .item input[data-v-0e33f5fa],.expenses-list .add-expenses .edit .money_category_item .item input[data-v-0e33f5fa],.expenses-list ul li .edit .money_category_item .item input[data-v-0e33f5fa]{width:100%;text-align:center;color:#fff;font-size:1.1rem;height:60px;line-height:36px;padding:12px 2px}.expenses-edit .money_category_item .item input[data-v-0e33f5fa]::-webkit-input-placeholder,.expenses-list .add-expenses .edit .money_category_item .item input[data-v-0e33f5fa]::-webkit-input-placeholder,.expenses-list ul li .edit .money_category_item .item input[data-v-0e33f5fa]::-webkit-input-placeholder{color:#dfdfdf}.expenses-edit .handler_date[data-v-0e33f5fa],.expenses-list .add-expenses .edit .handler_date[data-v-0e33f5fa],.expenses-list ul li .edit .handler_date[data-v-0e33f5fa]{padding:0 30px;height:48px;display:flex;justify-content:space-between}.expenses-edit .handler_date .date[data-v-0e33f5fa],.expenses-list .add-expenses .edit .handler_date .date[data-v-0e33f5fa],.expenses-list ul li .edit .handler_date .date[data-v-0e33f5fa]{flex:1 1 50%;height:48px}.expenses-edit .handler_date .date input[data-v-0e33f5fa],.expenses-list .add-expenses .edit .handler_date .date input[data-v-0e33f5fa],.expenses-list ul li .edit .handler_date .date input[data-v-0e33f5fa]{height:48px;line-height:48px;border:none;background:transparent;color:#777}.expenses-edit .handler_date .handler[data-v-0e33f5fa],.expenses-list .add-expenses .edit .handler_date .handler[data-v-0e33f5fa],.expenses-list ul li .edit .handler_date .handler[data-v-0e33f5fa]{flex:1 1 50%;line-height:48px;color:#777;text-align:right}.expenses-edit .remark[data-v-0e33f5fa],.expenses-list .add-expenses .edit .remark[data-v-0e33f5fa],.expenses-list ul li .edit .remark[data-v-0e33f5fa]{position:relative;padding:0 30px 10px;height:54px;width:100%}.expenses-edit .remark input[data-v-0e33f5fa],.expenses-list .add-expenses .edit .remark input[data-v-0e33f5fa],.expenses-list ul li .edit .remark input[data-v-0e33f5fa]{height:44px;width:100%;padding:12px 0;line-height:20px;border:none;background:transparent;color:#777}.expenses-edit .expenses-btn-list[data-v-0e33f5fa],.expenses-list .add-expenses .edit .expenses-btn-list[data-v-0e33f5fa],.expenses-list ul li .edit .expenses-btn-list[data-v-0e33f5fa]{width:100%;height:50px;display:flex;justify-content:space-between}.expenses-edit .expenses-btn-list .expenses-btn[data-v-0e33f5fa],.expenses-edit .expenses-btn-list .expenses-btn-delete[data-v-0e33f5fa],.expenses-edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa],.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn[data-v-0e33f5fa],.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn-delete[data-v-0e33f5fa],.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa],.expenses-list ul li .edit .expenses-btn-list .expenses-btn[data-v-0e33f5fa],.expenses-list ul li .edit .expenses-btn-list .expenses-btn-delete[data-v-0e33f5fa],.expenses-list ul li .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]{width:50%;height:50px;line-height:50px;text-align:center}.expenses-edit .expenses-btn-list .expenses-btn-delete[data-v-0e33f5fa],.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn-delete[data-v-0e33f5fa],.expenses-list ul li .edit .expenses-btn-list .expenses-btn-delete[data-v-0e33f5fa]{color:#a94442}.expenses-edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa],.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa],.expenses-list ul li .edit .expenses-btn-list .expenses-btn-save[data-v-0e33f5fa]{position:relative;color:#333}.expenses-edit .expenses-btn-list .expenses-btn-disable[data-v-0e33f5fa],.expenses-list .add-expenses .edit .expenses-btn-list .expenses-btn-disable[data-v-0e33f5fa],.expenses-list ul li .edit .expenses-btn-list .expenses-btn-disable[data-v-0e33f5fa]{color:#999}.expenses-list[data-v-0e33f5fa]{padding:10px 10px 58px}.expenses-list .add-expenses[data-v-0e33f5fa]{transition:height .3s;height:64px;overflow:hidden;margin-bottom:10px;position:relative}.expenses-list .add-expenses .add-button[data-v-0e33f5fa]{width:100%;height:100%;border-radius:3px;border:2px dashed #bbb;text-align:center;line-height:60px;color:#bbb;font-size:2rem}.expenses-list .adding-expenses[data-v-0e33f5fa]{height:276px}.expenses-list .adding-expenses .edit[data-v-0e33f5fa]{opacity:1}.expenses-list ul li[data-v-0e33f5fa]{position:relative;height:64px;transition:height .3s;margin-bottom:10px;display:flex}.expenses-list ul li .info[data-v-0e33f5fa]{flex:1 1 100%;height:64px;padding:10px}.expenses-list ul li .info .item[data-v-0e33f5fa]{color:#666}.expenses-list ul li .info .date_category[data-v-0e33f5fa]{color:#aaa;font-size:.8rem}.expenses-list ul li .money[data-v-0e33f5fa]{flex:0 0 80px;width:80px;height:64px;line-height:64px;color:#fff;text-align:center}.expenses-list ul .editing[data-v-0e33f5fa]{height:276px}.expenses-list ul .editing .edit[data-v-0e33f5fa]{opacity:1}", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn,.btn-danger,.btn-default,.btn-success{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default{background-color:#fff;border-color:#ccc;color:#333}.btn-default:active{background-color:#e6e6e6;border-color:#adadad}.btn-success{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success:active{background-color:#4cae4c}.btn-danger{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger:active{background-color:#d43f3a}.card{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line,.line-bottom,.line-top{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left,.line-right,.line-vertical{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake{animation:shake .4s linear}@keyframes shake{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active,.fade-leave-active{transition:opacity .3s}.fade-enter,.fade-leave-active{opacity:0}*{margin:0;padding:0;box-sizing:border-box;font-size:16px;-webkit-tap-highlight-color:rgba(0,0,0,0)}a{text-decoration:none}li{list-style-type:none}button,input,select{-webkit-tap-highlight-color:rgba(255,255,255,0);outline:0;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-user-modify:read-write-plaintext-only}body,html{background-color:#eee;width:100%;min-height:100%;font-size:16px;font-family:-apple-system-font,Helvetica Neue,sans-serif;line-height:1.6}.icon{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden}", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-2d4225cc],.btn-danger[data-v-2d4225cc],.btn-default[data-v-2d4225cc],.btn-success[data-v-2d4225cc]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-2d4225cc]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-2d4225cc]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-2d4225cc]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-2d4225cc]:active{background-color:#4cae4c}.btn-danger[data-v-2d4225cc]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-2d4225cc]:active{background-color:#d43f3a}.card[data-v-2d4225cc]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line[data-v-2d4225cc],.line-bottom[data-v-2d4225cc],.line-top[data-v-2d4225cc]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-2d4225cc]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom[data-v-2d4225cc]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left[data-v-2d4225cc],.line-right[data-v-2d4225cc],.line-vertical[data-v-2d4225cc]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left[data-v-2d4225cc]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-2d4225cc]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-2d4225cc]{animation:shake-data-v-2d4225cc .4s linear}@keyframes shake-data-v-2d4225cc{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-2d4225cc],.fade-leave-active[data-v-2d4225cc]{transition:opacity .3s}.fade-enter[data-v-2d4225cc],.fade-leave-active[data-v-2d4225cc]{opacity:0}.login[data-v-2d4225cc]{width:100%}.login .logo[data-v-2d4225cc]{position:relative;margin:18vh auto 80px;width:120px;height:120px}.login .logo .logo-bg[data-v-2d4225cc],.login .logo .logo-content[data-v-2d4225cc],.login .logo .logo-text[data-v-2d4225cc]{position:absolute;width:100%;height:100%;top:0;left:0}.login .logo .logo-text[data-v-2d4225cc]{display:block;color:#fff;font-size:1.6rem;line-height:120px;text-align:center;font-weight:400}.login .logo .logo-bg[data-v-2d4225cc]{animation:rotation-data-v-2d4225cc 30s linear infinite;color:#e7604a;background-image:linear-gradient(135deg,#e7604a,#de6262);-webkit-text-fill-color:transparent;-webkit-background-clip:text}@keyframes rotation-data-v-2d4225cc{0%{transform:rotate(0deg);filter:hue-rotate(0deg)}to{transform:rotate(1turn);filter:hue-rotate(-1turn)}}.login .form[data-v-2d4225cc]{width:300px;margin:auto}.login .form input[data-v-2d4225cc]{display:block;width:100%;height:2.4rem;line-height:1.6rem;margin:20px 0;padding:.4rem 14px;border-radius:4px;border:none;background-color:#ddd;color:#333}.login .form .error-msg[data-v-2d4225cc]{color:#a94442;text-align:center;font-style:.8rem}", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-61368c48],.btn-danger[data-v-61368c48],.btn-default[data-v-61368c48],.btn-success[data-v-61368c48]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-61368c48]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-61368c48]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-61368c48]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-61368c48]:active{background-color:#4cae4c}.btn-danger[data-v-61368c48]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-61368c48]:active{background-color:#d43f3a}.card[data-v-61368c48]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line[data-v-61368c48],.line-bottom[data-v-61368c48],.line-top[data-v-61368c48]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-61368c48]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom[data-v-61368c48]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left[data-v-61368c48],.line-right[data-v-61368c48],.line-vertical[data-v-61368c48]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left[data-v-61368c48]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-61368c48]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-61368c48]{animation:shake-data-v-61368c48 .4s linear}@keyframes shake-data-v-61368c48{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-61368c48],.fade-leave-active[data-v-61368c48]{transition:opacity .3s}.fade-enter[data-v-61368c48],.fade-leave-active[data-v-61368c48]{opacity:0}.nav-item[data-v-61368c48]{width:100%;height:100%;text-align:center;color:#9c9fa4}.nav-item .nav-icon[data-v-61368c48]{display:block;margin:6px auto 0;font-size:24px;line-height:24px}.nav-item p[data-v-61368c48]{font-size:12px}.active[data-v-61368c48]{color:#3b3c3e}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-70702348],.btn-danger[data-v-70702348],.btn-default[data-v-70702348],.btn-success[data-v-70702348]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-70702348]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-70702348]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-70702348]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-70702348]:active{background-color:#4cae4c}.btn-danger[data-v-70702348]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-70702348]:active{background-color:#d43f3a}.card[data-v-70702348],.income-list ul li[data-v-70702348]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.income-edit .remark[data-v-70702348]:after,.income-list .add-income .edit .remark[data-v-70702348]:after,.income-list ul li .edit .remark[data-v-70702348]:after,.line[data-v-70702348],.line-bottom[data-v-70702348],.line-top[data-v-70702348]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-70702348]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.income-edit .remark[data-v-70702348]:after,.income-list .add-income .edit .remark[data-v-70702348]:after,.income-list ul li .edit .remark[data-v-70702348]:after,.line-bottom[data-v-70702348]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.income-edit .income-btn-list .income-btn-save[data-v-70702348]:after,.income-list .add-income .edit .income-btn-list .income-btn-save[data-v-70702348]:after,.income-list ul li .edit .income-btn-list .income-btn-save[data-v-70702348]:after,.line-left[data-v-70702348],.line-right[data-v-70702348],.line-vertical[data-v-70702348]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.income-edit .income-btn-list .income-btn-save[data-v-70702348]:after,.income-list .add-income .edit .income-btn-list .income-btn-save[data-v-70702348]:after,.income-list ul li .edit .income-btn-list .income-btn-save[data-v-70702348]:after,.line-left[data-v-70702348]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-70702348]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-70702348]{animation:shake-data-v-70702348 .4s linear}@keyframes shake-data-v-70702348{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-70702348],.fade-leave-active[data-v-70702348]{transition:opacity .3s}.fade-enter[data-v-70702348],.fade-leave-active[data-v-70702348]{opacity:0}.color-1[data-v-70702348]{background-color:#add536}.color-2[data-v-70702348]{background-color:#72a4bb}.color-3[data-v-70702348]{background-color:#d5b936}.color-4[data-v-70702348]{background-color:#d54936}.income-edit[data-v-70702348],.income-list .add-income .edit[data-v-70702348],.income-list ul li .edit[data-v-70702348]{position:absolute;top:0;left:0;right:0;width:100%;height:276px;opacity:0;transition:opacity .3s;background-color:#fff}.income-edit input[data-v-70702348],.income-list .add-income .edit input[data-v-70702348],.income-list ul li .edit input[data-v-70702348]{border:none;background:transparent}.income-edit .money_handler_item[data-v-70702348],.income-list .add-income .edit .money_handler_item[data-v-70702348],.income-list ul li .edit .money_handler_item[data-v-70702348]{height:124px;padding:0 30px;transition:background-color .3s}.income-edit .money_handler_item .money[data-v-70702348],.income-list .add-income .edit .money_handler_item .money[data-v-70702348],.income-list ul li .edit .money_handler_item .money[data-v-70702348]{width:70%;height:64px;float:left;overflow:hidden}.income-edit .money_handler_item .money input[data-v-70702348],.income-list .add-income .edit .money_handler_item .money input[data-v-70702348],.income-list ul li .edit .money_handler_item .money input[data-v-70702348]{color:#fff;font-size:2rem;height:64px;line-height:40px;padding:12px 2px}.income-edit .money_handler_item .handler[data-v-70702348],.income-list .add-income .edit .money_handler_item .handler[data-v-70702348],.income-list ul li .edit .money_handler_item .handler[data-v-70702348]{width:30%;float:right;text-align:right;color:#fff;line-height:64px;font-size:.9rem}.income-edit .money_handler_item .item[data-v-70702348],.income-list .add-income .edit .money_handler_item .item[data-v-70702348],.income-list ul li .edit .money_handler_item .item[data-v-70702348]{clear:both;width:100%;height:60px;border-top:2px dashed #fff}.income-edit .money_handler_item .item input[data-v-70702348],.income-list .add-income .edit .money_handler_item .item input[data-v-70702348],.income-list ul li .edit .money_handler_item .item input[data-v-70702348]{width:100%;text-align:center;color:#fff;font-size:1.1rem;height:60px;line-height:36px;padding:12px 2px}.income-edit .money_handler_item .item input[data-v-70702348]::-webkit-input-placeholder,.income-list .add-income .edit .money_handler_item .item input[data-v-70702348]::-webkit-input-placeholder,.income-list ul li .edit .money_handler_item .item input[data-v-70702348]::-webkit-input-placeholder{color:#dfdfdf}.income-edit .date[data-v-70702348],.income-list .add-income .edit .date[data-v-70702348],.income-list ul li .edit .date[data-v-70702348]{padding:0 30px;height:56px;width:100%}.income-edit .date input[data-v-70702348],.income-list .add-income .edit .date input[data-v-70702348],.income-list ul li .edit .date input[data-v-70702348]{height:56px;line-height:56px;border:none;background:transparent;color:#777}.income-edit .remark[data-v-70702348],.income-list .add-income .edit .remark[data-v-70702348],.income-list ul li .edit .remark[data-v-70702348]{position:relative;padding:0 30px 10px;height:54px;width:100%}.income-edit .remark input[data-v-70702348],.income-list .add-income .edit .remark input[data-v-70702348],.income-list ul li .edit .remark input[data-v-70702348]{height:44px;width:100%;padding:12px 0;line-height:20px;border:none;background:transparent;color:#777}.income-edit .income-btn-list[data-v-70702348],.income-list .add-income .edit .income-btn-list[data-v-70702348],.income-list ul li .edit .income-btn-list[data-v-70702348]{width:100%;height:50px;display:flex;justify-content:space-between}.income-edit .income-btn-list .income-btn[data-v-70702348],.income-edit .income-btn-list .income-btn-delete[data-v-70702348],.income-edit .income-btn-list .income-btn-save[data-v-70702348],.income-list .add-income .edit .income-btn-list .income-btn[data-v-70702348],.income-list .add-income .edit .income-btn-list .income-btn-delete[data-v-70702348],.income-list .add-income .edit .income-btn-list .income-btn-save[data-v-70702348],.income-list ul li .edit .income-btn-list .income-btn[data-v-70702348],.income-list ul li .edit .income-btn-list .income-btn-delete[data-v-70702348],.income-list ul li .edit .income-btn-list .income-btn-save[data-v-70702348]{width:50%;height:50px;line-height:50px;text-align:center}.income-edit .income-btn-list .income-btn-delete[data-v-70702348],.income-list .add-income .edit .income-btn-list .income-btn-delete[data-v-70702348],.income-list ul li .edit .income-btn-list .income-btn-delete[data-v-70702348]{color:#a94442}.income-edit .income-btn-list .income-btn-save[data-v-70702348],.income-list .add-income .edit .income-btn-list .income-btn-save[data-v-70702348],.income-list ul li .edit .income-btn-list .income-btn-save[data-v-70702348]{position:relative;color:#333}.income-edit .income-btn-list .income-btn-disable[data-v-70702348],.income-list .add-income .edit .income-btn-list .income-btn-disable[data-v-70702348],.income-list ul li .edit .income-btn-list .income-btn-disable[data-v-70702348]{color:#999}.income-list[data-v-70702348]{padding:10px 10px 58px}.income-list .add-income[data-v-70702348]{transition:height .3s;height:64px;overflow:hidden;margin-bottom:10px;position:relative}.income-list .add-income .add-button[data-v-70702348]{width:100%;height:100%;border-radius:3px;border:2px dashed #bbb;text-align:center;line-height:60px;color:#bbb;font-size:2rem}.income-list .adding-income[data-v-70702348]{height:276px}.income-list .adding-income .edit[data-v-70702348]{opacity:1}.income-list ul li[data-v-70702348]{position:relative;transition:height .3s;height:64px;margin-bottom:10px;display:flex}.income-list ul li .info[data-v-70702348]{flex:1 1 100%;height:64px;padding:10px}.income-list ul li .info .item[data-v-70702348]{color:#666}.income-list ul li .info .date_handler[data-v-70702348]{color:#aaa;font-size:.8rem}.income-list ul li .money[data-v-70702348]{flex:0 0 80px;width:80px;height:64px;line-height:64px;color:#fff;text-align:center}.income-list ul .editing[data-v-70702348]{height:276px}.income-list ul .editing .edit[data-v-70702348]{opacity:1}", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-86ae406c],.btn-danger[data-v-86ae406c],.btn-default[data-v-86ae406c],.btn-success[data-v-86ae406c]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-86ae406c]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-86ae406c]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-86ae406c]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-86ae406c]:active{background-color:#4cae4c}.btn-danger[data-v-86ae406c]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-86ae406c]:active{background-color:#d43f3a}.card[data-v-86ae406c]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line[data-v-86ae406c],.line-bottom[data-v-86ae406c],.line-top[data-v-86ae406c]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-86ae406c]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom[data-v-86ae406c]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left[data-v-86ae406c],.line-right[data-v-86ae406c],.line-vertical[data-v-86ae406c]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left[data-v-86ae406c]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-86ae406c]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-86ae406c]{animation:shake-data-v-86ae406c .4s linear}@keyframes shake-data-v-86ae406c{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-86ae406c],.fade-leave-active[data-v-86ae406c]{transition:opacity .3s}.fade-enter[data-v-86ae406c],.fade-leave-active[data-v-86ae406c]{opacity:0}.error-bar[data-v-86ae406c]{position:fixed;z-index:100;width:100%;top:0;left:0;right:0;margin:auto;padding:5px;background:rgba(191,19,19,.9);font-size:14px;color:#fff}", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-a3ccd9e2],.btn-danger[data-v-a3ccd9e2],.btn-default[data-v-a3ccd9e2],.btn-success[data-v-a3ccd9e2]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-a3ccd9e2]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-a3ccd9e2]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-a3ccd9e2]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-a3ccd9e2]:active{background-color:#4cae4c}.btn-danger[data-v-a3ccd9e2]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-a3ccd9e2]:active{background-color:#d43f3a}.card[data-v-a3ccd9e2]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line[data-v-a3ccd9e2],.line-bottom[data-v-a3ccd9e2],.line-top[data-v-a3ccd9e2]{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-a3ccd9e2]{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom[data-v-a3ccd9e2]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left[data-v-a3ccd9e2],.line-right[data-v-a3ccd9e2],.line-vertical[data-v-a3ccd9e2]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left[data-v-a3ccd9e2]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-a3ccd9e2]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-a3ccd9e2]{animation:shake-data-v-a3ccd9e2 .4s linear}@keyframes shake-data-v-a3ccd9e2{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-a3ccd9e2],.fade-leave-active[data-v-a3ccd9e2]{transition:opacity .3s}.fade-enter[data-v-a3ccd9e2],.fade-leave-active[data-v-a3ccd9e2]{opacity:0}.chart[data-v-a3ccd9e2]{padding:10px 10px 58px;display:flex;flex-wrap:wrap;justify-content:center;text-align:center}.chart .summary[data-v-a3ccd9e2]{width:100%;display:flex;flex-wrap:wrap;justify-content:space-between}.chart .summary .summary-balance[data-v-a3ccd9e2],.chart .summary .summary-expenses[data-v-a3ccd9e2],.chart .summary .summary-income[data-v-a3ccd9e2],.chart .summary .summary-item[data-v-a3ccd9e2]{color:#fff;margin:0 0 20px;padding:10px 16px;border-radius:3px;width:30%}.chart .summary .summary-balance .summary-attr[data-v-a3ccd9e2],.chart .summary .summary-expenses .summary-attr[data-v-a3ccd9e2],.chart .summary .summary-income .summary-attr[data-v-a3ccd9e2],.chart .summary .summary-item .summary-attr[data-v-a3ccd9e2]{line-height:1rem;font-size:.8rem;color:#fff}.chart .summary .summary-balance .summary-num[data-v-a3ccd9e2],.chart .summary .summary-expenses .summary-num[data-v-a3ccd9e2],.chart .summary .summary-income .summary-num[data-v-a3ccd9e2],.chart .summary .summary-item .summary-num[data-v-a3ccd9e2]{line-height:1.6rem;font-size:1.1rem;color:#fff}.chart .summary .summary-income[data-v-a3ccd9e2]{background-color:#add536}.chart .summary .summary-expenses[data-v-a3ccd9e2]{background-color:#72a4bb}.chart .summary .summary-balance[data-v-a3ccd9e2]{background-color:#6c6669}.chart .chart-table[data-v-a3ccd9e2]{width:100%;height:372px}.chart .chart-pie[data-v-a3ccd9e2]{width:372px;height:372px;margin-bottom:-50px}.chart .chart-content[data-v-a3ccd9e2]{height:372px;margin:auto}.chart h2[data-v-a3ccd9e2]{color:#555;font-weight:400;font-size:1.2rem}", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".btn[data-v-d65fe6ae],.btn-danger[data-v-d65fe6ae],.btn-default[data-v-d65fe6ae],.btn-success[data-v-d65fe6ae]{display:block;width:100%;height:2.5rem;line-height:2.5rem;margin:20px 0;border-radius:4px;border:1px solid transparent;text-align:center;-webkit-user-select:none;user-select:none}.btn-default[data-v-d65fe6ae]{background-color:#fff;border-color:#ccc;color:#333}.btn-default[data-v-d65fe6ae]:active{background-color:#e6e6e6;border-color:#adadad}.btn-success[data-v-d65fe6ae]{background-color:#5cb85c;border-color:#4cae4c;color:#fff}.btn-success[data-v-d65fe6ae]:active{background-color:#4cae4c}.btn-danger[data-v-d65fe6ae]{background-color:#d9534f;border-color:#d43f3a;color:#fff}.btn-danger[data-v-d65fe6ae]:active{background-color:#d43f3a}.card[data-v-d65fe6ae]{background-color:#fff;width:100%;border-radius:3px;box-shadow:0 0 1px #ccc;overflow:hidden}.line[data-v-d65fe6ae],.line-bottom[data-v-d65fe6ae],.line-top[data-v-d65fe6ae],.nav[data-v-d65fe6ae]:before{position:absolute;content:\" \";width:100%;height:1px;left:0;right:0;margin:auto;color:#d9d9d9;transform:scaleY(.5)}.line-top[data-v-d65fe6ae],.nav[data-v-d65fe6ae]:before{top:0;transform-origin:0 0;border-top:1px solid #d9d9d9}.line-bottom[data-v-d65fe6ae]{bottom:0;transform-origin:0 100%;border-bottom:1px solid #d9d9d9}.line-left[data-v-d65fe6ae],.line-right[data-v-d65fe6ae],.line-vertical[data-v-d65fe6ae]{position:absolute;content:\" \";width:1px;height:100%;top:0;bottom:0;margin:auto;color:#d9d9d9;transform:scaleX(.5)}.line-left[data-v-d65fe6ae]{left:0;transform-origin:0 0;border-left:1px solid #d9d9d9}.line-right[data-v-d65fe6ae]{right:0;transform-origin:100% 0;border-right:1px solid #d9d9d9}.shake[data-v-d65fe6ae]{animation:shake-data-v-d65fe6ae .4s linear}@keyframes shake-data-v-d65fe6ae{0%{transform:translateX(-10px)}20%{transform:translateX(8px)}40%{transform:translateX(-6px)}60%{transform:translateX(4px)}80%{transform:translateX(-2px)}to{transform:translateX(0)}}.fade-enter-active[data-v-d65fe6ae],.fade-leave-active[data-v-d65fe6ae]{transition:opacity .3s}.fade-enter[data-v-d65fe6ae],.fade-leave-active[data-v-d65fe6ae]{opacity:0}.nav[data-v-d65fe6ae]{position:fixed;display:flex;width:100%;height:48px;bottom:0;left:0;right:0;margin:auto;background-color:#fff;z-index:40}.nav a[data-v-d65fe6ae]{display:block;width:25%;height:100%}", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(59)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(47),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-61368c48",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\BottomNavItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BottomNavItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61368c48", Component.options)
  } else {
    hotAPI.reload("data-v-61368c48", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(62)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(50),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a3ccd9e2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\Chart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Chart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a3ccd9e2", Component.options)
  } else {
    hotAPI.reload("data-v-a3ccd9e2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(56)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(44),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0e33f5fa",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\Expenses.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Expenses.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e33f5fa", Component.options)
  } else {
    hotAPI.reload("data-v-0e33f5fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(60)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(48),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-70702348",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\Income.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Income.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70702348", Component.options)
  } else {
    hotAPI.reload("data-v-70702348", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(58)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(46),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2d4225cc",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d4225cc", Component.options)
  } else {
    hotAPI.reload("data-v-2d4225cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(55)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(43),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0a3a7bac",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\SOFT\\XAMPP\\htdocs\\casual-accounting\\frontend\\src\\components\\User.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] User.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a3a7bac", Component.options)
  } else {
    hotAPI.reload("data-v-0a3a7bac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "load"
  }, [_c('i')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-013d243a", module.exports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user"
  }, [_c('BottomNav', {
    attrs: {
      "active": "user"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "user-info"
  }, [_vm._v("\n        " + _vm._s(_vm.nickname) + "\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "btn-danger",
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("退出登录")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0a3a7bac", module.exports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "expenses-list"
  }, [_c('ErrorBar', {
    attrs: {
      "text": _vm.errorMsg
    }
  }), _vm._v(" "), _c('BottomNav', {
    attrs: {
      "active": "expenses"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "add-expenses",
    class: {
      'adding-expenses': (_vm.editingIndex == 'new')
    },
    on: {
      "click": _vm.addOn
    }
  }, [_c('div', {
    staticClass: "add-button"
  }, [_vm._v("+")]), _vm._v(" "), _c('div', {
    staticClass: "edit"
  }, [_c('div', {
    staticClass: "money_category_item",
    class: 'color-' + _vm.editingExpenses.expenses_category
  }, [_c('div', {
    staticClass: "money"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.editingExpenses.expenses_money),
      expression: "editingExpenses.expenses_money",
      modifiers: {
        "number": true
      }
    }],
    domProps: {
      "value": (_vm.editingExpenses.expenses_money)
    },
    on: {
      "blur": [_vm.formatMoney, function($event) {
        _vm.$forceUpdate()
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingExpenses, "expenses_money", _vm._n($event.target.value))
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "category",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.changeCategory($event)
      }
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.getCategoryName(_vm.editingExpenses.expenses_category)) + "\n                ")]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.editingExpenses.expenses_item),
      expression: "editingExpenses.expenses_item",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "placeholder": "内容"
    },
    domProps: {
      "value": (_vm.editingExpenses.expenses_item)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingExpenses, "expenses_item", $event.target.value.trim())
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "handler_date"
  }, [_c('div', {
    staticClass: "date"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.editingExpenses.expenses_date),
      expression: "editingExpenses.expenses_date"
    }],
    attrs: {
      "type": "date"
    },
    domProps: {
      "value": (_vm.editingExpenses.expenses_date)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingExpenses, "expenses_date", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "handler",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.changeHandler($event)
      }
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.getHandlerName(_vm.editingExpenses.expenses_handler)) + "\n                ")])]), _vm._v(" "), _c('div', {
    staticClass: "remark"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.editingExpenses.expenses_remark),
      expression: "editingExpenses.expenses_remark",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "placeholder": "备注"
    },
    domProps: {
      "value": (_vm.editingExpenses.expenses_remark)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingExpenses, "expenses_remark", $event.target.value.trim())
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "expenses-btn-list"
  }, [_c('div', {
    staticClass: "expenses-btn-delete",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.editingIndex = null
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "expenses-btn-save",
    class: {
      'expenses-btn-disable': !_vm.editingExpenses.expenses_item
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.addSave($event)
      }
    }
  }, [_vm._v("保存")])])])]), _vm._v(" "), _c('ul', _vm._l((_vm.expensesList), function(expenses, index) {
    return _c('li', {
      class: {
        'editing': (index == _vm.editingIndex)
      },
      on: {
        "click": function($event) {
          _vm.editingOn(index)
        }
      }
    }, [_c('div', {
      staticClass: "info"
    }, [_c('p', {
      staticClass: "item"
    }, [_vm._v(_vm._s(expenses.expenses_item))]), _vm._v(" "), _c('p', {
      staticClass: "date_category"
    }, [_vm._v(_vm._s(expenses.expenses_date) + " " + _vm._s(_vm.getCategoryName(expenses.expenses_category)))])]), _vm._v(" "), _c('div', {
      staticClass: "money",
      class: 'color-' + expenses.expenses_category
    }, [_vm._v(_vm._s(expenses.expenses_money))]), _vm._v(" "), _c('div', {
      staticClass: "edit"
    }, [_c('div', {
      staticClass: "money_category_item",
      class: 'color-' + _vm.editingExpenses.expenses_category
    }, [_c('div', {
      staticClass: "money"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.number",
        value: (_vm.editingExpenses.expenses_money),
        expression: "editingExpenses.expenses_money",
        modifiers: {
          "number": true
        }
      }],
      domProps: {
        "value": (_vm.editingExpenses.expenses_money)
      },
      on: {
        "blur": [_vm.formatMoney, function($event) {
          _vm.$forceUpdate()
        }],
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingExpenses, "expenses_money", _vm._n($event.target.value))
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "category",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.changeCategory($event)
        }
      }
    }, [_vm._v("\n                        " + _vm._s(_vm.getCategoryName(_vm.editingExpenses.expenses_category)) + "\n                    ")]), _vm._v(" "), _c('div', {
      staticClass: "item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (_vm.editingExpenses.expenses_item),
        expression: "editingExpenses.expenses_item",
        modifiers: {
          "trim": true
        }
      }],
      domProps: {
        "value": (_vm.editingExpenses.expenses_item)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingExpenses, "expenses_item", $event.target.value.trim())
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "handler_date"
    }, [_c('div', {
      staticClass: "date"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.editingExpenses.expenses_date),
        expression: "editingExpenses.expenses_date"
      }],
      attrs: {
        "type": "date"
      },
      domProps: {
        "value": (_vm.editingExpenses.expenses_date)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingExpenses, "expenses_date", $event.target.value)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "handler",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.changeHandler($event)
        }
      }
    }, [_vm._v("\n                        " + _vm._s(_vm.getHandlerName(_vm.editingExpenses.expenses_handler)) + "\n                    ")])]), _vm._v(" "), _c('div', {
      staticClass: "remark"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (_vm.editingExpenses.expenses_remark),
        expression: "editingExpenses.expenses_remark",
        modifiers: {
          "trim": true
        }
      }],
      attrs: {
        "placeholder": "备注"
      },
      domProps: {
        "value": (_vm.editingExpenses.expenses_remark)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingExpenses, "expenses_remark", $event.target.value.trim())
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "expenses-btn-list"
    }, [_c('div', {
      staticClass: "expenses-btn-delete",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.deleteExpenses($event)
        }
      }
    }, [_vm._v("删除")]), _vm._v(" "), _c('div', {
      staticClass: "expenses-btn-save",
      class: {
        'expenses-btn-disable': !_vm.editingExpenses.expenses_item
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.saveExpenses($event)
        }
      }
    }, [_vm._v("保存")])])])])
  }), 0), _vm._v(" "), _c('LoadMore', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }]
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0e33f5fa", module.exports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-25441132", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login"
  }, [_c('div', {
    staticClass: "logo"
  }, [_c('svg', {
    staticClass: "icon logo-bg",
    attrs: {
      "aria-hidden": "true"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "#icon-hexagon"
    }
  })]), _vm._v(" "), _c('h1', {
    staticClass: "logo-text"
  }, [_vm._v("FMS")])]), _vm._v(" "), _c('div', {
    staticClass: "form",
    class: {
      shake: _vm.error
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.username),
      expression: "username"
    }],
    attrs: {
      "placeholder": "帐号"
    },
    domProps: {
      "value": (_vm.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.username = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    attrs: {
      "placeholder": "密码"
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn-success",
    on: {
      "click": _vm.login
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('div', {
    staticClass: "error-msg"
  }, [_vm._v(_vm._s(_vm.errorMsg))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2d4225cc", module.exports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nav-item",
    class: {
      active: _vm.active
    }
  }, [_vm._t("default"), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.name))])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-61368c48", module.exports)
  }
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "income-list"
  }, [_c('ErrorBar', {
    attrs: {
      "text": _vm.errorMsg
    }
  }), _vm._v(" "), _c('BottomNav', {
    attrs: {
      "active": "income"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "add-income",
    class: {
      'adding-income': (_vm.editingIndex == 'new')
    },
    on: {
      "click": _vm.addOn
    }
  }, [_c('div', {
    staticClass: "add-button"
  }, [_vm._v("+")]), _vm._v(" "), _c('div', {
    staticClass: "edit"
  }, [_c('div', {
    staticClass: "money_handler_item",
    class: 'color-' + _vm.editingIncome.income_handler
  }, [_c('div', {
    staticClass: "money"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.editingIncome.income_money),
      expression: "editingIncome.income_money",
      modifiers: {
        "number": true
      }
    }],
    domProps: {
      "value": (_vm.editingIncome.income_money)
    },
    on: {
      "blur": [_vm.formatMoney, function($event) {
        _vm.$forceUpdate()
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingIncome, "income_money", _vm._n($event.target.value))
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "handler",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.changeHandler($event)
      }
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.getHandlerName(_vm.editingIncome.income_handler)) + "\n                ")]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.editingIncome.income_item),
      expression: "editingIncome.income_item",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "placeholder": "内容"
    },
    domProps: {
      "value": (_vm.editingIncome.income_item)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingIncome, "income_item", $event.target.value.trim())
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "date"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.editingIncome.income_date),
      expression: "editingIncome.income_date"
    }],
    attrs: {
      "type": "date"
    },
    domProps: {
      "value": (_vm.editingIncome.income_date)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingIncome, "income_date", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "remark"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.editingIncome.income_remark),
      expression: "editingIncome.income_remark",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "placeholder": "备注"
    },
    domProps: {
      "value": (_vm.editingIncome.income_remark)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.editingIncome, "income_remark", $event.target.value.trim())
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "income-btn-list"
  }, [_c('div', {
    staticClass: "income-btn-delete",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.editingIndex = null
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "income-btn-save",
    class: {
      'income-btn-disable': !_vm.editingIncome.income_item
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.addSave($event)
      }
    }
  }, [_vm._v("保存")])])])]), _vm._v(" "), _c('ul', _vm._l((_vm.incomeList), function(income, index) {
    return _c('li', {
      class: {
        'editing': (index == _vm.editingIndex)
      },
      on: {
        "click": function($event) {
          _vm.editingOn(index)
        }
      }
    }, [_c('div', {
      staticClass: "info"
    }, [_c('p', {
      staticClass: "item"
    }, [_vm._v(_vm._s(income.income_item))]), _vm._v(" "), _c('p', {
      staticClass: "date_handler"
    }, [_vm._v(_vm._s(income.income_date) + " " + _vm._s(_vm.getHandlerName(income.income_handler)))])]), _vm._v(" "), _c('div', {
      staticClass: "money",
      class: 'color-' + income.income_handler
    }, [_vm._v(_vm._s(income.income_money))]), _vm._v(" "), _c('div', {
      staticClass: "edit"
    }, [_c('div', {
      staticClass: "money_handler_item",
      class: 'color-' + _vm.editingIncome.income_handler
    }, [_c('div', {
      staticClass: "money"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.number",
        value: (_vm.editingIncome.income_money),
        expression: "editingIncome.income_money",
        modifiers: {
          "number": true
        }
      }],
      domProps: {
        "value": (_vm.editingIncome.income_money)
      },
      on: {
        "blur": [_vm.formatMoney, function($event) {
          _vm.$forceUpdate()
        }],
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingIncome, "income_money", _vm._n($event.target.value))
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "handler",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.changeHandler($event)
        }
      }
    }, [_vm._v("\n                        " + _vm._s(_vm.getHandlerName(_vm.editingIncome.income_handler)) + "\n                    ")]), _vm._v(" "), _c('div', {
      staticClass: "item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (_vm.editingIncome.income_item),
        expression: "editingIncome.income_item",
        modifiers: {
          "trim": true
        }
      }],
      domProps: {
        "value": (_vm.editingIncome.income_item)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingIncome, "income_item", $event.target.value.trim())
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "date"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.editingIncome.income_date),
        expression: "editingIncome.income_date"
      }],
      attrs: {
        "type": "date"
      },
      domProps: {
        "value": (_vm.editingIncome.income_date)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingIncome, "income_date", $event.target.value)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "remark"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (_vm.editingIncome.income_remark),
        expression: "editingIncome.income_remark",
        modifiers: {
          "trim": true
        }
      }],
      attrs: {
        "placeholder": "备注"
      },
      domProps: {
        "value": (_vm.editingIncome.income_remark)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.editingIncome, "income_remark", $event.target.value.trim())
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "income-btn-list"
    }, [_c('div', {
      staticClass: "income-btn-delete",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.deleteIncome($event)
        }
      }
    }, [_vm._v("删除")]), _vm._v(" "), _c('div', {
      staticClass: "income-btn-save",
      class: {
        'income-btn-disable': !_vm.editingIncome.income_item
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.saveIncome($event)
        }
      }
    }, [_vm._v("保存")])])])])
  }), 0), _vm._v(" "), _c('LoadMore', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }]
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-70702348", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.text) ? _c('div', {
    staticClass: "error-bar"
  }, [_vm._v("\n\t" + _vm._s(_vm.text) + "\n")]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-86ae406c", module.exports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('BottomNav', {
    attrs: {
      "active": "chart"
    }
  }), _vm._v(" "), _c('LoadMore', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }]
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.chartData),
      expression: "chartData"
    }],
    staticClass: "chart"
  }, [_c('div', {
    staticClass: "summary"
  }, [_c('div', {
    staticClass: "summary-income"
  }, [_c('div', {
    staticClass: "summary-attr"
  }, [_vm._v("总收入")]), _vm._v(" "), _c('div', {
    staticClass: "summary-num"
  }, [_vm._v(_vm._s(_vm.chartData ? _vm.chartData.incomeTotal : 0))])]), _vm._v(" "), _c('div', {
    staticClass: "summary-expenses"
  }, [_c('div', {
    staticClass: "summary-attr"
  }, [_vm._v("总支出")]), _vm._v(" "), _c('div', {
    staticClass: "summary-num"
  }, [_vm._v(_vm._s(_vm.chartData ? _vm.chartData.expensesTotal : 0))])]), _vm._v(" "), _c('div', {
    staticClass: "summary-balance"
  }, [_c('div', {
    staticClass: "summary-attr"
  }, [_vm._v("结余")]), _vm._v(" "), _c('div', {
    staticClass: "summary-num"
  }, [_vm._v(_vm._s(_vm.summaryBalance))])])]), _vm._v(" "), _c('div', {
    staticClass: "chart-table"
  }, [_c('h2', [_vm._v("每月收支")]), _vm._v(" "), _c('div', {
    staticClass: "chart-content",
    style: (_vm.chartTableStyle),
    attrs: {
      "id": "monthly"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "chart-table"
  }, [_c('h2', [_vm._v("每月结余")]), _vm._v(" "), _c('div', {
    staticClass: "chart-content",
    style: (_vm.chartTableStyle),
    attrs: {
      "id": "balance"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "chart-pie"
  }, [_c('h2', [_vm._v("消费分类")]), _vm._v(" "), _c('div', {
    staticClass: "chart-content",
    style: (_vm.chartPieStyle),
    attrs: {
      "id": "category"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "chart-pie"
  }, [_c('h2', [_vm._v("存钱比例")]), _vm._v(" "), _c('div', {
    staticClass: "chart-content",
    style: (_vm.chartPieStyle),
    attrs: {
      "id": "handler"
    }
  })])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a3ccd9e2", module.exports)
  }
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b7ae2ba0", module.exports)
  }
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nav"
  }, [_c('router-link', {
    attrs: {
      "to": {
        name: 'Expenses'
      }
    }
  }, [_c('BottomNavItem', {
    attrs: {
      "active": _vm.active == 'expenses',
      "name": "消费"
    }
  }, [_c('svg', {
    staticClass: "icon nav-icon",
    attrs: {
      "aria-hidden": "true"
    }
  }, [(_vm.active == 'expenses') ? _c('use', {
    attrs: {
      "xlink:href": "#icon-expenses-fill"
    }
  }) : _c('use', {
    attrs: {
      "xlink:href": "#icon-expenses"
    }
  })])])], 1), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: 'Income'
      }
    }
  }, [_c('BottomNavItem', {
    attrs: {
      "active": _vm.active == 'income',
      "name": "收入"
    }
  }, [_c('svg', {
    staticClass: "icon nav-icon",
    attrs: {
      "aria-hidden": "true"
    }
  }, [(_vm.active == 'income') ? _c('use', {
    attrs: {
      "xlink:href": "#icon-income-fill"
    }
  }) : _c('use', {
    attrs: {
      "xlink:href": "#icon-income"
    }
  })])])], 1), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: 'Chart'
      }
    }
  }, [_c('BottomNavItem', {
    attrs: {
      "active": _vm.active == 'chart',
      "name": "统计"
    }
  }, [_c('svg', {
    staticClass: "icon nav-icon",
    attrs: {
      "aria-hidden": "true"
    }
  }, [(_vm.active == 'chart') ? _c('use', {
    attrs: {
      "xlink:href": "#icon-chart-fill"
    }
  }) : _c('use', {
    attrs: {
      "xlink:href": "#icon-chart"
    }
  })])])], 1), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": {
        name: 'User'
      }
    }
  }, [_c('BottomNavItem', {
    attrs: {
      "active": _vm.active == 'user',
      "name": "设置"
    }
  }, [_c('svg', {
    staticClass: "icon nav-icon",
    attrs: {
      "aria-hidden": "true"
    }
  }, [(_vm.active == 'user') ? _c('use', {
    attrs: {
      "xlink:href": "#icon-user-fill"
    }
  }) : _c('use', {
    attrs: {
      "xlink:href": "#icon-user"
    }
  })])])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d65fe6ae", module.exports)
  }
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.8.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.8.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("96f4449c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-013d243a\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LoadMore.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-013d243a\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LoadMore.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("3d970248", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0a3a7bac\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./User.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0a3a7bac\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./User.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("7da9dc6f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0e33f5fa\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Expenses.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0e33f5fa\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Expenses.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("3e581cfe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-25441132\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-25441132\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("81a09176", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2d4225cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2d4225cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("7b37bf02", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-61368c48\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BottomNavItem.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-61368c48\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BottomNavItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("fdd7733a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70702348\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Income.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70702348\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Income.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("3dd09e8a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-86ae406c\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ErrorBar.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-86ae406c\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ErrorBar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("4f1acfe6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a3ccd9e2\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Chart.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a3ccd9e2\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Chart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("70904c58", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b7ae2ba0\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Base.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b7ae2ba0\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Base.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("a231d66c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d65fe6ae\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BottomNav.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d65fe6ae\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BottomNav.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(7)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(66);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })
/******/ ]);