import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateGroupRequest } from '~/models/class/groups/create-group/create-group-request'
import type { CreateGroupResponse } from '~/models/class/groups/create-group/create-group-response'
import type { GetAllUserInGroupRequest } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-request'
import type { GetAllUserInGroupResponse } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_ALL_USER_IN_GROUP: '/groups',
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
  const response = await axiosClient.post<CreateGroupResponse>(
    ApiPath.CREATE_GROUP,
    createGroupRequest
  )

  return new BaseResponse(response.data)
}
