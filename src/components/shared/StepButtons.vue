<template>
  <div class="flex button-container">
    <v-btn
      class="button"
      :disabled="false"
      @click="stepBack"
    >
      <strong>&lt;</strong>
    </v-btn>
    <v-btn
      class="button"
      :disabled="currentFrame >= length - 1 || disabled"
      @click="stepForward"
    >
      <strong>&gt;</strong>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'StepButtons',
  props: {
    length: { type: Number, default: 1 },
    currentFrame: { type: Number, default: 0 },
    disabled: { type: Boolean },
  },
  methods: {
    stepBack() {
      this.$emit('frameHistoryEvents', -1);
    },
    stepForward() {
      this.$emit('frameHistoryEvents', 1);
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
  background-color: beige;
}
</style>
