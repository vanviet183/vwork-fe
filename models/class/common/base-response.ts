import { Exclude, Type, instanceToPlain } from 'class-transformer'

export class BaseResponse<T> {
  @Exclude()
  private type: Function

  @Type((options) => {
    return (options?.newObject as BaseResponse<T>).type
  })
  contents?: T

  message?: string

  constructor(type: Function) {
    this.type = type
  }

  public get instance() {
    const instance = instanceToPlain(this) as this
    return instance
  }
}
