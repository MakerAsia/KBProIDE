module.exports =
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fa16");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0210":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("8197");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "02b3":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("ded8");
var core = __webpack_require__("046d");
var hide = __webpack_require__("c1bc");
var redefine = __webpack_require__("ac3c");
var ctx = __webpack_require__("ce56");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "046d":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "04a2":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("5aa6")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "05f1":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("97b6");
var TAG = __webpack_require__("c71f")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "083c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "09d1":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("04a2") && !__webpack_require__("5aa6")(function () {
  return Object.defineProperty(__webpack_require__("7745")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "10f0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "13a7":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("654c");
var defined = __webpack_require__("3a1c");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "13ce":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("8197");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "2367":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2ab1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("0210");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "2e08":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("5a7d");
var toLength = __webpack_require__("3e3a");
var toAbsoluteIndex = __webpack_require__("f3fa");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "2ef4":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("3a1c");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "31a8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("afee");
var redefine = __webpack_require__("ac3c");
var hide = __webpack_require__("c1bc");
var fails = __webpack_require__("5aa6");
var defined = __webpack_require__("3a1c");
var wks = __webpack_require__("c71f");
var regexpExec = __webpack_require__("729b");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "325c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "34d4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "35b2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3a1c":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "3af2":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("c71f")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("c1bc")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "3e3a":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("654c");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "4da6":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("97b6");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "5312":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "55af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "55cc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5a7d":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("4da6");
var defined = __webpack_require__("3a1c");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "5aa6":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "60e3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "654c":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "6998":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0210");
var IE8_DOM_DEFINE = __webpack_require__("09d1");
var toPrimitive = __webpack_require__("13ce");
var dP = Object.defineProperty;

exports.f = __webpack_require__("04a2") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "6ac2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("05f1");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "6bce":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6e8b":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("046d");
var global = __webpack_require__("ded8");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("fe23") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "6ee2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "713a":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "71aa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "729b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("2ab1");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "729bb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("13a7")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "73c2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7745":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("8197");
var document = __webpack_require__("ded8").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "7959":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("0210");
var toObject = __webpack_require__("2ef4");
var toLength = __webpack_require__("3e3a");
var toInteger = __webpack_require__("654c");
var advanceStringIndex = __webpack_require__("729bb");
var regExpExec = __webpack_require__("6ac2");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("31a8")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "8197":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "83ed":
/***/ (function(module, exports) {

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function installComponents (component, components) {
  var options = typeof component.exports === 'function'
    ? component.exports.extendOptions
    : component.options

  if (typeof component.exports === 'function') {
    options.components = component.exports.options.components
  }

  options.components = options.components || {}

  for (var i in components) {
    options.components[i] = options.components[i] || components[i]
  }
}


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "8cea":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "92c0":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "97b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "a084":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("02b3");
var $includes = __webpack_require__("2e08")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("3af2")('includes');


/***/ }),

/***/ "a1ea":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ac3c":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("ded8");
var hide = __webpack_require__("c1bc");
var has = __webpack_require__("713a");
var SRC = __webpack_require__("b3e5")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("046d").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "ae23":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "afee":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("729b");
__webpack_require__("02b3")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b3e5":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "b901":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bd04":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bda8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bfe1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c1bc":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("6998");
var createDesc = __webpack_require__("325c");
module.exports = __webpack_require__("04a2") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "c6f9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c71f":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("6e8b")('wks');
var uid = __webpack_require__("b3e5");
var Symbol = __webpack_require__("ded8").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "ca52":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cce0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cd25":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ce56":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("92c0");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d305":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d600":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ded8":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "ea97":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f091":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f3fa":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("654c");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "fa16":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var actionbar_namespaceObject = {};
__webpack_require__.r(actionbar_namespaceObject);
__webpack_require__.d(actionbar_namespaceObject, "ActionbarBuild", function() { return ActionbarBuild; });
__webpack_require__.d(actionbar_namespaceObject, "ActionbarJustCompile", function() { return ActionbarJustCompile; });
__webpack_require__.d(actionbar_namespaceObject, "ActionbarSetting", function() { return ActionbarSetting; });

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"dcf8a58c-vue-loader-template"}!/Users/nat/KBProIDE/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/nat/KBProIDE/node_modules/vuetify-loader/lib/loader.js!/Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/nat/KBProIDE/node_modules/vue-loader/lib??vue-loader-options!./src/actionbar/ActionbarBuild.vue?vue&type=template&id=7d7fe924&
var ActionbarBuildvue_type_template_id_7d7fe924_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-tooltip',{attrs:{"bottom":""}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary darken-2","icon":""},on:{"click":function($event){_vm.compileDialog = true}},slot:"activator"},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("fa-play")])],1),_c('span',[_vm._v("Compile & Run")])],1),_c('v-widget',{attrs:{"title":"Basic Usage"}},[_c('div',{attrs:{"slot":"widget-content"},slot:"widget-content"},[_c('v-dialog',{attrs:{"persistent":"","max-width":"450px"},model:{value:(_vm.compileDialog),callback:function ($$v) {_vm.compileDialog=$$v},expression:"compileDialog"}},[_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("Compile & Run")])]),_c('v-card-text',[_c('v-container',[_c('v-layout',{attrs:{"align-center":"","column":""}},[_c('v-flex',{attrs:{"xs12":""}},[(_vm.compileStep <= 3)?_c('v-progress-circular',{attrs:{"size":80,"width":8,"color":"primary","indeterminate":""}}):_vm._e(),_c('v-fade-transition',{attrs:{"hide-on-leave":true}},[(_vm.compileStep > 3)?_c('v-icon',{attrs:{"color":"green","size":"110"}},[_vm._v("\n                                            check_circle_outline\n                                        ")]):_vm._e()],1)],1)],1)],1),_c('v-flex',{attrs:{"xs12":""}},[_c('v-stepper',{staticClass:"elevation-0 pb-0",attrs:{"vertical":""},model:{value:(_vm.compileStep),callback:function ($$v) {_vm.compileStep=$$v},expression:"compileStep"}},[_c('v-stepper-step',{attrs:{"step":"1","complete":_vm.compileStep > 1,"rules":[function (){ return _vm.stepResult['1'].result }]}},[_vm._v("\n                                    Finding board\n                                    "),(_vm.compileStep > 1)?_c('small',[_vm._v(_vm._s(_vm.stepResult["1"].msg))]):_vm._e()]),(_vm.compileStep >= 1)?_c('v-stepper-content',{attrs:{"step":"1"}},[_vm._v("\n                                    "+_vm._s(_vm.stepResult["1"].msg)+"\n                                ")]):_vm._e(),_c('v-stepper-step',{attrs:{"step":"2","complete":_vm.compileStep > 2,"rules":[function (){ return _vm.stepResult['2'].result }]}},[_vm._v("\n                                    Compile the code\n                                    "),(_vm.compileStep > 2)?_c('small',[_vm._v(_vm._s(_vm.stepResult["2"].msg))]):_vm._e()]),(_vm.compileStep >= 2)?_c('v-stepper-content',{attrs:{"step":"2"}},[_vm._v("\n                                    "+_vm._s(_vm.stepResult["2"].msg)+"\n                                ")]):_vm._e(),_c('v-stepper-step',{attrs:{"step":"3","complete":_vm.compileStep > 3,"rules":[function (){ return _vm.stepResult['3'].result }]}},[_vm._v("\n                                    Upload program and Run\n                                    "),(_vm.compileStep > 3)?_c('small',[_vm._v(_vm._s(_vm.stepResult["3"].msg))]):_vm._e()]),(_vm.compileStep >= 3)?_c('v-stepper-content',{attrs:{"step":"3"}},[_vm._v("\n                                    "+_vm._s(_vm.stepResult["3"].msg)+"\n                                    "),_c('v-progress-linear',{attrs:{"height":"2","active":_vm.compileStep < 4,"indeterminate":true}})],1):_vm._e()],1)],1)],1),_c('v-card-actions',[_c('v-spacer'),_c('v-btn',{attrs:{"color":"blue darken-1","flat":"","disabled":_vm.compileStep < 4 && _vm.failed === false},on:{"click":function($event){_vm.compileDialog = false}}},[_vm._v("Close\n                        ")])],1)],1)],1)],1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/actionbar/ActionbarBuild.vue?vue&type=template&id=7d7fe924&

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("7959");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--12-0!/Users/nat/KBProIDE/node_modules/thread-loader/dist/cjs.js!/Users/nat/KBProIDE/node_modules/babel-loader/lib!/Users/nat/KBProIDE/node_modules/vuetify-loader/lib/loader.js!/Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/nat/KBProIDE/node_modules/vue-loader/lib??vue-loader-options!./src/actionbar/ActionbarBuild.vue?vue&type=script&lang=js&

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
//
//
//
//
//
//
var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;
var ActionbarBuildvue_type_script_lang_js_path = "".concat(engine.util.boardDir, "/").concat(G.board.board, "/compiler.js");
var boardCompiler = engine.util.requireFunc(ActionbarBuildvue_type_script_lang_js_path);
var comport = "";
var mac = "";
var boardName = "";
/* harmony default export */ var ActionbarBuildvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      compileStep: 1,
      compileDialog: false,
      failed: false,
      stepResult: {
        "1": {
          result: true,
          msg: ""
        },
        "2": {
          result: true,
          msg: ""
        },
        "3": {
          result: true,
          msg: ""
        }
      }
    };
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {},
  methods: {
    run: function run() {
      var _this = this;

      //find port and mac
      console.log("---> step 1 <---");
      comport = G.board.package["arduino-esp32-actionbar"].comport;
      this.stepResult["1"].msg = "Finding board using ".concat(comport);

      if (!comport) {
        console.log("------ process error ------");
        this.stepResult["1"].msg = "Cannot find COMPORT : ".concat(comport);
        this.stepResult["1"].result = false;
        this.failed = true;
        return;
      }

      boardCompiler.readMac(comport).then(function (boardMac) {
        _this.stepResult["1"].msg += " MAC ".concat(boardMac.mac);
        mac = boardMac.mac;
        boardName = mac.replace(/:/g, "-");
        console.log("[STEP 1] got it boardName = ".concat(boardName, " mac = ").concat(mac));
        _this.compileStep = 2;
        console.log("---> step 2 <---");
        _this.stepResult["2"].msg = "Compile board ... "; //setInterval(() => {
        //console.log("running..");
        //this.stepResult["2"].msg += ".";
        //}, 100);
        //------ just update it prevent unupdated data -------//

        G.editor.rawCode = G.editor.Blockly.JavaScript.workspaceToCode(G.editor.workspace);
        var xml = G.editor.Blockly.Xml.domToText(G.editor.Blockly.Xml.workspaceToDom(G.editor.Blockly.mainWorkspace));
        G.editor.blockCode = xml; //----------------------------------------------------//

        var rawCode = G.editor.mode >= 3 ? G.editor.sourceCode : G.editor.rawCode;
        var isSourceCode = G.editor.mode >= 3 ? true : false;
        var config = {
          board_mac_addr: mac,
          isSourceCode: isSourceCode
        };

        var compileCb = function compileCb(status) {
          console.log("compileCb called.");
          _this.stepResult["2"].msg = status;
        };

        return boardCompiler.compile(rawCode, boardName, config, compileCb);
      }).then(function () {
        _this.stepResult["2"].msg = "Compile done!";
        _this.compileStep = 3;
        _this.stepResult["3"].msg = "Uploading ... ";
        console.log("---> step 3 <---");
        return boardCompiler.flash(comport);
      }).then(function () {
        _this.stepResult["3"].msg = "Upload success";
        _this.compileStep = 4;
      }).catch(function (err) {
        console.log("------ process error ------");
        console.log(err);
        _this.failed = true;

        if (_this.compileStep == 1) {
          _this.stepResult["1"].msg = "Cannot find KidBright : " + err;
          _this.stepResult["1"].result = false;
        } else if (_this.compileStep == 2) {
          _this.stepResult["2"].msg = "Compile error : " + err;
          _this.stepResult["2"].result = false;
        } else if (_this.compileStep == 3) {
          _this.stepResult["3"].msg = "Cannot upload program : " + err;
          _this.stepResult["3"].result = false;
        }
      });
    }
  },
  watch: {
    "compileDialog": function compileDialog(val) {
      if (val) {
        //on opening
        this.compileStep = 1;
        this.failed = false;
        this.stepResult["1"].result = true;
        this.stepResult["2"].result = true;
        this.stepResult["3"].result = true;
        this.run();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/actionbar/ActionbarBuild.vue?vue&type=script&lang=js&
 /* harmony default export */ var actionbar_ActionbarBuildvue_type_script_lang_js_ = (ActionbarBuildvue_type_script_lang_js_); 
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__("83ed");
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_buttons.styl
var _buttons = __webpack_require__("bfe1");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/util/mixins.js
/* eslint-disable max-len, import/export, no-use-before-define */

function mixins() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({ mixins: args });
}
//# sourceMappingURL=mixins.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_progress-circular.styl
var _progress_circular = __webpack_require__("ca52");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/colorable.js
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function isCssColor(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
}
/* harmony default export */ var colorable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'colorable',
    props: {
        color: String
    },
    methods: {
        setBackgroundColor: function setBackgroundColor(color) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (isCssColor(color)) {
                data.style = _extends({}, data.style, {
                    'background-color': '' + color,
                    'border-color': '' + color
                });
            } else if (color) {
                data.class = _extends({}, data.class, _defineProperty({}, color, true));
            }
            return data;
        },
        setTextColor: function setTextColor(color) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (isCssColor(color)) {
                data.style = _extends({}, data.style, {
                    'color': '' + color,
                    'caret-color': '' + color
                });
            } else if (color) {
                var _color$toString$trim$ = color.toString().trim().split(' ', 2),
                    _color$toString$trim$2 = _slicedToArray(_color$toString$trim$, 2),
                    colorName = _color$toString$trim$2[0],
                    colorModifier = _color$toString$trim$2[1];

                data.class = _extends({}, data.class, _defineProperty({}, colorName + '--text', true));
                if (colorModifier) {
                    data.class['text--' + colorModifier] = true;
                }
            }
            return data;
        }
    }
}));
//# sourceMappingURL=colorable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js

// Mixins


/* @vue/component */
/* harmony default export */ var VProgressCircular = (mixins(colorable).extend({
    name: 'v-progress-circular',
    props: {
        button: Boolean,
        indeterminate: Boolean,
        rotate: {
            type: [Number, String],
            default: 0
        },
        size: {
            type: [Number, String],
            default: 32
        },
        width: {
            type: [Number, String],
            default: 4
        },
        value: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        calculatedSize: function calculatedSize() {
            return Number(this.size) + (this.button ? 8 : 0);
        },
        circumference: function circumference() {
            return 2 * Math.PI * this.radius;
        },
        classes: function classes() {
            return {
                'v-progress-circular--indeterminate': this.indeterminate,
                'v-progress-circular--button': this.button
            };
        },
        normalizedValue: function normalizedValue() {
            if (this.value < 0) {
                return 0;
            }
            if (this.value > 100) {
                return 100;
            }
            return parseFloat(this.value);
        },
        radius: function radius() {
            return 20;
        },
        strokeDashArray: function strokeDashArray() {
            return Math.round(this.circumference * 1000) / 1000;
        },
        strokeDashOffset: function strokeDashOffset() {
            return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
        },
        strokeWidth: function strokeWidth() {
            return Number(this.width) / +this.size * this.viewBoxSize * 2;
        },
        styles: function styles() {
            return {
                height: this.calculatedSize + 'px',
                width: this.calculatedSize + 'px'
            };
        },
        svgStyles: function svgStyles() {
            return {
                transform: 'rotate(' + Number(this.rotate) + 'deg)'
            };
        },
        viewBoxSize: function viewBoxSize() {
            return this.radius / (1 - Number(this.width) / +this.size);
        }
    },
    methods: {
        genCircle: function genCircle(h, name, offset) {
            return h('circle', {
                class: 'v-progress-circular__' + name,
                attrs: {
                    fill: 'transparent',
                    cx: 2 * this.viewBoxSize,
                    cy: 2 * this.viewBoxSize,
                    r: this.radius,
                    'stroke-width': this.strokeWidth,
                    'stroke-dasharray': this.strokeDashArray,
                    'stroke-dashoffset': offset
                }
            });
        },
        genSvg: function genSvg(h) {
            var children = [this.indeterminate || this.genCircle(h, 'underlay', 0), this.genCircle(h, 'overlay', this.strokeDashOffset)];
            return h('svg', {
                style: this.svgStyles,
                attrs: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: this.viewBoxSize + ' ' + this.viewBoxSize + ' ' + 2 * this.viewBoxSize + ' ' + 2 * this.viewBoxSize
                }
            }, children);
        }
    },
    render: function render(h) {
        var info = h('div', { staticClass: 'v-progress-circular__info' }, this.$slots.default);
        var svg = this.genSvg(h);
        return h('div', this.setTextColor(this.color, {
            staticClass: 'v-progress-circular',
            attrs: {
                'role': 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
            },
            class: this.classes,
            style: this.styles,
            on: this.$listeners
        }), [svg, info]);
    }
}));
//# sourceMappingURL=VProgressCircular.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VProgressCircular/index.js


/* harmony default export */ var components_VProgressCircular = (VProgressCircular);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/util/console.js
function createMessage(message, vm, parent) {
    if (parent) {
        vm = {
            _isVue: true,
            $parent: parent,
            $options: vm
        };
    }
    if (vm) {
        // Only show each message once per instance
        vm.$_alreadyWarned = vm.$_alreadyWarned || [];
        if (vm.$_alreadyWarned.includes(message)) return;
        vm.$_alreadyWarned.push(message);
    }
    return '[Vuetify] ' + message + (vm ? generateComponentTrace(vm) : '');
}
function consoleInfo(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.info(newMessage);
}
function consoleWarn(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.warn(newMessage);
}
function consoleError(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.error(newMessage);
}
function deprecate(original, replacement, vm, parent) {
    consoleWarn('\'' + original + '\' is deprecated, use \'' + replacement + '\' instead', vm, parent);
}
/**
 * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
 */
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
        return c.toUpperCase();
    }).replace(/[-_]/g, '');
};
function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
        return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
    }
    return (name ? '<' + classify(name) + '>' : '<Anonymous>') + (file && includeFile !== false ? ' at ' + file : '');
}
function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
            if (tree.length > 0) {
                var last = tree[tree.length - 1];
                if (last.constructor === vm.constructor) {
                    currentRecursiveSequence++;
                    vm = vm.$parent;
                    continue;
                } else if (currentRecursiveSequence > 0) {
                    tree[tree.length - 1] = [last, currentRecursiveSequence];
                    currentRecursiveSequence = 0;
                }
            }
            tree.push(vm);
            vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree.map(function (vm, i) {
            return '' + (i === 0 ? '---> ' : ' '.repeat(5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + '... (' + vm[1] + ' recursive calls)' : formatComponentName(vm));
        }).join('\n');
    } else {
        return '\n\n(found in ' + formatComponentName(vm) + ')';
    }
}
//# sourceMappingURL=console.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/registrable.js
function registrable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function generateWarning(child, parent) {
    return function () {
        return consoleWarn('The ' + child + ' component must be used inside a ' + parent);
    };
}
function inject(namespace, child, parent) {
    var defaultImpl = child && parent ? {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
    } : null;
    return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
        name: 'registrable-inject',
        inject: registrable_defineProperty({}, namespace, {
            default: defaultImpl
        })
    });
}
function provide(namespace) {
    return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
        name: 'registrable-provide',
        methods: {
            register: null,
            unregister: null
        },
        provide: function provide() {
            return registrable_defineProperty({}, namespace, {
                register: this.register,
                unregister: this.unregister
            });
        }
    });
}
//# sourceMappingURL=registrable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/groupable.js
function groupable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Mixins

function factory(namespace, child, parent) {
    return inject(namespace, child, parent).extend({
        name: 'groupable',
        props: {
            activeClass: {
                type: String,
                default: function _default() {
                    if (!this[namespace]) return undefined;
                    return this[namespace].activeClass;
                }
            },
            disabled: Boolean
        },
        data: function data() {
            return {
                isActive: false
            };
        },

        computed: {
            groupClasses: function groupClasses() {
                if (!this.activeClass) return {};
                return groupable_defineProperty({}, this.activeClass, this.isActive);
            }
        },
        created: function created() {
            this[namespace] && this[namespace].register(this);
        },
        beforeDestroy: function beforeDestroy() {
            this[namespace] && this[namespace].unregister(this);
        },

        methods: {
            toggle: function toggle() {
                this.$emit('change');
            }
        }
    });
}
/* eslint-disable-next-line no-redeclare */
var Groupable = factory('itemGroup');
/* harmony default export */ var groupable = (Groupable);
//# sourceMappingURL=groupable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/util/helpers.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helpers_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


function createSimpleFunctional(c) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var name = arguments[2];

    return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
        name: name || c.replace(/__/g, '-'),
        functional: true,
        render: function render(h, _ref) {
            var data = _ref.data,
                children = _ref.children;

            data.staticClass = (c + ' ' + (data.staticClass || '')).trim();
            return h(el, data, children);
        }
    });
}
function mergeTransitions(transitions, array) {
    if (Array.isArray(transitions)) return transitions.concat(array);
    if (transitions) array.push(transitions);
    return array;
}
function createSimpleTransition(name) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
    var mode = arguments[2];

    return {
        name: name,
        functional: true,
        props: {
            group: {
                type: Boolean,
                default: false
            },
            hideOnLeave: {
                type: Boolean,
                default: false
            },
            leaveAbsolute: {
                type: Boolean,
                default: false
            },
            mode: {
                type: String,
                default: mode
            },
            origin: {
                type: String,
                default: origin
            }
        },
        render: function render(h, context) {
            var tag = 'transition' + (context.props.group ? '-group' : '');
            context.data = context.data || {};
            context.data.props = {
                name: name,
                mode: context.props.mode
            };
            context.data.on = context.data.on || {};
            if (!Object.isExtensible(context.data.on)) {
                context.data.on = helpers_extends({}, context.data.on);
            }
            var ourBeforeEnter = [];
            var ourLeave = [];
            var absolute = function absolute(el) {
                return el.style.position = 'absolute';
            };
            ourBeforeEnter.push(function (el) {
                el.style.transformOrigin = context.props.origin;
                el.style.webkitTransformOrigin = context.props.origin;
            });
            if (context.props.leaveAbsolute) ourLeave.push(absolute);
            if (context.props.hideOnLeave) {
                ourLeave.push(function (el) {
                    return el.style.display = 'none';
                });
            }
            var _context$data$on = context.data.on,
                beforeEnter = _context$data$on.beforeEnter,
                leave = _context$data$on.leave;
            // Type says Function | Function[] but
            // will only work if provided a function

            context.data.on.beforeEnter = function () {
                return mergeTransitions(beforeEnter, ourBeforeEnter);
            };
            context.data.on.leave = mergeTransitions(leave, ourLeave);
            return h(tag, context.data, context.children);
        }
    };
}
function createJavaScriptTransition(name, functions) {
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'in-out';

    return {
        name: name,
        functional: true,
        props: {
            mode: {
                type: String,
                default: mode
            }
        },
        render: function render(h, context) {
            var data = {
                props: helpers_extends({}, context.props, {
                    name: name
                }),
                on: functions
            };
            return h('transition', data, context.children);
        }
    };
}
function directiveConfig(binding) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return helpers_extends({}, defaults, binding.modifiers, {
        value: binding.arg
    }, binding.value || {});
}
function addOnceEventListener(el, event, cb) {
    var once = function once() {
        cb();
        el.removeEventListener(event, once, false);
    };
    el.addEventListener(event, once, false);
}
function getNestedValue(obj, path, fallback) {
    var last = path.length - 1;
    if (last < 0) return obj === undefined ? fallback : obj;
    for (var i = 0; i < last; i++) {
        if (obj == null) {
            return fallback;
        }
        obj = obj[path[i]];
    }
    if (obj == null) return fallback;
    return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) {
        // If the values are Date, they were convert to timestamp with getTime and compare it
        if (a.getTime() !== b.getTime()) return false;
    }
    if (a !== Object(a) || b !== Object(b)) {
        // If the values aren't objects, they were already checked for equality
        return false;
    }
    var props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
        // Different number of props, don't bother to check
        return false;
    }
    return props.every(function (p) {
        return deepEqual(a[p], b[p]);
    });
}
function getObjectValueByPath(obj, path, fallback) {
    // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
    if (!path || path.constructor !== String) return fallback;
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback);
}
function getPropertyFromItem(item, property, fallback) {
    if (property == null) return item === undefined ? fallback : item;
    if (item !== Object(item)) return fallback === undefined ? item : fallback;
    if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);
    if (Array.isArray(property)) return getNestedValue(item, property, fallback);
    if (typeof property !== 'function') return fallback;
    var value = property(item, fallback);
    return typeof value === 'undefined' ? fallback : value;
}
function createRange(length) {
    return Array.from({ length: length }, function (v, k) {
        return k;
    });
}
function getZIndex(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
    var index = +window.getComputedStyle(el).getPropertyValue('z-index');
    if (isNaN(index)) return getZIndex(el.parentNode);
    return index;
}
var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escapeHTML(str) {
    return str.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
}
function filterObjectOnKeys(obj, keys) {
    var filtered = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof obj[key] !== 'undefined') {
            filtered[key] = obj[key];
        }
    }
    return filtered;
}
function filterChildren() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var tag = arguments[1];

    return array.filter(function (child) {
        return child.componentOptions && child.componentOptions.Ctor.options.name === tag;
    });
}
function convertToUnit(str) {
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

    if (str == null || str === '') {
        return undefined;
    } else if (isNaN(+str)) {
        return String(str);
    } else {
        return '' + Number(str) + unit;
    }
}
function kebabCase(str) {
    return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}
// KeyboardEvent.keyCode aliases
var keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34
});
var ICONS_PREFIX = '$vuetify.icons.';
// This remaps internal names like '$vuetify.icons.cancel'
// to the current name or component for that icon.
function remapInternalIcon(vm, iconName) {
    if (!iconName.startsWith(ICONS_PREFIX)) {
        return iconName;
    }
    // Now look up icon indirection name, e.g. '$vuetify.icons.cancel'
    return getObjectValueByPath(vm, iconName, iconName);
}
function keys(o) {
    return Object.keys(o);
}
/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = function camelize(str) {
    return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
};
/**
 * Returns the set difference of B and A, i.e. the set of elements in B but not in A
 */
function arrayDiff(a, b) {
    var diff = [];
    for (var i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) < 0) diff.push(b[i]);
    }
    return diff;
}
/**
 * Makes the first character of a string uppercase
 */
function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Returns:
 *  - 'normal' for old style slots - `<template slot="default">`
 *  - 'scoped' for old style scoped slots (`<template slot="default" slot-scope="data">`) or bound v-slot (`#default="data"`)
 *  - 'v-slot' for unbound v-slot (`#default`) - only if the third param is true, otherwise counts as scoped
 */
function getSlotType(vm, name, split) {
    if (vm.$slots[name] && vm.$scopedSlots[name] && vm.$scopedSlots[name].name) {
        return split ? 'v-slot' : 'scoped';
    }
    if (vm.$slots[name]) return 'normal';
    if (vm.$scopedSlots[name]) return 'scoped';
}
//# sourceMappingURL=helpers.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/positionable.js


var availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
};
function positionable_factory() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'positionable',
    props: selected.length ? filterObjectOnKeys(availableProps, selected) : availableProps
  });
}
/* harmony default export */ var positionable = (positionable_factory());
// Add a `*` before the second `/`
/* Tests /
let single = factory(['top']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let some = factory(['top', 'bottom']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let all = factory().extend({
  created () {
    this.top
    this.bottom
    this.absolute
    this.foobar
  }
})
/**/
//# sourceMappingURL=positionable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/directives/ripple.js

