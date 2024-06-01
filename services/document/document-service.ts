import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateDocumentRequest } from '~/models/class/document/create-document/create-document-request'
import type { CreateDocumentResponse } from '~/models/class/document/create-document/create-document-response'
import type { DeleteDocumentRequest } from '~/models/class/document/delete-document/delete-document-request'
import type { GetDocumentInfoRequest } from '~/models/class/document/get-document-info/get-document-info-request'
import type { GetDocumentInfoResponse } from '~/models/class/document/get-document-info/get-document-info-response'
import type { UpdateDocumentRequest } from '~/models/class/document/update-document/update-document-request'
import type { UpdateDocumentResponse } from '~/models/class/document/update-document/update-document-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_DOCUMENT: '/documents/create',
  DELETE_DOCUMENT: '/documents',
  GET_DOCUMENT_INFO: '/documents',
  UPDATE_DOCUMENT: '/documents',
}

export const createDocumentApi = async (
  createDocumentRequest: CreateDocumentRequest
) => {
  const { axiosClient } = useAxiosClient()

  const response = await axiosClient.post<BaseResponse<CreateDocumentResponse>>(
    ApiPath.CREATE_DOCUMENT,
    { ...createDocumentRequest, file: createDocumentRequest.file },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  const { contents, message } = response.data
  return new BaseResponse<CreateDocumentResponse>(contents, message)
}

export const deleteDocumentApi = async (
  deleteDocumentRequest: DeleteDocumentRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.delete(
    `${ApiPath.DELETE_DOCUMENT}/${deleteDocumentRequest.documentId}`
  )

  return new BaseResponse(response.data)
}

export const getDocumentInfoApi = async (
  getDocumentInfoRequest: GetDocumentInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetDocumentInfoResponse>>(
    `${ApiPath.GET_DOCUMENT_INFO}/${getDocumentInfoRequest.documentId}`
  )

  return new BaseResponse<GetDocumentInfoResponse>(response.data)
}

export const updateDocumentApi = async (
  updateDocumentRequest: UpdateDocumentRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.patch<
    BaseResponse<UpdateDocumentResponse>
  >(
    `${ApiPath.UPDATE_DOCUMENT}/${updateDocumentRequest.documentId}`,
    updateDocumentRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<UpdateDocumentResponse>(contents, message)
}
