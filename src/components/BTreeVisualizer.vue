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
      <Visualizer />
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Router from 'vue-router';
import btree from '../assets/implementations/btree';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';
import Visualizer from './shared/Visualizer.vue';

const Tree = btree.create(2, btree.numcmp);
const tree = new Tree();
tree.put(1, 'one');
tree.put(2, 'verde');
tree.put(4, 'azul');
tree.put(5, 'rojinho');
tree.put(8, 'marron');
tree.del(1);
d3.select('#b-tree-visualizer').append('div');
console.log(tree.print);

const router = new Router();

export default {
  name: 'BTree',
  components: {
    InsertInput,
    DeleteInput,
    Visualizer,
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      console.log('Insert: ', event);
      tree.put(event, 'insert');
      console.log(tree.toString(true));
    },
    deleteInputEvent(event) {
      console.log('Delete: ', event);
      tree.del(event);
      tree.print(0);
      console.log(tree.toJSON());
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
