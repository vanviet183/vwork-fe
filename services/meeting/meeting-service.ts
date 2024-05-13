import { BaseResponse } from '~/models/class/common/base-response'
import type { CreateMeetingRequest } from '~/models/class/meeting/create-meeting/create-meeting-request'
import type { CreateMeetingResponse } from '~/models/class/meeting/create-meeting/create-meeting-response'
import type { DeleteMeetingRequest } from '~/models/class/meeting/delete-meeting/delete-meeting-request'
import type { EditMeetingRequest } from '~/models/class/meeting/edit-meeting/edit-meeting-request'
import type { EditMeetingResponse } from '~/models/class/meeting/edit-meeting/edit-meeting-response'
import type { GetMeetingInfoRequest } from '~/models/class/meeting/get-meeting-info/get-meeting-info-request'
import type { GetMeetingInfoResponse } from '~/models/class/meeting/get-meeting-info/get-meeting-info-response'

import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  GET_ALL_USER_IN_MEETING: '/meetings',
  GET_MEETING_INFO: '/meetings',
  EDIT_MEETING: '/meetings',
  DELETE_MEETING: '/meetings',
  CREATE_MEETING: '/meetings/create',
}

export const createMeetingApi = async (
  createMeetingRequest: CreateMeetingRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<CreateMeetingResponse>>(
    ApiPath.CREATE_MEETING,
    createMeetingRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<CreateMeetingResponse>(contents, message)
}

export const getMeetingInfoApi = async (
  getMeetingInfoRequest: GetMeetingInfoRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.get<BaseResponse<GetMeetingInfoResponse>>(
    `${ApiPath.GET_MEETING_INFO}/${getMeetingInfoRequest.meetingId}`
  )

  return new BaseResponse<GetMeetingInfoResponse>(response.data)
}

export const editMeetingApi = async (
  editMeetingRequest: EditMeetingRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.patch<BaseResponse<EditMeetingResponse>>(
    `${ApiPath.EDIT_MEETING}/${editMeetingRequest.meetingId}`,
    editMeetingRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<EditMeetingResponse>(contents, message)
}

export const deleteMeetingApi = async (
  deleteMeetingRequest: DeleteMeetingRequest
) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.delete(
    `${ApiPath.DELETE_MEETING}/${deleteMeetingRequest.meetingId}`
  )

  return new BaseResponse(response.data)
}
