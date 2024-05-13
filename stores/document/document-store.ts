import { AlertType } from '~/constants'
import { CreateDocumentRequest } from '~/models/class/document/create-document/create-document-request'
import { DeleteDocumentRequest } from '~/models/class/document/delete-document/delete-document-request'
import {
  createDocumentApi,
  deleteDocumentApi,
} from '~/services/document/document-service'

import { useAlertStore } from '~/stores/alert/alert-store'

export const useDocumentStore = defineStore('document', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  async function createDocument(
    taskId: number,
    file: File,
    type: string,
    isSaved: boolean
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateDocumentRequest(taskId, file, type, isSaved)
      const response = await createDocumentApi(request)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function deleteDocument(documentId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new DeleteDocumentRequest(documentId)
      const response = await deleteDocumentApi(request)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    error,
    createDocument,
    deleteDocument,
  }
})
