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

      <div v-if="authenticationStore.role === ROLE.PROJECT_MANAGER">
        <p class="mt-4 mb-2">Nhóm phụ trách</p>
        <CommonDropdown
          name="groupImplement"
          item-label="title"
          placeholder="Nhóm phụ trách"
          :items="listGroupInOrganization ?? []"
          @change="handleSelectGroup"
        ></CommonDropdown>
      </div>

      <div v-if="authenticationStore.role === ROLE.TEAMLEAD">
        <p class="mt-4 mb-2">Người phụ trách</p>
        <CommonDropdown
          name="userResponsible"
          item-label="title"
          placeholder="Người phụ trách"
          :items="listUserInGroup ?? []"
        ></CommonDropdown>
      </div>

      <p class="mt-4 mb-2">Người thực hiện</p>
      <CommonDropdownMultiple
        name="listUserImplement"
        placeholder="Người thực hiện"
        :list-value="listUserInGroup ?? []"
        item-label="title"
        @change="handleListUserType"
      />

      <CommonCheckbox name="prioritize" label="Ưu tiên" class="mt-1" />

      <p class="mb-2">Ngày bắt đầu</p>
      <CommonDatePicker
        class="target-day"
        name="startDate"
        placeholder="YYYY/MM/DD"
        :disabled-date="disableDate"
        :default-value="startDate ?? new Date()"
        @change="handleChangeStartDate"
      ></CommonDatePicker>

      <p class="mt-4 mb-2">Ngày kết thúc</p>
      <CommonDatePicker
        class="target-day"
        name="endDate"
        placeholder="YYYY/MM/DD"
        :disabled-date="disableDate"
        :default-value="endDate ?? new Date()"
        @change="handleChangeEndDate"
      ></CommonDatePicker>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import _ from 'lodash'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { MAX_LENGTH_INPUT, ROLE, SCREEN_MODE } from '~/constants'
import type { DataType } from '~/models/interface/common/data-type'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useGroupStore } from '~/stores/group/group-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useTaskStore } from '~/stores/task/task-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const taskStore = useTaskStore()
const projectStore = useProjectStore()
const authenticationStore = useAuthorizationStore()

const organizationStore = useOrganizationStore()
const { listGroup } = storeToRefs(organizationStore)

const groupStore = useGroupStore()
const { listUser } = storeToRefs(groupStore)

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))
const organizationId = computed(() => Number(route.query.organizationId))

const startDate = ref()
const endDate = ref()

onMounted(async () => {
  await organizationStore.getAllGroupInOrganization(organizationId.value)
})

const listGroupInOrganization = computed(() => getGroups())
const listUserInGroup = computed(() => getUsers())

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
    await projectStore.getAllTaskInProject(projectId.value)
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

const listUserChoose = ref()
function handleListUserType(value: DataType[]) {
  const listUser = value.map((item) => {
    return Number(item.value)
  })

  listUserChoose.value = _.cloneDeep(listUser ?? [])
  console.log(' listUserChoose', listUserChoose.value)
}

function getGroups() {
  return listGroup.value?.map((item) => ({
    title: item.groupName,
    value: item.id,
  }))
}

const getUsers = () => {
  return listUser.value?.map((item) => ({
    title: `${item.firstName} ${item.lastName}`,
    value: item.id,
  }))
}

async function handleSelectGroup(value: any) {
  await groupStore.getAllUserInGroup(value.value)
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
