import type { Organization } from '../../common/organization'

export class GetAllOrganizationResponse {
  listOrganization: Organization[]

  constructor(listOrganization: Organization[]) {
    this.listOrganization = listOrganization
  }
}
