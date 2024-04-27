import type { Group } from './group'
import type { Project } from './project'

export class Organization {
  id: number
  author: number
  organizationName: string
  email: string
  phone: string
  groups: Group[]
  projects?: Project[]

  constructor(
    id: number,
    author: number,
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
