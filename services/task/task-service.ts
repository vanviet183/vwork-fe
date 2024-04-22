import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateTaskRequest } from '~/models/class/tasks/create-task/create-task-request'
import type { CreateTaskResponse } from '~/models/class/tasks/create-task/create-task-response'
import type { GetAllTaskInProjectRequest } from '~/models/class/tasks/get-all-task-in-project/get-all-task-in-project-request'
import type { GetAllTaskInProjectResponse } from '~/models/class/tasks/get-all-task-in-project/get-all-task-in-project-response'
import type { GetTaskInfoRequest } from '~/models/class/tasks/get-task-info/get-task-info-request'
import type { GetTaskInfoResponse } from '~/models/class/tasks/get-task-info/get-task-info-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_TASK: '/tasks/create',
  GET_ALL_TASK_IN_PROJECT: '/tasks/project',
  GET_TASK_INFO: '/tasks',
}

export const createTaskApi = async (createTaskRequest: CreateTaskRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<CreateTaskResponse>(
    ApiPath.CREATE_TASK,
    createTaskRequest
  )

  return new BaseResponse(response.data)
}

export const getAllTaskInProjectApi = async (
  getAllTaskInProjectRequest: GetAllTaskInProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllTaskInProjectResponse>(
    `${ApiPath.GET_ALL_TASK_IN_PROJECT}/${getAllTaskInProjectRequest.projectId}`
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
