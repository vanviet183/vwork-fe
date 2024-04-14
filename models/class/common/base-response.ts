export class BaseResponse {
  contents?: any

  message?: string

  constructor(contents: any, message?: string) {
    this.contents = contents
    this.message = message
  }
}
