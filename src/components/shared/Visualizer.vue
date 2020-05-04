<template>
  <div
    ref="cont"
    class="flex view-container justify-center h-64"
  >
    <svg
      ref="svg"
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
          v-for="node in nodes"
          :key="node.id"
          class="node"
        >
          <g
            v-for="key in node.keys"
            :key="key.text"
            :style="node.style"
          >
            <rect
              :width="key.svgParams.width"
              :height="key.svgParams.height"
              :x="key.svgParams.x"
              :y="key.svgParams.y"
              :style="key.svgParams.style"
            /> <rect />
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
import Sequence from '../../assets/visualizer/frame';

export default {
  name: 'Visualizer',

  props: {
    width: { type: Number, default: 800 },
    height: { type: Number, default: 450 },
    sequences: {
      type: Array,
      default: () => [new Sequence()],
    },
    current: { type: Number, default: 0 },
    currentFrame: { type: Number, default: 0 },
  },
  data() {
    return {
      svgWidth: undefined,
      margin: {
        top: 20, right: 50, bottom: 30, left: 0,
      },
      settings: {
        strokeColor: '#29B5FF',
        width: '100',
        keyCellWidth: 38,
        keyCellHeight: 28,
        linkStyles: {
          plain: {
            stroke: 'black',
          },
          highlighted: {
            stroke: 'red',
          },
        },
        rectStyles: {
          plain: {
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
          },
          highlighted: {
            fill: 'lightblue',
            stroke: 'red',
            strokeWidth: 2,
          },
        },
      },
    };
  },

  computed: {
    root() {
      /** @type {Sequence} */
      const sequence = this.sequences.length ? this.sequences[this.current] : null;
      // TODO: Show all the frames in a sequence
      const root = sequence ? sequence.frames[this.currentFrame].tree : null;
      return root ? this.tree(d3.hierarchy(root)) : null;
    },
    nodes() {
      if (this.root) {
        const nodes = this.getNodes(this.root.descendants());
        return nodes;
      }
      return undefined;
    },
    links() {
      if (this.root) {
        const links = this.getLinks(this.root.descendants());
        return links;
      }
      return undefined;
    },
    tree() {
      return d3.tree().size([this.svgWidth, this.settings.width - 300]).separation(() => (this.settings.keyCellWidth * 2));
    },

  },

  mounted() {
    this.addSizingListeners();
  },

  beforeDestroy() {
    this.removeListeners();
  },

  methods: {
    getSVGParams(key, position, keys) {
      return {
        width: this.settings.keyCellWidth + (key.value.toString().length - 1) * 3,
        height: this.settings.keyCellHeight,
        x: position * (this.settings.keyCellWidth + (key.value.toString().length - 1) * 3)
                - ((this.settings.keyCellWidth + (key.value.toString().length - 1) * 3) / 2) * (keys.length),
        y: -this.settings.keyCellHeight / 2,
        style: key.highlighted ? this.settings.rectStyles.highlighted : this.settings.rectStyles.plain,
      };
    },
    getKeys(keys) {
      return keys.map((key, ii, keyArray) => (
        {
          text: key.value.toString(),
          position: ii,
          highlighted: key.highlighted,
          digits: key.value.toString().length,
          svgParams: this.getSVGParams(key, ii, keyArray),
        }
      )) || null;
    },
    getNodes(descendants) {
      return descendants.map((d, i) => {
        const x = `${this.margin.left + d.x}px`;
        const y = `${this.margin.top - d.y}px`;
        return {
          id: i,
          keys: this.getKeys(d.data.leaves.keys),
          style: {
            transform: `translate(${x},${y})`,
          },
        };
      });
    },
    getLinks(descendants) {
      return descendants.slice(1).map((d, i) => {
        const x = d.x + this.margin.left;
        const parentx = this.margin.left + d.parent.x;
        const y = this.margin.top - d.y;
        const parenty = this.margin.top - d.parent.y;
        const highlighted = d.data.leaves.keys.some((key) => key.highlighted) && d.parent.data.leaves.keys.some((key) => key.highlighted);
        return {
          id: i,
          d: `M${x},${y}L${parentx},${parenty}`,
          style: highlighted ? this.settings.linkStyles.highlighted : this.settings.linkStyles.plain,
        };
      });
    },
    addSizingListeners() {
      const wrapper = this.$el;
      this.svgWidth = wrapper.clientWidth;
      window.onresize = this.handleSVGParentResize;
    },
    handleSVGParentResize() {
      this.svgWidth = this.$el.clientWidth;
    },
    removeListeners() {
      window.onresize = null;
    },
  },
};
</script>

<style>
  .view-container {
    height: 100%;
    align-items: center;
  }
  .svg {
    width: 100%;
    height: 100%;
  }
</style>
