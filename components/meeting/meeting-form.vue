<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="props.mode === SCREEN_MODE.EDIT ? 'Sửa cuộc họp' : 'Thêm cuộc họp'"
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Cập nhật' : 'Tạo'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <div v-if="props.mode === SCREEN_MODE.NEW">
        <div v-if="props.type === TYPE_MEETING.PROJECT">
          <p class="mb-2">Tiêu đề cuộc họp</p>
          <CommonTextField
            name="title"
            placeholder="Tiêu đề cuộc họp"
            autofocus
          />
        </div>

        <p class="mt-3 mb-2">Nội dung cuộc họp</p>
        <CommonTextarea name="description" class="custom-textarea-padding" />

        <p class="mt-3 mb-2">Địa điểm</p>
        <CommonTextField name="location" placeholder="Địa điểm" autofocus />

        <p class="mt-3 mb-2">Thời gian bắt đầu</p>
        <CommonDatetimePicker
          class="target-day"
          name="startTime"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="startTime ?? new Date()"
          @change="handleChangeStartDate"
        ></CommonDatetimePicker>

        <p class="mt-3 mb-2">Thời gian kết thúc</p>
        <CommonDatetimePicker
          class="target-day"
          name="endTime"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="endTime ?? new Date()"
          @change="handleChangeEndDate"
        ></CommonDatetimePicker>

        <p class="mt-3 mb-2">Người tham gia</p>
        <CommonDropdownMultiple
          name="listUserJoin"
          placeholder="Người tham gia"
          :list-value="listUserItems ?? []"
          item-label="title"
          @change="handleListUserJoin"
        />
      </div>
      <div v-if="props.mode === SCREEN_MODE.EDIT">
        <p class="mb-2">Tiêu đề cuộc họp</p>
        <CommonTextField
          name="title"
          :default-value="meetingInfo?.title"
          placeholder="Tiêu đề cuộc họp"
          autofocus
        />

        <p class="mt-3 mb-2">Nội dung cuộc họp</p>
        <CommonTextarea
          name="description"
          :default-value="meetingInfo?.description"
          class="custom-textarea-padding"
        />

        <p class="mt-3 mb-2">Địa điểm</p>
        <CommonTextField
          name="location"
          :default-value="meetingInfo?.location"
          placeholder="Địa điểm"
          autofocus
        />

        <p class="mt-3 mb-2">Thời gian bắt đầu</p>
        <CommonDatetimePicker
          class="target-day"
          name="startTime"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="new Date(meetingInfo?.startTime ?? '')"
          @change="handleChangeStartDate"
        ></CommonDatetimePicker>

        <p class="mt-3 mb-2">Thời gian kết thúc</p>
        <CommonDatetimePicker
          class="target-day"
          name="endTime"
          placeholder="YYYY/MM/DD"
          :disabled-date="disableDate"
          :default-value="new Date(meetingInfo?.endTime ?? '')"
          @change="handleChangeEndDate"
        ></CommonDatetimePicker>

        <p class="mt-3 mb-2">Người tham gia</p>
        <CommonDropdownMultiple
          name="listUserJoin"
          placeholder="Người tham gia"
          :default-value="getUsersOfMeeting(meetingInfo?.users)"
          :list-value="listUserItems ?? []"
          item-label="title"
          @change="handleListUserJoin"
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
import { array, object, string } from 'yup'
import { MAX_LENGTH_INPUT, ROLE, SCREEN_MODE, TYPE_MEETING } from '~/constants'
import type { User } from '~/models/class/common/user'
import type { DataType } from '~/models/interface/common/data-type'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useMeetingStore } from '~/stores/meeting/meeting-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useUserStore } from '~/stores/user/user-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
  meetingId: {
    type: Number,
    default: undefined,
  },
  type: {
    type: String,
    required: false,
    default: TYPE_MEETING.PROJECT,
  },
})

const meetingStore = useMeetingStore()
const { meetingInfo } = storeToRefs(meetingStore)

const projectStore = useProjectStore()

const authenticationStore = useAuthorizationStore()
const { organizationId, userId } = storeToRefs(authenticationStore)

