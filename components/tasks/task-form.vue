<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT ? 'Sửa công việc' : 'Thêm công việc'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Cập nhật' : 'Tạo'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <div v-if="props.mode === SCREEN_MODE.EDIT">
        <p class="mb-2">Nội dung công việc <span class="required">*</span></p>
        <CommonTextField
          name="taskName"
          :default-value="taskInfo?.taskName"
          placeholder="Nội dung công việc"
          autofocus
        />

        <p class="mt-3 mb-2">Giai đoạn <span class="required">*</span></p>
        <CommonDropdown
          name="phase"
          item-label="title"
          :default-value="getPhaseOfTask(taskInfo?.phase)"
          placeholder="Giai đoạn"
          :items="listTaskPhase ?? []"
        ></CommonDropdown>

        <div v-if="authenticationStore.role === ROLE.PROJECT_MANAGER">
          <p class="mt-3 mb-2">
            Người phụ trách <span class="required">*</span>
          </p>
          <CommonDropdownMultiple
            name="userResponsible"
            item-label="title"
            placeholder="Người phụ trách"
            :list-value="listUserItems ?? []"
            :default-value="getUsersOfTask(taskInfo?.users)"
            @change="handleUserTeamleadResponsible"
          ></CommonDropdownMultiple>
        </div>

        <div v-if="authenticationStore.role === ROLE.TEAMLEAD">
          <p class="mt-3 mb-2">
            Người thực hiện <span class="required">*</span>
          </p>
          <CommonDropdownMultiple
            name="listUserImplement"
            placeholder="Người thực hiện"
            :default-value="getUsersOfTask(taskInfo?.users)"
            :list-value="listUserItems ?? []"
            item-label="title"
            @change="handleListUserImplement"
          />
        </div>

        <p class="mt-3 mb-2">Độ ưu tiên <span class="required">*</span></p>
        <CommonDropdown
          name="prioritize"
          item-label="title"
          placeholder="Ưu tiên"
          :default-value="getPrioritize(taskInfo?.prioritize)"
          :items="listPrioritize"
        ></CommonDropdown>

        <p class="mt-3 mb-2">Ngày bắt đầu <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="startDate"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="new Date(taskInfo?.startDate ?? '')"
          @change="handleChangeStartDate"
        ></CommonDatePicker>

        <p class="mt-3 mb-2">Ngày kết thúc <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="endDate"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="new Date(taskInfo?.endDate ?? '')"
          @change="handleChangeEndDate"
        ></CommonDatePicker>
      </div>

      <div v-else-if="props.mode === SCREEN_MODE.NEW">
        <p class="mb-2">Nội dung công việc <span class="required">*</span></p>
        <CommonTextField
          name="taskName"
          placeholder="Nội dung công việc"
          autofocus
        />

        <p class="mt-3 mb-2">Giai đoạn <span class="required">*</span></p>
        <CommonDropdown
          name="phase"
          item-label="title"
          placeholder="Giai đoạn"
          :items="listTaskPhase ?? []"
        ></CommonDropdown>

        <div v-if="authenticationStore.role === ROLE.PROJECT_MANAGER">
          <p class="mt-3 mb-2">
            Người phụ trách <span class="required">*</span>
          </p>
          <CommonDropdownMultiple
            name="userResponsible"
            item-label="title"
            placeholder="Người phụ trách"
            :list-value="listUserItems ?? []"
            @change="handleUserTeamleadResponsible"
          ></CommonDropdownMultiple>
        </div>

        <div v-if="authenticationStore.role === ROLE.TEAMLEAD">
          <p class="mt-3 mb-2">
            Người thực hiện <span class="required">*</span>
          </p>
          <CommonDropdownMultiple
            name="listUserImplement"
            placeholder="Người thực hiện"
            :list-value="listUserItems ?? []"
            item-label="title"
            @change="handleListUserImplement"
          />
        </div>

        <p class="mt-3 mb-2">Độ ưu tiên <span class="required">*</span></p>
        <CommonDropdown
          name="prioritize"
          item-label="title"
          placeholder="Ưu tiên"
          :items="listPrioritize"
        ></CommonDropdown>

        <p class="mt-3 mb-2">Ngày bắt đầu <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="startDate"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="startDate ?? new Date()"
          @change="handleChangeStartDate"
        ></CommonDatePicker>

        <p class="mt-3 mb-2">Ngày kết thúc <span class="required">*</span></p>
        <CommonDatePicker
          class="target-day"
          name="endDate"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="endDate ?? new Date()"
          @change="handleChangeEndDate"
        ></CommonDatePicker>
      </div>
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import _ from 'lodash'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { array, number, object, string } from 'yup'
import {
  MAX_LENGTH_INPUT,
  ROLE,
  SCREEN_MODE,
  SECTOR,
  TASK_PHASE,
  TASK_PRIORITIZE,
} from '~/constants'
import type { User } from '~/models/class/common/user'
import type { DataType } from '~/models/interface/common/data-type'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useTaskStore } from '~/stores/task/task-store'
import { useUserStore } from '~/stores/user/user-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
  taskId: {
    type: Number,
    default: undefined,
  },
})

