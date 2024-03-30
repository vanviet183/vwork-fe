<template>
  <div class="wrapper-tabs">
    <v-tabs v-model="tab" density="compact">
      <v-tab :value="TAB_LOGIN.EMAIL">Email</v-tab>
      <v-tab :value="TAB_LOGIN.PHONE">SDT</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item :value="TAB_LOGIN.EMAIL">
          <CommonTextField></CommonTextField>
          <CommonTextField></CommonTextField>
        </v-window-item>
        <v-window-item :value="TAB_LOGIN.PHONE"> </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
<script setup lang="ts">
import { TAB_LOGIN } from '~/constants'

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