function transform(el, value) {
    el.style['transform'] = value;
    el.style['webkitTransform'] = value;
}
function opacity(el, value) {
    el.style['opacity'] = value.toString();
}
function isTouchEvent(e) {
    return e.constructor.name === 'TouchEvent';
}
var calculate = function calculate(e, el) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var offset = el.getBoundingClientRect();
    var target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    var localX = target.clientX - offset.left;
    var localY = target.clientY - offset.top;
    var radius = 0;
    var scale = 0.3;
    if (el._ripple && el._ripple.circle) {
        scale = 0.15;
        radius = el.clientWidth / 2;
        radius = value.center ? radius : radius + Math.sqrt(Math.pow(localX - radius, 2) + Math.pow(localY - radius, 2)) / 4;
    } else {
        radius = Math.sqrt(Math.pow(el.clientWidth, 2) + Math.pow(el.clientHeight, 2)) / 2;
    }
    var centerX = (el.clientWidth - radius * 2) / 2 + 'px';
    var centerY = (el.clientHeight - radius * 2) / 2 + 'px';
    var x = value.center ? centerX : localX - radius + 'px';
    var y = value.center ? centerY : localY - radius + 'px';
    return { radius: radius, scale: scale, x: x, y: y, centerX: centerX, centerY: centerY };
};
var ripple = {
    /* eslint-disable max-statements */
    show: function show(e, el) {
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!el._ripple || !el._ripple.enabled) {
            return;
        }
        var container = document.createElement('span');
        var animation = document.createElement('span');
        container.appendChild(animation);
        container.className = 'v-ripple__container';
        if (value.class) {
            container.className += ' ' + value.class;
        }

        var _calculate = calculate(e, el, value),
            radius = _calculate.radius,
            scale = _calculate.scale,
            x = _calculate.x,
            y = _calculate.y,
            centerX = _calculate.centerX,
            centerY = _calculate.centerY;

        var size = radius * 2 + 'px';
        animation.className = 'v-ripple__animation';
        animation.style.width = size;
        animation.style.height = size;
        el.appendChild(container);
        var computed = window.getComputedStyle(el);
        if (computed.position === 'static') {
            el.style.position = 'relative';
            el.dataset.previousPosition = 'static';
        }
        animation.classList.add('v-ripple__animation--enter');
        animation.classList.add('v-ripple__animation--visible');
        transform(animation, 'translate(' + x + ', ' + y + ') scale3d(' + scale + ',' + scale + ',' + scale + ')');
        opacity(animation, 0);
        animation.dataset.activated = String(performance.now());
        setTimeout(function () {
            animation.classList.remove('v-ripple__animation--enter');
            animation.classList.add('v-ripple__animation--in');
            transform(animation, 'translate(' + centerX + ', ' + centerY + ') scale3d(1,1,1)');
            opacity(animation, 0.25);
        }, 0);
    },
    hide: function hide(el) {
        if (!el || !el._ripple || !el._ripple.enabled) return;
        var ripples = el.getElementsByClassName('v-ripple__animation');
        if (ripples.length === 0) return;
        var animation = ripples[ripples.length - 1];
        if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
        var diff = performance.now() - Number(animation.dataset.activated);
        var delay = Math.max(250 - diff, 0);
        setTimeout(function () {
            animation.classList.remove('v-ripple__animation--in');
            animation.classList.add('v-ripple__animation--out');
            opacity(animation, 0);
            setTimeout(function () {
                var ripples = el.getElementsByClassName('v-ripple__animation');
                if (ripples.length === 1 && el.dataset.previousPosition) {
                    el.style.position = el.dataset.previousPosition;
                    delete el.dataset.previousPosition;
                }
                animation.parentNode && el.removeChild(animation.parentNode);
            }, 300);
        }, delay);
    }
};
function isRippleEnabled(value) {
    return typeof value === 'undefined' || !!value;
}
function rippleShow(e) {
    var value = {};
    var element = e.currentTarget;
    if (!element || element._ripple.touched) return;
    if (isTouchEvent(e)) {
        element._ripple.touched = true;
    }
    value.center = element._ripple.centered;
    if (element._ripple.class) {
        value.class = element._ripple.class;
    }
    ripple.show(e, element, value);
}
function rippleHide(e) {
    var element = e.currentTarget;
    if (!element) return;
    window.setTimeout(function () {
        element._ripple.touched = false;
    });
    ripple.hide(element);
}
function updateRipple(el, binding, wasEnabled) {
    var enabled = isRippleEnabled(binding.value);
    if (!enabled) {
        ripple.hide(el);
    }
    el._ripple = el._ripple || {};
    el._ripple.enabled = enabled;
    var value = binding.value || {};
    if (value.center) {
        el._ripple.centered = true;
    }
    if (value.class) {
        el._ripple.class = binding.value.class;
    }
    if (value.circle) {
        el._ripple.circle = value.circle;
    }
    if (enabled && !wasEnabled) {
        el.addEventListener('touchstart', rippleShow, { passive: true });
        el.addEventListener('touchend', rippleHide, { passive: true });
        el.addEventListener('touchcancel', rippleHide);
        el.addEventListener('mousedown', rippleShow);
        el.addEventListener('mouseup', rippleHide);
        el.addEventListener('mouseleave', rippleHide);
        // Anchor tags can be dragged, causes other hides to fail - #1537
        el.addEventListener('dragstart', rippleHide, { passive: true });
    } else if (!enabled && wasEnabled) {
        removeListeners(el);
    }
}
function removeListeners(el) {
    el.removeEventListener('mousedown', rippleShow);
    el.removeEventListener('touchstart', rippleHide);
    el.removeEventListener('touchend', rippleHide);
    el.removeEventListener('touchcancel', rippleHide);
    el.removeEventListener('mouseup', rippleHide);
    el.removeEventListener('mouseleave', rippleHide);
    el.removeEventListener('dragstart', rippleHide);
}
function directive(el, binding, node) {
    updateRipple(el, binding, false);
    // warn if an inline element is used, waiting for el to be in the DOM first
    node.context && node.context.$nextTick(function () {
        if (window.getComputedStyle(el).display === 'inline') {
            var context = node.fnOptions ? [node.fnOptions, node.context] : [node.componentInstance];
            consoleWarn.apply(undefined, ['v-ripple can only be used on block-level elements'].concat(context));
        }
    });
}
function unbind(el) {
    delete el._ripple;
    removeListeners(el);
}
function update(el, binding) {
    if (binding.value === binding.oldValue) {
        return;
    }
    var wasEnabled = isRippleEnabled(binding.oldValue);
    updateRipple(el, binding, wasEnabled);
}
/* harmony default export */ var directives_ripple = ({
    bind: directive,
    unbind: unbind,
    update: update
});
//# sourceMappingURL=ripple.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/routable.js
var routable_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function routable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ var routable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'routable',
    directives: {
        Ripple: directives_ripple
    },
    props: {
        activeClass: String,
        append: Boolean,
        disabled: Boolean,
        exact: {
            type: Boolean,
            default: undefined
        },
        exactActiveClass: String,
        href: [String, Object],
        to: [String, Object],
        nuxt: Boolean,
        replace: Boolean,
        ripple: [Boolean, Object],
        tag: String,
        target: String
    },
    computed: {
        computedRipple: function computedRipple() {
            return this.ripple && !this.disabled ? this.ripple : false;
        }
    },
    methods: {
        click: function click(e) {
            this.$emit('click', e);
        },
        generateRouteLink: function generateRouteLink(classes) {
            var exact = this.exact;
            var tag = void 0;
            var data = routable_defineProperty({
                attrs: { disabled: this.disabled },
                class: classes,
                props: {},
                directives: [{
                    name: 'ripple',
                    value: this.computedRipple
                }]
            }, this.to ? 'nativeOn' : 'on', routable_extends({}, this.$listeners, {
                click: this.click
            }));
            if (typeof this.exact === 'undefined') {
                exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
            }
            if (this.to) {
                // Add a special activeClass hook
                // for component level styles
                var activeClass = this.activeClass;
                var exactActiveClass = this.exactActiveClass || activeClass;
                // TODO: apply only in VListTile
                if (this.proxyClass) {
                    activeClass += ' ' + this.proxyClass;
                    exactActiveClass += ' ' + this.proxyClass;
                }
                tag = this.nuxt ? 'nuxt-link' : 'router-link';
                Object.assign(data.props, {
                    to: this.to,
                    exact: exact,
                    activeClass: activeClass,
                    exactActiveClass: exactActiveClass,
                    append: this.append,
                    replace: this.replace
                });
            } else {
                tag = this.href && 'a' || this.tag || 'a';
                if (tag === 'a' && this.href) data.attrs.href = this.href;
            }
            if (this.target) data.attrs.target = this.target;
            return { tag: tag, data: data };
        }
    }
}));
//# sourceMappingURL=routable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/themeable.js
var themeable_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


function functionalThemeClasses(context) {
    var vm = themeable_extends({}, context.props, context.injections);
    var isDark = Themeable.options.computed.isDark.call(vm);
    return Themeable.options.computed.themeClasses.call({ isDark: isDark });
}
/* @vue/component */
var Themeable = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
    name: 'themeable',
    provide: function provide() {
        return {
            theme: this.themeableProvide
        };
    },

    inject: {
        theme: {
            default: {
                isDark: false
            }
        }
    },
    props: {
        dark: {
            type: Boolean,
            default: null
        },
        light: {
            type: Boolean,
            default: null
        }
    },
    data: function data() {
        return {
            themeableProvide: {
                isDark: false
            }
        };
    },

    computed: {
        isDark: function isDark() {
            if (this.dark === true) {
                // explicitly dark
                return true;
            } else if (this.light === true) {
                // explicitly light
                return false;
            } else {
                // inherit from parent, or default false if there is none
                return this.theme.isDark;
            }
        },
        themeClasses: function themeClasses() {
            return {
                'theme--dark': this.isDark,
                'theme--light': !this.isDark
            };
        },

        /** Used by menus and dialogs, inherits from v-app instead of the parent */
        rootIsDark: function rootIsDark() {
            if (this.dark === true) {
                // explicitly dark
                return true;
            } else if (this.light === true) {
                // explicitly light
                return false;
            } else {
                // inherit from v-app
                return this.$vuetify.dark;
            }
        },
        rootThemeClasses: function rootThemeClasses() {
            return {
                'theme--dark': this.rootIsDark,
                'theme--light': !this.rootIsDark
            };
        }
    },
    watch: {
        isDark: {
            handler: function handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.themeableProvide.isDark = this.isDark;
                }
            },

            immediate: true
        }
    }
});
/* harmony default export */ var themeable = (Themeable);
//# sourceMappingURL=themeable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/toggleable.js
function toggleable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function toggleable_factory() {
    var _watch;

    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';

    return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
        name: 'toggleable',
        model: { prop: prop, event: event },
        props: toggleable_defineProperty({}, prop, { required: false }),
        data: function data() {
            return {
                isActive: !!this[prop]
            };
        },

        watch: (_watch = {}, toggleable_defineProperty(_watch, prop, function (val) {
            this.isActive = !!val;
        }), toggleable_defineProperty(_watch, 'isActive', function isActive(val) {
            !!val !== this[prop] && this.$emit(event, val);
        }), _watch)
    });
}
/* eslint-disable-next-line no-redeclare */
var Toggleable = toggleable_factory();
/* harmony default export */ var toggleable = (Toggleable);
//# sourceMappingURL=toggleable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var VBtn_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function VBtn_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Styles


// Components

// Mixins






// Utilities

var baseMixins = mixins(colorable, routable, positionable, themeable, factory('btnToggle'), toggleable_factory('inputValue')
/* @vue/component */
);
/* harmony default export */ var VBtn = (baseMixins.extend().extend({
    name: 'v-btn',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        },
        block: Boolean,
        depressed: Boolean,
        fab: Boolean,
        flat: Boolean,
        icon: Boolean,
        large: Boolean,
        loading: Boolean,
        outline: Boolean,
        ripple: {
            type: [Boolean, Object],
            default: null
        },
        round: Boolean,
        small: Boolean,
        tag: {
            type: String,
            default: 'button'
        },
        type: {
            type: String,
            default: 'button'
        },
        value: null
    },
    computed: {
        classes: function classes() {
            var _extends2;

            return VBtn_extends((_extends2 = {
                'v-btn': true
            }, VBtn_defineProperty(_extends2, this.activeClass, this.isActive), VBtn_defineProperty(_extends2, 'v-btn--absolute', this.absolute), VBtn_defineProperty(_extends2, 'v-btn--block', this.block), VBtn_defineProperty(_extends2, 'v-btn--bottom', this.bottom), VBtn_defineProperty(_extends2, 'v-btn--disabled', this.disabled), VBtn_defineProperty(_extends2, 'v-btn--flat', this.flat), VBtn_defineProperty(_extends2, 'v-btn--floating', this.fab), VBtn_defineProperty(_extends2, 'v-btn--fixed', this.fixed), VBtn_defineProperty(_extends2, 'v-btn--icon', this.icon), VBtn_defineProperty(_extends2, 'v-btn--large', this.large), VBtn_defineProperty(_extends2, 'v-btn--left', this.left), VBtn_defineProperty(_extends2, 'v-btn--loader', this.loading), VBtn_defineProperty(_extends2, 'v-btn--outline', this.outline), VBtn_defineProperty(_extends2, 'v-btn--depressed', this.depressed && !this.flat || this.outline), VBtn_defineProperty(_extends2, 'v-btn--right', this.right), VBtn_defineProperty(_extends2, 'v-btn--round', this.round), VBtn_defineProperty(_extends2, 'v-btn--router', this.to), VBtn_defineProperty(_extends2, 'v-btn--small', this.small), VBtn_defineProperty(_extends2, 'v-btn--top', this.top), _extends2), this.themeClasses);
        },
        computedRipple: function computedRipple() {
            var defaultRipple = this.icon || this.fab ? { circle: true } : true;
            if (this.disabled) return false;else return this.ripple !== null ? this.ripple : defaultRipple;
        }
    },
    watch: {
        '$route': 'onRouteChange'
    },
    methods: {
        // Prevent focus to match md spec
        click: function click(e) {
            !this.fab && e.detail && this.$el.blur();
            this.$emit('click', e);
            this.btnToggle && this.toggle();
        },
        genContent: function genContent() {
            return this.$createElement('div', { 'class': 'v-btn__content' }, this.$slots.default);
        },
        genLoader: function genLoader() {
            return this.$createElement('span', {
                class: 'v-btn__loading'
            }, this.$slots.loader || [this.$createElement(components_VProgressCircular, {
                props: {
                    indeterminate: true,
                    size: 23,
                    width: 2
                }
            })]);
        },
        onRouteChange: function onRouteChange() {
            var _this = this;

            if (!this.to || !this.$refs.link) return;
            var path = '_vnode.data.class.' + this.activeClass;
            this.$nextTick(function () {
                if (getObjectValueByPath(_this.$refs.link, path)) {
                    _this.toggle();
                }
            });
        }
    },
    render: function render(h) {
        var setColor = !this.outline && !this.flat && !this.disabled ? this.setBackgroundColor : this.setTextColor;

        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        var children = [this.genContent(), this.loading && this.genLoader()];
        if (tag === 'button') data.attrs.type = this.type;
        data.attrs.value = ['string', 'number'].includes(VBtn_typeof(this.value)) ? this.value : JSON.stringify(this.value);
        if (this.btnToggle) {
            data.ref = 'link';
        }
        return h(tag, setColor(this.color, data), children);
    }
}));
//# sourceMappingURL=VBtn.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_cards.styl
var _cards = __webpack_require__("6bce");

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_sheet.styl
var _sheet = __webpack_require__("cd25");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/elevatable.js
function elevatable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ var elevatable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'elevatable',
    props: {
        elevation: [Number, String]
    },
    computed: {
        computedElevation: function computedElevation() {
            return this.elevation;
        },
        elevationClasses: function elevationClasses() {
            if (!this.computedElevation) return {};
            return elevatable_defineProperty({}, 'elevation-' + this.computedElevation, true);
        }
    }
}));
//# sourceMappingURL=elevatable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/measurable.js
// Helpers

// Types

/* harmony default export */ var measurable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'measurable',
    props: {
        height: [Number, String],
        maxHeight: [Number, String],
        maxWidth: [Number, String],
        minHeight: [Number, String],
        minWidth: [Number, String],
        width: [Number, String]
    },
    computed: {
        measurableStyles: function measurableStyles() {
            var styles = {};
            var height = convertToUnit(this.height);
            var minHeight = convertToUnit(this.minHeight);
            var minWidth = convertToUnit(this.minWidth);
            var maxHeight = convertToUnit(this.maxHeight);
            var maxWidth = convertToUnit(this.maxWidth);
            var width = convertToUnit(this.width);
            if (height) styles.height = height;
            if (minHeight) styles.minHeight = minHeight;
            if (minWidth) styles.minWidth = minWidth;
            if (maxHeight) styles.maxHeight = maxHeight;
            if (maxWidth) styles.maxWidth = maxWidth;
            if (width) styles.width = width;
            return styles;
        }
    }
}));
//# sourceMappingURL=measurable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VSheet/VSheet.js
var VSheet_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Mixins




// Helpers

/* @vue/component */
/* harmony default export */ var VSheet = (mixins(colorable, elevatable, measurable, themeable).extend({
    name: 'v-sheet',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        tile: Boolean
    },
    computed: {
        classes: function classes() {
            return VSheet_extends({
                'v-sheet': true,
                'v-sheet--tile': this.tile
            }, this.themeClasses, this.elevationClasses);
        },
        styles: function styles() {
            return this.measurableStyles;
        }
    },
    render: function render(h) {
        var data = {
            class: this.classes,
            style: this.styles
        };
        return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
}));
//# sourceMappingURL=VSheet.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VSheet/index.js


/* harmony default export */ var components_VSheet = (VSheet);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCard/VCard.js
var VCard_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Extensions

// Mixins

// Helpers

/* @vue/component */
/* harmony default export */ var VCard = (mixins(routable, components_VSheet).extend({
    name: 'v-card',
    props: {
        flat: Boolean,
        hover: Boolean,
        img: String,
        raised: Boolean
    },
    computed: {
        classes: function classes() {
            return VCard_extends({
                'v-card': true,
                'v-card--flat': this.flat,
                'v-card--hover': this.hover
            }, components_VSheet.options.computed.classes.call(this));
        },
        styles: function styles() {
            var style = VCard_extends({}, components_VSheet.options.computed.styles.call(this));
            if (this.img) {
                style.background = 'url("' + this.img + '") center center / cover no-repeat';
            }
            return style;
        }
    },
    render: function render(h) {
        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        data.style = this.styles;
        return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
}));
//# sourceMappingURL=VCard.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_images.styl
var _images = __webpack_require__("6ee2");

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_responsive.styl
var _responsive = __webpack_require__("ea97");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VResponsive/VResponsive.js

// Mixins

// Utils

/* @vue/component */
/* harmony default export */ var VResponsive = (mixins(measurable).extend({
    name: 'v-responsive',
    props: {
        aspectRatio: [String, Number]
    },
    computed: {
        computedAspectRatio: function computedAspectRatio() {
            return Number(this.aspectRatio);
        },
        aspectStyle: function aspectStyle() {
            return this.computedAspectRatio ? { paddingBottom: 1 / this.computedAspectRatio * 100 + '%' } : undefined;
        },
        __cachedSizer: function __cachedSizer() {
            if (!this.aspectStyle) return [];
            return this.$createElement('div', {
                style: this.aspectStyle,
                staticClass: 'v-responsive__sizer'
            });
        }
    },
    methods: {
        genContent: function genContent() {
            return this.$createElement('div', {
                staticClass: 'v-responsive__content'
            }, this.$slots.default);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-responsive',
            style: this.measurableStyles,
            on: this.$listeners
        }, [this.__cachedSizer, this.genContent()]);
    }
}));
//# sourceMappingURL=VResponsive.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VResponsive/index.js


/* harmony default export */ var components_VResponsive = (VResponsive);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VImg/VImg.js

// Components

// Utils

/* @vue/component */
/* harmony default export */ var VImg = (components_VResponsive.extend({
    name: 'v-img',
    props: {
        alt: String,
        contain: Boolean,
        src: {
            type: [String, Object],
            default: ''
        },
        gradient: String,
        lazySrc: String,
        srcset: String,
        sizes: String,
        position: {
            type: String,
            default: 'center center'
        },
        transition: {
            type: [Boolean, String],
            default: 'fade-transition'
        }
    },
    data: function data() {
        return {
            currentSrc: '',
            image: null,
            isLoading: true,
            calculatedAspectRatio: undefined
        };
    },

    computed: {
        computedAspectRatio: function computedAspectRatio() {
            return this.normalisedSrc.aspect;
        },
        normalisedSrc: function normalisedSrc() {
            return typeof this.src === 'string' ? {
                src: this.src,
                srcset: this.srcset,
                lazySrc: this.lazySrc,
                aspect: Number(this.aspectRatio || this.calculatedAspectRatio)
            } : {
                src: this.src.src,
                srcset: this.srcset || this.src.srcset,
                lazySrc: this.lazySrc || this.src.lazySrc,
                aspect: Number(this.aspectRatio || this.src.aspect || this.calculatedAspectRatio)
            };
        },
        __cachedImage: function __cachedImage() {
            if (!(this.normalisedSrc.src || this.normalisedSrc.lazySrc)) return [];
            var backgroundImage = [];
            var src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc;
            if (this.gradient) backgroundImage.push('linear-gradient(' + this.gradient + ')');
            if (src) backgroundImage.push('url("' + src + '")');
            var image = this.$createElement('div', {
                staticClass: 'v-image__image',
                class: {
                    'v-image__image--preload': this.isLoading,
                    'v-image__image--contain': this.contain,
                    'v-image__image--cover': !this.contain
                },
                style: {
                    backgroundImage: backgroundImage.join(', '),
                    backgroundPosition: this.position
                },
                key: +this.isLoading
            });
            if (!this.transition) return image;
            return this.$createElement('transition', {
                attrs: {
                    name: this.transition,
                    mode: 'in-out'
                }
            }, [image]);
        }
    },
    watch: {
        src: function src() {
            if (!this.isLoading) this.init();else this.loadImage();
        },

        '$vuetify.breakpoint.width': 'getSrc'
    },
    mounted: function mounted() {
        this.init();
    },

    methods: {
        init: function init() {
            if (this.normalisedSrc.lazySrc) {
                var lazyImg = new Image();
                lazyImg.src = this.normalisedSrc.lazySrc;
                this.pollForSize(lazyImg, null);
            }
            /* istanbul ignore else */
            if (this.normalisedSrc.src) this.loadImage();
        },
        onLoad: function onLoad() {
            this.getSrc();
            this.isLoading = false;
            this.$emit('load', this.src);
        },
        onError: function onError() {
            consoleError('Image load failed\n\n' + ('src: ' + this.normalisedSrc.src), this);
            this.$emit('error', this.src);
        },
        getSrc: function getSrc() {
            /* istanbul ignore else */
            if (this.image) this.currentSrc = this.image.currentSrc || this.image.src;
        },
        loadImage: function loadImage() {
            var _this = this;

            var image = new Image();
            this.image = image;
            image.onload = function () {
                /* istanbul ignore if */
                if (image.decode) {
                    image.decode().catch(function (err) {
                        consoleWarn('Failed to decode image, trying to render anyway\n\n' + ('src: ' + _this.normalisedSrc.src) + (err.message ? '\nOriginal error: ' + err.message : ''), _this);
                    }).then(_this.onLoad);
                } else {
                    _this.onLoad();
                }
            };
            image.onerror = this.onError;
            image.src = this.normalisedSrc.src;
            this.sizes && (image.sizes = this.sizes);
            this.normalisedSrc.srcset && (image.srcset = this.normalisedSrc.srcset);
            this.aspectRatio || this.pollForSize(image);
            this.getSrc();
        },
        pollForSize: function pollForSize(img) {
            var _this2 = this;

            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

            var poll = function poll() {
                var naturalHeight = img.naturalHeight,
                    naturalWidth = img.naturalWidth;

                if (naturalHeight || naturalWidth) {
                    _this2.calculatedAspectRatio = naturalWidth / naturalHeight;
                } else {
                    timeout != null && setTimeout(poll, timeout);
                }
            };
            poll();
        },
        __genPlaceholder: function __genPlaceholder() {
            if (this.$slots.placeholder) {
                var placeholder = this.isLoading ? [this.$createElement('div', {
                    staticClass: 'v-image__placeholder'
                }, this.$slots.placeholder)] : [];
                if (!this.transition) return placeholder[0];
                return this.$createElement('transition', {
                    attrs: { name: this.transition }
                }, placeholder);
            }
        }
    },
    render: function render(h) {
        var node = components_VResponsive.options.render.call(this, h);
        node.data.staticClass += ' v-image';
        node.data.attrs = {
            role: this.alt ? 'img' : undefined,
            'aria-label': this.alt
        };
        node.children = [this.__cachedSizer, this.__cachedImage, this.__genPlaceholder(), this.genContent()];
        return h(node.tag, node.data, node.children);
    }
}));
//# sourceMappingURL=VImg.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCard/VCardMedia.js
// Components

// Utils

/* istanbul ignore next */
/* @vue/component */
/* harmony default export */ var VCardMedia = (VImg.extend({
    name: 'v-card-media',
    mounted: function mounted() {
        deprecate('v-card-media', this.src ? 'v-img' : 'v-responsive', this);
    }
}));
//# sourceMappingURL=VCardMedia.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCard/VCardTitle.js
// Types

/* @vue/component */
/* harmony default export */ var VCardTitle = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'v-card-title',
    functional: true,
    props: {
        primaryTitle: Boolean
    },
    render: function render(h, _ref) {
        var data = _ref.data,
            props = _ref.props,
            children = _ref.children;

        data.staticClass = ('v-card__title ' + (data.staticClass || '')).trim();
        if (props.primaryTitle) data.staticClass += ' v-card__title--primary';
        return h('div', data, children);
    }
}));
//# sourceMappingURL=VCardTitle.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCard/index.js




var VCardActions = createSimpleFunctional('v-card__actions');
var VCardText = createSimpleFunctional('v-card__text');

/* harmony default export */ var components_VCard = ({
    $_vuetify_subcomponents: {
        VCard: VCard,
        VCardMedia: VCardMedia,
        VCardTitle: VCardTitle,
        VCardActions: VCardActions,
        VCardText: VCardText
    }
});
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_grid.styl
var _grid = __webpack_require__("083c");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VGrid/grid.js
function Grid(name) {
    /* @vue/component */
    return {
        name: 'v-' + name,
        functional: true,
        props: {
            id: String,
            tag: {
                type: String,
                default: 'div'
            }
        },
        render: function render(h, _ref) {
            var props = _ref.props,
                data = _ref.data,
                children = _ref.children;

            data.staticClass = (name + ' ' + (data.staticClass || '')).trim();
            var attrs = data.attrs;

            if (attrs) {
                // reset attrs to extract utility clases like pa-3
                data.attrs = {};
                var classes = Object.keys(attrs).filter(function (key) {
                    // TODO: Remove once resolved
                    // https://github.com/vuejs/vue/issues/7841
                    if (key === 'slot') return false;
                    var value = attrs[key];
                    // add back data attributes like data-test="foo" but do not
                    // add them as classes
                    if (key.startsWith('data-')) {
                        data.attrs[key] = value;
                        return false;
                    }
                    return value || typeof value === 'string';
                });
                if (classes.length) data.staticClass += ' ' + classes.join(' ');
            }
            if (props.id) {
                data.domProps = data.domProps || {};
                data.domProps.id = props.id;
            }
            return h(props.tag, data, children);
        }
    };
}
//# sourceMappingURL=grid.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VGrid/VContainer.js


/* harmony default export */ var VContainer = (Grid('container'));
//# sourceMappingURL=VContainer.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_dialogs.styl
var _dialogs = __webpack_require__("f091");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/dependent.js
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


function searchChildren(children) {
    var results = [];
    for (var index = 0; index < children.length; index++) {
        var child = children[index];
        if (child.isActive && child.isDependent) {
            results.push(child);
        } else {
            results.push.apply(results, _toConsumableArray(searchChildren(child.$children)));
        }
    }
    return results;
}
/* @vue/component */
/* harmony default export */ var dependent = (mixins().extend({
    name: 'dependent',
    data: function data() {
        return {
            closeDependents: true,
            isActive: false,
            isDependent: true
        };
    },

    watch: {
        isActive: function isActive(val) {
            if (val) return;
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                openDependents[index].isActive = false;
            }
        }
    },
    methods: {
        getOpenDependents: function getOpenDependents() {
            if (this.closeDependents) return searchChildren(this.$children);
            return [];
        },
        getOpenDependentElements: function getOpenDependentElements() {
            var result = [];
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                result.push.apply(result, _toConsumableArray(openDependents[index].getClickableDependentElements()));
            }
            return result;
        },
        getClickableDependentElements: function getClickableDependentElements() {
            var result = [this.$el];
            if (this.$refs.content) result.push(this.$refs.content);
            result.push.apply(result, _toConsumableArray(this.getOpenDependentElements()));
            return result;
        }
    }
}));
//# sourceMappingURL=dependent.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/bootable.js

/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* @vue/component */
/* harmony default export */ var bootable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
    name: 'bootable',
    props: {
        lazy: Boolean
    },
    data: function data() {
        return {
            isBooted: false
        };
    },
    computed: {
        hasContent: function hasContent() {
            return this.isBooted || !this.lazy || this.isActive;
        }
    },
    watch: {
        isActive: function isActive() {
            this.isBooted = true;
        }
    },
    methods: {
        showLazyContent: function showLazyContent(content) {
            return this.hasContent ? content : undefined;
        }
    }
}));
//# sourceMappingURL=bootable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/detachable.js
var detachable_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function detachable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function validateAttachTarget(val) {
    var type = typeof val === 'undefined' ? 'undefined' : detachable_typeof(val);
    if (type === 'boolean' || type === 'string') return true;
    return val.nodeType === Node.ELEMENT_NODE;
}
/* @vue/component */
/* harmony default export */ var detachable = ({
    name: 'detachable',
    mixins: [bootable],
    props: {
        attach: {
            type: null,
            default: false,
            validator: validateAttachTarget
        },
        contentClass: {
            default: ''
        }
    },
    data: function data() {
        return {
            hasDetached: false
        };
    },
    watch: {
        attach: function attach() {
            this.hasDetached = false;
            this.initDetach();
        },

        hasContent: 'initDetach'
    },
    beforeMount: function beforeMount() {
        var _this = this;

        this.$nextTick(function () {
            if (_this.activatorNode) {
                var activator = Array.isArray(_this.activatorNode) ? _this.activatorNode : [_this.activatorNode];
                activator.forEach(function (node) {
                    node.elm && _this.$el.parentNode.insertBefore(node.elm, _this.$el);
                });
            }
        });
    },
    mounted: function mounted() {
        !this.lazy && this.initDetach();
    },
    deactivated: function deactivated() {
        this.isActive = false;
    },
    beforeDestroy: function beforeDestroy() {
        if (!this.$refs.content) return;
        // IE11 Fix
        try {
            this.$refs.content.parentNode.removeChild(this.$refs.content);
        } catch (e) {
            console.log(e);
        }
    },

    methods: {
        getScopeIdAttrs: function getScopeIdAttrs() {
            var scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
            return scopeId && detachable_defineProperty({}, scopeId, '');
        },
        initDetach: function initDetach() {
            if (this._isDestroyed || !this.$refs.content || this.hasDetached ||
            // Leave menu in place if attached
            // and dev has not changed target
            this.attach === '' || // If used as a boolean prop (<v-menu attach>)
            this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
            this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
            ) return;
            var target = void 0;
            if (this.attach === false) {
                // Default, detach to app
                target = document.querySelector('[data-app]');
            } else if (typeof this.attach === 'string') {
                // CSS selector
                target = document.querySelector(this.attach);
            } else {
                // DOM Element
                target = this.attach;
            }
            if (!target) {
                consoleWarn('Unable to locate target ' + (this.attach || '[data-app]'), this);
                return;
            }
            target.insertBefore(this.$refs.content, target.firstChild);
            this.hasDetached = true;
        }
    }
});
//# sourceMappingURL=detachable.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_overlay.styl
var _overlay = __webpack_require__("35b2");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/overlayable.js
// Styles

