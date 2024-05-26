<template>
  <div class="wrapper m-auto">
    <div class="box1">
      <div class="cover-image__wrapper relative">
        <img
          src="~/assets/img/banner-info.png"
          alt="cover-image"
          class="custom-banner"
        />
        <div class="profile__head__avatar rounded-circle">
          <img
            src="http://localhost:3005/uploads/avatars/no-avatar.jpeg"
            width="156px"
            alt=""
            class="avatar"
          />
        </div>
        <div class="text-center mt-10">
          <p class="mb-2 text-2xl font-semibold">
            {{ `${userInfo?.firstName} ${userInfo?.lastName}` }}
          </p>
          <p class="py-1">{{ userInfo?.sector }}</p>
        </div>
      </div>
    </div>
    <div class="box2">
      <SelfInfo :mode="SCREEN_MODE.PREVIEW"></SelfInfo>
      <ContactInfo :mode="SCREEN_MODE.PREVIEW" class="mt-5"></ContactInfo>
      <CompanyInfo :mode="SCREEN_MODE.PREVIEW" class="mt-5"></CompanyInfo>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { SCREEN_MODE } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useUserStore } from '~/stores/user/user-store'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()
const { userId } = storeToRefs(authenticationStore)

onMounted(async () => {
  if (!userInfo.value) {
    await userStore.getUserInfo(userId.value)
  }
})
</script>
<style scoped lang="scss">
@use 'sass:map';

.wrapper {
  max-width: 70%;
}
.box1 {
  background-color: white;
  margin-bottom: 16px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.rounded-circle {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px;
  border: 4px solid white;
}
.box2 {
  padding-bottom: 40px;
}
.custom-banner {
  height: 250px;
  width: 100%;
}
</style>
