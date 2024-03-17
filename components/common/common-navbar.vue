<template>
  <div class="wrapper">
    <div class="custom-navbar d-flex justify-space-between align-center">
      <a href="https://flowbite.com" class="flex items-center mr-24">
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
        <CommonBoxOptions icon="mdi-bell">
          <div>hello</div>
        </CommonBoxOptions>
        <CommonBoxOptions :is-avatar="true">
          <div>hello</div>
        </CommonBoxOptions>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const menu = ref([
  {
    icon: 'mdi-home',
    path: '/',
    isActive: true,
  },
  {
    icon: 'mdi-account-group',
    path: '/',
  },
  {
    icon: 'mdi-calendar-month-outline',
    path: '/',
  },
  {
    icon: 'mdi-calendar-check-outline',
    path: '/',
  },
])

const gotoPage = (url: string) => {
  navigateTo({ path: url })
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-navbar {
  padding: 0 12px;
  height: 60px;
  background-color: white;
}
.icon-nav {
  font-size: 36px;
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
</style>
