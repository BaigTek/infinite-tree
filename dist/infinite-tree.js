/*! infinite-tree v0.3.0 | (c) 2016 Cheton Wu <cheton@gmail.com> | MIT | https://github.com/cheton/infinite-tree */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["InfiniteTree"] = factory();
	else
		root["InfiniteTree"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(1);

	var _events2 = _interopRequireDefault(_events);

	var _clusterize = __webpack_require__(2);

	var _clusterize2 = _interopRequireDefault(_clusterize);

	var _flattree = __webpack_require__(3);

	var _lookupTable = __webpack_require__(7);

	var _lookupTable2 = _interopRequireDefault(_lookupTable);

	var _renderer = __webpack_require__(8);

	var _polyfill = __webpack_require__(10);

	var _utils = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ensureNodeInstance = function ensureNodeInstance(node) {
	    if (!(node instanceof _flattree.Node)) {
	        throw new Error('The node must be a Node object.');
	    }
	    return true;
	};

	var extend = function extend(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	    }

	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	    }

	    var output = Object(target);
	    for (var index = 0; index < sources.length; index++) {
	        var source = sources[index];
	        if (source !== undefined && source !== null) {
	            for (var key in source) {
	                if (source.hasOwnProperty(key)) {
	                    output[key] = source[key];
	                }
	            }
	        }
	    }
	    return output;
	};

	var InfiniteTree = function (_events$EventEmitter) {
	    _inherits(InfiniteTree, _events$EventEmitter);

	    function InfiniteTree() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, InfiniteTree);

	        // Assign options

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteTree).call(this));

	        _this.options = {
	            autoOpen: false,
	            el: null,
	            rowRenderer: _renderer.defaultRowRenderer
	        };
	        _this.state = {
	            openNodes: [],
	            rootNode: null,
	            selectedNode: null
	        };
	        _this.clusterize = null;
	        _this.tbl = new _lookupTable2['default']();
	        _this.nodes = [];
	        _this.rows = [];
	        _this.scrollElement = null;
	        _this.contentElement = null;

	        _this.contentListener = function (evt) {
	            var target = evt.target;
	            var currentTarget = evt.currentTarget;


	            (0, _polyfill.stopPropagation)(evt);

	            if (target !== currentTarget) {
	                var itemTarget = target;
	                var handleToggler = false;

	                while (itemTarget && itemTarget.parentElement !== currentTarget) {
	                    if (itemTarget.className.indexOf('tree-toggler') >= 0) {
	                        handleToggler = true;
	                    }
	                    itemTarget = itemTarget.parentElement;
	                }

	                var id = itemTarget.getAttribute('aria-id');
	                var node = _this.getNodeById(id);

	                if (!node) {
	                    return;
	                }

	                // Click on the toggler to open/close a tree node
	                if (handleToggler) {
	                    _this.toggleNode(node);
	                } else {
	                    _this.selectNode(node);
	                }
	            }
	        };

	        _this.options = extend({}, _this.options, options);

	        if (!_this.options.el) {
	            console.error('Failed to initialize infinite-tree: el is not specified.', options);
	            return _possibleConstructorReturn(_this);
	        }

	        _this.create();

	        // Load tree data if it's provided
	        if (options.data) {
	            _this.loadData(options.data);
	        }
	        return _this;
	    }

	    _createClass(InfiniteTree, [{
	        key: 'create',
	        value: function create() {
	            var _this2 = this;

	            if (!this.options.el) {
	                throw new Error('The element option is not specified.');
	            }

	            var scrollElement = document.createElement('div');
	            scrollElement.className = (0, _utils.classNames)('infinite-tree', 'infinite-tree-scroll');
	            var contentElement = document.createElement('div');
	            contentElement.className = (0, _utils.classNames)('infinite-tree', 'infinite-tree-content');

	            scrollElement.appendChild(contentElement);
	            this.options.el.appendChild(scrollElement);

	            this.clusterize = new _clusterize2['default']({
	                tag: 'div',
	                rows: [],
	                scrollElem: scrollElement,
	                contentElem: contentElement,
	                no_data_class: 'infinite-tree-no-data',
	                callbacks: {
	                    // Will be called right before replacing previous cluster with new one.
	                    clusterWillChange: function clusterWillChange() {},
	                    // Will be called right after replacing previous cluster with new one.
	                    clusterChanged: function clusterChanged() {},
	                    // Will be called on scrolling. Returns progress position.
	                    scrollingProgress: function scrollingProgress(progress) {
	                        _this2.emit('scrollProgress', progress);
	                    }
	                }
	            });

	            this.scrollElement = scrollElement;
	            this.contentElement = contentElement;

	            (0, _polyfill.addEventListener)(this.contentElement, 'click', this.contentListener);
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.clusterize.clear();
	            this.tbl.clear();
	            this.nodes = [];
	            this.rows = [];
	            this.state.openNodes = [];
	            this.state.rootNode = null;
	            this.state.selectedNode = null;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            (0, _polyfill.removeEventListener)(this.contentElement, 'click', this.contentListener);

	            this.clear();

	            if (this.clusterize) {
	                this.clusterize.destroy(true); // True to remove all data from the list
	                this.clusterize = null;
	            }

	            // Remove all child nodes
	            while (this.contentElement.firstChild) {
	                this.contentElement.removeChild(this.contentElement.firstChild);
	            }
	            while (this.scrollElement.firstChild) {
	                this.scrollElement.removeChild(this.scrollElement.firstChild);
	            }
	            if (this.options.el) {
	                var containerElement = this.options.el;
	                while (containerElement.firstChild) {
	                    containerElement.removeChild(containerElement.firstChild);
	                }
	            }
	            this.contentElement = null;
	            this.scrollElement = null;
	        }
	        // Updates list with new data

	    }, {
	        key: 'update',
	        value: function update() {
	            this.clusterize.update(this.rows);
	        }
	        // Inserts a new child node to a parent node at the specified index.
	        // * If the parent is null or undefined, inserts the child at the specified index in the top-level.
	        // * If the parent has children, the method adds the child to it at the specified index.
	        // * If the parent does not have children, the method adds the child to the parent.
	        // * If the index value is greater than or equal to the number of children in the parent, the method adds the child at the end of the children.
	        // @param {object} newNode The new child node.
	        // @param {number} [index] The 0-based index of where to insert the child node. Defaults to 0.
	        // @param {object} parentNode The parent Node object.

	    }, {
	        key: 'addChildNodeAt',
	        value: function addChildNodeAt(newNode, index, parentNode) {
	            var _this3 = this;

	            // Defaults to rootNode if the parentNode is not specified
	            parentNode = parentNode || this.state.rootNode;

	            ensureNodeInstance(parentNode);

	            if (!newNode) {
	                return false;
	            }
	            index = Number(index) || 0;
	            if (index < 0) {
	                index = 0;
	            }

	            // Inserts the new child at the specified index
	            newNode.parent = parentNode;
	            parentNode.children.splice(index, 0, newNode);

	            var deleteCount = parentNode.state.total;

	            // Update index
	            index = parentNode.children.indexOf(newNode);

	            var nodes = (0, _flattree.flatten)(parentNode.children, { openNodes: this.state.openNodes });

	            // Update newNode
	            newNode = parentNode.getChildAt(index);

	            var rows = nodes.map(function (node) {
	                return _this3.options.rowRenderer(node);
	            });
	            var parentOffset = this.nodes.indexOf(parentNode);

	            // Update nodes & rows
	            this.nodes.splice.apply(this.nodes, [parentOffset + 1, deleteCount].concat(nodes));
	            this.rows.splice.apply(this.rows, [parentOffset + 1, deleteCount].concat(rows));

	            // Update the lookup table with newly added nodes
	            this.flattenNode(newNode).forEach(function (node) {
	                if (node.id !== undefined) {
	                    _this3.tbl.set(node.id, node);
	                }
	            });

	            // Update the row corresponding to the parent node
	            this.rows[parentOffset] = this.options.rowRenderer(parentNode);

	            // Updates list with new data
	            this.update();

	            return true;
	        }
	        // Adds a node to the end of the list of children of a specified parent node.
	        // * If the parent is null or undefined, inserts the child at the specified index in the top-level.
	        // * If the parent has children, the method adds the child as the last child.
	        // * If the parent does not have children, the method adds the child to the parent.
	        // @param {object} newNode The new child node.
	        // @param {object} parentNode The parent Node object.
	        // @return {boolean} Returns true on success, false otherwise.

	    }, {
	        key: 'appendChildNode',
	        value: function appendChildNode(newNode, parentNode) {
	            // Defaults to rootNode if the parentNode is not specified
	            parentNode = parentNode || this.state.rootNode;

	            ensureNodeInstance(parentNode);

	            var index = parentNode.children.length;
	            return this.addChildNodeAt(newNode, index, parentNode);
	        }
	        // Closes a node to hide its children.
	        // @param {object} node The Node object.
	        // @return {boolean} Returns true on success, false otherwise.

	    }, {
	        key: 'closeNode',
	        value: function closeNode(node) {
	            ensureNodeInstance(node);

	            // Retrieve node index
	            var nodeIndex = this.nodes.indexOf(node);
	            if (nodeIndex < 0) {
	                throw new Error('Invalid node index');
	            }

	            // Check if the closeNode action can be performed
	            if (this.state.openNodes.indexOf(node) < 0) {
	                return false;
	            }

	            // Keep selected node unchanged if "node" is equal to "this.state.selectedNode"
	            if (this.state.selectedNode && this.state.selectedNode !== node) {
	                // row #0 - node.0         => parent node (total=4)
	                // row #1   - node.0.0     => close this node; next selected node (total=2)
	                // row #2       node.0.0.0 => selected node (total=0)
	                // row #3       node.0.0.1
	                // row #4     node.0.1
	                var selectedIndex = this.nodes.indexOf(this.state.selectedNode);
	                var rangeFrom = nodeIndex + 1;
	                var rangeTo = nodeIndex + node.state.total;

	                if (rangeFrom <= selectedIndex && selectedIndex <= rangeTo) {
	                    this.selectNode(node);
	                }
	            }

	            node.state.open = false; // Set the open state to false
	            var openNodes = this.state.openNodes.filter(function (node) {
	                return node.hasChildren() && node.state.open;
	            });
	            this.state.openNodes = openNodes;

	            var deleteCount = node.state.total;

	            // Subtract the deleteCount for all ancestors (parent, grandparent, etc.) of the current node
	            for (var p = node; p !== null; p = p.parent) {
	                p.state.total = p.state.total - deleteCount;
	            }

	            // Update nodes & rows
	            this.nodes.splice(nodeIndex + 1, deleteCount);
	            this.rows.splice(nodeIndex + 1, deleteCount);

	            // Update the row corresponding to the node
	            this.rows[nodeIndex] = this.options.rowRenderer(node);

	            // Emit the 'closeNode' event
	            this.emit('closeNode', node);

	            // Updates list with new data
	            this.update();

	            return true;
	        }
	        // Flattens all child nodes of a parent node by performing full tree traversal using child-parent link.
	        // No recursion or stack is involved.
	        // @param {object} parentNode The parent Node object.
	        // @return {array} Returns a flattened list of child nodes, not including the parent node.

	    }, {
	        key: 'flattenChildNodes',
	        value: function flattenChildNodes(parentNode) {
	            // Defaults to rootNode if the parentNode is not specified
	            parentNode = parentNode || this.state.rootNode;

	            ensureNodeInstance(parentNode);

	            var list = [];

	            // Ignore parent node
	            var node = parentNode.getFirstChild();
	            while (node) {
	                list.push(node);
	                if (node.hasChildren()) {
	                    node = node.getFirstChild();
	                } else {
	                    // find the parent level
	                    while (node.getNextSibling() === null && node.parent !== parentNode) {
	                        // use child-parent link to get to the parent level
	                        node = node.getParent();
	                    }

	                    // Get next sibling
	                    node = node.getNextSibling();
	                }
	            }

	            return list;
	        }
	        // Flattens a node by performing full tree traversal using child-parent link.
	        // No recursion or stack is involved.
	        // @param {object} node The Node object.
	        // @return {array} Returns a flattened list of nodes.

	    }, {
	        key: 'flattenNode',
	        value: function flattenNode(node) {
	            return [node].concat(this.flattenChildNodes(node));
	        }
	        // Gets a list of child nodes.
	        // @param {object} [parentNode] The parent Node object. If null or undefined, returns a list of top level nodes.
	        // @return {array} Returns an array of child nodes.

	    }, {
	        key: 'getChildNodes',
	        value: function getChildNodes(parentNode) {
	            // Defaults to rootNode if the parentNode is not specified
	            parentNode = parentNode || this.state.rootNode;

	            ensureNodeInstance(parentNode);

	            return parentNode.children;
	        }
	        // Gets a node by its unique id. This assumes that you have given the nodes in the data a unique id.
	        // @param {string|number} id An unique node id. A null value will be returned if the id doesn't match.
	        // @return {object} Returns the node the matches the id, null otherwise.

	    }, {
	        key: 'getNodeById',
	        value: function getNodeById(id) {
	            var node = this.tbl.get(id);
	            if (!node) {
	                // Find the first node that matches the id
	                node = this.nodes.filter(function (node) {
	                    return node.id === id;
	                })[0];
	                if (!node) {
	                    return null;
	                }
	                this.tbl.set(node.id, node);
	            }
	            return node;
	        }
	        // Gets the selected node.
	        // @return {object} Returns the selected node, or null if not selected.

	    }, {
	        key: 'getSelectedNode',
	        value: function getSelectedNode() {
	            return this.state.selectedNode;
	        }
	        // Gets an array of open nodes.
	        // @return {array} Returns an array of open nodes.

	    }, {
	        key: 'getOpenNodes',
	        value: function getOpenNodes() {
	            // returns a shallow copy of an array into a new array object.
	            return this.state.openNodes.slice();
	        }
	        // Inserts the specified node after the reference node.
	        // @param {object} newNode The new sibling node.
	        // @param {object} referenceNode The reference Node object.

	    }, {
	        key: 'insertNodeAfter',
	        value: function insertNodeAfter(newNode, referenceNode) {
	            ensureNodeInstance(referenceNode);
	            var parentNode = referenceNode.getParent();
	            var index = parentNode.children.indexOf(referenceNode) + 1;
	            return this.addChildNodeAt(newNode, index, parentNode);
	        }
	        // Inserts the specified node before the reference node.
	        // @param {object} newNode The new sibling node.
	        // @param {object} referenceNode The reference Node object.

	    }, {
	        key: 'insertNodeBefore',
	        value: function insertNodeBefore(newNode, referenceNode) {
	            ensureNodeInstance(referenceNode);
	            var parentNode = referenceNode.getParent();
	            var index = parentNode.children.indexOf(referenceNode);
	            return this.addChildNodeAt(newNode, index, parentNode);
	        }
	        // Loads data in the tree.
	        // @param {object|array} data The data is an object or array of objects that defines the node.

	    }, {
	        key: 'loadData',
	        value: function loadData() {
	            var _this4 = this;

	            var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	            this.nodes = (0, _flattree.flatten)(data, { openAllNodes: this.options.autoOpen });

	            // Clear lookup table
	            this.tbl.clear();

	            this.state.openNodes = this.nodes.filter(function (node) {
	                return node.hasChildren() && node.state.open;
	            });
	            this.state.rootNode = function () {
	                var node = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	                // Finding the root node
	                while (node && node.parent !== null) {
	                    node = node.parent;
	                }
	                return node;
	            }(this.nodes[0]);
	            this.state.selectedNode = null;

	            // Update the lookup table with newly added nodes
	            this.flattenChildNodes(this.state.rootNode).forEach(function (node) {
	                if (node.id !== undefined) {
	                    _this4.tbl.set(node.id, node);
	                }
	            });

	            // Update rows
	            this.rows = this.nodes.map(function (node) {
	                return _this4.options.rowRenderer(node);
	            });

	            // Updates list with new data
	            this.update();
	        }
	        // Opens a node to display its children.
	        // @param {object} node The Node object.
	        // @return {boolean} Returns true on success, false otherwise.

	    }, {
	        key: 'openNode',
	        value: function openNode(node) {
	            var _this5 = this;

	            ensureNodeInstance(node);

	            // Retrieve node index
	            var nodeIndex = this.nodes.indexOf(node);
	            if (nodeIndex < 0) {
	                throw new Error('Invalid node index');
	            }

	            // Check if the openNode action can be performed
	            if (this.state.openNodes.indexOf(node) >= 0) {
	                return false;
	            }

	            node.state.open = true; // Set node.state.open to true
	            var openNodes = [node].concat(this.state.openNodes); // the most recently used items first
	            this.state.openNodes = openNodes;

	            var nodes = (0, _flattree.flatten)(node.children, { openNodes: this.state.openNodes });
	            var rows = nodes.map(function (node) {
	                return _this5.options.rowRenderer(node);
	            });

	            // Update nodes & rows
	            this.nodes.splice.apply(this.nodes, [nodeIndex + 1, 0].concat(nodes));
	            this.rows.splice.apply(this.rows, [nodeIndex + 1, 0].concat(rows));

	            // Update the row corresponding to the node
	            this.rows[nodeIndex] = this.options.rowRenderer(node);

	            // Add all child nodes to the lookup table if the first child does not exist in the lookup table
	            if (nodes.length > 0 && !this.tbl.get(nodes[0])) {
	                nodes.forEach(function (node) {
	                    if (node.id !== undefined) {
	                        _this5.tbl.set(node.id, node);
	                    }
	                });
	            }

	            // Emit the 'openNode' event
	            this.emit('openNode', node);

	            // Updates list with new data
	            this.update();

	            return true;
	        }
	        // Removes all child nodes from a parent node
	        // @param {object} parentNode The parent Node object.
	        // @return {boolean} Returns true on success, false otherwise.

	    }, {
	        key: 'removeChildNodes',
	        value: function removeChildNodes(parentNode) {
	            var _this6 = this;

	            ensureNodeInstance(parentNode);

	            if (parentNode.children.length === 0) {
	                return false;
	            }

	            var parentNodeIndex = this.nodes.indexOf(parentNode);

	            // Handle selected node
	            if (parentNodeIndex >= 0 && this.state.selectedNode) {
	                // row #0 - node.0         => parent node (total=4) - remove all child nodes
	                // row #1   - node.0.0
	                // row #2       node.0.0.0 => current selected node
	                // row #3       node.0.0.1
	                // row #4     node.0.1
	                var selectedIndex = this.nodes.indexOf(this.state.selectedNode);
	                var rangeFrom = parentNodeIndex + 1;
	                var rangeTo = parentNodeIndex + parentNode.state.total;

	                if (rangeFrom <= selectedIndex && selectedIndex <= rangeTo) {
	                    this.selectNode(parentNode);
	                }
	            }

	            // Remove all child nodes
	            parentNode.children = [];

	            // Get the number of nodes to be removed
	            var deleteCount = parentNode.state.total;

	            // Subtract the deleteCount for all ancestors (parent, grandparent, etc.) of the current node
	            for (var p = parentNode; p !== null; p = p.parent) {
	                p.state.total = p.state.total - deleteCount;
	            }

	            {
	                (function () {
	                    // Update open nodes and lookup table
	                    var childNodes = _this6.flattenChildNodes(parentNode);

	                    _this6.state.openNodes = _this6.state.openNodes.filter(function (node) {
	                        return childNodes.indexOf(node) < 0;
	                    });

	                    childNodes.forEach(function (node) {
	                        _this6.tbl.unset(node.id);
	                    });
	                })();
	            }

	            if (parentNodeIndex >= 0) {
	                // Update nodes & rows
	                this.nodes.splice(parentNodeIndex + 1, parentNode.state.total);
	                this.rows.splice(parentNodeIndex + 1, parentNode.state.total);

	                // Update the row corresponding to the parent node
	                this.rows[parentNodeIndex] = this.options.rowRenderer(parentNode);
	            }

	            // Updates list with new data
	            this.update();

	            return true;
	        }
	        // Removes a node and all of its child nodes.
	        // @param {object} node The Node object.
	        // @return {boolean} Returns true on success, false otherwise.

	    }, {
	        key: 'removeNode',
	        value: function removeNode(node) {
	            var _this7 = this;

	            ensureNodeInstance(node);

	            var parentNode = node.parent;
	            if (!parentNode) {
	                return false;
	            }

	            // Retrieve node index
	            var nodeIndex = this.nodes.indexOf(node);
	            var parentNodeIndex = this.nodes.indexOf(parentNode);

	            // Handle selected node
	            if (nodeIndex >= 0 && this.state.selectedNode) {
	                // row #0 - node.0         => parent node (total=4)
	                // row #1   - node.0.0     => remove this node (total=2)
	                // row #2       node.0.0.0 => current selected node (total=0)
	                // row #3       node.0.0.1
	                // row #4     node.0.1     => next selected node (total=0)
	                var selectedIndex = this.nodes.indexOf(this.state.selectedNode);
	                var rangeFrom = nodeIndex;
	                var rangeTo = nodeIndex + node.state.total + 1;

	                if (rangeFrom <= selectedIndex && selectedIndex <= rangeTo) {
	                    // Change the selected node in the following order:
	                    // 1. next sibling node
	                    // 2. previous sibling node
	                    // 3. parent node
	                    var selectedNode = node.getNextSibling() || node.getPreviousSibling() || node.getParent();
	                    this.selectNode(selectedNode);
	                }
	            }

	            // Remove the node from its parent node
	            parentNode.children.splice(parentNode.children.indexOf(node), 1);

	            // Get the number of nodes to be removed
	            var deleteCount = node.state.total + 1;

	            // Subtract the deleteCount for all ancestors (parent, grandparent, etc.) of the current node
	            for (var p = parentNode; p !== null; p = p.parent) {
	                p.state.total = p.state.total - deleteCount;
	            }

	            {
	                (function () {
	                    // Update open nodes and lookup table
	                    var nodes = _this7.flattenNode(node);

	                    _this7.state.openNodes = _this7.state.openNodes.filter(function (node) {
	                        return nodes.indexOf(node) < 0;
	                    });

	                    nodes.forEach(function (node) {
	                        _this7.tbl.unset(node.id);
	                    });
	                })();
	            }

	            if (nodeIndex >= 0) {
	                // Update nodes & rows
	                this.nodes.splice(nodeIndex, node.state.total + 1);
	                this.rows.splice(nodeIndex, node.state.total + 1);
	            }

	            // Update the row corresponding to the parent node
	            if (parentNodeIndex >= 0) {
	                this.rows[parentNodeIndex] = this.options.rowRenderer(parentNode);
	            }

	            // Updates list with new data
	            this.update();

	            return true;
	        }
	        // Sets the current scroll position to this node.
	        // @param {object} node The Node object.
	        // @return {number} Returns the vertical scroll position, or -1 on error.

	    }, {
	        key: 'scrollToNode',
	        value: function scrollToNode(node) {
	            ensureNodeInstance(node);

	            // Retrieve node index
	            var nodeIndex = this.nodes.indexOf(node);
	            if (nodeIndex < 0) {
	                return -1;
	            }
	            if (!this.contentElement) {
	                return -1;
	            }
	            // Get the offset height of the first child element that contains the "tree-item" class
	            var firstChild = this.contentElement.querySelectorAll('.tree-item')[0];
	            var rowHeight = firstChild && firstChild.offsetHeight || 0;
	            return this.scrollTop(nodeIndex * rowHeight);
	        }
	        // Gets (or sets) the current vertical position of the scroll bar.
	        // @param {number} [value] An integer that indicates the new position to set the scroll bar to.
	        // @return {number} Returns the vertical scroll position.

	    }, {
	        key: 'scrollTop',
	        value: function scrollTop(value) {
	            if (!this.scrollElement) {
	                return 0;
	            }
	            if (value !== undefined) {
	                this.scrollElement.scrollTop = Number(value);
	            }
	            return this.scrollElement.scrollTop;
	        }
	        // Selects a node.
	        // @param {object} node The Node object. If null or undefined, deselects the current node.
	        // @return {boolean} Returns true on success, false otherwise.

	    }, {
	        key: 'selectNode',
	        value: function selectNode() {
	            var node = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	            if (node === null) {
	                // Deselect the current node
	                if (this.state.selectedNode) {
	                    var selectedNode = this.state.selectedNode;
	                    var selectedIndex = this.nodes.indexOf(selectedNode);

	                    selectedNode.state.selected = false;
	                    this.rows[selectedIndex] = this.options.rowRenderer(selectedNode);
	                    this.state.selectedNode = null;

	                    // Emit the 'selectNode' event
	                    this.emit('selectNode', null);

	                    // Updates list with new data
	                    this.update();

	                    return true;
	                }

	                return false;
	            }

	            ensureNodeInstance(node);

	            // Retrieve node index
	            var nodeIndex = this.nodes.indexOf(node);
	            if (nodeIndex < 0) {
	                throw new Error('Invalid node index');
	            }

	            // Select this node
	            if (this.state.selectedNode !== node) {
	                node.state.selected = true;

	                // Update the row corresponding to the node
	                this.rows[nodeIndex] = this.options.rowRenderer(node);
	            }

	            // Deselect the current node
	            if (this.state.selectedNode) {
	                var _selectedNode = this.state.selectedNode;
	                var _selectedIndex = this.nodes.indexOf(_selectedNode);
	                _selectedNode.state.selected = false;
	                this.rows[_selectedIndex] = this.options.rowRenderer(_selectedNode);
	            }

	            if (this.state.selectedNode !== node) {
	                this.state.selectedNode = node;

	                // Emit the 'selectNode' event
	                this.emit('selectNode', node);
	            } else {
	                this.state.selectedNode = null;

	                // Emit the 'selectNode' event
	                this.emit('selectNode', null);
	            }

	            // Updates list with new data
	            this.update();

	            return true;
	        }
	        // Toggles a node to display or hide its children.
	        // @param {object} node The Node object.

	    }, {
	        key: 'toggleNode',
	        value: function toggleNode(node) {
	            if (this.state.openNodes.indexOf(node) >= 0) {
	                // close node
	                this.closeNode(node);
	            } else {
	                // open node
	                this.openNode(node);
	            }
	        }
	        // Serializes the current state of a node to a JSON string.
	        // @param {object} node The Node object. If null, returns the whole tree.

	    }, {
	        key: 'toString',
	        value: function toString() {
	            var node = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	            var traverse = function traverse(node) {
	                var s = '[';
	                if (node && node.children) {
	                    var _loop = function _loop(i) {
	                        var list = [];
	                        s = s + '{';
	                        Object.keys(node).forEach(function (key) {
	                            var value = node[key];
	                            if (key === 'parent') {
	                                // ignore parent
	                                return;
	                            }
	                            if (key === 'children') {
	                                // traverse child nodes
	                                list.push('"' + key + '":' + traverse(node.children[i]));
	                                return;
	                            }
	                            if (typeof value === 'string' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	                                list.push('"' + key + '":' + JSON.stringify(value));
	                            } else {
	                                // primitive types
	                                list.push('"' + key + '":' + value);
	                            }
	                        });
	                        s = s + list.join(',');
	                        s = s + '}' + (i === node.children.length - 1 ? '' : ',');
	                    };

	                    for (var i = 0; i < node.children.length; ++i) {
	                        _loop(i);
	                    }
	                }
	                s = s + ']';
	                return s;
	            };

	            if (!node) {
	                node = this.state.rootNode;
	            }

	            return traverse(node);
	        }
	        // Updates the data of a node.
	        // @param {object} node
	        // @param {object} data The data object.

	    }, {
	        key: 'updateNode',
	        value: function updateNode(node, data) {
	            ensureNodeInstance(node);

	            // The static attributes (i.e. children, parent, and state) are being protected
	            var _node = node;
	            var children = _node.children;
	            var parent = _node.parent;
	            var state = _node.state;

	            node = extend(node, data, { children: children, parent: parent, state: state });

	            // Retrieve node index
	            var nodeIndex = this.nodes.indexOf(node);
	            if (nodeIndex >= 0) {
	                // Update the row corresponding to the node
	                this.rows[nodeIndex] = this.options.rowRenderer(node);

	                // Updates list with new data
	                this.update();
	            }
	        }
	    }]);

	    return InfiniteTree;
	}(_events2['default'].EventEmitter);

	// IE8 compatibility output


	module.exports = InfiniteTree;

