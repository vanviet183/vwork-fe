import type { Meeting } from '../../common/meeting'

export class GetAllMeetingInOrganizationResponse {
  listMeeting: Meeting[]

  constructor(listMeeting: Meeting[]) {
    this.listMeeting = listMeeting
  }
}
