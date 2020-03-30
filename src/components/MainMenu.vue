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
    dataStructures: [{
      name: 'Pablo Lescano',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'b-tree',
    }, {
      name: 'Pablo Lescano',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-1',
    },
    {
      name: 'Pablo Lescano 2',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-2',
    }, {
      name: 'Pablo Lescano 3',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-3',
    }, {
      name: 'Pablo Lescano 4',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-4',
    }, {
      name: 'Pablo Lescano 5',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-5',
    }, {
      name: 'Pablo Lescano 6',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-6',
    }, {
      name: 'Pablo Lescano 7',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-7',
    }, {
      name: 'Pablo Lescano 8',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-8',
    }, {
      name: 'Pablo Lescano 9',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
      code: 'pablo-lescano-9',
    }],
  }),

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu-container {
    flex-wrap: wrap;
  }
</style>
