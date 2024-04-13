import { Expose, instanceToInstance } from 'class-transformer'

export class LoginRequest {
  @Expose({ name: 'email' })
  email: string

  @Expose({ name: 'password' })
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }

  public get instance() {
    const instance = instanceToInstance(this) as this
    return instance
  }
}
