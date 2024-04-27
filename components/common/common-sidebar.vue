<template>
  <div class="sidebar relative">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
@use 'sass:map';

.sidebar {
  background-color: white;
  width: 360px;
  min-height: calc(100vh - 60px);
  border-right: 1px solid #e1d5d5;
}
</style>
