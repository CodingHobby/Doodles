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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const { Element } = __webpack_require__(1)

let video = new Element('video')
	.attr('width', 600)
	.attr('height', 600)
	.attr('autoplay', true)

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	// Not adding `{ audio: true }` since we only want video now
	navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
	})
}

/***/ }),
/* 1 */
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
		this.childrenElements = []
		this.rendered = false
		this.listeners = []
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
	 * Renders the element and its children to the dom
	 * 
	 */
	render() {
		this.rendered = true
		this.parentNode.appendChild(this.el)
		if (this.childrenElements) {
			this.childrenElements.forEach(node => node.render())
		}
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
		if (html !== undefined) {
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
		if (val !== undefined) {
			this.el.value = val
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
			// We only need to do it if this element has already rendered, though
			if (this.rendered) {
				this.parentNode.removeChild(this.el)
			}
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
	 * @return {Element} - this
	 */

	addChild(...els) {
		els.forEach(el => {
			if (el instanceof Array) {
				this.addChild(...el)
			} else {
				el.parent(this.el)
				this.childrenElements.push(el)
			}
		})

		return this
	}


	/**
	 * Removes a child from an element's children array and from the DOM
	 * 
	 * @param {Element} el - the child to remove
	 * 
	 * @return {String|Element} - this Element
	 */
	removeChild(...els) {
		els.forEach(el => {
			if (el instanceof Array) {
				this.removeChild(...el)
			} else {
				if (el.el.parentNode == this.el) {
					this.el.removeChild(el.el)
					this.childrenElements.splice(this.childrenElements.indexOf(el), 1)
				} else {
					throw new Error('Error: removeChild was called, but argument is not child of element')
				}
			}
		})
		return this
	}

	/**
	 * List all the children of an Element
	 * 
	 * @return {Element[]} - an array with all of this Element's children
	 */
	children() {
		return this.childrenElements
	}

	/**
	 * List all DOM Node children of an Element
	 * 
	 * @return {Node[]} - an array of all then Element's children nodes
	 */
	childrenNodes() {
		return this.childrenElements.map(node => node.toNode())
	}

	/**
	 * Converts Element to DOM node 
	 * 
	 * @return {Node} - this element's DOM node
	 */

	toNode() {
		return this.el
	}


	/**
	 * Clears an Element's HTML content and removes its children, EventListeners, classes and styles
	 * 
	 * @return {Element} this
	 */
	clear() {
		this.el.innerHTML = ''
		this.childrenElements = []
		this.listeners.forEach(listener => this.removeEventListener(listener.event, listener.callback))
		this.el.classList.forEach(className => this.el.classList.remove(className))
		this.style({})
		return this
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
		this.listeners.push({ event, callback })
		return this
	}

	/**
	 * Returns a list of the element's classes as an array
	 * 
	 * @return {String[]} - the list of this element's class list
	 */
	classes() {
		return Array.prototype.slice.call(this.el.classList)
	}

	/**
	 * 
	 * @param {String} event - the event for which you want to remove a listener
	 * @param {function} callback - the callback of the listener you want to remove
	 * 
	 * @return {Element} this
	 */
	removeEventListener(event, callback) {
		let events = Object.keys(this.listeners)
		events.forEach((e, i) => {
			if (e.event == event
				&& e.callback == callback) {
				this.el.removeEventListener(event, callback)
			}
		})
		return this
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
		this.el.setAttribute(attr, val)
		return this
	}
}


/***/ })
/******/ ]);