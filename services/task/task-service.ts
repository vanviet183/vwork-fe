import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateTaskRequest } from '~/models/class/tasks/create-task/create-task-request'
import type { CreateTaskResponse } from '~/models/class/tasks/create-task/create-task-response'
import type { DeleteTaskRequest } from '~/models/class/tasks/delete-task/delete-task-request'
import type { EditTaskRequest } from '~/models/class/tasks/edit-task/edit-task-request'
import type { EditTaskResponse } from '~/models/class/tasks/edit-task/edit-task-response'
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
  EDIT_TASK: '/tasks',
  DELETE_TASK: '/tasks',
  GET_TASK_INFO: '/tasks',
  GET_ALL_TASK_REQUIRE_IN_TASK: '/tasks',
  GET_ALL_DOCUMENT_IN_TASK: '/tasks',
  UPDATE_STATUS_TASK: '/tasks/status',
}

export const createTaskApi = async (createTaskRequest: CreateTaskRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<CreateTaskResponse>>(
    ApiPath.CREATE_TASK,
    createTaskRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<CreateTaskResponse>(contents, message)
}

export const updateStatusTaskApi = async (
  updateTaskRequest: UpdateTaskRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<UpdateTaskResponse>>(
    ApiPath.UPDATE_STATUS_TASK,
    updateTaskRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<UpdateTaskResponse>(contents, message)
}

export const getTaskInfoApi = async (
  getTaskInfoRequest: GetTaskInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetTaskInfoResponse>>(
    `${ApiPath.GET_TASK_INFO}/${getTaskInfoRequest.taskId}`
  )

  return new BaseResponse<GetTaskInfoResponse>(response.data)
}

export const getAllTaskRequireInTaskApi = async (
  getAllTaskRequireInTaskRequest: GetAllTaskRequireInTaskRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetAllTaskRequireInTaskResponse>
  >(
    `${ApiPath.GET_ALL_TASK_REQUIRE_IN_TASK}/${getAllTaskRequireInTaskRequest.taskId}/task-requires`
  )

  return new BaseResponse<GetAllTaskRequireInTaskResponse>(response.data)
}

export const getAllDocumentInTaskApi = async (
  getAllDocumentInTaskRequest: GetAllDocumentInTaskRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetAllDocumentInTaskResponse>
  >(
    `${ApiPath.GET_ALL_DOCUMENT_IN_TASK}/${getAllDocumentInTaskRequest.taskId}/documents`
  )

  return new BaseResponse<GetAllDocumentInTaskResponse>(response.data)
}

export const editTaskApi = async (editTaskRequest: EditTaskRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.patch<BaseResponse<EditTaskResponse>>(
    `${ApiPath.EDIT_TASK}/${editTaskRequest.taskId}`,
    editTaskRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<EditTaskResponse>(contents, message)
}

export const deleteTaskApi = async (deleteTaskRequest: DeleteTaskRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.delete(
    `${ApiPath.DELETE_TASK}/${deleteTaskRequest.taskId}`
  )

  return new BaseResponse(response.data)
}
