<template>
  <div class="wrapper-sidebar">
    <div class="sidebar relative">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
@use 'sass:map';

.sidebar {
  background-color: white;
  width: 360px;
  height: calc(100vh - 60px);

  border-right: 1px solid #e1d5d5;
}
.wrapper-sidebar {
  position: fixed;
}
</style>
