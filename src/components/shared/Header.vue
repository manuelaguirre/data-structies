<template fluid>
  <v-card
    color="#edf2f7"
    flat
    tile
    height="80px"
  >
    <v-toolbar
      height="80px"
    >
      <!-- <v-app-bar-nav-icon /> -->
      <v-spacer />
      <router-link to="/">
        <v-img
          aria-label="Logo Structies"
          contain
          class="header-logo"
          click
          src="https://firebasestorage.googleapis.com/v0/b/structies.appspot.com/o/structies-logo.png?alt=media&token=14401c07-2ec3-4630-9e0d-ae70c80b4bae"
        />
      </router-link>

      <v-spacer />
    </v-toolbar>
  </v-card>
</template>

<script>

import Router from 'vue-router';

const router = new Router();

export default {
  name: 'Header',
  methods: {
    goBack() {
      router.go(-1);
    },
  },
};
</script>

<style scoped>
.header-logo {
  max-width: 120px;
}
</style>
