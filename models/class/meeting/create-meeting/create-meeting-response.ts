import type { User } from '../../common/user'

export class CreateMeetingResponse {
  id: number
  title: string
  location: string
  description: string
  startTime: string
  endTime: string
  users: User[]

  constructor(
    id: number,
    title: string,
    location: string,
    description: string,
    startTime: string,
    endTime: string,
    users: User[]
  ) {
    this.id = id
    this.description = description
    this.location = location
    this.title = title
    this.startTime = startTime
    this.endTime = endTime
    this.users = users
  }
}
