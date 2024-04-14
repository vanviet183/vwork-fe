import axios, { HttpStatusCode } from 'axios'
import { AlertType } from '~/constants'
import type { AlertMessage } from '~/models/interface/common/alert'
import { useAlertStore } from '~/stores/alert/alert-store'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'

export const useAxiosClient = () => {
  const runtimeConfig = useRuntimeConfig()

  const api = axios.create({
    baseURL: runtimeConfig.public.apiUrl,
  })

  api.interceptors.request.use(
    function (config) {
      // Add token to request header
      const authorizationStore = useAuthorizationStore()
      const accessToken = authorizationStore.accessToken

      config.headers.Authorization = `Bearer ${accessToken}`

      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response
    },
    function (error) {
      const authorizationStore = useAuthorizationStore()
      const alertStore = useAlertStore()

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response.status === HttpStatusCode.Unauthorized) {
        try {
          authorizationStore.resetSessionAccess()

          const originalConfig = error.config
          originalConfig.headers.Authorization = `Bearer ${authorizationStore.accessToken}`
          return axios(originalConfig)
        } catch (error) {
          authorizationStore.resetSessionAccess()
          return Promise.reject(error)
        }
      } else {
        const errorMessage: AlertMessage = {
          message: error.response.data.message,
          type: AlertType.error,
        }
        alertStore.setAlertMessage(errorMessage)
      }
      return Promise.reject(error)
    }
  )

  return {
    axiosClient: api,
  }
}
