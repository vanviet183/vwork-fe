import type { Project } from '../../common/project'

export class GetAllProjectByOrganizationResponse {
  listProject: Project[]

  constructor(listProject: Project[]) {
    this.listProject = listProject
  }
}
