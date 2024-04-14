import { AlertType } from '~/constants'
import { LoginRequest } from '~/models/class/auth/login/login-request'
import { RegisterRequest } from '~/models/class/auth/register/register-request'
import { loginApi, registerApi } from '~/services/auth/auth-service'
import { useAlertStore } from '~/stores/alert/alert-store'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'

export const useAuthStore = defineStore('auth', () => {
  const alertStore = useAlertStore()
  const authorizationStore = useAuthorizationStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  async function login(email: string, password: string) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const loginRequest = new LoginRequest(email, password)
      const response = await loginApi(loginRequest)
      if (response.contents) {
        const { userId, accessToken, refreshToken } = response.contents
        authorizationStore.setSessionAccess(userId, accessToken, refreshToken)
      }
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const registerRequest = new RegisterRequest(
        firstName,
        lastName,
        email,
        password
      )
      const response = await registerApi(registerRequest)
      if (response.contents) {
        const { userId, accessToken, refreshToken } = response.contents
        authorizationStore.setSessionAccess(userId, accessToken, refreshToken)
      }
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
    login,
    register,
  }
})
