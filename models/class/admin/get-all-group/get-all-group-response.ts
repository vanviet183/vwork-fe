import type { Group } from '../../common/group'

export class GetAllGroupResponse {
  listGroup: Group[]

  constructor(listGroup: Group[]) {
    this.listGroup = listGroup
  }
}
