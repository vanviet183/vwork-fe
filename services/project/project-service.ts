import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateProjectRequest } from '~/models/class/projects/create-project/create-project-request'
import type { CreateProjectResponse } from '~/models/class/projects/create-project/create-project-response'
import type { DeleteProjectRequest } from '~/models/class/projects/delete-project/delete-project-request'
import type { GetAllTaskInProjectRequest } from '~/models/class/projects/get-all-task-in-project/get-all-task-in-project-request'
import type { GetAllTaskInProjectResponse } from '~/models/class/projects/get-all-task-in-project/get-all-task-in-project-response'
import type { GetProjectInfoRequest } from '~/models/class/projects/get-project-info/get-project-info-request'
import type { GetProjectInfoResponse } from '~/models/class/projects/get-project-info/get-project-info-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_PROJECT: '/projects/create',
  GET_PROJECT_INFO: '/projects',
  GET_ALL_TASK_IN_PROJECT: '/projects',
  DELETE_PROJECT: '/projects',
}

export const getProjectInfoApi = async (
  getProjectInfoRequest: GetProjectInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetProjectInfoResponse>(
    `${ApiPath.GET_PROJECT_INFO}/${getProjectInfoRequest.projectId}`
  )

  return new BaseResponse(response.data)
}

export const deleteProjectApi = async (
  deleteProjectRequest: DeleteProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.delete(
    `${ApiPath.DELETE_PROJECT}/${deleteProjectRequest.projectId}`
  )

  return new BaseResponse(response.data)
}

export const createProjectApi = async (
  createProjectRequest: CreateProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<CreateProjectResponse>(
    ApiPath.CREATE_PROJECT,
    createProjectRequest
  )

  return new BaseResponse(response.data)
}

export const getAllTaskInProjectApi = async (
  getAllTaskInProjectRequest: GetAllTaskInProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllTaskInProjectResponse>(
    `${ApiPath.GET_ALL_TASK_IN_PROJECT}/${getAllTaskInProjectRequest.projectId}/tasks`
  )

  return new BaseResponse(response.data)
}
