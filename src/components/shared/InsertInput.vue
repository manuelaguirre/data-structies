<template>
  <div class="button-container">
    <md-field>
      <label>Insert a Value</label>
      <md-input
        :value="insertedValue"
        @input="insertedValue = $event"
      />
    </md-field>
    <md-button
      class="button md-raised md-primary"
      @click="insertValue"
    >
      Insert Value
    </md-button>
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
  display: flex;
  width: 100%;
  max-width: 300px;
}
.button {
  min-width: fit-content !important;
}
</style>
