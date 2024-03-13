import { Expose, instanceToInstance } from 'class-transformer'

export class GetUserRequest {
  @Expose({ name: 'user_id' })
  userId: string

  @Expose({ name: 'email' })
  email: string

  constructor(userId: string, email: string) {
    this.userId = userId
    this.email = email
  }

  public get instance() {
    const instance = instanceToInstance(this) as this
    return instance
  }
}
