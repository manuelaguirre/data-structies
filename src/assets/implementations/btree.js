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
        /**
         * @type {BTreeNode}
        */
        this.parent = null;
        /**
         * @type {number[]} list of highlighted values
        */
        this.highlighted = [];
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
            this.highlighted = [this.values[pos]];
            sequence.addFrame(new Frame(this.tree.toJSON(this.tree.root)));
        }
        while (pos < this.n && this.values[pos] < value) {
            pos++;
            if (pos < this.n && sequence) {
                this.highlighted = [this.values[pos]];
                sequence.addFrame(new Frame(this.tree.toJSON(this.tree.root)));
            }
        }
        this.values.splice(pos, 0, value);
        if (sequence) {
            this.highlighted = [this.values[pos]];
            sequence.addFrame(new Frame(this.tree.toJSON(this.tree.root)));
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
        node.parent = this;
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
     * Search a value in the Tree and return the node. O(log N)
     * @param {number} value 
     * @param {Sequence} sequence 
     * @returns {BTreeNode}
     */
    searchValue(value, sequence) {
        // Find the node that contains the value
        let node = null;
        let actual = this.root;
        while (!node && actual) {
            if (actual.values.includes(parseInt(value))) {
                node = actual;
            } else {
                // Search in the childs
                if (actual.leaf) {
                    // Value was not found
                    actual = null;
                } else {
                    let child = 0;
                    while (child <= actual.n && actual.values[child] < parseInt(value)) {
                        child++; 
                    }
                    actual = actual.children[child];
                    // Insert frame with the whole node highlighted
                    actual.highlighted = [...actual.values];
                    sequence.addFrame(new Frame(this.toJSON(this.root)));
                }
            }
        }
        return node;
    }
    
    /**
     * Deletes the value from the Tree. O(log N)
     * @param {number} value 
     * @returns {Sequence}
     */
    delete(value) {
        const sequence = new Sequence();
        if (this.root.n === 1 && !this.root.leaf &&
            this.root.children[0].n === this.order-1 && this.root.children[1].n === this.order -1) {
            this.root.highlighted = [this.root.values[0]];
            this.root.children[1].highlighted = [this.root.children[1].values[0]];
            this.root.children[0].highlighted = [this.root.children[0].values[0]];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
            // Check if the root can shrink the tree into its childs
            this.mergeNodes(this.root.children[1], this.root.children[0], sequence);
            this.root = this.root.children[0];
        }
        if (this.root.n >= 1) {
            // Insert frame with the whole node highlighted
            this.root.highlighted = [...this.root.values];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
        }
        // Start looking for the value to delete
        this.deleteFromNode(this.root, parseInt(value), sequence);
        sequence.addFrame(new Frame(this.toJSON(this.root)));
        return sequence;
    }

    /**
     * Delete a value from a node
     * @param {BTreeNode} node 
     * @param {number} value 
     * @param {Sequence} sequence 
     */
    deleteFromNode(node, value, sequence) {
        node.highlighted = [...node.values];
        sequence.addFrame(new Frame(this.toJSON(this.root)));
        // Check if value is in the actual node 
        const index = node.values.indexOf(value);
        if (index >= 0) {
            // Value present in the node
            if (node.leaf && node.n > this.order - 1) {
                // If the node is a leaf and has more than order-1 values, just delete it
                node.highlighted = [value];
                sequence.addFrame(new Frame(this.toJSON(this.root)));
                node.removeValue(node.values.indexOf(value));
                return;
            }
            // Check if one children has enough values to transfer
            if (node.children[index].n > this.order - 1 ||
                node.children[index + 1].n > this.order - 1) {
                // One of the immediate children has enough values to transfer
                if (node.children[index].n > this.order - 1) {
                    // Replace the target value for the higher of left node.
                    // Then delete that value from the child
                    const predecessor = this.getMinMaxFromSubTree(node.children[index], 1);
                    node.highlighted = [node.values[index]];
                    sequence.addFrame(new Frame(this.toJSON(this.root)));
                    node.values[index] = predecessor;
                    node.highlighted = [predecessor];
                    sequence.addFrame(new Frame(this.toJSON(this.root)));
                    return this.deleteFromNode(node.children[index], predecessor, sequence);
                } else {
                    const successor = this.getMinMaxFromSubTree(node.children[index+1], 0);
                    node.highlighted = [node.values[index]];
                    sequence.addFrame(new Frame(this.toJSON(this.root)));
                    node.values[index] = successor;
                    node.highlighted = [successor];
                    sequence.addFrame(new Frame(this.toJSON(this.root)));
                    return this.deleteFromNode(node.children[index+1], successor, sequence);
                }
            }
            // Children has not enough values to transfer. Do a merge
            this.mergeNodes(node.children[index + 1], node.children[index], sequence);
            return this.deleteFromNode(node.children[index], value, sequence);
        }
        if (node.leaf) {
            // Value is not in the tree
            return;
        }
        // Value is not present in the node, search in the children
        let nextNode = 0;
        while (nextNode < node.n && node.values[nextNode] < value) {
            nextNode++;
        }
        if (node.children[nextNode].n > this.order - 1) {
            // Child node has enough values to continue
            return this.deleteFromNode(node.children[nextNode], value, sequence);
        }
        // Child node has not enough values to continue
        // Before visiting next node transfer a value or merge it with a brother
        if ((nextNode > 0 && node.children[nextNode - 1].n > this.order - 1) ||
            (nextNode < node.n && node.children[nextNode + 1].n > this.order - 1)) {
            // One of the immediate children has enough values to transfer
            if (nextNode > 0 && node.children[nextNode - 1].n > this.order - 1) {
                this.transferValue(node.children[nextNode - 1], node.children[nextNode], sequence);
            } else {
                this.transferValue(node.children[nextNode + 1], node.children[nextNode], sequence);
            }
            return this.deleteFromNode(node.children[nextNode], value, sequence);
        }
        // No immediate brother with enough values. Merge nodes
        const target = node.children[nextNode];
        const origin = nextNode > 0 ? node.children[nextNode - 1] : node.children[nextNode + 1];
        this.mergeNodes(origin, target,sequence);
        return this.deleteFromNode(target, value, sequence);
    }

    /**
     * Transfer one value from the origin to the target. O(1)
     * If a sequence is provided, add frames 
     * @param {BTreeNode} origin 
     * @param {BTreeNode} target 
     * @param {Sequence} sequence 
    */
    transferValue(origin, target, sequence) {
        const indexo = origin.parent.children.indexOf(origin);
        const indext = origin.parent.children.indexOf(target);
        if (indexo < indext) {
            target.parent.highlighted = [target.parent.values[indexo]];
            origin.highlighted = [origin.values[origin.n-1]];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
            // Transfer value from parent to target
            target.addValue(target.parent.removeValue(indexo));
            // Transfer value from origin to parent
            origin.parent.addValue(origin.removeValue(origin.n-1));
            if (!origin.leaf) {
                target.addChild(origin.deleteChild(origin.children.length-1), 0);
            }
            target.parent.highlighted = [target.parent.values[indexo]];
            target.highlighted = [target.values[0]];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
        } else {
            target.parent.highlighted = [target.parent.values[indext]];
            origin.highlighted = [origin.values[0]];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
            // Transfer value from parent to target
            target.addValue(target.parent.removeValue(indext));
            // Transfer value from origin to parent
            origin.parent.addValue(origin.removeValue(0));
            if (!origin.leaf) {
                target.addChild(origin.deleteChild(0), target.children.length);
            }
            target.parent.highlighted = [target.parent.values[indext]];
            target.highlighted = [target.values[target.n-1]];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
        }
    }

    /**
     * Merge 2 nodes into one. O(1)
     * If a sequence is provided, add frames 
     * @param {BTreeNode} origin 
     * @param {BTreeNode} target 
     * @param {Sequence} sequence 
    */
    mergeNodes(origin, target, sequence) {
        const indexo = origin.parent.children.indexOf(origin);
        const indext = target.parent.children.indexOf(target);
        // Frame with all the nodes involved before merge
        target.parent.highlighted = [target.parent.values[Math.min(indexo, indext)]];
        origin.highlighted = [...origin.values];
        target.highlighted = [...target.values];
        sequence.addFrame(new Frame(this.toJSON(this.root)));
        // Add middle value of the parent into target node
        target.addValue(target.parent.removeValue(Math.min(indexo, indext)));
        // Add every value of origin into target node
        for (let i = origin.n - 1; i >= 0; i--) {
            target.addValue(origin.removeValue(i));
        }
        target.parent.deleteChild(indexo);
        if (!origin.leaf) {
            while (origin.children.length) {
                indexo > indext ?
                target.addChild(origin.deleteChild(0), target.children.length) :
                target.addChild(origin.deleteChild(origin.children.length-1), 0);
            }
        }
        target.highlighted = [...target.values];
        sequence.addFrame(new Frame(this.toJSON(this.root)));
    }

    /**
     * Get the lower or higher value in a sub-tree
     * @param {BTreeNode} node 
     * @param { 0 | 1 } max 1 for find max, 0 for min
     * @returns {number}
     */
    getMinMaxFromSubTree(node, max) {
        while (!node.leaf) {
            node = node.children[max ? node.n : 0];
        }
        node.highlighted = [node.values[max ? node.n - 1 : 0]];
        return node.values[max ? node.n - 1 : 0];
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
        if (actual.n > 1 || !actual.leaf) {
            // Insert frame with the whole node highlighted
            actual.highlighted = [...actual.values];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
        }
        if (actual.n === 2 * this.order - 1) {
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
     * O(1)
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
        parent.addValue(parentValue);
        // Highlight the splitted nodes
        child.highlighted = [...child.values];
        newChild.highlighted = [...newChild.values];
        parent.highlighted = [parentValue];
        sequence.addFrame(new Frame(this.toJSON(this.root)));
        parent.leaf = false;
    }

    /**
     * Insert a value in a not-full node. Add frames to the given sequence
     * O(1)
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
                node.highlighted = [node.values[temp - 1]];
                sequence.addFrame(new Frame(this.toJSON(this.root)));
                temp = temp - 1;
            }
            // Highlight next node
            node.children[temp].highlighted = [...node.children[temp].values];
            sequence.addFrame(new Frame(this.toJSON(this.root)));
            if (node.children[temp].n === 2 * this.order - 1) {
                this.split(node.children[temp], node, temp + 1, sequence);
                if (value  > node.values[temp]) {
                    temp = temp + 1;
                    // Highlight next node
                    node.children[temp].highlighted = [...node.children[temp].values];
                    sequence.addFrame(new Frame(this.toJSON(this.root)));
                }
            }
            this.insertNonFull(node.children[temp], value, sequence);
        }
    }

    /**
     * Creates a VisualizerTreeNode
     * @param {BTreeNode} node 
     * @param {{ [value: number]: BTreeNode } || Ma} highlight 
     * @returns {VisualizerTreeNode}
    */
    toJSON(node) {
        const structure = new VisualizerTreeNode();
        structure.leaves = new VisualizerNodeLeaf();
        for (let i = 0; i < node.n; i++) {
            const highlighted = node.highlighted.includes(node.values[i]);
            structure.leaves.addKey(node.values[i], highlighted);
        }
        node.highlighted = [];
        structure.children = node.children.map((node) => this.toJSON(node));
        return structure;
    }
}
