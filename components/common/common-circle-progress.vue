<template>
  <div class="text-center">
    <v-progress-circular
      :model-value="value"
      :rotate="360"
      :size="100"
      :width="15"
      color="blue"
    >
      <template #default> {{ `${value}%` }} </template>
    </v-progress-circular>
  </div>
</template>
<script setup lang="ts">
const value = ref(50)
</script>
<style scoped lang="scss"></style>
