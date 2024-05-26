<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT
        ? 'Sửa yêu cầu công việc'
        : 'Thêm yêu cầu công việc'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Sửa ' : 'Thêm'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <div v-if="props.mode === SCREEN_MODE.NEW">
        <p class="mb-2">Nội dung yêu cầu công việc</p>
        <CommonTextarea name="requireContent" class="custom-textarea-padding" />

        <p class="mt-3 mb-2">Ngày bắt đầu <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="startDate"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="startDate"
          @change="handleChangeStartDate"
        ></CommonDatePicker>

        <p class="mt-3 mb-2">Ngày kết thúc <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="endDate"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="endDate"
          @change="handleChangeEndDate"
        ></CommonDatePicker>

        <p class="mt-3 mb-2">Người thực hiện <span class="required">*</span></p>
        <CommonDropdownMultiple
          name="listUserImplement"
          placeholder="Người thực hiện"
          :list-value="listUserItems ?? []"
          item-label="title"
          @change="handleSelectUserImplement"
        />

        <CommonCheckbox name="important" label="Quan trọng" class="mt-1" />
      </div>

      <div v-if="props.mode === SCREEN_MODE.EDIT">
        <p class="mb-2">
          Nội dung yêu cầu công việc <span class="required">*</span>
        </p>
        <CommonTextarea
          name="requireContent"
          :default-value="taskRequireInfo?.requireContent"
          class="custom-textarea-padding"
        />

        <p class="mt-3 mb-2">Ngày bắt đầu <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="startDate"
          placeholder="YYYY/MM/DD"
          :default-value="new Date()"
          @change="handleChangeStartDate"
        ></CommonDatePicker>

        <p class="mt-3 mb-2">Ngày kết thúc <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="endDate"
          placeholder="YYYY/MM/DD"
          :default-value="new Date()"
          @change="handleChangeEndDate"
        ></CommonDatePicker>

        <p class="mt-3 mb-2">Người thực hiện <span class="required">*</span></p>
        <CommonDropdownMultiple
          name="listUserImplement"
          placeholder="Người thực hiện"
          :list-value="listUserItems ?? []"
          :default-value="
            getUsersOfTaskRequire(taskRequireInfo?.listUserImplement)
          "
          item-label="title"
          @change="() => {}"
        />

        <CommonCheckbox
          name="important"
          :default-value="taskRequireInfo?.important"
          label="Quan trọng"
          class="mt-1"
        />
      </div>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import _ from 'lodash'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { array, boolean, number, object, string } from 'yup'
import { MAX_LENGTH_INPUT, SCREEN_MODE } from '~/constants'
import type { DataType } from '~/models/interface/common/data-type'
import { useTaskRequireStore } from '~/stores/task-require/task-require-store'
import { useTaskStore } from '~/stores/task/task-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
  taskRequireId: {
    type: Number,
    default: undefined,
  },
})

interface UserItem {
  title: string
  value: number
}

const listUserItems = ref<UserItem[]>()
const listUserChoose = ref()

const taskRequireStore = useTaskRequireStore()
const { taskRequireInfo } = storeToRefs(taskRequireStore)

const taskStore = useTaskStore()
const { taskInfo } = storeToRefs(taskStore)

const route = useRoute()
const taskId = computed(() => Number(route.query.taskId))

const startDate = ref(new Date(taskInfo.value?.startDate ?? ''))
const endDate = ref(new Date(taskInfo.value?.startDate ?? ''))

onMounted(async () => {
  if (props.mode === SCREEN_MODE.EDIT) {
    if (props.taskRequireId) {
      await taskRequireStore.getTaskRequireInfo(props.taskRequireId)
    }
  }
  listUserItems.value = getUsersImplementTask()
})

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    requireContent: string().trim().required().max(MAX_LENGTH_INPUT),
    startDate: string().trim().required(),
    endDate: string().trim().required(),
    listUserImplement: array().of(
      object().shape({ title: string(), value: number() })
    ),
    important: boolean().required(),
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
    let result
    const listUserImplement = listUserChoose.value?.join(', ')

    if (props.mode === SCREEN_MODE.NEW) {
      result = await taskRequireStore.createTaskRequire(
        taskId.value,
        values.requireContent,
        dayjs(values.startDate).format('YYYY/MM/DD'),
        dayjs(values.endDate).format('YYYY/MM/DD'),
        listUserImplement,
        values.important
      )
    } else if (props.mode === SCREEN_MODE.EDIT) {
      if (props.taskRequireId) {
        result = await taskRequireStore.editTaskRequire(
          taskId.value,
          values.requireContent,
          values.important
        )
      }
    }
    if (result) {
      await taskStore.getAllTaskRequireInTask(taskId.value)
      await taskStore.getTaskInfo(taskId.value)
    }
    emit('close-form')
  },
  (err) => {
    console.log(err)
  }
)

function disableDate(time: Date): boolean {
  const fromDate = dayjs(taskInfo.value?.startDate).format('YYYY/MM/DD')
  const endDate = dayjs(taskInfo.value?.endDate).format('YYYY/MM/DD')

  const targetDate = dayjs(time).format('YYYY/MM/DD')
  return targetDate < fromDate || targetDate > endDate
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

function getUsersImplementTask() {
  return (
    taskInfo.value?.users?.map((item) => ({
      title: `${item.firstName} ${item.lastName}`,
      value: item.id,
    })) ?? []
  )
}

function handleSelectUserImplement(value: DataType[]) {
  const listUser = value.map((item) => {
    return item.title
  })
  listUserChoose.value = _.cloneDeep(listUser ?? [])
}

function getUsersOfTaskRequire(listUser?: string) {
  if (!listUser?.length) {
    return []
  }
  const users = listUser.split(', ')
  return listUserItems.value?.filter((item) => users.includes(item.title))
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
