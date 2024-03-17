<template>
  <v-autocomplete
    clearable
    chips
    placeholder="Search"
    :items="[
      'California',
      'Colorado',
      'Florida',
      'Georgia',
      'Texas',
      'Wyoming',
    ]"
    multiple
    variant="solo-filled"
  ></v-autocomplete>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
:deep(.v-input__control) {
  width: 200px;
  height: 40px;
}
:deep(.v-field) {
  box-shadow: none;
}
:deep(.v-field__field) {
  height: 40px;
}
:deep(.v-field__input) {
  height: 40px;
  padding: 0 12px;
  input {
    height: 40px;
    margin: 0;
  }
}
:deep(.v-input__details) {
  display: none;
}
</style>