// Utilities

// Types

/* @vue/component */
/* harmony default export */ var overlayable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
    name: 'overlayable',
    props: {
        hideOverlay: Boolean
    },
    data: function data() {
        return {
            overlay: null,
            overlayOffset: 0,
            overlayTimeout: undefined,
            overlayTransitionDuration: 500 + 150 // transition + delay
        };
    },

    watch: {
        hideOverlay: function hideOverlay(value) {
            if (value) this.removeOverlay();else this.genOverlay();
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.removeOverlay();
    },

    methods: {
        genOverlay: function genOverlay() {
            var _this = this;

            // If fn is called and timeout is active
            // or overlay already exists
            // cancel removal of overlay and re-add active
            if (!this.isActive || this.hideOverlay || this.isActive && this.overlayTimeout || this.overlay) {
                clearTimeout(this.overlayTimeout);
                return this.overlay && this.overlay.classList.add('v-overlay--active');
            }
            this.overlay = document.createElement('div');
            this.overlay.className = 'v-overlay';
            if (this.absolute) this.overlay.className += ' v-overlay--absolute';
            this.hideScroll();
            var parent = this.absolute ? this.$el.parentNode : document.querySelector('[data-app]');
            parent && parent.insertBefore(this.overlay, parent.firstChild);
            // eslint-disable-next-line no-unused-expressions
            this.overlay.clientHeight; // Force repaint
            requestAnimationFrame(function () {
                // https://github.com/vuetifyjs/vuetify/issues/4678
                if (!_this.overlay) return;
                _this.overlay.className += ' v-overlay--active';
                if (_this.activeZIndex !== undefined) {
                    _this.overlay.style.zIndex = String(_this.activeZIndex - 1);
                }
            });
            return true;
        },

        /** removeOverlay(false) will not restore the scollbar afterwards */
        removeOverlay: function removeOverlay() {
            var _this2 = this;

            var showScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (!this.overlay) {
                return showScroll && this.showScroll();
            }
            this.overlay.classList.remove('v-overlay--active');
            this.overlayTimeout = window.setTimeout(function () {
                // IE11 Fix
                try {
                    if (_this2.overlay && _this2.overlay.parentNode) {
                        _this2.overlay.parentNode.removeChild(_this2.overlay);
                    }
                    _this2.overlay = null;
                    showScroll && _this2.showScroll();
                } catch (e) {
                    console.log(e);
                }
                clearTimeout(_this2.overlayTimeout);
                _this2.overlayTimeout = undefined;
            }, this.overlayTransitionDuration);
        },
        scrollListener: function scrollListener(e) {
            if (e.type === 'keydown') {
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
                // https://github.com/vuetifyjs/vuetify/issues/4715
                e.target.isContentEditable) return;
                var up = [keyCodes.up, keyCodes.pageup];
                var down = [keyCodes.down, keyCodes.pagedown];
                if (up.includes(e.keyCode)) {
                    e.deltaY = -1;
                } else if (down.includes(e.keyCode)) {
                    e.deltaY = 1;
                } else {
                    return;
                }
            }
            if (e.target === this.overlay || e.type !== 'keydown' && e.target === document.body || this.checkPath(e)) e.preventDefault();
        },
        hasScrollbar: function hasScrollbar(el) {
            if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
            var style = window.getComputedStyle(el);
            return ['auto', 'scroll'].includes(style.overflowY) && el.scrollHeight > el.clientHeight;
        },
        shouldScroll: function shouldScroll(el, delta) {
            if (el.scrollTop === 0 && delta < 0) return true;
            return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
        },
        isInside: function isInside(el, parent) {
            if (el === parent) {
                return true;
            } else if (el === null || el === document.body) {
                return false;
            } else {
                return this.isInside(el.parentNode, parent);
            }
        },
        checkPath: function checkPath(e) {
            var path = e.path || this.composedPath(e);
            var delta = e.deltaY;
            if (e.type === 'keydown' && path[0] === document.body) {
                var dialog = this.$refs.dialog;
                var selected = window.getSelection().anchorNode;
                if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
                    return this.shouldScroll(dialog, delta);
                }
                return true;
            }
            for (var index = 0; index < path.length; index++) {
                var el = path[index];
                if (el === document) return true;
                if (el === document.documentElement) return true;
                if (el === this.$refs.content) return true;
                if (this.hasScrollbar(el)) return this.shouldScroll(el, delta);
            }
            return true;
        },

        /**
         * Polyfill for Event.prototype.composedPath
         */
        composedPath: function composedPath(e) {
            if (e.composedPath) return e.composedPath();
            var path = [];
            var el = e.target;
            while (el) {
                path.push(el);
                if (el.tagName === 'HTML') {
                    path.push(document);
                    path.push(window);
                    return path;
                }
                el = el.parentElement;
            }
            return path;
        },
        hideScroll: function hideScroll() {
            if (this.$vuetify.breakpoint.smAndDown) {
                document.documentElement.classList.add('overflow-y-hidden');
            } else {
                window.addEventListener('wheel', this.scrollListener, { passive: false });
                window.addEventListener('keydown', this.scrollListener);
            }
        },
        showScroll: function showScroll() {
            document.documentElement.classList.remove('overflow-y-hidden');
            window.removeEventListener('wheel', this.scrollListener);
            window.removeEventListener('keydown', this.scrollListener);
        }
    }
}));
//# sourceMappingURL=overlayable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/returnable.js

/* @vue/component */
/* harmony default export */ var returnable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'returnable',
    props: {
        returnValue: null
    },
    data: function data() {
        return {
            isActive: false,
            originalValue: null
        };
    },
    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.originalValue = this.returnValue;
            } else {
                this.$emit('update:returnValue', this.originalValue);
            }
        }
    },
    methods: {
        save: function save(value) {
            this.originalValue = value;
            this.isActive = false;
        }
    }
}));
//# sourceMappingURL=returnable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/stackable.js
function stackable_toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



/* @vue/component */
/* harmony default export */ var stackable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
    name: 'stackable',
    data: function data() {
        return {
            stackClass: 'unpecified',
            stackElement: null,
            stackExclude: null,
            stackMinZIndex: 0,
            isActive: false
        };
    },

    computed: {
        activeZIndex: function activeZIndex() {
            if (typeof window === 'undefined') return 0;
            var content = this.stackElement || this.$refs.content;
            // Return current zindex if not active
            var index = !this.isActive ? getZIndex(content) : this.getMaxZIndex(this.stackExclude || [content]) + 2;
            if (index == null) return index;
            // Return max current z-index (excluding self) + 2
            // (2 to leave room for an overlay below, if needed)
            return parseInt(index);
        }
    },
    methods: {
        getMaxZIndex: function getMaxZIndex() {
            var exclude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var base = this.$el;
            // Start with lowest allowed z-index or z-index of
            // base component's element, whichever is greater
            var zis = [this.stackMinZIndex, getZIndex(base)];
            // Convert the NodeList to an array to
            // prevent an Edge bug with Symbol.iterator
            // https://github.com/vuetifyjs/vuetify/issues/2146
            var activeElements = [].concat(stackable_toConsumableArray(document.getElementsByClassName(this.stackClass)));
            // Get z-index for all active dialogs
            for (var index = 0; index < activeElements.length; index++) {
                if (!exclude.includes(activeElements[index])) {
                    zis.push(getZIndex(activeElements[index]));
                }
            }
            return Math.max.apply(Math, zis);
        }
    }
}));
//# sourceMappingURL=stackable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/directives/click-outside.js
function click_outside_closeConditional() {
    return false;
}
function click_outside_directive(e, el, binding) {
    // Args may not always be supplied
    binding.args = binding.args || {};
    // If no closeConditional was supplied assign a default
    var isActive = binding.args.closeConditional || click_outside_closeConditional;
    // The include element callbacks below can be expensive
    // so we should avoid calling them when we're not active.
    // Explicitly check for false to allow fallback compatibility
    // with non-toggleable components
    if (!e || isActive(e) === false) return;
    // If click was triggered programmaticaly (domEl.click()) then
    // it shouldn't be treated as click-outside
    // Chrome/Firefox support isTrusted property
    // IE/Edge support pointerType property (empty if not triggered
    // by pointing device)
    if ('isTrusted' in e && !e.isTrusted || 'pointerType' in e && !e.pointerType) return;
    // Check if additional elements were passed to be included in check
    // (click must be outside all included elements, if any)
    var elements = (binding.args.include || function () {
        return [];
    })();
    // Add the root element for the component this directive was defined on
    elements.push(el);
    // Check if it's a click outside our elements, and then if our callback returns true.
    // Non-toggleable components should take action in their callback and return falsy.
    // Toggleable can return true if it wants to deactivate.
    // Note that, because we're in the capture phase, this callback will occure before
    // the bubbling click event on any outside elements.
    !clickedInEls(e, elements) && setTimeout(function () {
        isActive(e) && binding.value && binding.value(e);
    }, 0);
}
function clickedInEls(e, elements) {
    // Get position of click
    var x = e.clientX,
        y = e.clientY;
    // Loop over all included elements to see if click was in any of them

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var el = _step.value;

            if (clickedInEl(el, x, y)) return true;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
}
function clickedInEl(el, x, y) {
    // Get bounding rect for element
    // (we're in capturing event and we want to check for multiple elements,
    //  so can't use target.)
    var b = el.getBoundingClientRect();
    // Check if the click was in the element's bounding rect
    return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
}
/* harmony default export */ var click_outside = ({
    // [data-app] may not be found
    // if using bind, inserted makes
    // sure that the root element is
    // available, iOS does not support
    // clicks on body
    inserted: function inserted(el, binding) {
        var onClick = function onClick(e) {
            return click_outside_directive(e, el, binding);
        };
        // iOS does not recognize click events on document
        // or body, this is the entire purpose of the v-app
        // component and [data-app], stop removing this
        var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
        app.addEventListener('click', onClick, true);
        el._clickOutside = onClick;
    },
    unbind: function unbind(el) {
        if (!el._clickOutside) return;
        var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
        app && app.removeEventListener('click', el._clickOutside, true);
        delete el._clickOutside;
    }
});
//# sourceMappingURL=click-outside.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/util/ThemeProvider.js


/* @vue/component */
/* harmony default export */ var ThemeProvider = (mixins(themeable).extend({
    name: 'theme-provider',
    props: {
        root: Boolean
    },
    computed: {
        isDark: function isDark() {
            return this.root ? this.rootIsDark : themeable.options.computed.isDark.call(this);
        }
    },
    render: function render() {
        return this.$slots.default && this.$slots.default.find(function (node) {
            return !node.isComment && node.text !== ' ';
        });
    }
}));
//# sourceMappingURL=ThemeProvider.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function VDialog_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


// Mixins






// Directives

// Helpers



/* @vue/component */
/* harmony default export */ var VDialog = ({
    name: 'v-dialog',
    directives: {
        ClickOutside: click_outside
    },
    mixins: [dependent, detachable, overlayable, returnable, stackable, toggleable],
    props: {
        disabled: Boolean,
        persistent: Boolean,
        fullscreen: Boolean,
        fullWidth: Boolean,
        noClickAnimation: Boolean,
        light: Boolean,
        dark: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'none'
        },
        origin: {
            type: String,
            default: 'center center'
        },
        width: {
            type: [String, Number],
            default: 'auto'
        },
        scrollable: Boolean,
        transition: {
            type: [String, Boolean],
            default: 'dialog-transition'
        }
    },
    data: function data() {
        return {
            animate: false,
            animateTimeout: null,
            stackClass: 'v-dialog__content--active',
            stackMinZIndex: 200
        };
    },

    computed: {
        classes: function classes() {
            var _ref;

            return _ref = {}, VDialog_defineProperty(_ref, ('v-dialog ' + this.contentClass).trim(), true), VDialog_defineProperty(_ref, 'v-dialog--active', this.isActive), VDialog_defineProperty(_ref, 'v-dialog--persistent', this.persistent), VDialog_defineProperty(_ref, 'v-dialog--fullscreen', this.fullscreen), VDialog_defineProperty(_ref, 'v-dialog--scrollable', this.scrollable), VDialog_defineProperty(_ref, 'v-dialog--animated', this.animate), _ref;
        },
        contentClasses: function contentClasses() {
            return {
                'v-dialog__content': true,
                'v-dialog__content--active': this.isActive
            };
        },
        hasActivator: function hasActivator() {
            return Boolean(!!this.$slots.activator || !!this.$scopedSlots.activator);
        }
    },
    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.show();
                this.hideScroll();
            } else {
                this.removeOverlay();
                this.unbind();
            }
        },
        fullscreen: function fullscreen(val) {
            if (!this.isActive) return;
            if (val) {
                this.hideScroll();
                this.removeOverlay(false);
            } else {
                this.showScroll();
                this.genOverlay();
            }
        }
    },
    beforeMount: function beforeMount() {
        var _this = this;

        this.$nextTick(function () {
            _this.isBooted = _this.isActive;
            _this.isActive && _this.show();
        });
    },
    mounted: function mounted() {
        if (getSlotType(this, 'activator', true) === 'v-slot') {
            consoleError('v-dialog\'s activator slot must be bound, try \'<template #activator="data"><v-btn v-on="data.on>\'', this);
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') this.unbind();
    },

    methods: {
        animateClick: function animateClick() {
            var _this2 = this;

            this.animate = false;
            // Needed for when clicking very fast
            // outside of the dialog
            this.$nextTick(function () {
                _this2.animate = true;
                clearTimeout(_this2.animateTimeout);
                _this2.animateTimeout = setTimeout(function () {
                    return _this2.animate = false;
                }, 150);
            });
        },
        closeConditional: function closeConditional(e) {
            // If the dialog content contains
            // the click event, or if the
            // dialog is not active
            if (this.$refs.content.contains(e.target) || !this.isActive) return false;
            // If we made it here, the click is outside
            // and is active. If persistent, and the
            // click is on the overlay, animate
            if (this.persistent) {
                if (!this.noClickAnimation && this.overlay === e.target) this.animateClick();
                return false;
            }
            // close dialog if !persistent, clicked outside and we're the topmost dialog.
            // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
            return getZIndex(this.$refs.content) >= this.getMaxZIndex();
        },
        hideScroll: function hideScroll() {
            if (this.fullscreen) {
                document.documentElement.classList.add('overflow-y-hidden');
            } else {
                overlayable.options.methods.hideScroll.call(this);
            }
        },
        show: function show() {
            !this.fullscreen && !this.hideOverlay && this.genOverlay();
            this.$refs.content.focus();
            this.$listeners.keydown && this.bind();
        },
        bind: function bind() {
            window.addEventListener('keydown', this.onKeydown);
        },
        unbind: function unbind() {
            window.removeEventListener('keydown', this.onKeydown);
        },
        onKeydown: function onKeydown(e) {
            this.$emit('keydown', e);
        },
        genActivator: function genActivator() {
            var _this3 = this;

            if (!this.hasActivator) return null;
            var listeners = this.disabled ? {} : {
                click: function click(e) {
                    e.stopPropagation();
                    if (!_this3.disabled) _this3.isActive = !_this3.isActive;
                }
            };
            if (getSlotType(this, 'activator') === 'scoped') {
                var activator = this.$scopedSlots.activator({ on: listeners });
                this.activatorNode = activator;
                return activator;
            }
            return this.$createElement('div', {
                staticClass: 'v-dialog__activator',
                'class': {
                    'v-dialog__activator--disabled': this.disabled
                },
                on: listeners
            }, this.$slots.activator);
        }
    },
    render: function render(h) {
        var _this4 = this;

        var children = [];
        var data = {
            'class': this.classes,
            ref: 'dialog',
            directives: [{
                name: 'click-outside',
                value: function value() {
                    return _this4.isActive = false;
                },
                args: {
                    closeConditional: this.closeConditional,
                    include: this.getOpenDependentElements
                }
            }, { name: 'show', value: this.isActive }],
            on: {
                click: function click(e) {
                    e.stopPropagation();
                }
            }
        };
        if (!this.fullscreen) {
            data.style = {
                maxWidth: this.maxWidth === 'none' ? undefined : convertToUnit(this.maxWidth),
                width: this.width === 'auto' ? undefined : convertToUnit(this.width)
            };
        }
        children.push(this.genActivator());
        var dialog = h('div', data, this.showLazyContent(this.$slots.default));
        if (this.transition) {
            dialog = h('transition', {
                props: {
                    name: this.transition,
                    origin: this.origin
                }
            }, [dialog]);
        }
        children.push(h('div', {
            'class': this.contentClasses,
            attrs: VDialog_extends({
                tabIndex: '-1'
            }, this.getScopeIdAttrs()),
            style: { zIndex: this.activeZIndex },
            ref: 'content'
        }, [this.$createElement(ThemeProvider, {
            props: {
                root: true,
                light: this.light,
                dark: this.dark
            }
        }, [dialog])]));
        return h('div', {
            staticClass: 'v-dialog__container',
            style: {
                display: !this.hasActivator || this.fullWidth ? 'block' : 'inline-block'
            }
        }, children);
    }
});
//# sourceMappingURL=VDialog.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/transitions/expand-transition.js
function expand_transition_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ var expand_transition = (function () {
    var expandedParentClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var sizeProperty = x ? 'width' : 'height';
    return {
        beforeEnter: function beforeEnter(el) {
            el._parent = el.parentNode;
            el._initialStyle = expand_transition_defineProperty({
                transition: el.style.transition,
                visibility: el.style.visibility,
                overflow: el.style.overflow
            }, sizeProperty, el.style[sizeProperty]);
        },
        enter: function enter(el) {
            var initialStyle = el._initialStyle;
            el.style.setProperty('transition', 'none', 'important');
            el.style.visibility = 'hidden';
            var size = el['offset' + upperFirst(sizeProperty)] + 'px';
            el.style.visibility = initialStyle.visibility;
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = 0;
            void el.offsetHeight; // force reflow
            el.style.transition = initialStyle.transition;
            expandedParentClass && el._parent && el._parent.classList.add(expandedParentClass);
            requestAnimationFrame(function () {
                el.style[sizeProperty] = size;
            });
        },

        afterEnter: resetStyles,
        enterCancelled: resetStyles,
        leave: function leave(el) {
            el._initialStyle = expand_transition_defineProperty({
                overflow: el.style.overflow
            }, sizeProperty, el.style[sizeProperty]);
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = el['offset' + upperFirst(sizeProperty)] + 'px';
            void el.offsetHeight; // force reflow
            requestAnimationFrame(function () {
                return el.style[sizeProperty] = 0;
            });
        },

        afterLeave: afterLeave,
        leaveCancelled: afterLeave
    };
    function afterLeave(el) {
        expandedParentClass && el._parent && el._parent.classList.remove(expandedParentClass);
        resetStyles(el);
    }
    function resetStyles(el) {
        el.style.overflow = el._initialStyle.overflow;
        el.style[sizeProperty] = el._initialStyle[sizeProperty];
        delete el._initialStyle;
    }
});
//# sourceMappingURL=expand-transition.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/transitions/index.js


// Component specific transitions
var VBottomSheetTransition = createSimpleTransition('bottom-sheet-transition');
var VCarouselTransition = createSimpleTransition('carousel-transition');
var VCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition');
var VTabTransition = createSimpleTransition('tab-transition');
var VTabReverseTransition = createSimpleTransition('tab-reverse-transition');
var VMenuTransition = createSimpleTransition('menu-transition');
var VFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in');
// Generic transitions
var VDialogTransition = createSimpleTransition('dialog-transition');
var VDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
var VFadeTransition = createSimpleTransition('fade-transition');
var VScaleTransition = createSimpleTransition('scale-transition');
var VScrollXTransition = createSimpleTransition('scroll-x-transition');
var VScrollXReverseTransition = createSimpleTransition('scroll-x-reverse-transition');
var VScrollYTransition = createSimpleTransition('scroll-y-transition');
var VScrollYReverseTransition = createSimpleTransition('scroll-y-reverse-transition');
var VSlideXTransition = createSimpleTransition('slide-x-transition');
var VSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
var VSlideYTransition = createSimpleTransition('slide-y-transition');
var VSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition');
// JavaScript transitions
var VExpandTransition = createJavaScriptTransition('expand-transition', expand_transition());
var VExpandXTransition = createJavaScriptTransition('expand-x-transition', expand_transition('', true));
var VRowExpandTransition = createJavaScriptTransition('row-expand-transition', expand_transition('datatable__expand-col--expanded'));
/* harmony default export */ var transitions = ({
    $_vuetify_subcomponents: {
        VBottomSheetTransition: VBottomSheetTransition,
        VCarouselTransition: VCarouselTransition,
        VCarouselReverseTransition: VCarouselReverseTransition,
        VDialogTransition: VDialogTransition,
        VDialogBottomTransition: VDialogBottomTransition,
        VFabTransition: VFabTransition,
        VFadeTransition: VFadeTransition,
        VMenuTransition: VMenuTransition,
        VScaleTransition: VScaleTransition,
        VScrollXTransition: VScrollXTransition,
        VScrollXReverseTransition: VScrollXReverseTransition,
        VScrollYTransition: VScrollYTransition,
        VScrollYReverseTransition: VScrollYReverseTransition,
        VSlideXTransition: VSlideXTransition,
        VSlideXReverseTransition: VSlideXReverseTransition,
        VSlideYTransition: VSlideYTransition,
        VSlideYReverseTransition: VSlideYReverseTransition,
        VTabReverseTransition: VTabReverseTransition,
        VTabTransition: VTabTransition,
        VExpandTransition: VExpandTransition,
        VExpandXTransition: VExpandXTransition,
        VRowExpandTransition: VRowExpandTransition
    }
});
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VGrid/VFlex.js


/* harmony default export */ var VFlex = (Grid('flex'));
//# sourceMappingURL=VFlex.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_icons.styl
var _icons = __webpack_require__("71aa");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/sizeable.js

/* harmony default export */ var sizeable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'sizeable',
    props: {
        large: Boolean,
        medium: Boolean,
        size: {
            type: [Number, String]
        },
        small: Boolean,
        xLarge: Boolean
    }
}));
//# sourceMappingURL=sizeable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


// Mixins



// Util

// Types


var SIZE_MAP;
(function (SIZE_MAP) {
    SIZE_MAP["small"] = "16px";
    SIZE_MAP["default"] = "24px";
    SIZE_MAP["medium"] = "28px";
    SIZE_MAP["large"] = "36px";
    SIZE_MAP["xLarge"] = "40px";
})(SIZE_MAP || (SIZE_MAP = {}));
function isFontAwesome5(iconType) {
    return ['fas', 'far', 'fal', 'fab'].some(function (val) {
        return iconType.includes(val);
    });
}
var VIcon = mixins(colorable, sizeable, themeable
/* @vue/component */
).extend({
    name: 'v-icon',
    props: {
        disabled: Boolean,
        left: Boolean,
        right: Boolean
    },
    methods: {
        getIcon: function getIcon() {
            var iconName = '';
            if (this.$slots.default) iconName = this.$slots.default[0].text.trim();
            return remapInternalIcon(this, iconName);
        },
        getSize: function getSize() {
            var sizes = {
                small: this.small,
                medium: this.medium,
                large: this.large,
                xLarge: this.xLarge
            };
            var explicitSize = keys(sizes).find(function (key) {
                return sizes[key];
            });
            return explicitSize && SIZE_MAP[explicitSize] || convertToUnit(this.size);
        },

        // Component data for both font and svg icon.
        getDefaultData: function getDefaultData() {
            var data = {
                staticClass: 'v-icon',
                class: {
                    'v-icon--disabled': this.disabled,
                    'v-icon--left': this.left,
                    'v-icon--link': this.$listeners.click || this.$listeners['!click'],
                    'v-icon--right': this.right
                },
                attrs: VIcon_extends({
                    'aria-hidden': true
                }, this.$attrs),
                on: this.$listeners
            };
            return data;
        },
        applyColors: function applyColors(data) {
            data.class = VIcon_extends({}, data.class, this.themeClasses);
            this.setTextColor(this.color, data);
        },
        renderFontIcon: function renderFontIcon(icon, h) {
            var newChildren = [];
            var data = this.getDefaultData();
            var iconType = 'material-icons';
            // Material Icon delimiter is _
            // https://material.io/icons/
            var delimiterIndex = icon.indexOf('-');
            var isMaterialIcon = delimiterIndex <= -1;
            if (isMaterialIcon) {
                // Material icon uses ligatures.
                newChildren.push(icon);
            } else {
                iconType = icon.slice(0, delimiterIndex);
                if (isFontAwesome5(iconType)) iconType = '';
            }
            data.class[iconType] = true;
            data.class[icon] = !isMaterialIcon;
            var fontSize = this.getSize();
            if (fontSize) data.style = { fontSize: fontSize };
            this.applyColors(data);
            return h('i', data, newChildren);
        },
        renderSvgIcon: function renderSvgIcon(icon, h) {
            var data = this.getDefaultData();
            data.class['v-icon--is-component'] = true;
            var size = this.getSize();
            if (size) {
                data.style = {
                    fontSize: size,
                    height: size
                };
            }
            this.applyColors(data);
            var component = icon.component;
            data.props = icon.props;
            return h(component, data);
        }
    },
    render: function render(h) {
        var icon = this.getIcon();
        if (typeof icon === 'string') {
            return this.renderFontIcon(icon, h);
        }
        return this.renderSvgIcon(icon, h);
    }
});
/* harmony default export */ var VIcon_VIcon = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'v-icon',
    $_wrapperFor: VIcon,
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data,
            children = _ref.children;

        var iconName = '';
        // Support usage of v-text and v-html
        if (data.domProps) {
            iconName = data.domProps.textContent || data.domProps.innerHTML || iconName;
            // Remove nodes so it doesn't
            // overwrite our changes
            delete data.domProps.textContent;
            delete data.domProps.innerHTML;
        }
        return h(VIcon, data, iconName ? [iconName] : children);
    }
}));
//# sourceMappingURL=VIcon.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VGrid/VLayout.js


/* harmony default export */ var VLayout = (Grid('layout'));
//# sourceMappingURL=VLayout.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_progress-linear.styl
var _progress_linear = __webpack_require__("ae23");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
function VProgressLinear_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


// Mixins

// Helpers



