import type { Meeting } from '../../common/meeting'

export class GetAllMeetingInProjectResponse {
  listMeeting: Meeting[]

  constructor(listMeeting: Meeting[]) {
    this.listMeeting = listMeeting
  }
}
