<template>
  <div
    id="app"
    class="flex bg-gray-200 justify-center"
  >
    <MainMenu />
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue';


export default {
  name: 'App',
  components: {

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