const taskStore = useTaskStore()
const { taskInfo } = storeToRefs(taskStore)

const projectStore = useProjectStore()
const { projectInfo } = storeToRefs(projectStore)

const authenticationStore = useAuthorizationStore()
const { organizationId } = storeToRefs(authenticationStore)

const organizationStore = useOrganizationStore()
const { listUserInOrganization } = storeToRefs(organizationStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const startDate = ref()
const endDate = ref()

const listGroupSector = [
  {
    title: 'Nhóm DevOps',
    value: SECTOR.DEVOPS,
  },
  {
    title: 'Nhóm Business Analyst',
    value: SECTOR.BA,
  },
  {
    title: 'Nhóm Backend',
    value: SECTOR.BACKEND,
  },
  {
    title: 'Nhóm Frontend',
    value: SECTOR.FRONTEND,
  },
  {
    title: 'Nhóm Tester',
    value: SECTOR.TESTER,
  },
]

const listTaskPhase = [
  {
    title: 'Lên kế hoạch',
    value: TASK_PHASE.PLAN,
  },
  {
    title: 'Thiết kế',
    value: TASK_PHASE.DESIGN,
  },
  {
    title: 'Phát triển',
    value: TASK_PHASE.CODE,
  },
  {
    title: 'Kiểm thử',
    value: TASK_PHASE.TEST,
  },
  {
    title: 'Triển khai',
    value: TASK_PHASE.DEPLOYMENT,
  },
  {
    title: 'Bảo trì',
    value: TASK_PHASE.MAINTAIN,
  },
]

const listPrioritize = [
  {
    title: 'Cao',
    value: TASK_PRIORITIZE.HIGH,
  },
  {
    title: 'Trung bình',
    value: TASK_PRIORITIZE.MIDDLE,
  },
  {
    title: 'Thấp',
    value: TASK_PRIORITIZE.LOW,
  },
  {
    title: 'Không ưu tiên',
    value: TASK_PRIORITIZE.NONE,
  },
]

interface UserItem {
  title: string
  value: number
}

const listUserItems = ref<UserItem[]>()
const listUserChoose = ref()

onMounted(async () => {
  if (props.mode === SCREEN_MODE.EDIT) {
    if (props.taskId) {
      await taskStore.getTaskInfo(props.taskId)
    }
  }
  await organizationStore.getAllUserInOrganization(organizationId.value)
  if (authenticationStore.role === ROLE.PROJECT_MANAGER) {
    listUserItems.value = filterTeamleadGroup()
  } else if (authenticationStore.role === ROLE.TEAMLEAD) {
    listUserItems.value = filterUserByGroup(userInfo.value?.sector ?? '')
  }
  if (projectId.value) {
    await projectStore.getProjectInfo(projectId.value)
  }
})

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    taskName: string().trim().required().max(MAX_LENGTH_INPUT),
    phase: object().required(),
    listUserImplement: array().of(
      object().shape({ title: string(), value: number() })
    ),
    prioritize: object().required(),
    startDate: string().trim().required(),
    endDate: string().trim().required(),
  }
  if (authenticationStore.role === ROLE.PROJECT_MANAGER) {
    validate.userResponsible = array().of(
      object().shape({ title: string(), value: number() })
    )
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
    const listUserImplement = listUserChoose.value
    const userResponsible =
      authenticationStore.role === ROLE.PROJECT_MANAGER
        ? values.userResponsible?.map((item: any) => item.title).join(', ')
        : `${userInfo.value?.firstName} ${userInfo.value?.lastName}`

    let result
    if (props.mode === SCREEN_MODE.NEW) {
      result = await taskStore.createTask(
        projectId.value,
        values.taskName,
        values.phase.value,
        userResponsible,
        listUserImplement,
        values.prioritize.value,
        dayjs(values.startDate).format('YYYY/MM/DD'),
        dayjs(values.endDate).format('YYYY/MM/DD')
      )
    } else if (props.mode === SCREEN_MODE.EDIT) {
      if (props.taskId) {
        result = await taskStore.editTask(
          props.taskId,
          values.taskName,
          values.phase.value,
          userResponsible,
          listUserImplement,
          values.prioritize.value,
          dayjs(values.startDate).format('YYYY/MM/DD'),
          dayjs(values.endDate).format('YYYY/MM/DD')
        )
      }
    }
    if (result) {
      if (projectId.value) {
        await projectStore.getAllTaskInProject(projectId.value)
      } else if (props.taskId) {
        await taskStore.getTaskInfo(props.taskId)
      }
      emit('close-form')
    }
  },
  (err) => {
    console.log(err)
  }
)