/* @vue/component */
/* harmony default export */ var VProgressLinear = (mixins(colorable).extend({
    name: 'v-progress-linear',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        backgroundColor: {
            type: String,
            default: null
        },
        backgroundOpacity: {
            type: [Number, String],
            default: null
        },
        bufferValue: {
            type: [Number, String],
            default: 100
        },
        color: {
            type: String,
            default: 'primary'
        },
        height: {
            type: [Number, String],
            default: 7
        },
        indeterminate: Boolean,
        query: Boolean,
        value: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        backgroundStyle: function backgroundStyle() {
            var backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);
            return {
                height: this.active ? convertToUnit(this.height) : 0,
                opacity: backgroundOpacity,
                width: this.normalizedBufer + '%'
            };
        },
        effectiveWidth: function effectiveWidth() {
            if (!this.normalizedBufer) {
                return 0;
            }
            return +this.normalizedValue * 100 / +this.normalizedBufer;
        },
        normalizedBufer: function normalizedBufer() {
            if (this.bufferValue < 0) {
                return 0;
            }
            if (this.bufferValue > 100) {
                return 100;
            }
            return parseFloat(this.bufferValue);
        },
        normalizedValue: function normalizedValue() {
            if (this.value < 0) {
                return 0;
            }
            if (this.value > 100) {
                return 100;
            }
            return parseFloat(this.value);
        },
        styles: function styles() {
            var styles = {};
            if (!this.active) {
                styles.height = 0;
            }
            if (!this.indeterminate && parseFloat(this.normalizedBufer) !== 100) {
                styles.width = this.normalizedBufer + '%';
            }
            return styles;
        }
    },
    methods: {
        genDeterminate: function genDeterminate(h) {
            return h('div', this.setBackgroundColor(this.color, {
                ref: 'front',
                staticClass: 'v-progress-linear__bar__determinate',
                style: {
                    width: this.effectiveWidth + '%'
                }
            }));
        },
        genBar: function genBar(h, name) {
            return h('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: VProgressLinear_defineProperty({}, name, true)
            }));
        },
        genIndeterminate: function genIndeterminate(h) {
            return h('div', {
                ref: 'front',
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: {
                    'v-progress-linear__bar__indeterminate--active': this.active
                }
            }, [this.genBar(h, 'long'), this.genBar(h, 'short')]);
        }
    },
    render: function render(h) {
        var fade = h(VFadeTransition, this.indeterminate ? [this.genIndeterminate(h)] : []);
        var slide = h(VSlideXTransition, this.indeterminate ? [] : [this.genDeterminate(h)]);
        var bar = h('div', {
            staticClass: 'v-progress-linear__bar',
            style: this.styles
        }, [fade, slide]);
        var background = h('div', this.setBackgroundColor(this.backgroundColor || this.color, {
            staticClass: 'v-progress-linear__background',
            style: this.backgroundStyle
        }));
        var content = this.$slots.default && h('div', {
            staticClass: 'v-progress-linear__content'
        }, this.$slots.default);
        return h('div', {
            staticClass: 'v-progress-linear',
            attrs: {
                'role': 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': this.normalizedBufer,
                'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
            },
            class: {
                'v-progress-linear--query': this.query
            },
            style: {
                height: convertToUnit(this.height)
            },
            on: this.$listeners
        }, [background, bar, content]);
    }
}));
//# sourceMappingURL=VProgressLinear.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_content.styl
var _content = __webpack_require__("b901");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/ssr-bootable.js

/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 */
/* harmony default export */ var ssr_bootable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'ssr-bootable',
    data: function data() {
        return {
            isBooted: false
        };
    },
    mounted: function mounted() {
        var _this = this;

        // Use setAttribute instead of dataset
        // because dataset does not work well
        // with unit tests
        window.requestAnimationFrame(function () {
            _this.$el.setAttribute('data-booted', 'true');
            _this.isBooted = true;
        });
    }
}));
//# sourceMappingURL=ssr-bootable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VGrid/VContent.js
// Styles

// Mixins

/* @vue/component */
/* harmony default export */ var VContent = ({
    name: 'v-content',
    mixins: [ssr_bootable],
    props: {
        tag: {
            type: String,
            default: 'main'
        }
    },
    computed: {
        styles: function styles() {
            var _$vuetify$application = this.$vuetify.application,
                bar = _$vuetify$application.bar,
                top = _$vuetify$application.top,
                right = _$vuetify$application.right,
                footer = _$vuetify$application.footer,
                insetFooter = _$vuetify$application.insetFooter,
                bottom = _$vuetify$application.bottom,
                left = _$vuetify$application.left;

            return {
                paddingTop: top + bar + 'px',
                paddingRight: right + 'px',
                paddingBottom: footer + insetFooter + bottom + 'px',
                paddingLeft: left + 'px'
            };
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-content',
            style: this.styles,
            ref: 'content'
        };
        return h(this.tag, data, [h('div', { staticClass: 'v-content__wrap' }, this.$slots.default)]);
    }
});
//# sourceMappingURL=VContent.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VGrid/index.js





var VSpacer = createSimpleFunctional('spacer', 'div', 'v-spacer');

/* harmony default export */ var VGrid = ({
    $_vuetify_subcomponents: {
        VContainer: VContainer,
        VContent: VContent,
        VFlex: VFlex,
        VLayout: VLayout,
        VSpacer: VSpacer
    }
});
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_steppers.styl
var _steppers = __webpack_require__("60e3");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VStepper/VStepper.js
var VStepper_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Mixins


// Util

/* harmony default export */ var VStepper = (mixins(provide('stepper'), themeable
/* @vue/component */
).extend({
    name: 'v-stepper',
    provide: function provide() {
        return {
            stepClick: this.stepClick,
            isVertical: this.vertical
        };
    },

    props: {
        nonLinear: Boolean,
        altLabels: Boolean,
        vertical: Boolean,
        value: [Number, String]
    },
    data: function data() {
        return {
            inputValue: null,
            isBooted: false,
            steps: [],
            content: [],
            isReverse: false
        };
    },

    computed: {
        classes: function classes() {
            return VStepper_extends({
                'v-stepper': true,
                'v-stepper--is-booted': this.isBooted,
                'v-stepper--vertical': this.vertical,
                'v-stepper--alt-labels': this.altLabels,
                'v-stepper--non-linear': this.nonLinear
            }, this.themeClasses);
        }
    },
    watch: {
        inputValue: function inputValue(val, prev) {
            this.isReverse = Number(val) < Number(prev);
            for (var index = this.steps.length; --index >= 0;) {
                this.steps[index].toggle(this.inputValue);
            }
            for (var _index = this.content.length; --_index >= 0;) {
                this.content[_index].toggle(this.inputValue, this.isReverse);
            }
            this.$emit('input', this.inputValue);
            prev && (this.isBooted = true);
        },
        value: function value() {
            var _this = this;

            this.$nextTick(function () {
                return _this.inputValue = _this.value;
            });
        }
    },
    mounted: function mounted() {
        this.inputValue = this.value || this.steps[0].step || 1;
    },

    methods: {
        register: function register(item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps.push(item);
            } else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content.push(item);
            }
        },
        unregister: function unregister(item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps = this.steps.filter(function (i) {
                    return i !== item;
                });
            } else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content = this.content.filter(function (i) {
                    return i !== item;
                });
            }
        },
        stepClick: function stepClick(step) {
            var _this2 = this;

            this.$nextTick(function () {
                return _this2.inputValue = step;
            });
        }
    },
    render: function render(h) {
        return h('div', {
            'class': this.classes
        }, this.$slots.default);
    }
}));
//# sourceMappingURL=VStepper.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VStepper/VStepperContent.js
// Components

// Mixins

// Helpers

// Util

/* harmony default export */ var VStepperContent = (mixins(inject('stepper', 'v-stepper-content', 'v-stepper')
/* @vue/component */
).extend({
    name: 'v-stepper-content',
    inject: {
        isVerticalProvided: {
            from: 'isVertical'
        }
    },
    props: {
        step: {
            type: [Number, String],
            required: true
        }
    },
    data: function data() {
        return {
            height: 0,
            // Must be null to allow
            // previous comparison
            isActive: null,
            isReverse: false,
            isVertical: this.isVerticalProvided
        };
    },

    computed: {
        classes: function classes() {
            return {
                'v-stepper__content': true
            };
        },
        computedTransition: function computedTransition() {
            return this.isReverse ? VTabReverseTransition : VTabTransition;
        },
        styles: function styles() {
            if (!this.isVertical) return {};
            return {
                height: convertToUnit(this.height)
            };
        },
        wrapperClasses: function wrapperClasses() {
            return {
                'v-stepper__wrapper': true
            };
        }
    },
    watch: {
        isActive: function isActive(current, previous) {
            // If active and the previous state
            // was null, is just booting up
            if (current && previous == null) {
                this.height = 'auto';
                return;
            }
            if (!this.isVertical) return;
            if (this.isActive) this.enter();else this.leave();
        }
    },
    mounted: function mounted() {
        this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
        this.stepper && this.stepper.unregister(this);
    },

    methods: {
        onTransition: function onTransition(e) {
            if (!this.isActive || e.propertyName !== 'height') return;
            this.height = 'auto';
        },
        enter: function enter() {
            var _this = this;

            var scrollHeight = 0;
            // Render bug with height
            requestAnimationFrame(function () {
                scrollHeight = _this.$refs.wrapper.scrollHeight;
            });
            this.height = 0;
            // Give the collapsing element time to collapse
            setTimeout(function () {
                return _this.isActive && (_this.height = scrollHeight || 'auto');
            }, 450);
        },
        leave: function leave() {
            var _this2 = this;

            this.height = this.$refs.wrapper.clientHeight;
            setTimeout(function () {
                return _this2.height = 0;
            }, 10);
        },
        toggle: function toggle(step, reverse) {
            this.isActive = step.toString() === this.step.toString();
            this.isReverse = reverse;
        }
    },
    render: function render(h) {
        var contentData = {
            'class': this.classes
        };
        var wrapperData = {
            'class': this.wrapperClasses,
            style: this.styles,
            ref: 'wrapper'
        };
        if (!this.isVertical) {
            contentData.directives = [{
                name: 'show',
                value: this.isActive
            }];
        }
        var wrapper = h('div', wrapperData, [this.$slots.default]);
        var content = h('div', contentData, [wrapper]);
        return h(this.computedTransition, {
            on: this.$listeners
        }, [content]);
    }
}));
//# sourceMappingURL=VStepperContent.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VIcon/index.js


/* harmony default export */ var components_VIcon = (VIcon_VIcon);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VStepper/VStepperStep.js
// Components

// Mixins


// Directives

// Util

/* harmony default export */ var VStepperStep = (mixins(colorable, inject('stepper', 'v-stepper-step', 'v-stepper')
/* @vue/component */
).extend({
    name: 'v-stepper-step',
    directives: { Ripple: directives_ripple },
    inject: ['stepClick'],
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        complete: Boolean,
        completeIcon: {
            type: String,
            default: '$vuetify.icons.complete'
        },
        editIcon: {
            type: String,
            default: '$vuetify.icons.edit'
        },
        errorIcon: {
            type: String,
            default: '$vuetify.icons.error'
        },
        editable: Boolean,
        rules: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        step: [Number, String]
    },
    data: function data() {
        return {
            isActive: false,
            isInactive: true
        };
    },

    computed: {
        classes: function classes() {
            return {
                'v-stepper__step': true,
                'v-stepper__step--active': this.isActive,
                'v-stepper__step--editable': this.editable,
                'v-stepper__step--inactive': this.isInactive,
                'v-stepper__step--error': this.hasError,
                'v-stepper__step--complete': this.complete,
                'error--text': this.hasError
            };
        },
        hasError: function hasError() {
            return this.rules.some(function (validate) {
                return validate() !== true;
            });
        }
    },
    mounted: function mounted() {
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.stepper && this.stepper.unregister(this);
    },

    methods: {
        click: function click(e) {
            e.stopPropagation();
            this.$emit('click', e);
            if (this.editable) {
                this.stepClick(this.step);
            }
        },
        toggle: function toggle(step) {
            this.isActive = step.toString() === this.step.toString();
            this.isInactive = Number(step) < Number(this.step);
        }
    },
    render: function render(h) {
        var data = {
            'class': this.classes,
            directives: [{
                name: 'ripple',
                value: this.editable
            }],
            on: { click: this.click }
        };
        var stepContent = void 0;
        if (this.hasError) {
            stepContent = [h(components_VIcon, {}, this.errorIcon)];
        } else if (this.complete) {
            if (this.editable) {
                stepContent = [h(components_VIcon, {}, this.editIcon)];
            } else {
                stepContent = [h(components_VIcon, {}, this.completeIcon)];
            }
        } else {
            stepContent = String(this.step);
        }
        var color = !this.hasError && (this.complete || this.isActive) ? this.color : false;
        var step = h('span', this.setBackgroundColor(color, {
            staticClass: 'v-stepper__step__step'
        }), stepContent);
        var label = h('div', {
            staticClass: 'v-stepper__label'
        }, this.$slots.default);
        return h('div', data, [step, label]);
    }
}));
//# sourceMappingURL=VStepperStep.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_tooltips.styl
var _tooltips = __webpack_require__("a1ea");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/delayable.js

/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */
/* harmony default export */ var delayable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
    name: 'delayable',
    props: {
        openDelay: {
            type: [Number, String],
            default: 0
        },
        closeDelay: {
            type: [Number, String],
            default: 0
        }
    },
    data: function data() {
        return {
            openTimeout: undefined,
            closeTimeout: undefined
        };
    },
    methods: {
        /**
         * Clear any pending delay timers from executing
         */
        clearDelay: function clearDelay() {
            clearTimeout(this.openTimeout);
            clearTimeout(this.closeTimeout);
        },

        /**
         * Runs callback after a specified delay
         */
        runDelay: function runDelay(type, cb) {
            var _this = this;

            this.clearDelay();
            var delay = parseInt(this[type + 'Delay'], 10);
            this[type + 'Timeout'] = setTimeout(cb || function () {
                _this.isActive = { open: true, close: false }[type];
            }, delay);
        }
    }
}));
//# sourceMappingURL=delayable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/menuable.js
var menuable_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





/* eslint-disable object-property-newline */
var dimensions = {
    activator: {
        top: 0, left: 0,
        bottom: 0, right: 0,
        width: 0, height: 0,
        offsetTop: 0, scrollHeight: 0
    },
    content: {
        top: 0, left: 0,
        bottom: 0, right: 0,
        width: 0, height: 0,
        offsetTop: 0, scrollHeight: 0
    },
    hasWindow: false
};
/* eslint-enable object-property-newline */
/**
 * Menuable
 *
 * @mixin
 *
 * Used for fixed or absolutely positioning
 * elements within the DOM
 * Can calculate X and Y axis overflows
 * As well as be manually positioned
 */
/* @vue/component */
/* harmony default export */ var menuable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'menuable',
    mixins: [positionable, stackable],
    props: {
        activator: {
            default: null,
            validator: function validator(val) {
                return ['string', 'object'].includes(typeof val === 'undefined' ? 'undefined' : menuable_typeof(val));
            }
        },
        allowOverflow: Boolean,
        inputActivator: Boolean,
        light: Boolean,
        dark: Boolean,
        maxWidth: {
            type: [Number, String],
            default: 'auto'
        },
        minWidth: [Number, String],
        nudgeBottom: {
            type: [Number, String],
            default: 0
        },
        nudgeLeft: {
            type: [Number, String],
            default: 0
        },
        nudgeRight: {
            type: [Number, String],
            default: 0
        },
        nudgeTop: {
            type: [Number, String],
            default: 0
        },
        nudgeWidth: {
            type: [Number, String],
            default: 0
        },
        offsetOverflow: Boolean,
        positionX: {
            type: Number,
            default: null
        },
        positionY: {
            type: Number,
            default: null
        },
        zIndex: {
            type: [Number, String],
            default: null
        }
    },
    data: function data() {
        return {
            absoluteX: 0,
            absoluteY: 0,
            dimensions: Object.assign({}, dimensions),
            isContentActive: false,
            pageYOffset: 0,
            stackClass: 'v-menu__content--active',
            stackMinZIndex: 6
        };
    },
    computed: {
        computedLeft: function computedLeft() {
            var a = this.dimensions.activator;
            var c = this.dimensions.content;
            var activatorLeft = (this.isAttached ? a.offsetLeft : a.left) || 0;
            var minWidth = Math.max(a.width, c.width);
            var left = 0;
            left += this.left ? activatorLeft - (minWidth - a.width) : activatorLeft;
            if (this.offsetX) {
                var maxWidth = isNaN(this.maxWidth) ? a.width : Math.min(a.width, this.maxWidth);
                left += this.left ? -maxWidth : a.width;
            }
            if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
            if (this.nudgeRight) left += parseInt(this.nudgeRight);
            return left;
        },
        computedTop: function computedTop() {
            var a = this.dimensions.activator;
            var c = this.dimensions.content;
            var top = 0;
            if (this.top) top += a.height - c.height;
            if (this.isAttached) top += a.offsetTop;else top += a.top + this.pageYOffset;
            if (this.offsetY) top += this.top ? -a.height : a.height;
            if (this.nudgeTop) top -= parseInt(this.nudgeTop);
            if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
            return top;
        },
        hasActivator: function hasActivator() {
            return !!this.$slots.activator || !!this.$scopedSlots.activator || this.activator || this.inputActivator;
        },
        isAttached: function isAttached() {
            return this.attach !== false;
        }
    },
    watch: {
        disabled: function disabled(val) {
            val && this.callDeactivate();
        },
        isActive: function isActive(val) {
            if (this.disabled) return;
            val ? this.callActivate() : this.callDeactivate();
        },

        positionX: 'updateDimensions',
        positionY: 'updateDimensions'
    },
    beforeMount: function beforeMount() {
        this.checkForWindow();
    },

    methods: {
        absolutePosition: function absolutePosition() {
            return {
                offsetTop: 0,
                offsetLeft: 0,
                scrollHeight: 0,
                top: this.positionY || this.absoluteY,
                bottom: this.positionY || this.absoluteY,
                left: this.positionX || this.absoluteX,
                right: this.positionX || this.absoluteX,
                height: 0,
                width: 0
            };
        },
        activate: function activate() {},
        calcLeft: function calcLeft(menuWidth) {
            return (this.isAttached ? this.computedLeft : this.calcXOverflow(this.computedLeft, menuWidth)) + 'px';
        },
        calcTop: function calcTop() {
            return (this.isAttached ? this.computedTop : this.calcYOverflow(this.computedTop)) + 'px';
        },
        calcXOverflow: function calcXOverflow(left, menuWidth) {
            var xOverflow = left + menuWidth - this.getInnerWidth() + 12;
            if ((!this.left || this.right) && xOverflow > 0) {
                left = Math.max(left - xOverflow, 0);
            } else {
                left = Math.max(left, 12);
            }
            return left + this.getOffsetLeft();
        },
        calcYOverflow: function calcYOverflow(top) {
            var documentHeight = this.getInnerHeight();
            var toTop = this.pageYOffset + documentHeight;
            var activator = this.dimensions.activator;
            var contentHeight = this.dimensions.content.height;
            var totalHeight = top + contentHeight;
            var isOverflowing = toTop < totalHeight;
            // If overflowing bottom and offset
            // TODO: set 'bottom' position instead of 'top'
            if (isOverflowing && this.offsetOverflow &&
            // If we don't have enough room to offset
            // the overflow, don't offset
            activator.top > contentHeight) {
                top = this.pageYOffset + (activator.top - contentHeight);
                // If overflowing bottom
            } else if (isOverflowing && !this.allowOverflow) {
                top = toTop - contentHeight - 12;
                // If overflowing top
            } else if (top < this.pageYOffset && !this.allowOverflow) {
                top = this.pageYOffset + 12;
            }
            return top < 12 ? 12 : top;
        },
        callActivate: function callActivate() {
            if (!this.hasWindow) return;
            this.activate();
        },
        callDeactivate: function callDeactivate() {
            this.isContentActive = false;
            this.deactivate();
        },
        checkForWindow: function checkForWindow() {
            if (!this.hasWindow) {
                this.hasWindow = typeof window !== 'undefined';
            }
        },
        checkForPageYOffset: function checkForPageYOffset() {
            if (this.hasWindow) {
                this.pageYOffset = this.getOffsetTop();
            }
        },
        deactivate: function deactivate() {},
        getActivator: function getActivator(e) {
            if (this.inputActivator) {
                return this.$el.querySelector('.v-input__slot');
            }
            if (this.activator) {
                return typeof this.activator === 'string' ? document.querySelector(this.activator) : this.activator;
            }
            if (this.$refs.activator) {
                return this.$refs.activator.children.length > 0 ? this.$refs.activator.children[0] : this.$refs.activator;
            }
            if (e) {
                this.activatedBy = e.currentTarget || e.target;
                return this.activatedBy;
            }
            if (this.activatedBy) return this.activatedBy;
            if (this.activatorNode) {
                var activator = Array.isArray(this.activatorNode) ? this.activatorNode[0] : this.activatorNode;
                var el = activator && activator.elm;
                if (el) return el;
            }
            consoleError('No activator found');
        },
        getInnerHeight: function getInnerHeight() {
            if (!this.hasWindow) return 0;
            return window.innerHeight || document.documentElement.clientHeight;
        },
        getInnerWidth: function getInnerWidth() {
            if (!this.hasWindow) return 0;
            return document.documentElement.clientWidth;
        },
        getOffsetLeft: function getOffsetLeft() {
            if (!this.hasWindow) return 0;
            return window.pageXOffset || document.documentElement.scrollLeft;
        },
        getOffsetTop: function getOffsetTop() {
            if (!this.hasWindow) return 0;
            return window.pageYOffset || document.documentElement.scrollTop;
        },
        getRoundedBoundedClientRect: function getRoundedBoundedClientRect(el) {
            var rect = el.getBoundingClientRect();
            return {
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                bottom: Math.round(rect.bottom),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            };
        },
        measure: function measure(el) {
            if (!el || !this.hasWindow) return null;
            var rect = this.getRoundedBoundedClientRect(el);
            // Account for activator margin
            if (this.isAttached) {
                var style = window.getComputedStyle(el);
                rect.left = parseInt(style.marginLeft);
                rect.top = parseInt(style.marginTop);
            }
            return rect;
        },
        sneakPeek: function sneakPeek(cb) {
            var _this = this;

            requestAnimationFrame(function () {
                var el = _this.$refs.content;
                if (!el || _this.isShown(el)) return cb();
                el.style.display = 'inline-block';
                cb();
                el.style.display = 'none';
            });
        },
        startTransition: function startTransition() {
            var _this2 = this;

            return new Promise(function (resolve) {
                return requestAnimationFrame(function () {
                    _this2.isContentActive = _this2.hasJustFocused = _this2.isActive;
                    resolve();
                });
            });
        },
        isShown: function isShown(el) {
            return el.style.display !== 'none';
        },
        updateDimensions: function updateDimensions() {
            var _this3 = this;

            this.checkForWindow();
            this.checkForPageYOffset();
            var dimensions = {};
            // Activator should already be shown
            if (!this.hasActivator || this.absolute) {
                dimensions.activator = this.absolutePosition();
            } else {
                var activator = this.getActivator();
                dimensions.activator = this.measure(activator);
                dimensions.activator.offsetLeft = activator.offsetLeft;
                if (this.isAttached) {
                    // account for css padding causing things to not line up
                    // this is mostly for v-autocomplete, hopefully it won't break anything
                    dimensions.activator.offsetTop = activator.offsetTop;
                } else {
                    dimensions.activator.offsetTop = 0;
                }
            }
            // Display and hide to get dimensions
            this.sneakPeek(function () {
                dimensions.content = _this3.measure(_this3.$refs.content);
                _this3.dimensions = dimensions;
            });
        }
    }
}));
//# sourceMappingURL=menuable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VTooltip/VTooltip.js
function VTooltip_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


// Mixins






// Helpers


/* @vue/component */
/* harmony default export */ var VTooltip = ({
    name: 'v-tooltip',
    mixins: [colorable, delayable, dependent, detachable, menuable, toggleable],
    props: {
        closeDelay: {
            type: [Number, String],
            default: 200
        },
        debounce: {
            type: [Number, String],
            default: 0
        },
        disabled: Boolean,
        fixed: {
            type: Boolean,
            default: true
        },
        openDelay: {
            type: [Number, String],
            default: 200
        },
        tag: {
            type: String,
            default: 'span'
        },
        transition: String,
        zIndex: {
            default: null
        }
    },
    data: function data() {
        return {
            calculatedMinWidth: 0,
            closeDependents: false
        };
    },
    computed: {
        calculatedLeft: function calculatedLeft() {
            var _dimensions = this.dimensions,
                activator = _dimensions.activator,
                content = _dimensions.content;

            var unknown = !this.bottom && !this.left && !this.top && !this.right;
            var activatorLeft = this.isAttached ? activator.offsetLeft : activator.left;
            var left = 0;
            if (this.top || this.bottom || unknown) {
                left = activatorLeft + activator.width / 2 - content.width / 2;
            } else if (this.left || this.right) {
                left = activatorLeft + (this.right ? activator.width : -content.width) + (this.right ? 10 : -10);
            }
            if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
            if (this.nudgeRight) left += parseInt(this.nudgeRight);
            return this.calcXOverflow(left, this.dimensions.content.width) + 'px';
        },
        calculatedTop: function calculatedTop() {
            var _dimensions2 = this.dimensions,
                activator = _dimensions2.activator,
                content = _dimensions2.content;

            var activatorTop = this.isAttached ? activator.offsetTop : activator.top;
            var top = 0;
            if (this.top || this.bottom) {
                top = activatorTop + (this.bottom ? activator.height : -content.height) + (this.bottom ? 10 : -10);
            } else if (this.left || this.right) {
                top = activatorTop + activator.height / 2 - content.height / 2;
            }
            if (this.nudgeTop) top -= parseInt(this.nudgeTop);
            if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
            return this.calcYOverflow(top + this.pageYOffset) + 'px';
        },
        classes: function classes() {
            return {
                'v-tooltip--top': this.top,
                'v-tooltip--right': this.right,
                'v-tooltip--bottom': this.bottom,
                'v-tooltip--left': this.left
            };
        },
        computedTransition: function computedTransition() {
            if (this.transition) return this.transition;
            if (this.top) return 'slide-y-reverse-transition';
            if (this.right) return 'slide-x-transition';
            if (this.bottom) return 'slide-y-transition';
            if (this.left) return 'slide-x-reverse-transition';
            return '';
        },
        offsetY: function offsetY() {
            return this.top || this.bottom;
        },
        offsetX: function offsetX() {
            return this.left || this.right;
        },
        styles: function styles() {
            return {
                left: this.calculatedLeft,
                maxWidth: convertToUnit(this.maxWidth),
                opacity: this.isActive ? 0.9 : 0,
                top: this.calculatedTop,
                zIndex: this.zIndex || this.activeZIndex
            };
        }
    },
    beforeMount: function beforeMount() {
        var _this = this;

        this.$nextTick(function () {
            _this.value && _this.callActivate();
        });
    },
    mounted: function mounted() {
        if (getSlotType(this, 'activator', true) === 'v-slot') {
            consoleError('v-tooltip\'s activator slot must be bound, try \'<template #activator="data"><v-btn v-on="data.on>\'', this);
        }
    },

    methods: {
        activate: function activate() {
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(this.startTransition);
        },
        genActivator: function genActivator() {
            var _this2 = this;

            var listeners = this.disabled ? {} : {
                mouseenter: function mouseenter(e) {
                    _this2.getActivator(e);
                    _this2.runDelay('open');
                },
                mouseleave: function mouseleave(e) {
                    _this2.getActivator(e);
                    _this2.runDelay('close');
                }
            };
            if (getSlotType(this, 'activator') === 'scoped') {
                var activator = this.$scopedSlots.activator({ on: listeners });
                this.activatorNode = activator;
                return activator;
            }
            return this.$createElement('span', {
                on: listeners,
                ref: 'activator'
            }, this.$slots.activator);
        }
    },
    render: function render(h) {
        var _class;

        var tooltip = h('div', this.setBackgroundColor(this.color, {
            staticClass: 'v-tooltip__content',
            'class': (_class = {}, VTooltip_defineProperty(_class, this.contentClass, true), VTooltip_defineProperty(_class, 'menuable__content__active', this.isActive), _class),
            style: this.styles,
            attrs: this.getScopeIdAttrs(),
            directives: [{
                name: 'show',
                value: this.isContentActive
            }],
            ref: 'content'
        }), this.showLazyContent(this.$slots.default));
        return h(this.tag, {
            staticClass: 'v-tooltip',
            'class': this.classes
        }, [h('transition', {
            props: {
                name: this.computedTransition
            }
        }, [tooltip]), this.genActivator()]);
    }
});
//# sourceMappingURL=VTooltip.js.map
// CONCATENATED MODULE: ./src/actionbar/ActionbarBuild.vue





/* normalize component */

