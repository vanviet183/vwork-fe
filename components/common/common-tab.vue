<template>
  <div class="wrapper">
    <v-tabs v-model="tab" density="compact">
      <v-tab value="one">Tat ca</v-tab>
      <v-tab value="two">Cong viec</v-tab>
      <v-tab value="three">Lich</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"> One </v-window-item>

        <v-window-item value="two"> Two </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
<script setup lang="ts">
const tab = ref(null)
</script>
<style scoped lang="scss">
@use 'sass:map';

:deep(.v-btn__content) {
  text-transform: none;
}
:deep(.v-tabs) {
  border-bottom: 1px solid #dbdbde;
}
:deep(.v-slide-group-item--active) {
  color: #73787e;
}
</style>
