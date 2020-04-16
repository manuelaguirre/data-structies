/**
 * Constructs a new Tree.
 * @class A Tree.
 * @constructor
*/
export default class Tree {
    constructor() {
        this.root = new TreeNode(this);
        this.minOrder = 0;
        this.order = 0;
    }

    /**
     * Compares two numbers.
     * @param {number} a
     * @param {number} b
     * @returns {number} -1 if a < b, 1 if a > b, 0 otherwise
     * @expose
     */
    compare(numA, numB) {}

    /**
        * Inserts a key/value pair into the tree.
        * @param {!*} key
        * @param {*} value
        * @param {boolean=} overwrite Whether to overwrite existing values, defaults to `true`
        * @returns {boolean} true if set, false if already present and overwrite is `false`
        * @throws {Error} If the key is undefined or null or the value is undefined
        * @expose
    */
    put(key, value, overwrite) {
        if (typeof key === 'undefined' || key === null)  throw(new Error("Illegal key: "+key));
        if (typeof value === 'undefined') throw(new Error("Illegal value: "+value));
        return this.root.put(key, value, overwrite);
    };
    
    /**
     * Gets the value of the specified key.
     * @param {!*} key
     * @returns {*|undefined} If there is no such key, undefined is returned
     * @throws {Error} If the key is undefined or null
     * @expose
     */
    get(key) {
        if (typeof key === 'undefined' || key === null)  throw(new Error("Illegal key: "+key));
        return this.root.get(key);
    };
    
    /**
     * Deletes a key from the tree.
     * @param {!*} key
     * @returns {boolean} true if the key has been deleted, false if the key does not exist
     * @expose
     */
    del(key) {
        if (typeof key === 'undefined' || key === null)  throw(new Error("Illegal key: "+key));
        return this.root.del(key);
    };

    /**
     * Walks through all keys [minKey, ..., maxKey] in ascending order.
     * @param {*|function(*, *):(boolean|undefined)} minKey If omitted or NULL, starts at the beginning
     * @param {(*|function(*, *):(boolean|undefined))=} maxKey If omitted or NULL, walks till the end
     * @param {function(*, *):(boolean|undefined)=} callback Callback receiving the key and the corresponding value as its
     *  parameters. May explicitly return true to stop the loop.
     * @expose
     */
    walkAsc(minKey, maxKey, callback) {
        if (this.root.leaves.length == 0) {
            return;
        }
        if (typeof minKey == 'function') {
            callback = minKey;
            minKey = maxKey = null;
        } else if (typeof maxKey == 'function') {
            callback = maxKey;
            maxKey = null;
        }
        minKey = typeof minKey != 'undefined' ? minKey : null;
        maxKey = typeof maxKey != 'undefined' ? maxKey : null;
        var ptr, index;
        if (minKey === null) { // If there is no minimum limit
            ptr = this.root; // set ptr to the outer left node
            while (ptr.nodes[0] !== null) {
                ptr = ptr.nodes[0];
            }
            index = 0; // and start at its first leaf
        } else { // Else lookup
            var result = this.root.search(minKey);
            if (result.leaf) { // If the minimum key itself exists
                ptr = result.leaf.parent; // set ptr to the containing node
                index = this.asearch(ptr.leaves, result.leaf); // and start at its index
            } else { // If the key does not exist
                ptr = result.node; // set ptr to the insertion node
                index = result.index; // and start at the insertion index (key > minKey)
                if (index >= ptr.leaves.length) { // on overrun, begin at the separator in the parent
                    if (ptr.parent instanceof Tree) {
                        return; // empty range
                    }
                    index = this.asearch(ptr.parent.nodes, ptr);
                    if (index >= ptr.parent.leaves.length) {
                        return; // empty range
                    }
                    ptr = ptr.parent;
                }
            }
        }
        // ptr/index now points at our first result
        while (true) {
            if (maxKey !== null && this.compare(ptr.leaves[index].key, maxKey) > 0) {
                break; // if there are no more keys less than maxKey
            }
            if (callback(ptr.leaves[index].key, ptr.leaves[index].value)) {
                break; // if the user explicitly breaks the loop by returning true
            }
            if (ptr.nodes[index+1] !== null) { // Descend
                ptr = ptr.nodes[index+1];
                index = 0;
                while (ptr.nodes[0] !== null) {
                    ptr = ptr.nodes[0];
                }
            } else if (ptr.leaves.length > index+1) { // Next
                index++;
            } else { // Ascend
                do {
                    if ((ptr.parent instanceof Tree)) {
                        return;
                    }
                    index = this.asearch(ptr.parent.nodes, ptr);
                    ptr = ptr.parent;
                } while (index >= ptr.leaves.length);
            }
        }
    };
    
