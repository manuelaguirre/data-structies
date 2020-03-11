<template>
  <StructureItem :dataStructure="dataStructure" />
</template>

<script>
import StructureItem from './StructureItem.vue';

export default {
  name: 'MainMenu',
  components: {
    StructureItem,
  },
  props: {
    msg: String,
  },
  data: () => ({
    dataStructure: {
      name: 'Pablo Lescano',
      imageUrl: 'https://cdn.cienradios.com/wp-content/uploads/sites/4/2020/02/pablito-lescano.gif',
    },
  }),

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
