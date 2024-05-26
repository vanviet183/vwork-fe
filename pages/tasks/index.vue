<template>
  <div class="wrapper-tasks">
    <div>
      <CommonSidebar>
        <div class="px-4">
          <p class="text-3xl p-2 font-semibold">Quản lý công việc</p>
          <div class="header d-flex align-center p-2 tab-active">
            <v-icon icon="mdi-home" class="icon-sidebar"></v-icon>
            <p class="ml-2">Công việc của tôi</p>
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
        <div class="box-saved cursor-pointer" @click="handleOpenSaved">
          <div class="px-4 d-flex align-center">
            <p>Tài liệu dự án</p>
            <v-icon icon="mdi-chevron-right" class="icon-sidebar"></v-icon>
          </div>
        </div>
      </CommonSidebar>

      <!-- <div v-if="taskStore.isLoading">
        <CommonProgressCircular />
      </div> -->
      <div class="ml-[360px]">
        <div v-if="isOpenSaved" class="box-content flex-1">
          <CommonSaved class="p-5" @close="handleOpenSaved" />
        </div>
        <div v-else class="box-content flex-1 custom-content">
          <div
            v-if="
              authenticationStore.role === ROLE.PROJECT_MANAGER ||
              authenticationStore.role === ROLE.TEAMLEAD
            "
            class="pt-4 pl-5 d-flex gap-3 pb-4"
          >
            <CommonGroupTab
              :items="listTab"
              :default-value="tabActive"
              @change="handleSelectTab"
            />
          </div>
          <p v-else class="pt-5 pl-5 font-semibold">Công việc của tôi</p>
          <div v-if="!isStatistical">
            <div class="box-options d-flex justify-between">
              <div class="d-flex alignt-center gap-3">
                <CommonBoxOptions title="Bộ lọc" icon="mdi-filter-outline">
                  <div class="box-options">
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Giao cho tôi</span>
                      </p>
                    </div>
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Tao boi toi</span>
                      </p>
                    </div>
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Dang theo doi</span>
                      </p>
                    </div>
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Uu tien</span>
                      </p>
                    </div>
                  </div>
                </CommonBoxOptions>
                <CommonBoxOptions title="Sap xep" icon="mdi-swap-vertical">
                  <div class="box-options">
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Theo thoi han giam dan</span>
                      </p>
                    </div>
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Theo thoi han tang dan</span>
                      </p>
                    </div>
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Theo do uu tien</span>
                      </p>
                    </div>
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Theo thoi gian tao</span>
                      </p>
                    </div>
                  </div>
                </CommonBoxOptions>
                <CommonBoxOptions
                  title="Trạng thái"
                  icon="mdi-view-list-outline"
                >
                  <div class="box-options">
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Da hoan thanh</span>
                      </p>
                    </div>
                    <div class="option-item" @click="() => {}">
                      <p>
                        <v-icon icon="mdi-arrow-right-thick"></v-icon>
                        <span>Chua hoan thanh</span>
                      </p>
                    </div>
                  </div>
                </CommonBoxOptions>
              </div>
              <div class="d-flex align-center">
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
                  v-if="
                    authenticationStore.role === ROLE.PROJECT_MANAGER ||
                    authenticationStore.role === ROLE.TEAMLEAD
                  "
                  class="btn-add cursor-pointer"
                  @click="handleToggleTaskForm"
                >
                  <p class="font-semibold">Thêm</p>
                </CommonFlatButton>

                <TaskForm
                  v-if="isOpenTaskForm"
                  @close-form="handleToggleTaskForm"
                />
              </div>
            </div>

            <div class="box-tasks">
              <div v-if="!listTaskInProject?.length">
                <img
                  src="~/assets/img/no-task.png"
                  alt="Vwork Logo"
                  class="m-auto"
                />
                <p class="text-center text-lg font-semibold">
                  Không có công việc nào để hiển thị
                </p>
              </div>
              <div v-else>
                <CommonTaskList :items="listTaskItems" />
              </div>
            </div>
          </div>
          <div v-else>
            <CommonStatistical />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ROLE, TASKS } from '~/constants'
