export const useAuthorizationStore = defineStore(
  'authorization',
  () => {
    const userId = ref()
    const accessToken = ref('')
    const refreshToken = ref('')

    function setSessionAccess(id: number, token: string, reToken: string) {
      userId.value = id
      accessToken.value = token
      refreshToken.value = reToken
    }

    function resetSessionAccess() {
      userId.value = undefined
      accessToken.value = ''
      refreshToken.value = ''
    }

    return {
      userId,
      accessToken,
      refreshToken,
      setSessionAccess,
      resetSessionAccess,
    }
  },
  {
    persist: true,
  }
)
