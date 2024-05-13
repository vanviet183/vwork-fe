<template>
  <div class="wrapper">
    <div class="custom-navbar d-flex justify-space-between align-center">
      <a href="/" class="flex items-center cursor-pointer">
        <img
          src="~/assets/img/logo-vwork.svg"
          class="h-[48px]"
          alt="Vwork Logo"
        />
      </a>

      <div class="d-flex items-center gap-2">
        <div
          v-for="(item, index) in menu"
          :key="index"
          :class="
            (navigationStore.isRouteActive(item.path) ? 'tab-active ' : '') +
            'custom-tab'
          "
          @click="gotoPage(item.path)"
        >
          <v-icon :icon="item.icon" class="icon-nav"></v-icon>
        </div>
      </div>

      <div class="d-flex align-center">
        <CommonBoxOptions :is-avatar="true">
          <div class="w-[372px] p-5">
            <div class="text-center box1 py-2 pointer-events-none">
              <img
                :src="userInfo?.avatar"
                class="h-[80px] m-auto"
                alt="Vwork Logo"
              />
              <p class="my-4">
                {{ `${userInfo?.firstName} ${userInfo?.lastName}` }}
              </p>
              <p>Trang cá nhân của bạn</p>
            </div>
            <div class="box2 py-2">
              <div class="p-2 option-item" @click="handleChangePassword()">
                <v-icon icon="mdi-key-variant" class="icon-nav"></v-icon>
                <span class="ml-2">Đổi mật khẩu</span>
              </div>
              <div class="p-2 option-item" @click="handleChangeUser()">
                <v-icon icon="mdi-account-edit" class="icon-nav"></v-icon>
                <span class="ml-2">Chỉnh sửa thông tin</span>
              </div>
            </div>
            <div class="box3 pt-2" @click="handleLogout()">
              <div class="p-2 option-item">
                <v-icon icon="mdi-logout" class="icon-nav"></v-icon>
                <span class="ml-2">Đăng xuất</span>
              </div>
            </div>
          </div>
        </CommonBoxOptions>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { HOME, LOGIN, MEETINGS, PASSWORD, TASKS, USER } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useNavigationStore } from '~/stores/navigation/navigation-store'
import { useUserStore } from '~/stores/user/user-store'

const authenticationStore = useAuthorizationStore()
const navigationStore = useNavigationStore()

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const menu = ref([
  {
    icon: 'mdi-home',
    path: HOME,
  },
  // {
  //   icon: 'mdi-account-group',
  //   path: MEMBERS,
  // },
  {
    icon: 'mdi-calendar-month-outline',
    path: MEETINGS,
  },
  {
    icon: 'mdi-calendar-check-outline',
    path: TASKS,
  },
])

const gotoPage = (url: string) => {
  navigateTo({ path: url })
}

const handleChangePassword = () => {
  navigateTo({ path: PASSWORD })
}

const handleChangeUser = () => {
  navigateTo({ path: USER })
}

const handleLogout = async () => {
  await authenticationStore.resetSessionAccess()
  navigateTo({ path: LOGIN })
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-navbar {
  padding: 0 12px;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e1d5d5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.icon-nav {
  font-size: 28px;
  color: #28526e;
}
.tab-active {
  background-color: #f2f2f2;
}
.custom-tab {
  padding: 8px 20px;
  border-radius: 10px;
  cursor: pointer;
}
.box1,
.box2 {
  border-bottom: 1px solid #e1d5d5;
}
.option-item:hover {
  border-radius: 10px;
  cursor: pointer;
  background-color: #e1d5d5;
}
</style>
