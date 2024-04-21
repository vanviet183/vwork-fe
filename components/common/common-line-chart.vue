<template>
  <div class="container">
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const labels = Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`)
const chartData = {
  labels,
  datasets: [
    {
      label: 'Dataset 2',
      data: Array.from({ length: 15 }, () => Math.floor(Math.random() * 100)),
      borderColor: '#17b0e1',
      // pointRadius: 0, // hide point
      pointStyle: 'line',
      order: 1,
      tension: 0.4,
    },
  ],
}

const options = {
  responsive: true,
}
</script>
<style scoped lang="scss"></style>
