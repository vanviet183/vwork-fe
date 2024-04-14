export class GetUserResponse {
  userId: string

  email: string

  constructor(userId: string, email: string) {
    this.userId = userId
    this.email = email
  }
}
