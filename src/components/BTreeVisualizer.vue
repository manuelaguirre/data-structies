<template>
  <div id="b-bTree-visualizer">
    <button
      class="structies-button back"
      @click="goBack"
    >
      Go back
    </button>
    <div>
      <h1 class="name">
        Structure: {{ $route.params.code }}
      </h1>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Router from 'vue-router';

d3.select('#b-tree-visualizer').append('div');
const router = new Router();

export default {
  name: 'BTree',
  props: {

  },
  methods: {
    goBack() {
      router.back();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .name {
    font-size: 3rem;
  }
  .structies-button {
    background-color:#0000ff;
    border-radius: 28px;
    border: 1px solid #c2c5ff;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    height: 45px;
    font-family: Arial;
    font-size: 17px;
    padding: 10px 31px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #001ba3;
  }
  .structies-button:hover {
    background-color:#3c48fa;
  }
  .back {
    position: absolute;
    left: 0;
  }


</style>
