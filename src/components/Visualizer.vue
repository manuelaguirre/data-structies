<template>
  <div>Aquí va el visualizador</div>
</template>

<script>
import btree from '../assets/implementations/btree';

const Tree = btree.create(2, btree.numcmp);

export default {
  props: {
    implementation: {
      type: Tree,
      default: null,
    },
  },

};
</script>

<style>

</style>
