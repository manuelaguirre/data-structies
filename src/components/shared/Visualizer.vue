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
          @click="select(index, node)"
        >
          <g
            v-for="key in node.keys"
            :key="key.text"
            :style="node.style"
          >
            <rect
              :width="settings.keyCellWidth + (key.digits - 1)*3"
              :height="settings.keyCellHeight"
              :x="key.position * (settings.keyCellWidth + (key.digits - 1)*3) -
                ((settings.keyCellWidth + (key.digits - 1)*3)/2) * (node.keys.length)"
              :y="-1 * settings.keyCellHeight/2"
              :style="node.rectStyle"
            />
            <text
              :dx="key.position * settings.keyCellWidth -
                (settings.keyCellWidth/2) * (node.keys.length) + 10 - (key.digits - 2)*4"
              :dy="4"
              :style="node.textStyle"
            >
              {{ key.text }}
            </text>
          </g>
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
    structureData: { type: Array, default: undefined },
    current: { type: Number, default: 0 },
  },

  data() {
    return {
      margin: {
        top: 20, right: 50, bottom: 30, left: 200,
      },
      settings: {
        strokeColor: '#29B5FF',
        width: '100',
        keyCellWidth: 38,
        keyCellHeight: 28,
      },
    };
  },
  computed: {
    root() {
      return this.structureData && this.structureData.length
        ? this.tree(d3.hierarchy(this.structureData[this.current]))
        : null;
    },
    nodes() {
      if (this.root) {
        const nodes = this.root.descendants().map((d, i) => {
          const x = `${this.margin.left + d.x}px`;
          const y = `${parseInt(-1 * d.y + this.margin.top, 10)}px`;

          return {
            id: `${i}`,
            r: 2.5,
            keys: d.data.leaves.keys.map((k, ii) => ({
              text: k.toString(),
              position: ii,
              digits: k.toString().length,
            })),
            style: {
              transform: `translate(${x},${y})`,
            },
            rectStyle: {
              fill: 'white',
              stroke: 'black',
              strokeWidth: 2,
            },
            textpos: {
              x: d.children ? -8 : 8,
              y: 3,
            },
            textStyle: {

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
          const x = d.x + this.margin.left;
          const parentx = d.parent.x + this.margin.left;
          const y = parseInt(-1 * d.y + this.margin.top, 10);
          const parenty = parseInt(-1 * d.parent.y + this.margin.top, 10);
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
      return d3.tree().size([1000, this.settings.width - 300]).separation(() => (this.settings.keyCellWidth * 2));
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
    align-items: center;
  }
  .svg {
    width: 100%;
    height: 100%;
  }
</style>
