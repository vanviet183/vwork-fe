export enum ButtonType {
  flat = 'flat',
  outlined = 'outlined',
  tonal = 'tonal',
  text = 'text',
  plain = 'plain',
}

export enum SCREEN_MODE {
  EDIT = 'edit',
  NEW = 'new',
  PREVIEW = 'preview',
}

export enum TAB_LOGIN {
  EMAIL,
  PHONE,
}

export const ERR_MESSAGE = {
  ERR_SYS_ERROR: 'ERR_SYS_ERROR',
  ERR_OVER_MAX_FILE_SIZE: 'ERR_OVER_MAX_FILE_SIZE',
  ERR_PASSWORD_NOT_MATCH: 'ERR_PASSWORD_NOT_MATCH',
  ERR_INVALID_EMAIL_FORMAT: 'ERR_INVALID_EMAIL_FORMAT',
  ERR_FIELD_REQUIRED: 'ERR_FIELD_REQUIRED',
  ERR_URL_INVALID: 'ERR_URL_INVALID',
  ERR_PASSWORD_MIN_LENGTH: 'ERR_PASSWORD_MIN_LENGTH',
}

export const MAX_LENGTH_INPUT = 255

export enum AlertType {
  success,
  error,
}

export const yupValidationMeesage = {
  mixed: {
    required: 'Required',
  },
  string: {
    max: '${max}ki tu',
    email: 'email',
    url: 'url',
  },
}
