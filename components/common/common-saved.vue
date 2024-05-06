<template>
  <div class="wrapper-saved">
    <div class="d-flex align-center justify-between my-4">
      <p class="font-semibold">
        Danh sách lưu trữ {{ `(${listDocument?.length})` }}
      </p>
      <div
        class="d-flex align-center custom-add"
        @click="handleToggleDocumentForm"
      >
        <v-icon icon="mdi-plus" class="mr-1"></v-icon>
        <p>Thêm</p>
      </div>
    </div>
    <div
      v-for="(item, index) in listDocument"
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
    <SavedForm
      v-if="isOpenDocumentForm"
      @close-form="handleToggleDocumentForm"
    />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/task/task-store'

const taskStore = useTaskStore()
const { taskInfo, listTaskRequire, listDocument } = storeToRefs(taskStore)

const isOpenDocumentForm = ref(false)

const handleToggleDocumentForm = () => {
  isOpenDocumentForm.value = !isOpenDocumentForm.value
}

function handleDownloadFile(filePath: string) {
  window.open(filePath, '_blank')
}
</script>
<style scoped lang="scss">
@use 'sass:map';

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
</style>
