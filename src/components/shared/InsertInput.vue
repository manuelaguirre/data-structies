<template>
  <div class="flex button-container">
    <v-text-field
      class="text-field"
      label="Value"
      :value="insertedValue"
      @input="insertedValue = $event"
      @keyup.enter="insertValue"
    />
    <v-text-field
      class="text-field"
      label="Key"
      :value="insertedKey"
      @input="insertedKey = $event"
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
      insertedKey: '',
    };
  },
  methods: {
    insertValue() {
      this.$emit('myEvent', { value: this.insertedValue, key: this.insertedKey });
      this.insertedValue = '';
      this.insertedKey = '';
    },
  },
};
</script>

<style>
.button-container {
  width: 100%;
  max-width: 400px;
}
.text-field{
  margin-bottom: 1rem;
}
.button {
  min-width: fit-content !important;
}
</style>
