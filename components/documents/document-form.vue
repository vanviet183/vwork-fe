<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT
        ? 'Sửa tài liệu công việc'
        : 'Thêm tài liệu công việc'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Sửa ' : 'Thêm'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <div v-if="props.mode === SCREEN_MODE.NEW">
        <p class="mb-2">File tài liệu</p>
        <CommonUploadFile
          name="fileUpload"
          class="my-[15px]"
          filename="demo123"
          accept="*"
          :default-value="undefined"
        />
        <p class="mt-3 mb-2">Loại tài liệu</p>
        <CommonDropdown
          name="type"
          item-label="title"
          placeholder="Loại tài liệu"
          :items="listTypeDocument ?? []"
        ></CommonDropdown>

        <CommonCheckbox name="isSaved" label="Lưu trữ" class="mt-1" />
      </div>

      <div v-if="props.mode === SCREEN_MODE.EDIT">
        <p class="mb-2">File tài liệu</p>
        <CommonUploadFile
          name="fileUpload"
          class="my-[15px]"
          :filename="documentInfo?.fileName"
          :readonly="true"
          accept="*"
          :default-value="
                getFilenameDefault(documentInfo?.fileName as string) ??
                undefined
              "
        />
        <p class="mt-3 mb-2">Loại tài liệu</p>
        <CommonDropdown
          name="type"
          item-label="title"
          placeholder="Loại tài liệu"
          :default-value="getTypeDocument(documentInfo?.type)"
          :items="listTypeDocument ?? []"
        ></CommonDropdown>

        <CommonCheckbox
          name="isSaved"
          label="Lưu trữ"
          :default-value="documentInfo?.isSaved"
          class="mt-1"
        />
      </div>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { array, object } from 'yup'
import { SCREEN_MODE, TYPE_DOCUMENT } from '~/constants'
import { useDocumentStore } from '~/stores/document/document-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useTaskStore } from '~/stores/task/task-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
  documentId: {
    type: Number,
    default: undefined,
  },
})

const documentStore = useDocumentStore()
const { documentInfo } = storeToRefs(documentStore)
const taskStore = useTaskStore()
const projectStore = useProjectStore()

const route = useRoute()
const taskId = computed(() => Number(route.query.taskId))
const projectId = computed(() => Number(route.query.projectId))

onMounted(async () => {
  if (props.mode === SCREEN_MODE.EDIT) {
    if (props.documentId) {
      await documentStore.getDocumentInfo(props.documentId)
    }
  }
})

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    fileUpload: array()
      .min(1, '必須項目です')
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
    type: object().required(),
  }

  return object().shape(validate)
}

const schema = ref(schemaValidate())

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const listTypeDocument = [
  {
    title: 'Tài liệu thiết kế',
    value: TYPE_DOCUMENT.DESIGN,
  },
  {
    title: 'Tài liệu yêu cầu',
    value: TYPE_DOCUMENT.REQUIRE,
  },
  {
    title: 'Tài liệu hướng dẫn',
    value: TYPE_DOCUMENT.MANUAL,
  },
  {
    title: 'Tài liệu báo cáo',
    value: TYPE_DOCUMENT.REPORT,
  },
]

function onCancel() {
  emit('close-form')
}

const onSubmit = handleSubmit(
  async (values) => {
    let result

    if (props.mode === SCREEN_MODE.NEW) {
      result = await documentStore.createDocument(
        values.fileUpload[0],
        values.type.value,
        values.isSaved,
        projectId.value ?? undefined,
        taskId.value ?? undefined
      )
    } else if (props.mode === SCREEN_MODE.EDIT) {
      if (props.documentId) {
        result = await documentStore.updateDocument(
          props.documentId,
          values.type.value,
          values.isSaved
        )
      }
    }
    if (result) {
      if (taskId.value) {
        await taskStore.getAllDocumentInTask(taskId.value)
      }
      if (projectId.value) {
        await projectStore.getAllDocumentInProject(projectId.value)
      }
    }
    emit('close-form')
  },
  (err) => {
    console.log(err)
  }
)

function getTypeDocument(type?: string) {
  return listTypeDocument.find((item) => item.value === type)
}

function getFilenameDefault(fileName: string) {
  if (fileName) {
    return [
      {
        name: fileName,
      },
    ] as File[]
  }
  return null
}
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
