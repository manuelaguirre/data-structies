<template>
  <div
    ref="cont"
    class="flex view-container"
  >
    <svg
      class="svg"
    >
      <transition-group
        tag="g"
        name="line"
      >
        <path
          v-for="link in links"
          :key="link.id"
          class="link"
          :d="link.d"
          :style="link.style"
        />
      </transition-group>
      <transition-group
        tag="g"
        name="list"
      >
        <g
          v-for="(node, index) in nodes"
          :key="node.id"
          class="node"
          :style="node.style"
          @click="select(index, node)"
        >
          <circle
            :r="node.r"
            :style="{'fill': '#bfbfbf'}"
          />
          <text
            :dx="node.textpos.x"
            :dy="node.textpos.y"
            :style="node.textStyle"
          >{{ node.text }}</text>
        </g>
      </transition-group>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Visualizer',
  props: {
    width: { type: Number, default: 800 },
    height: { type: Number, default: 450 },
    structuredata: {},
  },
  data() {
    return {
      settings: {
        strokeColor: '#29B5FF',
        width: 100,
      },
    };
  },
  computed: {
    root() {
      if (this.structuredata) {
        const root = this.structuredata ? d3.hierarchy(this.transformB3toD3Data(this.structuredata)) : null;
        return this.tree(root);
      }
      return null;
    },
    tree() {
      return d3.tree().size([600, this.settings.width - 300]);
    },
    nodes() {
      if (this.root) {
        const nodes = this.root.descendants().map((d) => {
          const x = `${200 + d.x}px`;
          const y = `${parseInt(-1 * d.y + 30, 10)}px`;
          return {
            id: `${d.data.value}-${d.data.name}`,
            r: 2.5,
            text: d.data.name,
            style: {
              transform: `translate(${x},${y})`,
            },
            textpos: {
              x: d.children ? -8 : 8,
              y: 3,
            },
            textStyle: {
              textAnchor: d.children ? 'end' : 'start',
            },
          };
        });
        return nodes;
      }
      return null;
    },
    links() {
      const that = this;
      if (this.root) {
        const links = this.root.descendants().slice(1).map((d) => {
          const x = d.x + 200;
          const parentx = d.parent.x + 200;
          const y = parseInt(-1 * d.y + 30, 10);
          const parenty = parseInt(-1 * d.parent.y + 30, 10);
          return {
            id: `${d.data.value}-${d.data.name}`,
            d: `M${x},${y}L${parentx},${parenty}`,
            style: {
              stroke: that.settings.strokeColor,
            },
          };
        });
        return links;
      }
      return null;
    },
  },
  methods: {
    getWith() {
      return this.$refs && this.$refs.cont ? this.$refs.cont.clientWidth : 800;
    },
    transformB3toD3Data(oldTree) {
      const newTree = {};
      if (oldTree && oldTree.root) {
        // Add the root. Then add child recursevely
        newTree.value = oldTree.root.leaves.reduce((val, leave) => `${val} ${leave.key}-`, '');
        newTree.value = newTree.value.substring(0, newTree.value.length - 1);
        newTree.name = oldTree.root.leaves.reduce((val, leave) => `${val} ${leave.value}(${leave.key})-`, '');
        newTree.name = newTree.name.substring(0, newTree.name.length - 1);
        newTree.children = [];
        oldTree.root.nodes.forEach((node) => {
          const child = this.transformB3toD3DataChild(node);
          if (child) {
            newTree.children.push(child);
          }
        });
      }
      return newTree;
    },
    transformB3toD3DataChild(node) {
      // Recursive way to disply node children
      if (!node || !node.leaves) {
        return null;
      }
      const newnode = {};
      if (node && node.leaves) {
        newnode.value = node.leaves.reduce((val, leave) => `${val}${leave.key}-`, '');
        newnode.value = newnode.value.substring(0, newnode.value.length - 1);
        newnode.name = node.leaves.reduce((val, leave) => `${val}${leave.value}(${leave.key})-`, '');
        newnode.name = newnode.name.substring(0, newnode.name.length - 1);
        newnode.children = [];
        if (node.nodes) {
          node.nodes.forEach((n_) => {
            const child = this.transformB3toD3DataChild(n_);
            if (child) {
              newnode.children.push(child);
            }
          });
        }
      }
      return newnode;
    },
  },


};
</script>

<style>
  .view-container {
    height: 100%;
    flex-direction: column;
  }
  .svg {
    width: 100%;
    height: 100%;
  }
</style>
