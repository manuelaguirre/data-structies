<template>
  <div class="flex button-container">
    <v-text-field
      class="text-field"
      label="Insert a Value"
      :value="insertedValue"
      @input="insertedValue = $event"
      @keyup.enter="insertValue"
    />
    <v-btn
      class="button"
      color="primary"
      @click="insertValue"
    >
      Insert
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'InsertInput',
  data() {
    return {
      insertedValue: '',
    };
  },
  methods: {
    insertValue() {
      this.$emit('myEvent', this.insertedValue);
      this.insertedValue = '';
    },
  },
};
</script>

<style>
.button-container {
  width: 100%;
  max-width: 300px;
}
.text-field{
  margin-bottom: 1rem;
}
.button {
  min-width: fit-content !important;
}
</style>
