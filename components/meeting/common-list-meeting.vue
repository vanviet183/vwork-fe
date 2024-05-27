<template>
  <div>
    <div
      class="d-flex align-center justify-between mt-4 custom-day-name cursor-pointer"
      @click="handleOpenListMeeting"
    >
      <div class="d-flex align-center">
        <p class="font-semibold">{{ getDayOfWeek(props.day) }}</p>
        <p>{{ `, Ngày: ${dayjs(props.day).format('DD/MM/YYYY')}` }}</p>
      </div>
      <v-icon v-if="!isOpen" icon="mdi-menu-down" class="ml-1"></v-icon>
      <v-icon v-else icon="mdi-menu-up" class="ml-1"></v-icon>
    </div>
    <div v-if="isOpen">
      <CommonMeeting
        v-for="item in props.items"
        :key="item.id"
        :meeting-id="item.id"
        :title="item.title"
        :description="item.description"
        :author="item.author"
        :location="item.location"
        :start-time="item.startTime"
        :end-time="item.endTime"
        :list-user-join="item.users"
        :type="item.type"
        class="mt-4"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import type { Meeting } from '~/models/class/common/meeting'

const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<Meeting[]>,
    required: true,
    default: undefined,
  },
})

const isOpen = ref(false)

onMounted(() => {
  if (dayjs(props.day).format('YYYY/MM/DD') >= dayjs().format('YYYY/MM/DD')) {
    isOpen.value = true
  } else {
    isOpen.value = false
  }
})

watch(
  () => props.items,
  () => {}
)

watch(
  () => props.day,
  () => {
    if (dayjs(props.day).format('YYYY/MM/DD') >= dayjs().format('YYYY/MM/DD')) {
      isOpen.value = true
    } else {
      isOpen.value = false
    }
  }
)

function getDayOfWeek(value: string) {
  const dayName = dayjs(value).format('dddd')

  switch (dayName) {
    case 'Monday':
      return 'Thứ Hai'

    case 'Tuesday':
      return 'Thứ Ba'

    case 'Wednesday':
      return 'Thứ Tư'

    case 'Thursday':
      return 'Thứ Năm'

    case 'Friday':
      return 'Thứ Sáu'

    case 'Saturday':
      return 'Thứ Bảy'

    case 'Sunday':
      return 'Chủ Nhật'

    default:
      return 'Ngày không hợp lệ'
  }
}

function handleOpenListMeeting() {
  isOpen.value = !isOpen.value
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-day-name {
  background-color: bisque;
  padding: 8px;
  border-radius: 10px;
}
</style>
