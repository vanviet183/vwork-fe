export class UpdateStatusProjectRequest {
  projectId: number
  status: string

  constructor(projectId: number, status: string) {
    this.projectId = projectId
    this.status = status
  }
}
