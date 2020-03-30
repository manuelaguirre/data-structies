<template>
  <div class="flex button-container">
    <v-text-field
      label="Delete a Value"
      :value="deletedValue"
      @input="deletedValue = $event"
    />
    <v-btn
      color="error"
      class="button"
      @click="deleteValue"
    >
      Delete Value
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DeleteInput',
  data() {
    return {
      deletedValue: 0,
    };
  },
  methods: {
    deleteValue() {
      this.$emit('myEvent', this.deletedValue);
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
