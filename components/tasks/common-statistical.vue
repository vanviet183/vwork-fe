<template>
  <div class="wrapper-statistical p-4">
    <CommonChartGantt />

    <div class="d-flex gap-4">
      <div class="overview w-1/3 box-item">
        <p>Tổng công việc</p>
        <CommonCircleProgress
          v-if="!listTask?.length"
          :percent="0"
          class="mt-4"
        />

        <CommonDoughnutChart
          v-else
          :dataset-items="datasetsTaskStatus"
          :total-task="listTask?.length ?? 0"
          class="mt-4"
        />
        <div class="d-flex justify-between mt-4">
          <div>
            <p class="text-xs font-semibold">
              {{ datasetsTaskStatus[0] + datasetsTaskStatus[1] }} HOÀN THÀNH
            </p>
            <div class="text-sm d-flex align-center">
              <p class="w-[20px]">{{ datasetsTaskStatus[0] }}</p>
              <p>Đúng hạn</p>
            </div>
            <div class="text-sm d-flex align-center">
              <p class="w-[20px]">{{ datasetsTaskStatus[1] }}</p>
              <p>Muộn</p>
            </div>
          </div>
          <div>
            <p class="text-xs font-semibold">
              {{ datasetsTaskStatus[2] + datasetsTaskStatus[3] }} CHƯA HOÀN
              THÀNH
            </p>
            <div class="text-sm d-flex align-center">
              <p class="w-[20px]">{{ datasetsTaskStatus[2] }}</p>
              <p>Chưa tới hạn</p>
            </div>
            <div class="text-sm d-flex align-center">
              <p class="w-[20px]">{{ datasetsTaskStatus[3] }}</p>
              <p>Quá hạn</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-gantt w-2/3 box-item">
        Quá trình hoàn thành theo ngày
        <CommonLineChart />
      </div>
    </div>
    <div class="d-flex gap-4 mt-4">
      <div class="efficiency w-1/3 box-item">
        <p class="text-sm font-semibold">Hiệu suất công việc (%)</p>
        <div v-if="dataStatiscalUserTask?.length > 0">
          <CommonUserTask
            v-for="item in dataStatiscalUserTask"
            :key="item.id"
            :avatar="item.avatar"
            :total-task="item.totalTask ?? 0"
            :full-name="item.fullName"
            :task-completed="item.taskCompleted ?? 0"
            class="custom-user-task"
          />
        </div>
        <CommonEmpty v-else />
      </div>
      <div class="unfinished w-1/3 box-item">
        <p class="text-sm font-semibold">Quá trình hoàn thành theo ngày</p>
        <div v-if="dataStatiscalUserTaskByToday?.length > 0">
          <CommonUserTask
            v-for="item in dataStatiscalUserTaskByToday"
            :key="item.id"
            :avatar="item.avatar"
            :total-task="item.totalTask ?? 0"
            :full-name="item.fullName"
            :task-completed="item.taskCompleted ?? 0"
            class="custom-user-task"
          />
        </div>
        <CommonEmpty v-else />
      </div>
      <div class="out-of-date w-1/3 box-item">
        <p class="text-sm font-semibold">Quá hạn</p>
        <!-- <div v-if="dataStatiscalUserTaskOverdue?.length > 0">
          <CommonUserTask
            v-for="item in dataStatiscalUserTask"
            :key="item.id"
            :avatar="item.avatar"
            :total-task="item.totalTask ?? 0"
            :full-name="item.fullName"
            :task-completed="item.taskCompleted ?? 0"
            class="custom-user-task"
          />
        </div> -->
        <CommonEmpty />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/stores/project/project-store'

const projectStore = useProjectStore()
const { listTask } = storeToRefs(projectStore)

const datasetsTaskStatus = computed(() => getDatasetsTaskStatus())
const dataStatiscalUserTask = computed(() => getStatiscalUserTask())
const dataStatiscalUserTaskByToday = computed(() =>
  getStatiscalUserTaskByToDay()
)
const dataStatiscalUserTaskOverdue = computed(() => {
  return dataStatiscalUserTask.value.filter((item) => item.taskOverdue > 0)
})

function getDatasetsTaskStatus() {
  let completedOnTime = 0
  let completedLated = 0
  let doingOnTime = 0
  let doingLated = 0
  listTask.value?.forEach((item) => {
    if (item.status === 'Completed') {
      if (
        item.finishDay &&
        dayjs(item.finishDay).format('DD/MM/YYYY') >=
          dayjs(item.endDate).format('DD/MM/YYYY')
      ) {
        completedOnTime++
      } else {
        completedLated++
      }
    } else if (item.status === 'Doing') {
      if (
        dayjs().format('DD/MM/YYYY') <= dayjs(item.endDate).format('DD/MM/YYYY')
      ) {
        doingOnTime++
      } else {
        doingLated++
      }
    }
  })
  return [completedOnTime, completedLated, doingOnTime, doingLated]
}

function getStatiscalUserTask() {
  const data = listTask.value?.flatMap((item) =>
    item.users.map((user) => {
      const userTasks = listTask.value?.filter((task) =>
        task.users.includes(user)
      )
      const totalTasks = userTasks?.length
      const completedTasks = userTasks?.filter(
        (task) => task.status === 'Completed'
      ).length

      const overdueTasks = userTasks?.filter(
        (task) =>
          task.status === 'Doing' &&
          dayjs(task.finishDay ?? '').format('DD/MM/YYYY') >
            dayjs(task.endDate).format('DD/MM/YYYY')
      ).length

      return {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
        totalTask: totalTasks,
        taskCompleted: completedTasks,
        taskOverdue: overdueTasks ?? 0,
      }
    })
  )
  return data ?? []
}

function getStatiscalUserTaskByToDay() {
  const listTaskToday = listTask.value?.filter(
    (item) =>
      dayjs().format('DD/MM/YYYY') ===
      dayjs(item.startDate).format('DD/MM/YYYY')
  )
  const data = listTaskToday?.flatMap((item) =>
    item.users.map((user) => {
      const userTasks = listTask.value?.filter((task) =>
        task.users.includes(user)
      )
      const totalTasks = userTasks?.length
      const completedTasks = userTasks?.filter(
        (task) => task.status === 'Completed'
      ).length

      return {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
        totalTask: totalTasks,
        taskCompleted: completedTasks,
      }
    })
  )
  return data ?? []
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.wrapper-statistical {
  background-color: #f2f2f5;
  min-height: 100vh;
}
.box-item {
  padding: 16px;
  border-radius: 10px;
  background-color: white;
  min-height: 102px;
}
.custom-user-task {
  border-bottom: 1px solid #f2f2f5;
  padding: 6px 0;
}
</style>
