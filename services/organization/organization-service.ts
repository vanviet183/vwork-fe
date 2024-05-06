import type { GetAllOrganizationResponse } from '~/models/class/admin/get-all-organization/get-all-organization-response'
import { BaseResponse } from '~/models/class/common/base-response'
import type { GetAllGroupInOrganizationRequest } from '~/models/class/oranizations/get-all-group-in-organization/get-all-group-in-organization-request'
import type { GetAllGroupInOrganizationResponse } from '~/models/class/oranizations/get-all-group-in-organization/get-all-group-in-organization-response'
import type { GetAllMeetingInOrganizationRequest } from '~/models/class/oranizations/get-all-meeting-in-organization/get-all-meeting-in-organization-request'
import type { GetAllMeetingInOrganizationResponse } from '~/models/class/oranizations/get-all-meeting-in-organization/get-all-meeting-in-organization-response'
import type { GetAllProjectByOrganizationRequest } from '~/models/class/oranizations/get-all-project-by-organization/get-all-project-by-organization-request'
import type { GetAllProjectByOrganizationResponse } from '~/models/class/oranizations/get-all-project-by-organization/get-all-project-by-organization-response'
import type { GetAllUserInOrganizationRequest } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-request'
import type { GetAllUserInOrganizationResponse } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-response'
import type { GetOrganizationInfoRequest } from '~/models/class/oranizations/get-organization-info/get-organization-info-request'
import type { GetOrganizationInfoResponse } from '~/models/class/oranizations/get-organization-info/get-organization-info-response'
import type { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import type { InitOrganizationResponse } from '~/models/class/oranizations/init/init-organization-response'
import type { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import type { JoinOrganizationResponse } from '~/models/class/oranizations/join/join-organization-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  INIT_ORGANIZATION: '/organizations/init',
  JOIN_ORGANIZATION: '/organizations/join',
  GET_ALL_GROUP_IN_ORGANIZATION: '/organizations',
  GET_ALL_PROJECT_IN_ORGANIZATION: '/organizations',
  GET_ALL_USER_IN_ORGANIZATION: '/organizations',
  GET_ORGANIZATION_INFO: '/organizations',
  GET_ALL_ORGANIZATION: '/organizations',
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

export const getAllMeetingInOrganizationApi = async (
  getAllMeetingInOrganizationRequest: GetAllMeetingInOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllMeetingInOrganizationResponse>(
    `${ApiPath.GET_ALL_GROUP_IN_ORGANIZATION}/${getAllMeetingInOrganizationRequest.organizationId}/meetings`
  )

  return new BaseResponse(response.data)
}

export const getAllOrganizationApi = async () => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllOrganizationResponse>(
    ApiPath.GET_ALL_ORGANIZATION
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

export const getAllUserInOrganizationApi = async (
  getAllUserInOrganizationRequest: GetAllUserInOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllUserInOrganizationResponse>(
    `${ApiPath.GET_ALL_USER_IN_ORGANIZATION}/${getAllUserInOrganizationRequest.organizationId}/users`
  )

  return new BaseResponse(response.data)
}

export const getOrganizationInfoApi = async (
  getOrganizationInfoRequest: GetOrganizationInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetOrganizationInfoResponse>(
    `${ApiPath.GET_ORGANIZATION_INFO}/${getOrganizationInfoRequest.organizationId}`
  )

  return new BaseResponse(response.data)
}
