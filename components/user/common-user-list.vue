<template>
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
          @click="handleViewUser(item.columns)"
        >
          Xem thông tin thành viên
        </div>
        <div
          class="px-4 py-2 cursor-pointer"
          @click="handleEditUser(item.columns)"
        >
          Sửa thông tin thành viên
        </div>
      </CommonBoxOptions>
    </template>
    <template #item.bottom=""></template>
  </v-data-table>
</template>
<script setup lang="ts">
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
