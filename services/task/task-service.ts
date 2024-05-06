import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateTaskRequest } from '~/models/class/tasks/create-task/create-task-request'
import type { CreateTaskResponse } from '~/models/class/tasks/create-task/create-task-response'
import type { GetAllDocumentInTaskRequest } from '~/models/class/tasks/get-all-document-in-task/get-all-document-in-task-request'
import type { GetAllDocumentInTaskResponse } from '~/models/class/tasks/get-all-document-in-task/get-all-document-in-task-response'
import type { GetAllTaskRequireInTaskRequest } from '~/models/class/tasks/get-all-task-require-in-task/get-all-task-require-in-task-request'
import type { GetAllTaskRequireInTaskResponse } from '~/models/class/tasks/get-all-task-require-in-task/get-all-task-require-in-task-response'
import type { GetTaskInfoRequest } from '~/models/class/tasks/get-task-info/get-task-info-request'
import type { GetTaskInfoResponse } from '~/models/class/tasks/get-task-info/get-task-info-response'
import type { UpdateTaskRequest } from '~/models/class/tasks/update-task/update-task-request'
import type { UpdateTaskResponse } from '~/models/class/tasks/update-task/update-task-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_TASK: '/tasks/create',
  GET_TASK_INFO: '/tasks',
  GET_ALL_TASK_REQUIRE_IN_TASK: '/tasks',
  GET_ALL_DOCUMENT_IN_TASK: '/tasks',
  UPDATE_STATUS_TASK: '/tasks/status',
}

export const createTaskApi = async (createTaskRequest: CreateTaskRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<CreateTaskResponse>(
    ApiPath.CREATE_TASK,
    createTaskRequest
  )

  return new BaseResponse(response.data)
}

export const updateStatusTaskApi = async (
  updateTaskRequest: UpdateTaskRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<UpdateTaskResponse>(
    ApiPath.UPDATE_STATUS_TASK,
    updateTaskRequest
  )

  return new BaseResponse(response.data)
}

export const getTaskInfoApi = async (
  getTaskInfoRequest: GetTaskInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetTaskInfoResponse>(
    `${ApiPath.GET_TASK_INFO}/${getTaskInfoRequest.taskId}`
  )

  return new BaseResponse(response.data)
}

export const getAllTaskRequireInTaskApi = async (
  getAllTaskRequireInTaskRequest: GetAllTaskRequireInTaskRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllTaskRequireInTaskResponse>(
    `${ApiPath.GET_ALL_TASK_REQUIRE_IN_TASK}/${getAllTaskRequireInTaskRequest.taskId}/task-requires`
  )

  return new BaseResponse(response.data)
}

export const getAllDocumentInTaskApi = async (
  getAllDocumentInTaskRequest: GetAllDocumentInTaskRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllDocumentInTaskResponse>(
    `${ApiPath.GET_ALL_DOCUMENT_IN_TASK}/${getAllDocumentInTaskRequest.taskId}/documents`
  )

  return new BaseResponse(response.data)
}
