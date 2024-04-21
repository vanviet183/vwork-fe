export class GetAllProjectByOrganizationRequest {
  organizationId: number

  constructor(organizationId: number) {
    this.organizationId = organizationId
  }
}
