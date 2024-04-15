import { BaseResponse } from '~/models/class/common/base-response'
import type { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import type { InitOrganizationResponse } from '~/models/class/oranizations/init/init-organization-response'
import type { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import type { JoinOrganizationResponse } from '~/models/class/oranizations/join/join-organization-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  INIT_ORGANIZATION: '/organization/init',
  JOIN_ORGANIZATION: '/organization/join',
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
