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
}

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
