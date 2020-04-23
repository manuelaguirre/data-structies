/* eslint-disable max-len */
<template>
  <div
    id="structure-item-container"
    class="flex-column item-container font-hairline inline-block flex-shrink-0 border-2 border-content
      rounded-md bg-white overflow-hidden w-64 h-48 p-2"
  >
    <div id="img-wrapper">
      <img
        class="mx-auto"
        :src="dataStructure.imageUrl"
        :alt="dataStructure.name"
      >
    </div>
    <h4 class="pt-8">
      <router-link :to="'/structure/' + dataStructure.code">
        {{ dataStructure.name }}
      </router-link>
    </h4>
    <h3>
      {{ dataStructure.code }}
    </h3>
  </div>
</template>

<script>

export default {
  name: 'StructureItem',
  props: {
    dataStructure: {
      name: String,
      imageUrl: String,
      code: String,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item-container {
    height: fit-content;
    min-height: 200px;
  }
  span {
    margin: 40px 0 0;
  }
</style>
