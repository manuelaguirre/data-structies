import VisualizerTreeNode from "./visualizer-tree";

/**
 * Constructs a new Tree.
 * @class A frame of some visualization for tree algorithms, containing the nodes and 
 * links to be highlighted.
 * @constructor
*/
export class Frame {
    constructor(tree) {
        /** @type {VisualizerTreeNode} */
        this.tree = tree;
    }
}
/**
 * Constructs a new Tree.
 * @class A collection of frames for visualizing tree algorithms
 * @constructor
 */
export default class Sequence {
    constructor() {
        /** @type {Frame[]} */
        this.frames = [];
    }
    /**
     * Adds a frame to the sequence
     * @param {Frame} frame   
     */
    addFrame(frame){
        this.frames.push(frame)
    }
}
