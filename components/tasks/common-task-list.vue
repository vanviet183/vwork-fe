<template>
  <v-data-table
    :headers="headers"
    :items="props.items"
    item-value="id"
    select-strategy="single"
    show-select
  >
    <template #item.user="{ item }">
      <v-avatar
        :image="item.raw.user.avatar"
        size="32"
        class="cursor-pointer"
        @click="() => {}"
      >
      </v-avatar>
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
    title: 'Title',
    align: 'start',
    key: 'title',
    width: '280px',
    sortable: false,
  },
  {
    title: 'Thuc hien',
    align: 'start',
    key: 'user',
    sortable: false,
  },
  {
    title: 'Thoi han',
    align: 'start',
    key: 'time',
    sortable: false,
  },
  {
    title: 'Uu tien',
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

const selected = ref([])

const handleComplete = (el: any) => {
  console.log('el', el)

  listTask.value = listTask.value.filter((item) => el.title !== item.title)
  console.log('hello')
}
</script>
<style scoped lang="scss">
:deep(.v-field__outline) {
  --v-field-border-opacity: 0 !important;
}
</style>