    /**
     * Walks through all keys [minKey, ..., maxKey] in descending order.
     * @param {*|function(*, *):(boolean|undefined)} minKey If omitted or null, walks till the beginning
     * @param {(*|function(*, *):(boolean|undefined))=} maxKey If omitted or null, starts at the end
     * @param {function(*, *):(boolean|undefined)=} callback Callback receiving the key and the corresponding value as its
     *  parameters. May explicitly return true to stop the loop.
     * @expose
     */
    walkDesc(minKey, maxKey, callback) {
        if (typeof minKey == 'function') {
            callback = minKey;
            minKey = maxKey = null;
        } else if (typeof maxKey == 'function') {
            callback = maxKey;
            maxKey = null;
        }
        minKey = typeof minKey != 'undefined' ? minKey : null;
        maxKey = typeof maxKey != 'undefined' ? maxKey : null;
        var ptr, index;
        if (maxKey === null) { // If there is no maximum limit
            ptr = this.root; // set ptr to the outer right node
            while (ptr.nodes[ptr.nodes.length-1] !== null) {
                ptr = ptr.nodes[ptr.nodes.length-1];
            }
            index = ptr.leaves.length-1; // and start at its last leaf
        } else { // Else lookup
            var result = this.root.search(maxKey);
            if (result.leaf) { // If the maximum key itself exists
                ptr = result.leaf.parent; // set ptr to the containing node
                index = asearch(ptr.leaves, result.leaf); // and start at its index
            } else { // If the key does not exist
                ptr = result.node; // set ptr to the insertion node
                index = result.index-1; // and start at the insertion index-1 (key < maxKey)
                while (index < 0) { // on underrun, begin at the separator in the parent
                    if (ptr.parent instanceof Tree) {
                        return; // empty range
                    }
                    index = asearch(ptr.parent.nodes, ptr)-1;
                    if (index < 0) {
                        return; // empty range
                    }
                    ptr = ptr.parent;
                }
            }
        }
        // ptr/index now points at our first result
        while (true) {
            if (minKey !== null && this.compare(ptr.leaves[index].key, minKey) < 0) {
                break; // if there are no more keys bigger than minKey
            }
            if (callback(ptr.leaves[index].key, ptr.leaves[index].value)) {
                break; // if the user explicitly breaks the loop by returning true
            }
            if (ptr.nodes[index] !== null) { // Descend
                ptr = ptr.nodes[index];
                while (ptr.nodes[ptr.nodes.length-1] !== null) {
                    ptr = ptr.nodes[ptr.nodes.length-1];
                }
                index = ptr.leaves.length-1;
            } else if (index > 0) { // Next
                index--;
            } else { // Ascend
                do {
                    if ((ptr.parent instanceof Tree)) {
                        return;
                    }
                    index = asearch(ptr.parent.nodes, ptr)-1;
                    ptr = ptr.parent;
                } while (index < 0);
            }
        }
    };

    /**
     * Counts the number of keys between minKey and maxKey (both inclusive).
     * @param {*=} minKey If omitted, counts from the start
     * @param {*=} maxKey If omitted, counts till the end
     * @returns {number}
     * @expose
     */
    count(minKey, maxKey) {
        var n = 0;
        this.walk(
            typeof minKey != 'undefined' ? minKey : null,
            typeof maxKey != 'undefined' ? maxKey : null,
            function(key, value) { n++; }
        );
        return n;
    };

    /**
     * Prints out all nodes in the tree.
     * @expose
     */
    print() {
        this.root.print(0);
    }

    /**
     * Returns a string representation of this instance.
     * @returns {string}
     */
    toString() {
        return "Tree("+this.order+") " + this.root.toString(true);
    }

