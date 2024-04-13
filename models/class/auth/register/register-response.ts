import { Expose } from 'class-transformer'

export class RegisterResponse {
  @Expose({ name: 'id' })
  userId: number

  @Expose({ name: 'access_token' })
  accessToken: string

  @Expose({ name: 'refresh_token' })
  refreshToken: string

  constructor(userId: number, accessToken: string, refreshtoken: string) {
    this.userId = userId
    this.accessToken = accessToken
    this.refreshToken = refreshtoken
  }
}
