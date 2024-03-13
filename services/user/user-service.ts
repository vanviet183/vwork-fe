import { plainToClassFromExist } from 'class-transformer'
import { BaseResponse } from '~/models/class/common/base-response'
import { GetUserRequest } from '~/models/class/user/get-user-request'
import { GetUserResponse } from '~/models/class/user/get-user-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_LIST_USER: '/user/get_list_user',
  UPDATE_MAIL_RECEIVE_SETTING: '/test',
}

export const getListUserApi = async (
  getListUserRequest: GetUserRequest
): Promise<BaseResponse<GetUserResponse>> => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetUserResponse>>(
    ApiPath.GET_LIST_USER,
    { params: getListUserRequest }
  )
  const data = plainToClassFromExist(
    new BaseResponse<GetUserResponse>(GetUserResponse),
    response.data
  )
  return data
}

export const updateMailReceiveSettingApi = async (
  getListUserRequest: GetUserRequest
): Promise<BaseResponse<Object>> => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<Object>>(
    ApiPath.UPDATE_MAIL_RECEIVE_SETTING,
    getListUserRequest
  )
  const data = plainToClassFromExist(
    new BaseResponse<Object>(Object),
    response.data
  )
  return data
}
