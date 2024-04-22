<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="props.mode === SCREEN_MODE.EDIT ? 'Edit' : 'Create'"
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Edit' : 'Create'"
    negative-title="Cancel"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <p class="mb-2">Tên công việc</p>
      <CommonTextField name="taskName" autofocus />

      <p class="mt-4 mb-2">Người thực hiện</p>
      <CommonDropdown
        name="userImplement"
        item-label="title"
        placeholder="Người thực hiện"
        :items="listUserInOrganization ?? []"
      ></CommonDropdown>

      <CommonCheckbox name="prioritize" label="Ưu tiên" class="mt-1" />

      <p class="mb-2">Ngày bắt đầu</p>
      <CommonDatePicker
        class="target-day"
        name="startDate"
        placeholder="YYYY/MM/DD"
        :disabled-date="disableDate"
        :default-value="startDate ?? null"
        @change="handleChangeStartDate"
      ></CommonDatePicker>

      <p class="mt-4 mb-2">Ngày kết thúc</p>
      <CommonDatePicker
        class="target-day"
        name="endDate"
        placeholder="YYYY/MM/DD"
        :disabled-date="disableDate"
        :default-value="endDate ?? null"
        @change="handleChangeEndDate"
      ></CommonDatePicker>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { MAX_LENGTH_INPUT, SCREEN_MODE } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useTaskStore } from '~/stores/task/task-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const startDate = ref()
const endDate = ref()

const taskStore = useTaskStore()

const organizationStore = useOrganizationStore()
const { listUser } = storeToRefs(organizationStore)

const listUserInOrganization = computed(() => getUsers())

const getUsers = () => {
  return listUser.value?.map((item) => ({
    title: `${item.firstName} ${item.lastName}`,
    value: item.id,
  }))
}

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    taskName: string().trim().required().max(MAX_LENGTH_INPUT),
    userImplement: object().required(),
    prioritize: boolean().required(),
    startDate: string().trim().required(),
    endDate: string().trim().required(),
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

const onSubmit = handleSubmit(async (values) => {
  const result = await taskStore.createTask(
    values.userImplement.value,
    projectId.value,
    values.taskName,
    values.prioritize,
    dayjs(values.startDate).format('YYYY/MM/DD'),
    dayjs(values.endDate).format('YYYY/MM/DD')
  )
  if (result) {
    await taskStore.getAllTaskInProject(projectId.value)
  }
  emit('close-form')
})

function disableDate(time: Date): boolean {
  const fromDate = dayjs().format('YYYY/MM/DD')
  const targetDate = dayjs(time).format('YYYY/MM/DD')
  return targetDate < fromDate
}

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
