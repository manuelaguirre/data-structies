import VisualizerTreeNode, { VisualizerNodeLeaf } from "../visualizer/visualizer-tree";
import Sequence, { Frame } from "../visualizer/frame";

export default class MaxHeap {
    constructor () {
        // Always first node is null [null, 1, 4, 5 ....]
        /** @type {number[]} nodes list */
        this.maxheap = [null];
        /** @type {number} size of the heap */
        this.size = 0;
    }
    /* Get value of the head of the heap */
    getHead() {
        return this.maxheap[1]
    }
    /**
     * Change position of two nodes
     * @param {number} firstItemIndex 
     * @param {number} lastItemInde 
     */
    swap(firstItemIndex, lastItemIndex) {
        const tmp = this.maxheap[firstItemIndex];
        this.maxheap[firstItemIndex] = this.maxheap[lastItemIndex];
        this.maxheap[lastItemIndex] = tmp;
    }
    /**
     * Recover the heap property from one node to its childs
     * @param {number} i 
     */
    heapify(i, sequence) {
        let index, leftChild, rightChild;
        while(i < this.size) {
            index = i;
            leftChild = 2*i;
            rightChild = leftChild + 1;
            // Get the smallest children
            if (leftChild <= this.size && this.maxheap[leftChild] > this.maxheap[index]) {
                index = leftChild;
            }
            if (rightChild <= this.size && this.maxheap[rightChild] > this.maxheap[index]) {
                index = rightChild;
            }
            // Children are bigger than actual node
            if (index == i) {
                return;
            }
            sequence.addFrame(new Frame(this.toJSON([i, index])));
            this.swap(i, index);
            sequence.addFrame(new Frame(this.toJSON([i, index])));
            i = index;
            sequence.addFrame(new Frame(this.toJSON([i])));
        }
    }
    /**
     * Delete maximum value of the heap. O(N)
     * Return sequence with Frame array to visualize the operation
     * @returns {Sequence}
     */
    delete() {
        const sequence = new Sequence();
        /* Smallest element is at the index 1 in the heap array */
        sequence.addFrame(new Frame(this.toJSON([1])));
        sequence.addFrame(new Frame(this.toJSON([1, this.size])));
        this.maxheap[1] = this.maxheap[this.size];
        this.maxheap[this.size] = null;
        this.size--;
        this.maxheap = this.maxheap.slice(0, this.size + 1);
        sequence.addFrame(new Frame(this.toJSON([1])));
        this.heapify(1, sequence);
        sequence.addFrame(new Frame(this.toJSON([])));
        return sequence;
    }

    /**
     * Insert node to the heap. O(N)
     * Return Sequence with Frame array to visualize the operation
     * @param {number} node 
     * @returns {Sequence}
     */
    insert(node) {
        const sequence = new Sequence();
        this.size++;
        this.maxheap[this.size] = parseInt(node);
        // Add a new frame with the last node highlighted
        sequence.addFrame(new Frame(this.toJSON([this.size])));
        let parent = Math.floor(this.size/2);
        let index = this.size;
        if (parent > 0) {
            // New frame with the actual node and it' parent highlighted
            sequence.addFrame(new Frame(this.toJSON([index, parent])));
        }
        while (node > this.maxheap[parent] && parent > 0) {
            this.swap(index, parent);
            // New frame with the swapped nodes highlighted
            sequence.addFrame(new Frame(this.toJSON([index, parent])));
            index = parent;
            // New frame with the actual node highlighted
            sequence.addFrame(new Frame(this.toJSON([index])));
            parent = Math.floor(index/2);
            if (parent > 0) {
            // New frame with the actual node and its parent highlighted
                sequence.addFrame(new Frame(this.toJSON([index, parent])));
            }
        }
        // Last frame without highlighted nodes
        sequence.addFrame(new Frame(this.toJSON([])));
        return sequence;
    }

    /**
     * Create a VisualizerTreeNode.
     * @param {number[]} highlight List of keys to highlight
     * @return {VisualizerTreeNode}
     */
    toJSON(highlight=[]) {
        const structure = new VisualizerTreeNode();
        if (this.size < 1) {
            return structure;
        }
        structure.leaves = new VisualizerNodeLeaf();
        const highlighted = highlight.includes(1);
        structure.leaves.addKey(this.maxheap[1], highlighted);
        structure.children = this.appendChildren(1, highlight);
        return structure;
    }

    /**
     * Return all the children for a given node
     * @param {number} i 
     * @param {number[]} highlight 
     * @returns {VisualizerTreeNode[]}
     */
    appendChildren(i, highlight) {
        /** @type {VisualizerTreeNode[]} */
        const children = [];
        if (2*i <= this.size) {
            const node = new VisualizerTreeNode();
            node.leaves = new VisualizerNodeLeaf();
            const highlighted = highlight.includes(2*i);
            node.leaves.addKey(this.maxheap[2*i], highlighted);
            node.children = this.appendChildren(2*i, highlight);
            children.push(node);
        }
        if (2*i + 1 <= this.size) {
            const node = new VisualizerTreeNode();
            node.leaves = new VisualizerNodeLeaf();
            const highlighted = highlight.includes(2*i + 1);
            node.leaves.addKey(this.maxheap[2*i + 1], highlighted);
            node.children = this.appendChildren(2*i + 1, highlight);
            children.push(node);
        }
        return children;
    }
}
