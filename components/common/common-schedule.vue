<template>
  <div>
    <ejs-schedule
      height="100vh"
      width="100%"
      :selected-date="selectedDate"
      :event-settings="eventSettings"
      :cell-click="cellClickHandler"
      :action-complete="handleCreated"
      :destroyed="handlePopupClose"
      :popup-open="onPopupOpen"
      :popup-close="handlePopupClose"
    >
      <e-views>
        <e-view option="Day"></e-view>
        <e-view option="Week"></e-view>
        <e-view option="WorkWeek"></e-view>
        <e-view option="Month"></e-view>
      </e-views>
      <e-resources>
        <e-resource
          field="userId"
          title="Người tham gia"
          name="Owners"
          :data-source="ownerDataSource"
          text-field="fullName"
          id-field="userId"
          color-field="ownerColor"
          :allow-multiple="true"
        >
        </e-resource>
      </e-resources>
    </ejs-schedule>
  </div>
</template>
<script setup lang="ts">
import { L10n } from '@syncfusion/ej2-base'
import {
  Day,
  DragAndDrop,
  ResourceDirective as EResource,
  ResourcesDirective as EResources,
  ViewDirective as EView,
  ViewsDirective as EViews,
  ScheduleComponent as EjsSchedule,
  Month,
  Resize,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-vue-schedule'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useMeetingStore } from '~/stores/meeting/meeting-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'

provide('schedule', [Day, Week, WorkWeek, Month, DragAndDrop, Resize])

const organizationStore = useOrganizationStore()
const { listUser, listMeeting } = storeToRefs(organizationStore)

const route = useRoute()
const organizationId = computed(() => Number(route.query.organizationId))

const meetingStore = useMeetingStore()

L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Lưu',
      cancelButton: 'Đóng',
      deleteButton: 'Xoá',
      newEvent: 'Thêm cuộc họp',
      editEvent: 'Sửa cuộc họp',
      moreDetails: 'Chi tiết',
      addTitle: 'Thêm nội dung',
      save: 'Lưu',
    },
  },
})

onMounted(async () => {
  await organizationStore.getAllMeetingInOrganization(organizationId.value)

  if (!listUser.value.length) {
    await organizationStore.getAllUserInOrganization(organizationId.value)
  }
})

const ownerDataSource = computed(() => getUsers())
const dataMeetings = computed(() => getMeetings())

const fieldsMeeting = {
  subject: {
    name: 'subject',
    title: 'Nội dung',
    validation: { required: true },
  },
  startTime: {
    name: 'startTime',
    title: 'Thời gian bắt đầu',
    validation: { required: true },
  },
  endTime: {
    name: 'endTime',
    title: 'Thời gian kết thúc',
    validation: { required: true },
  },
  location: {
    name: 'location',
    title: 'Địa điểm',
    validation: { required: true },
  },
  description: { name: 'description', title: 'Mô tả' },
}

const selectedDate = computed(() => getSelectedDate())
const eventSettings = computed(() => {
  return {
    enableTooltip: true,
    dataSource: dataMeetings.value ?? [],
    fields: fieldsMeeting,
  }
})

function onPopupOpen(args: any) {
  args.duration = 60
}

function getSelectedDate() {
  if (dataMeetings.value.at(0)?.startTime) {
    return new Date(dataMeetings.value[0].startTime)
  }

  return new Date()
}

function getUsers() {
  return listUser.value?.map((item, index) => ({
    fullName: item.fullName,
    userId: item.id,
    ownerColor: listColor[index],
  }))
}

function getMeetings() {
  return listMeeting.value?.flatMap((item) =>
    item.users.map((user) => ({
      id: item.id,
      subject: item.title,
      eventType: 'Requested',
      startTime: new Date(item.startTime),
      endTime: new Date(item.endTime),
      userId: user.id, // Use the actual user object here
    }))
  )
}

const listColor = ['#ffaa00', '#f8a398', '#7499e1']

function cellClickHandler(args: any) {
  console.log('hello')
}

async function handleCreated(args: any) {
  if (args.requestType === 'eventCreated') {
    // create
    console.log(args)
    const { subject, startTime, endTime, location, description } = args.data[0]

    const listUser = args.data.map((item: any) => Number(item.userId))
    await meetingStore.createMeeting(
      organizationId.value,
      subject,
      dayjs(startTime).format('DD/MM/YYYY HH:mm'),
      dayjs(endTime).format('DD/MM/YYYY HH:mm'),
      description ?? '',
      location ?? '',
      listUser
    )
  }
  if (args.requestType === 'eventChanged') {
    // edit
  }
}

function handlePopupClose(args: any) {
  if (args.type === 'Editor') {
    if (args.event) {
      if (
        (args.event.target as any).classList.contains('e-quick-dialog-delete')
      ) {
        // Handle the code if "delete" button is clicked.
        console.log('click delete')
      }
    }
  }
}

// const ownerDataSource = [
//   { fullName: 'Nancy', id: 1, ownerColor: '#ffaa00' },
//   { fullName: 'Steven', id: 2, ownerColor: '#f8a398' },
//   { fullName: 'Michael', id: 3, ownerColor: '#7499e1' },
// ]
</script>
<style>
@import '~/node_modules/@syncfusion/ej2-base/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
</style>