var component = normalizeComponent(
  actionbar_ActionbarBuildvue_type_script_lang_js_,
  ActionbarBuildvue_type_template_id_7d7fe924_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ActionbarBuild = (component.exports);

/* vuetify-loader */



















installComponents_default()(component, {
  VBtn: VBtn,
  VCard: VCard,
  VCardActions: VCardActions,
  VCardText: VCardText,
  VCardTitle: VCardTitle,
  VContainer: VContainer,
  VDialog: VDialog,
  VFadeTransition: VFadeTransition,
  VFlex: VFlex,
  VIcon: VIcon_VIcon,
  VLayout: VLayout,
  VProgressCircular: VProgressCircular,
  VProgressLinear: VProgressLinear,
  VSpacer: VSpacer,
  VStepper: VStepper,
  VStepperContent: VStepperContent,
  VStepperStep: VStepperStep,
  VTooltip: VTooltip,
})

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"dcf8a58c-vue-loader-template"}!/Users/nat/KBProIDE/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/nat/KBProIDE/node_modules/vuetify-loader/lib/loader.js!/Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/nat/KBProIDE/node_modules/vue-loader/lib??vue-loader-options!./src/actionbar/ActionbarJustCompile.vue?vue&type=template&id=c775f6ec&
var ActionbarJustCompilevue_type_template_id_c775f6ec_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-tooltip',{attrs:{"bottom":""}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary darken-2","icon":""},on:{"click":function($event){_vm.compileDialog = true}},slot:"activator"},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("fa-check")])],1),_c('span',[_vm._v("Just Compile")])],1),_c('v-widget',{attrs:{"title":"Basic Usage"}},[_c('div',{attrs:{"slot":"widget-content"},slot:"widget-content"},[_c('v-dialog',{attrs:{"persistent":"","max-width":"450px"},model:{value:(_vm.compileDialog),callback:function ($$v) {_vm.compileDialog=$$v},expression:"compileDialog"}},[_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("Compile Program")])]),_c('v-card-text',[_c('v-container',[_c('v-layout',{attrs:{"align-center":"","column":""}},[_c('v-flex',{attrs:{"xs12":""}},[(_vm.compileStep <= 2)?_c('v-progress-circular',{attrs:{"size":80,"width":8,"color":"primary","indeterminate":""}}):_vm._e(),_c('v-fade-transition',{attrs:{"hide-on-leave":true}},[(_vm.compileStep > 2)?_c('v-icon',{attrs:{"color":"green","size":"110"}},[_vm._v("\n                                            check_circle_outline\n                                        ")]):_vm._e()],1)],1)],1)],1),_c('v-flex',{attrs:{"xs12":""}},[_c('v-stepper',{staticClass:"elevation-0 pb-0",attrs:{"vertical":""},model:{value:(_vm.compileStep),callback:function ($$v) {_vm.compileStep=$$v},expression:"compileStep"}},[_c('v-stepper-step',{attrs:{"step":"1","complete":_vm.compileStep > 1,"rules":[function (){ return _vm.stepResult['1'].result }]}},[_vm._v("\n                                    Finding board\n                                    "),(_vm.compileStep > 1)?_c('small',[_vm._v(_vm._s(_vm.stepResult["1"].msg))]):_vm._e()]),(_vm.compileStep >= 1)?_c('v-stepper-content',{attrs:{"step":"1"}},[_vm._v("\n                                    "+_vm._s(_vm.stepResult["1"].msg)+"\n                                ")]):_vm._e(),_c('v-stepper-step',{attrs:{"step":"2","complete":_vm.compileStep > 2,"rules":[function (){ return _vm.stepResult['2'].result }]}},[_vm._v("\n                                    Compile the code\n                                    "),(_vm.compileStep > 2)?_c('small',[_vm._v(_vm._s(_vm.stepResult["2"].msg))]):_vm._e()]),(_vm.compileStep >= 2)?_c('v-stepper-content',{attrs:{"step":"2"}},[_vm._v("\n                                    "+_vm._s(_vm.stepResult["2"].msg)+"\n                                ")]):_vm._e()],1)],1)],1),_c('v-card-actions',[_c('v-spacer'),_c('v-btn',{attrs:{"color":"blue darken-1","flat":"","disabled":_vm.compileStep < 2 && _vm.failed === false},on:{"click":function($event){_vm.compileDialog = false}}},[_vm._v("Close\n                        ")])],1)],1)],1)],1)])],1)}
var ActionbarJustCompilevue_type_template_id_c775f6ec_staticRenderFns = []


// CONCATENATED MODULE: ./src/actionbar/ActionbarJustCompile.vue?vue&type=template&id=c775f6ec&

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--12-0!/Users/nat/KBProIDE/node_modules/thread-loader/dist/cjs.js!/Users/nat/KBProIDE/node_modules/babel-loader/lib!/Users/nat/KBProIDE/node_modules/vuetify-loader/lib/loader.js!/Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/nat/KBProIDE/node_modules/vue-loader/lib??vue-loader-options!./src/actionbar/ActionbarJustCompile.vue?vue&type=script&lang=js&

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
var ActionbarJustCompilevue_type_script_lang_js_engine = Vue.prototype.$engine;
var ActionbarJustCompilevue_type_script_lang_js_G = Vue.prototype.$global;
var ActionbarJustCompilevue_type_script_lang_js_path = "".concat(ActionbarJustCompilevue_type_script_lang_js_engine.util.boardDir, "/").concat(ActionbarJustCompilevue_type_script_lang_js_G.board.board, "/compiler.js");
var ActionbarJustCompilevue_type_script_lang_js_boardCompiler = ActionbarJustCompilevue_type_script_lang_js_engine.util.requireFunc(ActionbarJustCompilevue_type_script_lang_js_path);
var ActionbarJustCompilevue_type_script_lang_js_comport = "";
var ActionbarJustCompilevue_type_script_lang_js_mac = "";
var ActionbarJustCompilevue_type_script_lang_js_boardName = "";
/* harmony default export */ var ActionbarJustCompilevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      compileStep: 1,
      compileDialog: false,
      failed: false,
      stepResult: {
        "1": {
          result: true,
          msg: ""
        },
        "2": {
          result: true,
          msg: ""
        },
        "3": {
          result: true,
          msg: ""
        }
      }
    };
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {},
  methods: {
    run: function run() {
      var _this = this;

      //find port and mac
      console.log("---> step 1 <---");
      ActionbarJustCompilevue_type_script_lang_js_comport = ActionbarJustCompilevue_type_script_lang_js_G.board.package["arduino-esp32-actionbar"].comport;
      this.stepResult["1"].msg = "Finding board using ".concat(ActionbarJustCompilevue_type_script_lang_js_comport);

      if (!ActionbarJustCompilevue_type_script_lang_js_comport) {
        console.log("------ process error ------");
        this.stepResult["1"].msg = "Cannot find COMPORT : ".concat(ActionbarJustCompilevue_type_script_lang_js_comport);
        this.stepResult["1"].result = false;
        this.failed = true;
        return;
      }

      ActionbarJustCompilevue_type_script_lang_js_boardCompiler.readMac(ActionbarJustCompilevue_type_script_lang_js_comport).then(function (boardMac) {
        _this.stepResult["1"].msg += " MAC ".concat(boardMac.mac);
        ActionbarJustCompilevue_type_script_lang_js_mac = boardMac.mac;
        ActionbarJustCompilevue_type_script_lang_js_boardName = ActionbarJustCompilevue_type_script_lang_js_mac.replace(/:/g, "-");
        console.log("[STEP 1] got it boardName = ".concat(ActionbarJustCompilevue_type_script_lang_js_boardName, " mac = ").concat(ActionbarJustCompilevue_type_script_lang_js_mac));
        _this.compileStep = 2;
        console.log("---> step 2 <---");
        _this.stepResult["2"].msg = "Compile board ... "; //------ just update it prevent unupdated data -------//

        ActionbarJustCompilevue_type_script_lang_js_G.editor.rawCode = ActionbarJustCompilevue_type_script_lang_js_G.editor.Blockly.JavaScript.workspaceToCode(ActionbarJustCompilevue_type_script_lang_js_G.editor.workspace);
        var xml = ActionbarJustCompilevue_type_script_lang_js_G.editor.Blockly.Xml.domToText(ActionbarJustCompilevue_type_script_lang_js_G.editor.Blockly.Xml.workspaceToDom(ActionbarJustCompilevue_type_script_lang_js_G.editor.Blockly.mainWorkspace));
        ActionbarJustCompilevue_type_script_lang_js_G.editor.blockCode = xml; //----------------------------------------------------//

        var rawCode = ActionbarJustCompilevue_type_script_lang_js_G.editor.mode >= 3 ? ActionbarJustCompilevue_type_script_lang_js_G.editor.sourceCode : ActionbarJustCompilevue_type_script_lang_js_G.editor.rawCode;
        var isSourceCode = ActionbarJustCompilevue_type_script_lang_js_G.editor.mode >= 3 ? true : false;
        var config = {
          board_mac_addr: ActionbarJustCompilevue_type_script_lang_js_mac,
          isSourceCode: isSourceCode
        };

        var compileCb = function compileCb(status) {
          console.log("compileCb called.");
          _this.stepResult["2"].msg = status;
        };

        return ActionbarJustCompilevue_type_script_lang_js_boardCompiler.compile(rawCode, ActionbarJustCompilevue_type_script_lang_js_boardName, config, compileCb);
      }).then(function () {
        _this.compileStep = 3;
        _this.stepResult["2"].msg = "Compile done!";
        console.log("---> step 3 <---");
      }).catch(function (err) {
        console.log("------ process error ------");
        console.log(err);
        _this.failed = true;

        if (_this.compileStep == 1) {
          _this.stepResult["1"].msg = "Cannot find KidBright : " + err;
          _this.stepResult["1"].result = false;
        } else if (_this.compileStep == 2) {
          _this.stepResult["2"].msg = "Compile error : " + err;
          _this.stepResult["2"].result = false;
        } else if (_this.compileStep == 3) {
          _this.stepResult["3"].msg = "Cannot upload program : " + err;
          _this.stepResult["3"].result = false;
        }
      });
    }
  },
  watch: {
    "compileDialog": function compileDialog(val) {
      if (val) {
        //on opening
        this.compileStep = 1;
        this.failed = false;
        this.stepResult["1"].result = true;
        this.stepResult["2"].result = true;
        this.stepResult["3"].result = true;
        this.run();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/actionbar/ActionbarJustCompile.vue?vue&type=script&lang=js&
 /* harmony default export */ var actionbar_ActionbarJustCompilevue_type_script_lang_js_ = (ActionbarJustCompilevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/actionbar/ActionbarJustCompile.vue





/* normalize component */

var ActionbarJustCompile_component = normalizeComponent(
  actionbar_ActionbarJustCompilevue_type_script_lang_js_,
  ActionbarJustCompilevue_type_template_id_c775f6ec_render,
  ActionbarJustCompilevue_type_template_id_c775f6ec_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ActionbarJustCompile = (ActionbarJustCompile_component.exports);

/* vuetify-loader */


















installComponents_default()(ActionbarJustCompile_component, {
  VBtn: VBtn,
  VCard: VCard,
  VCardActions: VCardActions,
  VCardText: VCardText,
  VCardTitle: VCardTitle,
  VContainer: VContainer,
  VDialog: VDialog,
  VFadeTransition: VFadeTransition,
  VFlex: VFlex,
  VIcon: VIcon_VIcon,
  VLayout: VLayout,
  VProgressCircular: VProgressCircular,
  VSpacer: VSpacer,
  VStepper: VStepper,
  VStepperContent: VStepperContent,
  VStepperStep: VStepperStep,
  VTooltip: VTooltip,
})

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"dcf8a58c-vue-loader-template"}!/Users/nat/KBProIDE/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/nat/KBProIDE/node_modules/vuetify-loader/lib/loader.js!/Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/nat/KBProIDE/node_modules/vue-loader/lib??vue-loader-options!./src/actionbar/ActionbarSetting.vue?vue&type=template&id=7b25e13c&
var ActionbarSettingvue_type_template_id_7b25e13c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-tooltip',{attrs:{"bottom":""}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary darken-2","icon":""},on:{"click":function($event){_vm.settingDialog = true}},slot:"activator"},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("fa-cogs")])],1),_c('span',[_vm._v("Setup board")])],1),_c('v-dialog',{attrs:{"max-width":"500px"},model:{value:(_vm.settingDialog),callback:function ($$v) {_vm.settingDialog=$$v},expression:"settingDialog"}},[_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("Setup board")])]),_c('v-divider'),_c('v-card-text',[_c('v-container',{attrs:{"grid-list-md":""}},[_c('v-layout',{attrs:{"wrap":""}},[_c('v-flex',{attrs:{"xs12":""}},[_c('v-subheader',{staticClass:"pa-0 mb-2"},[_vm._v("Board setting")]),_c('div',{staticClass:"d-flex"},[_c('v-combobox',{staticClass:"mr-3",attrs:{"items":_vm.comports,"label":"Select COM port"},model:{value:(_vm.currentPort),callback:function ($$v) {_vm.currentPort=$$v},expression:"currentPort"}}),_c('v-combobox',{attrs:{"items":_vm.baudrates,"label":"Serial upload baudrate"},model:{value:(_vm.baudrate),callback:function ($$v) {_vm.baudrate=$$v},expression:"baudrate"}})],1)],1)],1)],1)],1),_c('v-card-actions',[_c('v-spacer'),_c('v-btn',{attrs:{"color":"blue darken-1","flat":""},nativeOn:{"click":function($event){_vm.settingDialog = false}}},[_vm._v("Close")])],1)],1)],1)],1)}
var ActionbarSettingvue_type_template_id_7b25e13c_staticRenderFns = []


// CONCATENATED MODULE: ./src/actionbar/ActionbarSetting.vue?vue&type=template&id=7b25e13c&

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("a084");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--12-0!/Users/nat/KBProIDE/node_modules/thread-loader/dist/cjs.js!/Users/nat/KBProIDE/node_modules/babel-loader/lib!/Users/nat/KBProIDE/node_modules/vuetify-loader/lib/loader.js!/Users/nat/KBProIDE/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/nat/KBProIDE/node_modules/vue-loader/lib??vue-loader-options!./src/actionbar/ActionbarSetting.vue?vue&type=script&lang=js&

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
var ActionbarSettingvue_type_script_lang_js_engine = Vue.prototype.$engine;
var ActionbarSettingvue_type_script_lang_js_G = Vue.prototype.$global;
var SerialPort = ActionbarSettingvue_type_script_lang_js_engine.util.requireFunc("serialport");
/* harmony default export */ var ActionbarSettingvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      comports: [],
      isFirstLoad: true,
      currentPort: this.$global.board.package["arduino-esp32-actionbar"].comport,
      baudrates: [115200, 256000, 230400, 512000, 921600],
      baudrate: this.$global.board.package["arduino-esp32-actionbar"].baudrate,
      showPassword: false,
      settingDialog: false
    };
  },
  mounted: function mounted() {
    this.listPort();
  },
  methods: {
    listPort: function listPort() {
      var _this = this;

      SerialPort.list().then(function (ports) {
        if (ports.length > 0) {
          var excludePorts = ["/dev/tty.Bluetooth-Incoming-Port"];
          _this.comports = ports.map(function (obj) {
            return obj.comName;
          });
          _this.comports = _this.comports.filter(function (port) {
            return !excludePorts.includes(port);
          });
          /*comName : "COM5"
          locationId : undefined
          manufacturer : "FTDI"
          pnpId : "FTDIBUS\VID_0403+PID_6015+DM01USZ0A\0000"
          productId : "6015"
          serialNumber : "DM01USZ0"
          vendorId :"0403"*/
          //this.comport = this.comports[0];

          if (_this.isFirstLoad) {
            _this.currentPort = _this.comports[0];
          }
        }
      }).catch(function (err) {
        console.log("Error on list port");
      });
    }
  },
  watch: {
    settingDialog: function settingDialog(port) {
      if (port) {
        //on opening
        this.listPort();
        this.isFirstLoad = false;
      }
    },
    currentPort: function currentPort(port) {
      console.log("current Port changed. to ".concat(port)); //this.$global.board.package["arduino-esp32-actionbar"].comport = this.comports[0];

      this.$global.board.package["arduino-esp32-actionbar"].comport = port;
    },
    baudrate: function baudrate(rate) {
      console.log("current Port changed. to ".concat(port));
      this.$global.board.package["arduino-esp32-actionbar"].baudrate = rate;
    }
  }
});
// CONCATENATED MODULE: ./src/actionbar/ActionbarSetting.vue?vue&type=script&lang=js&
 /* harmony default export */ var actionbar_ActionbarSettingvue_type_script_lang_js_ = (ActionbarSettingvue_type_script_lang_js_); 
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_autocompletes.styl
var _autocompletes = __webpack_require__("10f0");

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_text-fields.styl
var _text_fields = __webpack_require__("8cea");

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_select.styl
var _select = __webpack_require__("d305");

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_chips.styl
var _chips = __webpack_require__("cce0");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VChip/VChip.js
var VChip_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



// Components

// Mixins



/* @vue/component */
/* harmony default export */ var VChip = (mixins(colorable, themeable, toggleable).extend({
    name: 'v-chip',
    props: {
        close: Boolean,
        disabled: Boolean,
        label: Boolean,
        outline: Boolean,
        // Used for selects/tagging
        selected: Boolean,
        small: Boolean,
        textColor: String,
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes: function classes() {
            return VChip_extends({
                'v-chip--disabled': this.disabled,
                'v-chip--selected': this.selected && !this.disabled,
                'v-chip--label': this.label,
                'v-chip--outline': this.outline,
                'v-chip--small': this.small,
                'v-chip--removable': this.close
            }, this.themeClasses);
        }
    },
    methods: {
        genClose: function genClose(h) {
            var _this = this;

            var data = {
                staticClass: 'v-chip__close',
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        _this.$emit('input', false);
                    }
                }
            };
            return h('div', data, [h(components_VIcon, '$vuetify.icons.delete')]);
        },
        genContent: function genContent(h) {
            return h('span', {
                staticClass: 'v-chip__content'
            }, [this.$slots.default, this.close && this.genClose(h)]);
        }
    },
    render: function render(h) {
        var data = this.setBackgroundColor(this.color, {
            staticClass: 'v-chip',
            'class': this.classes,
            attrs: { tabindex: this.disabled ? -1 : 0 },
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        });
        var color = this.textColor || this.outline && this.color;
        return h('span', this.setTextColor(color, data), [this.genContent(h)]);
    }
}));
//# sourceMappingURL=VChip.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VChip/index.js


/* harmony default export */ var components_VChip = (VChip);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_menus.styl
var _menus = __webpack_require__("d600");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMenu/mixins/menu-activator.js
/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
/* @vue/component */
/* harmony default export */ var menu_activator = ({
    methods: {
        activatorClickHandler: function activatorClickHandler(e) {
            if (this.openOnClick && !this.isActive) {
                this.getActivator(e).focus();
                this.isActive = true;
                this.absoluteX = e.clientX;
                this.absoluteY = e.clientY;
            } else if (this.closeOnClick && this.isActive) {
                this.getActivator(e).blur();
                this.isActive = false;
            }
        },
        mouseEnterHandler: function mouseEnterHandler() {
            var _this = this;

            this.runDelay('open', function () {
                if (_this.hasJustFocused) return;
                _this.hasJustFocused = true;
                _this.isActive = true;
            });
        },
        mouseLeaveHandler: function mouseLeaveHandler(e) {
            var _this2 = this;

            // Prevent accidental re-activation
            this.runDelay('close', function () {
                if (_this2.$refs.content.contains(e.relatedTarget)) return;
                requestAnimationFrame(function () {
                    _this2.isActive = false;
                    _this2.callDeactivate();
                });
            });
        },
        addActivatorEvents: function addActivatorEvents() {
            var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!activator || this.disabled) return;
            activator.addEventListener('click', this.activatorClickHandler);
        },
        removeActivatorEvents: function removeActivatorEvents() {
            var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!activator) return;
            activator.removeEventListener('click', this.activatorClickHandler);
        }
    }
});
//# sourceMappingURL=menu-activator.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMenu/mixins/menu-generators.js
var menu_generators_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function menu_generators_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function menu_generators_toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


/* @vue/component */
/* harmony default export */ var menu_generators = ({
    methods: {
        genActivator: function genActivator() {
            if (!this.$slots.activator && !this.$scopedSlots.activator) return null;
            var listeners = {};
            if (!this.disabled) {
                if (this.openOnHover) {
                    listeners.mouseenter = this.mouseEnterHandler;
                    listeners.mouseleave = this.mouseLeaveHandler;
                } else if (this.openOnClick) {
                    listeners.click = this.activatorClickHandler;
                }
            }
            if (getSlotType(this, 'activator') === 'scoped') {
                var activator = this.$scopedSlots.activator({ on: listeners });
                this.activatorNode = activator;
                return activator;
            }
            return this.$createElement('div', {
                staticClass: 'v-menu__activator',
                'class': {
                    'v-menu__activator--active': this.hasJustFocused || this.isActive,
                    'v-menu__activator--disabled': this.disabled
                },
                ref: 'activator',
                on: listeners
            }, this.$slots.activator);
        },
        genTransition: function genTransition() {
            if (!this.transition) return this.genContent();
            return this.$createElement('transition', {
                props: {
                    name: this.transition
                }
            }, [this.genContent()]);
        },
        genDirectives: function genDirectives() {
            var _this = this;

            // Do not add click outside for hover menu
            var directives = !this.openOnHover && this.closeOnClick ? [{
                name: 'click-outside',
                value: function value() {
                    return _this.isActive = false;
                },
                args: {
                    closeConditional: this.closeConditional,
                    include: function include() {
                        return [_this.$el].concat(menu_generators_toConsumableArray(_this.getOpenDependentElements()));
                    }
                }
            }] : [];
            directives.push({
                name: 'show',
                value: this.isContentActive
            });
            return directives;
        },
        genContent: function genContent() {
            var _this2 = this;

            var options = {
                attrs: this.getScopeIdAttrs(),
                staticClass: 'v-menu__content',
                'class': menu_generators_extends({}, this.rootThemeClasses, menu_generators_defineProperty({
                    'v-menu__content--auto': this.auto,
                    'menuable__content__active': this.isActive
                }, this.contentClass.trim(), true)),
                style: this.styles,
                directives: this.genDirectives(),
                ref: 'content',
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (e.target.getAttribute('disabled')) return;
                        if (_this2.closeOnContentClick) _this2.isActive = false;
                    }
                }
            };
            !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler);
            this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler);
            return this.$createElement('div', options, this.showLazyContent(this.$slots.default));
        }
    }
});
//# sourceMappingURL=menu-generators.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMenu/mixins/menu-keyable.js
/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */
// Utils

/* @vue/component */
/* harmony default export */ var menu_keyable = ({
    props: {
        disableKeys: Boolean
    },
    data: function data() {
        return {
            listIndex: -1,
            tiles: []
        };
    },
    watch: {
        isActive: function isActive(val) {
            if (!val) this.listIndex = -1;
        },
        listIndex: function listIndex(next, prev) {
            if (next in this.tiles) {
                var tile = this.tiles[next];
                tile.classList.add('v-list__tile--highlighted');
                this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight;
            }
            prev in this.tiles && this.tiles[prev].classList.remove('v-list__tile--highlighted');
        }
    },
    methods: {
        onKeyDown: function onKeyDown(e) {
            var _this = this;

            if (e.keyCode === keyCodes.esc) {
                this.isActive = false;
            } else if (e.keyCode === keyCodes.tab) {
                setTimeout(function () {
                    if (!_this.$refs.content.contains(document.activeElement)) {
                        _this.isActive = false;
                    }
                });
            } else {
                this.changeListIndex(e);
            }
        },
        changeListIndex: function changeListIndex(e) {
            // For infinite scroll and autocomplete, re-evaluate children
            this.getTiles();
            if (e.keyCode === keyCodes.down && this.listIndex < this.tiles.length - 1) {
                this.listIndex++;
                // Allow user to set listIndex to -1 so
                // that the list can be un-highlighted
            } else if (e.keyCode === keyCodes.up && this.listIndex > -1) {
                this.listIndex--;
            } else if (e.keyCode === keyCodes.enter && this.listIndex !== -1) {
                this.tiles[this.listIndex].click();
            } else {
                return;
            }
            // One of the conditions was met, prevent default action (#2988)
            e.preventDefault();
        },
        getTiles: function getTiles() {
            this.tiles = this.$refs.content.querySelectorAll('.v-list__tile');
        }
    }
});
//# sourceMappingURL=menu-keyable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMenu/mixins/menu-position.js
/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
/* @vue/component */
/* harmony default export */ var menu_position = ({
    data: function data() {
        return {
            calculatedTopAuto: 0
        };
    },
    methods: {
        calcScrollPosition: function calcScrollPosition() {
            var $el = this.$refs.content;
            var activeTile = $el.querySelector('.v-list__tile--active');
            var maxScrollTop = $el.scrollHeight - $el.offsetHeight;
            return activeTile ? Math.min(maxScrollTop, Math.max(0, activeTile.offsetTop - $el.offsetHeight / 2 + activeTile.offsetHeight / 2)) : $el.scrollTop;
        },
        calcLeftAuto: function calcLeftAuto() {
            if (this.isAttached) return 0;
            return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
        },
        calcTopAuto: function calcTopAuto() {
            var $el = this.$refs.content;
            var activeTile = $el.querySelector('.v-list__tile--active');
            if (!activeTile) {
                this.selectedIndex = null;
            }
            if (this.offsetY || !activeTile) {
                return this.computedTop;
            }
            this.selectedIndex = Array.from(this.tiles).indexOf(activeTile);
            var tileDistanceFromMenuTop = activeTile.offsetTop - this.calcScrollPosition();
            var firstTileOffsetTop = $el.querySelector('.v-list__tile').offsetTop;
            return this.computedTop - tileDistanceFromMenuTop - firstTileOffsetTop;
        }
    }
});
//# sourceMappingURL=menu-position.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/directives/resize.js
function inserted(el, binding) {
    var callback = binding.value;
    var options = binding.options || { passive: true };
    window.addEventListener('resize', callback, options);
    el._onResize = {
        callback: callback,
        options: options
    };
    if (!binding.modifiers || !binding.modifiers.quiet) {
        callback();
    }
}
function resize_unbind(el) {
    if (!el._onResize) return;
    var _el$_onResize = el._onResize,
        callback = _el$_onResize.callback,
        options = _el$_onResize.options;

    window.removeEventListener('resize', callback, options);
    delete el._onResize;
}
/* harmony default export */ var resize = ({
    inserted: inserted,
    unbind: resize_unbind
});
//# sourceMappingURL=resize.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMenu/VMenu.js


// Mixins







// Component level mixins




// Directives


// Helpers



/* @vue/component */
/* harmony default export */ var VMenu = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'v-menu',
    provide: function provide() {
        return {
            // Pass theme through to default slot
            theme: this.theme
        };
    },

    directives: {
        ClickOutside: click_outside,
        Resize: resize
    },
    mixins: [menu_activator, dependent, delayable, detachable, menu_generators, menu_keyable, menuable, menu_position, returnable, toggleable, themeable],
    props: {
        auto: Boolean,
        closeOnClick: {
            type: Boolean,
            default: true
        },
        closeOnContentClick: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        fullWidth: Boolean,
        maxHeight: { default: 'auto' },
        openOnClick: {
            type: Boolean,
            default: true
        },
        offsetX: Boolean,
        offsetY: Boolean,
        openOnHover: Boolean,
        origin: {
            type: String,
            default: 'top left'
        },
        transition: {
            type: [Boolean, String],
            default: 'v-menu-transition'
        }
    },
    data: function data() {
        return {
            defaultOffset: 8,
            hasJustFocused: false,
            resizeTimeout: null
        };
    },

    computed: {
        calculatedLeft: function calculatedLeft() {
            var menuWidth = Math.max(this.dimensions.content.width, this.dimensions.activator.width);
            if (!this.auto) return this.calcLeft(menuWidth);
            return this.calcXOverflow(this.calcLeftAuto(), menuWidth) + 'px';
        },
        calculatedMaxHeight: function calculatedMaxHeight() {
            return this.auto ? '200px' : convertToUnit(this.maxHeight);
        },
        calculatedMaxWidth: function calculatedMaxWidth() {
            return isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px';
        },
        calculatedMinWidth: function calculatedMinWidth() {
            if (this.minWidth) {
                return isNaN(this.minWidth) ? this.minWidth : this.minWidth + 'px';
            }
            var minWidth = this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);
            var calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth)) ? minWidth : parseInt(this.calculatedMaxWidth);
            return Math.min(calculatedMaxWidth, minWidth) + 'px';
        },
        calculatedTop: function calculatedTop() {
            if (!this.auto || this.isAttached) return this.calcTop();
            return this.calcYOverflow(this.calculatedTopAuto) + 'px';
        },
        styles: function styles() {
            return {
                maxHeight: this.calculatedMaxHeight,
                minWidth: this.calculatedMinWidth,
                maxWidth: this.calculatedMaxWidth,
                top: this.calculatedTop,
                left: this.calculatedLeft,
                transformOrigin: this.origin,
                zIndex: this.zIndex || this.activeZIndex
            };
        }
    },
    watch: {
        activator: function activator(newActivator, oldActivator) {
            this.removeActivatorEvents(oldActivator);
            this.addActivatorEvents(newActivator);
        },
        disabled: function disabled(_disabled) {
            if (!this.activator) return;
            if (_disabled) {
                this.removeActivatorEvents(this.activator);
            } else {
                this.addActivatorEvents(this.activator);
            }
        },
        isContentActive: function isContentActive(val) {
            this.hasJustFocused = val;
        }
    },
    mounted: function mounted() {
        this.isActive && this.activate();
        if (getSlotType(this, 'activator', true) === 'v-slot') {
            consoleError('v-tooltip\'s activator slot must be bound, try \'<template #activator="data"><v-btn v-on="data.on>\'', this);
        }
    },

    methods: {
        activate: function activate() {
            var _this = this;

            // This exists primarily for v-select
            // helps determine which tiles to activate
            this.getTiles();
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(function () {
                // Once transitioning, calculate scroll and top position
                _this.startTransition().then(function () {
                    if (_this.$refs.content) {
                        _this.calculatedTopAuto = _this.calcTopAuto();
                        _this.auto && (_this.$refs.content.scrollTop = _this.calcScrollPosition());
                    }
                });
            });
        },
        closeConditional: function closeConditional() {
            return this.isActive && this.closeOnClick;
        },
        onResize: function onResize() {
            if (!this.isActive) return;
            // Account for screen resize
            // and orientation change
            // eslint-disable-next-line no-unused-expressions
            this.$refs.content.offsetWidth;
            this.updateDimensions();
            // When resizing to a smaller width
            // content width is evaluated before
            // the new activator width has been
            // set, causing it to not size properly
            // hacky but will revisit in the future
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.updateDimensions, 100);
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-menu',
            class: { 'v-menu--inline': !this.fullWidth && this.$slots.activator },
            directives: [{
                arg: 500,
                name: 'resize',
                value: this.onResize
            }],
            on: this.disableKeys ? undefined : {
                keydown: this.onKeyDown
            }
        };
        return h('div', data, [this.genActivator(), this.$createElement(ThemeProvider, {
            props: {
                root: true,
                light: this.light,
                dark: this.dark
            }
        }, [this.genTransition()])]);
    }
}));
//# sourceMappingURL=VMenu.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMenu/index.js


