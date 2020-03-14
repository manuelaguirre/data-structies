<template>
  <div id="app">
    <BTreeVisualizer />
  </div>
</template>

<script>
import BTreeVisualizer from './components/BTreeVisualizer.vue';


export default {
  name: 'App',
  components: {
    BTreeVisualizer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
