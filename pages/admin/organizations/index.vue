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
            @click="handleOpenFormInitOrganization"
            >Thêm tổ chức
          </CommonFlatButton>
        </div>
        <InitOrganizationForm
          v-if="isOpenFormInitOrganization"
          :mode="SCREEN_MODE.NEW"
          @close-form="handleOpenFormInitOrganization"
        />
        <ListOrganizationTable :items="listAllOrganization ?? []" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  ADMIN_ORGANIZATIONS,
  ADMIN_USERS,
  LOGIN,
  SCREEN_MODE,
} from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useUserStore } from '~/stores/user/user-store'

const route = useRoute()
const organizationStore = useOrganizationStore()
const { listAllOrganization } = storeToRefs(organizationStore)

const authenticationStore = useAuthorizationStore()
const { userId } = storeToRefs(authenticationStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

definePageMeta({
  layout: false,
})

const isOpenFormInitOrganization = ref(false)

const listMenu = [
  // { to: ADMIN, title: 'Thống kê' },
  { to: ADMIN_ORGANIZATIONS, title: 'Quản lý tổ chức' },
  // { to: ADMIN_GROUPS, title: 'Quản lý nhóm' },
  { to: ADMIN_USERS, title: 'Quản lý người dùng' },
]

onMounted(async () => {
  if (!userInfo.value) {
    await userStore.getUserInfo(userId.value)
  }
  await organizationStore.getAllOrganization()
})

function isActivePage(currentPage: string) {
  return route.path === currentPage
}

const handleLogout = async () => {
  await authenticationStore.resetSessionAccess()
  navigateTo({ path: LOGIN })
}

function handleOpenFormInitOrganization() {
  isOpenFormInitOrganization.value = !isOpenFormInitOrganization.value
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
