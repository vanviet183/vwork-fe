<template>
  <v-data-table
    :headers="headers"
    :items="props.items"
    item-value="id"
    :hover="props.items.length > 0"
    @click:row="handleClickRow"
  >
    <template #item.status="{ item }">
      <div v-if="item.raw.status === 1">
        <p>Hoạt động</p>
      </div>
    </template>
    <template #item.options="{ item }">
      <CommonBoxOptions>
        <div class="p-4 cursor-pointer" @click="handleComplete(item.columns)">
          Đánh dấu hoàn thành
        </div>
      </CommonBoxOptions>
    </template>
    <template #item.bottom=""></template>
  </v-data-table>
</template>
<script setup lang="ts">
import { TASKS_DETAIL } from '~/constants'

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const headers = ref([
  {
    title: 'Tên thành viên',
    align: 'start',
    key: 'lastName',
    width: '280px',
    sortable: false,
  },
  {
    title: 'Email',
    align: 'start',
    key: 'email',
    sortable: false,
  },
  {
    title: 'Số điện thoại',
    align: 'start',
    key: 'phone',
    sortable: false,
  },
  {
    title: 'Chức vụ',
    align: 'start',
    key: 'role',
    sortable: false,
  },
  {
    title: 'Phòng ban',
    align: 'start',
    key: 'group',
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

const handleComplete = (el: any) => {
  console.log('el', el)

  console.log('hello')
}
</script>
<style scoped lang="scss">
:deep(.v-field__outline) {
  --v-field-border-opacity: 0 !important;
}
</style>
