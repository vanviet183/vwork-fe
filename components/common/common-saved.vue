<template>
  <div class="wrapper-saved">
    <div
      class="d-flex align-center font-semibold cursor-pointer"
      @click="handleGoToTasks"
    >
      <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
      <p>Danh sách công việc</p>
    </div>
    <div class="d-flex align-center justify-between my-4">
      <p class="font-semibold custom-title">
        Danh sách tài liệu dự án {{ `(${listDocumentInProject?.length})` }}
      </p>
      <!-- <div
        class="d-flex align-center custom-add"
        @click="handleToggleDocumentForm"
      >
        <v-icon icon="mdi-plus" class="mr-1"></v-icon>
        <p>Thêm</p>
      </div> -->
    </div>
    <div v-if="listDocumentDesign.length">
      <p class="font-semibold my-3">
        Tài liệu thiết kế {{ `(${listDocumentDesign.length})` }}
      </p>
      <div
        v-for="(item, index) in listDocumentDesign"
        :key="index"
        class="d-flex align-center justify-between custom-document-saved"
        @click="handleDownloadFile(item.filePath)"
      >
        <p>
          {{ item.fileName }}
        </p>
        <div>
          <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon>
          <v-icon icon="mdi-delete-outline" class="mr-1"></v-icon>
        </div>
      </div>
    </div>
    <div v-if="listDocumentRequire.length">
      <p class="font-semibold my-3">
        Tài liệu yêu cầu {{ `(${listDocumentRequire.length})` }}
      </p>
      <div
        v-for="(item, index) in listDocumentRequire"
        :key="index"
        class="d-flex align-center justify-between custom-document-saved"
        @click="handleDownloadFile(item.filePath)"
      >
        <p>
          {{ item.fileName }}
        </p>
        <div>
          <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon>
          <v-icon icon="mdi-delete-outline" class="mr-1"></v-icon>
        </div>
      </div>
    </div>
    <div v-if="listDocumentReport.length">
      <p class="font-semibold my-3">
        Tài liệu báo cáo {{ `(${listDocumentReport.length})` }}
      </p>
      <div
        v-for="(item, index) in listDocumentReport"
        :key="index"
        class="d-flex align-center justify-between custom-document-saved"
        @click="handleDownloadFile(item.filePath)"
      >
        <p>
          {{ item.fileName }}
        </p>
        <div>
          <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon>
          <v-icon icon="mdi-delete-outline" class="mr-1"></v-icon>
        </div>
      </div>
    </div>
    <div v-if="listDocumentManual.length">
      <p class="font-semibold my-3">
        Tài liệu hướng dẫn {{ `(${listDocumentManual.length})` }}
      </p>
      <div
        v-for="(item, index) in listDocumentManual"
        :key="index"
        class="d-flex align-center justify-between custom-document-saved"
        @click="handleDownloadFile(item.filePath)"
      >
        <p>
          {{ item.fileName }}
        </p>
        <div>
          <v-icon icon="mdi-pencil-outline" class="mr-2"></v-icon>
          <v-icon icon="mdi-delete-outline" class="mr-1"></v-icon>
        </div>
      </div>
    </div>
    <SavedForm
      v-if="isOpenDocumentForm"
      @close-form="handleToggleDocumentForm"
    />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { TYPE_DOCUMENT } from '~/constants'
import { useProjectStore } from '~/stores/project/project-store'

const emit = defineEmits(['close'])

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const projectStore = useProjectStore()
const { listDocumentInProject } = storeToRefs(projectStore)

const isOpenDocumentForm = ref(false)

const listDocumentDesign = computed(() =>
  getDocumentByType(TYPE_DOCUMENT.DESIGN)
)
const listDocumentReport = computed(() =>
  getDocumentByType(TYPE_DOCUMENT.REPORT)
)
const listDocumentRequire = computed(() =>
  getDocumentByType(TYPE_DOCUMENT.REQUIRE)
)
const listDocumentManual = computed(() =>
  getDocumentByType(TYPE_DOCUMENT.MANUAL)
)

onMounted(async () => {
  await projectStore.getAllDocumentInProject(projectId.value)
})

function getDocumentByType(type: string) {
  return listDocumentInProject.value?.filter((item) => item.type === type) ?? []
}

const handleToggleDocumentForm = () => {
  isOpenDocumentForm.value = !isOpenDocumentForm.value
}

function handleDownloadFile(filePath: string) {
  window.open(filePath, '_blank')
}

function handleGoToTasks() {
  emit('close')
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
.custom-document-saved {
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