/* harmony default export */ var components_VMenu = (VMenu);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_selection-controls.styl
var _selection_controls = __webpack_require__("5312");

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_inputs.styl
var _inputs = __webpack_require__("73c2");

// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_labels.styl
var _labels = __webpack_require__("2367");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VLabel/VLabel.js
var VLabel_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Mixins



// Helpers

/* @vue/component */
/* harmony default export */ var VLabel = (mixins(themeable).extend({
    name: 'v-label',
    functional: true,
    props: {
        absolute: Boolean,
        color: {
            type: [Boolean, String],
            default: 'primary'
        },
        disabled: Boolean,
        focused: Boolean,
        for: String,
        left: {
            type: [Number, String],
            default: 0
        },
        right: {
            type: [Number, String],
            default: 'auto'
        },
        value: Boolean
    },
    render: function render(h, ctx) {
        var children = ctx.children,
            listeners = ctx.listeners,
            props = ctx.props;

        var data = {
            staticClass: 'v-label',
            'class': VLabel_extends({
                'v-label--active': props.value,
                'v-label--is-disabled': props.disabled
            }, functionalThemeClasses(ctx)),
            attrs: {
                for: props.for,
                'aria-hidden': !props.for
            },
            on: listeners,
            style: {
                left: convertToUnit(props.left),
                right: convertToUnit(props.right),
                position: props.absolute ? 'absolute' : 'relative'
            }
        };
        return h('label', colorable.options.methods.setTextColor(props.focused && props.color, data), children);
    }
}));
//# sourceMappingURL=VLabel.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VLabel/index.js


/* harmony default export */ var components_VLabel = (VLabel);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_messages.styl
var _messages = __webpack_require__("55af");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMessages/VMessages.js
// Styles

// Mixins



/* @vue/component */
/* harmony default export */ var VMessages = (mixins(colorable, themeable).extend({
    name: 'v-messages',
    props: {
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    methods: {
        genChildren: function genChildren() {
            return this.$createElement('transition-group', {
                staticClass: 'v-messages__wrapper',
                attrs: {
                    name: 'message-transition',
                    tag: 'div'
                }
            }, this.value.map(this.genMessage));
        },
        genMessage: function genMessage(message, key) {
            return this.$createElement('div', {
                staticClass: 'v-messages__message',
                key: key,
                domProps: {
                    innerHTML: message
                }
            });
        }
    },
    render: function render(h) {
        return h('div', this.setTextColor(this.color, {
            staticClass: 'v-messages',
            class: this.themeClasses
        }), [this.genChildren()]);
    }
}));
//# sourceMappingURL=VMessages.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VMessages/index.js


/* harmony default export */ var components_VMessages = (VMessages);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/validatable.js
var validatable_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Mixins


// Utilities



/* @vue/component */
/* harmony default export */ var validatable = (mixins(colorable, inject('form')).extend({
    name: 'validatable',
    props: {
        disabled: Boolean,
        error: Boolean,
        errorCount: {
            type: [Number, String],
            default: 1
        },
        errorMessages: {
            type: [String, Array],
            default: function _default() {
                return [];
            }
        },
        messages: {
            type: [String, Array],
            default: function _default() {
                return [];
            }
        },
        readonly: Boolean,
        rules: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        success: Boolean,
        successMessages: {
            type: [String, Array],
            default: function _default() {
                return [];
            }
        },
        validateOnBlur: Boolean,
        value: { required: false }
    },
    data: function data() {
        return {
            errorBucket: [],
            hasColor: false,
            hasFocused: false,
            hasInput: false,
            isFocused: false,
            isResetting: false,
            lazyValue: this.value,
            valid: false
        };
    },

    computed: {
        hasError: function hasError() {
            return this.internalErrorMessages.length > 0 || this.errorBucket.length > 0 || this.error;
        },

        // TODO: Add logic that allows the user to enable based
        // upon a good validation
        hasSuccess: function hasSuccess() {
            return this.internalSuccessMessages.length > 0 || this.success;
        },
        externalError: function externalError() {
            return this.internalErrorMessages.length > 0 || this.error;
        },
        hasMessages: function hasMessages() {
            return this.validationTarget.length > 0;
        },
        hasState: function hasState() {
            return this.hasSuccess || this.shouldValidate && this.hasError;
        },
        internalErrorMessages: function internalErrorMessages() {
            return this.genInternalMessages(this.errorMessages);
        },
        internalMessages: function internalMessages() {
            return this.genInternalMessages(this.messages);
        },
        internalSuccessMessages: function internalSuccessMessages() {
            return this.genInternalMessages(this.successMessages);
        },

        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                this.lazyValue = val;
                this.$emit('input', val);
            }
        },
        shouldValidate: function shouldValidate() {
            if (this.externalError) return true;
            if (this.isResetting) return false;
            return this.validateOnBlur ? this.hasFocused && !this.isFocused : this.hasInput || this.hasFocused;
        },
        validations: function validations() {
            return this.validationTarget.slice(0, Number(this.errorCount));
        },
        validationState: function validationState() {
            if (this.hasError && this.shouldValidate) return 'error';
            if (this.hasSuccess) return 'success';
            if (this.hasColor) return this.color;
            return undefined;
        },
        validationTarget: function validationTarget() {
            if (this.internalErrorMessages.length > 0) {
                return this.internalErrorMessages;
            } else if (this.successMessages.length > 0) {
                return this.internalSuccessMessages;
            } else if (this.messages.length > 0) {
                return this.internalMessages;
            } else if (this.shouldValidate) {
                return this.errorBucket;
            } else return [];
        }
    },
    watch: {
        rules: {
            handler: function handler(newVal, oldVal) {
                if (deepEqual(newVal, oldVal)) return;
                this.validate();
            },

            deep: true
        },
        internalValue: function internalValue() {
            // If it's the first time we're setting input,
            // mark it with hasInput
            this.hasInput = true;
            this.validateOnBlur || this.$nextTick(this.validate);
        },
        isFocused: function isFocused(val) {
            // Should not check validation
            // if disabled or readonly
            if (!val && !this.disabled && !this.readonly) {
                this.hasFocused = true;
                this.validateOnBlur && this.validate();
            }
        },
        isResetting: function isResetting() {
            var _this = this;

            setTimeout(function () {
                _this.hasInput = false;
                _this.hasFocused = false;
                _this.isResetting = false;
                _this.validate();
            }, 0);
        },
        hasError: function hasError(val) {
            if (this.shouldValidate) {
                this.$emit('update:error', val);
            }
        },
        value: function value(val) {
            this.lazyValue = val;
        }
    },
    beforeMount: function beforeMount() {
        this.validate();
    },
    created: function created() {
        this.form && this.form.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.form && this.form.unregister(this);
    },

    methods: {
        genInternalMessages: function genInternalMessages(messages) {
            if (!messages) return [];else if (Array.isArray(messages)) return messages;else return [messages];
        },

        /** @public */
        reset: function reset() {
            this.isResetting = true;
            this.internalValue = Array.isArray(this.internalValue) ? [] : undefined;
        },

        /** @public */
        resetValidation: function resetValidation() {
            this.isResetting = true;
        },

        /** @public */
        validate: function validate() {
            var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var value = arguments[1];

            var errorBucket = [];
            value = value || this.internalValue;
            if (force) this.hasInput = this.hasFocused = true;
            for (var index = 0; index < this.rules.length; index++) {
                var rule = this.rules[index];
                var valid = typeof rule === 'function' ? rule(value) : rule;
                if (typeof valid === 'string') {
                    errorBucket.push(valid);
                } else if (typeof valid !== 'boolean') {
                    consoleError('Rules should return a string or boolean, received \'' + (typeof valid === 'undefined' ? 'undefined' : validatable_typeof(valid)) + '\' instead', this);
                }
            }
            this.errorBucket = errorBucket;
            this.valid = errorBucket.length === 0;
            return this.valid;
        }
    }
}));
//# sourceMappingURL=validatable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VInput/VInput.js
var VInput_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Components



// Mixins



// Utilities



/* harmony default export */ var VInput = (mixins(colorable, themeable, validatable
/* @vue/component */
).extend({
    name: 'v-input',
    props: {
        appendIcon: String,
        /** @deprecated */
        appendIconCb: Function,
        backgroundColor: {
            type: String,
            default: ''
        },
        height: [Number, String],
        hideDetails: Boolean,
        hint: String,
        label: String,
        loading: Boolean,
        persistentHint: Boolean,
        prependIcon: String,
        /** @deprecated */
        prependIconCb: Function,
        value: { required: false }
    },
    data: function data() {
        return {
            attrsInput: {},
            lazyValue: this.value,
            hasMouseDown: false
        };
    },

    computed: {
        classes: function classes() {
            return {};
        },
        classesInput: function classesInput() {
            return VInput_extends({}, this.classes, {
                'v-input--has-state': this.hasState,
                'v-input--hide-details': this.hideDetails,
                'v-input--is-label-active': this.isLabelActive,
                'v-input--is-dirty': this.isDirty,
                'v-input--is-disabled': this.disabled,
                'v-input--is-focused': this.isFocused,
                'v-input--is-loading': this.loading !== false && this.loading !== undefined,
                'v-input--is-readonly': this.readonly
            }, this.themeClasses);
        },
        directivesInput: function directivesInput() {
            return [];
        },
        hasHint: function hasHint() {
            return !this.hasMessages && this.hint && (this.persistentHint || this.isFocused);
        },
        hasLabel: function hasLabel() {
            return Boolean(this.$slots.label || this.label);
        },

        // Proxy for `lazyValue`
        // This allows an input
        // to function without
        // a provided model
        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                this.lazyValue = val;
                this.$emit(this.$_modelEvent, val);
            }
        },
        isDirty: function isDirty() {
            return !!this.lazyValue;
        },
        isDisabled: function isDisabled() {
            return Boolean(this.disabled || this.readonly);
        },
        isLabelActive: function isLabelActive() {
            return this.isDirty;
        }
    },
    watch: {
        value: function value(val) {
            this.lazyValue = val;
        }
    },
    beforeCreate: function beforeCreate() {
        // v-radio-group needs to emit a different event
        // https://github.com/vuetifyjs/vuetify/issues/4752
        this.$_modelEvent = this.$options.model && this.$options.model.event || 'input';
    },

    methods: {
        genContent: function genContent() {
            return [this.genPrependSlot(), this.genControl(), this.genAppendSlot()];
        },
        genControl: function genControl() {
            return this.$createElement('div', {
                staticClass: 'v-input__control'
            }, [this.genInputSlot(), this.genMessages()]);
        },
        genDefaultSlot: function genDefaultSlot() {
            return [this.genLabel(), this.$slots.default];
        },

        // TODO: remove shouldDeprecate (2.0), used for clearIcon
        genIcon: function genIcon(type, cb) {
            var _this = this;

            var shouldDeprecate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var icon = this[type + 'Icon'];
            var eventName = 'click:' + kebabCase(type);
            cb = cb || this[type + 'IconCb'];
            if (shouldDeprecate && type && cb) {
                deprecate(':' + type + '-icon-cb', '@' + eventName, this);
            }
            var data = {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    light: this.light
                },
                on: !(this.$listeners[eventName] || cb) ? undefined : {
                    click: function click(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.$emit(eventName, e);
                        cb && cb(e);
                    },
                    // Container has mouseup event that will
                    // trigger menu open if enclosed
                    mouseup: function mouseup(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            };
            return this.$createElement('div', {
                staticClass: 'v-input__icon v-input__icon--' + kebabCase(type),
                key: '' + type + icon
            }, [this.$createElement(components_VIcon, data, icon)]);
        },
        genInputSlot: function genInputSlot() {
            return this.$createElement('div', this.setBackgroundColor(this.backgroundColor, {
                staticClass: 'v-input__slot',
                style: { height: convertToUnit(this.height) },
                directives: this.directivesInput,
                on: {
                    click: this.onClick,
                    mousedown: this.onMouseDown,
                    mouseup: this.onMouseUp
                },
                ref: 'input-slot'
            }), [this.genDefaultSlot()]);
        },
        genLabel: function genLabel() {
            if (!this.hasLabel) return null;
            return this.$createElement(components_VLabel, {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    focused: this.hasState,
                    for: this.$attrs.id,
                    light: this.light
                }
            }, this.$slots.label || this.label);
        },
        genMessages: function genMessages() {
            if (this.hideDetails) return null;
            var messages = this.hasHint ? [this.hint] : this.validations;
            return this.$createElement(components_VMessages, {
                props: {
                    color: this.hasHint ? '' : this.validationState,
                    dark: this.dark,
                    light: this.light,
                    value: this.hasMessages || this.hasHint ? messages : []
                }
            });
        },
        genSlot: function genSlot(type, location, slot) {
            if (!slot.length) return null;
            var ref = type + '-' + location;
            return this.$createElement('div', {
                staticClass: 'v-input__' + ref,
                ref: ref
            }, slot);
        },
        genPrependSlot: function genPrependSlot() {
            var slot = [];
            if (this.$slots.prepend) {
                slot.push(this.$slots.prepend);
            } else if (this.prependIcon) {
                slot.push(this.genIcon('prepend'));
            }
            return this.genSlot('prepend', 'outer', slot);
        },
        genAppendSlot: function genAppendSlot() {
            var slot = [];
            // Append icon for text field was really
            // an appended inner icon, v-text-field
            // will overwrite this method in order to obtain
            // backwards compat
            if (this.$slots.append) {
                slot.push(this.$slots.append);
            } else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        onClick: function onClick(e) {
            this.$emit('click', e);
        },
        onMouseDown: function onMouseDown(e) {
            this.hasMouseDown = true;
            this.$emit('mousedown', e);
        },
        onMouseUp: function onMouseUp(e) {
            this.hasMouseDown = false;
            this.$emit('mouseup', e);
        }
    },
    render: function render(h) {
        return h('div', this.setTextColor(this.validationState, {
            staticClass: 'v-input',
            attrs: this.attrsInput,
            'class': this.classesInput
        }), this.genContent());
    }
}));
//# sourceMappingURL=VInput.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VInput/index.js


/* harmony default export */ var components_VInput = (VInput);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/rippleable.js
// Directives

// Types

/* harmony default export */ var rippleable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'rippleable',
    directives: { Ripple: directives_ripple },
    props: {
        ripple: {
            type: [Boolean, Object],
            default: true
        }
    },
    methods: {
        genRipple: function genRipple() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!this.ripple) return null;
            data.staticClass = 'v-input--selection-controls__ripple';
            data.directives = data.directives || [];
            data.directives.push({
                name: 'ripple',
                value: { center: true }
            });
            data.on = Object.assign({
                click: this.onChange
            }, this.$listeners);
            return this.$createElement('div', data);
        },
        onChange: function onChange() {}
    }
}));
//# sourceMappingURL=rippleable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/comparable.js


/* harmony default export */ var comparable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'comparable',
    props: {
        valueComparator: {
            type: Function,
            default: deepEqual
        }
    }
}));
//# sourceMappingURL=comparable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/selectable.js
// Components

// Mixins


/* @vue/component */
/* harmony default export */ var selectable = (components_VInput.extend({
    name: 'selectable',
    mixins: [rippleable, comparable],
    model: {
        prop: 'inputValue',
        event: 'change'
    },
    props: {
        color: {
            type: String,
            default: 'accent'
        },
        id: String,
        inputValue: null,
        falseValue: null,
        trueValue: null,
        multiple: {
            type: Boolean,
            default: null
        },
        label: String
    },
    data: function data(vm) {
        return {
            lazyValue: vm.inputValue
        };
    },
    computed: {
        computedColor: function computedColor() {
            return this.isActive ? this.color : this.validationState;
        },
        isMultiple: function isMultiple() {
            return this.multiple === true || this.multiple === null && Array.isArray(this.internalValue);
        },
        isActive: function isActive() {
            var _this = this;

            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) return false;
                return input.some(function (item) {
                    return _this.valueComparator(item, value);
                });
            }
            if (this.trueValue === undefined || this.falseValue === undefined) {
                return value ? this.valueComparator(value, input) : Boolean(input);
            }
            return this.valueComparator(input, this.trueValue);
        },
        isDirty: function isDirty() {
            return this.isActive;
        }
    },
    watch: {
        inputValue: function inputValue(val) {
            this.lazyValue = val;
        }
    },
    methods: {
        genLabel: function genLabel() {
            if (!this.hasLabel) return null;
            var label = components_VInput.options.methods.genLabel.call(this);
            label.data.on = { click: this.onChange };
            return label;
        },
        genInput: function genInput(type, attrs) {
            return this.$createElement('input', {
                attrs: Object.assign({
                    'aria-label': this.label,
                    'aria-checked': this.isActive.toString(),
                    disabled: this.isDisabled,
                    id: this.id,
                    role: type,
                    type: type
                }, attrs),
                domProps: {
                    value: this.value,
                    checked: this.isActive
                },
                on: {
                    blur: this.onBlur,
                    change: this.onChange,
                    focus: this.onFocus,
                    keydown: this.onKeydown
                },
                ref: 'input'
            });
        },
        onBlur: function onBlur() {
            this.isFocused = false;
        },
        onChange: function onChange() {
            var _this2 = this;

            if (this.isDisabled) return;
            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) {
                    input = [];
                }
                var length = input.length;
                input = input.filter(function (item) {
                    return !_this2.valueComparator(item, value);
                });
                if (input.length === length) {
                    input.push(value);
                }
            } else if (this.trueValue !== undefined && this.falseValue !== undefined) {
                input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
            } else if (value) {
                input = this.valueComparator(input, value) ? null : value;
            } else {
                input = !input;
            }
            this.validate(true, input);
            this.internalValue = input;
        },
        onFocus: function onFocus() {
            this.isFocused = true;
        },

        /** @abstract */
        onKeydown: function onKeydown(e) {}
    }
}));
//# sourceMappingURL=selectable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCheckbox/VCheckbox.js
var VCheckbox_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Components

// import { VFadeTransition } from '../transitions'
// Mixins

/* @vue/component */
/* harmony default export */ var VCheckbox = ({
    name: 'v-checkbox',
    mixins: [selectable],
    props: {
        indeterminate: Boolean,
        indeterminateIcon: {
            type: String,
            default: '$vuetify.icons.checkboxIndeterminate'
        },
        onIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOn'
        },
        offIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOff'
        }
    },
    data: function data(vm) {
        return {
            inputIndeterminate: vm.indeterminate
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--selection-controls': true,
                'v-input--checkbox': true
            };
        },
        computedIcon: function computedIcon() {
            if (this.inputIndeterminate) {
                return this.indeterminateIcon;
            } else if (this.isActive) {
                return this.onIcon;
            } else {
                return this.offIcon;
            }
        }
    },
    watch: {
        indeterminate: function indeterminate(val) {
            this.inputIndeterminate = val;
        }
    },
    methods: {
        genCheckbox: function genCheckbox() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [this.genInput('checkbox', VCheckbox_extends({}, this.$attrs, {
                'aria-checked': this.inputIndeterminate ? 'mixed' : this.isActive.toString()
            })), this.genRipple(this.setTextColor(this.computedColor)), this.$createElement(components_VIcon, this.setTextColor(this.computedColor, {
                props: {
                    dark: this.dark,
                    light: this.light
                }
            }), this.computedIcon)]);
        },
        genDefaultSlot: function genDefaultSlot() {
            return [this.genCheckbox(), this.genLabel()];
        }
    }
});
//# sourceMappingURL=VCheckbox.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCheckbox/index.js


/* harmony default export */ var components_VCheckbox = (VCheckbox);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_dividers.styl
var _dividers = __webpack_require__("34d4");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Mixins

/* harmony default export */ var VDivider = (themeable.extend({
    name: 'v-divider',
    props: {
        inset: Boolean,
        vertical: Boolean
    },
    render: function render(h) {
        return h('hr', {
            class: VDivider_extends({
                'v-divider': true,
                'v-divider--inset': this.inset,
                'v-divider--vertical': this.vertical
            }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        });
    }
}));
//# sourceMappingURL=VDivider.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VDivider/index.js


/* harmony default export */ var components_VDivider = (VDivider);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_subheaders.styl
var _subheaders = __webpack_require__("bda8");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VSubheader/VSubheader.js
var VSubheader_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Mixins


/* harmony default export */ var VSubheader = (mixins(themeable
/* @vue/component */
).extend({
    name: 'v-subheader',
    props: {
        inset: Boolean
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-subheader',
            class: VSubheader_extends({
                'v-subheader--inset': this.inset
            }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        }, this.$slots.default);
    }
}));
//# sourceMappingURL=VSubheader.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VSubheader/index.js


/* harmony default export */ var components_VSubheader = (VSubheader);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VList/VListTile.js
var VListTile_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function VListTile_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Mixins




// Directives

// Types

/* @vue/component */
/* harmony default export */ var VListTile = (mixins(colorable, routable, toggleable, themeable).extend({
    name: 'v-list-tile',
    directives: {
        Ripple: directives_ripple
    },
    inheritAttrs: false,
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        avatar: Boolean,
        inactive: Boolean,
        tag: String
    },
    data: function data() {
        return {
            proxyClass: 'v-list__tile--active'
        };
    },
    computed: {
        listClasses: function listClasses() {
            return this.disabled ? { 'v-list--disabled': true } : undefined;
        },
        classes: function classes() {
            return VListTile_extends({
                'v-list__tile': true,
                'v-list__tile--link': this.isLink && !this.inactive,
                'v-list__tile--avatar': this.avatar,
                'v-list__tile--disabled': this.disabled,
                'v-list__tile--active': !this.to && this.isActive
            }, this.themeClasses, VListTile_defineProperty({}, this.activeClass, this.isActive));
        },
        isLink: function isLink() {
            var hasClick = this.$listeners && (this.$listeners.click || this.$listeners['!click']);
            return Boolean(this.href || this.to || hasClick);
        }
    },
    render: function render(h) {
        var isRouteLink = !this.inactive && this.isLink;

        var _ref = isRouteLink ? this.generateRouteLink(this.classes) : {
            tag: this.tag || 'div',
            data: {
                class: this.classes
            }
        },
            tag = _ref.tag,
            data = _ref.data;

        data.attrs = Object.assign({}, data.attrs, this.$attrs);
        return h('div', this.setTextColor(!this.disabled && this.color, {
            class: this.listClasses,
            attrs: {
                disabled: this.disabled,
                role: 'listitem'
            }
        }), [h(tag, data, this.$slots.default)]);
    }
}));
//# sourceMappingURL=VListTile.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VList/VListTileAction.js
// Types

/* @vue/component */
/* harmony default export */ var VListTileAction = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'v-list-tile-action',
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data,
            _ref$children = _ref.children,
            children = _ref$children === undefined ? [] : _ref$children;

        data.staticClass = data.staticClass ? 'v-list__tile__action ' + data.staticClass : 'v-list__tile__action';
        var filteredChild = children.filter(function (VNode) {
            return VNode.isComment === false && VNode.text !== ' ';
        });
        if (filteredChild.length > 1) data.staticClass += ' v-list__tile__action--stack';
        return h('div', data, children);
    }
}));
//# sourceMappingURL=VListTileAction.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_lists.styl
var _lists = __webpack_require__("c6f9");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VList/VList.js
var VList_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Mixins


// Types

/* harmony default export */ var VList = (mixins(provide('list'), themeable
/* @vue/component */
).extend({
    name: 'v-list',
    provide: function provide() {
        return {
            listClick: this.listClick
        };
    },

    props: {
        dense: Boolean,
        expand: Boolean,
        subheader: Boolean,
        threeLine: Boolean,
        twoLine: Boolean
    },
    data: function data() {
        return {
            groups: []
        };
    },
    computed: {
        classes: function classes() {
            return VList_extends({
                'v-list--dense': this.dense,
                'v-list--subheader': this.subheader,
                'v-list--two-line': this.twoLine,
                'v-list--three-line': this.threeLine
            }, this.themeClasses);
        }
    },
    methods: {
        register: function register(content) {
            this.groups.push(content);
        },
        unregister: function unregister(content) {
            var index = this.groups.findIndex(function (g) {
                return g._uid === content._uid;
            });
            if (index > -1) this.groups.splice(index, 1);
        },
        listClick: function listClick(uid) {
            if (this.expand) return;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.groups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var group = _step.value;

                    group.toggle(uid);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-list',
            class: this.classes,
            attrs: {
                role: 'list'
            }
        };
        return h('div', data, [this.$slots.default]);
    }
}));
//# sourceMappingURL=VList.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VList/VListGroup.js
var VListGroup_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function VListGroup_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Components

// Mixins



// Transitions

// Utils

/* harmony default export */ var VListGroup = (mixins(bootable, inject('list', 'v-list-group', 'v-list'), toggleable
/* @vue/component */
).extend({
    name: 'v-list-group',
    inject: ['listClick'],
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        appendIcon: {
            type: String,
            default: '$vuetify.icons.expand'
        },
        disabled: Boolean,
        group: String,
        noAction: Boolean,
        prependIcon: String,
        subGroup: Boolean
    },
    data: function data() {
        return {
            groups: []
        };
    },
    computed: {
        groupClasses: function groupClasses() {
            return {
                'v-list__group--active': this.isActive,
                'v-list__group--disabled': this.disabled
            };
        },
        headerClasses: function headerClasses() {
            return {
                'v-list__group__header--active': this.isActive,
                'v-list__group__header--sub-group': this.subGroup
            };
        },
        itemsClasses: function itemsClasses() {
            return {
                'v-list__group__items--no-action': this.noAction
            };
        }
    },
    watch: {
        isActive: function isActive(val) {
            if (!this.subGroup && val) {
                this.listClick(this._uid);
            }
        },
        $route: function $route(to) {
            var isActive = this.matchRoute(to.path);
            if (this.group) {
                if (isActive && this.isActive !== isActive) {
                    this.listClick(this._uid);
                }
                this.isActive = isActive;
            }
        }
    },
    mounted: function mounted() {
        this.list.register(this);
        if (this.group && this.$route && this.value == null) {
            this.isActive = this.matchRoute(this.$route.path);
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.list.unregister(this._uid);
    },

    methods: {
        click: function click(e) {
            if (this.disabled) return;
            this.$emit('click', e);
            this.isActive = !this.isActive;
        },
        genIcon: function genIcon(icon) {
            return this.$createElement(components_VIcon, icon);
        },
        genAppendIcon: function genAppendIcon() {
            var icon = !this.subGroup ? this.appendIcon : false;
            if (!icon && !this.$slots.appendIcon) return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__append-icon'
            }, [this.$slots.appendIcon || this.genIcon(icon)]);
        },
        genGroup: function genGroup() {
            return this.$createElement('div', {
                staticClass: 'v-list__group__header',
                class: this.headerClasses,
                on: VListGroup_extends({}, this.$listeners, {
                    click: this.click
                }),
                ref: 'item'
            }, [this.genPrependIcon(), this.$slots.activator, this.genAppendIcon()]);
        },
        genItems: function genItems() {
            return this.$createElement('div', {
                staticClass: 'v-list__group__items',
                class: this.itemsClasses,
                directives: [{
                    name: 'show',
                    value: this.isActive
                }],
                ref: 'group'
            }, this.showLazyContent(this.$slots.default));
        },
        genPrependIcon: function genPrependIcon() {
            var icon = this.prependIcon ? this.prependIcon : this.subGroup ? '$vuetify.icons.subgroup' : false;
            if (!icon && !this.$slots.prependIcon) return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__prepend-icon',
                'class': VListGroup_defineProperty({}, this.activeClass, this.isActive)
            }, [this.$slots.prependIcon || this.genIcon(icon)]);
        },
        toggle: function toggle(uid) {
            this.isActive = this._uid === uid;
        },
        matchRoute: function matchRoute(to) {
            if (!this.group) return false;
            return to.match(this.group) !== null;
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-list__group',
            class: this.groupClasses
        }, [this.genGroup(), h(VExpandTransition, [this.genItems()])]);
    }
}));
//# sourceMappingURL=VListGroup.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_avatars.styl
var _avatars = __webpack_require__("55cc");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VAvatar/VAvatar.js
var VAvatar_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


// Mixins



/* @vue/component */
/* harmony default export */ var VAvatar = (mixins(colorable).extend({
    name: 'v-avatar',
    functional: true,
    props: {
        // TODO: inherit these
        color: String,
        size: {
            type: [Number, String],
            default: 48
        },
        tile: Boolean
    },
    render: function render(h, _ref) {
        var data = _ref.data,
            props = _ref.props,
            children = _ref.children;

        data.staticClass = ('v-avatar ' + (data.staticClass || '')).trim();
        if (props.tile) data.staticClass += ' v-avatar--tile';
        var size = convertToUnit(props.size);
        data.style = VAvatar_extends({
            height: size,
            width: size
        }, data.style);
        return h('div', colorable.options.methods.setBackgroundColor(props.color, data), children);
    }
}));
//# sourceMappingURL=VAvatar.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VAvatar/index.js


/* harmony default export */ var components_VAvatar = (VAvatar);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VList/VListTileAvatar.js
// Components

// Types

