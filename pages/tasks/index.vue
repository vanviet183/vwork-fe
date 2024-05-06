<template>
  <div class="wrapper-tasks">
    <div class="d-flex">
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

      <div v-if="isOpenSaved" class="box-content flex-1">
        <CommonSaved class="p-5" />
      </div>
      <div v-else class="box-content flex-1">
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
        <p v-else class="pt-5 pl-5">Công việc của tôi</p>
        <div v-if="!isStatistical">
          <div class="box-options d-flex justify-between">
            <div class="d-flex alignt-center gap-3">
              <CommonBoxOptions title="Bộ lọc" icon="mdi-filter-outline">
                <div class="box-options">
                  <div class="option-item" @click="() => {}">
                    <p>
                      <v-icon icon="mdi-arrow-right-thick"></v-icon>
                      <span>Giao cho toi</span>
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
              <CommonBoxOptions title="Trạng thái" icon="mdi-view-list-outline">
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
              <CommonTextSearch />
              <CommonFlatButton
                v-if="
                  authenticationStore.role === ROLE.PROJECT_MANAGER ||
                  authenticationStore.role === ROLE.TEAMLEAD
                "
                class="btn-add cursor-pointer"
                @click="handleToggleTaskForm"
              >
                <p class="text-lg">Tạo</p>
              </CommonFlatButton>

              <TaskForm
                v-if="isOpenTaskForm"
                @close-form="handleToggleTaskForm"
              />
            </div>
          </div>

          <div class="box-tasks">
            <div v-if="!listTask?.length">
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
              <CommonTaskList :items="listTask" />
            </div>
          </div>
        </div>
        <div v-else>
          <CommonStatistical />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ROLE, TASKS } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'

const projectStore = useProjectStore()
const { listTask } = storeToRefs(projectStore)

const organizationStore = useOrganizationStore()
const { listProjectCurrent, listProjectCompleted, listProjects } =
  storeToRefs(organizationStore)

const authenticationStore = useAuthorizationStore()

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))
const organizationId = computed(() => Number(route.query.organizationId))

const projectsCurrent = computed(() => getProjectsByStatus())
const projectsCompleted = computed(() => getProjectsByStatus(true))

const isOpenCurrent = ref(true)
const isOpenComplete = ref(false)
const isOpenTaskForm = ref(false)
const isStatistical = ref(false)
const isOpenSaved = ref(false)

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

onMounted(async () => {
  if (!listProjects.value?.length) {
    await organizationStore.getAllProjectsInOrganization(organizationId.value)
  }
  if (projectId.value) {
    await projectStore.getAllTaskInProject(projectId.value)
  }
})

watch(projectId, async () => {
  await projectStore.getAllTaskInProject(projectId.value)
})

const handleToggleTaskForm = () => {
  isOpenTaskForm.value = !isOpenTaskForm.value
}

function handleChooseProject(projectId: number) {
  navigateTo({
    path: TASKS,
    query: { organizationId: organizationId.value, projectId },
  })
}

function handleOpenSaved() {
  isOpenSaved.value = !isOpenSaved.value
}

const tabActive = ref(1)
function handleSelectTab(value: any) {
  tabActive.value = value
}

const listTab = [
  {
    title: 'Danh sách công việc',
    value: 1,
  },
  {
    title: 'Tiến độ dự án',
    value: 2,
  },
]
watch(tabActive, () => {
  if (tabActive.value === 2) {
    isStatistical.value = true
  } else {
    isStatistical.value = false
  }
})
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
</style>
