<template>
  <div class="text-center">
    <v-progress-circular
      :model-value="props.percent"
      :rotate="360"
      :size="200"
      :width="15"
      color="blue"
    >
      <template #default> {{ `${props.percent} Công việc` }} </template>
    </v-progress-circular>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  percent: {
    type: Number,
    required: true,
  },
})
</script>
<style scoped lang="scss"></style>
