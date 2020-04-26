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
        Structure: Max Heap
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
    </div>
    <div class="visualizer-cont">
      <Visualizer
        :sequences="sequences"
        :current="current"
        :current-frame="currentFrame"
      />
    </div>
    <div class="arrow-button-container flex m-auto">
      <div class="history-btn-container">
        <HistoryButtons
          class="mx-4"
          :current="current"
          :length="sequences.length"
          :disabled="isDisabled"
          @historyEvents="changeCurrent"
        />
      </div>
      <div class="step-btn-container">
        <StepButtons
          class="mx-4"
          :current-frame="currentFrame"
          :length="currentSequence ? currentSequence.frames.length : 0"
          :disabled="stepButtonsAreDisabled"
          @frameHistoryEvents="changeCurrentFrame"
        />
      </div>
    </div>
  </div>
</template>

<script>

import Router from 'vue-router';
import MaxHeap from '../assets/implementations/maxheap';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';
import Visualizer from './shared/Visualizer.vue';
import HistoryButtons from './shared/HistoryButtons.vue';
import StepButtons from './shared/StepButtons.vue';
import Sequence from '../assets/visualizer/frame';

const router = new Router();

export default {
  name: 'MaxHeapVisualizer',
  components: {
    InsertInput,
    DeleteInput,
    Visualizer,
    HistoryButtons,
    StepButtons,
  },
  data() {
    return {
      maxHeap: new MaxHeap(),
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
    currentSequence() {
      return this.sequencesList[this.current];
    },
    stepButtonsAreDisabled() {
      if (!this.currentSequence) {
        return {
          backStepButtonIsDisabled: true, forwardStepButtonIsDisabled: true,
        };
      }
      const backStepButtonIsDisabled = this.current <= 0 && this.currentFrame <= 0;
      const forwardStepButtonIsDisabled = this.current >= this.sequences.length - 1
             && this.currentFrame >= this.currentSequence.frames.length - 1;
      return { backStepButtonIsDisabled, forwardStepButtonIsDisabled };
    },
  },

  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      this.addSequenceAsync(this.maxHeap.insert(event));
    },
    deleteInputEvent() {
      this.addSequenceAsync(this.maxHeap.remove());
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
        this.changeCurrent(-1);
        this.currentFrame = this.sequencesList[this.current].frames.length - 1;
      }
      if (this.currentFrame > this.sequencesList[this.current].frames.length - 1) {
        this.changeCurrent(1);
        this.currentFrame = 0;
      }
    },
    changeCurrent(event) {
      this.current += event;
      if (this.current < 0) {
        this.current = 0;
      }
      if (this.current > this.sequencesList.length - 1) {
        this.current = this.sequencesList.length - 1;
        this.currentFrame = 0;
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
  .visualizer-cont {
    flex: 1;
  }


</style>
