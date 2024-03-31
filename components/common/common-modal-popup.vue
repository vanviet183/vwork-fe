<template>
  <v-dialog :model-value="isShow" persistent width="auto">
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
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: map.get($colors, 'black-45');
}
.popup-title {
  color: map.get($colors, 'dim-gray');
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0.15px;
}
.popup-content {
  position: relative;
  z-index: 4;
  padding: 20px;
  width: 600px !important;
  border-radius: 10px;
  background: white;
}
</style>
