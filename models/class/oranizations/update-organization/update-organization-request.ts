export class UpdateOrganizationRequest {
  organizationId: number
  organizationName: string
  description: string
  email: string
  phone: string
  userId: number

  constructor(
    organizationId: number,
    organizationName: string,
    description: string,
    email: string,
    phone: string,
    userId: number
  ) {
    this.organizationId = organizationId
    this.userId = userId
    this.organizationName = organizationName
    this.description = description
    this.email = email
    this.phone = phone
  }
}
