export class GetUserRequest {
  userId: string

  email: string

  constructor(userId: string, email: string) {
    this.userId = userId
    this.email = email
  }
}
