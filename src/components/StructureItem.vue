/* eslint-disable max-len */
<template>
  <div
    class="structure-item-container block border rounded-md bg-white overflow-hidden object-cover"
  >
    <img
      class=""
      :src="dataStructure.imageUrl"
      :alt="dataStructure.name"
    ><h4 class="p-4">
      {{ dataStructure.name }}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'StructureItem',
  props: {
    dataStructure: {
      name: String,
      imageUrl: String,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  margin: 40px 0 0;
}

</style>
