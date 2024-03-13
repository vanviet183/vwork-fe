export const useAuthorizationStore = defineStore(
  'authorization',
  () => {
    const accessToken = ref('')
    const tokenGetDate = ref('')

    function setAccessToken(access: string) {
      accessToken.value = access
    }

    function resetAccessToken() {
      accessToken.value = ''
    }

    function setTokenGetDate(date: string) {
      tokenGetDate.value = date
    }

    function resetTokenGetDate() {
      tokenGetDate.value = ''
    }

    return {
      accessToken,
      tokenGetDate,
      setAccessToken,
      resetAccessToken,
      setTokenGetDate,
      resetTokenGetDate,
    }
  },
  {
    persist: true,
  }
)
