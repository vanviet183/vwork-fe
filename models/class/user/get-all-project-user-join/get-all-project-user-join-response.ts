import type { Project } from '../../common/project'

export class GetAllProjectUserJoinResponse {
  listProject: Project[]

  constructor(listProject: Project[]) {
    this.listProject = listProject
  }
}
