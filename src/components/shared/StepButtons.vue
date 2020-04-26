<template>
  <div class="step-interface-container">
    <div class="flex button-container">
      <v-btn
        class="button yellow lighten-4"
        :disabled="disabled.backStepButtonIsDisabled"
        @click="stepBack"
      >
        <strong>&lt;</strong>
      </v-btn>
      <v-btn
        class="button yellow lighten-4"
        :disabled="disabled.forwardStepButtonIsDisabled"
        @click="stepForward"
      >
        <strong>&gt;</strong>
      </v-btn>
    </div>
    <span class="text-sm">Animation Frame</span>
  </div>
</template>

<script>
export default {
  name: 'StepButtons',
  props: {
    length: { type: Number, default: 1 },
    currentFrame: { type: Number, default: 0 },
    disabled: { type: Object, default: undefined },
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
