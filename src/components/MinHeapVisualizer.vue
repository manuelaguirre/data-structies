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
        :disabled="isDisabled"
        @myEvent="insertInputEvent"
      />
      <DeleteInput
        :onlypop="onlypop"
        :disabled="isDisabled"
        @myEvent="deleteInputEvent"
      />
      <HistoryButtons
        :current="current"
        :length="sequences.length"
        :disabled="isDisabled"
        @historyEvents="changeCurrent"
      />
      <StepButtons
        :current-frame="currentFrame"
        :length="sequence ? sequence.frames.length : 0"
        :disabled="false"
        @frameHistoryEvents="changeCurrentFrame"
      />
    </div>
    <div class="visualier-cont">
      <Visualizer
        :sequences="sequences"
        :current="current"
        :current-frame="currentFrame"
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
import Sequence from '../assets/visualizer/frame';
import StepButtons from './shared/StepButtons.vue';

const router = new Router();

export default {
  name: 'MinHeapVisualizer',
  components: {
    InsertInput,
    DeleteInput,
    Visualizer,
    HistoryButtons,
    StepButtons,
  },
  data() {
    return {
      minHeap: new MinHeap(),
      /** @type {Sequence[]} */
      sequencesList: [],
      current: 0,
      currentFrame: 0,
      onlypop: true,
      isDisabled: false,
    };
  },
  computed: {
    sequences() {
      return this.sequencesList;
    },
    sequence() {
      return this.sequencesList[this.current];
    },


  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      this.addSequenceAsync(this.minHeap.insert(event));
    },
    deleteInputEvent() {
      this.addSequenceAsync(this.minHeap.remove());
    },
    addSequenceAsync(frames) {
      this.isDisabled = true;
      const newSequence = new Sequence();
      newSequence.addFrame(frames.frames[0]);
      this.sequencesList.push(newSequence);
      this.current = this.sequencesList.length - 1;
      this.currentFrame = 0;

      for (let i = 1; i < frames.frames.length; i += 1) {
        setTimeout(() => {
          newSequence.addFrame(frames.frames[i]);
          if (i === frames.frames.length - 1) {
            this.isDisabled = false;
          }
          this.currentFrame += 1;
          this.sequencesList = Object.assign(this.sequencesList);
        }, i * 1000);
      }
    },
    changeCurrentFrame(event) {
      this.currentFrame += event;
      if (this.currentFrame < 0) {
        this.current -= 1;
        this.currentFrame = this.sequencesList[this.current].frames.length - 1;
      }
      if (this.currentFrame > this.sequencesList[this.current].frames.length - 1) {
        this.currentFrame = this.sequencesList[this.current].frames.length - 1;
      }
    },
    changeCurrent(event) {
      this.current += event;
      if (this.current < 0) {
        this.current = 0;
      }
      if (this.current > this.sequencesList.length - 1) {
        this.current = this.sequencesList.length - 1;
      }
      this.currentFrame = this.sequencesList[this.current].frames.length - 1;
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
