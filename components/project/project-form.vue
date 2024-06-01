<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="props.mode === SCREEN_MODE.EDIT ? 'Sửa dự án' : 'Thêm dự án'"
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Cập nhật' : 'Tạo'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <div>
      <form class="form-container">
        <div v-if="props.mode === SCREEN_MODE.NEW">
          <p class="mb-2">
            Tên dự án
            <span class="required">*</span>
          </p>
          <CommonTextField name="projectName" autofocus />

          <p class="mt-4 mb-2">
            Mô tả dự án
            <span class="required">*</span>
          </p>
          <CommonTextarea name="description" class="custom-textarea-padding" />

          <p class="mt-4 mb-2">
            Ngày bắt đầu
            <span class="required">*</span>
          </p>

          <CommonDatePicker
            class="target-day"
            name="startDate"
            placeholder="DD/MM/YYYY"
            :disabled-date="disableDate"
            :default-value="startDate"
            @change="handleChangeStartDate"
          ></CommonDatePicker>

          <p class="mt-4 mb-2">
            Ngày kết thúc
            <span class="required">*</span>
          </p>
          <CommonDatePicker
            class="target-day"
            name="endDate"
            placeholder="DD/MM/YYYY"
            :disabled-date="disableDate"
            :default-value="endDate"
            @change="handleChangeEndDate"
          ></CommonDatePicker>
        </div>
        <div v-if="props.mode === SCREEN_MODE.EDIT">
          <p class="mb-2">Tên dự án <span class="required">*</span></p>
          <CommonTextField
            name="projectName"
            :default-value="projectInfo?.projectName"
            autofocus
          />

          <p class="mt-4 mb-2">Mô tả dự án <span class="required">*</span></p>
          <CommonTextarea
            name="description"
            :default-value="projectInfo?.description"
            class="custom-textarea-padding"
          />

          <p class="mt-4 mb-2">Ngày bắt đầu <span class="required">*</span></p>

          <CommonDatePicker
            class="target-day"
            name="startDate"
            placeholder="YYYY/MM/DD"
            :disabled-date="disableDate"
            :default-value="new Date(projectInfo?.startDate ?? '')"
            @change="handleChangeStartDate"
          ></CommonDatePicker>

          <p class="mt-4 mb-2">Ngày kết thúc <span class="required">*</span></p>
          <CommonDatePicker
            class="target-day"
            name="endDate"
            placeholder="YYYY/MM/DD"
            :disabled-date="disableDate"
            :default-value="new Date(projectInfo?.endDate ?? '')"
            @change="handleChangeEndDate"
          ></CommonDatePicker>
        </div>
      </form>
    </div>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { MAX_LENGTH_INPUT, SCREEN_MODE } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  projectId: {
    type: Number,
    default: undefined,
  },
})

const startDate = ref(new Date())
const endDate = ref(new Date(dayjs().add(1, 'm').format('YYYY/MM/DD')))

const projectStore = useProjectStore()
const { projectInfo } = storeToRefs(projectStore)

const organizationStore = useOrganizationStore()

const authenticationStore = useAuthorizationStore()
const { userId, organizationId } = storeToRefs(authenticationStore)

onMounted(async () => {
  if (props.mode === SCREEN_MODE.EDIT) {
    if (props.projectId) {
      await projectStore.getProjectInfo(props.projectId)
    }
  }
})

function onCancel() {
  emit('close-form')
}

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    projectName: string().trim().required().max(MAX_LENGTH_INPUT),
    description: string().trim().required().max(MAX_LENGTH_INPUT),
    startDate: string().trim().required(),
    endDate: string().trim().required(),
  }
  return object().shape(validate)
}

const schema = ref(schemaValidate())

interface ProjectFromData {
  projectName: string
  description: string
  startDate: string
  endDate: string
}

function initialValueForm(): ProjectFromData {
  const initialValue: ProjectFromData = {
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
  }

  if (props.mode === SCREEN_MODE.EDIT) {
    initialValue.projectName = projectInfo.value?.projectName ?? ''
    initialValue.description = projectInfo.value?.description ?? ''
    initialValue.startDate = projectInfo.value?.startDate ?? ''
    initialValue.endDate = projectInfo.value?.endDate ?? ''
  }
  return initialValue
}

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: initialValueForm(),
})

const onSubmit = handleSubmit(
  async (values) => {
    let result
    if (props.mode === SCREEN_MODE.NEW) {
      result = await projectStore.createProject(
        organizationId.value,
        userId.value,
        values.projectName,
        values.description,
        dayjs(values.startDate).format('YYYY/MM/DD'),
        dayjs(values.endDate).format('YYYY/MM/DD')
      )
    } else if (props.mode === SCREEN_MODE.EDIT) {
      if (props.projectId) {
        result = await projectStore.editProject(
          props.projectId,
          values.projectName,
          values.description,
          dayjs(values.startDate).format('YYYY/MM/DD'),
          dayjs(values.endDate).format('YYYY/MM/DD')
        )
      }
    }

    if (result) {
      await organizationStore.getAllProjectsInOrganization(organizationId.value)
      emit('close-form')
    }
  },
  (error) => {
    console.log('error', error)
  }
)

function handleChangeStartDate(value: Date) {
  startDate.value = value
  if (
    dayjs(startDate.value).format('YYYY/MM/DD') >
      dayjs(endDate.value).format('YYYY/MM/DD') &&
    startDate.value
  ) {
    endDate.value = startDate.value
  }
}

function handleChangeEndDate(value: Date) {
  endDate.value = value
  if (
    dayjs(startDate.value).format('YYYY/MM/DD') >
      dayjs(endDate.value).format('YYYY/MM/DD') &&
    endDate.value &&
    startDate.value
  ) {
    startDate.value = endDate.value
  }
}

function disableDate(time: Date) {
  const fromDate = dayjs().format('YYYY/MM/DD')
  const targetDate = dayjs(time).format('YYYY/MM/DD')
  return targetDate < fromDate
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
