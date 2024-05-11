export class CreateMeetingRequest {
  projectId: number
  author: string
  title: string
  startTime: string
  endTime: string
  description: string
  location: string
  listUser: number[]

  constructor(
    projectId: number,
    author: string,
    title: string,
    startTime: string,
    endTime: string,
    description: string,
    location: string,
    listUser: number[]
  ) {
    this.projectId = projectId
    this.author = author
    this.title = title
    this.startTime = startTime
    this.endTime = endTime
    this.listUser = listUser
    this.description = description
    this.location = location
  }
}