const organizationStore = useOrganizationStore()
const { listUserInOrganization } = storeToRefs(organizationStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const startTime = ref()
const endTime = ref()

interface UserItem {
  title: string
  value: number
}

const listUserItems = ref<UserItem[]>()
const listUserChoose = ref()

onMounted(async () => {
  if (props.mode === SCREEN_MODE.EDIT) {
    if (props.meetingId) {
      await meetingStore.getMeetingInfo(props.meetingId)
    }
  }
  await organizationStore.getAllUserInOrganization(organizationId.value)
  if (authenticationStore.role === ROLE.PROJECT_MANAGER) {
    listUserItems.value = filterUserByGroup()
  } else if (authenticationStore.role === ROLE.TEAMLEAD) {
    listUserItems.value = filterUserByGroup(userInfo.value?.sector ?? '')
  }
})

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    description: string().trim().required().max(MAX_LENGTH_INPUT),

    startTime: string().trim().required(),
    endTime: string().trim().required(),
  }
  if (props.type === TYPE_MEETING.PROJECT) {
    validate.title = string().trim().required().max(MAX_LENGTH_INPUT)
    validate.listUserJoin = array()
      .required()
      .of(object().shape({ title: string(), value: string() }))
    validate.location = string().trim().required().max(MAX_LENGTH_INPUT)
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
    const listUserJoin = listUserChoose.value
    let result
    if (props.mode === SCREEN_MODE.NEW) {
      result = await meetingStore.createMeeting(
        projectId.value,
        userId.value,
        values.title,
        values.description,
        values.location,
        dayjs(values.startTime).format('YYYY/MM/DD HH:mm'),
        dayjs(values.endTime).format('YYYY/MM/DD HH:mm'),
        listUserJoin,
        props.type
      )
    } else if (props.mode === SCREEN_MODE.EDIT) {
      if (props.meetingId) {
        result = await meetingStore.editMeeting(
          props.meetingId,
          userId.value,
          values.title,
          values.description,
          values.location,
          dayjs(values.startTime).format('YYYY/MM/DD HH:mm'),
          dayjs(values.endTime).format('YYYY/MM/DD HH:mm'),
          listUserJoin
        )
      }
    }
    if (result) {
      await projectStore.getAllMeetingInProject(projectId.value)
    }
    emit('close-form')
  },
  (err) => {
    console.log(err)
  }
)

function disableDate(time: Date) {
  const fromDate = dayjs().format('YYYY/MM/DD')
  const targetDate = dayjs(time).format('YYYY/MM/DD')
  return targetDate < fromDate
}

function handleChangeStartDate(value: Date) {
  startTime.value = value
  if (
    dayjs(startTime.value).format('YYYY/MM/DD') >
      dayjs(endTime.value).format('YYYY/MM/DD') &&
    startTime.value
  ) {
    endTime.value = startTime.value
  }
}

function handleChangeEndDate(value: Date) {
  endTime.value = value
  if (
    dayjs(startTime.value).format('YYYY/MM/DD') >
      dayjs(endTime.value).format('YYYY/MM/DD') &&
    endTime.value &&
    startTime.value
  ) {
    startTime.value = endTime.value
  }
}

function handleListUserJoin(value: DataType[]) {
  const listUser = value.map((item) => {
    return Number(item.value)
  })

  listUserChoose.value = _.cloneDeep(listUser ?? [])
}

function filterUserByGroup(sector?: string) {
  const listUserFilter =
    listUserInOrganization.value?.filter((item) => item.sector === sector) ?? []

  const listUserValid: UserItem[] = []
  if (!listUserFilter.length) {
    listUserInOrganization.value?.forEach((item) => {
      if (item.id !== userInfo.value?.id) {
        listUserValid.push({
          title: `${item.firstName} ${item.lastName} (${item.sector})`,
          value: item.id,
        })
      }
    })
    return listUserValid
  }
  listUserFilter?.forEach((item) => {
    if (item.id !== userInfo.value?.id) {
      listUserValid.push({
        title: `${item.firstName} ${item.lastName}`,
        value: item.id,
      })
    }
  })

  return listUserValid
}

function getUsersOfMeeting(listUser?: User[]) {
  if (!listUser?.length) {
    return []
  }

  const userMap = new Map<number, User>() // Create a Map for efficient user lookup by ID
  listUser.forEach((user) => userMap.set(user.id, user))

  return listUserItems.value?.filter((item) => userMap.has(item.value))
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
