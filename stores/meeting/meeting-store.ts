import { AlertType } from '~/constants'
import { User } from '~/models/class/common/user'
import { GetAllUserInGroupRequest } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-request'
import { CreateMeetingRequest } from '~/models/class/meeting/create-meeting/create-meeting-request'
import { getAllUserInGroupApi } from '~/services/group/group-service'
import { createMeetingApi } from '~/services/meeting/meeting-service'
import { useAlertStore } from '../alert/alert-store'

export const useMeetingStore = defineStore('meeting', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  // list user
  const listUserInMeeting = ref<User[]>()

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
    author: string,
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
      const request = new CreateMeetingRequest(
        projectId,
        author,
        title,
        description,
        location,
        startTime,
        endTime,
        listUser
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

  return {
    isLoading,
    isError,
    error,
    listUserInMeeting,
    getAllUserInMeeting,
    createMeeting,
  }
})
