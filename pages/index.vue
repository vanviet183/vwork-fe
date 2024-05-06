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
      <div v-if="!listProjects?.length" class="h-[500px]">
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
            :title="item.projectName"
            :subtitle="item.author"
            :percent="item.percent"
            :amount-task="item.tasks?.length"
            :duration="`${item.startDate} ~ ${item.endDate}`"
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
            :title="item.projectName"
            :subtitle="item.author"
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
import { HOME, ROLE, SCREEN_MODE, TASKS } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useUserStore } from '~/stores/user/user-store'

const isOpenFormCreate = ref(false)

const route = useRoute()
const organizationId = computed(() => Number(route.query.organizationId))

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()
const { userId } = storeToRefs(authenticationStore)

const organizationStore = useOrganizationStore()
const { listProjectCurrent, listProjectCompleted, listProjects } =
  storeToRefs(organizationStore)

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

onMounted(async () => {
  if (organizationId.value) {
    await organizationStore.getAllProjectsInOrganization(organizationId.value)
  } else {
    await userStore.getUserInfo(userId.value)
    if (userInfo.value?.organization) {
      navigateTo({
        path: HOME,
        query: { organizationId: userInfo.value?.organization.id },
      })
      await organizationStore.getAllProjectsInOrganization(
        userInfo.value?.organization.id
      )
    }
  }
})

const goToProject = (projectId: number) => {
  navigateTo({
    path: TASKS,
    query: { organizationId: organizationId.value, projectId },
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