    /**
     * Returns an object representation of this instance.
     * @returns {string}
     */
    toJSON() {
        return this.root.toJSON();
    }
};

/**
 * Constructs a new Leaf containing a value.
 * @class A Leaf.
 * @param {!TreeNode} parent
 * @param {!*} key
 * @param {*} value
 * @constructor
 */
export class Leaf {
    constructor(parent, key, value) {
        /**
         * Parent node.
         * @type {!TreeNode}
         */
        this.parent = parent;
        
        /**
         * Key.
         * @type {!*}
         */
        this.key = key;
    
        /**
         * Value.
         * @type {*}
         */
        this.value = value;
    }
    
    /**
     * Returns a string representation of this instance.
     * @returns {string}
     */
    toString() {
        return "" + this.key;
    }

    /**
     * Concatenates multiple arrays into a new one.
     * @param {...[Array]} var_args
     * @returns {Array}
     * @private
     */
    concat(var_args) {
        // Array#concat behaves strangely for empty arrays, so...
        var a = [];
        for (var i=0; i < var_args.length; i++) {
            Array.prototype.push.apply(a, var_args[i]);
        }
        return a;
    }

    /**
     * Searches an array for the specified value.
     * @param {Array} a
     * @param {*} v
     * @returns {number} Index or -1 if not found
     * @private
     */
    asearch(a, v) {
        // This is faster than Array#indexOf because it's raw. However, we
        // cannot use binary search because nodes do not have a comparable
        // key. If the compiler is smart, it will inline this.
        for (var i=0; i<a.length; i++) {
            if (a[i] === v) return i;
        }
        return -i;
    }
}

/**
 * Constructs a new TreeNode.
 * @class A TreeNode.
 * @param {!(TreeNode|Tree)} parent Parent node
 * @param {Array.<!Leaf>=} leaves Leaf nodes
 * @param {Array.<TreeNode>=} nodes Child nodes
 * @constructor
 */
export class TreeNode {
    constructor(parent, leaves, nodes) {
        /**
         * Parent node.
         * @type {!TreeNode|!Tree}
         */
        this.parent = parent;

        /**
         * Leaf nodes (max. order).
         * @type {!Array.<!Leaf>}
         */
        this.leaves = leaves || [];
        this.leaves.forEach(function(leaf) {
            leaf.parent = this;
        }, this);

        /**
         * Child nodes (max. order+1).
         * @type {!Array.<TreeNode>}
         */
        this.nodes = nodes || [null];
        this.nodes.forEach(function(node) {
            if (node !== null) node.parent = this;
        }, this);
    }

    compare(numA, numB) {
        let [a, b] = [+numA, +numB];
        return a < b ? -1 : (a > b ? 1 : 0);
    }

    /**
     * Searches for the node that would contain the specified key.
     * @param {!*} key
     * @returns {{leaf: !Leaf, index: number}|{node: !TreeNode, index: number}} Leaf if the key exists, else the insertion node
     */
    search(key) {
        if (this.leaves.length > 0) {
            var a = this.leaves[0];
            if (this.compare(a.key, key) === 0) return { leaf: a, index: 0 };
            if (this.compare(key, a.key) < 0) {
                if (this.nodes[0] !== null) {
                    return this.nodes[0].search(key); // Left
                }
                return { node: this, index: 0 }
            }
            for (var i=1; i<this.leaves.length; i++) {
                var b = this.leaves[i];
                if (this.compare(b.key, key) === 0) return { leaf: b, index: i };
                if (this.compare(key, b.key) < 0) {
                    if (this.nodes[i] !== null) {
                        return this.nodes[i].search(key); // Inner
                    }
                    return { node: this, index: i };
                }
                a = b;
            }
            if (this.nodes[i] !== null) {
                return this.nodes[i].search(key); // Right
            }
            return { node: this, index: i };
        }
        return { node: this, index: 0 };
    };

    /**
     * Gets the value for the given key.
     * @param {!*} key
     * @returns {*|undefined} If there is no such key, undefined is returned
     */
    get(key) {
        var result = this.search(key);
        if (result.leaf) return result.leaf.value;
        return undefined;
    };

