<template>
  <div class="wrapper-init-form">
    <form>
      <CommonTextField
        name="organizationName"
        placeholder="Nhập tên tổ chức"
      ></CommonTextField>
      <CommonTextField
        name="email"
        placeholder="Nhập email tổ chức"
        class="mt-4"
      ></CommonTextField>
      <CommonTextField
        name="phone"
        placeholder="Số điện thoại"
        class="mt-4"
      ></CommonTextField>
      <CommonDropdown
        name="role"
        item-label="title"
        placeholder="Chức vụ"
        :items="listRoleOrganization"
        class="mt-4"
      ></CommonDropdown>
    </form>
    <CommonFlatButton
      background-color="#28526e"
      color="white"
      class="btn-login mt-4"
      @click="onSubmit"
      >Hoàn tất
    </CommonFlatButton>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { HOME, MAX_LENGTH_INPUT } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'

const route = useRoute()
const userId = computed(() => Number(route.query.userId))
const organizationStore = useOrganizationStore()
const { organizationInfo } = storeToRefs(organizationStore)

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    organizationName: string().trim().required().max(MAX_LENGTH_INPUT),
    email: string().trim().email().required().max(MAX_LENGTH_INPUT),
    phone: string().trim().required().max(10),
    role: object().required(),
  }
  return object().shape(validate)
}

const schema = ref(schemaValidate())

const onInvalid = (errors: any) => console.error(errors)
const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
  await organizationStore.initOrganization(
    userId.value,
    values.organizationName,
    values.email,
    values.phone,
    values.role.value
  )

  navigateTo({
    path: HOME,
    query: { organizationId: organizationInfo.value?.id },
  })
}, onInvalid)

const listRoleOrganization = [
  {
    title: 'CEO',
    value: 'CEO',
  },
  {
    title: 'Quản lý',
    value: 'Quản lý',
  },
  {
    title: 'Trưởng nhóm',
    value: 'Trưởng nhóm',
  },
  {
    title: 'Nhân viên',
    value: 'Nhân viên',
  },
  {
    title: 'Chức vụ khác',
    value: '',
  },
]
</script>
<style scoped lang="scss">
@use 'sass:map';
</style>
