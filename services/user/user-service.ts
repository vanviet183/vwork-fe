import type { GetAllUserResponse } from '~/models/class/admin/get-all-user/get-all-user-response'
import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateListUserRequest } from '~/models/class/user/create-list-user/create-list-user-request'
import type { CreateListUserResponse } from '~/models/class/user/create-list-user/create-list-user-response'
import type { CreateUserRequest } from '~/models/class/user/create-user/create-user-request'
import type { CreateUserResponse } from '~/models/class/user/create-user/create-user-response'
import { GetUserInfoRequest } from '~/models/class/user/get-user-info/get-user-info-request'
import type { GetUserInfoResponse } from '~/models/class/user/get-user-info/get-user-info-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_USER_INFO: '/users',
  GET_ADMIN_INFO: '/users/admin',
  CREATE_USER: '/users/create',
  CREATE_LIST_USER: '/users/create-list-user',
  GET_ALL_USER: '/users',
}

export const getUserInfoApi = async (
  getUserInfoRequest: GetUserInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetUserInfoResponse>(
    `${ApiPath.GET_USER_INFO}/${getUserInfoRequest.userId}`
  )

  return new BaseResponse(response.data)
}

export const getAllUserApi = async () => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetAllUserResponse>>(
    ApiPath.GET_ALL_USER
  )

  return new BaseResponse<GetAllUserResponse>(response.data)
}

export const getAdminInfoApi = async (
  getUserInfoRequest: GetUserInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetUserInfoResponse>(
    `${ApiPath.GET_ADMIN_INFO}/${getUserInfoRequest.userId}`
  )

  return new BaseResponse(response.data)
}

export const createUserApi = async (createUserRequest: CreateUserRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<CreateUserResponse>>(
    ApiPath.CREATE_USER,
    createUserRequest
  )
  const { contents, message } = response.data
  return new BaseResponse(contents, message)
}

export const createListUserApi = async (
  createListUserRequest: CreateListUserRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<CreateListUserResponse>>(
    ApiPath.CREATE_LIST_USER,
    { file: createListUserRequest.file },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
  const { contents, message } = response.data
  return new BaseResponse(contents, message)
}
