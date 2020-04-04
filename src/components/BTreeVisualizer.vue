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
      <Visualizer
        :structuredata="tree"
      />
    </div>
  </div>
</template>

<script>
import Router from 'vue-router';
import btree from '../assets/implementations/btree';
import InsertInput from './shared/InsertInput.vue';
import DeleteInput from './shared/DeleteInput.vue';
import Visualizer from './shared/Visualizer.vue';

const router = new Router();
const Tree = btree.create(2, btree.numcmp);


export default {
  name: 'BTree',
  components: {
    InsertInput,
    DeleteInput,
    Visualizer,
  },
  data() {
    return {
      tree: new Tree(),
    };
  },
  created() {
    this.tree.put(5, 'Root');
    this.tree.put(1, 'one');
    this.tree.put(2, 'verde');
    this.tree.put(4, 'azul');
    this.tree.put(6, 'rojinho');
    this.tree.put(8, 'marron');
    this.tree.del(1);
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      this.tree.put(event.key, event.value);
    },
    deleteInputEvent(event) {
      this.tree.del(event);
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
