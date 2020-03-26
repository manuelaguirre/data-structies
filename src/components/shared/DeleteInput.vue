<template>
  <div class="button-container">
    <md-field>
      <label>Delete a Value</label>
      <md-input
        :value="deletedValue"
        @input="deletedValue = $event"
      />
    </md-field>
    <md-button
      class="button md-raised md-accent"
      @click="deleteValue"
    >
      delete Value
    </md-button>
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
  display: flex;
  width: 100%;
  max-width: 300px;
}
.button {
  min-width: fit-content !important;
}
</style>
