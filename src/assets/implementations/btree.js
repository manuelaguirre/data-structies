import VisualizerTreeNode, { VisualizerNodeLeaf } from "../visualizer/visualizer-tree";
import Sequence, { Frame } from "../visualizer/frame";

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
        /**
         * Reference to the tree its belong.
         * @type {BTree}
         */
        this.tree = null;
    }

    /**
     * Number of values
     * @returns {number}
     */
    get n() {
        return this.values.length;
    }

    /**
     * Add value. Add frames to the given sequence
     * @param {number} value 
     * @param {Sequence} sequence 
     * @param {number} pos 
     */
    addValue(value, sequence) {
        if (!value) {
            return;
        }
        let pos = 0;
        // Add frame fot each value compared
        if (this.n > 0 && sequence) {
            sequence.addFrame(new Frame(this.tree.toJSON(this.tree.root, [this.values[pos]])));
        }
        while (pos < this.n && this.values[pos] < value) {
            pos++;
            if (pos < this.n && sequence) {
                sequence.addFrame(new Frame(this.tree.toJSON(this.tree.root, [this.values[pos]])));
            }
        }
        this.values.splice(pos, 0, value);
        if (sequence) {
            sequence.addFrame(new Frame(this.tree.toJSON(this.tree.root, [this.values[pos]])));
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
     * Insert a new value in the tree O(log N)
     * Return Sequence with Frame array to visualize the operation
     * @param {number} value
     * @returns {Sequence}
     */
    insert(value) {
        const sequence = new Sequence();
        const actual = this.root;
        if (actual.n > 1) {
            // Insert frame with the whole node highlighted
            sequence.addFrame(new Frame(this.toJSON(this.root, actual.values)));
        }
        if (actual.n === this.order + 1) {
            const temp = new BTreeNode(false);
            temp.tree = this.root.tree;
            this.root = temp;
            temp.addChild(actual, 0);
            this.split(actual, temp, 1, sequence);
            this.insertNonFull(temp, parseInt(value), sequence);
        } else {
            this.insertNonFull(actual, parseInt(value), sequence);
        }
        // Insert last fram with no highlight
        sequence.addFrame(new Frame(this.toJSON(this.root)));
        return sequence;
    };
    
    /**
     * Divide child node from parent into parent.values[pos-1] and parent.values[pos]
     * @param {BTreeNode} child 
     * @param {BTreeNode} parent 
     * @param {number} pos 
     * @param {Sequence} sequence 
     */
    split(child, parent, pos, sequence) {
        const newChild = new BTreeNode(child.leaf);
        newChild.tree = this.root.tree;
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
        const parentValue = child.removeValue(this.order - 1);
        console.log(parentValue);
        parent.addValue(parentValue);
        // Highlight the splitted nodes
        const values = [];
        values.push(...child.values);
        values.push(...newChild.values);
        values.push(parentValue);
        sequence.addFrame(new Frame(this.toJSON(this.root, values)));
        parent.leaf = false;
    }

    /**
     * Insert a value in a not-full node. Add frames to the given sequence
     * @param {BTreeNode} node 
     * @param {number} value 
     * @param {Sequence} sequence 
     */
    insertNonFull(node, value, sequence) {
        let temp = node.n;
        if (node.leaf) {
            node.addValue(value, sequence);
        } else {
            while (temp >= 1 && value < node.values[temp - 1]) {
                // Insert frame for each value compared
                sequence.addFrame(new Frame(this.toJSON(this.root, [node.values[temp - 1]])));
                temp = temp - 1;
            }
            // Highlight next node
            sequence.addFrame(new Frame(this.toJSON(this.root, node.children[temp].values)));
            if (node.children[temp].n === 2 * this.order - 1) {
                this.split(node.children[temp], node, temp + 1, sequence);
                if (value  > node.values[temp]) {
                    temp = temp + 1;
                    // Highlight next node
                    sequence.addFrame(new Frame(this.toJSON(this.root, node.children[temp].values)));
                }
            }
            this.insertNonFull(node.children[temp], value, sequence);
        }
    }

    /**
     * Creates a VisualizerTreeNode
     * @param {BTreeNode} node 
     * @returns {VisualizerTreeNode}
    */
    toJSON(node, highlight=[]) {
        const structure = new VisualizerTreeNode();
        structure.leaves = new VisualizerNodeLeaf();
        console.log(highlight);
        for (let i = 0; i < node.n; i++) {
            const highlighted = highlight.includes(node.values[i]);
            structure.leaves.addKey(node.values[i], highlighted);
        }
        structure.children = node.children.map((node) => this.toJSON(node, highlight));
        return structure;
    }           
    
}
