<template>
  <div class="wrapper">
    <div class="custom-navbar d-flex justify-space-between align-center">
      <a href="/" class="flex items-center mr-24 cursor-pointer">
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
          :class="(item.isActive ? 'tab-active ' : '') + 'custom-tab'"
          @click="gotoPage(item.path)"
        >
          <v-icon :icon="item.icon" class="icon-nav"></v-icon>
        </div>
      </div>

      <div class="d-flex align-center">
        <CommonTextSearch></CommonTextSearch>
        <CommonBoxOptions icon="mdi-bell" :is-close-on-content="false">
          <div class="px-5 pt-5">
            <CommonTab :items="tabNotification" :is-content="true"></CommonTab>
          </div>
        </CommonBoxOptions>
        <CommonBoxOptions :is-avatar="true">
          <div class="w-[372px] p-5">
            <div class="text-center box1 py-2 pointer-events-none">
              <v-avatar
                :image="Avatar"
                size="80"
                class="cursor-pointer"
                @click="() => {}"
              ></v-avatar>
              <p class="mt-4">Vitcon123</p>
              <p>Trang cá nhân của bạn</p>
            </div>
            <div class="box2 py-2">
              <div class="p-2 option-item" @click="handleChangePassword()">
                <v-icon icon="mdi-key-variant" class="icon-nav"></v-icon>
                <span class="ml-2">Doi mat khau</span>
              </div>
              <div class="p-2 option-item" @click="handleChangeUser()">
                <v-icon icon="mdi-account-edit" class="icon-nav"></v-icon>
                <span class="ml-2">Chinh sau thong tin</span>
              </div>
            </div>
            <div class="box3 pt-2" @click="handleLogout()">
              <div class="p-2 option-item">
                <v-icon icon="mdi-logout" class="icon-nav"></v-icon>
                <span class="ml-2">Dang xuat</span>
              </div>
            </div>
          </div>
        </CommonBoxOptions>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from '~/assets/img/avatar.jpeg'
import { HOME, LOGIN, MEETINGS, PASSWORD, TASKS, USER } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'

const authenticationStore = useAuthorizationStore()

const menu = ref([
  {
    icon: 'mdi-home',
    path: HOME,
    isActive: true,
  },
  {
    icon: 'mdi-account-group',
    path: HOME,
  },
  {
    icon: 'mdi-calendar-month-outline',
    path: MEETINGS,
  },
  {
    icon: 'mdi-calendar-check-outline',
    path: TASKS,
  },
])

const tabNotification = ref([
  {
    title: 'Tất cả',
    value: '1',
  },
  {
    title: 'Công việc',
    value: '2',
  },
  {
    title: 'Lịch họp',
    value: '3',
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
