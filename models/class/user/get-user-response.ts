import { Expose } from 'class-transformer'

export class GetUserResponse {
  @Expose({ name: 'user_id' })
  userId: string

  @Expose({ name: 'email' })
  email: string

  constructor(userId: string, email: string) {
    this.userId = userId
    this.email = email
  }
}
