import VisualizerTreeNode, { VisualizerNodeLeaf } from "../visualizer/visualizer-tree";

export class BTreeNode {
    constructor(isLeaf) {
        /**
         * @type {number[]} list of values in the node
        */
        this.values = [];
        /**
         * @type {boolean} is a leaf
        */
        this.leaf = isLeaf;
        /**
         * @type {BTreeNode[]}
        */
        this.children = [];
    }

    /**
     * Number of values
     * @returns {number}
     */
    get n() {
        return this.values.length;
    }

    /**
     * Add value
     * @param {number} value 
     * @param {number} pos 
     */
    addValue(value) {
        if (value) {
            let pos = 0;
            while (pos < this.n && this.values[pos] < value) {
                pos++;
            }
            this.values.splice(pos, 0, value);
        }
    }

    /**
     * Delete value and return it
     * @param {number} pos position
     * @return {number}
     */
    removeValue(pos) {
        if (pos >= this.n) {
            return null;
        }
        return this.values.splice(pos, 1)[0];
    }

    /**
     * Add child node at position pos
     * @param {BTreeNode} node 
     * @param {number} pos 
     */
    addChild(node, pos) {
        this.children.splice(pos, 0, node);
    }
    /**
     * Delete node from position and return it
     * @param {number} pos 
     * @return {BTreeNode}
     */
    deleteChild(pos) {
        return this.children.splice(pos, 1)[0];
    }
}

/**
 * btree namespace.
 * @type {BTree}
 */
export default class BTree {
    constructor(order) {
        /** @type {number} */
        this.order = order;
        /** 
         * Root node of the tree.
         * @type {BTreeNode} 
        */
        this.root;
    }

    /**
     * Insert a new value in the tree
     * @param {number} value 
     */
    insert(value) {
        const actual = this.root;
        if (actual.n === this.order + 1) {
            const temp = new BTreeNode(false);
            this.root = temp;
            temp.addChild(actual, temp.children.length - 1);
            this.split(actual, temp, 1);
            this.insertNonFull(temp, parseInt(value));
        } else {
            this.insertNonFull(actual, parseInt(value));
        }
    };
    
    /**
     * Divide child node from parent into parent.values[pos-1] and parent.values[pos]
     * @param {BTreeNode} child 
     * @param {BTreeNode} parent 
     * @param {number} pos 
     */
    split(child, parent, pos) {
        const newChild = new BTreeNode(child.leaf);
        // Create a new child for the parent
        // Trasspass values from the old child to the new
        for (let k = 1; k < this.order; k++) {
            newChild.addValue(child.removeValue(this.order));
        }
        // Trasspass child nodes from the old child to the new
        if (!child.leaf) {
            for (let k = 1; k <= this.order; k++) {
                newChild.addChild(child.deleteChild(this.order), k - 1);
            }
        }
        // Add new child to the parent
        parent.addChild(newChild, pos);
        // Add traspassed value to parent
        parent.addValue(child.removeValue(this.order - 1));
        parent.leaf = false;
    }

    /**
     * Insert a value in a not-full node
     * @param {BTreeNode} node 
     * @param {number} value 
     */
    insertNonFull(node, value) {
        let temp = node.n;
        if (node.leaf) {
            node.addValue(value);
        } else {
            while (temp >= 1 && value < node.values[temp - 1]) {
                temp = temp - 1;
            }
            if (node.children[temp].n === 2 * this.order - 1) {
                this.split(node.children[temp], node, temp + 1);
                if (value  > node.values[temp]) {
                    temp = temp + 1;
                }
            }
            this.insertNonFull(node.children[temp], value);
        }
    }

    /**
     * Creates a VisualizerTreeNode
     * @param {BTreeNode} node 
     * @returns {VisualizerTreeNode}
    */
    toJSON(node = this.root) {
        const structure = new VisualizerTreeNode();
        structure.leaves = new VisualizerNodeLeaf();
        for (let i = 0; i < node.n; i++) {
            structure.leaves.addKey(node.values[i]);
        }
        structure.children = node.children.map((node) => this.toJSON(node));
        return structure;
    }           
    
}