    /**
     * Inserts a key/value pair into this node.
     * @param {!*} key
     * @param {*} value
     * @param {boolean=} overwrite Whether to overwrite existing values, defaults to `true`
     * @returns {boolean} true if successfully set, false if already present and overwrite is `false`
     */
    put(key, value, overwrite) {
        var result = this.search(key);
        if (result.leaf) {
            if (typeof overwrite !== 'undefined' && !overwrite) {
                return false;
            }
            result.leaf.value = value;
            return true;
        } // Key already exists
        var node = result.node,
            index = result.index;
        node.leaves.splice(index, 0, new Leaf(node, key, value));
        node.nodes.splice(index+1, 0, null);
        if (node.leaves.length > this.order) { // Rebalance
            node.split();
        }
        return true;
    };

    /**
     * Deletes a key from this node.
     * @param {!*} key
     * @returns {boolean} true if the key has been deleted, false if the key does not exist
     */
    del(key) {
        var result = this.search(key);
        if (!result.leaf) return false;
        var leaf = result.leaf,
            node = leaf.parent,
            index = result.index,
            left = node.nodes[index];
        if (left === null) {
            node.leaves.splice(index, 1);
            node.nodes.splice(index, 1);
            node.balance();
        } else {
            var max = left.leaves[left.leaves.length-1];
            left.del(max.key);
            max.parent = node;
            node.leaves.splice(index, 1, max);
        }
        return true;
    };

    /**
     * Balances this node to fulfill all conditions.
     */
    balance() {
        if (this.parent instanceof Tree) {
            // Special case: Root has just a single child and no leaves
            if (this.leaves.length == 0 && this.nodes[0] !== null) {
                this.parent.root = this.nodes[0];
                this.parent.root.parent = this.parent;
            }
            return;
        }
        if (this.leaves.length >= this.minOrder) {
            return;
        }
        var index = this.asearch(this.parent.nodes, this),
            left = index > 0 ? this.parent.nodes[index-1] : null,
            right = this.parent.nodes.length > index+1 ? this.parent.nodes[index+1] : null;
        var sep, leaf, rest;
        if (right !== null && right.leaves.length > this.minOrder) {
            // Append the seperator from parent to this
            sep = this.parent.leaves[index];
            sep.parent = this;
            this.leaves.push(sep);
            // Replace the blank with the first right leaf
            leaf = right.leaves.shift();
            leaf.parent = this.parent;
            this.parent.leaves[index] = leaf;
            // Append the right rest to this
            rest = right.nodes.shift();
            if (rest !== null) rest.parent = this;
            this.nodes.push(rest);
        } else if (left !== null && left.leaves.length > this.minOrder) {
            // Prepend the seperator from parent to this
            sep = this.parent.leaves[index-1];
            sep.parent = this;
            this.leaves.unshift(sep);
            // Replace the blank with the last left leaf
            leaf = left.leaves.pop();
            leaf.parent = this.parent;
            this.parent.leaves[index-1] = leaf;
            // Prepend the left rest to this
            rest = left.nodes.pop();
            if (rest !== null) rest.parent = this;
            this.nodes.unshift(rest);
        } else {
            var subst;
            if (right !== null) {
                // Combine this + seperator from the parent + right
                sep = this.parent.leaves[index];
                subst = new TreeNode(
                    this.parent,
                    this.concat(this.leaves, [sep], right.leaves),
                    this.concat(this.nodes, right.nodes));
                // Remove the seperator from the parent
                this.parent.leaves.splice(index, 1);
                // And replace the nodes it seperated with subst
                this.parent.nodes.splice(index, 2, subst);
            } else if (left !== null) {
                // Combine left + seperator from parent + this
                sep = this.parent.leaves[index-1];
                subst = new TreeNode(
                    this.parent, 
                    this.concat(left.leaves, [sep], this.leaves),
                    this.concat(left.nodes, this.nodes));
                // Remove the seperator from the parent
                this.parent.leaves.splice(index-1, 1);
                // And replace the nodes it seperated with subst
                this.parent.nodes.splice(index-1, 2, subst);
            } else {
                // We should never end here
                throw(new Error("Internal error: "+this.toString(true)+" has neither a left nor a right sibling"));
            }
            this.parent.balance();
        }
        // validate(this);
        // validate(this.parent);
    };

