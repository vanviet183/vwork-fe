<template>
  <div>
    <div class="d-flex">
      <CommonSidebar></CommonSidebar>
      <div class="box-content flex-1">
        <div>
          <p class="pt-5 pl-5">Công việc của tôi</p>
          <div class="box-options d-flex justify-between">
            <div class="d-flex alignt-center gap-3">
              <CommonBoxOptions title="Bộ lọc" icon="mdi-filter-outline">
                <div class="box-options">
                  <div class="option-item" @click="() => {}">
                    <p>Edit</p>
                  </div>
                  <div class="option-item" @click="() => {}">
                    <p>Delete</p>
                  </div>
                </div>
              </CommonBoxOptions>
              <CommonBoxOptions title="Thời gian" icon="mdi-swap-vertical">
                <div class="box-options">
                  <div class="option-item" @click="() => {}">
                    <p>Edit</p>
                  </div>
                  <div class="option-item" @click="() => {}">
                    <p>Delete</p>
                  </div>
                </div>
              </CommonBoxOptions>
              <CommonBoxOptions title="Trạng thái" icon="mdi-view-list-outline">
                <div class="box-options">
                  <div class="option-item" @click="() => {}">
                    <p>Edit</p>
                  </div>
                  <div class="option-item" @click="() => {}">
                    <p>Delete</p>
                  </div>
                </div>
              </CommonBoxOptions>
            </div>
            <div class="d-flex align-center">
              <CommonTextSearch></CommonTextSearch>
              <CommonFlatButton
                class="btn-add cursor-pointer"
                @click="handleToggleFormCreate"
              >
                <p class="text-lg">Tạo</p>
              </CommonFlatButton>

              <ProjectForm
                v-if="isOpenFormCreate"
                @close-form="handleToggleFormCreate"
              />
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
const isOpenFormCreate = ref(false)

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

const handleToggleFormCreate = () => {
  isOpenFormCreate.value = !isOpenFormCreate.value
}
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
.btn-add {
  padding: 0 !important;
  margin-left: 12px;
}
</style>
