<template>
  <v-layout class="main-layout">
    <v-main class="main-content">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:map';

.main-layout {
  font-family: 'Roboto';
}
</style>
