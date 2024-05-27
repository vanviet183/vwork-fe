export class UpdatePasswordUserRequest {
  userId: number
  oldPassword?: string
  newPassword: string

  constructor(userId: number, newPassword: string, oldPassword?: string) {
    this.userId = userId
    this.oldPassword = oldPassword
    this.newPassword = newPassword
  }
}
