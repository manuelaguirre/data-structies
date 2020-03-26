<template>
  <div
    id="b-bTree-visualizer"
    class="container"
  >
    <md-button
      class="back md-raised md-primary"
      @click="goBack"
    >
      Go back
    </md-button>
    <div class="title">
      <h1 class="name">
        Structure: {{ $route.params.code }}
      </h1>
    </div>
    <div class="buttons">
      <InsertInput
        @myEvent="insertInputEvent"
      />
      <DeleteInput
        @myEvent="deleteInputEvent"
      />
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Router from 'vue-router';
import btree from '../assets/implementations/btree';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';

const Tree = btree.create(2, btree.numcmp);
const tree = new Tree();
tree.put(0, 'null');
tree.put(1, 'one');
tree.put(2, 'verde');
tree.put(4, 'azul');
tree.put(5, 'rojinho');
tree.put(8, 'marron');
tree.del(1);
// console.log(tree.get(8));// == "marron")
d3.select('#b-tree-visualizer').append('div');

const router = new Router();

export default {
  name: 'BTree',
  components: {
    InsertInput,
    DeleteInput,
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      console.log('Insert: ', event);
      tree.put(event, 'insert');
      console.log(tree);
    },
    deleteInputEvent(event) {
      console.log('Delete: ', event);
      tree.del(event);
      console.log(tree);
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
    display: flex;
    place-content: space-around;
  }
  .container {
    width: 100%;
    padding: 50px;
    flex-direction: column;
  }


</style>
