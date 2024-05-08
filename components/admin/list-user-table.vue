<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="props.items"
      item-value="id"
      :hover="(props.items ?? []).length > 0"
      @click:row="handleClickRow"
    >
      <template #item.status="{ item }">
        <div v-if="item.raw.status === 1">
          <p>Hoạt động</p>
        </div>
      </template>
      <template #item.options="{ item }">
        <CommonBoxOptions>
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
    <CommonConfirmPopup
      :is-show-popup="isOpenConfirmDelete"
      title="Bạn có chắc chắn muốn xóa người dùng này không?"
      positive-title="Đồng ý"
      negative-title="Huỷ"
      :positive-action="handleDelete"
      :negative-action="handleCancelDelete"
    >
    </CommonConfirmPopup>
  </div>
</template>
<script setup lang="ts">
import { USER } from '~/constants'

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
    key: 'fullName',
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
    title: 'Vị trí công việc',
    align: 'start',
    key: 'role',
    sortable: false,
  },
  {
    title: '',
    align: 'end',
    key: 'options',
    sortable: false,
  },
] as any[])

const isOpenConfirmDelete = ref(false)

function handleDelete() {
  isOpenConfirmDelete.value = false
}

function handleCancelDelete() {
  isOpenConfirmDelete.value = false
}

function handleClickRow(_item: any, row: any) {
  navigateTo({ path: USER, query: { userId: row.item.raw.id } })
}

const handleEditUser = (el: any) => {
  console.log('el', el)
}

const handleDeleteUser = (id: number) => {
  isOpenConfirmDelete.value = !isOpenConfirmDelete.value
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
