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
        @myEvent="insertInputEvent"
      />
      <DeleteInput
        @myEvent="deleteInputEvent"
      />
      <HistoryButtons
        :current="current"
        :length="displayTreeList.length"
        @historyEvents="changeCurrent"
      />
    </div>
    <div class="visualier-cont">
      <Visualizer
        :structure-data="displayTreeList"
        :current="current"
      />
    </div>
  </div>
</template>

<script>

import Router from 'vue-router';
import Btree from '../assets/implementations/btree';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';
import Visualizer from './shared/Visualizer.vue';
import HistoryButtons from './shared/HistoryButtons.vue';

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
      bTree: new Btree(2),
      displayedTreeList: [],
      current: 0,
    };
  },
  computed: {
    displayTreeList() {
      return this.displayedTreeList;
    },
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      this.bTree.put(event, 'insert');
      this.displayedTreeList.push(this.bTree.toJSON());
      this.current = this.displayedTreeList.length - 1;
    },
    deleteInputEvent(event) {
      this.bTree.del(event);
      this.bTree.print(0);
      this.displayedTreeList.push(this.bTree.toJSON());
      this.current = this.displayedTreeList.length - 1;
    },
    changeCurrent(event) {
      this.current += event;
      if (this.current < 0) {
        this.current = 0;
      }
      if (this.current > this.displayedTreeList.length - 1) {
        this.current = this.displayedTreeList.length - 1;
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
