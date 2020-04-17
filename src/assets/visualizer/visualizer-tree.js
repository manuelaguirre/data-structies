/**
 * @class Tree leave node compatible with visualizer
*/
export class VisualierNodeLeave {
  constructor() {
    /** @type {number[]} */
    this.keys = [];
  }
  /**
   * Add key
   * @param {number} key 
   */
  addKey(key) {
    this.keys.push(key);
  }
}

/**
 * @class Tree node compatible with visualizer
*/
export default class VisualizerTreeNode {
  constructor() {
    /** @type {VisualierNodeLeave} */
    this.leaves = null;
    /** @type {VisualizerTreeNode[]} */
    this.children = [];
  }
}
