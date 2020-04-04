<template>
  <div class="flex button-container">
    <v-text-field
      color="error"
      label="Delete a Value"
      :value="deletedValue"
      @input="deletedValue = $event"
      @keyup.enter="deleteValue"
    />
    <v-btn
      color="error"
      class="button"
      @click="deleteValue"
    >
      Delete
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DeleteInput',
  data() {
    return {
      deletedValue: '',
    };
  },
  methods: {
    deleteValue() {
      this.$emit('myEvent', this.deletedValue);
      this.deletedValue = '';
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
