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
    <template #item.prioritize="{ item }">
      <v-icon
        v-if="item.raw.prioritize"
        icon="mdi-flag-variant"
        class="icon-prioritize"
      ></v-icon>
    </template>
    <template #item.options="{ item }">
      <CommonBoxOptions>
        <div class="p-4 cursor-pointer" @click="handleComplete(item.columns)">
          Đánh dấu hoàn thành
        </div>
      </CommonBoxOptions>
    </template>
    <template #item.bottom=""> </template>
  </v-data-table>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { TASKS_DETAIL } from '~/constants'
import { useProjectStore } from '~/stores/project/project-store'

const projectStore = useProjectStore()
const { listTask } = storeToRefs(projectStore)

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
    width: '280px',
    sortable: false,
  },
  {
    title: 'Người thực hiện',
    align: 'start',
    key: 'users',
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
    title: '',
    align: 'end',
    key: 'options',
    sortable: false,
  },
] as any[])

function handleClickRow(_item: any, row: any) {
  navigateTo({ path: TASKS_DETAIL, query: { taskId: row.item.raw.id } })
}

const handleComplete = (el: any) => {
  console.log('el', el)

  listTask.value = listTask.value?.filter((item) => el.id !== item.id)
}

function getUsersImplement(listUser: any[]) {
  const data = listUser.map((item) => `${item.firstName} ${item.lastName}`)
  return data.join(', ')
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
</style>
