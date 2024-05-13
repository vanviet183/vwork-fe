<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="props.items"
      item-value="id"
      :hover="(props.items ?? []).length > 0"
      @click:row="handleClickRow"
    >
      <template #item.createdAt="{ item }">
        <div>
          <p>{{ dayjs(item.raw.createdAt).format('YYYY/MM/DD') }}</p>
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
            @click="handleEditOrganization(item.columns)"
          >
            Sửa thông tin tổ chức
          </div>
          <div
            class="px-4 py-2 cursor-pointer"
            @click="handleDeleteOrganization(item.raw.id)"
          >
            Xoá tổ chức
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
import dayjs from 'dayjs'
import { ADMIN_ORGANIZATIONS } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const organizationStore = useOrganizationStore()

const isOpenConfirmDelete = ref(false)
const organizationId = ref()

const headers = ref([
  {
    title: 'Tên tổ chức',
    align: 'start',
    key: 'organizationName',
    width: '200px',
  },
  {
    title: 'Tổng giám đốc',
    align: 'start',
    key: 'author',
  },
  {
    title: 'Email',
    align: 'start',
    key: 'email',
  },
  {
    title: 'Số điện thoại',
    align: 'start',
    key: 'phone',
  },
  {
    title: 'Ngày thành lập',
    align: 'start',
    key: 'createdAt',
  },
  {
    title: 'Trạng thái',
    align: 'start',
    key: 'status',
  },
  {
    title: '',
    align: 'end',
    key: 'options',
  },
] as any[])

function handleClickRow(_item: any, row: any) {
  navigateTo({ path: `${ADMIN_ORGANIZATIONS}/${row.item.raw.id}` })
}

async function handleDelete() {
  await organizationStore.deleteOrganization(organizationId.value)
  await organizationStore.getAllOrganization()
  isOpenConfirmDelete.value = false
  organizationId.value = undefined
}

function handleCancelDelete() {
  isOpenConfirmDelete.value = false
}

const handleEditOrganization = (el: any) => {
  console.log('el', el)
}

const handleDeleteOrganization = (id: number) => {
  organizationId.value = id
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
