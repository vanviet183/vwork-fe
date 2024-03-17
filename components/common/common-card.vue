<template>
  <div class="card-item cursor-pointer">
    <v-card class="mx-auto" width="320">
      <template #title> {{ props.title }} </template>

      <v-card-text> {{ props.subtitle }} </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})
</script>
<style scoped lang="scss">
@use 'sass:map';

:deep(.v-card) {
  border-radius: 12px;
}
</style>
