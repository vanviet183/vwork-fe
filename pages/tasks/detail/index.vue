<template>
  <div class="p-5">
    <div
      class="d-flex align-center font-semibold cursor-pointer"
      @click="handleGoToTasks"
    >
      <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
      <p>Danh sách công việc</p>
    </div>
    <div class="d-flex justify-between content-task-detail mt-4">
      <div class="mt-4 w-[60%] pr-4">
        <p class="task-name">{{ taskInfo?.taskName }}</p>
        <p class="mt-4 font-semibold">Nội dung công việc</p>
        <CommonTextarea
          name="description"
          readonly
          default-value="helllo"
          class="pt-0"
        />
        <p class="mt-4 font-semibold">Công việc phụ</p>
        <div v-if="!taskInfo?.parentTask">
          <div>listSubtask</div>
          <div
            class="d-flex align-center cursor-pointer mt-4 custom-add"
            @click="handleAddSubtask"
          >
            <v-icon icon="mdi-plus" class="mr-2"></v-icon>
            <p>Thêm công việc phụ</p>
          </div>
        </div>
      </div>
      <div class="w-[40%] custom-info-task pl-4">
        <p class="font-semibold">Thông tin</p>
        <div class="d-flex mt-4 custom-info">
          <div class="label-info">
            <p>Người thực hiện</p>
            <p>Ưu tiên</p>
            <p>Ngày bắt đầu</p>
            <p>Ngày kết thúc</p>
            <p>Ngày hoàn thành</p>
          </div>
          <div class="content-info ml-4">
            <p>{{ taskInfo?.users }}</p>
            <p>
              <v-icon
                v-if="taskInfo?.prioritize"
                icon="mdi-flag-variant"
                class="icon-prioritize"
              ></v-icon>
            </p>
            <p>{{ taskInfo?.startDate }}</p>
            <p>{{ taskInfo?.endDate }}</p>
            <p>{{ taskInfo?.finishDay }}</p>
          </div>
        </div>

        <p class="font-semibold mt-4"></p>
        <div class="d-flex align-center justify-between">
          <p>Đính kèm (0)</p>
          <div class="d-flex align-center custom-add">
            <v-icon icon="mdi-plus" class="mr-1"></v-icon>
            <p>Thêm</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/task/task-store'

const route = useRoute()
const router = useRouter()
const taskId = computed(() => Number(route.query.taskId))

const taskStore = useTaskStore()
const { taskInfo } = storeToRefs(taskStore)

onMounted(async () => {
  await taskStore.getTaskInfo(taskId.value)
})

function handleGoToTasks() {
  router.back()
}

function handleAddSubtask() {}
</script>
<style scoped lang="scss">
@use 'sass:map';

.content-task-detail {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}
.task-name {
  padding-bottom: 6px;
  border-bottom: 1px solid #f2f2f5;
}
.custom-add {
  background-color: #f2f2f5;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
}
.custom-info-task {
  border-left: 1px solid #f2f2f5;
}
.custom-info {
  padding-bottom: 20px;
  border-bottom: 1px solid #f2f2f5;
}
.label-info,
.content-info {
  p + p {
    margin-top: 8px;
  }
}
</style>
