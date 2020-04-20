<template>
  <div
    id="min-heap-visualizer"
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
        Structure: Min Heap
      </h1>
    </div>
    <div class="flex buttons">
      <InsertInput
        @myEvent="insertInputEvent"
      />
      <DeleteInput
        :onlypop="onlypop"
        @myEvent="deleteInputEvent"
      />
      <HistoryButtons
        :current="current"
        :length="sequences.length"
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
import MinHeap from '../assets/implementations/minheap';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';
import Visualizer from './shared/Visualizer.vue';
import HistoryButtons from './shared/HistoryButtons.vue';
import Sequence, { Frame } from '../assets/visualizer/frame';

const router = new Router();

export default {
  name: 'MinHeapVisualizer',
  components: {
    InsertInput,
    DeleteInput,
    Visualizer,
    HistoryButtons,
  },
  data() {
    return {
      minHeap: new MinHeap(),
      /** @type {Sequence[]} */
      sequencesList: [],
      current: 0,
      onlypop: true,
    };
  },
  computed: {
    sequences() {
      return this.sequencesList;
    },
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      // TODO: insert and remove action return have to produce more than one frame
      this.minHeap.insert(event);
      const sequence = new Sequence();
      const frame = new Frame();
      frame.tree = this.minHeap.toJSON();
      sequence.addFrame(frame);
      this.sequencesList.push(sequence);
      this.current = this.sequencesList.length - 1;
    },
    deleteInputEvent() {
      // TODO: insert and remove action return have to produce more than one frame
      this.minHeap.remove();
      const sequence = new Sequence();
      const frame = new Frame();
      frame.tree = this.minHeap.toJSON();
      sequence.addFrame(frame);
      this.sequencesList.push(sequence);
      this.current = this.sequencesList.length - 1;
    },
    changeCurrent(event) {
      this.current += event;
      if (this.current < 0) {
        this.current = 0;
      }
      if (this.current > this.sequencesList.length - 1) {
        this.current = this.sequencesList.length - 1;
      }
    },
  },
};
</script>
=
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
