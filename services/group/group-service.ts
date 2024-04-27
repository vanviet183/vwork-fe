import { BaseResponse } from '~/models/class/common/base-response'
import type { GetAllUserInGroupRequest } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-request'
import type { GetAllUserInGroupResponse } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_ALL_USER_IN_GROUP: '/groups',
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
