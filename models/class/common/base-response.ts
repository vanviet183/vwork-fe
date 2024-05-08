export class BaseResponse<T> {
  contents?: T

  message?: string

  constructor(contents: any, message?: string) {
    this.contents = contents
    this.message = message
  }
}
