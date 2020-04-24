<template>
  <div
    id="b-bTree-visualizer"
    class="flex tree-container"
  >
    <v-btn
      class="back md-raised md-primary"
      @click="goBack"
    >
      Go back
    </v-btn>
    <div class="title">
      <h1 class="name">
        Structure: B Tree
      </h1>
    </div>
    <div class="flex buttons">
      <InsertInput
        :disabled="isDisabled"
        @myEvent="insertInputEvent"
      />
      <DeleteInput
        :disabled="isDisabled"
        @myEvent="deleteInputEvent"
      />
      <HistoryButtons
        :current="current"
        :length="sequences.length"
        :disabled="isDisabled"
        @historyEvents="changeCurrent"
      />
    </div>
    <div class="visualier-cont">
      <Visualizer
        :sequences="sequences"
        :current="current"
      />
    </div>
  </div>
</template>

<script>

import Router from 'vue-router';
import BTree, { BTreeNode } from '../assets/implementations/btree';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';
import Visualizer from './shared/Visualizer.vue';
import HistoryButtons from './shared/HistoryButtons.vue';
import Sequence from '../assets/visualizer/frame';

const router = new Router();

export default {
  name: 'BTreeVisualizer',
  components: {
    InsertInput,
    DeleteInput,
    Visualizer,
    HistoryButtons,
  },
  data() {
    return {
      /** @type {BTree} */
      bTree: null,
      sequences: [],
      current: 0,
      isDisabled: false,
    };
  },
  mounted() {
    this.bTree = new BTree(2);
    this.bTree.root = new BTreeNode(true);
    this.bTree.root.tree = this.bTree;
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      this.addSequenceAsync(this.bTree.insert(event));
    },
    deleteInputEvent(event) {
      this.addSequenceAsync(this.bTree.delete(event));
    },
    addSequenceAsync(frames) {
      this.isDisabled = true;
      const newSequence = new Sequence();
      newSequence.addFrame(frames.frames[0]);
      this.sequences.push(newSequence);
      this.current = this.sequences.length - 1;
      for (let i = 1; i < frames.frames.length; i += 1) {
        setTimeout(() => {
          newSequence.addFrame(frames.frames[i]);
          if (i === frames.frames.length - 1) {
            this.isDisabled = false;
          }
          this.sequences = Object.assign(this.sequences);
        }, i * 500);
      }
    },
    changeCurrent(event) {
      this.current += event;
      if (this.current < 0) {
        this.current = 0;
      }
      if (this.current > this.sequences.length - 1) {
        this.current = this.sequences.length - 1;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .name {
    font-size: 3rem;
    min-height: fit-content;
    height: 80px;
    line-height: 60px;
  }
  .structies-button:hover {
    background-color:#3c48fa;
  }
  .back {
    position: absolute;
    left: 0;
    top: 0;
  }
  .buttons {
    place-content: space-around;

    flex: 0 0 auto;
  }
  .tree-container {
    width: 100%;
    height: 100vh;
    flex-direction: column;
  }
  .visualier-cont {
    flex: 1;
  }


</style>
