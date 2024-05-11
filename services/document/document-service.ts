import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateDocumentRequest } from '~/models/class/document/create-document/create-document-request'
import type { CreateDocumentResponse } from '~/models/class/document/create-document/create-document-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_DOCUMENT: '/documents/create',
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
