<template>
  <div
    id="app"
    class="flex bg-gray-200 justify-center"
  >
    <MainMenu />
    <BTreeVisualizer />
  </div>
</template>

<script>
import BTreeVisualizer from './components/BTreeVisualizer.vue';
import MainMenu from './components/MainMenu.vue';


export default {
  name: 'App',
  components: {
    BTreeVisualizer,
    MainMenu,
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
