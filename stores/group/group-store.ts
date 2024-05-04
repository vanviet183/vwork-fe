import { Group } from '~/models/class/common/group'
import { User } from '~/models/class/common/user'
import { CreateGroupRequest } from '~/models/class/groups/create-group/create-group-request'
import { GetAllUserInGroupRequest } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-request'
import {
  createGroupApi,
  getAllUserInGroupApi,
} from '~/services/group/group-service'
import { useAlertStore } from '../alert/alert-store'

export const useGroupStore = defineStore('group', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  // list user
  const listUserInGroup = ref<User[]>()

  // groupInfo
  const groupInfo = ref<Group>()

  async function getAllUserInGroup(groupId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllUserInGroupRequest(groupId)
      const response = await getAllUserInGroupApi(request)

      listUserInGroup.value = response.contents.listUser
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createGroup(
    organizationId: number,
    groupName: string,
    teamlead: number,
    listUser: number[]
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateGroupRequest(
        organizationId,
        groupName,
        teamlead,
        listUser
      )
      const response = await createGroupApi(request)
      groupInfo.value = response.contents
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
    listUserInGroup,
    groupInfo,
    getAllUserInGroup,
    createGroup,
  }
})
