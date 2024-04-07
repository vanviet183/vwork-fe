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
        <div>hello</div>
      </CommonBoxOptions>
    </template>
    <template #item.bottom=""> </template>
  </v-data-table>
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
</script>
<style scoped lang="scss">
:deep(.v-field__outline) {
  --v-field-border-opacity: 0 !important;
}
</style>
