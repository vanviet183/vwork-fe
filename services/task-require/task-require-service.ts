import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateTaskRequireRequest } from '~/models/class/task-require/create-task-require/create-task-require-request'
import type { CreateTaskRequireResponse } from '~/models/class/task-require/create-task-require/create-task-require-response'
import type { DeleteTaskRequireRequest } from '~/models/class/task-require/delete-task-require/delete-task-require-request'
import type { EditTaskRequireRequest } from '~/models/class/task-require/edit-task-require/edit-task-require-request'
import type { EditTaskRequireResponse } from '~/models/class/task-require/edit-task-require/edit-task-require-response'
import type { GetTaskRequireInfoRequest } from '~/models/class/task-require/get-task-require-info/get-task-require-info-request'
import type { GetTaskRequireInfoResponse } from '~/models/class/task-require/get-task-require-info/get-task-require-info-response'
import type { UpdateStatusTaskRequireRequest } from '~/models/class/task-require/update-status-task-require/update-status-task-require-request'
import type { UpdateStatusTaskRequireResponse } from '~/models/class/task-require/update-status-task-require/update-status-task-require-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_TASK_REQUIRE: '/task-require/create',
  GET_TASK_REQUIRE_INFO: '/task-require',
  EDIT_TASK_REQUIRE: '/task-require',
  UPDATE_STATUS_TASK_REQUIRE: '/task-require',
  DELETE_TASK_REQUIRE: '/task-require',
}

export const createTaskRequireApi = async (
  createTaskRequireRequest: CreateTaskRequireRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<
    BaseResponse<CreateTaskRequireResponse>
  >(ApiPath.CREATE_TASK_REQUIRE, createTaskRequireRequest)

  const { contents, message } = response.data
  return new BaseResponse<CreateTaskRequireResponse>(contents, message)
}

export const getTaskRequireInfoApi = async (
  getTaskRequireInfoRequest: GetTaskRequireInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetTaskRequireInfoResponse>
  >(
    `${ApiPath.GET_TASK_REQUIRE_INFO}/${getTaskRequireInfoRequest.taskRequireId}`
  )

  return new BaseResponse<GetTaskRequireInfoResponse>(response.data)
}

export const editTaskRequireApi = async (
  editTaskRequireRequest: EditTaskRequireRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.patch<
    BaseResponse<EditTaskRequireResponse>
  >(
    `${ApiPath.EDIT_TASK_REQUIRE}/${editTaskRequireRequest.taskRequireId}`,
    editTaskRequireRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<EditTaskRequireResponse>(contents, message)
}

export const updateStatusTaskRequireApi = async (
  updateStatusTaskRequireRequest: UpdateStatusTaskRequireRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<
    BaseResponse<UpdateStatusTaskRequireResponse>
  >(
    `${ApiPath.UPDATE_STATUS_TASK_REQUIRE}/status`,
    updateStatusTaskRequireRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<UpdateStatusTaskRequireResponse>(contents, message)
}

export const deleteTaskRequireApi = async (
  deleteTaskRequireRequest: DeleteTaskRequireRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.delete(
    `${ApiPath.DELETE_TASK_REQUIRE}/${deleteTaskRequireRequest.taskRequireId}`
  )

  return new BaseResponse(response.data)
}
