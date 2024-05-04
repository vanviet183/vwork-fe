<template>
  <v-dialog
    :model-value="props.isShow"
    width="auto"
    :v-bind="$attrs"
    scroll-strategy="reposition"
    class="custom-popup"
    persistent
    no-click-animation
  >
    <div class="popup-content blur-x2">
      <h2 class="popup-title">{{ props.title }}</h2>
      <slot></slot>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isShow: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped lang="scss">
@use 'sass:map';

.popup-content {
  position: relative;
  z-index: 4;
  padding: 20px;
  border-radius: 4px;
  background: white;
  width: 600px;
}
.popup-title {
  color: map.get($colors, 'text-color');
  font-weight: 600;
}
.custom-popup {
  overflow: auto;
  z-index: 999 !important;
}
</style>
