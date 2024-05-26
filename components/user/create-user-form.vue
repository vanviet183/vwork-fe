<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT
        ? 'Sửa thông tin thành viên'
        : 'Thêm thành viên'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Cập nhật' : 'Tạo'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <div class="text-end">
      <CommonFlatButton
        v-if="props.mode === SCREEN_MODE.NEW"
        background-color="#28526e"
        color="white"
        @click="handleUploadExcel"
        >Thêm danh sách</CommonFlatButton
      >
    </div>
    <form class="mt-4">
      <div v-show="isExcel">
        <CommonUploadFile
          name="fileUpload"
          class="my-[15px]"
          filename="demo123"
          accept=".csv"
          :default-value="undefined"
        />
        <p class="custom-link" @click="handleDownloadTemplateCsv">
          Mẫu danh sách
        </p>
      </div>
      <div v-show="!isExcel">
        <div v-if="props.mode === SCREEN_MODE.NEW">
          <CommonTextField name="firstName" placeholder="Họ"></CommonTextField>
          <CommonTextField
            name="lastName"
            placeholder="Tên"
            class="mt-4"
          ></CommonTextField>
          <CommonTextField
            name="phone"
            placeholder="Số điện thoại"
            class="mt-4"
          ></CommonTextField>
          <CommonTextField
            name="email"
            class="mt-4"
            placeholder="Email"
          ></CommonTextField>
          <CommonTextField
            name="password"
            placeholder="Mật khẩu"
            class="mt-4"
            :type="visible ? 'text' : 'password'"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append-inner="visible = !visible"
          ></CommonTextField>
          <CommonDropdown
            name="sector"
            item-label="title"
            placeholder="Lĩnh vực"
            :items="listSector"
            class="mt-4"
          ></CommonDropdown>
          <CommonDropdown
            name="role"
            item-label="title"
            placeholder="Chức vụ"
            :items="listRoleOrganization"
            class="mt-4"
          ></CommonDropdown>
        </div>
        <div v-else>
          <CommonTextField
            name="firstName"
            :default-value="userInfo?.firstName"
            placeholder="Họ"
          ></CommonTextField>
          <CommonTextField
            name="lastName"
            placeholder="Tên"
            :default-value="userInfo?.lastName"
            class="mt-4"
          ></CommonTextField>
          <CommonTextField
            name="phone"
            placeholder="Số điện thoại"
            :default-value="userInfo?.phone"
            class="mt-4"
          ></CommonTextField>
          <CommonTextField
            name="email"
            class="mt-4"
            :default-value="userInfo?.email"
            placeholder="Email"
          ></CommonTextField>
          <CommonDropdown
            name="sector"
            item-label="title"
            placeholder="Lĩnh vực"
            :default-value="getSectorOfUser(userInfo?.sector ?? '')"
            :items="listSector"
            class="mt-4"
          ></CommonDropdown>
          <CommonDropdown
            name="role"
            item-label="title"
            placeholder="Chức vụ"
            :default-value="getRoleOfUser(userInfo?.role ?? '')"
            :items="listRoleOrganization"
            class="mt-4"
          ></CommonDropdown>
          <CommonDropdown
            name="organization"
            item-label="title"
            placeholder="Tổ chức"
            :default-value="getOrganizationOfUser(userInfo?.organization?.id)"
            :items="organizationItems"
            class="mt-4"
          ></CommonDropdown>
        </div>
      </div>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { array, object, string } from 'yup'
import { MAX_LENGTH_INPUT, ROLE, SCREEN_MODE, SECTOR } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useUserStore } from '~/stores/user/user-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
  userId: {
    type: Number,
    default: undefined,
  },
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const organizationStore = useOrganizationStore()
const { listAllOrganization } = storeToRefs(organizationStore)

const organizationItems = computed(() => getOrganizations())

const listRoleOrganization = [
  {
    title: 'CEO',
    value: ROLE.CEO,
  },
  {
    title: 'Quản lý dự án',
    value: ROLE.PROJECT_MANAGER,
  },
  {
    title: 'Trưởng nhóm',
    value: ROLE.TEAMLEAD,
  },
  {
    title: 'Nhân viên',
    value: ROLE.EMPLOYEE,
  },
  {
    title: 'Chức vụ khác',
    value: '',
  },
]

