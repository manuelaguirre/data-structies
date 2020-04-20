<template>
  <div class="flex button-container">
    <v-btn
      class="button"
      :disabled="current <= 0 || disabled"
      @click="historyBack"
    >
      <strong>&lt;</strong>
    </v-btn>
    <v-btn
      class="button"
      :disabled="current >= length - 1 || disabled"
      @click="historyForward"
    >
      <strong>&gt;</strong>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'HistoryButtons',
  props: {
    length: { type: Number, default: 1 },
    current: { type: Number, default: 0 },
    disabled: { type: Boolean },
  },
  methods: {
    historyBack() {
      this.$emit('historyEvents', -1);
    },
    historyForward() {
      this.$emit('historyEvents', 1);
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
