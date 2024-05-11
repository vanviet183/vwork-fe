<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="props.items"
      item-value="id"
      :hover="(props.items ?? []).length > 0"
    >
      <template #item.fullName="{ item }">
        <div class="d-flex align-center">
          <img
            :src="item.raw.avatar"
            class="h-[36px] avatar"
            alt="Vwork Logo"
          />
          <p class="ml-3">{{ item.raw.fullName }}</p>
        </div>
      </template>
      <template #item.progress="{ item }">
        <div>
          <p>{{ item.raw.progress ? item.raw.progress : '--' }}</p>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const headers = ref([
  {
    title: 'Thành viên',
    align: 'start',
    key: 'fullName',
    width: '240px',
    sortable: false,
  },
  {
    title: 'Tổng công việc',
    align: 'center',
    key: 'totalTasks',
    sortable: false,
  },
  {
    title: 'Tiến độ',
    align: 'center',
    key: 'progress',
    sortable: false,
  },
  {
    title: 'Hoàn thành',
    align: 'center',
    key: 'completedTasks',
    sortable: false,
  },
  {
    title: 'Chưa hoàn thành',
    align: 'center',
    key: 'unfinishedTasks',
    sortable: false,
  },
] as any[])
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
