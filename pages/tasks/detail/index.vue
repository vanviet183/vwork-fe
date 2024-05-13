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
      <div
        v-if="
          authenticationStore.role === ROLE.PROJECT_MANAGER ||
          authenticationStore.role === ROLE.TEAMLEAD
        "
        class="text-end"
      >
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
              <p>{{ dayjs(taskInfo?.startDate).format('DD/MM/YYYY') }}</p>
              <p>{{ dayjs(taskInfo?.endDate).format('DD/MM/YYYY') }}</p>
              <p>{{ dayjs(taskInfo?.finishDay).format('DD/MM/YYYY') }}</p>
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
          <div v-if="listDocumentDesign?.length">
            <p class="font-semibold my-3">
              Tài liệu thiết kế {{ `(${listDocumentDesign.length})` }}
            </p>
            <div
              v-for="(item, index) in listDocumentDesign"
              :key="index"
              class="d-flex align-center justify-between custom-task-document"
            >
              <p @click="handleDownloadFile(item.filePath)">
                {{ item.fileName }}
              </p>
              <div>
                <!-- <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon> -->
                <v-icon
                  icon="mdi-delete-outline"
                  class="mr-1 custom-icon-delete"
                  @click="handleDeleteDocument(item.id)"
                ></v-icon>
              </div>
            </div>
          </div>
          <div v-if="listDocumentRequire?.length">
            <p class="font-semibold my-3">
              Tài liệu yêu cầu {{ `(${listDocumentRequire.length})` }}
            </p>
            <div
              v-for="(item, index) in listDocumentRequire"
              :key="index"
              class="d-flex align-center justify-between custom-task-document"
            >
              <p @click="handleDownloadFile(item.filePath)">
                {{ item.fileName }}
              </p>
              <div>
                <!-- <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon> -->
                <v-icon
                  icon="mdi-delete-outline"
                  class="mr-1 custom-icon-delete"
                  @click="handleDeleteDocument(item.id)"
                ></v-icon>
              </div>
            </div>
          </div>
          <div v-if="listDocumentReport?.length">
            <p class="font-semibold my-3">
              Tài liệu báo cáo {{ `(${listDocumentReport.length})` }}
            </p>
            <div
              v-for="(item, index) in listDocumentReport"
              :key="index"
              class="d-flex align-center justify-between custom-task-document"
            >
              <p @click="handleDownloadFile(item.filePath)">
                {{ item.fileName }}
              </p>
              <div>
                <!-- <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon> -->
                <v-icon
                  icon="mdi-delete-outline"
                  class="mr-1 custom-icon-delete"
                  @click="handleDeleteDocument(item.id)"
                ></v-icon>
              </div>
            </div>
          </div>
          <div v-if="listDocumentManual?.length">
            <p class="font-semibold my-3">
              Tài liệu hướng dẫn {{ `(${listDocumentManual.length})` }}
            </p>
            <div
              v-for="(item, index) in listDocumentManual"
              :key="index"
              class="d-flex align-center justify-between custom-task-document"
            >
              <p @click="handleDownloadFile(item.filePath)">
                {{ item.fileName }}
              </p>
              <div>
                <!-- <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon> -->
                <v-icon
                  icon="mdi-delete-outline"
                  class="mr-1 custom-icon-delete"
                  @click="handleDeleteDocument(item.id)"
                ></v-icon>
              </div>
            </div>
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
    <CommonConfirmPopup
      :is-show-popup="isOpenConfirmDelete"
      title="Bạn có chắc chắn muốn xóa tài liệu này không?"
      positive-title="Đồng ý"
      negative-title="Huỷ"
      :positive-action="handleDelete"
      :negative-action="handleCancelDelete"
    >
    </CommonConfirmPopup>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'

import {
  ROLE,
  SCREEN_MODE,
  SECTOR,
  TASK_PRIORITIZE,
  TYPE_DOCUMENT,
} from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useDocumentStore } from '~/stores/document/document-store'
import { useTaskStore } from '~/stores/task/task-store'

const route = useRoute()
const router = useRouter()
const taskId = computed(() => Number(route.query.taskId))

const taskStore = useTaskStore()
const { taskInfo, listTaskRequire, listDocumentInTask } = storeToRefs(taskStore)

const authenticationStore = useAuthorizationStore()

const documentStore = useDocumentStore()

const isOpenTaskRequireForm = ref(false)
const isOpenTaskForm = ref(false)
const isOpenDocumentForm = ref(false)
const isOpenConfirmDelete = ref(false)

const listDocumentDesign = ref()
const listDocumentReport = ref()
const listDocumentRequire = ref()
const listDocumentManual = ref()

onMounted(async () => {
  await taskStore.getTaskInfo(taskId.value)
  await taskStore.getAllTaskRequireInTask(taskId.value)
  await taskStore.getAllDocumentInTask(taskId.value)
})

watch(listDocumentInTask, () => {
  listDocumentDesign.value =
    listDocumentInTask.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.DESIGN
    ) ?? []
  listDocumentReport.value =
    listDocumentInTask.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.REPORT
    ) ?? []
  listDocumentRequire.value =
    listDocumentInTask.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.REQUIRE
    ) ?? []
  listDocumentManual.value =
    listDocumentInTask.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.MANUAL
    ) ?? []
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
      return '#FC4100'
    case TASK_PRIORITIZE.MIDDLE:
      return '#FFC55A'
    case TASK_PRIORITIZE.LOW:
      return '#6895D2'
    default:
      return ''
  }
}

const idDocument = ref()

function handleDeleteDocument(id: number) {
  isOpenConfirmDelete.value = true
  idDocument.value = id
}

async function handleDelete() {
  await documentStore.deleteDocument(idDocument.value)
  await taskStore.getAllDocumentInTask(taskId.value)

  isOpenConfirmDelete.value = false
}

function handleCancelDelete() {
  isOpenConfirmDelete.value = false
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
.custom-icon-delete {
  z-index: 99;
}
</style>
