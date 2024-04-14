export class RegisterResponse {
  userId: number
  accessToken: string
  refreshToken: string

  constructor(userId: number, accessToken: string, refreshtoken: string) {
    this.userId = userId
    this.accessToken = accessToken
    this.refreshToken = refreshtoken
  }
}
