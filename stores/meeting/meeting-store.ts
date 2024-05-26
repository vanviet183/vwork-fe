import { AlertType } from '~/constants'
import { User } from '~/models/class/common/user'
import { GetAllUserInGroupRequest } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-request'
import { CreateMeetingRequest } from '~/models/class/meeting/create-meeting/create-meeting-request'
import { DeleteMeetingRequest } from '~/models/class/meeting/delete-meeting/delete-meeting-request'
import { EditMeetingRequest } from '~/models/class/meeting/edit-meeting/edit-meeting-request'
import { GetMeetingInfoRequest } from '~/models/class/meeting/get-meeting-info/get-meeting-info-request'
import type { GetMeetingInfoResponse } from '~/models/class/meeting/get-meeting-info/get-meeting-info-response'
import { getAllUserInGroupApi } from '~/services/group/group-service'
import {
  createMeetingApi,
  deleteMeetingApi,
  editMeetingApi,
  getMeetingInfoApi,
} from '~/services/meeting/meeting-service'
import { useAlertStore } from '../alert/alert-store'

export const useMeetingStore = defineStore('meeting', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  // list user
  const listUserInMeeting = ref<User[]>()

  const meetingInfo = ref<GetMeetingInfoResponse>()

  async function getAllUserInMeeting(groupId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllUserInGroupRequest(groupId)
      const response = await getAllUserInGroupApi(request)

      listUserInMeeting.value = response.contents.listUser
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createMeeting(
    projectId: number,
    userId: number,
    title: string,
    description: string,
    location: string,
    startTime: string,
    endTime: string,
    listUser: number[],
    type?: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateMeetingRequest(
        projectId,
        userId,
        title,
        description,
        location,
        startTime,
        endTime,
        listUser,
        type
      )

      const response = await createMeetingApi(request)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function getMeetingInfo(meetingId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetMeetingInfoRequest(meetingId)
      const response = await getMeetingInfoApi(request)
      meetingInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function editMeeting(
    meetingId: number,
    userId: number,
    title: string,
    description: string,
    location: string,
    startTime: string,
    endTime: string,
    listUser: number[]
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new EditMeetingRequest(
        meetingId,
        userId,
        title,
        description,
        location,
        startTime,
        endTime,
        listUser
      )
      const response = await editMeetingApi(request)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function deleteMeeting(meetingId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new DeleteMeetingRequest(meetingId)
      const response = await deleteMeetingApi(request)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    error,
    meetingInfo,
    listUserInMeeting,
    getAllUserInMeeting,
    createMeeting,
    getMeetingInfo,
    editMeeting,
    deleteMeeting,
  }
})