/* @vue/component */
/* harmony default export */ var VListTileAvatar = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'v-list-tile-avatar',
    functional: true,
    props: {
        color: String,
        size: {
            type: [Number, String],
            default: 40
        },
        tile: Boolean
    },
    render: function render(h, _ref) {
        var data = _ref.data,
            children = _ref.children,
            props = _ref.props;

        data.staticClass = ('v-list__tile__avatar ' + (data.staticClass || '')).trim();
        var avatar = h(components_VAvatar, {
            props: {
                color: props.color,
                size: props.size,
                tile: props.tile
            }
        }, [children]);
        return h('div', data, [avatar]);
    }
}));
//# sourceMappingURL=VListTileAvatar.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VList/index.js







var VListTileActionText = createSimpleFunctional('v-list__tile__action-text', 'span');
var VListTileContent = createSimpleFunctional('v-list__tile__content', 'div');
var VListTileTitle = createSimpleFunctional('v-list__tile__title', 'div');
var VListTileSubTitle = createSimpleFunctional('v-list__tile__sub-title', 'div');
/* harmony default export */ var components_VList = ({
    $_vuetify_subcomponents: {
        VList: VList,
        VListGroup: VListGroup,
        VListTile: VListTile,
        VListTileAction: VListTileAction,
        VListTileActionText: VListTileActionText,
        VListTileAvatar: VListTileAvatar,
        VListTileContent: VListTileContent,
        VListTileSubTitle: VListTileSubTitle,
        VListTileTitle: VListTileTitle
    }
});
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VSelect/VSelectList.js

// Components




// Mixins


// Helpers

/* @vue/component */
/* harmony default export */ var VSelectList = ({
    name: 'v-select-list',
    mixins: [colorable, themeable],
    props: {
        action: Boolean,
        dense: Boolean,
        hideSelected: Boolean,
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        itemAvatar: {
            type: [String, Array, Function],
            default: 'avatar'
        },
        itemDisabled: {
            type: [String, Array, Function],
            default: 'disabled'
        },
        itemText: {
            type: [String, Array, Function],
            default: 'text'
        },
        itemValue: {
            type: [String, Array, Function],
            default: 'value'
        },
        noDataText: String,
        noFilter: Boolean,
        searchInput: {
            default: null
        },
        selectedItems: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    computed: {
        parsedItems: function parsedItems() {
            var _this = this;

            return this.selectedItems.map(function (item) {
                return _this.getValue(item);
            });
        },
        tileActiveClass: function tileActiveClass() {
            return Object.keys(this.setTextColor(this.color).class || {}).join(' ');
        },
        staticNoDataTile: function staticNoDataTile() {
            var tile = {
                on: {
                    mousedown: function mousedown(e) {
                        return e.preventDefault();
                    } // Prevent onBlur from being called
                }
            };
            return this.$createElement(VListTile, tile, [this.genTileContent(this.noDataText)]);
        }
    },
    methods: {
        genAction: function genAction(item, inputValue) {
            var _this2 = this;

            var data = {
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        _this2.$emit('select', item);
                    }
                }
            };
            return this.$createElement(VListTileAction, data, [this.$createElement(components_VCheckbox, {
                props: {
                    color: this.color,
                    inputValue: inputValue
                }
            })]);
        },
        genDivider: function genDivider(props) {
            return this.$createElement(components_VDivider, { props: props });
        },
        genFilteredText: function genFilteredText(text) {
            text = (text || '').toString();
            if (!this.searchInput || this.noFilter) return escapeHTML(text);

            var _getMaskedCharacters = this.getMaskedCharacters(text),
                start = _getMaskedCharacters.start,
                middle = _getMaskedCharacters.middle,
                end = _getMaskedCharacters.end;

            return '' + escapeHTML(start) + this.genHighlight(middle) + escapeHTML(end);
        },
        genHeader: function genHeader(props) {
            return this.$createElement(components_VSubheader, { props: props }, props.header);
        },
        genHighlight: function genHighlight(text) {
            return '<span class="v-list__tile__mask">' + escapeHTML(text) + '</span>';
        },
        getMaskedCharacters: function getMaskedCharacters(text) {
            var searchInput = (this.searchInput || '').toString().toLocaleLowerCase();
            var index = text.toLocaleLowerCase().indexOf(searchInput);
            if (index < 0) return { start: '', middle: text, end: '' };
            var start = text.slice(0, index);
            var middle = text.slice(index, index + searchInput.length);
            var end = text.slice(index + searchInput.length);
            return { start: start, middle: middle, end: end };
        },
        genTile: function genTile(item) {
            var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var _this3 = this;

            var avatar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.hasItem(item);

            if (item === Object(item)) {
                avatar = this.getAvatar(item);
                disabled = disabled !== null ? disabled : this.getDisabled(item);
            }
            var tile = {
                on: {
                    mousedown: function mousedown(e) {
                        // Prevent onBlur from being called
                        e.preventDefault();
                    },
                    click: function click() {
                        return disabled || _this3.$emit('select', item);
                    }
                },
                props: {
                    activeClass: this.tileActiveClass,
                    avatar: avatar,
                    disabled: disabled,
                    ripple: true,
                    value: value
                }
            };
            if (!this.$scopedSlots.item) {
                return this.$createElement(VListTile, tile, [this.action && !this.hideSelected && this.items.length > 0 ? this.genAction(item, value) : null, this.genTileContent(item)]);
            }
            var parent = this;
            var scopedSlot = this.$scopedSlots.item({ parent: parent, item: item, tile: tile });
            return this.needsTile(scopedSlot) ? this.$createElement(VListTile, tile, scopedSlot) : scopedSlot;
        },
        genTileContent: function genTileContent(item) {
            var innerHTML = this.genFilteredText(this.getText(item));
            return this.$createElement(VListTileContent, [this.$createElement(VListTileTitle, {
                domProps: { innerHTML: innerHTML }
            })]);
        },
        hasItem: function hasItem(item) {
            return this.parsedItems.indexOf(this.getValue(item)) > -1;
        },
        needsTile: function needsTile(slot) {
            return slot.length !== 1 || slot[0].componentOptions == null || slot[0].componentOptions.Ctor.options.name !== 'v-list-tile';
        },
        getAvatar: function getAvatar(item) {
            return Boolean(getPropertyFromItem(item, this.itemAvatar, false));
        },
        getDisabled: function getDisabled(item) {
            return Boolean(getPropertyFromItem(item, this.itemDisabled, false));
        },
        getText: function getText(item) {
            return String(getPropertyFromItem(item, this.itemText, item));
        },
        getValue: function getValue(item) {
            return getPropertyFromItem(item, this.itemValue, this.getText(item));
        }
    },
    render: function render() {
        var children = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (this.hideSelected && this.hasItem(item)) continue;
                if (item == null) children.push(this.genTile(item));else if (item.header) children.push(this.genHeader(item));else if (item.divider) children.push(this.genDivider(item));else children.push(this.genTile(item));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile);
        this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item']);
        this.$slots['append-item'] && children.push(this.$slots['append-item']);
        return this.$createElement('div', {
            staticClass: 'v-select-list v-card',
            'class': this.themeClasses
        }, [this.$createElement(VList, {
            props: {
                dense: this.dense
            }
        }, children)]);
    }
});
//# sourceMappingURL=VSelectList.js.map
// EXTERNAL MODULE: /Users/nat/KBProIDE/node_modules/vuetify/src/stylus/components/_counters.styl
var _counters = __webpack_require__("bd04");

// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCounter/VCounter.js
var VCounter_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Mixins


/* @vue/component */
/* harmony default export */ var VCounter = (mixins(themeable).extend({
    name: 'v-counter',
    functional: true,
    props: {
        value: {
            type: [Number, String],
            default: ''
        },
        max: [Number, String]
    },
    render: function render(h, ctx) {
        var props = ctx.props;

        var max = parseInt(props.max, 10);
        var value = parseInt(props.value, 10);
        var content = max ? value + ' / ' + max : props.value;
        var isGreater = max && value > max;
        return h('div', {
            staticClass: 'v-counter',
            class: VCounter_extends({
                'error--text': isGreater
            }, functionalThemeClasses(ctx))
        }, content);
    }
}));
//# sourceMappingURL=VCounter.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCounter/index.js


/* harmony default export */ var components_VCounter = (VCounter);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/util/mask.js
var defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;
var isMaskDelimiter = function isMaskDelimiter(char) {
    return char ? defaultDelimiters.test(char) : false;
};
var allowedMasks = {
    '#': {
        test: function test(char) {
            return (/[0-9]/.test(char)
            );
        }
    },
    'A': {
        test: function test(char) {
            return (/[A-Z]/i.test(char)
            );
        },
        convert: function convert(char) {
            return char.toUpperCase();
        }
    },
    'a': {
        test: function test(char) {
            return (/[a-z]/i.test(char)
            );
        },
        convert: function convert(char) {
            return char.toLowerCase();
        }
    },
    'N': {
        test: function test(char) {
            return (/[0-9A-Z]/i.test(char)
            );
        },
        convert: function convert(char) {
            return char.toUpperCase();
        }
    },
    'n': {
        test: function test(char) {
            return (/[0-9a-z]/i.test(char)
            );
        },
        convert: function convert(char) {
            return char.toLowerCase();
        }
    },
    'X': {
        test: isMaskDelimiter
    }
};
var isMask = function isMask(char) {
    return allowedMasks.hasOwnProperty(char);
};
var convert = function convert(mask, char) {
    return allowedMasks[mask].convert ? allowedMasks[mask].convert(char) : char;
};
var maskValidates = function maskValidates(mask, char) {
    if (char == null || !isMask(mask)) return false;
    return allowedMasks[mask].test(char);
};
var mask_maskText = function maskText(text, masked, dontFillMaskBlanks) {
    if (text == null) return '';
    text = String(text);
    if (!masked.length || !text.length) return text;
    if (!Array.isArray(masked)) masked = masked.split('');
    var textIndex = 0;
    var maskIndex = 0;
    var newText = '';
    while (maskIndex < masked.length) {
        var mask = masked[maskIndex];
        // Assign the next character
        var char = text[textIndex];
        // Check if mask is delimiter
        // and current char matches
        if (!isMask(mask) && char === mask) {
            newText += mask;
            textIndex++;
            // Check if not mask
        } else if (!isMask(mask) && !dontFillMaskBlanks) {
            newText += mask;
            // Check if is mask and validates
        } else if (maskValidates(mask, char)) {
            newText += convert(mask, char);
            textIndex++;
        } else {
            return newText;
        }
        maskIndex++;
    }
    return newText;
};
var mask_unmaskText = function unmaskText(text) {
    return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text;
};
//# sourceMappingURL=mask.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/maskable.js
/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 */

/* @vue/component */
/* harmony default export */ var maskable = ({
    name: 'maskable',
    props: {
        dontFillMaskBlanks: Boolean,
        mask: {
            type: [Object, String],
            default: null
        },
        returnMaskedValue: Boolean,
        value: { required: false }
    },
    data: function data(vm) {
        return {
            selection: 0,
            lazySelection: 0,
            lazyValue: vm.value,
            preDefined: {
                'credit-card': '#### - #### - #### - ####',
                'date': '##/##/####',
                'date-with-time': '##/##/#### ##:##',
                'phone': '(###) ### - ####',
                'social': '###-##-####',
                'time': '##:##',
                'time-with-seconds': '##:##:##'
            }
        };
    },
    computed: {
        masked: function masked() {
            var preDefined = this.preDefined[this.mask];
            var mask = preDefined || this.mask || '';
            return mask.split('');
        }
    },
    watch: {
        /**
         * Make sure the cursor is in the correct
         * location when the mask changes
         */
        mask: function mask() {
            var _this = this;

            if (!this.$refs.input) return;
            var oldValue = this.$refs.input.value;
            var newValue = this.maskText(mask_unmaskText(this.lazyValue));
            var position = 0;
            var selection = this.selection;
            for (var index = 0; index < selection; index++) {
                isMaskDelimiter(oldValue[index]) || position++;
            }
            selection = 0;
            if (newValue) {
                for (var _index = 0; _index < newValue.length; _index++) {
                    isMaskDelimiter(newValue[_index]) || position--;
                    selection++;
                    if (position <= 0) break;
                }
            }
            this.$nextTick(function () {
                _this.$refs.input.value = newValue;
                _this.setCaretPosition(selection);
            });
        }
    },
    beforeMount: function beforeMount() {
        if (!this.mask || this.value == null || !this.returnMaskedValue) return;
        var value = this.maskText(this.value);
        // See if masked value does not
        // match the user given value
        if (value === this.value) return;
        this.$emit('input', value);
    },

    methods: {
        setCaretPosition: function setCaretPosition(selection) {
            var _this2 = this;

            this.selection = selection;
            window.setTimeout(function () {
                _this2.$refs.input && _this2.$refs.input.setSelectionRange(_this2.selection, _this2.selection);
            }, 0);
        },
        updateRange: function updateRange() {
            /* istanbul ignore next */
            if (!this.$refs.input) return;
            var newValue = this.maskText(this.lazyValue);
            var selection = 0;
            this.$refs.input.value = newValue;
            if (newValue) {
                for (var index = 0; index < newValue.length; index++) {
                    if (this.lazySelection <= 0) break;
                    isMaskDelimiter(newValue[index]) || this.lazySelection--;
                    selection++;
                }
            }
            this.setCaretPosition(selection);
            // this.$emit() must occur only when all internal values are correct
            this.$emit('input', this.returnMaskedValue ? this.$refs.input.value : this.lazyValue);
        },
        maskText: function maskText(text) {
            return this.mask ? mask_maskText(text, this.masked, this.dontFillMaskBlanks) : text;
        },
        unmaskText: function unmaskText(text) {
            return this.mask && !this.returnMaskedValue ? mask_unmaskText(text) : text;
        },

        // When the input changes and is
        // re-created, ensure that the
        // caret location is correct
        setSelectionRange: function setSelectionRange() {
            this.$nextTick(this.updateRange);
        },
        resetSelections: function resetSelections(input) {
            if (!input.selectionEnd) return;
            this.selection = input.selectionEnd;
            this.lazySelection = 0;
            for (var index = 0; index < this.selection; index++) {
                isMaskDelimiter(input.value[index]) || this.lazySelection++;
            }
        }
    }
});
//# sourceMappingURL=maskable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VProgressLinear/index.js


/* harmony default export */ var components_VProgressLinear = (VProgressLinear);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/loadable.js


/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */
/* @vue/component */
/* harmony default export */ var loadable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
    name: 'loadable',
    props: {
        loading: {
            type: [Boolean, String],
            default: false
        }
    },
    methods: {
        genProgress: function genProgress() {
            if (this.loading === false) return null;
            return this.$slots.progress || this.$createElement(components_VProgressLinear, {
                props: {
                    color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
                    height: 2,
                    indeterminate: true
                }
            });
        }
    }
}));
//# sourceMappingURL=loadable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VTextField/VTextField.js
var VTextField_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Extensions

// Components


// Mixins


// Directives

// Utilities


var dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
/* @vue/component */
/* harmony default export */ var VTextField = (components_VInput.extend({
    name: 'v-text-field',
    directives: { Ripple: directives_ripple },
    mixins: [maskable, loadable],
    inheritAttrs: false,
    props: {
        appendOuterIcon: String,
        /** @deprecated */
        appendOuterIconCb: Function,
        autofocus: Boolean,
        box: Boolean,
        browserAutocomplete: String,
        clearable: Boolean,
        clearIcon: {
            type: String,
            default: '$vuetify.icons.clear'
        },
        clearIconCb: Function,
        color: {
            type: String,
            default: 'primary'
        },
        counter: [Boolean, Number, String],
        flat: Boolean,
        fullWidth: Boolean,
        label: String,
        outline: Boolean,
        placeholder: String,
        prefix: String,
        prependInnerIcon: String,
        /** @deprecated */
        prependInnerIconCb: Function,
        reverse: Boolean,
        singleLine: Boolean,
        solo: Boolean,
        soloInverted: Boolean,
        suffix: String,
        type: {
            type: String,
            default: 'text'
        }
    },
    data: function data() {
        return {
            badInput: false,
            initialValue: null,
            internalChange: false,
            isClearing: false
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-text-field': true,
                'v-text-field--full-width': this.fullWidth,
                'v-text-field--prefix': this.prefix,
                'v-text-field--single-line': this.isSingle,
                'v-text-field--solo': this.isSolo,
                'v-text-field--solo-inverted': this.soloInverted,
                'v-text-field--solo-flat': this.flat,
                'v-text-field--box': this.box,
                'v-text-field--enclosed': this.isEnclosed,
                'v-text-field--reverse': this.reverse,
                'v-text-field--outline': this.hasOutline,
                'v-text-field--placeholder': this.placeholder
            };
        },
        counterValue: function counterValue() {
            return (this.internalValue || '').toString().length;
        },
        directivesInput: function directivesInput() {
            return [];
        },

        // TODO: Deprecate
        hasOutline: function hasOutline() {
            return this.outline || this.textarea;
        },

        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                if (this.mask) {
                    this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)));
                    this.setSelectionRange();
                } else {
                    this.lazyValue = val;
                    this.$emit('input', this.lazyValue);
                }
            }
        },
        isDirty: function isDirty() {
            return this.lazyValue != null && this.lazyValue.toString().length > 0 || this.badInput;
        },
        isEnclosed: function isEnclosed() {
            return this.box || this.isSolo || this.hasOutline || this.fullWidth;
        },
        isLabelActive: function isLabelActive() {
            return this.isDirty || dirtyTypes.includes(this.type);
        },
        isSingle: function isSingle() {
            return this.isSolo || this.singleLine;
        },
        isSolo: function isSolo() {
            return this.solo || this.soloInverted;
        },
        labelPosition: function labelPosition() {
            var offset = this.prefix && !this.labelValue ? this.prefixWidth : 0;
            return !this.$vuetify.rtl !== !this.reverse ? {
                left: 'auto',
                right: offset
            } : {
                left: offset,
                right: 'auto'
            };
        },
        showLabel: function showLabel() {
            return this.hasLabel && (!this.isSingle || !this.isLabelActive && !this.placeholder && !this.prefixLabel);
        },
        labelValue: function labelValue() {
            return !this.isSingle && Boolean(this.isFocused || this.isLabelActive || this.placeholder || this.prefixLabel);
        },
        prefixWidth: function prefixWidth() {
            if (!this.prefix && !this.$refs.prefix) return;
            return this.$refs.prefix.offsetWidth;
        },
        prefixLabel: function prefixLabel() {
            return this.prefix && !this.value;
        }
    },
    watch: {
        isFocused: function isFocused(val) {
            // Sets validationState from validatable
            this.hasColor = val;
            if (val) {
                this.initialValue = this.lazyValue;
            } else if (this.initialValue !== this.lazyValue) {
                this.$emit('change', this.lazyValue);
            }
        },
        value: function value(val) {
            var _this = this;

            if (this.mask && !this.internalChange) {
                var masked = this.maskText(this.unmaskText(val));
                this.lazyValue = this.unmaskText(masked);
                // Emit when the externally set value was modified internally
                String(val) !== this.lazyValue && this.$nextTick(function () {
                    _this.$refs.input.value = masked;
                    _this.$emit('input', _this.lazyValue);
                });
            } else this.lazyValue = val;
        }
    },
    mounted: function mounted() {
        this.autofocus && this.onFocus();
    },

    methods: {
        /** @public */
        focus: function focus() {
            this.onFocus();
        },

        /** @public */
        blur: function blur() {
            this.$refs.input ? this.$refs.input.blur() : this.onBlur();
        },
        clearableCallback: function clearableCallback() {
            var _this2 = this;

            this.internalValue = null;
            this.$nextTick(function () {
                return _this2.$refs.input.focus();
            });
        },
        genAppendSlot: function genAppendSlot() {
            var slot = [];
            if (this.$slots['append-outer']) {
                slot.push(this.$slots['append-outer']);
            } else if (this.appendOuterIcon) {
                slot.push(this.genIcon('appendOuter'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        genPrependInnerSlot: function genPrependInnerSlot() {
            var slot = [];
            if (this.$slots['prepend-inner']) {
                slot.push(this.$slots['prepend-inner']);
            } else if (this.prependInnerIcon) {
                slot.push(this.genIcon('prependInner'));
            }
            return this.genSlot('prepend', 'inner', slot);
        },
        genIconSlot: function genIconSlot() {
            var slot = [];
            if (this.$slots['append']) {
                slot.push(this.$slots['append']);
            } else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'inner', slot);
        },
        genInputSlot: function genInputSlot() {
            var input = components_VInput.options.methods.genInputSlot.call(this);
            var prepend = this.genPrependInnerSlot();
            prepend && input.children.unshift(prepend);
            return input;
        },
        genClearIcon: function genClearIcon() {
            if (!this.clearable) return null;
            var icon = !this.isDirty ? false : 'clear';
            if (this.clearIconCb) deprecate(':clear-icon-cb', '@click:clear', this);
            return this.genSlot('append', 'inner', [this.genIcon(icon, !this.$listeners['click:clear'] && this.clearIconCb || this.clearableCallback, false)]);
        },
        genCounter: function genCounter() {
            if (this.counter === false || this.counter == null) return null;
            var max = this.counter === true ? this.$attrs.maxlength : this.counter;
            return this.$createElement(components_VCounter, {
                props: {
                    dark: this.dark,
                    light: this.light,
                    max: max,
                    value: this.counterValue
                }
            });
        },
        genDefaultSlot: function genDefaultSlot() {
            return [this.genTextFieldSlot(), this.genClearIcon(), this.genIconSlot(), this.genProgress()];
        },
        genLabel: function genLabel() {
            if (!this.showLabel) return null;
            var data = {
                props: {
                    absolute: true,
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    focused: !this.isSingle && (this.isFocused || !!this.validationState),
                    left: this.labelPosition.left,
                    light: this.light,
                    right: this.labelPosition.right,
                    value: this.labelValue
                }
            };
            if (this.$attrs.id) data.props.for = this.$attrs.id;
            return this.$createElement(components_VLabel, data, this.$slots.label || this.label);
        },
        genInput: function genInput() {
            var listeners = Object.assign({}, this.$listeners);
            delete listeners['change']; // Change should not be bound externally
            var data = {
                style: {},
                domProps: {
                    value: this.maskText(this.lazyValue)
                },
                attrs: VTextField_extends({
                    'aria-label': (!this.$attrs || !this.$attrs.id) && this.label
                }, this.$attrs, {
                    autofocus: this.autofocus,
                    disabled: this.disabled,
                    readonly: this.readonly,
                    type: this.type
                }),
                on: Object.assign(listeners, {
                    blur: this.onBlur,
                    input: this.onInput,
                    focus: this.onFocus,
                    keydown: this.onKeyDown
                }),
                ref: 'input'
            };
            if (this.placeholder) data.attrs.placeholder = this.placeholder;
            if (this.mask) data.attrs.maxlength = this.masked.length;
            if (this.browserAutocomplete) data.attrs.autocomplete = this.browserAutocomplete;
            return this.$createElement('input', data);
        },
        genMessages: function genMessages() {
            if (this.hideDetails) return null;
            return this.$createElement('div', {
                staticClass: 'v-text-field__details'
            }, [components_VInput.options.methods.genMessages.call(this), this.genCounter()]);
        },
        genTextFieldSlot: function genTextFieldSlot() {
            return this.$createElement('div', {
                staticClass: 'v-text-field__slot'
            }, [this.genLabel(), this.prefix ? this.genAffix('prefix') : null, this.genInput(), this.suffix ? this.genAffix('suffix') : null]);
        },
        genAffix: function genAffix(type) {
            return this.$createElement('div', {
                'class': 'v-text-field__' + type,
                ref: type
            }, this[type]);
        },
        onBlur: function onBlur(e) {
            this.isFocused = false;
            // Reset internalChange state
            // to allow external change
            // to persist
            this.internalChange = false;
            this.$emit('blur', e);
        },
        onClick: function onClick() {
            if (this.isFocused || this.disabled) return;
            this.$refs.input.focus();
        },
        onFocus: function onFocus(e) {
            if (!this.$refs.input) return;
            if (document.activeElement !== this.$refs.input) {
                return this.$refs.input.focus();
            }
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus', e);
            }
        },
        onInput: function onInput(e) {
            this.internalChange = true;
            this.mask && this.resetSelections(e.target);
            this.internalValue = e.target.value;
            this.badInput = e.target.validity && e.target.validity.badInput;
        },
        onKeyDown: function onKeyDown(e) {
            this.internalChange = true;
            if (e.keyCode === keyCodes.enter) this.$emit('change', this.internalValue);
            this.$emit('keydown', e);
        },
        onMouseDown: function onMouseDown(e) {
            // Prevent input from being blurred
            if (e.target !== this.$refs.input) {
                e.preventDefault();
                e.stopPropagation();
            }
            components_VInput.options.methods.onMouseDown.call(this, e);
        },
        onMouseUp: function onMouseUp(e) {
            if (this.hasMouseDown) this.focus();
            components_VInput.options.methods.onMouseUp.call(this, e);
        }
    }
}));
//# sourceMappingURL=VTextField.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/mixins/filterable.js

/* @vue/component */
/* harmony default export */ var filterable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'filterable',
    props: {
        noDataText: {
            type: String,
            default: '$vuetify.noDataText'
        }
    }
}));
//# sourceMappingURL=filterable.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VSelect/VSelect.js
var VSelect_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function VSelect_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Styles


// Components



// Extensions

// Mixins


// Directives

// Helpers


