<template>
  <div class="custom-meeting">
    <div v-if="props.title" class="d-flex align-center justify-between">
      <p>
        <span class="font-semibold"> Tiêu đề: </span>
        <span> {{ props.title }}</span>
      </p>
      <div
        v-if="
          props.author === `${userInfo?.firstName} ${userInfo?.lastName}` ||
          authenticationStore.role === ROLE.PROJECT_MANAGER
        "
        class="text-end"
      >
        <v-icon
          icon="mdi-pencil"
          class="mr-2 cursor-pointer"
          @click="handleEditMeeting"
        ></v-icon>
        <v-icon
          icon="mdi-delete"
          class="mr-1 cursor-pointer"
          @click="handleDeleteMeeting"
        ></v-icon>
      </div>
    </div>
    <div v-if="props.description" class="d-flex align-center justify-between">
      <div>
        <p class="font-semibold mt-3">Nội dung cuộc họp:</p>
        <p>
          {{ props.description }}
        </p>
      </div>
      <div v-if="props.type === TYPE_MEETING.SELF" class="text-end">
        <v-icon
          icon="mdi-pencil"
          class="mr-2 cursor-pointer"
          @click="handleEditMeeting"
        ></v-icon>
        <v-icon
          icon="mdi-delete"
          class="mr-1 cursor-pointer"
          @click="handleDeleteMeeting"
        ></v-icon>
      </div>
    </div>
    <p v-if="props.author && props.type === TYPE_MEETING.PROJECT" class="mt-3">
      <span class="font-semibold"> Chủ trì cuộc họp: </span>
      <span> {{ props.author }}</span>
    </p>
    <p v-if="props.startTime" class="mt-3">
      <span class="font-semibold"> Thời gian bắt đầu: </span>
      <span> {{ dayjs(props.startTime).format('DD/MM/YYYY HH:mm') }} </span>
    </p>
    <p v-if="props.endTime" class="mt-3">
      <span class="font-semibold"> Thời gian kết thúc: </span>
      <span> {{ dayjs(props.endTime).format('DD/MM/YYYY HH:mm') }} </span>
    </p>
    <p v-if="props.location" class="mt-3">
      <span class="font-semibold"> Địa điểm: </span>
      <span> {{ props.location }}</span>
    </p>
    <p
      v-if="props.listUserJoin && props.type === TYPE_MEETING.PROJECT"
      class="mt-3"
    >
      <span class="font-semibold"> Thành viên tham gia: </span>
      <span> {{ getUserJoinMeeting() }} </span>
    </p>
    <CommonConfirmPopup
      :is-show-popup="isOpenConfirmDelete"
      title="Bạn có chắc chắn muốn xóa cuộc họp này không?"
      positive-title="Đồng ý"
      negative-title="Huỷ"
      :positive-action="handleDelete"
      :negative-action="handleCancelDelete"
    >
    </CommonConfirmPopup>
    <MeetingForm
      v-if="isOpenFormEdit"
      :mode="SCREEN_MODE.EDIT"
      :meeting-id="props.meetingId"
      @close-form="handleEditMeeting"
    />
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { ROLE, SCREEN_MODE, TYPE_MEETING } from '~/constants'
import type { User } from '~/models/class/common/user'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useMeetingStore } from '~/stores/meeting/meeting-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useUserStore } from '~/stores/user/user-store'

const props = defineProps({
  meetingId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  listUserJoin: {
    type: Array as PropType<User[]>,
    required: true,
  },
  type: {
    type: String,
    default: TYPE_MEETING.PROJECT,
  },
})

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const meetingStore = useMeetingStore()
const projectStore = useProjectStore()
const authenticationStore = useAuthorizationStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const isOpenFormEdit = ref(false)
const isOpenConfirmDelete = ref(false)

function handleEditMeeting() {
  isOpenFormEdit.value = !isOpenFormEdit.value
}

function handleDeleteMeeting() {
  isOpenConfirmDelete.value = !isOpenConfirmDelete.value
}

async function handleDelete() {
  await meetingStore.deleteMeeting(props.meetingId)
  await projectStore.getAllMeetingInProject(projectId.value)
  isOpenConfirmDelete.value = false
}

function handleCancelDelete() {
  isOpenConfirmDelete.value = false
}

function getUserJoinMeeting() {
  const listUser = props.listUserJoin.map(
    (item) => `${item.firstName} ${item.lastName}`
  )
  return listUser.join(', ')
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-meeting {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
}
</style>
