<template>
  <div class="flex button-container align-center">
    <v-text-field
      class="text-field"
      placeholder="Insert a Value"
      :value="insertedValue"
      @input="insertedValue = $event"
      @keyup.enter="insertValue"
    >
      <v-tooltip
        slot="append"
        max-width="300"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-icon
            class="h-8"
            color="primary"
            dark
            v-on="on"
          >
            mdi-help-circle
          </v-icon>
        </template>
        <span>To insert multiple values sequentially,
          type the numbers separated with a comma. Example: 10,20,30</span>
      </v-tooltip>
    </v-text-field>
    <v-btn
      class="button"
      color="primary"
      :disabled="disabled"
      dark
      @click="insertValue"
    >
      Insert
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'InsertInput',
  props: {
    disabled: { type: Boolean },
  },
  data() {
    return {
      insertedValue: '',
    };
  },
  methods: {
    insertValue() {
      if (this.insertedValue !== '' && !this.disabled) {
        this.$emit('myEvent', this.insertedValue);
        this.insertedValue = '';
      }
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
