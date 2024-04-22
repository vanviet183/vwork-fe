<template>
  <v-data-table
    :headers="headers"
    :items="props.items"
    item-value="id"
    :hover="props.items.length > 0"
    @click:row="handleClickRow"
  >
    <template #item.user="{ item }">
      <v-avatar
        :image="item.raw.users.avatar"
        size="32"
        class="cursor-pointer"
        @click="() => {}"
      >
      </v-avatar>
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
import { useTaskStore } from '~/stores/task/task-store'
const taskStore = useTaskStore()
const { listTask } = storeToRefs(taskStore)

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
    key: 'user',
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
  console.log('hello')
}
</script>
<style scoped lang="scss">
:deep(.v-field__outline) {
  --v-field-border-opacity: 0 !important;
}
</style>