/***/ },
/* 1 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*! Clusterize.js - v0.16.0 - 2016-03-12
	* http://NeXTs.github.com/Clusterize.js/
	* Copyright (c) 2015 Denis Lukov; Licensed GPLv3 */

	;(function(name, definition) {
	    if (true) module.exports = definition();
	    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
	    else this[name] = definition();
	}('Clusterize', function() {
	  "use strict"

	  // detect ie9 and lower
	  // https://gist.github.com/padolsey/527683#comment-786682
	  var ie = (function(){
	    for( var v = 3,
	             el = document.createElement('b'),
	             all = el.all || [];
	         el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->',
	         all[0];
	       ){}
	    return v > 4 ? v : document.documentMode;
	  }()),
	  is_mac = navigator.platform.toLowerCase().indexOf('mac') + 1;
	  var Clusterize = function(data) {
	    if( ! (this instanceof Clusterize))
	      return new Clusterize(data);
	    var self = this;

	    var defaults = {
	      item_height: 0,
	      block_height: 0,
	      rows_in_block: 50,
	      rows_in_cluster: 0,
	      cluster_height: 0,
	      blocks_in_cluster: 4,
	      tag: null,
	      content_tag: null,
	      show_no_data_row: true,
	      no_data_class: 'clusterize-no-data',
	      no_data_text: 'No data',
	      keep_parity: true,
	      callbacks: {},
	      scroll_top: 0
	    }

	    // public parameters
	    self.options = {};
	    var options = ['rows_in_block', 'blocks_in_cluster', 'show_no_data_row', 'no_data_class', 'no_data_text', 'keep_parity', 'tag', 'callbacks'];
	    for(var i = 0, option; option = options[i]; i++) {
	      self.options[option] = typeof data[option] != 'undefined' && data[option] != null
	        ? data[option]
	        : defaults[option];
	    }

	    var elems = ['scroll', 'content'];
	    for(var i = 0, elem; elem = elems[i]; i++) {
	      self[elem + '_elem'] = data[elem + 'Id']
	        ? document.getElementById(data[elem + 'Id'])
	        : data[elem + 'Elem'];
	      if( ! self[elem + '_elem'])
	        throw new Error("Error! Could not find " + elem + " element");
	    }

	    // tabindex forces the browser to keep focus on the scrolling list, fixes #11
	    if( ! self.content_elem.hasAttribute('tabindex'))
	      self.content_elem.setAttribute('tabindex', 0);

	    // private parameters
	    var rows = isArray(data.rows)
	        ? data.rows
	        : self.fetchMarkup(),
	      cache = {data: '', bottom: 0},
	      scroll_top = self.scroll_elem.scrollTop;

	    // get row height
	    self.exploreEnvironment(rows);

	    // append initial data
	    self.insertToDOM(rows, cache);

	    // restore the scroll position
	    self.scroll_elem.scrollTop = scroll_top;

	    // adding scroll handler
	    var last_cluster = false,
	    scroll_debounce = 0,
	    pointer_events_set = false,
	    scrollEv = function() {
	      // fixes scrolling issue on Mac #3
	      if (is_mac) {
	          if( ! pointer_events_set) self.content_elem.style.pointerEvents = 'none';
	          pointer_events_set = true;
	          clearTimeout(scroll_debounce);
	          scroll_debounce = setTimeout(function () {
	              self.content_elem.style.pointerEvents = 'auto';
	              pointer_events_set = false;
	          }, 50);
	      }
	      if (last_cluster != (last_cluster = self.getClusterNum()))
	        self.insertToDOM(rows, cache);
	      if (self.options.callbacks.scrollingProgress)
	        self.options.callbacks.scrollingProgress(self.getScrollProgress());
	    },
	    resize_debounce = 0,
	    resizeEv = function() {
	      clearTimeout(resize_debounce);
	      resize_debounce = setTimeout(self.refresh, 100);
	    }
	    on('scroll', self.scroll_elem, scrollEv);
	    on('resize', window, resizeEv);

	    // public methods
	    self.destroy = function(clean) {
	      off('scroll', self.scroll_elem, scrollEv);
	      off('resize', window, resizeEv);
	      self.html((clean ? self.generateEmptyRow() : rows).join(''));
	    }
	    self.refresh = function() {
	      self.getRowsHeight(rows) && self.update(rows);
	    }
	    self.update = function(new_rows) {
	      rows = isArray(new_rows)
	        ? new_rows
	        : [];
	      var scroll_top = self.scroll_elem.scrollTop;
	      // fixes #39
	      if(rows.length * self.options.item_height < scroll_top) {
	        self.scroll_elem.scrollTop = 0;
	        last_cluster = 0;
	      }
	      self.insertToDOM(rows, cache);
	      self.scroll_elem.scrollTop = scroll_top;
	    }
	    self.clear = function() {
	      self.update([]);
	    }
	    self.getRowsAmount = function() {
	      return rows.length;
	    }
	    self.getScrollProgress = function() {
	      return this.options.scroll_top / (rows.length * this.options.item_height) * 100 || 0;
	    }

	    var add = function(where, _new_rows) {
	      var new_rows = isArray(_new_rows)
	        ? _new_rows
	        : [];
	      if( ! new_rows.length) return;
	      rows = where == 'append'
	        ? rows.concat(new_rows)
	        : new_rows.concat(rows);
	      self.insertToDOM(rows, cache);
	    }
	    self.append = function(rows) {
	      add('append', rows);
	    }
	    self.prepend = function(rows) {
	      add('prepend', rows);
	    }
	  }

	  Clusterize.prototype = {
	    constructor: Clusterize,
	    // fetch existing markup
	    fetchMarkup: function() {
	      var rows = [], rows_nodes = this.getChildNodes(this.content_elem);
	      while (rows_nodes.length) {
	        rows.push(rows_nodes.shift().outerHTML);
	      }
	      return rows;
	    },
	    // get tag name, content tag name, tag height, calc cluster height
	    exploreEnvironment: function(rows) {
	      var opts = this.options;
	      opts.content_tag = this.content_elem.tagName.toLowerCase();
	      if( ! rows.length) return;
	      if(ie && ie <= 9 && ! opts.tag) opts.tag = rows[0].match(/<([^>\s/]*)/)[1].toLowerCase();
	      if(this.content_elem.children.length <= 1) this.html(rows[0] + rows[0] + rows[0]);
	      if( ! opts.tag) opts.tag = this.content_elem.children[0].tagName.toLowerCase();
	      this.getRowsHeight(rows);
	    },
	    getRowsHeight: function(rows) {
	      var opts = this.options,
	        prev_item_height = opts.item_height;
	      opts.cluster_height = 0
	      if( ! rows.length) return;
	      var nodes = this.content_elem.children;
	      opts.item_height = nodes[Math.floor(nodes.length / 2)].offsetHeight;
	      // consider table's border-spacing
	      if(opts.tag == 'tr' && getStyle('borderCollapse', this.content_elem) != 'collapse')
	        opts.item_height += parseInt(getStyle('borderSpacing', this.content_elem)) || 0;
	      opts.block_height = opts.item_height * opts.rows_in_block;
	      opts.rows_in_cluster = opts.blocks_in_cluster * opts.rows_in_block;
	      opts.cluster_height = opts.blocks_in_cluster * opts.block_height;
	      return prev_item_height != opts.item_height;
	    },
	    // get current cluster number
	    getClusterNum: function () {
	      this.options.scroll_top = this.scroll_elem.scrollTop;
	      return Math.floor(this.options.scroll_top / (this.options.cluster_height - this.options.block_height)) || 0;
	    },
	    // generate empty row if no data provided
	    generateEmptyRow: function() {
	      var opts = this.options;
	      if( ! opts.tag || ! opts.show_no_data_row) return [];
	      var empty_row = document.createElement(opts.tag),
	        no_data_content = document.createTextNode(opts.no_data_text), td;
	      empty_row.className = opts.no_data_class;
	      if(opts.tag == 'tr') {
	        td = document.createElement('td');
	        td.appendChild(no_data_content);
	      }
	      empty_row.appendChild(td || no_data_content);
	      return [empty_row.outerHTML];
	    },
	    // generate cluster for current scroll position
	    generate: function (rows, cluster_num) {
	      var opts = this.options,
	        rows_len = rows.length;
	      if (rows_len < opts.rows_in_block) {
	        return {
	          top_offset: 0,
	          bottom_offset: 0,
	          rows_above: 0,
	          rows: rows_len ? rows : this.generateEmptyRow()
	        }
	      }
	      if( ! opts.cluster_height) {
	        this.exploreEnvironment(rows);
	      }
	      var items_start = Math.max((opts.rows_in_cluster - opts.rows_in_block) * cluster_num, 0),
	        items_end = items_start + opts.rows_in_cluster,
	        top_offset = Math.max(items_start * opts.item_height, 0),
	        bottom_offset = Math.max((rows_len - items_end) * opts.item_height, 0),
	        this_cluster_rows = [],
	        rows_above = items_start;
	      if(top_offset < 1) {
	        rows_above++;
	      }
	      for (var i = items_start; i < items_end; i++) {
	        rows[i] && this_cluster_rows.push(rows[i]);
	      }
	      return {
	        top_offset: top_offset,
	        bottom_offset: bottom_offset,
	        rows_above: rows_above,
	        rows: this_cluster_rows
	      }
	    },
	    renderExtraTag: function(class_name, height) {
	      var tag = document.createElement(this.options.tag),
	        clusterize_prefix = 'clusterize-';
	      tag.className = [clusterize_prefix + 'extra-row', clusterize_prefix + class_name].join(' ');
	      height && (tag.style.height = height + 'px');
	      return tag.outerHTML;
	    },
	    // if necessary verify data changed and insert to DOM
	    insertToDOM: function(rows, cache) {
	      var data = this.generate(rows, this.getClusterNum()),
	        this_cluster_rows = data.rows.join(''),
	        this_cluster_content_changed = this.checkChanges('data', this_cluster_rows, cache),
	        only_bottom_offset_changed = this.checkChanges('bottom', data.bottom_offset, cache),
	        callbacks = this.options.callbacks,
	        layout = [];

	      if(this_cluster_content_changed) {
	        if(data.top_offset) {
	          this.options.keep_parity && layout.push(this.renderExtraTag('keep-parity'));
	          layout.push(this.renderExtraTag('top-space', data.top_offset));
	        }
	        layout.push(this_cluster_rows);
	        data.bottom_offset && layout.push(this.renderExtraTag('bottom-space', data.bottom_offset));
	        callbacks.clusterWillChange && callbacks.clusterWillChange();
	        this.html(layout.join(''));
	        this.options.content_tag == 'ol' && this.content_elem.setAttribute('start', data.rows_above);
	        callbacks.clusterChanged && callbacks.clusterChanged();
	      } else if(only_bottom_offset_changed) {
	        this.content_elem.lastChild.style.height = data.bottom_offset + 'px';
	      }
	    },
	    // unfortunately ie <= 9 does not allow to use innerHTML for table elements, so make a workaround
	    html: function(data) {
	      var content_elem = this.content_elem;
	      if(ie && ie <= 9 && this.options.tag == 'tr') {
	        var div = document.createElement('div'), last;
	        div.innerHTML = '<table><tbody>' + data + '</tbody></table>';
	        while((last = content_elem.lastChild)) {
	          content_elem.removeChild(last);
	        }
	        var rows_nodes = this.getChildNodes(div.firstChild.firstChild);
	        while (rows_nodes.length) {
	          content_elem.appendChild(rows_nodes.shift());
	        }
	      } else {
	        content_elem.innerHTML = data;
	      }
	    },
	    getChildNodes: function(tag) {
	        var child_nodes = tag.children, nodes = [];
	        for (var i = 0, ii = child_nodes.length; i < ii; i++) {
	            nodes.push(child_nodes[i]);
	        }
	        return nodes;
	    },
	    checkChanges: function(type, value, cache) {
	      var changed = value != cache[type];
	      cache[type] = value;
	      return changed;
	    }
	  }

	  // support functions
	  function on(evt, element, fnc) {
	    return element.addEventListener ? element.addEventListener(evt, fnc, false) : element.attachEvent("on" + evt, fnc);
	  }
	  function off(evt, element, fnc) {
	    return element.removeEventListener ? element.removeEventListener(evt, fnc, false) : element.detachEvent("on" + evt, fnc);
	  }
	  function isArray(arr) {
	    return Object.prototype.toString.call(arr) === '[object Array]';
	  }
	  function getStyle(prop, elem) {
	    return window.getComputedStyle ? window.getComputedStyle(elem)[prop] : elem.currentStyle[prop];
	  }

	  return Clusterize;
	}));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _flatten = __webpack_require__(4);

	var _flatten2 = _interopRequireDefault(_flatten);

	var _node = __webpack_require__(6);

	var _node2 = _interopRequireDefault(_node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// IE8 compatibility output
	module.exports = {
	    flatten: _flatten2['default'],
	    Node: _node2['default']
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extend = __webpack_require__(5);

	var _extend2 = _interopRequireDefault(_extend);

	var _node = __webpack_require__(6);

	var _node2 = _interopRequireDefault(_node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// @param {object|array} nodes The tree nodes
	// @param {object} [options] The options object
	// @param {boolean} [options.openAllNodes] True to open all nodes. Defaults to false.
	// @param {array} [options.openNodes] An array that contains the ids of open nodes
	// @return {array}
	var flatten = function flatten() {
	    var nodes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    nodes = [].concat(nodes);

	    var flatten = [];
	    var stack = [];
	    var pool = {
	        lastChild: {}
	    };

	    options.openAllNodes = !!options.openAllNodes;
	    options.openNodes = options.openNodes || [];
	    options.throwOnError = !!options.throwOnError;

	    {
	        // root node
	        var firstNode = nodes.length > 0 ? nodes[0] : null;
	        var parentNode = firstNode ? firstNode.parent : null;
	        if (parentNode && !(parentNode instanceof _node2['default'])) {
	            parentNode = new _node2['default'](parentNode);
	        }
	        var rootNode = parentNode || new _node2['default']({ // defaults
	            label: '',
	            parent: null,
	            children: nodes,
	            state: {
	                depth: -1,
	                open: true, // always open
	                path: '',
	                prefixMask: '',
	                total: 0
	            }
	        });

	        if (rootNode === parentNode) {
	            var subtotal = rootNode.state.total || 0;

	            // Traversing up through its ancestors
	            var p = rootNode;
	            while (p) {
	                var _p$state = p.state;
	                var path = _p$state.path;
	                var _p$state$total = _p$state.total;
	                var total = _p$state$total === undefined ? 0 : _p$state$total;

	                // Rebuild the lastChild pool

	                if (p.isLastChild() && path) {
	                    pool.lastChild[path] = true;
	                }

	                // Subtract the number 'subtotal' from the total of the root node and all its ancestors
	                p.state.total = total - subtotal;
	                if (p.state.total < 0) {
	                    if (options.throwOnError) {
	                        throw new Error('The node might have been corrupted: id=' + JSON.stringify(p.id) + ', state=' + JSON.stringify(p.state));
	                    } else {
	                        console && console.log('Error: The node might have been corrupted: id=%s, label=%s, parent=%s, children=%s, state=%s', JSON.stringify(p.id), JSON.stringify(p.label), p.parent, p.children, JSON.stringify(p.state));
	                    }
	                }

	                p = p.parent;
	            }
	        }

	        stack.push([rootNode, rootNode.state.depth, 0]);
	    }

	    while (stack.length > 0) {
	        var _stack$pop = stack.pop();

	        var _stack$pop2 = _slicedToArray(_stack$pop, 3);

	        var current = _stack$pop2[0];
	        var depth = _stack$pop2[1];
	        var index = _stack$pop2[2];

	        var _loop = function _loop() {
	            var node = current.children[index];
	            if (!(node instanceof _node2['default'])) {
	                node = new _node2['default'](node);
	            }
	            node.parent = current;
	            node.children = node.children || [];

	            // Ensure parent.children[index] is equal to the current node
	            node.parent.children[index] = node;

	            var path = current.state.path + '.' + index;
	            var open = node.hasChildren() && function () {
	                var openAllNodes = options.openAllNodes;
	                var openNodes = options.openNodes;

	                if (openAllNodes) {
	                    return true;
	                }
	                // determine by node object
	                if (openNodes.indexOf(node) >= 0) {
	                    return true;
	                }
	                // determine by node id
	                if (openNodes.indexOf(node.id) >= 0) {
	                    return true;
	                }
	                return false;
	            }();
	            var prefixMask = function (prefix) {
	                var mask = '';
	                while (prefix.length > 0) {
	                    prefix = prefix.replace(/\.\d+$/, '');
	                    if (!prefix || pool.lastChild[prefix]) {
	                        mask = '0' + mask;
	                    } else {
	                        mask = '1' + mask;
	                    }
	                }
	                return mask;
	            }(path);

	            if (node.isLastChild()) {
	                pool.lastChild[path] = true;
	            }

	            // This allows you to put extra information to node.state
	            node.state = (0, _extend2['default'])({}, node.state, {
	                depth: depth + 1,
	                open: open,
	                path: path,
	                prefixMask: prefixMask,
	                total: 0
	            });

	            var parentDidOpen = true;

	            {
	                // Check the open state from its ancestors
	                var _p = node;
	                while (_p.parent !== null) {
	                    if (_p.parent.state.open === false) {
	                        parentDidOpen = false;
	                        break;
	                    }
	                    _p = _p.parent;
	                }
	            }

	            if (parentDidOpen) {
	                // Push the node to flatten list only if all of its parent nodes have the open state set to true
	                flatten.push(node);

	                // Update the total number of visible child nodes
	                var _p2 = node;
	                while (_p2.parent !== null) {
	                    _p2.parent.state.total++;
	                    _p2 = _p2.parent;
	                }
	            }

	            ++index;

	            if (node.hasChildren()) {
	                // Push back parent node to the stack that will be able to continue
	                // the next iteration once all the child nodes of the current node
	                // have been completely explored.
	                stack.push([current, depth, index]);

	                index = 0;
	                depth = depth + 1;
	                current = node;
	            }
	        };

	        while (index < current.children.length) {
	            _loop();
	        }
	    }

	    return flatten;
	};

	// IE8 compatibility output
	module.exports = flatten;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var extend = function extend(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	    }

	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	    }

	    var output = Object(target);
	    for (var index = 0; index < sources.length; index++) {
	        var source = sources[index];
	        if (source !== undefined && source !== null) {
	            for (var key in source) {
	                if (source.hasOwnProperty(key)) {
	                    output[key] = source[key];
	                }
	            }
	        }
	    }
	    return output;
	};

	// IE8 compatibility output
	module.exports = extend;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extend = __webpack_require__(5);

	var _extend2 = _interopRequireDefault(_extend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = function () {
	    function Node(node) {
	        _classCallCheck(this, Node);

	        this.id = null;
	        this.label = '';
	        this.parent = null;
	        this.children = [];
	        this.state = {};

	        (0, _extend2['default'])(this, node);

	        this.children = this.children || [];
	    }
	    // Gets a child node at the specified index.
	    // @param {number} The index of the child node.
	    // @return {object} Returns an object that defines the node, null otherwise.


	    _createClass(Node, [{
	        key: 'getChildAt',
	        value: function getChildAt(index) {
	            var node = null;
	            if (this.children.length > 0 && index >= 0 && index < this.children.length) {
	                node = this.children[index];
	            }
	            return node;
	        }
	        // Gets the child nodes.
	        // @return {array} Returns an array of objects that define the nodes.

	    }, {
	        key: 'getChildren',
	        value: function getChildren() {
	            return this.children;
	        }
	        // Gets the first child node.
	        // @return {object} Returns an object that defines the node, null otherwise.

	    }, {
	        key: 'getFirstChild',
	        value: function getFirstChild() {
	            var node = null;
	            if (this.children.length > 0) {
	                node = this.children[0];
	            }
	            return node;
	        }
	        // Gets the last child node.
	        // @return {object} Returns an object that defines the node, null otherwise.

	    }, {
	        key: 'getLastChild',
	        value: function getLastChild() {
	            var node = null;
	            if (this.children.length > 0) {
	                node = this.children[this.children.length - 1];
	            }
	            return node;
	        }
	        // Gets the next sibling node.
	        // @return {object} Returns an object that defines the node, null otherwise.

	    }, {
	        key: 'getNextSibling',
	        value: function getNextSibling() {
	            var node = null;
	            if (this.parent) {
	                var index = this.parent.children.indexOf(this);
	                if (index >= 0 && index < this.parent.children.length - 1) {
	                    node = this.parent.children[index + 1];
	                }
	            }
	            return node;
	        }
	        // Gets the parent node.
	        // @return {object} Returns an object that defines the node, null otherwise.

	    }, {
	        key: 'getParent',
	        value: function getParent() {
	            return this.parent;
	        }
	        // Gets the previous sibling node.
	        // @return {object} Returns an object that defines the node, null otherwise.

	    }, {
	        key: 'getPreviousSibling',
	        value: function getPreviousSibling() {
	            var node = null;
	            if (this.parent) {
	                var index = this.parent.children.indexOf(this);
	                if (index > 0 && index < this.parent.children.length) {
	                    node = this.parent.children[index - 1];
	                }
	            }
	            return node;
	        }
	        // Checks whether this node has children.
	        // @return {boolean} Returns true if the node has children, false otherwise.

	    }, {
	        key: 'hasChildren',
	        value: function hasChildren() {
	            return this.children.length > 0;
	        }
	        // Checks whether this node is the last child of its parent.
	        // @return {boolean} Returns true if the node is the last child of its parent, false otherwise.

	    }, {
	        key: 'isLastChild',
	        value: function isLastChild() {
	            var hasNextSibling = this.getNextSibling();
	            return !hasNextSibling;
	        }
	    }]);

	    return Node;
	}();

	// IE8 compatibility output


	module.exports = Node;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LookupTable = function () {
	    function LookupTable() {
	        _classCallCheck(this, LookupTable);

	        this.data = {};
	    }

	    _createClass(LookupTable, [{
	        key: "clear",
	        value: function clear() {
	            this.data = {};
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this.data[key];
	        }
	    }, {
	        key: "has",
	        value: function has(key) {
	            return this.data[key] !== undefined;
	        }
	    }, {
	        key: "set",
	        value: function set(key, value) {
	            this.data[key] = value;
	            return value;
	        }
	    }, {
	        key: "unset",
	        value: function unset(key) {
	            if (this.data[key] !== undefined) {
	                delete this.data[key];
	            }
	        }
	    }]);

	    return LookupTable;
	}();

	// IE8 compatibility output


	module.exports = LookupTable;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(9);

	var defaultRowRenderer = function defaultRowRenderer(node) {
	    var id = node.id;
	    var label = node.label;
	    var children = node.children;
	    var state = node.state;
	    var depth = state.depth;
	    var open = state.open;
	    var path = state.path;
	    var total = state.total;
	    var _state$selected = state.selected;
	    var selected = _state$selected === undefined ? false : _state$selected;

	    var childrenLength = Object.keys(children).length;
	    var more = node.hasChildren();

	    var togglerContent = '';
	    if (more && open) {
	        togglerContent = '▼';
	    }
	    if (more && !open) {
	        togglerContent = '►';
	    }
	    var toggler = (0, _utils.buildHTML)('a', togglerContent, {
	        'class': function () {
	            if (more && open) {
	                return (0, _utils.classNames)('tree-toggler');
	            }
	            if (more && !open) {
	                return (0, _utils.classNames)('tree-toggler', 'tree-closed');
	            }
	            return '';
	        }()
	    });
	    var title = (0, _utils.buildHTML)('span', (0, _utils.quoteattr)(label), {
	        'class': (0, _utils.classNames)('tree-title')
	    });
	    var treeNode = (0, _utils.buildHTML)('div', toggler + title, {
	        'class': 'tree-node',
	        'style': 'margin-left: ' + depth * 18 + 'px'
	    });
	    var treeItem = (0, _utils.buildHTML)('div', treeNode, {
	        'aria-id': id,
	        'aria-expanded': more && open,
	        'aria-depth': depth,
	        'aria-path': path,
	        'aria-selected': selected,
	        'aria-children': childrenLength,
	        'aria-total': total,
	        'class': (0, _utils.classNames)('tree-item', { 'tree-selected': selected })
	    });

	    return treeItem;
	};

	// IE8 compatibility output
	module.exports = {
	    defaultRowRenderer: defaultRowRenderer
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Example #1:
	 * =========================================================================
	 * <a id="mymail href="http://mymail.example.com">My Mail</a>
	 *
	 * buildHTML('a', 'My Mail', {
	 *     id: 'mymail',
	 *     href: 'http://mymail.example.com'
	 * });
	 *
	 * Example #2:
	 * =========================================================================
	 * <input id="myinput" type="text" value="myvalue" />
	 *
	 * buildHTML('input', {
	 *   id: 'myinput',
	 *   type: 'text',
	 *   value: 'myvalue'
	 * });
	 *
	 */
	var buildHTML = function buildHTML(tag, html, attrs) {
	    switch (tag) {
	        case 'select':
	            if ((typeof html === 'undefined' ? 'undefined' : _typeof(html)) === 'object') {
	                var options = html || {};
	                html = '';
	                for (var value in options) {
	                    if (!options.hasOwnProperty(value)) {
	                        continue;
	                    }
	                    html += buildHTML('option', options[value] || '', { value: value });
	                }
	            }
	            break;

	        default:
	            if ((typeof html === 'undefined' ? 'undefined' : _typeof(html)) === 'object') {
	                attrs = html;
	                html = undefined;
	            }
	            break;
	    }

	    var h = '<' + tag;
	    for (var attr in attrs) {
	        if (!attrs.hasOwnProperty(attr)) {
	            continue;
	        }
	        if (typeof attrs[attr] !== 'undefined') {
	            h += ' ' + attr + '="' + quoteattr(attrs[attr]) + '"';
	        }
	    }
	    h += typeof html !== 'undefined' ? '>' + html + '</' + tag + '>' : '/>';

	    return h;
	};

	var classNames = function classNames() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    var classNames = [];
	    args.forEach(function (arg) {
	        if (Array.isArray(arg)) {
	            classNames = classNames.concat(arg);
	        } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
	            Object.keys(arg).forEach(function (className) {
	                var ok = arg[className];
	                if (!!ok) {
	                    classNames.push(className);
	                }
	            });
	        } else {
	            classNames.push(arg);
	        }
	    });
	    return classNames.join(' ');
	};

	/**
	 * The quoteattr() function is used in a context, where the result will not be evaluated by javascript but must be interpreted by an XML or HTML parser, and it must absolutely avoid breaking the syntax of an element attribute.
	 */
	var quoteattr = function quoteattr(s, preserveCR) {
	    preserveCR = preserveCR ? '&#13;' : '\n';
	    return ('' + s). /* Forces the conversion to string. */
	    replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
	    .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
	    .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
	    /*
	     * You may add other replacements here for HTML only
	     * (but it's not necessary).
	     * Or for XML, only if the named entities are defined in its DTD.
	     */
	    .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
	    .replace(/[\r\n]/g, preserveCR);
	};

	// IE8 compatibility output
	module.exports = {
	    buildHTML: buildHTML,
	    classNames: classNames,
	    quoteattr: quoteattr
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var preventDefault = function preventDefault(e) {
	    if (typeof e.preventDefault !== 'undefined') {
	        e.preventDefault();
	    } else {
	        e.returnValue = false;
	    }
	};

	var stopPropagation = function stopPropagation(e) {
	    if (typeof e.stopPropagation !== 'undefined') {
	        e.stopPropagation();
	    } else {
	        e.cancelBubble = true;
	    }
	};

	// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Compatibility
	var addEventListener = function addEventListener(target, type, listener) {
	    if (target.addEventListener) {
	        // Standard
	        target.addEventListener(type, listener, false);
	    } else if (target.attachEvent) {
	        // IE8
	        // In Internet Explorer versions before IE 9, you have to use attachEvent rather than the standard addEventListener.
	        target.attachEvent('on' + type, listener);
	    }
	};

	// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
	var removeEventListener = function removeEventListener(target, type, listener) {
	    if (target.removeEventListener) {
	        // Standard
	        target.removeEventListener(type, listener, false);
	    } else if (target.detachEvent) {
	        // IE8
	        // In Internet Explorer versions before IE 9, you have to use detachEvent rather than the standard removeEventListener.
	        target.detachEvent('on' + type, listener);
	    }
	};

	// IE8 compatibility output
	module.exports = {
	    preventDefault: preventDefault,
	    stopPropagation: stopPropagation,
	    addEventListener: addEventListener,
	    removeEventListener: removeEventListener
	};

/***/ }
/******/ ])
});
;