import type { Project } from '~/models/class/common/project'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useTaskStore } from '~/stores/task/task-store'
import { useUserStore } from '~/stores/user/user-store'

const projectStore = useProjectStore()
const { listTaskInProject } = storeToRefs(projectStore)

const organizationStore = useOrganizationStore()
const { listProjectInOrganization } = storeToRefs(organizationStore)

const authenticationStore = useAuthorizationStore()
const { organizationId, userId } = storeToRefs(authenticationStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const taskStore = useTaskStore()

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const projectsCurrent = computed(() => getProjectsByStatus())
const projectsCompleted = computed(() => getProjectsByStatus(true))

const listTaskItems = computed(() => getListTask() ?? [])

const isOpenCurrent = ref(true)
const isOpenComplete = ref(false)
const isOpenTaskForm = ref(false)
const isStatistical = ref(false)
const isOpenSaved = ref(false)

const searchText = ref('')

const tabActive = ref(1)

const listTab = ref([
  {
    title: 'Danh sách công việc',
    value: 1,
  },
])

const listProjectCurrent = ref<Project[]>()
const listProjectCompleted = ref<Project[]>()

onMounted(async () => {
  await organizationStore.getAllProjectsInOrganization(organizationId.value)
  if (authenticationStore.role !== ROLE.PROJECT_MANAGER) {
    filterProjectTasksForUser()
  }

  if (!projectId.value) {
    const idProject = listProjectInOrganization.value?.at(0)?.id
    navigateTo({ path: TASKS, query: { projectId: idProject } })
  }

  await userStore.getUserInfo(authenticationStore.userId)
  if (projectId.value) {
    await projectStore.getAllTaskInProject(projectId.value)
  }
  if (authenticationStore.role === ROLE.PROJECT_MANAGER) {
    listTab.value.push({
      title: 'Báo cáo',
      value: 2,
    })
  } else if (authenticationStore.role === ROLE.TEAMLEAD) {
    listTab.value.push({
      title: 'Xem thống kê',
      value: 2,
    })
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

watch(projectId, async () => {
  await projectStore.getAllTaskInProject(projectId.value)
  await projectStore.getAllDocumentInProject(projectId.value)
})

watch(tabActive, () => {
  if (tabActive.value === 2) {
    isStatistical.value = true
  } else {
    isStatistical.value = false
  }
})

watch(searchText, async () => {
  if (!searchText.value || searchText.value === '') {
    await projectStore.getAllTaskInProject(projectId.value)
  }
})

const handleToggleTaskForm = () => {
  isOpenTaskForm.value = !isOpenTaskForm.value
}

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
    path: TASKS,
    query: { projectId },
  })
  tabActive.value = 1
}

function handleOpenSaved() {
  isOpenSaved.value = !isOpenSaved.value
}

function handleSelectTab(value: any) {
  tabActive.value = value
}

function getListTask() {
  if (authenticationStore.role === ROLE.PROJECT_MANAGER) {
    return listTaskInProject.value
  } else if (authenticationStore.role === ROLE.TEAMLEAD) {
    return listTaskInProject.value?.filter((item) => {
      const users = item.users
      return users?.find((item) => item.sector === userInfo.value?.sector)
    })
  } else {
    return listTaskInProject.value?.filter((item) => {
      const users = item.users
      return users?.find((item) => item.id === userInfo.value?.id)
    })
  }
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

function handleSearchText(value: string) {
  searchText.value = value
}

function handleSearch() {
  listTaskInProject.value = listTaskInProject.value?.filter(
    (item) =>
      item.taskName.toLocaleLowerCase().includes(searchText.value) ||
      item.users?.find(
        (user) =>
          user.firstName.toLocaleLowerCase().includes(searchText.value) ||
          user.lastName.toLocaleLowerCase().includes(searchText.value)
      )
  )
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.box-content {
  background-color: white;
}
.box-options {
  border-bottom: 1px solid #e1d5d5;
  padding: 20px;
}
.box-tasks {
  padding: 20px;
}
.btn-add {
  padding: 0 !important;
  margin-left: 12px;
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
.custom-content {
  min-height: calc(100vh - 60px);
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
