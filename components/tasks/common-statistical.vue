<template>
  <div class="wrapper-statistical p-4">
    <CommonChartGantt
      v-if="authenticationStore.role === ROLE.PROJECT_MANAGER"
    />

    <div class="d-flex gap-4">
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
      <div
        v-if="authenticationStore.role === ROLE.PROJECT_MANAGER"
        class="chart-gantt w-full box-item"
      >
        Biểu đồ trạng thái công việc ở mỗi nhóm
        <CommonBarChart
          :datasets="datasetsGroups"
          :labels="labelsGroup"
          class="mt-5"
        />
      </div>
      <div
        v-else-if="authenticationStore.role === ROLE.TEAMLEAD && datasets"
        class="w-2/3 box-item"
      >
        Biểu đồ trạng thái công việc nhóm
        <CommonBarChart :datasets="datasets" :labels="labels" class="mt-5" />
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

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const labelsGroup = [
  SECTOR.DEVOPS,
  SECTOR.BA,
  SECTOR.BACKEND,
  SECTOR.FRONTEND,
  SECTOR.TESTER,
]

const labels = [
  'Hoàn thành',
  'Đang thực hiện',
  'Chờ đánh giá',
  'Chưa thực hiện',
]

const projectStore = useProjectStore()
const { listTaskInProject } = storeToRefs(projectStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()

const datasetsTaskStatus = computed(() => getDatasetsTaskStatus())
const userStatistics = computed(() => getStatiscalUserTask())

const datasetsGroupsItems = computed(() => getStatiscalStatusTaskByGroup())
const datasetsItems = computed(() => getStatiscalStatusTask())

const datasetsGroups = ref([
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
])

const colorPalette = ['#A5DD9B', '#3AB0FF', '#FFB562', '#F9F2ED']
const datasets = ref([
  {
    label: `${userInfo.value?.sector}`,
    data: datasetsItems.value ?? [],
    backgroundColor: colorPalette,
  },
])

onMounted(async () => {
  await projectStore.getAllTaskInProject(projectId.value)
  if (authenticationStore.role === ROLE.TEAMLEAD) {
    filterTasksForUser()
  }
})

interface GroupUserTask {
  [key: string]: any
}

function getDatasetsTaskStatus() {
  let completedOnTime = 0
  let completedLated = 0
  let doingOnTime = 0
  let doingLated = 0
  if (authenticationStore.role === ROLE.TEAMLEAD) {
    filterTasksForUser()
  }
  listTaskInProject.value?.forEach((item) => {
    if (item.status === TASK_STATUS.COMPLETED) {
      if (
        item.finishDay &&
        dayjs(item.finishDay).format('YYYY/MM/DD') <=
          dayjs(item.endDate).format('YYYY/MM/DD')
      ) {
        completedOnTime++
      } else {
        completedLated++
      }
    } else if (item.status !== TASK_STATUS.COMPLETED) {
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

// Statiscal user by task
function getStatiscalUserTask() {
  const userStatistics: UserStatistics = {}

  listTaskInProject.value?.forEach((task) => {
    const users = task.users
    users?.forEach((user) => {
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
      (item) => item.sector === userInfo.value?.sector
    )
  }
  return listUserStatistics
}

// Get progress of user
function getProgress(taskCompleted: number, totalTask: number) {
  if (!totalTask) {
    return 0
  }
  const progress = ((taskCompleted / totalTask) * 100).toFixed(2)
  return Number(progress)
}

// Filter task by user in sector
function filterTasksForUser() {
  const listTaskOfGroup =
    listTaskInProject.value?.filter((task) => {
      // Check if users exist and any user has a matching sector
      return task.users?.some((user) => user.sector === userInfo.value?.sector)
    }) ?? []

  listTaskInProject.value = listTaskOfGroup
}

// Statiscal task by group
function getStatiscalStatusTaskByGroup() {
  const groupUserTask: GroupUserTask = {}

  labelsGroup.forEach((sector) => {
    const listTaskSector =
      listTaskInProject.value?.filter((task) => {
        // Check if users exist and any user has a matching sector
        return task.users?.some((user) => user.sector === sector)
      }) ?? []

    let cntCompletedTasks = 0
    let cntDoingTasks = 0
    let cntWaitTasks = 0
    let cntNoneTasks = 0
    listTaskSector.forEach((item) => {
      if (item.status === TASK_STATUS.COMPLETED) {
        cntCompletedTasks++
      } else if (item.status === TASK_STATUS.WAIT_ACCEPT) {
        cntWaitTasks++
      } else if (item.status === TASK_STATUS.DOING) {
        cntDoingTasks++
      } else {
        cntNoneTasks++
      }
    })

    groupUserTask[sector] = {
      completedTasks: cntCompletedTasks,
      doingTasks: cntDoingTasks,
      waitTasks: cntWaitTasks,
      noneTasks: cntNoneTasks,
    }
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

// Statiscal status task for teamlead
function getStatiscalStatusTask() {
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

  const groupObj = Object.values(groupUserTask)
  return Object.values(groupObj[0])
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
