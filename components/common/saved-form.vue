<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT
        ? 'Sửa tài liệu lưu trữ'
        : 'Thêm tài liệu lưu trũ'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Sửa' : 'Thêm'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <CommonUploadFile
        name="fileUpload"
        class="my-[15px]"
        filename="demo123"
        accept="*"
        :default-value="undefined"
      />
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { array, object } from 'yup'
import { SCREEN_MODE } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useDocumentStore } from '~/stores/document/document-store'
import { useTaskStore } from '~/stores/task/task-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const documentStore = useDocumentStore()
const taskStore = useTaskStore()
const authenticationStore = useAuthorizationStore()

const route = useRoute()
const taskId = computed(() => Number(route.query.taskId))

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    fileUpload: array()
      .min(1, '必須項目です')
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

  return object().shape(validate)
}

const schema = ref(schemaValidate())

const { handleSubmit } = useForm({
  validationSchema: schema,
})

function onCancel() {
  emit('close-form')
}

const onSubmit = handleSubmit(
  async (values) => {
    console.log('value', values)

    const result = await documentStore.createDocument(
      taskId.value,
      values.fileUpload[0]
    )
    if (result) {
      await taskStore.getAllDocumentInTask(taskId.value)
    }
    emit('close-form')
  },
  (err) => {
    console.log(err)
  }
)
</script>
<style lang="scss" scoped>
@use 'sass:map';
:deep(.v-data-table-footer) {
  display: none;
}
:deep(.v-data-table-rows-no-data) {
  display: none;
}
.text-button {
  cursor: pointer;
  color: map.get($colors, 'primary');
}

.custom-list-link {
  display: grid;
  grid-template-columns: 318px 170px auto;
}

.list-link-text {
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.4px;
  color: map.get($colors, 'dim-gray');
}

.custom-border-list {
  background: white;
  box-shadow: 0px -1px 0px 0px map.get($colors, 'light-silver') inset;
}

.custom-icon-container {
  text-align: center;
  align-self: center;
  color: map.get($colors, 'granite-gray');
}

.custom-icon {
  padding: 4px;
  font-size: 18px;
}

.form-container {
  padding-top: 20px;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
