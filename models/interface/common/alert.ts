import { AlertType } from '~/constants'

export interface AlertMessage {
  id?: string
  message: string
  type: AlertType
}
