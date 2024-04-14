<template>
  <div>
    <v-select
      label=""
      :items="props.items"
      variant="outlined"
      v-bind="$attrs"
    ></v-select>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array as PropType<any>,
    required: true,
  },
})
</script>
<style scoped lang="scss"></style>
