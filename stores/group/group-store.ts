import { User } from '~/models/class/common/user'
import { GetAllUserInGroupRequest } from '~/models/class/groups/get-all-user-in-group/get-all-user-in-group-request'
import { getAllUserInGroupApi } from '~/services/group/group-service'
import { useAlertStore } from '../alert/alert-store'

export const useGroupStore = defineStore('group', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  // list user
  const listUser = ref<User[]>()

  async function getAllUserInGroup(groupId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllUserInGroupRequest(groupId)
      const response = await getAllUserInGroupApi(request)

      listUser.value = response.contents.listUser
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
    listUser,
    getAllUserInGroup,
  }
})
