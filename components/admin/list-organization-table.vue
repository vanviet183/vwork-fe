<template>
  <v-data-table
    :headers="headers"
    :items="props.items"
    item-value="id"
    :hover="(props.items ?? []).length > 0"
    @click:row="handleClickRow"
  >
    <template #item.createdAt="{ item }">
      <div>
        <p>{{ dayjs(item.raw.createdAt).format('DD/MM/YYYY') }}</p>
      </div>
    </template>
    <template #item.status="{ item }">
      <div>
        <p>Hoạt động</p>
      </div>
    </template>
    <template #item.options="{ item }">
      <CommonBoxOptions>
        <div
          class="px-4 py-2 cursor-pointer"
          @click="handleViewUser(item.columns)"
        >
          Xem thông tin thành viên
        </div>
        <div
          class="px-4 py-2 cursor-pointer"
          @click="handleEditUser(item.columns)"
        >
          Sửa thông tin người dùng
        </div>
        <div
          class="px-4 py-2 cursor-pointer"
          @click="handleDeleteUser(item.raw.id)"
        >
          Xoá người dùng
        </div>
      </CommonBoxOptions>
    </template>
    <template #item.bottom=""></template>
  </v-data-table>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { USER } from '~/constants'

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const route = useRoute()
const organizationId = computed(() => Number(route.query.organizationId))

const headers = ref([
  {
    title: 'Tên tổ chức',
    align: 'start',
    key: 'organizationName',
    width: '280px',
    sortable: false,
  },
  // {
  //   title: 'Người đứng đầu tổ chức',
  //   align: 'start',
  //   key: 'organizationName',
  //   width: '280px',
  //   sortable: false,
  // },
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
    title: 'Ngày thành lập',
    align: 'start',
    key: 'createdAt',
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
  navigateTo({ path: USER, query: { userId: row.item.raw.id } })
}

const handleViewUser = (el: any) => {
  console.log('el', el)
}

const handleEditUser = (el: any) => {
  console.log('el', el)
}

const handleDeleteUser = (id: number) => {
  console.log('id', id)
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
