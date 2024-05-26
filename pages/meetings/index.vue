<template>
  <div>
    <CommonSidebar>
      <div class="px-4">
        <p class="text-3xl p-2 font-semibold">Quản lý cuộc họp</p>
        <div class="header d-flex align-center p-2 tab-active">
          <v-icon icon="mdi-home" class="icon-sidebar"></v-icon>
          <p class="ml-2">Cuộc họp của tôi</p>
        </div>
      </div>
      <div class="px-4">
        <div class="mt-6 cursor-pointer">
          <p class="cursor-pointer" @click="isOpenCurrent = !isOpenCurrent">
            <v-icon
              :icon="isOpenCurrent ? 'mdi-menu-down' : 'mdi-menu-right'"
              class="icon-sidebar"
            ></v-icon>
            <span>
              {{ `Dự án đang thực hiện (${projectsCurrent?.length})` }}
            </span>
          </p>
          <div v-if="isOpenCurrent" class="mt-3">
            <div
              v-for="(item, index) in projectsCurrent"
              :key="index"
              :class="
                (item.id == projectId ? 'tab-active ' : '') + 'sidebar-tab'
              "
              @click="handleChooseProject(item.id)"
            >
              <p class="icon-project">{{ item.img }}</p>
              <p class="ml-2">{{ item.title }}</p>
            </div>
          </div>
        </div>

        <div class="mt-4 cursor-pointer">
          <p class="cursor-pointer" @click="isOpenComplete = !isOpenComplete">
            <v-icon
              :icon="isOpenComplete ? 'mdi-menu-down' : 'mdi-menu-right'"
              class="icon-sidebar"
            ></v-icon>
            <span>
              {{ `Dự án đã hoàn thành (${projectsCompleted?.length})` }}</span
            >
          </p>
          <div v-if="isOpenComplete" class="mt-3">
            <div
              v-for="(item, index) in projectsCompleted"
              :key="index"
              :class="
                (item.id == projectId ? 'tab-active ' : '') + 'sidebar-tab'
              "
              @click="handleChooseProject(item.id)"
            >
              <p class="icon-project">{{ item.img }}</p>
              <p class="ml-2">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </CommonSidebar>
    <div class="ml-[360px]">
      <div class="box-content flex-1 custom-content">
        <div class="d-flex align-center justify-end">
          <!-- <CommonTextField
            name="search"
            :default-value="searchText"
            :has-unit="true"
            class="custom-search"
            placeholder="Tìm kiếm"
            @change="handleSearchText"
            @keyup.enter="handleSearch"
          >
            <v-icon icon="mdi-magnify" @click="handleSearch" />
          </CommonTextField> -->
          <CommonFlatButton
            class="btn-add cursor-pointer ml-4"
            @click="handleToggleMeetingForm"
          >
            <p class="font-semibold">Thêm</p>
          </CommonFlatButton>

          <MeetingForm
            v-if="
              isOpenMeetingForm && authenticationStore.role !== ROLE.EMPLOYEE
            "
            @close-form="handleToggleMeetingForm"
          />
          <MeetingForm
            v-if="
              isOpenMeetingForm && authenticationStore.role === ROLE.EMPLOYEE
            "
            :type="TYPE_MEETING.SELF"
            @close-form="handleToggleMeetingForm"
          />
        </div>
        <div class="mt-4 w-max">
          <CommonGroupTab
            :items="listTab"
            :default-value="tabActive"
            @change="handleSelectTab"
          />
        </div>
        <div v-if="!listMeetingTest?.length" class="h-[500px]">
          <CommonEmpty />
        </div>
        <div v-else>
          <CommonListMeeting
            v-for="(meetings, index) in meetingGroups"
            :key="index"
            :items="meetings"
            :day="meetings?.at(0)?.startTime ?? ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { MEETINGS, ROLE, TYPE_MEETING } from '~/constants'
import type { Meeting } from '~/models/class/common/meeting'
import type { Project } from '~/models/class/common/project'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useUserStore } from '~/stores/user/user-store'

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const authenticationStore = useAuthorizationStore()
const { organizationId, userId } = storeToRefs(authenticationStore)

const projectStore = useProjectStore()
const { listMeetingInProject } = storeToRefs(projectStore)

