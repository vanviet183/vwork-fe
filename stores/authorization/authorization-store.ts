export const useAuthorizationStore = defineStore(
  'authorization',
  () => {
    const userId = ref()
    const accessToken = ref()
    const refreshToken = ref()
    const role = ref()
    const organizationId = ref()

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

    function setOrganizationId(value: number) {
      organizationId.value = value
    }
    function resetOrganizationId() {
      organizationId.value = undefined
    }

    return {
      userId,
      accessToken,
      refreshToken,
      role,
      organizationId,
      setSessionAccess,
      resetSessionAccess,
      setOrganizationId,
      resetOrganizationId,
    }
  },
  {
    persist: true,
  }
)
