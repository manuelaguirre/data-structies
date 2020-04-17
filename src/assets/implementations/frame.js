/**
 * Constructs a new Tree.
 * @class A frame of some visualization for tree algorithms, containing the nodes and 
 * links to be highlighted.
 * @constructor
*/
export default class Frame {
    constructor(tree) {
        this.tree = tree;
        this.highlightedNodes = [];
        this.highlightedLinks = [];
    }

    /**
     * Adds a nodeID to the highlights of the frame
     *@param {number} nodeID   
     */
    addHighlightedNode(nodeID) {
        this.highlightedNodes.push(nodeID);
    }

    /**
     * Adds a linkID to the highlights of the frame
     *@param {number} linkID;   
     */
    addHighlightedLink(linkID){
        this.highlightedLinks.push(linkID)
    }

}

/**
 * Constructs a new Tree.
 * @class A collection of frames for visualizing tree algorithms
 * @constructor
 */
export default class Sequence {
    constructor(){
        this.frames = [];
    }
    /**
     * Adds a frame to the sequence
     *@param {Frame} linkID;   
     */
    addFrame(frame){
        this.frames.push(frame)
    }
}
