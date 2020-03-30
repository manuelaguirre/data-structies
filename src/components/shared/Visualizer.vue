<template>
  <svg
    :width="width"
    :height="height"
  />
</template>

<script>
import btree from '../../assets/implementations/btree';

const Tree = btree.create(2, btree.numcmp);

export default {
  name: 'Visualizer',
  props: {
    width: { type: Number, default: 800 },
    height: { type: Number, default: 450 },
    implementation: {
      type: Tree,
      default: null,
    },
    watch: {
      implementation: 'renderSvg',
    },
  },

};
</script>

<style>

</style>
