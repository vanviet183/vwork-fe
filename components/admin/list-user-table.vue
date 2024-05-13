<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="props.items"
      item-value="id"
      :hover="(props.items ?? []).length > 0"
      @click:row="handleClickRow"
    >
      <template #item.options="{ item }">
        <CommonBoxOptions>
          <div
            class="px-4 py-2 cursor-pointer"
            @click="handleEditUser(item.raw.id)"
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
    <CreateUserForm
      v-if="isOpenFormEdit"
      :mode="SCREEN_MODE.EDIT"
      :user-id="userId"
      @close-form="handleEditUser"
    />
  </div>
</template>
<script setup lang="ts">
import { SCREEN_MODE } from '~/constants'
import { useUserStore } from '~/stores/user/user-store'

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
    width: '200px',
  },
  {
    title: 'Tổ chức',
    align: 'start',
    key: 'organizationName',
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
    title: 'Nhóm',
    align: 'start',
    key: 'sector',
  },
  {
    title: 'Chức vụ',
    align: 'start',
    key: 'role',
  },
  {
    title: '',
    align: 'end',
    key: 'options',
  },
] as any[])

const userStore = useUserStore()

const isOpenConfirmDelete = ref(false)
const isOpenFormEdit = ref(false)
const userId = ref()

async function handleDelete() {
  await userStore.deleteUser(userId.value)
  await userStore.getAllUser()
  isOpenConfirmDelete.value = false
}

function handleCancelDelete() {
  isOpenConfirmDelete.value = false
}

function handleClickRow(_item: any, row: any) {
  // navigateTo({ path: USER, query: { userId: row.item.raw.id } })
}

const handleEditUser = (id: number) => {
  isOpenFormEdit.value = !isOpenFormEdit.value
  userId.value = id
}

const handleDeleteUser = (id: number) => {
  isOpenConfirmDelete.value = !isOpenConfirmDelete.value
  userId.value = id
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
