<template>
  <div class="box-info">
    <div class="box1">
      <div>
        <v-icon icon="mdi-briefcase" class="icon-nav"></v-icon>
        <span class="ml-4">Thông tin tổ chức</span>
      </div>
    </div>
    <div class="box2">
      <div class="d-flex">
        <div class="labels">
          <div class="d-flex align-center">
            <p class="font-semibold w-[200px]">Tổ chức</p>
            <p>{{ userInfo?.organization?.organizationName }}</p>
          </div>
          <div class="d-flex align-center">
            <p class="font-semibold w-[200px]">Vị trí công việc</p>
            <p>{{ userInfo?.sector }}</p>
          </div>
          <div class="d-flex align-center">
            <p class="font-semibold w-[200px]">Chức vụ</p>
            <p>{{ getPositionUser(userInfo?.role) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user/user-store'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

function getPositionUser(role?: string) {
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
</script>
<style scoped lang="scss">
@use 'sass:map';

.labels {
  p {
    padding: 6px 0;
  }
}
.box-info {
  background-color: white;
  border-radius: 8px;
}
.box1,
.box2 {
  padding: 20px;
}
.box1 {
  border-left: 4px solid #0050b3;
  border-top-left-radius: 8px;
  border-bottom: 1px solid #f2f2f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
