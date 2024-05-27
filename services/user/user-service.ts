import type { GetAllUserResponse } from '~/models/class/admin/get-all-user/get-all-user-response'
import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateListUserRequest } from '~/models/class/user/create-list-user/create-list-user-request'
import type { CreateListUserResponse } from '~/models/class/user/create-list-user/create-list-user-response'
import type { CreateUserRequest } from '~/models/class/user/create-user/create-user-request'
import type { CreateUserResponse } from '~/models/class/user/create-user/create-user-response'
import type { DeleteUserRequest } from '~/models/class/user/delete-user/delete-user-request'
import type { GetAllProjectUserJoinRequest } from '~/models/class/user/get-all-project-user-join/get-all-project-user-join-request'
import type { GetAllProjectUserJoinResponse } from '~/models/class/user/get-all-project-user-join/get-all-project-user-join-response'
import { GetUserInfoRequest } from '~/models/class/user/get-user-info/get-user-info-request'
import type { GetUserInfoResponse } from '~/models/class/user/get-user-info/get-user-info-response'
import type { UpdatePasswordUserRequest } from '~/models/class/user/update-password-user/update-password-user-request'
import type { UpdatePasswordUserResponse } from '~/models/class/user/update-password-user/update-password-user-response'
import type { UpdateUserInfoRequest } from '~/models/class/user/update-user-info/update-user-info-request'
import type { UpdateUserInfoResponse } from '~/models/class/user/update-user-info/update-user-info-response'
import type { UpdateUserRequest } from '~/models/class/user/update-user/update-user-request'
import type { UpdateUserResponse } from '~/models/class/user/update-user/update-user-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_USER_INFO: '/users',
  GET_ADMIN_INFO: '/users/admin',
  CREATE_USER: '/users/create',
  UPDATE_PASSWORD_USER: '/users/password',
  UPDATE_USER: '/users',
  UPDATE_USER_INFO: '/users/info',
  DELETE_USER: '/users',
  CREATE_LIST_USER: '/users/create-list-user',
  GET_ALL_USER: '/users',
  GET_ALL_PROJECT_USER_JOIN: '/users',
}

export const getUserInfoApi = async (
  getUserInfoRequest: GetUserInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetUserInfoResponse>>(
    `${ApiPath.GET_USER_INFO}/${getUserInfoRequest.userId}`
  )

  return new BaseResponse<GetUserInfoResponse>(response.data)
}

export const getAllUserApi = async () => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetAllUserResponse>>(
    ApiPath.GET_ALL_USER
  )

  return new BaseResponse<GetAllUserResponse>(response.data)
}

export const getAllProjectsUserJoinApi = async (
  getAllProjectUserJoinRequest: GetAllProjectUserJoinRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<
    BaseResponse<GetAllProjectUserJoinResponse>
  >(
    `${ApiPath.GET_ALL_PROJECT_USER_JOIN}/${getAllProjectUserJoinRequest.userId}/projects`
  )

  return new BaseResponse<GetAllProjectUserJoinResponse>(response.data)
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

export const updateUserApi = async (updateUserRequest: UpdateUserRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.patch<BaseResponse<UpdateUserResponse>>(
    `${ApiPath.UPDATE_USER}/${updateUserRequest.userId}`,
    updateUserRequest
  )
  const { contents, message } = response.data
  return new BaseResponse<UpdateUserResponse>(contents, message)
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

export const updatePasswordUserApi = async (
  updatePasswordUserRequest: UpdatePasswordUserRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<
    BaseResponse<UpdatePasswordUserResponse>
  >(ApiPath.UPDATE_PASSWORD_USER, updatePasswordUserRequest)
  const { contents, message } = response.data
  return new BaseResponse<UpdatePasswordUserResponse>(contents, message)
}

export const deleteUserApi = async (deleteUserRequest: DeleteUserRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.delete(
    `${ApiPath.DELETE_USER}/${deleteUserRequest.userId}`
  )

  return new BaseResponse(response.data)
}

export const updateUserInfoApi = async (
  updateUserInfoRequest: UpdateUserInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<UpdateUserInfoResponse>>(
    ApiPath.UPDATE_USER_INFO,
    updateUserInfoRequest
  )
  const { contents, message } = response.data
  return new BaseResponse<UpdateUserInfoResponse>(contents, message)
}
