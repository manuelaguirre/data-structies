<template>
  <div
    id="app"
    class="flex bg-gray-200 justify-center"
  >
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

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
    min-height: 450px;
  }
</style>
