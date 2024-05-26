<template>
  <div>
    <div class="d-flex align-center mt-4 custom-day-name">
      <p class="font-semibold">{{ getDayOfWeek(props.day) }}</p>
      <p>{{ `, Ngày: ${dayjs(props.day).format('DD/MM/YYYY')}` }}</p>
    </div>
    <CommonMeeting
      v-for="item in listMeetingsGroup"
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
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  items: {
    type: Object as PropType<any>,
    required: true,
    default: undefined,
  },
})

const listMeetingsGroup = ref()
onMounted(() => {
  listMeetingsGroup.value = props.items
})

watch(
  () => props.items,
  () => {
    listMeetingsGroup.value = props.items
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
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-day-name {
  background-color: bisque;
  padding: 8px;
  border-radius: 10px;
}
</style>
