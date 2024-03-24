<template>
  <div>
    <div class="d-flex">
      <CommonSidebar></CommonSidebar>
      <div class="box-content flex-1">
        <div>
          <p class="pt-5 pl-5">Công việc của tôi</p>
          <div class="box-options d-flex justify-between">
            <div>
              <span>Bộ lọc</span>
              <span class="px-4">Thời gian</span>
              <span>Trạng thái</span>
            </div>
            <div class="d-flex align-center">
              <CommonTextSearch></CommonTextSearch>
              <CommonFlatButton>Tạo</CommonFlatButton>
            </div>
          </div>
        </div>
        <div class="box-tasks">
          <div v-if="!listTask.length">
            <img
              src="~/assets/img/no-task.png"
              alt="Vwork Logo"
              class="m-auto"
            />
            <p class="text-center text-lg font-semibold">
              Không có công việc nào để hiển thị
            </p>
          </div>
          <div v-else>
            <CommonTaskList :items="listTask"></CommonTaskList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const listTask = ref([
  {
    id: '1',
    title: 'Task 1',
    user: {
      avatar:
        'https://i.pinimg.com/736x/6d/44/61/6d446105361e83b1013aa9e349574ab0.jpg',
      email: 'email1',
    },
    status: 1,
    time: '123456',
    prioritize: 1,
    relatedTasks: {
      before: {},
      after: {},
    },
  },
  {
    id: '2',
    title: 'Task 2',
    user: {
      avatar: 'img1',
      email: 'email1',
    },
    status: 0,
    time: '123456',
    prioritize: 1,
    relatedTasks: {
      before: {},
      after: {},
    },
  },
  {
    id: '3',
    title: 'Task 3',
    user: {
      avatar: 'img1',
      email: 'email1',
    },
    status: 0,
    time: '123456',
    prioritize: 1,
    relatedTasks: {
      before: {},
      after: {},
    },
  },
  {
    id: '4',
    title: 'Task 4',
    user: {
      avatar: 'img1',
      email: 'email1',
    },
    status: 0,
    time: '123456',
    prioritize: 1,
    relatedTasks: {
      before: {},
      after: {},
    },
  },
  {
    id: '5',
    title: 'Task 5',
    user: {
      avatar: 'img1',
      email: 'email1',
    },
    status: 0,
    time: '123456',
    prioritize: 1,
    relatedTasks: {
      before: {},
      after: {},
    },
  },
])
</script>
<style scoped lang="scss">
@use 'sass:map';

.box-content {
  background-color: white;
}
.box-options {
  border-bottom: 1px solid #e1d5d5;
  padding: 20px;
}
.box-tasks {
  padding: 20px;
}
</style>
