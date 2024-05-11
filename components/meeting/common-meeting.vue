<template>
  <div class="custom-meeting">
    <div class="d-flex align-center justify-between">
      <p>
        <span class="font-semibold"> Tiêu đề: </span>
        <span> {{ props.title }}</span>
      </p>
      <div>
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
    <p class="font-semibold mt-3">Nội dung cuộc họp:</p>
    <p>
      {{ props.description }}
    </p>
    <p class="mt-3">
      <span class="font-semibold"> Chủ trì cuộc họp: </span>
      <span> Nguyễn Văn Việt </span>
    </p>
    <p class="mt-3">
      <span class="font-semibold"> Ngày diễn ra: </span>
      <span> {{ props.startTime.slice(0, 10) }} </span>
    </p>
    <p class="mt-3">
      <span class="font-semibold"> Thời gian bắt đầu: </span>
      <span> {{ props.startTime }} </span>
    </p>
    <p class="mt-3">
      <span class="font-semibold"> Thời gian kết thúc: </span>
      <span> {{ props.endTime }} </span>
    </p>
    <p class="mt-3">
      <span class="font-semibold"> Địa điểm: </span>
      <span> {{ props.location }}</span>
    </p>
    <p class="mt-3">
      <span class="font-semibold"> Thành viên tham gia: </span>
      <span> {{ getUserJoinMeeting() }} </span>
    </p>
  </div>
</template>
<script setup lang="ts">
import type { User } from '~/models/class/common/user'

const props = defineProps({
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
})

function handleEditMeeting() {}
function handleDeleteMeeting() {}

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
