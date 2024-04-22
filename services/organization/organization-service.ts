import { BaseResponse } from '~/models/class/common/base-response'
import type { GetAllUserInOrganizationRequest } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-request'
import type { GetAllUserInOrganizationResponse } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-response'
import type { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import type { InitOrganizationResponse } from '~/models/class/oranizations/init/init-organization-response'
import type { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import type { JoinOrganizationResponse } from '~/models/class/oranizations/join/join-organization-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  INIT_ORGANIZATION: '/organizations/init',
  JOIN_ORGANIZATION: '/organizations/join',
  GET_ALL_USER_IN_ORGANIZATION: '/organizations',
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

export const getAllUserInOrganizationApi = async (
  getAllUserInOrganizationRequest: GetAllUserInOrganizationRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllUserInOrganizationResponse>(
    `${ApiPath.GET_ALL_USER_IN_ORGANIZATION}/${getAllUserInOrganizationRequest.organizationId}/users`
  )

  return new BaseResponse(response.data)
}
