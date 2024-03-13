<template>
  <div class="custom-px text-center">
    <v-alert variant="outlined" type="warning" prominent v-bind="$attrs">
      <slot></slot>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import colors from '~/assets/scss/main.module.scss'
const props = defineProps({
  color: {
    type: String,
    default: colors['rich-black'],
  },
})
</script>

<style scoped lang="scss">
@use 'sass:map';

:deep(.v-alert) {
  padding: 0;
  color: v-bind(color) !important;
}
:deep(.v-alert__prepend) {
  margin: 0 !important;
}
:deep(.v-icon) {
  font-size: 24px !important;
  color: v-bind(color);
}
:deep(.v-alert__content) {
  text-align: start !important;
  font-size: 14px;
  font-weight: 400;
}
</style>
