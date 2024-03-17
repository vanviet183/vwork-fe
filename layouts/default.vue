<template>
  <div>
    <v-layout class="main-layout">
      <div class="w-full">
        <CommonNavbar></CommonNavbar>
        <v-main class="main-content">
          <slot></slot>
        </v-main>
      </div>
    </v-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:map';

.main-layout {
  font-family: 'SF Pro Text', sans-serif;
  background-color: #f2f2f2;
  min-height: 100vh;
}
</style>
