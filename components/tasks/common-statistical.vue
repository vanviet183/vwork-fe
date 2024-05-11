<template>
  <div class="wrapper-statistical p-4">
    <CommonChartGantt
      v-if="authenticationStore.role === ROLE.PROJECT_MANAGER"
    />

    <div
      v-if="authenticationStore.role === ROLE.PROJECT_MANAGER"
      class="d-flex gap-4"
    >
      <div class="overview w-1/3 box-item">
        <p>Biểu đồ trạng thái công việc</p>
        <CommonCircleProgress
          v-if="!listTaskInProject?.length"
          :percent="0"
          class="mt-4"
        />

        <CommonDoughnutChart
          v-else
          :dataset-items="datasetsTaskStatus"
          :total-task="listTaskInProject?.length ?? 0"
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
        Biểu đồ trạng thái công việc ở mỗi nhóm
        <CommonBarChart
          :datasets="datasetsGroups"
          :labels="labelsGroup"
          class="mt-5"
        />
      </div>
    </div>
    <!-- <div class="mt-4 box-item">
      Biểu đồ số lượng công việc theo ngày
      <CommonLineChart class="mt-5" />
    </div> -->
    <div
      v-if="authenticationStore.role === ROLE.TEAMLEAD"
      class="d-flex gap-4 mt-4"
    >
      <div class="efficiency w-1/3 box-item">
        <p class="text-sm font-semibold">Hiệu suất công việc (%)</p>
        <div v-if="userStatistics?.length > 0">
          <CommonUserTask
            v-for="item in userStatistics"
            :key="item.id"
            :avatar="item.avatar"
            :total-task="item.totalTasks ?? 0"
            :full-name="item.fullName"
            :task-completed="item.completedTasks ?? 0"
            class="custom-user-task"
          />
        </div>
        <CommonEmpty v-else />
      </div>
      <div class="unfinished w-1/3 box-item">
        <p class="text-sm font-semibold">Quá trình hoàn thành theo ngày</p>
        <div v-if="userStatistics?.length > 0">
          <CommonUserTask
            v-for="item in userStatistics"
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

        <CommonEmpty />
      </div>
    </div>
    <div class="mt-4 box-item">
      <ListUserTaskProgress :items="userStatistics ?? []" />
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { storeToRefs } from 'pinia'
import { ROLE, SECTOR, TASK_STATUS } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useUserStore } from '~/stores/user/user-store'

dayjs.extend(isSameOrBefore)

