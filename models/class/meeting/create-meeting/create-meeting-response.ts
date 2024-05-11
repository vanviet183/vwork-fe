import type { User } from '../../common/user'

export class CreateMeetingResponse {
  id: number
  title: string
  description: string
  author: string
  location: string
  startTime: string
  endTime: string
  users: User[]

  constructor(
    id: number,
    title: string,
    description: string,
    author: string,
    location: string,
    startTime: string,
    endTime: string,
    users: User[]
  ) {
    this.id = id
    this.description = description
    this.location = location
    this.author = author
    this.title = title
    this.startTime = startTime
    this.endTime = endTime
    this.users = users
  }
}
