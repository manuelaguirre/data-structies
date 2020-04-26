<template>
  <v-app>
    <Header
      elevation="1"
      class="flex full-width app-header"
    />
    <div
      id="app"
      class="flex justify-center"
    >
      <router-view />
    </div>
  </v-app>
</template>

<script>

import Header from './components/shared/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
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
    background-color: #edf2f7;
    min-height: 450px;
  }
  .full-width {
    max-width: 100% !important;
    padding: 0;
    width: 100%;
  }
  .app-header {
    background-color: initial;
  }
</style>
