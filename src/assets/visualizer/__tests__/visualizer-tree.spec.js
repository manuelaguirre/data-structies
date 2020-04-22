import VisualizerTreeNode, { VisualizerNodeLeaf } from "../visualizer-tree.js";

describe("VisualizerTreeNode",()=>{
    let root = new VisualizerTreeNode;
    test("add keys to the root",()=>{
        root.leaves.addKey(1);
        root.leaves.addKey(2,true);
        expect(root.leaves.keys).toEqual(
            [{value:1, highlighted: false},
            {value:2, highlighted: true}]
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
    test("highlights and deemphasizes existing keys", ()=>{
        root.leaves.highlight(0);
        root.leaves.deEmphasize(1);
        expect(root.leaves.keys).toEqual(
            [{value:1, highlighted: true},
                {value:2, highlighted: false}]
        )
    })
})