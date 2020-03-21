<template>
  <div id="b-bTree-visualizer">
    KAKO
  </div>
</template>

<script>
import * as d3 from 'd3';

d3.select('#b-tree-visualizer').append('div');


export default {
  name: 'BTree',
  props: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.node {
cursor: pointer;
}

.node circle {
fill: #fff;
stroke: steelblue;
stroke-width: 3px;
}

.node text {
 font: 12px sans-serif;
}

.link {
fill: none;
stroke: #ccc;
stroke-width: 2px;
}


</style>
