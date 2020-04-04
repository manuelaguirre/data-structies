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
        :structuredata="displayTree"
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
      displayTree: {},
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
    this.displayTree = this.transformB3toD3Data(this.tree);
  },
  methods: {
    goBack() {
      router.back();
    },
    insertInputEvent(event) {
      this.tree.put(event.key, event.value);
      this.displayTree = this.transformB3toD3Data(this.tree);
    },
    deleteInputEvent(event) {
      this.tree.del(event);
      this.displayTree = this.transformB3toD3Data(this.tree);
    },
    transformB3toD3Data(oldTree) {
      const newTree = {};
      if (oldTree && oldTree.root) {
        // Add the root. Then add child recursevely
        newTree.value = oldTree.root.leaves.reduce((val, leave) => `${val} ${leave.key}-`, '');
        newTree.value = newTree.value.substring(0, newTree.value.length - 1);
        newTree.name = oldTree.root.leaves.reduce((val, leave) => `${val} ${leave.value}(${leave.key})-`, '');
        newTree.name = newTree.name.substring(0, newTree.name.length - 1);
        newTree.children = [];
        oldTree.root.nodes.forEach((node) => {
          const child = this.transformB3toD3DataChild(node);
          if (child) {
            newTree.children.push(child);
          }
        });
      }
      return newTree;
    },
    transformB3toD3DataChild(node) {
      // Recursive way to disply node children
      if (!node || !node.leaves) {
        return null;
      }
      const newnode = {};
      if (node && node.leaves) {
        newnode.value = node.leaves.reduce((val, leave) => `${val}${leave.key}-`, '');
        newnode.value = newnode.value.substring(0, newnode.value.length - 1);
        newnode.name = node.leaves.reduce((val, leave) => `${val}${leave.value}(${leave.key})-`, '');
        newnode.name = newnode.name.substring(0, newnode.name.length - 1);
        newnode.children = [];
        if (node.nodes) {
          node.nodes.forEach((n_) => {
            const child = this.transformB3toD3DataChild(n_);
            if (child) {
              newnode.children.push(child);
            }
          });
        }
      }
      return newnode;
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
