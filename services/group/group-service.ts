import type { GetAllGroupResponse } from '~/models/class/admin/get-all-group/get-all-group-response'
import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateGroupRequest } from '~/models/class/groups/create-group/create-group-request'
import type { CreateGroupResponse } from '~/models/class/groups/create-group/create-group-response'
import type { GetAllUserInGroupRequest } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-request'
import type { GetAllUserInGroupResponse } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_ALL_USER_IN_GROUP: '/groups',
  GET_ALL_GROUP: '/groups',
  CREATE_GROUP: '/groups/create',
}

export const getAllUserInGroupApi = async (
  getAllUserInGroupRequest: GetAllUserInGroupRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<GetAllUserInGroupResponse>(
    `${ApiPath.GET_ALL_USER_IN_GROUP}/${getAllUserInGroupRequest.groupId}/users`
  )

  return new BaseResponse(response.data)
}

export const createGroupApi = async (
  createGroupRequest: CreateGroupRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<CreateGroupResponse>>(
    ApiPath.CREATE_GROUP,
    createGroupRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<CreateGroupResponse>(contents, message)
}

export const getAllGroupApi = async () => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetAllGroupResponse>>(
    ApiPath.GET_ALL_GROUP
  )

  return new BaseResponse<GetAllGroupResponse>(response.data)
}
