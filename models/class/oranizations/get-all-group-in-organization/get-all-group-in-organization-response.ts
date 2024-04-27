import type { Group } from '../../common/group'

export class GetAllGroupInOrganizationResponse {
  listGroup: Group[]

  constructor(listGroup: Group[]) {
    this.listGroup = listGroup
  }
}
