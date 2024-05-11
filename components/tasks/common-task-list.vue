<template>
  <v-data-table
    :headers="headers"
    :items="props.items"
    item-value="id"
    :hover="props.items.length > 0"
    @click:row="handleClickRow"
  >
    <template #item.users="{ item }">
      <span>{{ getUsersImplement(item.raw.users) }}</span>
    </template>

    <template #item.taskName="{ item }">
      <p class="custom-task-name">{{ item.raw.taskName }}</p>
    </template>
    <template #item.prioritize="{ item }">
      <v-icon
        v-if="item.raw.prioritize !== TASK_PRIORITIZE.NONE"
        icon="mdi-flag-variant"
        :color="getColorFlag(item.raw.prioritize)"
        class="icon-prioritize"
      ></v-icon>
    </template>
    <template #item.status="{ item }">
      <span>{{ getStatusTask(item.raw.status) }}</span>
    </template>
    <template #item.options="{ item }">
      <CommonBoxOptions>
        <div
          v-if="authenticationStore.role === ROLE.PROJECT_MANAGER"
          class="px-4 py-[6px] cursor-pointer"
          @click="handleComplete(item.raw.id)"
        >
          Đánh dấu hoàn thành
        </div>
        <div
          v-else
          class="px-4 py-[6px] cursor-pointer"
          @click="handleChangeStatusWaitTask(item.raw.id)"
        >
          Đánh dấu chờ xét duyệt
        </div>
        <div class="px-4 py-[6px] cursor-pointer" @click="() => {}">
          Sửa công việc
        </div>
        <div class="px-4 py-[6px] cursor-pointer" @click="() => {}">
          Xoá công việc
        </div>
      </CommonBoxOptions>
    </template>
    <template #item.bottom=""> </template>
  </v-data-table>
</template>
<script setup lang="ts">
import { ROLE, TASKS_DETAIL, TASK_PRIORITIZE, TASK_STATUS } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useProjectStore } from '~/stores/project/project-store'
import { useTaskStore } from '~/stores/task/task-store'

const projectStore = useProjectStore()

const taskStore = useTaskStore()
const authenticationStore = useAuthorizationStore()

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const headers = ref([
  {
    title: 'Tên công việc',
    align: 'start',
    key: 'taskName',
    width: '180px',
    sortable: false,
  },
  {
    title: 'Người thực hiện',
    align: 'start',
    key: 'users',
    width: '180px',
    sortable: false,
  },
  {
    title: 'Ngày bắt đầu',
    align: 'start',
    key: 'startDate',
    sortable: false,
  },
  {
    title: 'Ngày kết thúc',
    align: 'start',
    key: 'endDate',
    sortable: false,
  },
  {
    title: 'Ưu tiên',
    align: 'start',
    key: 'prioritize',
    sortable: false,
  },
  {
    title: 'Trạng thái',
    align: 'start',
    key: 'status',
    sortable: false,
  },
  {
    title: '',
    align: 'end',
    key: 'options',
    sortable: false,
  },
] as any[])

function handleClickRow(_item: any, row: any) {
  navigateTo({ path: TASKS_DETAIL, query: { taskId: row.item.raw.id } })
}

const handleComplete = async (id: number) => {
  const result = await taskStore.updateStatusTask(id, TASK_STATUS.COMPLETED)
  if (result) {
    await projectStore.getAllTaskInProject(projectId.value)
  }
}

async function handleChangeStatusWaitTask(id: number) {
  await taskStore.updateStatusTask(id, TASK_STATUS.WAIT_ACCEPT)
}

function getUsersImplement(listUser: any[]) {
  const data = listUser.map((item) => `${item.firstName} ${item.lastName}`)
  return data.join(', ')
}

function getStatusTask(status: string) {
  switch (status) {
    case TASK_STATUS.DOING:
      return 'Đang thực hiện'
    case TASK_STATUS.COMPLETED:
      return 'Đã hoàn thành'
    case TASK_STATUS.WAIT_ACCEPT:
      return 'Đang chờ duyệt'
    default:
      return 'Đang thực hiện'
  }
}

function getColorFlag(prioritize: string) {
  switch (prioritize) {
    case TASK_PRIORITIZE.HIGH:
      return '#a8071a'
    case TASK_PRIORITIZE.MIDDLE:
      return '#d46b08'
    case TASK_PRIORITIZE.LOW:
      return '#0050b3'
    default:
      return ''
  }
}
</script>
<style scoped lang="scss">
@use 'sass:map';

:deep(.v-field__outline) {
  --v-field-border-opacity: 0 !important;
}
:deep(.v-data-table-header__content) {
  font-weight: bold !important;
  color: black;
}
.custom-task-name {
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
