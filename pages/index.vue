<template>
  <div class="common-padding mx-5">
    <div class="test">
      <div class="text-end">
        <CommonFlatButton class="btn-add">
          <v-icon icon="mdi-plus" class="mx-2"></v-icon>
          <p class="text-lg">Tạo mới</p>
        </CommonFlatButton>
      </div>
      <p class="projects-title">Dự án đang thực hiện</p>
      <div class="d-flex flex-wrap gap-4">
        <CommonCard
          v-for="item in listProjectCurrent"
          :key="item.id"
          :title="item.title"
          :subtitle="item.subtitle"
          :percent="item.percent"
          :amount-task="item.amountTask"
          :task-prioritize="item.taskPrioritize"
          background-color="#FFE7C1"
          @click="goToProject(item.id)"
        >
        </CommonCard>
      </div>
      <p class="projects-title mt-4">Dự án chờ duyệt</p>
      <div class="d-flex flex-wrap gap-4">
        <CommonCard
          v-for="item in listProjectWaitAccept"
          :key="item.id"
          :title="item.title"
          :subtitle="item.subtitle"
          class="card-wait"
          @click="goToProject(item.id)"
        >
        </CommonCard>
      </div>
      <p class="projects-title mt-4">Dự án đã hoàn thành</p>
      <div class="d-flex flex-wrap gap-4">
        <CommonCard
          v-for="item in listProjectComplete"
          :key="item.id"
          :title="item.title"
          :subtitle="item.subtitle"
          :percent="item.percent"
          :amount-task="item.amountTask"
          class="card-complete"
          background-color="#74E291"
          color="#211C6A"
          @click="goToProject(item.id)"
        >
        </CommonCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TASKS } from '~/constants'

const listProjectCurrent = ref([
  {
    id: '1',
    title: 'Mạng xã hội học tập i-Study',
    subtitle: 'Nguyễn Văn A',
    percent: '60',
    amountTask: 7,
    taskPrioritize: 'Code màn hình trang chủ',
  },
  {
    id: '2',
    title: 'Bảo trì hệ thống học tập V-Study',
    subtitle: 'Nguyễn Văn A',
    percent: '68',
    amountTask: 6,
  },
])

const listProjectWaitAccept = ref([
  {
    id: '3',
    title: 'Website học tiếng Trung C-learning',
    subtitle: 'Nguyễn Văn A',
  },
  // {
  //   id: '4',
  //   title: 'Website học tiếng Hàn K-learning',
  //   subtitle: 'Nguyễn Văn A',
  // },
])

const listProjectComplete = ref([
  {
    id: '5',
    title: 'Website học tiếng Nhật J-Learning',
    subtitle: 'Nguyễn Văn A',
    percent: '100',
    amountTask: 0,
  },
  {
    id: '6',
    title: 'Website học tiếng Anh E-learning',
    subtitle: 'Nguyễn Văn A',
    percent: '100',
    amountTask: 0,
  },
  {
    id: '7',
    title: 'Website quản lý sinh viên',
    subtitle: 'Nguyễn Văn A',
    percent: '100',
    amountTask: 0,
  },
  {
    id: '8',
    title: 'Website quản lý sinh viên',
    subtitle: 'Nguyễn Văn A',
    percent: '100',
    amountTask: 0,
  },
])

const goToProject = (idProject: string) => {
  navigateTo({ path: TASKS, query: { idProject } })
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.projects-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}
.btn-add {
  background-color: #1cc31c;
  color: white;
}
</style>
