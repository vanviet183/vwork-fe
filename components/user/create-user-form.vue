<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT
        ? 'Sửa thông tin thành viên'
        : 'Thêm thành viên'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Sửa' : 'Thêm'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <div class="text-end">
      <CommonFlatButton
        background-color="#28526e"
        color="white"
        class="mb-4"
        @click="handleUploadExcel"
        >Thêm danh sách</CommonFlatButton
      >
    </div>
    <form>
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
          name="role"
          item-label="title"
          placeholder="Chức vụ"
          :items="listRoleOrganization"
          class="mt-4"
        ></CommonDropdown>
      </div>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { array, object, string } from 'yup'
import { MAX_LENGTH_INPUT, ROLE, SCREEN_MODE } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useUserStore } from '~/stores/user/user-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const userStore = useUserStore()

const organizationStore = useOrganizationStore()
const { listGroup } = storeToRefs(organizationStore)

const route = useRoute()
const organizationId = computed(() => Number(route.query.organizationId))

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

const visible = ref(false)
const isExcel = ref(false)

const schemaValidate = () => {
  let validate: { [key: string]: any } = {}
  if (!isExcel.value) {
    validate = {
      firstName: string().trim().required().max(MAX_LENGTH_INPUT),
      lastName: string().trim().required().max(MAX_LENGTH_INPUT),
      phone: string().trim().required().max(MAX_LENGTH_INPUT),
      email: string().trim().email().required().max(MAX_LENGTH_INPUT),
      password: string().trim().required().max(MAX_LENGTH_INPUT),
      role: object().required(),
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
  return object().shape(validate)
}
const schema = computed(() => schemaValidate())

const onInvalid = (errors: any) => console.error(errors)
const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
  if (!isExcel.value) {
    const result = await userStore.createUser(
      values.firstName,
      values.lastName,
      values.phone,
      values.email,
      values.password,
      values.role.value
    )
    if (result) {
      await userStore.getAllUser()
    }
  } else {
    const result = await userStore.createListUser(values.fileUpload[0])

    if (result) {
      await userStore.getAllUser()
    }
  }

  emit('close-form')
}, onInvalid)

function onCancel() {
  emit('close-form')
}

function handleUploadExcel() {
  isExcel.value = !isExcel.value
}

function getGroups() {
  return listGroup.value?.map((item) => ({
    title: item.groupName,
    value: item.id,
  }))
}

const PATH_DOWNLOAD_CSV =
  'http://localhost:3005/uploads/templates/list-user.csv'
function handleDownloadTemplateCsv() {
  window.open(PATH_DOWNLOAD_CSV, '_blank')
}
</script>
<style lang="scss" scoped>
@use 'sass:map';

.custom-link {
  cursor: pointer;
  color: blue;
}
</style>
