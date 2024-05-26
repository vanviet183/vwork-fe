export class UpdateUserInfoRequest {
  userId: number
  firstName?: string
  lastName?: string
  birthday?: string
  phone?: string

  constructor(
    userId: number,
    firstName?: string,
    lastName?: string,
    birthday?: string,
    phone?: string
  ) {
    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.birthday = birthday
    this.phone = phone
  }
}
