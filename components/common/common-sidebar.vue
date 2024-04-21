<template>
  <div class="sidebar relative">
    <div class="px-4">
      <p class="text-3xl p-2 font-semibold">Quản lý công việc</p>
      <div class="header d-flex align-center p-2 tab-active">
        <v-icon icon="mdi-home" class="icon-sidebar"></v-icon>
        <p class="ml-2">Công việc của tôi</p>
      </div>
    </div>
    <div class="px-4">
      <div class="d-flex align-center flex-wrap gap-3 my-4">
        <CommonFlatButton>Tất cả</CommonFlatButton>
        <CommonFlatButton>Dự án đang thực hiện</CommonFlatButton>
        <CommonFlatButton>Dự án đã hoàn thành</CommonFlatButton>
      </div>
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
            :class="(item.isActive ? 'tab-active ' : '') + 'sidebar-tab'"
            @click="gotoPage(item.path)"
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
            :class="(item.isActive ? 'tab-active ' : '') + 'sidebar-tab'"
            @click="gotoPage(item.path)"
          >
            <p class="icon-project">{{ item.img }}</p>
            <p class="ml-2">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box-saved">
      <div class="px-4 d-flex align-center">
        <p>Luu tru</p>
        <v-icon icon="mdi-chevron-right" class="icon-sidebar"></v-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/stores/project/project-store'

const projectStore = useProjectStore()
const { listProjectCurrent, listProjectCompleted, listProjects } =
  storeToRefs(projectStore)

const projectsCurrent = computed(() => getProjectsByStatus())
const projectsCompleted = computed(() => getProjectsByStatus(true))

const getProjectsByStatus = (isCompleted = false) => {
  if (isCompleted) {
    return listProjectCompleted.value?.map((item, index) => ({
      img: item.projectName.slice(0, 1),
      title: item.projectName,
      path: '/',
      isActive: index === 0,
    }))
  }
  return listProjectCurrent.value?.map((item, index) => ({
    img: item.projectName.slice(0, 1),
    title: item.projectName,
    path: '/',
    isActive: index === 0,
  }))
}

const isOpenCurrent = ref(true)
const isOpenComplete = ref(false)

const gotoPage = (url: string) => {
  navigateTo({ path: url })
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.sidebar {
  background-color: white;
  width: 360px;
  min-height: calc(100vh - 60px);
  border-right: 1px solid #e1d5d5;
}
.sidebar-tab {
  padding: 10px 8px;
  display: flex;
  align-items: center;
  :hover {
    background-color: #e1d5d5;
  }
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
  width: 360px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