const projectStore = useProjectStore()
const { listTaskInProject, projectInfo } = storeToRefs(projectStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()

// const labels = computed(() => getDaysBetweenDates())

const datasetsTaskStatus = computed(() => getDatasetsTaskStatus())
const userStatistics = computed(() => getStatiscalUserTask())

const datasetsGroupsItems = computed(() => getStatiscalStatusTaskByGroup())
const datasetsGroups = [
  {
    label: 'Chưa thực hiện',
    data: datasetsGroupsItems.value[0] ?? [],
    backgroundColor: '#F9F2ED',
  },
  {
    label: 'Đang thực hiện',
    data: datasetsGroupsItems.value[1] ?? [],
    backgroundColor: '#3AB0FF',
  },
  {
    label: 'Chờ đánh giá',
    data: datasetsGroupsItems.value[2] ?? [],
    backgroundColor: '#FFB562',
  },
  {
    label: 'Hoàn thành',
    data: datasetsGroupsItems.value[3] ?? [],
    backgroundColor: '#A5DD9B',
  },
]

const labelsGroup = [
  SECTOR.DEVOPS,
  SECTOR.BA,
  SECTOR.BACKEND,
  SECTOR.FRONTEND,
  SECTOR.TESTER,
]

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

interface GroupUserTask {
  [key: string]: any
}

function getStatiscalStatusTaskByGroup() {
  const groupUserTask: GroupUserTask = {}

  userStatistics.value.forEach((user) => {
    const sector = user.sector
    if (!groupUserTask[sector]) {
      groupUserTask[sector] = {
        completedTasks: 0,
        doingTasks: 0,
        waitTasks: 0,
        noneTasks: 0,
      }
    }

    groupUserTask[sector].completedTasks += user.completedTasks
    groupUserTask[sector].doingTasks += user.doingTasks
    groupUserTask[sector].waitTasks += user.waitTasks
    groupUserTask[sector].noneTasks += user.noneTasks
  })
  const datasetsNoneTask: number[] = []
  const datasetsDoingTask: number[] = []
  const datasetsWaitTask: number[] = []
  const datasetsCompeltedTask: number[] = []

  const listGroupUserTask = Object.values(groupUserTask)
  listGroupUserTask.forEach((item) => {
    datasetsNoneTask.push(item.noneTasks)
    datasetsDoingTask.push(item.doingTasks)
    datasetsWaitTask.push(item.waitTasks)
    datasetsCompeltedTask.push(item.completedTasks)
  })

  return [
    datasetsNoneTask,
    datasetsDoingTask,
    datasetsWaitTask,
    datasetsCompeltedTask,
  ]
}

function getDatasetsTaskStatus() {
  let completedOnTime = 0
  let completedLated = 0
  let doingOnTime = 0
  let doingLated = 0
  listTaskInProject.value?.forEach((item) => {
    if (item.status === 'Completed') {
      if (
        item.finishDay &&
        dayjs(item.finishDay).format('YYYY/MM/DD') >=
          dayjs(item.endDate).format('YYYY/MM/DD')
      ) {
        completedOnTime++
      } else {
        completedLated++
      }
    } else if (item.status === 'Doing') {
      if (
        dayjs().format('YYYY/MM/DD') <= dayjs(item.endDate).format('YYYY/MM/DD')
      ) {
        doingOnTime++
      } else {
        doingLated++
      }
    }
  })
  return [completedOnTime, completedLated, doingOnTime, doingLated]
}

interface UserStatistics {
  [key: number]: any
}

function getStatiscalUserTask() {
  const userStatistics: UserStatistics = {}

  listTaskInProject.value?.forEach((task) => {
    const users = task.users
    users.forEach((user) => {
      const userId = user.id
      const userName = `${user.firstName} ${user.lastName}`
      const status = task.status
      if (!userStatistics[userId]) {
        userStatistics[userId] = {
          ...user,
          fullName: userName,
          totalTasks: 0,
          completedTasks: 0,
          unfinishedTasks: 0,
          doingTasks: 0,
          waitTasks: 0,
          noneTasks: 0,
        }
      }
      userStatistics[userId].totalTasks++
      if (status !== TASK_STATUS.COMPLETED) {
        userStatistics[userId].unfinishedTasks++
        if (status === TASK_STATUS.NONE) {
          userStatistics[userId].noneTasks++
        } else if (status === TASK_STATUS.DOING) {
          userStatistics[userId].doingTasks++
        } else {
          userStatistics[userId].waitTasks++
        }
      } else {
        userStatistics[userId].completedTasks++
      }
      userStatistics[userId].progress = getProgress(
        userStatistics[userId].completedTasks ?? 0,
        userStatistics[userId].totalTasks ?? 0
      )
    })
  })

  const listUserStatistics = Object.values(userStatistics)
  if (authenticationStore.role === ROLE.TEAMLEAD) {
    return listUserStatistics.filter(
      (item) => item.sector === userInfo.value.sector
    )
  }
  return listUserStatistics
}

function getStatiscalUserTaskByToDay() {
  const listTaskToday = listTaskInProject.value?.filter(
    (item) =>
      dayjs().format('YYYY/MM/DD') ===
      dayjs(item.startDate).format('YYYY/MM/DD')
  )
  const data = listTaskToday?.flatMap((item) =>
    item.users.map((user) => {
      const userTasks = listTaskInProject.value?.filter((task) =>
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

function getProgress(taskCompleted: number, totalTask: number) {
  if (!totalTask) {
    return 0
  }
  return (taskCompleted / totalTask) * 100
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
