import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateProjectRequest } from '~/models/class/projects/create-project/create-project-request'
import type { CreateProjectResponse } from '~/models/class/projects/create-project/create-project-response'
import type { DeleteProjectRequest } from '~/models/class/projects/delete-project/delete-project-request'
import type { EditProjectRequest } from '~/models/class/projects/edit-project/edit-project-request'
import type { EditProjectResponse } from '~/models/class/projects/edit-project/edit-project-response'
import type { GetAllDocumentInProjectRequest } from '~/models/class/projects/get-all-document-in-project/get-all-document-in-project-request'
import type { GetAllDocumentInProjectResponse } from '~/models/class/projects/get-all-document-in-project/get-all-document-in-project-response'
import type { GetAllMeetingInProjectRequest } from '~/models/class/projects/get-all-meeting-in-project/get-all-meeting-in-project-request'
import type { GetAllMeetingInProjectResponse } from '~/models/class/projects/get-all-meeting-in-project/get-all-meeting-in-project-response'
import type { GetAllTaskInProjectRequest } from '~/models/class/projects/get-all-task-in-project/get-all-task-in-project-request'
import type { GetAllTaskInProjectResponse } from '~/models/class/projects/get-all-task-in-project/get-all-task-in-project-response'
import type { GetAllUserInProjectRequest } from '~/models/class/projects/get-all-user-in-project/get-all-user-in-project-request'
import type { GetAllUserInProjectResponse } from '~/models/class/projects/get-all-user-in-project/get-all-user-in-project-response'
import type { GetProjectInfoRequest } from '~/models/class/projects/get-project-info/get-project-info-request'
import type { GetProjectInfoResponse } from '~/models/class/projects/get-project-info/get-project-info-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_PROJECT: '/projects/create',
  EDIT_PROJECT: '/projects',
  GET_PROJECT_INFO: '/projects',
  GET_ALL_TASK_IN_PROJECT: '/projects',
  GET_ALL_USER_IN_PROJECT: '/projects',
  GET_ALL_DOCUMENT_IN_PROJECT: '/projects',
  GET_ALL_MEETING_IN_PROJECT: '/projects',
  DELETE_PROJECT: '/projects',
}

export const getProjectInfoApi = async (
  getProjectInfoRequest: GetProjectInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetProjectInfoResponse>>(
    `${ApiPath.GET_PROJECT_INFO}/${getProjectInfoRequest.projectId}`
  )

  return new BaseResponse<GetProjectInfoResponse>(response.data)
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
  const response = await axiosClient.post<BaseResponse<CreateProjectResponse>>(
    ApiPath.CREATE_PROJECT,
    createProjectRequest
  )
  const { contents, message } = response.data

  return new BaseResponse(contents, message)
}

export const editProjectApi = async (
  editProjectRequest: EditProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.patch<BaseResponse<EditProjectResponse>>(
    `${ApiPath.EDIT_PROJECT}/${editProjectRequest.projectId}`,
    editProjectRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<EditProjectResponse>(contents, message)
}

export const getAllTaskInProjectApi = async (
  getAllTaskInProjectRequest: GetAllTaskInProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetAllTaskInProjectResponse>
  >(
    `${ApiPath.GET_ALL_TASK_IN_PROJECT}/${getAllTaskInProjectRequest.projectId}/tasks`
  )

  return new BaseResponse<GetAllTaskInProjectResponse>(response.data)
}

export const getAllDocumentInProjectApi = async (
  getAllDocumentInProjectRequest: GetAllDocumentInProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetAllDocumentInProjectResponse>
  >(
    `${ApiPath.GET_ALL_DOCUMENT_IN_PROJECT}/${getAllDocumentInProjectRequest.projectId}/documents`
  )

  return new BaseResponse<GetAllDocumentInProjectResponse>(response.data)
}

export const getAllUserInProjectApi = async (
  getAllUserInProjectRequest: GetAllUserInProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetAllUserInProjectResponse>
  >(
    `${ApiPath.GET_ALL_USER_IN_PROJECT}/${getAllUserInProjectRequest.projectId}/users`
  )

  return new BaseResponse<GetAllUserInProjectResponse>(response.data)
}

export const getAllMeetingInProjectApi = async (
  getAllMeetingInProjectRequest: GetAllMeetingInProjectRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetAllMeetingInProjectResponse>
  >(
    `${ApiPath.GET_ALL_MEETING_IN_PROJECT}/${getAllMeetingInProjectRequest.projectId}/meetings`
  )

  return new BaseResponse<GetAllMeetingInProjectResponse>(response.data)
}
