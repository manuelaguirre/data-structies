<template>
  <div class="flex button-container">
    <v-btn
      class="button"
      color="primary"
      :disabled="disabled"
      @click="reanimate"
    >
      Reanimate
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Reanimate',
  props: {
    disabled: { type: Boolean },
  },
  methods: {
    reanimate() {
      this.$emit('reanimate', true);
    },
  },
};
</script>

<style>
.button-container {
  width: 100%;
  max-width: 300px;
}
.button {
  min-width: fit-content !important;
}
</style>
