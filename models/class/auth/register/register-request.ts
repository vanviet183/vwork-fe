import { Expose, instanceToInstance } from 'class-transformer'

export class RegisterRequest {
  @Expose({ name: 'first_name' })
  firstName: string

  @Expose({ name: 'last_name' })
  lastName: string

  @Expose({ name: 'email' })
  email: string

  @Expose({ name: 'password' })
  password: string

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }

  public get instance() {
    const instance = instanceToInstance(this) as this
    return instance
  }
}