function disableDate(time: Date) {
  const fromDate = dayjs(projectInfo.value?.startDate).format('YYYY/MM/DD')
  const endDate = dayjs(projectInfo.value?.endDate).format('YYYY/MM/DD')
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

function handleListUserImplement(value: DataType[]) {
  const listUser = value.map((item) => {
    return Number(item.value)
  })

  listUserChoose.value = _.cloneDeep(listUser ?? [])
}

function handleUserTeamleadResponsible(value: DataType[]) {
  const listUser = value.map((item) => {
    return Number(item.value)
  })

  listUserChoose.value = _.cloneDeep(listUser ?? [])
}

function filterUserByGroup(sector: string) {
  const listUserFilter =
    listUserInOrganization.value?.filter((item) => item.sector === sector) ?? []

  if (!listUserFilter.length) {
    return (
      listUserInOrganization.value?.map((item) => ({
        title: `${item.firstName} ${item.lastName}`,
        value: item.id,
      })) ?? []
    )
  }
  return (
    listUserFilter?.map((item) => ({
      title: `${item.firstName} ${item.lastName}`,
      value: item.id,
    })) ?? []
  )
}

function filterTeamleadGroup() {
  const listUserFilter = listUserInOrganization.value?.filter(
    (user) => user.role === ROLE.TEAMLEAD
  )

  return (
    listUserFilter?.map((item) => ({
      title: `${item.firstName} ${item.lastName} (${item.sector})`,
      value: item.id,
    })) ?? []
  )
}

function getPhaseOfTask(phase?: string) {
  if (!phase) {
    return null
  }
  return listTaskPhase.find((item) => item.value === phase)
}

function getUsersOfTask(listUser?: User[]) {
  if (!listUser?.length) {
    return []
  }

  const userMap = new Map<number, User>() // Create a Map for efficient user lookup by ID
  listUser.forEach((user) => userMap.set(user.id, user))

  return listUserItems.value?.filter((item) => userMap.has(item.value))
}

function getPrioritize(prioritize?: string) {
  if (!prioritize) {
    return null
  }
  return listPrioritize.find((item) => item.value === prioritize)
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
