/**
 * @class Tree leaf node compatible with visualizer
 * @param {Number[]} keys Initial set 
*/
export class VisualizerNodeLeaf {
  constructor() {
    /** @type {Object[]} */
    this.keys = [];
  }
  /**
   * Add key
   * @param {number} key key to be added
   * @param {Boolean} highlighted true will highlight this key
   */
  addKey(value, highlighted=false) {
    this.keys.push({value, highlighted});
  }
  /**
   * Highlights a key by its index in the leaf
   * @param {number} index key to be added
   * 
   */
  highlight(index=0) {
    this.keys[index].highlighted = true;
  }
  /**
   * Stops highlighting a key by its index in the leaf
   * @param {number} index key to be de-emphasized
   * 
   */
  deEmphasize(index=0){
    this.keys[index].highlighted = false;
  }
}

/**
 * @class Tree node compatible with visualizer
*/
export default class VisualizerTreeNode {
  constructor() {
    /** @type {VisualizerNodeLeaf} */
    this.leaves = new VisualizerNodeLeaf;
    /** @type {VisualizerTreeNode[]} */
    this.children = [];
  }
  /**
   * Appends a child node to this node
   * @param {VisualizerTreeNode} node node to be added
   * 
   */
  appendChild(node){
    this.children.push(node)
  }
}
