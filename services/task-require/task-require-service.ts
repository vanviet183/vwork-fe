import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateTaskRequireRequest } from '~/models/class/task-require/create-task-require/create-task-require-request'
import type { CreateTaskRequireResponse } from '~/models/class/task-require/create-task-require/create-task-require-response'
import type { GetTaskRequireInfoRequest } from '~/models/class/task-require/get-task-require-info/get-task-require-info-request'
import type { GetTaskRequireInfoResponse } from '~/models/class/task-require/get-task-require-info/get-task-require-info-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_TASK_REQUIRE: '/task-require/create',
  GET_TASK_REQUIRE_INFO: '/task-require',
}

export const createTaskRequireApi = async (
  createTaskRequireRequest: CreateTaskRequireRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<CreateTaskRequireResponse>(
    ApiPath.CREATE_TASK_REQUIRE,
    createTaskRequireRequest
  )

  return new BaseResponse(response.data)
}

export const getTaskRequireInfoApi = async (
  getTaskRequireInfoRequest: GetTaskRequireInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetTaskRequireInfoResponse>(
    `${ApiPath.GET_TASK_REQUIRE_INFO}/${getTaskRequireInfoRequest.taskId}`
  )

  return new BaseResponse(response.data)
}
