export class LoginResponse {
  userId: number
  accessToken: string
  refreshToken: string
  role: string

  constructor(
    userId: number,
    accessToken: string,
    refreshtoken: string,
    role: string
  ) {
    this.userId = userId
    this.accessToken = accessToken
    this.refreshToken = refreshtoken
    this.role = role
  }
}