const listSector = [
  {
    title: 'DevOps',
    value: SECTOR.DEVOPS,
  },
  {
    title: 'Business Analyst',
    value: SECTOR.BA,
  },
  {
    title: 'Backend',
    value: SECTOR.BACKEND,
  },
  {
    title: 'Frontend',
    value: SECTOR.FRONTEND,
  },
  {
    title: 'Tester',
    value: SECTOR.TESTER,
  },
  {
    title: 'Lĩnh vực khác',
    value: '',
  },
]

const visible = ref(false)
const isExcel = ref(false)

onMounted(async () => {
  if (props.mode === SCREEN_MODE.EDIT) {
    if (props.userId) {
      await userStore.getUserInfo(props.userId)
    }
    await organizationStore.getAllOrganization()
  }
})

const schemaValidate = () => {
  let validate: { [key: string]: any } = {}
  if (!isExcel.value) {
    validate = {
      firstName: string().trim().required().max(MAX_LENGTH_INPUT),
      lastName: string().trim().required().max(MAX_LENGTH_INPUT),
      phone: string().trim().required().max(MAX_LENGTH_INPUT),
      email: string().trim().email().required().max(MAX_LENGTH_INPUT),
      sector: object().required(),
      role: object().required(),
      organization: object(),
    }
  } else {
    validate = {
      fileUpload: array()
        .min(1, '必須項目です')
        .test({
          name: 'fileCsvFormat',
          message: 'Định dạng tệp phải là CSV',
          test: (file) => {
            if (!file || !file[0]?.size) {
              return true // No files uploaded, validation passes
            }
            return file && file[0] && file[0].type.includes('text/csv')
          },
        })
        .test({
          name: 'fileCsvSize',
          message: replaceParams('File vượt quá 20MB', {
            '{size}': 20,
          }),
          exclusive: true,
          test: (file: any) => {
            if (!file || !file[0]?.size) {
              return true // No files uploaded, validation passes
            }
            return file[0] && file[0]?.size < 20 * 1024 * 1024
          },
        })
        .required(),
    }
  }

  if (props.mode === SCREEN_MODE.NEW) {
    validate.password = string().trim().required().max(MAX_LENGTH_INPUT)
  }

  return object().shape(validate)
}
const schema = computed(() => schemaValidate())

const onInvalid = (errors: any) => console.error(errors)

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
  let result

  if (props.mode === SCREEN_MODE.NEW) {
    if (!isExcel.value) {
      result = await userStore.createUser(
        values.firstName,
        values.lastName,
        values.phone,
        values.email,
        values.password,
        values.sector.value,
        values.role.value
      )
      if (result) {
        await userStore.getAllUser()
      }
    } else {
      result = await userStore.createListUser(values.fileUpload[0])
    }
  } else if (props.mode === SCREEN_MODE.EDIT) {
    if (props.userId) {
      result = await userStore.updateUser(
        props.userId,
        values.firstName,
        values.lastName,
        values.phone,
        values.email,
        values.password,
        values.sector.value,
        values.role.value,
        values.organization.value
      )
    }
  }
  if (result) {
    await userStore.getAllUser()
  }

  emit('close-form')
}, onInvalid)

function onCancel() {
  emit('close-form')
}

function handleUploadExcel() {
  isExcel.value = !isExcel.value
}

const PATH_DOWNLOAD_CSV =
  'http://localhost:3005/uploads/templates/list-user.csv'
function handleDownloadTemplateCsv() {
  window.open(PATH_DOWNLOAD_CSV, '_blank')
}

function getSectorOfUser(sector: string) {
  if (!sector) {
    return null
  }
  return listSector.find((item) => item.value === sector)
}

function getRoleOfUser(role: string) {
  if (!role) {
    return null
  }
  return listRoleOrganization.find((item) => item.value === role)
}

function getOrganizationOfUser(organizationId?: number) {
  if (!organizationId) {
    return null
  }
  return organizationItems.value?.find((item) => item.value === organizationId)
}

function getOrganizations() {
  return (
    listAllOrganization.value?.map((item) => ({
      title: item.organizationName,
      value: item.id,
    })) ?? []
  )
}
</script>
<style lang="scss" scoped>
@use 'sass:map';

.custom-link {
  cursor: pointer;
  color: blue;
}
</style>
