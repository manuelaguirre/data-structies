<template>
  <div class="flex button-container align-center">
    <v-text-field
      v-if="!onlypop"
      color="error"
      class="text-field"
      placeholder="Delete a Value"
      :value="deletedValue"
      @input="deletedValue = $event"
      @keyup.enter="deleteValue"
    />
    <v-btn
      color="error"
      class="button"
      :disabled="disabled"
      @click="deleteValue"
    >
      Delete
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DeleteInput',
  props: {
    onlypop: { type: Boolean },
    disabled: { type: Boolean },
  },
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
.text-field{
  margin-right: 1rem;
}
.button {
  min-width: fit-content !important;
}
</style>
