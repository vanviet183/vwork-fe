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
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { storeToRefs } from 'pinia'
import { Line } from 'vue-chartjs'
import { useProjectStore } from '~/stores/project/project-store'

dayjs.extend(isSameOrBefore)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const projectStore = useProjectStore()
const { projectInfo, listTaskInProject } = storeToRefs(projectStore)

const labelsValue = computed(() => getDaysBetweenDates())
const datasetsValue = computed(() => getStatiscalTaskByDate())

const chartData = {
  labels: labelsValue.value,
  datasets: [
    {
      label: 'Số lượng công việc',
      fill: true,
      data: datasetsValue.value ?? [],
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
  scales: {
    y: {
      display: true,
      min: 0,
      ticks: {
        beginAtZero: true,
      },
    },
  },
}

function getDaysBetweenDates() {
  const start = dayjs(projectInfo.value?.startDate ?? '')
  const end = dayjs(projectInfo.value?.endDate ?? '')
  const days: string[] = []

  for (
    let current = start;
    current.isSameOrBefore(end, 'day');
    current = current.add(1, 'day')
  ) {
    days.push(current.format('DD/MM/YYYY'))
  }
  return days
}

interface TaskDate {
  [day: string]: number
}

function getStatiscalTaskByDate() {
  const taskObj: TaskDate = {}
  const days = getDaysBetweenDates()
  days.forEach((day) => {
    if (!taskObj[day]) {
      taskObj[day] = 0
    }
    const amoutTaskDay =
      listTaskInProject.value?.filter(
        (item) => dayjs(item.startDate).format('DD/MM/YYYY') === day
      ) ?? []
    taskObj[day] = amoutTaskDay.length
  })

  return Object.values(taskObj)
}
</script>
<style scoped lang="scss"></style>
