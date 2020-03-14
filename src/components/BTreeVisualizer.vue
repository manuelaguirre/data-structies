<template>
  <div class="b-tree-visualizer">
    KAKO
  </div>
</template>

<script>
export default {
  name: 'BTree',
  props: {
    msg: String,
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
