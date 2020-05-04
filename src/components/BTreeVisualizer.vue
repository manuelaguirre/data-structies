<template>
  <div
    id="b-bTree-visualizer"
    class="flex tree-container"
  >
    <div class="title">
      <h1 class="name">
        Structure: B Tree
      </h1>
    </div>
    <div class="flex buttons">
      <InsertInput
        :disabled="isAnimating"
        @myEvent="insertInputEvent"
      />
      <DeleteInput
        :disabled="isAnimating"
        @myEvent="deleteInputEvent"
      />
    </div>
    <Visualizer
      :sequences="sequences"
      :current="currentSequenceNumber"
      :current-frame="currentFrame"
    />
    <div class="arrow-button-container flex m-auto">
      <div class="history-btn-container">
        <HistoryButtons
          id="history.buttons"
          class="mx-4"
          :current="currentSequenceNumber"
          :length="sequences.length"
          :disabled="historyButtonsAreDisabled"
          label="History"
          @HistoryEvents="changeCurrentSequence"
        />
      </div>
      <v-btn
        class="button"
        color="primary"
        :disabled="isAnimating"
        @click="replay"
      >
        Replay <v-icon>mdi-play</v-icon>
      </v-btn>
      <div class="step-btn-container">
        <HistoryButtons
          id="step-buttons"
          class="mx-4"
          :current-frame="currentFrame"
          :length="currentSequence ? currentSequence.frames.length : 0"
          :disabled="stepButtonsAreDisabled"
          label="Animation"
          @HistoryEvents="changeCurrentFrame"
        />
      </div>
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
      /** @type {Sequence[]} */
      sequencesList: [],
      currentSequenceNumber: 0,
      currentFrame: 0,
      isAnimating: false,
    };
  },
  computed: {
    sequences() {
      return this.sequencesList;
    },
    currentSequence() {
      return this.sequencesList[this.currentSequenceNumber];
    },
    stepButtonsAreDisabled() {
      if (!this.currentSequence) {
        return {
          backButtonIsDisabled: true, forwardButtonIsDisabled: true,
        };
      }
      const backButtonIsDisabled = this.currentFrame <= 0;
      const forwardButtonIsDisabled = this.currentFrame >= this.currentSequence.frames.length - 1;
      return { backButtonIsDisabled, forwardButtonIsDisabled, isAnimating: this.isAnimating };
    },
    historyButtonsAreDisabled() {
      if (!this.sequencesList) {
        return { backButtonIsDisabled: true, forwardButtonIsDisabled: true };
      }
      const backButtonIsDisabled = this.currentSequenceNumber <= 0;
      const forwardButtonIsDisabled = this.currentSequenceNumber >= this.sequencesList.length - 1;
      return { backButtonIsDisabled, forwardButtonIsDisabled, isAnimating: this.isAnimating };
    },
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
      const newSequence = new Sequence();
      this.sequencesList.push(newSequence);
      this.currentSequenceNumber = this.sequencesList.length - 1;
      this.addSequenceAsync(this.bTree.insert(event));
    },
    deleteInputEvent(event) {
      const newSequence = new Sequence();
      this.sequencesList.push(newSequence);
      this.currentSequenceNumber = this.sequencesList.length - 1;
      this.addSequenceAsync(this.bTree.delete(event));
    },

    replay() {
      const frames = [];
      this.currentSequence.frames.forEach((f) => frames.push(f));
      this.currentSequence.frames = [];
      this.addSequenceAsync({ frames });
    },
    addSequenceAsync(sequence) {
      this.isAnimating = true;
      this.currentSequence.addFrame(sequence.frames[0]);
      this.currentFrame = 0;
      for (let i = 1; i < sequence.frames.length; i += 1) {
        setTimeout(() => {
          this.currentSequence.addFrame(sequence.frames[i]);
          if (i === sequence.frames.length - 1) {
            this.isAnimating = false;
          }
          this.currentFrame += 1;
          this.sequencesList = Object.assign(this.sequencesList);
        }, i * 500);
      }
    },
    changeCurrentFrame(event) {
      this.currentFrame += event;
      if (this.currentFrame < 0) {
        this.currentFrame = 0;
      }
      if (this.currentFrame > this.sequencesList[this.currentSequenceNumber].frames.length - 1) {
        this.currentFrame = this.sequencesList[this.currentSequenceNumber].frames.length - 1;
      }
    },
    changeCurrentSequence(event) {
      this.currentSequenceNumber += event;
      if (this.currentSequenceNumber < 0) {
        this.currentSequenceNumber = 0;
      }
      if (this.currentSequenceNumber > this.sequencesList.length - 1) {
        this.currentSequenceNumber = this.sequencesList.length - 1;
      }
      this.currentFrame = this.currentSequence.frames.length - 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
