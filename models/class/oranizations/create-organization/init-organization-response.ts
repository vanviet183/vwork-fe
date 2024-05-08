import type { Group } from '../../common/group'
import type { Project } from '../../common/project'

export class InitOrganizationResponse {
  id: number
  author: string
  organizationName: string
  email: string
  phone: string
  groups: Group[]
  projects?: Project[]

  constructor(
    id: number,
    author: string,
    organizationName: string,
    email: string,
    phone: string,
    groups: Group[],
    projects?: Project[]
  ) {
    this.id = id
    this.author = author
    this.email = email
    this.phone = phone
    this.organizationName = organizationName
    this.groups = groups
    this.projects = projects
  }
}
