/* eslint-disable max-len */
<template>
  <div
    id="structure-item-container"
    class="font-hairline inline-block flex-shrink-0 border-2 border-content rounded-md bg-white overflow-hidden w-32 h-48 p-2"
  >
    <div id="img-wrapper h-2/3">
      <img
        class="object-cover object-bottom "
        :src="dataStructure.imageUrl"
        :alt="dataStructure.name"
      >
    </div>
    <h4 class="pt-8">
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
img{

}

</style>
