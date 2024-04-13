import { plainToClassFromExist } from 'class-transformer'
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

export const loginApi = async (
  loginRequest: LoginRequest
): Promise<BaseResponse<LoginResponse>> => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<LoginResponse>>(
    ApiPath.AUTH_LOGIN,
    loginRequest
  )
  const data = plainToClassFromExist(
    new BaseResponse<LoginResponse>(LoginResponse),
    response.data
  )
  return data
}

export const registerApi = async (
  registerRequest: RegisterRequest
): Promise<BaseResponse<RegisterResponse>> => {
  const { axiosClient } = useAxiosClient()
  const response = await axiosClient.post<BaseResponse<RegisterResponse>>(
    ApiPath.AUTH_REGISTER,
    registerRequest
  )
  const data = plainToClassFromExist(
    new BaseResponse<RegisterResponse>(RegisterResponse),
    response.data
  )
  return data
}
