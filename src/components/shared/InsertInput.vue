<template>
  <div class="flex button-container">
    <v-text-field
      label="Insert a Value"
      :value="insertedValue"
      @input="insertedValue = $event"
    />
    <v-btn
      class="button"
      color="primary"
      @click="insertValue"
    >
      Insert Value
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'InsertInput',
  data() {
    return {
      insertedValue: 0,
    };
  },
  methods: {
    insertValue() {
      this.$emit('myEvent', this.insertedValue);
    },
  },
};
</script>

<style scoped>
.button-container {
  width: 100%;
  max-width: 300px;
}
.button {
  min-width: fit-content !important;
}
</style>
