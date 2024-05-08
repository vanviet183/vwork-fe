<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="props.mode === SCREEN_MODE.EDIT ? 'Sửa tổ chức' : 'Thêm tổ chức'"
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Sửa' : 'Thêm'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <div>
      <form class="form-container">
        <CommonTextField
          name="organizationName"
          placeholder="Tên tổ chức"
          autofocus
        ></CommonTextField>
        <CommonTextarea
          name="description"
          placeholder="Mô tả tổ chức"
          class="custom-textarea-padding mt-4"
        />
        <CommonTextField
          name="email"
          placeholder="Email tổ chức"
          class="mt-4"
        ></CommonTextField>
        <CommonTextField
          name="phone"
          placeholder="Số điện thoại"
          class="mt-4"
        ></CommonTextField>
        <CommonDropdown
          name="author"
          item-label="title"
          placeholder="Người đứng đầu tổ chức"
          :items="userItems"
          class="mt-4"
        ></CommonDropdown>
      </form>
    </div>
  </CommonConfirmPopup>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { MAX_LENGTH_INPUT, ROLE, SCREEN_MODE } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useUserStore } from '~/stores/user/user-store'

const organizationStore = useOrganizationStore()
const userStore = useUserStore()
const { listAllUser } = storeToRefs(userStore)

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  tipId: {
    type: String,
    default: undefined,
  },
})

onMounted(async () => {
  await userStore.getAllUser()
})

const userItems = computed(() => getUsers() ?? [])

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    organizationName: string().trim().required().max(MAX_LENGTH_INPUT),
    description: string().trim().required().max(MAX_LENGTH_INPUT),
    email: string().trim().email().required().max(MAX_LENGTH_INPUT),
    phone: string().trim().required().max(10),
    author: object().required(),
  }
  return object().shape(validate)
}

const schema = ref(schemaValidate())

const onInvalid = (errors: any) => console.error(errors)

const { handleSubmit } = useForm({
  validationSchema: schema,
})

function onCancel() {
  emit('close-form')
}

const onSubmit = handleSubmit(async (values) => {
  const result = await organizationStore.initOrganization(
    values.organizationName,
    values.description,
    values.email,
    values.phone,
    values.author.value
  )
  if (result) {
    await organizationStore.getAllOrganization()
  }

  emit('close-form')
}, onInvalid)

function getUsers() {
  const listUserCEO = listAllUser.value?.filter(
    (item) => item.role === ROLE.CEO
  )
  return listUserCEO?.map((item) => ({
    title: `${item.firstName} ${item.lastName}`,
    value: item.id,
  }))
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.form-container {
  padding-top: 20px;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