var defaultMenuProps = {
    closeOnClick: false,
    closeOnContentClick: false,
    openOnClick: false,
    maxHeight: 300
};
/* @vue/component */
/* harmony default export */ var VSelect = (VTextField.extend({
    name: 'v-select',
    directives: {
        ClickOutside: click_outside
    },
    mixins: [comparable, filterable],
    props: {
        appendIcon: {
            type: String,
            default: '$vuetify.icons.dropdown'
        },
        appendIconCb: Function,
        attach: {
            type: null,
            default: false
        },
        browserAutocomplete: {
            type: String,
            default: 'on'
        },
        cacheItems: Boolean,
        chips: Boolean,
        clearable: Boolean,
        deletableChips: Boolean,
        dense: Boolean,
        hideSelected: Boolean,
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        itemAvatar: {
            type: [String, Array, Function],
            default: 'avatar'
        },
        itemDisabled: {
            type: [String, Array, Function],
            default: 'disabled'
        },
        itemText: {
            type: [String, Array, Function],
            default: 'text'
        },
        itemValue: {
            type: [String, Array, Function],
            default: 'value'
        },
        menuProps: {
            type: [String, Array, Object],
            default: function _default() {
                return defaultMenuProps;
            }
        },
        multiple: Boolean,
        openOnClear: Boolean,
        returnObject: Boolean,
        searchInput: {
            default: null
        },
        smallChips: Boolean
    },
    data: function data(vm) {
        return {
            attrsInput: { role: 'combobox' },
            cachedItems: vm.cacheItems ? vm.items : [],
            content: null,
            isBooted: false,
            isMenuActive: false,
            lastItem: 20,
            // As long as a value is defined, show it
            // Otherwise, check if multiple
            // to determine which default to provide
            lazyValue: vm.value !== undefined ? vm.value : vm.multiple ? [] : undefined,
            selectedIndex: -1,
            selectedItems: [],
            keyboardLookupPrefix: '',
            keyboardLookupLastTime: 0
        };
    },
    computed: {
        /* All items that the select has */
        allItems: function allItems() {
            return this.filterDuplicates(this.cachedItems.concat(this.items));
        },
        classes: function classes() {
            return Object.assign({}, VTextField.options.computed.classes.call(this), {
                'v-select': true,
                'v-select--chips': this.hasChips,
                'v-select--chips--small': this.smallChips,
                'v-select--is-menu-active': this.isMenuActive
            });
        },

        /* Used by other components to overwrite */
        computedItems: function computedItems() {
            return this.allItems;
        },
        counterValue: function counterValue() {
            return this.multiple ? this.selectedItems.length : (this.getText(this.selectedItems[0]) || '').toString().length;
        },
        directives: function directives() {
            return this.isFocused ? [{
                name: 'click-outside',
                value: this.blur,
                args: {
                    closeConditional: this.closeConditional
                }
            }] : undefined;
        },
        dynamicHeight: function dynamicHeight() {
            return 'auto';
        },
        hasChips: function hasChips() {
            return this.chips || this.smallChips;
        },
        hasSlot: function hasSlot() {
            return Boolean(this.hasChips || this.$scopedSlots.selection);
        },
        isDirty: function isDirty() {
            return this.selectedItems.length > 0;
        },
        listData: function listData() {
            var scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
            return {
                attrs: scopeId ? VSelect_defineProperty({}, scopeId, true) : null,
                props: {
                    action: this.multiple && !this.isHidingSelected,
                    color: this.color,
                    dense: this.dense,
                    hideSelected: this.hideSelected,
                    items: this.virtualizedItems,
                    noDataText: this.$vuetify.t(this.noDataText),
                    selectedItems: this.selectedItems,
                    itemAvatar: this.itemAvatar,
                    itemDisabled: this.itemDisabled,
                    itemValue: this.itemValue,
                    itemText: this.itemText
                },
                on: {
                    select: this.selectItem
                },
                scopedSlots: {
                    item: this.$scopedSlots.item
                }
            };
        },
        staticList: function staticList() {
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                consoleError('assert: staticList should not be called if slots are used');
            }
            return this.$createElement(VSelectList, this.listData);
        },
        virtualizedItems: function virtualizedItems() {
            return this.$_menuProps.auto ? this.computedItems : this.computedItems.slice(0, this.lastItem);
        },
        menuCanShow: function menuCanShow() {
            return true;
        },
        $_menuProps: function $_menuProps() {
            var normalisedProps = void 0;
            normalisedProps = typeof this.menuProps === 'string' ? this.menuProps.split(',') : this.menuProps;
            if (Array.isArray(normalisedProps)) {
                normalisedProps = normalisedProps.reduce(function (acc, p) {
                    acc[p.trim()] = true;
                    return acc;
                }, {});
            }
            return VSelect_extends({}, defaultMenuProps, {
                value: this.menuCanShow && this.isMenuActive,
                nudgeBottom: this.nudgeBottom ? this.nudgeBottom : normalisedProps.offsetY ? 1 : 0
            }, normalisedProps);
        }
    },
    watch: {
        internalValue: function internalValue(val) {
            this.initialValue = val;
            this.setSelectedItems();
        },
        isBooted: function isBooted() {
            var _this = this;

            this.$nextTick(function () {
                if (_this.content && _this.content.addEventListener) {
                    _this.content.addEventListener('scroll', _this.onScroll, false);
                }
            });
        },
        isMenuActive: function isMenuActive(val) {
            if (!val) return;
            this.isBooted = true;
        },

        items: {
            immediate: true,
            handler: function handler(val) {
                if (this.cacheItems) {
                    this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
                }
                this.setSelectedItems();
            }
        }
    },
    mounted: function mounted() {
        this.content = this.$refs.menu && this.$refs.menu.$refs.content;
    },

    methods: {
        /** @public */
        blur: function blur(e) {
            this.isMenuActive = false;
            this.isFocused = false;
            this.$refs.input && this.$refs.input.blur();
            this.selectedIndex = -1;
            this.onBlur(e);
        },

        /** @public */
        activateMenu: function activateMenu() {
            this.isMenuActive = true;
        },
        clearableCallback: function clearableCallback() {
            var _this2 = this;

            this.setValue(this.multiple ? [] : undefined);
            this.$nextTick(function () {
                return _this2.$refs.input.focus();
            });
            if (this.openOnClear) this.isMenuActive = true;
        },
        closeConditional: function closeConditional(e) {
            return (
                // Click originates from outside the menu content
                !!this.content && !this.content.contains(e.target) &&
                // Click originates from outside the element
                !!this.$el && !this.$el.contains(e.target) && e.target !== this.$el
            );
        },
        filterDuplicates: function filterDuplicates(arr) {
            var uniqueValues = new Map();
            for (var index = 0; index < arr.length; ++index) {
                var item = arr[index];
                var val = this.getValue(item);
                // TODO: comparator
                !uniqueValues.has(val) && uniqueValues.set(val, item);
            }
            return Array.from(uniqueValues.values());
        },
        findExistingIndex: function findExistingIndex(item) {
            var _this3 = this;

            var itemValue = this.getValue(item);
            return (this.internalValue || []).findIndex(function (i) {
                return _this3.valueComparator(_this3.getValue(i), itemValue);
            });
        },
        genChipSelection: function genChipSelection(item, index) {
            var _this4 = this;

            var isDisabled = this.disabled || this.readonly || this.getDisabled(item);
            return this.$createElement(components_VChip, {
                staticClass: 'v-chip--select-multi',
                attrs: { tabindex: -1 },
                props: {
                    close: this.deletableChips && !isDisabled,
                    disabled: isDisabled,
                    selected: index === this.selectedIndex,
                    small: this.smallChips
                },
                on: {
                    click: function click(e) {
                        if (isDisabled) return;
                        e.stopPropagation();
                        _this4.selectedIndex = index;
                    },
                    input: function input() {
                        return _this4.onChipInput(item);
                    }
                },
                key: this.getValue(item)
            }, this.getText(item));
        },
        genCommaSelection: function genCommaSelection(item, index, last) {
            // Item may be an object
            // TODO: Remove JSON.stringify
            var key = JSON.stringify(this.getValue(item));
            var color = index === this.selectedIndex && this.color;
            var isDisabled = this.disabled || this.getDisabled(item);
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-select__selection v-select__selection--comma',
                'class': {
                    'v-select__selection--disabled': isDisabled
                },
                key: key
            }), '' + this.getText(item) + (last ? '' : ', '));
        },
        genDefaultSlot: function genDefaultSlot() {
            var selections = this.genSelections();
            var input = this.genInput();
            // If the return is an empty array
            // push the input
            if (Array.isArray(selections)) {
                selections.push(input);
                // Otherwise push it into children
            } else {
                selections.children = selections.children || [];
                selections.children.push(input);
            }
            return [this.$createElement('div', {
                staticClass: 'v-select__slot',
                directives: this.directives
            }, [this.genLabel(), this.prefix ? this.genAffix('prefix') : null, selections, this.suffix ? this.genAffix('suffix') : null, this.genClearIcon(), this.genIconSlot()]), this.genMenu(), this.genProgress()];
        },
        genInput: function genInput() {
            var input = VTextField.options.methods.genInput.call(this);
            input.data.domProps.value = null;
            input.data.attrs.readonly = true;
            input.data.attrs['aria-readonly'] = String(this.readonly);
            input.data.on.keypress = this.onKeyPress;
            return input;
        },
        genList: function genList() {
            // If there's no slots, we can use a cached VNode to improve performance
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                return this.genListWithSlot();
            } else {
                return this.staticList;
            }
        },
        genListWithSlot: function genListWithSlot() {
            var _this5 = this;

            var slots = ['prepend-item', 'no-data', 'append-item'].filter(function (slotName) {
                return _this5.$slots[slotName];
            }).map(function (slotName) {
                return _this5.$createElement('template', {
                    slot: slotName
                }, _this5.$slots[slotName]);
            });
            // Requires destructuring due to Vue
            // modifying the `on` property when passed
            // as a referenced object
            return this.$createElement(VSelectList, VSelect_extends({}, this.listData), slots);
        },
        genMenu: function genMenu() {
            var _this6 = this;

            var props = this.$_menuProps;
            props.activator = this.$refs['input-slot'];
            // Deprecate using menu props directly
            // TODO: remove (2.0)
            var inheritedProps = Object.keys(components_VMenu.options.props);
            var deprecatedProps = Object.keys(this.$attrs).reduce(function (acc, attr) {
                if (inheritedProps.includes(camelize(attr))) acc.push(attr);
                return acc;
            }, []);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = deprecatedProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;

                    props[camelize(prop)] = this.$attrs[prop];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (false) { var onlyBools, separator, _props, replacement, multiple; }
            // Attach to root el so that
            // menu covers prepend/append icons
            if (
            // TODO: make this a computed property or helper or something
            this.attach === '' || // If used as a boolean prop (<v-menu attach>)
            this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
            this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
            ) {
                    props.attach = this.$el;
                } else {
                props.attach = this.attach;
            }
            return this.$createElement(components_VMenu, {
                props: props,
                on: {
                    input: function input(val) {
                        _this6.isMenuActive = val;
                        _this6.isFocused = val;
                    }
                },
                ref: 'menu'
            }, [this.genList()]);
        },
        genSelections: function genSelections() {
            var length = this.selectedItems.length;
            var children = new Array(length);
            var genSelection = void 0;
            if (this.$scopedSlots.selection) {
                genSelection = this.genSlotSelection;
            } else if (this.hasChips) {
                genSelection = this.genChipSelection;
            } else {
                genSelection = this.genCommaSelection;
            }
            while (length--) {
                children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1);
            }
            return this.$createElement('div', {
                staticClass: 'v-select__selections'
            }, children);
        },
        genSlotSelection: function genSlotSelection(item, index) {
            return this.$scopedSlots.selection({
                parent: this,
                item: item,
                index: index,
                selected: index === this.selectedIndex,
                disabled: this.disabled || this.readonly
            });
        },
        getMenuIndex: function getMenuIndex() {
            return this.$refs.menu ? this.$refs.menu.listIndex : -1;
        },
        getDisabled: function getDisabled(item) {
            return getPropertyFromItem(item, this.itemDisabled, false);
        },
        getText: function getText(item) {
            return getPropertyFromItem(item, this.itemText, item);
        },
        getValue: function getValue(item) {
            return getPropertyFromItem(item, this.itemValue, this.getText(item));
        },
        onBlur: function onBlur(e) {
            this.$emit('blur', e);
        },
        onChipInput: function onChipInput(item) {
            if (this.multiple) this.selectItem(item);else this.setValue(null);
            // If all items have been deleted,
            // open `v-menu`
            if (this.selectedItems.length === 0) {
                this.isMenuActive = true;
            }
            this.selectedIndex = -1;
        },
        onClick: function onClick() {
            if (this.isDisabled) return;
            this.isMenuActive = true;
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus');
            }
        },
        onEnterDown: function onEnterDown() {
            this.onBlur();
        },
        onEscDown: function onEscDown(e) {
            e.preventDefault();
            if (this.isMenuActive) {
                e.stopPropagation();
                this.isMenuActive = false;
            }
        },
        onKeyPress: function onKeyPress(e) {
            var _this7 = this;

            if (this.multiple) return;
            var KEYBOARD_LOOKUP_THRESHOLD = 1000; // milliseconds
            var now = performance.now();
            if (now - this.keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
                this.keyboardLookupPrefix = '';
            }
            this.keyboardLookupPrefix += e.key.toLowerCase();
            this.keyboardLookupLastTime = now;
            var item = this.allItems.find(function (item) {
                return _this7.getText(item).toLowerCase().startsWith(_this7.keyboardLookupPrefix);
            });
            if (item !== undefined) {
                this.setValue(this.returnObject ? item : this.getValue(item));
            }
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            // If enter, space, up, or down is pressed, open menu
            if (!this.readonly && !this.isMenuActive && [keyCodes.enter, keyCodes.space, keyCodes.up, keyCodes.down].includes(keyCode)) this.activateMenu();
            if (this.isMenuActive && this.$refs.menu) this.$refs.menu.changeListIndex(e);
            // This should do something different
            if (keyCode === keyCodes.enter) return this.onEnterDown(e);
            // If escape deactivate the menu
            if (keyCode === keyCodes.esc) return this.onEscDown(e);
            // If tab - select item or close menu
            if (keyCode === keyCodes.tab) return this.onTabDown(e);
        },
        onMouseUp: function onMouseUp(e) {
            var _this8 = this;

            if (this.hasMouseDown) {
                var appendInner = this.$refs['append-inner'];
                // If append inner is present
                // and the target is itself
                // or inside, toggle menu
                if (this.isMenuActive && appendInner && (appendInner === e.target || appendInner.contains(e.target))) {
                    this.$nextTick(function () {
                        return _this8.isMenuActive = !_this8.isMenuActive;
                    });
                    // If user is clicking in the container
                    // and field is enclosed, activate it
                } else if (this.isEnclosed && !this.isDisabled) {
                    this.isMenuActive = true;
                }
            }
            VTextField.options.methods.onMouseUp.call(this, e);
        },
        onScroll: function onScroll() {
            var _this9 = this;

            if (!this.isMenuActive) {
                requestAnimationFrame(function () {
                    return _this9.content.scrollTop = 0;
                });
            } else {
                if (this.lastItem >= this.computedItems.length) return;
                var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;
                if (showMoreItems) {
                    this.lastItem += 20;
                }
            }
        },
        onTabDown: function onTabDown(e) {
            var menuIndex = this.getMenuIndex();
            var listTile = this.$refs.menu.tiles[menuIndex];
            // An item that is selected by
            // menu-index should toggled
            if (listTile && listTile.className.indexOf('v-list__tile--highlighted') > -1 && this.isMenuActive && menuIndex > -1) {
                e.preventDefault();
                e.stopPropagation();
                listTile.click();
            } else {
                // If we make it here,
                // the user has no selected indexes
                // and is probably tabbing out
                this.blur(e);
            }
        },
        selectItem: function selectItem(item) {
            var _this10 = this;

            if (!this.multiple) {
                this.setValue(this.returnObject ? item : this.getValue(item));
                this.isMenuActive = false;
            } else {
                var internalValue = (this.internalValue || []).slice();
                var i = this.findExistingIndex(item);
                i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item);
                this.setValue(internalValue.map(function (i) {
                    return _this10.returnObject ? i : _this10.getValue(i);
                }));
                // When selecting multiple
                // adjust menu after each
                // selection
                this.$nextTick(function () {
                    _this10.$refs.menu && _this10.$refs.menu.updateDimensions();
                });
            }
        },
        setMenuIndex: function setMenuIndex(index) {
            this.$refs.menu && (this.$refs.menu.listIndex = index);
        },
        setSelectedItems: function setSelectedItems() {
            var _this11 = this;

            var selectedItems = [];
            var values = !this.multiple || !Array.isArray(this.internalValue) ? [this.internalValue] : this.internalValue;

            var _loop = function _loop(value) {
                var index = _this11.allItems.findIndex(function (v) {
                    return _this11.valueComparator(_this11.getValue(v), _this11.getValue(value));
                });
                if (index > -1) {
                    selectedItems.push(_this11.allItems[index]);
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    _loop(value);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.selectedItems = selectedItems;
        },
        setValue: function setValue(value) {
            var oldValue = this.internalValue;
            this.internalValue = value;
            value !== oldValue && this.$emit('change', value);
        }
    }
}));
//# sourceMappingURL=VSelect.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VAutocomplete/VAutocomplete.js
var VAutocomplete_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles

// Extensions


// Utils

var VAutocomplete_defaultMenuProps = VAutocomplete_extends({}, defaultMenuProps, {
    offsetY: true,
    offsetOverflow: true,
    transition: false
});
/* @vue/component */
/* harmony default export */ var VAutocomplete = (VSelect.extend({
    name: 'v-autocomplete',
    props: {
        allowOverflow: {
            type: Boolean,
            default: true
        },
        browserAutocomplete: {
            type: String,
            default: 'off'
        },
        filter: {
            type: Function,
            default: function _default(item, queryText, itemText) {
                return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1;
            }
        },
        hideNoData: Boolean,
        noFilter: Boolean,
        searchInput: {
            default: undefined
        },
        menuProps: {
            type: VSelect.options.props.menuProps.type,
            default: function _default() {
                return VAutocomplete_defaultMenuProps;
            }
        },
        autoSelectFirst: {
            type: Boolean,
            default: false
        }
    },
    data: function data(vm) {
        return {
            attrsInput: null,
            lazySearch: vm.searchInput
        };
    },
    computed: {
        classes: function classes() {
            return Object.assign({}, VSelect.options.computed.classes.call(this), {
                'v-autocomplete': true,
                'v-autocomplete--is-selecting-index': this.selectedIndex > -1
            });
        },
        computedItems: function computedItems() {
            return this.filteredItems;
        },
        selectedValues: function selectedValues() {
            var _this = this;

            return this.selectedItems.map(function (item) {
                return _this.getValue(item);
            });
        },
        hasDisplayedItems: function hasDisplayedItems() {
            var _this2 = this;

            return this.hideSelected ? this.filteredItems.some(function (item) {
                return !_this2.hasItem(item);
            }) : this.filteredItems.length > 0;
        },

        /**
         * The range of the current input text
         *
         * @return {Number}
         */
        currentRange: function currentRange() {
            if (this.selectedItem == null) return 0;
            return this.getText(this.selectedItem).toString().length;
        },
        filteredItems: function filteredItems() {
            var _this3 = this;

            if (!this.isSearching || this.noFilter || this.internalSearch == null) return this.allItems;
            return this.allItems.filter(function (item) {
                return _this3.filter(item, _this3.internalSearch.toString(), _this3.getText(item).toString());
            });
        },

        internalSearch: {
            get: function get() {
                return this.lazySearch;
            },
            set: function set(val) {
                this.lazySearch = val;
                this.$emit('update:searchInput', val);
            }
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return false;
        },
        isDirty: function isDirty() {
            return this.searchIsDirty || this.selectedItems.length > 0;
        },
        isSearching: function isSearching() {
            if (this.multiple) return this.searchIsDirty;
            return this.searchIsDirty && this.internalSearch !== this.getText(this.selectedItem);
        },
        menuCanShow: function menuCanShow() {
            if (!this.isFocused) return false;
            return this.hasDisplayedItems || !this.hideNoData;
        },
        $_menuProps: function $_menuProps() {
            var props = VSelect.options.computed.$_menuProps.call(this);
            props.contentClass = ('v-autocomplete__content ' + (props.contentClass || '')).trim();
            return VAutocomplete_extends({}, VAutocomplete_defaultMenuProps, props);
        },
        searchIsDirty: function searchIsDirty() {
            return this.internalSearch != null && this.internalSearch !== '';
        },
        selectedItem: function selectedItem() {
            var _this4 = this;

            if (this.multiple) return null;
            return this.selectedItems.find(function (i) {
                return _this4.valueComparator(_this4.getValue(i), _this4.getValue(_this4.internalValue));
            });
        },
        listData: function listData() {
            var data = VSelect.options.computed.listData.call(this);
            Object.assign(data.props, {
                items: this.virtualizedItems,
                noFilter: this.noFilter || !this.isSearching || !this.filteredItems.length,
                searchInput: this.internalSearch
            });
            return data;
        }
    },
    watch: {
        filteredItems: function filteredItems(val) {
            this.onFilteredItemsChanged(val);
        },
        internalValue: function internalValue() {
            this.setSearch();
        },
        isFocused: function isFocused(val) {
            if (val) {
                this.$refs.input && this.$refs.input.select();
            } else {
                this.updateSelf();
            }
        },
        isMenuActive: function isMenuActive(val) {
            if (val || !this.hasSlot) return;
            this.lazySearch = null;
        },
        items: function items(val, oldVal) {
            // If we are focused, the menu
            // is not active, hide no data is enabled,
            // and items change
            // User is probably async loading
            // items, try to activate the menu
            if (!(oldVal && oldVal.length) && this.hideNoData && this.isFocused && !this.isMenuActive && val.length) this.activateMenu();
        },
        searchInput: function searchInput(val) {
            this.lazySearch = val;
        },
        internalSearch: function internalSearch(val) {
            this.onInternalSearchChanged(val);
        },
        itemText: function itemText() {
            this.updateSelf();
        }
    },
    created: function created() {
        this.setSearch();
    },

    methods: {
        onFilteredItemsChanged: function onFilteredItemsChanged(val) {
            var _this5 = this;

            this.setMenuIndex(-1);
            this.$nextTick(function () {
                _this5.setMenuIndex(val.length > 0 && (val.length === 1 || _this5.autoSelectFirst) ? 0 : -1);
            });
        },
        onInternalSearchChanged: function onInternalSearchChanged(val) {
            this.updateMenuDimensions();
        },
        updateMenuDimensions: function updateMenuDimensions() {
            if (this.isMenuActive && this.$refs.menu) {
                this.$refs.menu.updateDimensions();
            }
        },
        changeSelectedIndex: function changeSelectedIndex(keyCode) {
            // Do not allow changing of selectedIndex
            // when search is dirty
            if (this.searchIsDirty) return;
            if (![keyCodes.backspace, keyCodes.left, keyCodes.right, keyCodes.delete].includes(keyCode)) return;
            var indexes = this.selectedItems.length - 1;
            if (keyCode === keyCodes.left) {
                this.selectedIndex = this.selectedIndex === -1 ? indexes : this.selectedIndex - 1;
            } else if (keyCode === keyCodes.right) {
                this.selectedIndex = this.selectedIndex >= indexes ? -1 : this.selectedIndex + 1;
            } else if (this.selectedIndex === -1) {
                this.selectedIndex = indexes;
                return;
            }
            var currentItem = this.selectedItems[this.selectedIndex];
            if ([keyCodes.backspace, keyCodes.delete].includes(keyCode) && !this.getDisabled(currentItem)) {
                var newIndex = this.selectedIndex === indexes ? this.selectedIndex - 1 : this.selectedItems[this.selectedIndex + 1] ? this.selectedIndex : -1;
                if (newIndex === -1) {
                    this.setValue(this.multiple ? [] : undefined);
                } else {
                    this.selectItem(currentItem);
                }
                this.selectedIndex = newIndex;
            }
        },
        clearableCallback: function clearableCallback() {
            this.internalSearch = undefined;
            VSelect.options.methods.clearableCallback.call(this);
        },
        genInput: function genInput() {
            var input = VTextField.options.methods.genInput.call(this);
            input.data.attrs.role = 'combobox';
            input.data.domProps.value = this.internalSearch;
            return input;
        },
        genSelections: function genSelections() {
            return this.hasSlot || this.multiple ? VSelect.options.methods.genSelections.call(this) : [];
        },
        onClick: function onClick() {
            if (this.isDisabled) return;
            this.selectedIndex > -1 ? this.selectedIndex = -1 : this.onFocus();
            this.activateMenu();
        },
        onEnterDown: function onEnterDown() {
            // Avoid invoking this method
            // will cause updateSelf to
            // be called emptying search
        },
        onInput: function onInput(e) {
            if (this.selectedIndex > -1) return;
            // If typing and menu is not currently active
            if (e.target.value) {
                this.activateMenu();
                if (!this.isAnyValueAllowed) this.setMenuIndex(0);
            }
            this.mask && this.resetSelections(e.target);
            this.internalSearch = e.target.value;
            this.badInput = e.target.validity && e.target.validity.badInput;
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            VSelect.options.methods.onKeyDown.call(this, e);
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown: function onTabDown(e) {
            VSelect.options.methods.onTabDown.call(this, e);
            this.updateSelf();
        },
        setSelectedItems: function setSelectedItems() {
            VSelect.options.methods.setSelectedItems.call(this);
            // #4273 Don't replace if searching
            // #4403 Don't replace if focused
            if (!this.isFocused) this.setSearch();
        },
        setSearch: function setSearch() {
            var _this6 = this;

            // Wait for nextTick so selectedItem
            // has had time to update
            this.$nextTick(function () {
                _this6.internalSearch = _this6.multiple && _this6.internalSearch && _this6.isMenuActive ? _this6.internalSearch : !_this6.selectedItems.length || _this6.multiple || _this6.hasSlot ? null : _this6.getText(_this6.selectedItem);
            });
        },
        updateSelf: function updateSelf() {
            this.updateAutocomplete();
        },
        updateAutocomplete: function updateAutocomplete() {
            if (!this.searchIsDirty && !this.internalValue) return;
            if (!this.valueComparator(this.internalSearch, this.getValue(this.internalValue))) {
                this.setSearch();
            }
        },
        hasItem: function hasItem(item) {
            return this.selectedValues.indexOf(this.getValue(item)) > -1;
        }
    }
}));
//# sourceMappingURL=VAutocomplete.js.map
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/vuetify/lib/components/VCombobox/VCombobox.js
// Styles

// Extensions


// Utils

/* @vue/component */
/* harmony default export */ var VCombobox = ({
    name: 'v-combobox',
    extends: VAutocomplete,
    props: {
        delimiters: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        returnObject: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            editingIndex: -1
        };
    },
    computed: {
        counterValue: function counterValue() {
            return this.multiple ? this.selectedItems.length : (this.internalSearch || '').toString().length;
        },
        hasSlot: function hasSlot() {
            return VSelect.options.computed.hasSlot.call(this) || this.multiple;
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return true;
        },
        menuCanShow: function menuCanShow() {
            if (!this.isFocused) return false;
            return this.hasDisplayedItems || !!this.$slots['no-data'] && !this.hideNoData;
        }
    },
    methods: {
        onFilteredItemsChanged: function onFilteredItemsChanged() {
            // nop
        },
        onInternalSearchChanged: function onInternalSearchChanged(val) {
            if (val && this.multiple && this.delimiters.length) {
                var delimiter = this.delimiters.find(function (d) {
                    return val.endsWith(d);
                });
                if (delimiter != null) {
                    this.internalSearch = val.slice(0, val.length - delimiter.length);
                    this.updateTags();
                }
            }
            this.updateMenuDimensions();
        },
        genChipSelection: function genChipSelection(item, index) {
            var _this = this;

            var chip = VSelect.options.methods.genChipSelection.call(this, item, index);
            // Allow user to update an existing value
            if (this.multiple) {
                chip.componentOptions.listeners.dblclick = function () {
                    _this.editingIndex = index;
                    _this.internalSearch = _this.getText(item);
                    _this.selectedIndex = -1;
                };
            }
            return chip;
        },
        onChipInput: function onChipInput(item) {
            VSelect.options.methods.onChipInput.call(this, item);
            this.editingIndex = -1;
        },

        // Requires a manual definition
        // to overwrite removal in v-autocomplete
        onEnterDown: function onEnterDown(e) {
            e.preventDefault();
            VSelect.options.methods.onEnterDown.call(this);
            // If has menu index, let v-select-list handle
            if (this.getMenuIndex() > -1) return;
            this.updateSelf();
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            VSelect.options.methods.onKeyDown.call(this, e);
            // If user is at selection index of 0
            // create a new tag
            if (this.multiple && keyCode === keyCodes.left && this.$refs.input.selectionStart === 0) {
                this.updateSelf();
            }
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown: function onTabDown(e) {
            // When adding tags, if searching and
            // there is not a filtered options,
            // add the value to the tags list
            if (this.multiple && this.internalSearch && this.getMenuIndex() === -1) {
                e.preventDefault();
                e.stopPropagation();
                return this.updateTags();
            }
            VAutocomplete.options.methods.onTabDown.call(this, e);
        },
        selectItem: function selectItem(item) {
            // Currently only supports items:<string[]>
            if (this.editingIndex > -1) {
                this.updateEditing();
            } else {
                VSelect.options.methods.selectItem.call(this, item);
            }
        },
        setSelectedItems: function setSelectedItems() {
            if (this.internalValue == null || this.internalValue === '') {
                this.selectedItems = [];
            } else {
                this.selectedItems = this.multiple ? this.internalValue : [this.internalValue];
            }
        },
        setValue: function setValue() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.internalSearch;

            VSelect.options.methods.setValue.call(this, value);
        },
        updateEditing: function updateEditing() {
            var value = this.internalValue.slice();
            value[this.editingIndex] = this.internalSearch;
            this.setValue(value);
            this.editingIndex = -1;
        },
        updateCombobox: function updateCombobox() {
            var isUsingSlot = Boolean(this.$scopedSlots.selection) || this.hasChips;
            // If search is not dirty and is
            // using slot, do nothing
            if (isUsingSlot && !this.searchIsDirty) return;
            // The internal search is not matching
            // the internal value, update the input
            if (this.internalSearch !== this.getText(this.internalValue)) this.setValue();
            // Reset search if using slot
            // to avoid a double input
            if (isUsingSlot) this.internalSearch = undefined;
        },
        updateSelf: function updateSelf() {
            this.multiple ? this.updateTags() : this.updateCombobox();
        },
        updateTags: function updateTags() {
            var menuIndex = this.getMenuIndex();
            // If the user is not searching
            // and no menu item is selected
            // do nothing
            if (menuIndex < 0 && !this.searchIsDirty) return;
            if (this.editingIndex > -1) {
                return this.updateEditing();
            }
            var index = this.selectedItems.indexOf(this.internalSearch);
            // If it already exists, do nothing
            // this might need to change to bring
            // the duplicated item to the last entered
            if (index > -1) {
                var internalValue = this.internalValue.slice();
                internalValue.splice(index, 1);
                this.setValue(internalValue);
            }
            // If menu index is greater than 1
            // the selection is handled elsewhere
            // TODO: find out where
            if (menuIndex > -1) return this.internalSearch = null;
            this.selectItem(this.internalSearch);
            this.internalSearch = null;
        }
    }
});
//# sourceMappingURL=VCombobox.js.map
// CONCATENATED MODULE: ./src/actionbar/ActionbarSetting.vue





/* normalize component */

var ActionbarSetting_component = normalizeComponent(
  actionbar_ActionbarSettingvue_type_script_lang_js_,
  ActionbarSettingvue_type_template_id_7b25e13c_render,
  ActionbarSettingvue_type_template_id_7b25e13c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ActionbarSetting = (ActionbarSetting_component.exports);

/* vuetify-loader */
















installComponents_default()(ActionbarSetting_component, {
  VBtn: VBtn,
  VCard: VCard,
  VCardActions: VCardActions,
  VCardText: VCardText,
  VCardTitle: VCardTitle,
  VCombobox: VCombobox,
  VContainer: VContainer,
  VDialog: VDialog,
  VDivider: VDivider,
  VFlex: VFlex,
  VIcon: VIcon_VIcon,
  VLayout: VLayout,
  VSpacer: VSpacer,
  VSubheader: VSubheader,
  VTooltip: VTooltip,
})

// CONCATENATED MODULE: ./src/actionbar/index.js



// CONCATENATED MODULE: ./src/lib.js

/* harmony default export */ var lib = ({
  install: function install(Vue, options) {
    // register all components globally
    for (var componentName in actionbar_namespaceObject) {
      Vue.component(componentName, actionbar_namespaceObject[componentName]);
    }
  }
});
// CONCATENATED MODULE: /Users/nat/KBProIDE/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (lib);



/***/ }),

/***/ "fe23":
/***/ (function(module, exports) {

module.exports = false;


/***/ })

/******/ })["default"];
//# sourceMappingURL=arduino-esp32-actionbar.common.js.map