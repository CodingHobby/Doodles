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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Element = __webpack_require__(2)

module.exports = {
	Element,
	select: function (selector) {
		console.log('selecting')
		let el = document.querySelector(selector)
		console.log('removing child')
		document.body.removeChild(el)
		console.log('creating element')
		let out = new Element(el.nodeName, el.value || el.innerHTML)
		console.log('id')
		if (el.id) {
			out.id(el.id)
		}
		console.log('classes')
		let classes = Array.prototype.slice.call(el.classList)
		out.addClass(classes)
		console.log('children')
		let children = Array.prototype.slice.call(el.childNodes).map(element => {
			return new Element(element.parentNode.nodeName, element.value || element.innerHTML)
		})
		
		out.addChild(children)
		console.log('return')
		return out
	}
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    Element = _require.Element,
    select = _require.select;

var timer = new Element('p').addClass('timer').render();
var audio = new Audio('./assets/alarm.wav');
var SET_MINUTES = 25,
    SET_SECONDS = 0;

var timerInterval = void 0;

function formatNumber(n, l) {
	var out = '' + n;
	while (out.length < l) {
		out = '0' + out;
	}
	return out;
}

function formatTime(mins, secs) {
	return formatNumber(mins) + ' : ' + formatNumber(secs);
}

var reset = new Element('button').content('Start Timer').on('click', function () {
	clearInterval(timerInterval);
	timer.content(formatTime(formatNumber(SET_MINUTES, 2), formatNumber(SET_SECONDS, 2)));
	var minutes = SET_MINUTES;
	var seconds = SET_SECONDS;
	time(minutes, seconds);
}).render();

timer.content(formatTime(formatNumber(SET_MINUTES, 2), formatNumber(SET_SECONDS, 2)));

function time(mins, secs) {
	var minutes = mins;
	var seconds = secs;
	timerInterval = setInterval(function () {
		if (seconds > 0) {
			seconds -= 1;
		} else if (seconds <= 0) {
			seconds = 59;
			minutes -= 1;
		}
		if (seconds <= 0 && minutes <= 0) {
			clearInterval(timerInterval);
			audio.play();
		}
		timer.content(formatTime(formatNumber(minutes, 2), formatNumber(seconds, 2)));
	}, 1000);
	return false;
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = class Element {

	/**
	 * Creates an instance of the Element class
	 * 
	 * @param {String} type - The type of the element
	 * @param {String} [html] - The innerHTML of the element
	 * @param {Node} [parent=document.body] - The parent of the element
	 */

	constructor(type, html, parent) {
		// Create the element and set its properties
		this.el = document.createElement(type)
		if (html) {
			// Required for setting value for inputs too
			this.el.innerHTML = html
			this.el.setAttribute('value', html)
		}
		this.parentNode = parent || document.body
		this.childrenNodes = []
	}

	/**
	 * Gets or sets the id of an element
	 * 
	 * @param {String} [id] - the id to assign to the element 
	 *
	 * @return {String|Element} - either the element if an ID is provided or the element's ID if none is provided
	 */

	id(id) {
		if (id) {
			this.el.id = id
			return this
		} else {
			return this.el.id
		}
	}

	/**
	 * Renders the element to the dom
	 * 
	 */
	render() {
		this.parentNode.appendChild(this.el)
		return this
	}


	/**
	 * Gets or sets the inner HTML of an element
	 * 
	 * @param {String} [html] - the innerHTML of the element 
	 * 
	 * @return {String|Element} - either the element if an HTML value is provided or the element's innerHTML if none is provided
	 */

	content(html) {
		if (html) {
			this.el.innerHTML = html
			return this
		} else {
			return this.el.innerHTML
		}
	}


	/**
	 * Sets or gets the value of an element
	 * 
	 * @param {String} [val] - the value to assign to an element
	 * 
	 * @return {String|Element} - either the element if a value is provided or the element's value if none is provided
	 */

	value(val) {
		if (val) {
			this.el.setAttribute('value', val)
			return this
		} else {
			return this.el.value
		}
	}


	/**
	 * Sets and gets a parent for the element
	 * 
	 * @param {Node} [parent] - the parent node for the element
	 * 
	 * @return {Node|Element} - either the Element if a Node is provided or the element's parent if none is provided
	 */

	parent(parent) {
		if (parent) {
			// We have to remove the element from its previous parent, before appending it to another one
			this.parentNode.removeChild(this.el)
			this.parentNode = parent
			this.parentNode.appendChild(this.el)
			return this
		} else {
			return this.parentNode
		}
	}


	/**
	 * Adds a child to an element. Also pushes the element to this element's childrenNodes array
	 * 
	 * @param {Element} el - the element to add as a child to this
	 * 
	 * @return {Element} - this Element
	 */

	addChild(...els) {
		els.forEach(el => {
			if (el instanceof Array) {
				this.addChild(...el)
			} else {
				el.parent(this.el)
				this.childrenNodes.push(el)
			}
		})

		return this
	}


	/**
	 * Removes a child from an element's children array and from the DOM
	 * 
	 * @param {Element} el
	 * 
	 * @return {String|Element} - this Element
	 */

	removeChild(el) {
		this.el.removeChild(el.el)
		this.childrenNodes.splice(this.childrenNodes.indexOf(el), 1)
		return this
	}

	/**
	 * List all the children of an Element
	 * 
	 * @return {Element[]} - an array with all of this Element's children
	 */
	children() {
		return this.childrenNodes
	}

	/**
	 * Converts Element to DOM node 
	 */

	toNode() {
		return this.el
	}

	/**
	 * Adds an event listener to the element
	 * 
	 * @param {String|Event} event - the event to listen for 
	 * @param {function} callback - the callback function for when the event occurs
	 *
	 * @return {Element} - this Element
	 */

	on(event, callback) {
		this.el.addEventListener(event, callback)
		return this
	}

	/**
	 * Returns a list of the element's classes as an array
	 * 
	 * @return {Element} - this Element
	 */
	classes() {
		return Array.prototype.slice.call(this.el.classList)
	}

	/**
	 * Adds a class to an element
	 * 
	 * @param {String} classes
	 * 
	 * @return {Element} - this element
	 */
	addClass(...classes) {
		classes.forEach(className => {
			if (className instanceof Array) {
				this.addClass(...className)
			} else {
				this.el.classList.add(className)
			}
		})
		return this
	}

	/**
	 * Removes a class from an element
	 * 
	 * @param {String} classes 
	 * 
	 * @return {Element} - this Element
	 */
	removeClass(...classes) {
		classes.forEach(className => {
			if (className instanceof Array) {
				this.removeClass(...className)
			} else {
				this.el.classList.remove(className)
			}
		})
		return this
	}

	/**
	 * Toggles a class on an element
	 * 
	 * @param {String} className
	 * 
	 * @return {Element} - this Element
	 */
	toggleClass(...classes) {
		classes.forEach(className => {
			if (className instanceof Array) {
				this.toggleClass(...className)
			} else {
				this.el.classList.toggle(className)
			}
		})
		return this
	}

	/**
	 * Sets an element's style
	 * 
	 * @param {Object} styleObj
	 * 
	 * @return {Element} - this Element
	 */
	style(styleObj) {
		const rules = Object.keys(styleObj)
		rules.forEach(rule => {
			this.el.style[rule] = styleObj[rule]
		})
		return this
	}

	/**
	 * Sets the value for an attribute of this Elment
	 * 
	 * @param {String} attr - the name of the attribute 
	 * @param {String} val - the value to set for the attribute
	 * 
	 * @return {Element} - this Element
	 */
	attr(attr, val) {
		this.el[attr] = val
		return this
	}
}

/***/ })
/******/ ]);