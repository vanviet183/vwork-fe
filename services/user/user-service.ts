import { BaseResponse } from '~/models/class/common/base-response'
import { GetUserInfoRequest } from '~/models/class/user/get-user-info-request'
import { GetUserInfoResponse } from '~/models/class/user/get-user-info-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_USER_INFO_REQUEST: '/users',
}

export const getUserInfoApi = async (
  getUserInfoRequest: GetUserInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetUserInfoResponse>(
    `${ApiPath.GET_USER_INFO_REQUEST}/${getUserInfoRequest.userId}`
  )

  return new BaseResponse(response.data)
}
