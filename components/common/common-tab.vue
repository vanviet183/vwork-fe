<template>
  <div class="wrapper">
    <v-tabs v-model="tab" density="compact">
      <v-tab
        v-for="item in props.items"
        :key="item.value"
        :value="item.value"
        >{{ item.title }}</v-tab
      >
    </v-tabs>

    <v-card-text v-if="isContent">
      <v-window v-model="tab">
        <v-window-item
          v-for="item in props.items"
          :key="item.value"
          :value="item.value"
        >
          {{ item.title }}
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
<script setup lang="ts">
import { Tab } from '~/models/interface/common/tab'

const props = defineProps({
  items: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
  isContent: {
    type: Boolean,
    required: false,
  },
})
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
