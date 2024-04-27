import { BaseResponse } from '~/models/class/common/base-response'
import type { GetAllGroupInOrganizationRequest } from '~/models/class/oranizations/get-all-group-in-organization/get-all-group-in-organization-request'
import type { GetAllGroupInOrganizationResponse } from '~/models/class/oranizations/get-all-group-in-organization/get-all-group-in-organization-response'
import type { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import type { InitOrganizationResponse } from '~/models/class/oranizations/init/init-organization-response'
import type { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import type { JoinOrganizationResponse } from '~/models/class/oranizations/join/join-organization-response'
import type { GetAllProjectByOrganizationRequest } from '~/models/class/projects/get-all-project-by-organization/get-all-project-by-organization-request'
import type { GetAllProjectByOrganizationResponse } from '~/models/class/projects/get-all-project-by-organization/get-all-project-by-organization-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  INIT_ORGANIZATION: '/organizations/init',
  JOIN_ORGANIZATION: '/organizations/join',
  GET_ALL_GROUP_IN_ORGANIZATION: '/organizations',
  GET_ALL_PROJECT_IN_ORGANIZATION: '/organizations',
}

export const initOrganizationApi = async (
  initOrganizationRequest: InitOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<InitOrganizationResponse>(
    ApiPath.INIT_ORGANIZATION,
    initOrganizationRequest
  )

  return new BaseResponse(response.data)
}

export const joinOrganizationApi = async (
  joinOrganizationRequest: JoinOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<JoinOrganizationResponse>(
    ApiPath.JOIN_ORGANIZATION,
    joinOrganizationRequest
  )

  return new BaseResponse(response.data)
}

export const getAllGroupInOrganizationApi = async (
  getAllGroupInOrganizationRequest: GetAllGroupInOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllGroupInOrganizationResponse>(
    `${ApiPath.GET_ALL_GROUP_IN_ORGANIZATION}/${getAllGroupInOrganizationRequest.organizationId}/groups`
  )

  return new BaseResponse(response.data)
}

export const getAllProjectsInOrganizationApi = async (
  getAllProjectByOrganizationRequest: GetAllProjectByOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllProjectByOrganizationResponse>(
    `${ApiPath.GET_ALL_PROJECT_IN_ORGANIZATION}/${getAllProjectByOrganizationRequest.organizationId}/projects`
  )

  return new BaseResponse(response.data)
}
