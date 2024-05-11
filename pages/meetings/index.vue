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
        <div class="d-flex align-center">
          <CommonTextSearch />
          <CommonFlatButton
            v-if="
              authenticationStore.role === ROLE.PROJECT_MANAGER ||
              authenticationStore.role === ROLE.TEAMLEAD
            "
            class="btn-add cursor-pointer"
            @click="handleToggleMeetingForm"
          >
            <p class="font-semibold">Thêm</p>
          </CommonFlatButton>

          <MeetingForm
            v-if="isOpenMeetingForm"
            @close-form="handleToggleMeetingForm"
          />
        </div>
        <div>
          <CommonMeeting
            v-for="item in listMeetingInProject"
            :key="item.id"
            :title="item.title"
            :description="item.description"
            :author="item.author"
            :location="item.location"
            :start-time="item.startTime"
            :end-time="item.endTime"
            :list-user-join="item.users"
            class="mt-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MEETINGS, ROLE } from '~/constants'
import type { Project } from '~/models/class/common/project'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useUserStore } from '~/stores/user/user-store'

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const authenticationStore = useAuthorizationStore()

const projectStore = useProjectStore()
const { listMeetingInProject } = storeToRefs(projectStore)

const organizationStore = useOrganizationStore()
const { listProjectInOrganization } = storeToRefs(organizationStore)

const userStore = useUserStore()
const { userInfo, listProjectOfUser } = storeToRefs(userStore)

const projectsCurrent = computed(() => getProjectsByStatus())
const projectsCompleted = computed(() => getProjectsByStatus(true))

const isOpenCurrent = ref(true)
const isOpenComplete = ref(false)
const isOpenMeetingForm = ref(false)

const listProjectCurrent = ref<Project[]>()
const listProjectCompleted = ref<Project[]>()

onMounted(async () => {
  if (!projectId.value) {
    const idProject =
      authenticationStore.role === ROLE.PROJECT_MANAGER
        ? listProjectInOrganization.value?.at(0)?.id
        : listProjectOfUser.value.at(0)?.id
    navigateTo({ path: MEETINGS, query: { projectId: idProject } })
  }
  if (!listProjectInOrganization.value?.length) {
    await organizationStore.getAllProjectsInOrganization(
      authenticationStore.organizationId
    )
  }
  await projectStore.getAllMeetingInProject(projectId.value)

  if (!userInfo.value) {
    await userStore.getUserInfo(authenticationStore.userId)
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
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-content {
  padding: 20px;
}
</style>
