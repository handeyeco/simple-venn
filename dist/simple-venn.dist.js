(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SimpleVenn", [], factory);
	else if(typeof exports === 'object')
		exports["SimpleVenn"] = factory();
	else
		root["SimpleVenn"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _SimpleVenn = __webpack_require__(1);

var _SimpleVenn2 = _interopRequireDefault(_SimpleVenn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _SimpleVenn2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleVenn = function () {
  function SimpleVenn(aSetCount, bSetCount, uSetCount) {
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, SimpleVenn);

    this.aSetCount = aSetCount;
    this.bSetCount = bSetCount;
    this.uSetCount = uSetCount;
    this.scale = scale;
  }

  _createClass(SimpleVenn, [{
    key: 'setArea',
    value: function setArea(set) {
      var count = set + 'SetCount';
      var abs = Math.abs(this.scale);

      if (this.scale < 0) {
        return this[count] / abs;
      } else {
        return this[count] * abs;
      }
    }
  }, {
    key: 'setRadius',
    value: function setRadius(set) {
      var area = set + 'SetArea';
      return Math.sqrt(this[area] / Math.PI);
    }
  }, {
    key: 'setDiameter',
    value: function setDiameter(set) {
      var r = set + 'SetRadius';
      return this[r] * 2;
    }
  }, {
    key: 'aSetArea',
    get: function get() {
      return this.setArea('a');
    }
  }, {
    key: 'bSetArea',
    get: function get() {
      return this.setArea('b');
    }
  }, {
    key: 'uSetArea',
    get: function get() {
      return this.setArea('u');
    }
  }, {
    key: 'aSetRadius',
    get: function get() {
      return this.setRadius('a');
    }
  }, {
    key: 'bSetRadius',
    get: function get() {
      return this.setRadius('b');
    }
  }, {
    key: 'aSetDiameter',
    get: function get() {
      return this.setDiameter('a');
    }
  }, {
    key: 'bSetDiameter',
    get: function get() {
      return this.setDiameter('b');
    }
  }, {
    key: 'setDistance',
    get: function get() {
      var r1 = this.aSetRadius;
      var r2 = this.bSetRadius;
      var uArea = this.uSetArea;

      var overlapping = Math.min(r1, r2) * Math.min(r1, r2) * Math.PI <= uArea + 1e-10;

      if (overlapping) {
        return Math.abs(r1 - r2);
      }

      return (0, _helpers.bisect)(function (dist) {
        return (0, _helpers.circleOverlapArea)(r1, r2, dist) - uArea;
      }, 0, r1 + r2);
    }
  }, {
    key: 'aSetIntersectDist',
    get: function get() {
      var r1 = this.aSetRadius;
      var r2 = this.bSetRadius;
      var d = this.setDistance;

      if (d <= 1e-10) {
        return d;
      }

      var num = d * d - r1 * r1 + r2 * r2;
      var den = 2 * d;
      return num / den;
    }
  }, {
    key: 'bSetIntersectDist',
    get: function get() {
      return this.setDistance - this.aSetIntersectDist;
    }
  }]);

  return SimpleVenn;
}();

exports.default = SimpleVenn;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bisect = bisect;
exports.circleOverlapArea = circleOverlapArea;
// Finds the zeros of a function, given two starting points
// (which must have opposite signs)
function bisect(f, a, b) {
  var maxIterations = 100;
  var tolerance = 1e-10;
  var fA = f(a);
  var fB = f(b);
  var delta = b - a;

  if (fA * fB > 0) {
    throw "Initial bisect points must have opposite signs";
  }

  if (fA === 0) return a;
  if (fB === 0) return b;

  for (var i = 0; i < maxIterations; ++i) {
    delta /= 2;
    var mid = a + delta,
        fMid = f(mid);

    if (fMid * fA >= 0) {
      a = mid;
    }

    if (Math.abs(delta) < tolerance || fMid === 0) {
      return mid;
    }
  }
  return a + delta;
}

// Returns the overlap area of two circles of radius r1 and r2
// that have their centers separated by distance d
function circleOverlapArea(r1, r2, d) {
  // No overlap
  if (d >= r1 + r2) {
    return 0;
  }

  // Completely overlapped
  if (d <= Math.abs(r1 - r2)) {
    return Math.PI * Math.min(r1, r2) * Math.min(r1, r2);
  }

  var w1 = r1 - (d * d - r2 * r2 + r1 * r1) / (2 * d);
  var w2 = r2 - (d * d - r1 * r1 + r2 * r2) / (2 * d);

  return circleSegmentArea(r1, w1) + circleSegmentArea(r2, w2);
}

// Circular segment area calculation
// See http://mathworld.wolfram.com/CircularSegment.html
function circleSegmentArea(r, width) {
  return r * r * Math.acos(1 - width / r) - (r - width) * Math.sqrt(width * (2 * r - width));
}

/***/ })
/******/ ]);
});