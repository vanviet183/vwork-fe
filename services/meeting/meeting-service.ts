import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateMeetingRequest } from '~/models/class/meeting/create-meeting/create-meeting-request'
import type { CreateMeetingResponse } from '~/models/class/meeting/create-meeting/create-meeting-response'

import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_ALL_USER_IN_MEETING: '/meetings',
  CREATE_MEETING: '/meetings/create',
}

export const createMeetingApi = async (
  createMeetingRequest: CreateMeetingRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<CreateMeetingResponse>(
    ApiPath.CREATE_MEETING,
    createMeetingRequest
  )

  return new BaseResponse(response.data)
}