const organizationStore = useOrganizationStore()
const { listProjectInOrganization } = storeToRefs(organizationStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const projectsCurrent = computed(() => getProjectsByStatus())
const projectsCompleted = computed(() => getProjectsByStatus(true))

const listMeetingItems = computed(() => getListMeeting() ?? [])

const listMeetingTest = ref<Meeting[]>()

const meetingGroups = computed(() => getListMeetingMap() ?? [])

const isOpenCurrent = ref(true)
const isOpenComplete = ref(false)
const isOpenMeetingForm = ref(false)
const isOpenMeetingSelfForm = ref(false)

const listProjectCurrent = ref<Project[]>()
const listProjectCompleted = ref<Project[]>()

const searchText = ref('')

const tabActive = ref(1)

const listTab = ref([
  {
    title: 'Tất cả',
    value: 1,
  },
  {
    title: 'Hôm nay',
    value: 2,
  },
  {
    title: 'Trong tuần',
    value: 3,
  },
])

onMounted(async () => {
  await organizationStore.getAllProjectsInOrganization(organizationId.value)
  if (authenticationStore.role !== ROLE.PROJECT_MANAGER) {
    filterProjectTasksForUser()
  }

  if (!projectId.value) {
    const idProject = listProjectInOrganization.value?.at(0)?.id
    navigateTo({ path: MEETINGS, query: { projectId: idProject } })
  }

  await userStore.getUserInfo(authenticationStore.userId)
  if (projectId.value) {
    await projectStore.getAllMeetingInProject(projectId.value)
  }
})

watch(listProjectInOrganization, () => {
  listProjectCurrent.value = listProjectInOrganization.value?.filter(
    (item) => item.status === 'Doing'
  )

  listProjectCompleted.value = listProjectInOrganization.value?.filter(
    (item) => item.status === 'Completed'
  )
})

watch(listMeetingInProject, () => {
  getListMeeting()
})

watch(projectId, async () => {
  await projectStore.getAllMeetingInProject(projectId.value)
})

watch(tabActive, () => {
  if (tabActive.value === 1) {
    listMeetingTest.value = listMeetingItems.value
  } else if (tabActive.value === 2) {
    listMeetingTest.value = listMeetingItems.value.filter(
      (meeting) =>
        dayjs(meeting.startTime).format('YYYY/MM/DD') ===
        dayjs().format('YYYY/MM/DD')
    )
  } else if (tabActive.value === 3) {
    listMeetingTest.value = listMeetingItems.value.filter(
      (meeting) =>
        dayjs(meeting.startTime).format('YYYY/MM/DD') <=
          dayjs().endOf('week').format('YYYY/MM/DD') &&
        dayjs(meeting.startTime).format('YYYY/MM/DD') >=
          dayjs().startOf('week').format('YYYY/MM/DD')
    )
  } else {
    listMeetingTest.value = listMeetingItems.value.filter(
      (meeting) => meeting.type === TYPE_MEETING.SELF
    )
  }
})

watch(listMeetingItems, () => {
  if (!listMeetingTest.value) {
    listMeetingTest.value = listMeetingItems.value
  }
})

watch(searchText, async () => {
  if (!searchText.value || searchText.value === '') {
    await projectStore.getAllTaskInProject(projectId.value)
  }
})

const getProjectsByStatus = (isCompleted = false) => {
  if (isCompleted) {
    return listProjectCompleted.value?.map((item) => ({
      img: item.projectName.slice(0, 1),
      title: item.projectName,
      id: item.id,
    }))
  }
  return listProjectCurrent.value?.map((item) => ({
    img: item.projectName.slice(0, 1),
    title: item.projectName,
    id: item.id,
  }))
}

function handleChooseProject(projectId: number) {
  navigateTo({
    path: MEETINGS,
    query: { projectId },
  })
}

const handleToggleMeetingForm = () => {
  isOpenMeetingForm.value = !isOpenMeetingForm.value
}

function filterProjectTasksForUser() {
  const listProjectOfUser = []
  if (listProjectInOrganization.value) {
    for (const project of listProjectInOrganization.value) {
      // Check if any task has the user involved

      const listTask = project.tasks
      const hasUser = listTask?.some((task) =>
        task.users?.some((user) => user.id === userId.value)
      )
      if (hasUser) {
        listProjectOfUser.push(project)
      }
    }
  }

  listProjectInOrganization.value = listProjectOfUser
}

function handleSelectTab(value: any) {
  tabActive.value = value
}

function getListMeeting() {
  if (authenticationStore.role === ROLE.PROJECT_MANAGER) {
    return listMeetingInProject.value
  } else if (authenticationStore.role === ROLE.TEAMLEAD) {
    return listMeetingInProject.value?.filter((item) => {
      const users = item.users

      return users?.find((item) => item.sector === userInfo.value?.sector)
    })
  } else {
    return listMeetingInProject.value?.filter((item) => {
      const users = item.users
      return users?.find((item) => item.id === userInfo.value?.id)
    })
  }
}

interface MeetingMap {
  [day: string]: Meeting[]
}

function getListMeetingMap() {
  const meetingMap: MeetingMap = {}
  listMeetingTest.value?.forEach((item) => {
    const day = dayjs(item.startTime).format('DD/MM/YYYY')
    if (!meetingMap[day]) {
      meetingMap[day] = []
    }
    meetingMap[day].push(item)
  })

  return Object.values(meetingMap)
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-content {
  padding: 20px;
}
// sidebar
.sidebar-tab {
  padding: 10px 8px;
  display: flex;
  align-items: center;
}
.icon-sidebar {
  color: #28526e;
}
.tab-active {
  background-color: #f2f2f2;
  border-radius: 10px;
}
.header {
  border-bottom: 1px solid #e1d5d5;
}
.icon-project {
  background-color: #1ab675;
  padding: 0 8px;
  border-radius: 10px;
  color: white;
}
.box-saved {
  border-top: 1px solid #e1d5d5;
  position: fixed;
  padding: 8px 0;
  width: 360px;
  bottom: 0;
  left: 0;
  right: 0;
}
.custom-search {
  :deep(.v-input__control) {
    width: 280px;
    height: 40px;
  }
  :deep(.v-field) {
    box-shadow: none;
  }
  :deep(.v-field__field) {
    height: 40px;
  }
  :deep(.v-field__input) {
    height: 40px;
    padding: 0 12px;
    input {
      height: 40px;
      margin: 0;
    }
  }
  :deep(.v-input__details) {
    display: none;
  }
}
</style>
