import { LoginRequest } from '~/models/class/auth/login/login-request'
import { LoginResponse } from '~/models/class/auth/login/login-response'
import { RegisterRequest } from '~/models/class/auth/register/register-request'
import { RegisterResponse } from '~/models/class/auth/register/register-response'
import { BaseResponse } from '~/models/class/common/base-response'
import { useAxiosClient } from '~/services/axios-client'

const ApiPath = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
}

export const loginApi = async (loginRequest: LoginRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<LoginResponse>>(
    ApiPath.AUTH_LOGIN,
    loginRequest
  )

  const { contents, message } = response.data
  return new BaseResponse<LoginResponse>(contents, message)
}

export const registerApi = async (registerRequest: RegisterRequest) => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<RegisterResponse>(
    ApiPath.AUTH_REGISTER,
    registerRequest
  )

  return new BaseResponse(response.data)
}
