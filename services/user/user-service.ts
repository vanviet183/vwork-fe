import { GetUserRequest } from '~/models/class/user/get-user-request'
import { GetUserResponse } from '~/models/class/user/get-user-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_LIST_USER: '/user/get_list_user',
  UPDATE_MAIL_RECEIVE_SETTING: '/test',
}

export const getListUserApi = async (getListUserRequest: GetUserRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetUserResponse>(
    ApiPath.GET_LIST_USER,
    { params: getListUserRequest }
  )

  return response.data
}

export const updateMailReceiveSettingApi = async (
  getListUserRequest: GetUserRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<Object>(
    ApiPath.UPDATE_MAIL_RECEIVE_SETTING,
    getListUserRequest
  )
  return response.data
}
