<template>
  <v-menu>
    <template #activator="{ props }">
      <div class="cursor-pointer edit-more" v-bind="props">
        <v-icon icon="mdi-dots-vertical"></v-icon>
      </div>
    </template>
    <div class="options-container blur-x8"><slot></slot></div>
  </v-menu>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:map';
.edit-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  max-width: fit-content;
  aspect-ratio: 1/1;
}
.edit-more:hover {
  border-radius: 50%;
  background-color: map.get($colors, 'light-silver');
}
.options-container {
  background-color: white;
  border: 1px solid map.get($colors, 'slight-light-gray');
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
