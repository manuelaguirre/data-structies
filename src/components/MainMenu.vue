<template>
  <v-container
    id="menu-container"
    fluid
    class="flex-column max-w-3xl menu-container"
  >
    <p />
    <v-container
      fluid
      class="flex structure-list justify-center"
    >
      <StructureItem
        v-for="item in dataStructures"
        :key="item.code"
        :name="item.name"
        :data-structure="item"
      />
    </v-container>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        sm="6"
      >
        <img
          aria-label="Logo Structies"
          src="https://firebasestorage.googleapis.com/v0/b/structies.appspot.com/o/structies-logo.png?alt=media&token=14401c07-2ec3-4630-9e0d-ae70c80b4bae"
        >
      </v-col>
    </v-row>
    <v-container>
      <h2 class="title">
        Developed with love by
      </h2>
      <h3 class="subtitle-1">
        <a
          target="_blank"
          role="link"
          aria-label="Creator git-hub link"
          href="https://github.com/manuelaguirre"
        >manuelaguirre</a>
        &
        <a
          target="_blank"
          role="link"
          aria-label="Creator git-hub link"
          href="https://github.com/sebastianfdez"
        >sebastianfdez</a>
      </h3>
    </v-container>
  </v-container>
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
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/structies.appspot.com/o/BTree.png?alt=media&token=403220cb-809a-4425-bbec-24e857ac7a40',
        code: 'b-tree',
      },
      {
        name: 'Min Heap',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/structies.appspot.com/o/minheap.jpg?alt=media&token=98746fc9-b164-421a-8690-bc1c2bcdef63',
        code: 'min-heap',
      },
      {
        name: 'Max Heap',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/structies.appspot.com/o/MaxHeap.png?alt=media&token=2c9e0ccd-7a9c-4021-9856-ed10c94ff452',
        code: 'max-heap',
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
