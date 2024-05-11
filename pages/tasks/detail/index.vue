<template>
  <div class="p-5">
    <div
      class="d-flex align-center font-semibold cursor-pointer"
      @click="handleGoToTasks"
    >
      <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
      <p>Danh sách công việc</p>
    </div>
    <div class="content-task-detail mt-4">
      <div class="text-end">
        <v-icon
          icon="mdi-pencil"
          class="mr-2 cursor-pointer"
          @click="handleToggleEditTaskForm"
        ></v-icon>
      </div>
      <div class="d-flex justify-between mt-4">
        <div class="w-[60%] pr-4">
          <!-- <p class="task-name">{{ taskInfo?.taskName }}</p> -->
          <p class="font-semibold">Nội dung công việc</p>
          <CommonTextarea
            name="description"
            readonly
            :default-value="taskInfo?.taskName"
            class="pt-0"
          />
          <p class="my-4 font-semibold">Yêu cầu công việc</p>
          <div v-if="!taskInfo?.taskRequires">
            <div
              v-for="(item, index) in listTaskRequire"
              :key="index"
              class="d-flex align-center custom-task-require"
            >
              <div class="w-[30px]">
                <v-icon
                  v-show="item.important"
                  icon="mdi-flag-variant"
                  class="icon-important mr-2"
                ></v-icon>
              </div>

              <p :class="item.important ? 'text-important' : ''">
                {{ item.requireContent }}
              </p>
            </div>
            <div
              class="d-flex align-center cursor-pointer mt-4 custom-add"
              @click="handleToggleTaskRequireForm"
            >
              <v-icon icon="mdi-plus" class="mr-2"></v-icon>
              <p>Thêm yêu cầu công việc</p>
            </div>
          </div>
        </div>
        <div class="w-[40%] custom-info-task pl-4">
          <p class="font-semibold">Thông tin</p>
          <div class="d-flex mt-4 custom-info">
            <div class="label-info">
              <p>Người chịu trách nhiệm:</p>
              <p>Người thực hiện:</p>
              <p>Ưu tiên:</p>
              <p>Ngày bắt đầu:</p>
              <p>Ngày kết thúc:</p>
              <p>Ngày hoàn thành:</p>
            </div>
            <div class="content-info ml-4">
              <p>{{ getUserResponsible(taskInfo?.userResponsible ?? '') }}</p>
              <p>{{ getUsersImplement(taskInfo?.users ?? []) }}</p>
              <p>
                <v-icon
                  v-if="taskInfo?.prioritize !== TASK_PRIORITIZE.NONE"
                  icon="mdi-flag-variant"
                  :color="getColorFlag(taskInfo?.prioritize ?? '')"
                  class="icon-prioritize"
                ></v-icon>
              </p>
              <p>{{ taskInfo?.startDate }}</p>
              <p>{{ taskInfo?.endDate }}</p>
              <p>{{ taskInfo?.finishDay }}</p>
            </div>
          </div>

          <div class="d-flex align-center justify-between mt-4">
            <p>Đính kèm {{ `(${listDocumentInTask?.length})` }}</p>
            <div
              class="d-flex align-center custom-add"
              @click="handleToggleDocumentForm"
            >
              <v-icon icon="mdi-plus" class="mr-1"></v-icon>
              <p>Thêm</p>
            </div>
          </div>
          <div
            v-for="(item, index) in listDocumentInTask"
            :key="index"
            class="d-flex align-center custom-task-document"
            @click="handleDownloadFile(item.filePath)"
          >
            <p>
              {{ item.fileName }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <TaskForm
      v-if="isOpenTaskForm"
      :mode="SCREEN_MODE.EDIT"
      @close-form="handleToggleEditTaskForm"
    />
    <TaskRequireForm
      v-if="isOpenTaskRequireForm"
      @close-form="handleToggleTaskRequireForm"
    />
    <DocumentForm
      v-if="isOpenDocumentForm"
      @close-form="handleToggleDocumentForm"
    />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { SCREEN_MODE, SECTOR, TASK_PRIORITIZE } from '~/constants'
import { useTaskStore } from '~/stores/task/task-store'

const route = useRoute()
const router = useRouter()
const taskId = computed(() => Number(route.query.taskId))

const taskStore = useTaskStore()
const { taskInfo, listTaskRequire, listDocumentInTask } = storeToRefs(taskStore)

const isOpenTaskRequireForm = ref(false)
const isOpenTaskForm = ref(false)
const isOpenDocumentForm = ref(false)

onMounted(async () => {
  await taskStore.getTaskInfo(taskId.value)
  await taskStore.getAllTaskRequireInTask(taskId.value)
  await taskStore.getAllDocumentInTask(taskId.value)
})

function handleGoToTasks() {
  router.back()
}

function getUsersImplement(listUser: any[]) {
  const data = listUser.map((item) => `${item.firstName} ${item.lastName}`)
  return data.join(', ')
}

function getUserResponsible(userResponsible: string) {
  switch (userResponsible) {
    case SECTOR.DEVOPS:
      return 'Nhóm DevOps'
    case SECTOR.BA:
      return 'Nhóm Business Analyst'
    case SECTOR.BACKEND:
      return 'Nhóm Backend'
    case SECTOR.FRONTEND:
      return 'Nhóm Frontend'
    case SECTOR.TESTER:
      return 'Nhóm Tester'
    default:
      return userResponsible
  }
}

const handleToggleTaskRequireForm = () => {
  isOpenTaskRequireForm.value = !isOpenTaskRequireForm.value
}

const handleToggleDocumentForm = () => {
  isOpenDocumentForm.value = !isOpenDocumentForm.value
}

function handleDownloadFile(filePath: string) {
  window.open(filePath, '_blank')
}

function handleToggleEditTaskForm() {
  isOpenTaskForm.value = !isOpenTaskForm.value
}

function getColorFlag(prioritize: string) {
  switch (prioritize) {
    case TASK_PRIORITIZE.HIGH:
      return '#a8071a'
    case TASK_PRIORITIZE.MIDDLE:
      return '#d46b08'
    case TASK_PRIORITIZE.LOW:
      return '#0050b3'
    default:
      return ''
  }
}
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
.custom-task-require {
  padding: 8px 0;
}
.icon-important,
.text-important {
  color: red;
}
.custom-task-document {
  background-color: #f2f2f5;
  padding: 8px;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
}
</style>
