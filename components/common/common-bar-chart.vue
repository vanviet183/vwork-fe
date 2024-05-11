<template>
  <div class="container">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  datasets: {
    type: Array as PropType<any[]>,
    required: true,
  },
  labels: {
    type: Array<String>,
    required: true,
  },
  isHorizontal: {
    type: Boolean,
    default: false,
  },
})

const chartData = {
  labels: props.labels,
  datasets: props.datasets,
}

const options = {
  responsive: true,
  indexAxis: props.isHorizontal ? 'y' : '',
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 3,
      },
    },
  },
}
</script>
<style scoped lang="scss">
@use 'sass:map';
</style>
