import { AlertType } from '~/constants'
import { CreateDocumentRequest } from '~/models/class/document/create-document/create-document-request'
import { createDocumentApi } from '~/services/document/document-service'

import { useAlertStore } from '~/stores/alert/alert-store'

export const useDocumentStore = defineStore('document', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  async function createDocument(taskId: number, file: File, type: string) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateDocumentRequest(taskId, file, type)
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

  return {
    isLoading,
    isError,
    error,
    createDocument,
  }
})
