<template>
  <div class="d-flex align-center justify-between">
    <div class="d-flex align-center">
      <img :src="props.avatar" class="h-[40px]" alt="Vwork Logo" />
      <p class="ml-2">{{ props.fullName }}</p>
    </div>
    <div class="w-[50px] text-end">
      <p class="text-sm font-semibold">{{ percent }}%</p>

      <v-progress-linear
        :model-value="percent"
        color="green"
      ></v-progress-linear>
      <p class="text-sm">{{ `${props.taskCompleted}/${props.totalTask}` }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  avatar: {
    type: String,
    required: false,
    default: '',
  },
  fullName: {
    type: String,
    required: true,
  },
  totalTask: {
    type: Number,
    required: true,
  },
  taskCompleted: {
    type: Number,
    required: true,
  },
})

const percent = computed(() => getPercent())

function getPercent() {
  if (!props.totalTask) {
    return 0
  }
  return (props.taskCompleted / props.totalTask) * 100
}
</script>
<style scoped lang="scss"></style>
