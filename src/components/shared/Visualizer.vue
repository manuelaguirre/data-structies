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
    structureData: { type: Object, default: undefined },
  },

  data() {
    return {
      margin: {
        top: 20, right: 30, bottom: 30, left: 40,
      },
      settings: {
        strokeColor: '#29B5FF',
        width: 100,
      },
    };
  },
  computed: {
    root() {
      const root = d3.hierarchy(this.structureData);
      console.log(root);
      return this.tree(root);
    },
    nodes() {
      if (this.root) {
        const nodes = this.root.descendants().map((d, i) => {
          const x = `${200 + d.x}px`;
          const y = `${parseInt(-1 * d.y + 30, 10)}px`;
          return {
            id: `${i}`,
            r: 2.5,
            text: d.data.leaves.keys.toString(),
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
      return undefined;
    },
    links() {
      const that = this;
      if (this.root) {
        const links = this.root.descendants().slice(1).map((d, i) => {
          const x = d.x + 200;
          const parentx = d.parent.x + 200;
          const y = parseInt(-1 * d.y + 30, 10);
          const parenty = parseInt(-1 * d.parent.y + 30, 10);
          return {
            id: i,
            d: `M${x},${y}L${parentx},${parenty}`,
            style: {
              stroke: that.settings.strokeColor,
            },
          };
        });
        return links;
      }
      return undefined;
    },
    tree() {
      return d3.tree().size([600, this.settings.width - 300]);
    },
    getWith() {
      return this.$refs && this.$refs.cont ? this.$refs.cont.clientWidth : 800;
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
