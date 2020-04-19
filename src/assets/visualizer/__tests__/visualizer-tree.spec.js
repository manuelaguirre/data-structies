import VisualizerTreeNode, { VisualizerNodeLeaf } from "../visualizer-tree.js";

describe("VisualizerTreeNode",()=>{
    let root = new VisualizerTreeNode;
    test("add keys to the root",()=>{
        root.leaves.addKey(1);
        root.leaves.addKey(2,true);
        expect(root.leaves.keys).toEqual(
            [{key:1, highlighted: false},
            {key:2, highlighted: true}]
        );
    });
    test("appends children",()=>{
        const child = new VisualizerTreeNode;
        root.appendChild(child);
        child.leaves.addKey(3);
        expect(root.children[0]).toBeInstanceOf(
           VisualizerTreeNode
       );
    })
})