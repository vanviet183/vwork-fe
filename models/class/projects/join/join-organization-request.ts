export class JoinOrganizationRequest {
  userId: number
  organizationId: number

  constructor(userId: number, organizationId: number) {
    this.userId = userId
    this.organizationId = organizationId
  }
}
