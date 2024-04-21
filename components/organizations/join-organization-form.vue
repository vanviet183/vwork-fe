<template>
  <div class="wrapper-init-form">
    <form>
      <CommonTextField
        name="organizationId"
        placeholder="Nhập mã tổ chức"
        prepend-inner-icon="mdi-email-outline"
      ></CommonTextField>
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
import { number, object } from 'yup'
import { HOME } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'

const route = useRoute()
const userId = computed(() => Number(route.query.userId))
const organizationStore = useOrganizationStore()
const { organizationInfo } = storeToRefs(organizationStore)

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    organizationId: number().required(),
  }
  return object().shape(validate)
}

const schema = ref(schemaValidate())

const onInvalid = (errors: any) => console.error(errors)
const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
  const result = await organizationStore.joinOrganization(
    userId.value,
    values.organizationId
  )

  if (result) {
    navigateTo({
      path: HOME,
      query: { organizationId: organizationInfo.value?.id },
    })
  }
}, onInvalid)
</script>
<style scoped lang="scss">
@use 'sass:map';
</style>
