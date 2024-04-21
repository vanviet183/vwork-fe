import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateProjectRequest } from '~/models/class/projects/create-project/create-project-request'
import type { CreateProjectResponse } from '~/models/class/projects/create-project/create-project-response'
import type { GetAllProjectByOrganizationRequest } from '~/models/class/projects/get-all-project-by-organization/get-all-project-by-organization-request'
import type { GetAllProjectByOrganizationResponse } from '~/models/class/projects/get-all-project-by-organization/get-all-project-by-organization-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  CREATE_PROJECT: '/projects/create',
  GET_ALL_PROJECT_IN_ORGANIZATION: '/projects/organization',
}

export const getProjectsInOrganizationApi = async (
  getAllProjectByOrganizationRequest: GetAllProjectByOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllProjectByOrganizationResponse>(
    `${ApiPath.GET_ALL_PROJECT_IN_ORGANIZATION}/${getAllProjectByOrganizationRequest.organizationId}`
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
