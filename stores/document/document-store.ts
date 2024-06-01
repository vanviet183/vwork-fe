import { AlertType } from '~/constants'
import { CreateDocumentRequest } from '~/models/class/document/create-document/create-document-request'
import { DeleteDocumentRequest } from '~/models/class/document/delete-document/delete-document-request'
import { GetDocumentInfoRequest } from '~/models/class/document/get-document-info/get-document-info-request'
import type { GetDocumentInfoResponse } from '~/models/class/document/get-document-info/get-document-info-response'
import { UpdateDocumentRequest } from '~/models/class/document/update-document/update-document-request'
import {
  createDocumentApi,
  deleteDocumentApi,
  getDocumentInfoApi,
  updateDocumentApi,
} from '~/services/document/document-service'

import { useAlertStore } from '~/stores/alert/alert-store'

export const useDocumentStore = defineStore('document', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const documentInfo = ref<GetDocumentInfoResponse>()

  async function createDocument(
    file: File,
    type: string,
    isSaved: boolean,
    projectId?: number,
    taskId?: number
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateDocumentRequest(
        file,
        type,
        isSaved,
        projectId,
        taskId
      )
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

  async function getDocumentInfo(documentId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetDocumentInfoRequest(documentId)
      const response = await getDocumentInfoApi(request)

      documentInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function updateDocument(
    documentId: number,
    type: string,
    isSaved: boolean
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new UpdateDocumentRequest(documentId, type, isSaved)
      const response = await updateDocumentApi(request)
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
    documentInfo,
    createDocument,
    deleteDocument,
    getDocumentInfo,
    updateDocument,
  }
})
