export class CreateMeetingRequest {
  projectId: number
  userId: number
  title: string
  startTime: string
  endTime: string
  description: string
  location: string
  listUser: number[]
  type?: string

  constructor(
    projectId: number,
    userId: number,
    title: string,
    description: string,
    location: string,
    startTime: string,
    endTime: string,
    listUser: number[],
    type?: string
  ) {
    this.projectId = projectId
    this.userId = userId
    this.title = title
    this.startTime = startTime
    this.endTime = endTime
    this.listUser = listUser
    this.description = description
    this.location = location
    this.type = type
  }
}
