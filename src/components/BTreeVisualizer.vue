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
        Structure: {{ $route.params.code }}
      </h1>
    </div>
    <div class="flex buttons">
      <InsertInput
        @myEvent="insertInputEvent"
      />
      <DeleteInput
        @myEvent="deleteInputEvent"
      />
    </div>
    <div class="visualier-cont">
      <Visualizer :structure-data="displayTree" />
    </div>
  </div>
</template>

<script>

import Router from 'vue-router';
import btree from '../assets/implementations/btree';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';
import Visualizer from './shared/Visualizer.vue';

const Tree = btree.create(2, btree.numcmp);


const router = new Router();

export default {
  name: 'BTree',
  components: {
    InsertInput,
    DeleteInput,
    Visualizer,
  },
  data() {
    return {
      bTree: new Tree(),
    };
  },
  computed: {
    displayTree() {
      return this.bTree.toJSON();
    },
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      console.log('Insert: ', event);
      this.bTree.put(event, 'insert');
      console.log(this.bTree.toString(true));
      console.log(this.bTree.toJSON());
    },
    deleteInputEvent(event) {
      console.log('Delete: ', event);
      this.bTree.del(event);
      this.bTree.print(0);
      console.log(this.bTree.toJSON());
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
