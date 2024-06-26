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

export enum TASK_STATUS {
  NONE = 'None',
  DOING = 'Doing',
  WAIT_ACCEPT = 'Wait',
  COMPLETED = 'Completed',
}

export enum USER_INFO {
  SELF_INFO = 'SELF',
  CONTACT_INFO = 'CONTACT',
  COMPANY_INFO = 'COMPANY',
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

export const MAIL_ADDRESS_ADMIN = 'contact@vwork.com'
export const MAIL_OTHER_DATA_INFO = {
  SUBJECT: 'Liên hệ với website Vwork',
  BODY: 'Xin chào Vwork, %0D%0A %0D%0A Tôi là [Tên của bạn] và tôi đang liên hệ với bạn để... %0D%0A %0D%0A [Thêm thông tin chi tiết nếu cần thiết], Tôi đã thấy thông tin về dịch vụ của bạn trên trang web và muốn biết thêm về tính năng và tôi tin rằng chúng ta có thể hợp tác hiệu quả với nhau. %0D%0A %0D%0A Xin vui lòng cho chúng tôi biết thông tin cần thiết và cách tốt nhất để liên hệ lại. %0D%0A %0D%0A Trân trọng, %0D%0A %0D%0A [Tên của bạn] %0D%0A [Thông tin liên lạc của bạn (email và số điện thoại)] %0D%0A [Địa chỉ công ty (nếu cần)] %0D%0A %0D%0A %0D%0A %0D%0A Việc này là để liên hệ với chúng tôi về mong muốn và yêu cầu của bạn. %0D%0A *Vui lòng chỉnh sửa nội dung của biểu mẫu trên nếu cần.',
}

export enum ROLE {
  ADMIN = 'ADMIN',
  CEO = 'CEO',
  TEAMLEAD = 'TEAMLEAD',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  ORTHERS = 'ORTHERS',
}

export enum SECTOR {
  DEVOPS = 'DevOps',
  BA = 'BA',
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  TESTER = 'Tester',
}

export enum TASK_PRIORITIZE {
  HIGH = 'HIGH',
  MIDDLE = 'MIDDLE',
  LOW = 'LOW',
  NONE = 'NONE',
}

export enum TASK_PHASE {
  PLAN = 'PLAN',
  DESIGN = 'DESIGN',
  CODE = 'CODE',
  TEST = 'TEST',
  DEPLOYMENT = 'DEPLOYMENT',
  MAINTAIN = 'MAINTAIN',
}

export enum TYPE_DOCUMENT {
  DESIGN = 'DESIGN',
  REQUIRE = 'REQUIRE',
  MANUAL = 'MANUAL',
  REPORT = 'REPORT',
}

export enum TYPE_MEETING {
  PROJECT = 'PROJECT',
  SELF = 'SELF',
}

export enum SORT_TASK {
  TIME_ASC = 'TIME_ASC',
  TIME_DES = 'TIME_DES',
  PRIORITIZE = 'PRIORITIZE',
}

export const yupValidationMeesage = {
  mixed: {
    required: 'Vui lòng nhập trường này',
  },
  string: {
    max: 'Vượt quá ${max} ký tự',
    email: 'Vui lòng nhập email hợp lệ',
    url: 'Vui lòng nhập url hợp lệ',
  },
}
