export const useAuthorizationStore = defineStore(
  'authorization',
  () => {
    const userId = ref()
    const accessToken = ref()
    const refreshToken = ref()
    const role = ref()

    function setSessionAccess(
      id: number,
      token: string,
      reToken: string,
      userRole: string
    ) {
      userId.value = id
      accessToken.value = token
      refreshToken.value = reToken
      role.value = userRole
    }

    function resetSessionAccess() {
      userId.value = undefined
      accessToken.value = undefined
      refreshToken.value = undefined
      role.value = undefined
    }

    return {
      userId,
      accessToken,
      refreshToken,
      role,
      setSessionAccess,
      resetSessionAccess,
    }
  },
  {
    persist: true,
  }
)
