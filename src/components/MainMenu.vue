<template>
  <div
    id="menu-container"
    class="flex max-w-3xl menu-container"
  >
    <StructureItem
      v-for="item in dataStructures"
      :key="item.code"
      :name="item.name"
      :data-structure="item"
    />
  </div>
</template>

<script>
import StructureItem from './StructureItem.vue';

export default {
  name: 'MainMenu',
  components: {
    StructureItem,
  },
  props: {
  },
  data: () => ({
    dataStructures: [
      {
        name: 'B Tree',
        imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
        code: 'b-tree',
      }, {
        name: 'Min Heap',
        imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
        code: 'min-heap',
      },
    ],
  }),

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu-container {
    flex-wrap: wrap;
  }
</style>
