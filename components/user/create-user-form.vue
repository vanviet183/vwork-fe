<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="props.mode === SCREEN_MODE.EDIT ? 'Edit' : 'Create'"
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Edit' : 'Create'"
    negative-title="Cancel"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <div class="text-end">
      <CommonFlatButton
        background-color="#28526e"
        color="white"
        class="btn-login"
        @click="handleUploadExcel"
        >Excel</CommonFlatButton
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
        <p class="custom-link">Mẫu danh sách</p>
      </div>
      <div v-show="!isExcel">
        <CommonTextField
          name="firstName"
          placeholder="Họ"
          prepend-inner-icon="mdi-email-outline"
        ></CommonTextField>
        <CommonTextField
          name="lastName"
          placeholder="Tên"
          class="mt-4"
          prepend-inner-icon="mdi-email-outline"
        ></CommonTextField>
        <CommonTextField
          name="email"
          class="mt-4"
          placeholder="Email của bạn"
          prepend-inner-icon="mdi-email-outline"
        ></CommonTextField>
        <CommonTextField
          name="password"
          placeholder="Mật khẩu"
          class="mt-4"
          :type="visible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
          @click:append-inner="visible = !visible"
        ></CommonTextField>
        <CommonTextField
          name="role"
          placeholder="Chức vụ"
          class="mt-4"
        ></CommonTextField>
      </div>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { array, object, string } from 'yup'
import { MAX_LENGTH_INPUT, SCREEN_MODE } from '~/constants'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const visible = ref(false)
const isExcel = ref(false)

const schemaValidate = () => {
  let validate: { [key: string]: any } = {}
  if (!isExcel.value) {
    validate = {
      firstName: string().trim().required().max(MAX_LENGTH_INPUT),
      lastName: string().trim().required().max(MAX_LENGTH_INPUT),
      email: string().trim().email().required().max(MAX_LENGTH_INPUT),
      password: string().trim().required().max(MAX_LENGTH_INPUT),
    }
  } else {
    validate = {
      fileUpload: array()
        .min(1, '必須項目です')
        .test({
          name: 'fileCsvFormat',
          message: 'ファイル形式はCSVである必要があります',
          test: (file) => {
            if (!file || !file[0]?.size) {
              return true // No files uploaded, validation passes
            }
            return file && file[0] && file[0].type.includes('text/csv')
          },
        })
        .test({
          name: 'fileCsvSize',
          message: replaceParams('ERR_MESSAGE.ERR_OVER_MAX_CSV_FILE_SIZE', {
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

const onSubmit = handleSubmit((values) => {
  console.log('values', values)
}, onInvalid)

function onCancel() {
  emit('close-form')
}

function handleUploadExcel() {
  isExcel.value = !isExcel.value
}
</script>
<style lang="scss" scoped>
@use 'sass:map';

.custom-link {
  cursor: pointer;
  color: blue;
}
</style>
