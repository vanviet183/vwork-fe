<template>
  <div class="wrapper">
    <CommonSidebar>
      <div class="px-4 text-center">
        <p class="text-lg p-2 font-semibold">Quản trị viên</p>
        <img
          :src="userInfo?.avatar"
          alt="Avatar"
          class="max-w-[120px] m-auto"
        />
        <p class="font-semibold">
          <span>
            {{ userInfo?.firstName }}
          </span>
          <span>{{ userInfo?.lastName ?? '' }}</span>
        </p>
      </div>
      <div class="mt-4 px-4">
        <div v-for="item in listMenu" :key="item.title">
          <div
            :class="(isActivePage(item.to) ? 'tab-active ' : '') + 'custom-tab'"
            @click="() => navigateTo({ path: item.to })"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="box-logout cursor-pointer" @click="handleLogout()">
        <div class="px-4 d-flex align-center justify-between">
          <p class="font-semibold">Đăng xuất</p>
          <v-icon icon="mdi-logout" class="icon-sidebar"></v-icon>
        </div>
      </div>
    </CommonSidebar>
    <div class="ml-[360px]">
      <div class="flex-1 slideshow p-4 custom-content">
        <div class="text-end mb-4">
          <CommonFlatButton
            background-color="#28526e"
            color="white"
            class="btn-login mt-4"
            @click="handleCreateUser"
            >Thêm thành viên
          </CommonFlatButton>
        </div>
        <CreateUserForm
          v-if="isOpenFormCreateUser"
          @close-form="handleCreateUser"
        />
        <ListUserTable :items="users ?? []" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ADMIN_ORGANIZATIONS, ADMIN_USERS, LOGIN, SECTOR } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useUserStore } from '~/stores/user/user-store'

const route = useRoute()
const userStore = useUserStore()
const { listAllUser, userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()
const { userId } = storeToRefs(authenticationStore)

definePageMeta({
  layout: false,
})

const isOpenFormCreateUser = ref(false)

const listMenu = [
  // { to: ADMIN, title: 'Thống kê' },
  { to: ADMIN_ORGANIZATIONS, title: 'Quản lý tổ chức' },
  // { to: ADMIN_GROUPS, title: 'Quản lý nhóm' },
  { to: ADMIN_USERS, title: 'Quản lý người dùng' },
]
const users = computed(() => getUsers())

onMounted(async () => {
  if (!userInfo.value) {
    await userStore.getUserInfo(userId.value)
  }
  await userStore.getAllUser()
})

function isActivePage(currentPage: string) {
  return route.path === currentPage
}

function getUsers() {
  return listAllUser.value?.map((item) => {
    const positionJob = getPositionUser(item.role)
    const sectorUser = getGroupForUser(item.sector)
    return {
      id: item.id,
      fullName: `${item.firstName} ${item.lastName}`,
      email: item.email,
      phone: item.phone,
      sector: sectorUser,
      organizationName: item.organization?.organizationName,
      role: positionJob,
    }
  })
}

function getPositionUser(role: string) {
  switch (role) {
    case 'PROJECT_MANAGER':
      return 'Quản lý dự án'
    case 'CEO':
      return 'CEO'
    case 'TEAMLEAD':
      return 'Trưởng nhóm'
    case 'EMPLOYEE':
      return 'Nhân viên'
    default:
      return ''
  }
}

function getGroupForUser(role: string) {
  switch (role) {
    case SECTOR.DEVOPS:
      return 'DevOps'
    case SECTOR.BA:
      return 'BA'
    case SECTOR.BACKEND:
      return 'Backend'
    case SECTOR.FRONTEND:
      return 'Frontend'
    case SECTOR.TESTER:
      return 'Tester'
    default:
      return ''
  }
}

const handleLogout = async () => {
  await authenticationStore.resetSessionAccess()
  navigateTo({ path: LOGIN })
}

function handleCreateUser() {
  isOpenFormCreateUser.value = !isOpenFormCreateUser.value
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.wrapper {
  height: 100vh;
  background-color: '#18baff' !important;
}
.form-action {
  background-color: white;
}
.template-content {
  padding: 0 96px;
}
.slideshow {
  background-color: #f2f2f5;
}
.tab-active {
  background-color: #f2f2f2;
}
.custom-tab {
  padding: 8px 20px;
  border-radius: 10px;
  cursor: pointer;
}
.box-logout {
  padding: 8px 0;
  border-top: 1px solid #e1d5d5;
  position: fixed;
  width: 360px;
  bottom: 0;
  left: 0;
  right: 0;
}
.custom-content {
  min-height: 100vh;
}
</style>
