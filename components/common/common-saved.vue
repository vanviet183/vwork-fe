<template>
  <div class="wrapper-saved">
    <div class="d-flex justify-between">
      <div
        class="d-flex align-center font-semibold cursor-pointer"
        @click="handleGoToTasks"
      >
        <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
        <p>Danh sách công việc</p>
      </div>
      <div
        class="d-flex align-center custom-add"
        @click="handleToggleDocumentForm"
      >
        <v-icon icon="mdi-plus" class="mr-1"></v-icon>
        <p>Thêm</p>
      </div>
    </div>

    <div class="d-flex align-center justify-between my-4">
      <p class="font-semibold custom-title">
        Danh sách tài liệu dự án {{ `(${listDocumentInProject?.length})` }}
      </p>
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
          <v-icon
            icon="mdi-pencil-outline"
            class="mr-2"
            @click="handleToggleEditDocument(item.id)"
          ></v-icon>
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
          <v-icon
            icon="mdi-pencil-outline"
            class="mr-2"
            @click="handleToggleEditDocument(item.id)"
          ></v-icon>
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
          <v-icon
            icon="mdi-pencil-outline"
            class="mr-2"
            @click="handleToggleEditDocument(item.id)"
          ></v-icon>
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
          <v-icon
            icon="mdi-pencil-outline"
            class="mr-2"
            @click="handleToggleEditDocument(item.id)"
          ></v-icon>
          <v-icon
            icon="mdi-delete-outline"
            class="mr-1 custom-icon-delete"
            @click="handleDeleteDocument(item.id)"
          ></v-icon>
        </div>
      </div>
    </div>
    <DocumentForm
      v-if="isOpenDocumentForm"
      @close-form="handleToggleDocumentForm"
    />
    <DocumentForm
      v-if="isOpenDocumentEditForm"
      :mode="SCREEN_MODE.EDIT"
      :document-id="idDocument"
      @close-form="handleToggleEditDocument"
    />
    <CommonConfirmPopup
      :is-show-popup="isOpenConfirmDeleteDocument"
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
import { storeToRefs } from 'pinia'
import { SCREEN_MODE, TYPE_DOCUMENT } from '~/constants'
import { useDocumentStore } from '~/stores/document/document-store'
import { useProjectStore } from '~/stores/project/project-store'

const emit = defineEmits(['close'])

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const projectStore = useProjectStore()
const { listDocumentInProject } = storeToRefs(projectStore)

const documentStore = useDocumentStore()

const isOpenDocumentForm = ref(false)
const isOpenDocumentEditForm = ref(false)

const listDocumentDesign = ref()
const listDocumentReport = ref()
const listDocumentRequire = ref()
const listDocumentManual = ref()

onMounted(async () => {
  await projectStore.getAllDocumentInProject(projectId.value)
})

watch(listDocumentInProject, () => {
  listDocumentDesign.value =
    listDocumentInProject.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.DESIGN
    ) ?? []
  listDocumentReport.value =
    listDocumentInProject.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.REPORT
    ) ?? []
  listDocumentRequire.value =
    listDocumentInProject.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.REQUIRE
    ) ?? []
  listDocumentManual.value =
    listDocumentInProject.value?.filter(
      (item) => item.type === TYPE_DOCUMENT.MANUAL
    ) ?? []
})

const handleToggleDocumentForm = () => {
  isOpenDocumentForm.value = !isOpenDocumentForm.value
}

function handleDownloadFile(filePath: string) {
  window.open(filePath, '_blank')
}

function handleGoToTasks() {
  emit('close')
}

const idDocument = ref()
const isOpenConfirmDeleteDocument = ref(false)

function handleDeleteDocument(id: number) {
  isOpenConfirmDeleteDocument.value = true
  idDocument.value = id
}

async function handleDelete() {
  await documentStore.deleteDocument(idDocument.value)
  await projectStore.getAllDocumentInProject(projectId.value)

  isOpenConfirmDeleteDocument.value = false
}

function handleCancelDelete() {
  isOpenConfirmDeleteDocument.value = false
}

function handleToggleEditDocument(id: number) {
  idDocument.value = id
  isOpenDocumentEditForm.value = !isOpenDocumentEditForm.value
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.wrapper-saved {
  min-height: calc(100vh - 60px);
}
.custom-add {
  background-color: #f2f2f5;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
}
.custom-task-document {
  background-color: #f2f2f5;
  padding: 8px;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
}
.custom-title {
  background-color: #f2f2f5;
  padding: 8px;
  border-radius: 10px;
  width: 100%;
}
</style>
