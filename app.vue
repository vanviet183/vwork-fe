<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <CommonSnackbar></CommonSnackbar>
    </Head>
  </div>
</template>

<script setup lang="ts">
import { registerLicense } from '@syncfusion/ej2-base'
import { storeToRefs } from 'pinia'
import 'reflect-metadata'
import { setLocale } from 'yup'
import { HOME, yupValidationMeesage } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'

const authorizationStore = useAuthorizationStore()
const { accessToken } = storeToRefs(authorizationStore)
const title = ref('VWork')

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCeExyWmFZfVpgcV9EYFZQRGYuP1ZhSXxXdkBjXH9bcnVUQ2NUV00='
)

onMounted(() => {
  setLocale(yupValidationMeesage)
})

watch(accessToken, () => {
  if (accessToken.value === '') {
    reloadNuxtApp({ path: HOME })
  }
})
</script>
