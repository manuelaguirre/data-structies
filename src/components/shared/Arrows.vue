<template>
  <div class="flex button-container">
    <v-btn
      class="button"
      :disabled="active <= 0"
      @click="goBack"
    >
      <strong>&lt;</strong>
    </v-btn>
    <v-btn
      class="button"
      :disabled="active >= length - 1"
      @click="goForward"
    >
      <strong>&gt;</strong>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ArrowsComponent',
  props: {
    length: { type: Number, default: 1 },
    active: { type: Number, default: 0 },
  },
  methods: {
    goBack() {
      this.$emit('myEvent', -1);
    },
    goForward() {
      this.$emit('myEvent', 1);
    },
  },
};
</script>

<style scoped>
.button-container {
  width: 100%;
  max-width: 200px;
}
.button {
  min-width: fit-content !important;
  font-size: 1.5rem !important;
}
</style>
