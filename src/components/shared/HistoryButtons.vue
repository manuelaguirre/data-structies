<template>
  <div class="history-interface-container">
    <div class="flex button-container">
      <v-btn
        class="button deep-orange lighten-2"
        :disabled="current <= 0 || disabled"
        @click="historyBack"
      >
        <strong>&#8602;</strong>
      </v-btn>
      <v-btn
        class="button deep-orange lighten-2"
        :disabled="current >= length - 1 || disabled"
        @click="historyForward"
      >
        <strong>&#8603;</strong>
      </v-btn>
    </div>
    <span class="text-sm">History</span>
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
