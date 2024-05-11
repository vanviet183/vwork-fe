<template>
  <div class="common-padding mx-5">
    <div class="test">
      <div class="box-presentation">
        <CommonGroupTab
          :items="listTab"
          :default-value="tabActive"
          @change="handleSelectTab"
        />

        <CommonFlatButton
          v-if="authenticationStore.role === ROLE.PROJECT_MANAGER"
          class="btn-add cursor-pointer"
          :background-color="colors['primary']"
          color="white"
          @click="handleToggleFormCreate"
        >
          <p class="text-lg">Tạo</p>
        </CommonFlatButton>
      </div>

      <!-- create project form -->
      <ProjectForm
        v-if="isOpenFormCreate"
        :mode="SCREEN_MODE.NEW"
        @close-form="handleToggleFormCreate"
      />
      <div
        v-if="
          !listProjectInOrganization?.length &&
          authenticationStore.role === ROLE.PROJECT_MANAGER
        "
        class="h-[500px]"
      >
        <CommonEmpty />
      </div>
      <div
        v-if="
          !listProjectOfUser?.length &&
          authenticationStore.role !== ROLE.PROJECT_MANAGER
        "
        class="h-[500px]"
      >
        <CommonEmpty />
      </div>

      <div v-if="listProjectCurrent?.length" class="">
        <div class="d-flex align-center justify-between mt-8">
          <p class="projects-title">Dự án đang thực hiện</p>
          <p
            v-if="listProjectCurrent.length > 5"
            class="btn-show-all"
            @click="handleShowAll"
          >
            Xem tất cả
          </p>
        </div>
        <div class="d-flex flex-wrap gap-4">
          <CommonCard
            v-for="item in listProjectCurrent"
            :key="item.id"
            :project-id="item.id"
            :title="item.projectName"
            :author="item.author"
            :avatar="userInfo?.avatar"
            :percent="item.percent"
            :amount-task="item.tasks?.length"
            :start-date="item.startDate"
            :end-date="item.endDate"
            :description="item.description"
            background-color="#FFE7C1"
            @click="goToProject(item.id)"
          >
          </CommonCard>
        </div>
      </div>

      <div v-if="listProjectCompleted?.length">
        <div class="d-flex align-center justify-between mt-4">
          <p class="projects-title mt-4">Dự án đã hoàn thành</p>
          <p
            v-if="listProjectCompleted.length > 5"
            class="btn-show-all"
            @click="handleShowAll"
          >
            Xem tất cả
          </p>
        </div>
        <div class="d-flex flex-wrap gap-4">
          <CommonCard
            v-for="item in listProjectCompleted"
            :key="item.id"
            :project-id="item.id"
            :title="item.projectName"
            :author="item.author"
            :percent="item.percent"
            :amount-task="item.tasks?.length"
            :duration="`${item.startDate} ~ ${item.endDate}`"
            class="card-complete"
            background-color="#74E291"
            color="#211C6A"
            @click="goToProject(item.id)"
          >
          </CommonCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import colors from '~/assets/scss/main.module.scss'
import { ROLE, SCREEN_MODE, TASKS } from '~/constants'
import type { Project } from '~/models/class/common/project'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useUserStore } from '~/stores/user/user-store'

const isOpenFormCreate = ref(false)

const authenticationStore = useAuthorizationStore()
const { organizationId, userId } = storeToRefs(authenticationStore)

const organizationStore = useOrganizationStore()
const { listProjectInOrganization } = storeToRefs(organizationStore)

const userStore = useUserStore()
const { userInfo, listProjectOfUser } = storeToRefs(userStore)

const tabActive = ref(1)
function handleSelectTab(value: any) {
  tabActive.value = value
}

const listTab = [
  {
    title: 'Tất cả',
    value: 1,
  },
  {
    title: 'Đang thực hiện',
    value: 2,
  },
  {
    title: 'Đã hoàn thành',
    value: 3,
  },
]

const listProjectCurrent = ref<Project[]>()
const listProjectCompleted = ref<Project[]>()

onMounted(async () => {
  if (!userInfo.value) {
    await userStore.getUserInfo(authenticationStore.userId)
  }
  if (authenticationStore.role === ROLE.PROJECT_MANAGER) {
    await organizationStore.getAllProjectsInOrganization(organizationId.value)
  } else {
    await userStore.getAllProjectsUserJoin(userId.value)
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

watch(listProjectOfUser, () => {
  listProjectCurrent.value = listProjectOfUser.value?.filter(
    (item) => item.status === 'Doing'
  )

  listProjectCompleted.value = listProjectOfUser.value?.filter(
    (item) => item.status === 'Completed'
  )
})

const goToProject = (projectId: number) => {
  navigateTo({
    path: TASKS,
    query: { projectId },
  })
}

const handleToggleFormCreate = () => {
  isOpenFormCreate.value = !isOpenFormCreate.value
}

const handleShowAll = () => {
  navigateTo({ path: TASKS })
}

watch(tabActive, () => {
  // handle selected tab
})
</script>
<style scoped lang="scss">
@use 'sass:map';

.box-presentation {
  display: flex;
  gap: 16px;
}
.projects-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}
.btn-show-all {
  font-size: 16px;
  color: map.get($colors, 'primary');
  font-weight: 600;
  cursor: pointer;
}
</style>
