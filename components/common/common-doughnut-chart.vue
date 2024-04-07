<template>
  <div class="container">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
      :plugins="chartPlugins"
      class="m-auto"
    />
  </div>
</template>

<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [20, 50, 20, 60, 20],
      backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    },
  ],
}

const chartOptions = {
  responsive: true,
  cutout: '80%',
}

const customTitleInside = {
  id: 'customTitleInside',
  beforeDraw(chart: any) {
    const { ctx, width, height } = chart

    ctx.restore()
    const fontSize = '30px'
    ctx.font = fontSize + ' bold sans-serif'
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'middle'

    const text1 = '6'
    const text2 = 'Công việc'

    const textX = chart.getDatasetMeta(0).data[0].x
    const textY = chart.getDatasetMeta(0).data[0].y - 16
    // const textX = Math.round((width - ctx.measureText(text1).width) / 2)
    // const textY = height / 2 - 10 // Adjusted for two lines
    ctx.textAlign = 'center'
    ctx.fillText(text1, textX, textY)
    ctx.fillText(text2, textX, textY + parseInt(fontSize) * 1.2) // Adjust for second line spacing
    ctx.save()
  },
}

const chartPlugins = ref([customTitleInside])
</script>
<style scoped lang="scss">
.container {
  height: 300px;
}
</style>
