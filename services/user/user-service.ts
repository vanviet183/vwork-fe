import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateListUserRequest } from '~/models/class/user/create-list-user/create-list-user-request'
import type { CreateListUserResponse } from '~/models/class/user/create-list-user/create-user-response'
import type { CreateUserRequest } from '~/models/class/user/create-user/create-user-request'
import type { CreateUserResponse } from '~/models/class/user/create-user/create-user-response'
import { GetUserInfoResponse } from '~/models/class/user/get-user-info-response'
import { GetUserInfoRequest } from '~/models/class/user/get-user-info/get-user-info-request'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_USER_INFO: '/users',
  CREATE_USER: '/users/create',
  CREATE_LIST_USER: '/users/create-list-user',
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

export const createUserApi = async (createUserRequest: CreateUserRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<CreateUserResponse>(
    ApiPath.CREATE_USER,
    createUserRequest
  )

  return new BaseResponse(response.data)
}

export const createListUserApi = async (
  createListUserRequest: CreateListUserRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<CreateListUserResponse>(
    ApiPath.CREATE_LIST_USER,
    { ...createListUserRequest, file: createListUserRequest.file },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return new BaseResponse(response.data)
}