    /**
     * Unsplits a child.
     * @param {!Leaf} leaf
     * @param {!TreeNode} rest
     */
    unsplit(leaf, rest) {
        leaf.parent = this;
        rest.parent = this;
        var a = this.leaves[0];
        if (this.compare(leaf.key, a.key) < 0) {
            this.leaves.unshift(leaf);
            this.nodes.splice(1, 0, rest);
        } else {
            for (var i=1; i<this.leaves.length; i++) {
                var b = this.leaves[i];
                if (this.compare(leaf.key, b.key) < 0) {
                    this.leaves.splice(i, 0, leaf);
                    this.nodes.splice(i+1, 0, rest);
                    break;
                }
            }
            if (i == this.leaves.length) {
                this.leaves.push(leaf);
                this.nodes.push(rest);
            }
        }
        if (this.leaves.length > this.order) {
            this.split();
        }
    };

    /**
     * Splits this node.
     */
    split() {
        var index = Math.floor(this.leaves.length/2);
        if (this.parent instanceof Tree) {
            this.nodes = [
                new TreeNode(this, this.leaves.slice(0, index), this.nodes.slice(0, index+1)),
                new TreeNode(this, this.leaves.slice(index+1), this.nodes.slice(index+1))
            ];
            this.leaves = [this.leaves[index]];
        } else {
            var leaf = this.leaves[index];
            var rest = new TreeNode(this.parent, this.leaves.slice(index+1), this.nodes.slice(index+1));
            this.leaves = this.leaves.slice(0, index);
            this.nodes = this.nodes.slice(0, index+1);
            this.parent.unsplit(leaf, rest);
        }
    }

    /**
     * Returns a string representation of this node.
     * @param {boolean=} includeNodes Whether to include sub-nodes or not
     * @returns {string}
     */
    toString(includeNodes) {
        var val = [];
        for (var i=0; i<this.leaves.length; i++) {
            val.push(this.leaves[i].key);
        }
        var s = "["+val.toString()+"]"+(this.parent instanceof Tree ? ":*" : ":"+this.parent);
        if (includeNodes) {
            for (i=0; i<this.nodes.length; i++) {
                s += " -> "+this.nodes[i];
            }
        }
        return s;
    }

    /**
     * Prints out the nodes leaves and nodes.
     * @param {number} indent
     */
    print(indent) {
        var space = ""; for (var i=0; i<indent; i++) space+=" ";
        for (i=this.leaves.length-1; i>=0; i--) {
            if (this.nodes[i+1] !== null) this.nodes[i+1].print(indent+2);
        }
        if (this.nodes[0] !== null) this.nodes[0].print(indent+2);
    }

    /**
    * Returns the node's entire subtree as a Javascript Object, including keys.
    * @returns {Object}
    */
    toJSON() {
        var val = [];
        for (var i=0; i<this.leaves.length; i++) {
            val.push(this.leaves[i].key);
        }            
        var nodeArray = [];
        if (this.nodes[0] !== null) nodeArray.push(this.nodes[0]);
        for (i=0; i<=this.leaves.length-1; i++) {
            if (this.nodes[i+1] !== null) nodeArray.push(this.nodes[i+1]);               
        }
        var result = {};
        result.leaves = {};
        result.leaves.keys = val;

        result.children = nodeArray.map(n=>n.toJSON()) ;

        return result;           
    }
}

/**
 * Validates a node and prints debugging info if something went wrong.
 * @param {!TreeNode|!Tree} node
 * @private
 */
export function validate(node) { // This function will be stripped by the compiler
    if ((node instanceof Tree)) return;
    if (node.leaves.length+1 != node.nodes.length) {
        console.log("ERROR: Illegal leaf/node count in "+node+": "+node.leaves.length+"/"+node.nodes.length);
    }
    for (var i=0; i<node.leaves.length; i++) {
        if (!node.leaves[i]) {
            console.log("ERROR: Illegal leaf in "+node+" at "+i+": "+node.leaves[i]);
        }
    }
    for (i=0; i<node.nodes.length; i++) {
        if (typeof node.nodes[i] == 'undefined') {
            console.log("ERROR: Illegal node in "+node+" at "+i+": undefined");
        }
    }
}
