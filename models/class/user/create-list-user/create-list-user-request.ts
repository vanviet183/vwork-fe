export class CreateListUserRequest {
  organizationId: number
  file: File

  constructor(organizationId: number, file: File) {
    this.organizationId = organizationId
    this.file = file
  }
}
