<template>
  <div class="wrapper m-auto">
    <div class="box1">
      <div class="cover-image__wrapper relative">
        <img src="~/assets/img/banner-info.png" alt="cover-image" />
        <div class="profile__head__avatar rounded-circle">
          <v-avatar
            :image="Avatar"
            size="156"
            class="cursor-pointer"
            @click="() => {}"
          ></v-avatar>
        </div>
        <div class="text-center mt-10">
          <p class="mb-2 text-2xl font-semibold">Vitcon123</p>
          <p>heheh</p>
        </div>
      </div>
    </div>
    <div class="box2">
      <CommonBoxInfo icon="mdi-account" title="Thông tin cá nhân">
        <SelfInfo :mode="SCREEN_MODE.PREVIEW"></SelfInfo>
      </CommonBoxInfo>
      <CommonBoxInfo icon="mdi-account" title="Thông tin liên hệ" class="mt-5">
        <ContactInfo :mode="SCREEN_MODE.PREVIEW"></ContactInfo>
      </CommonBoxInfo>
      <CommonBoxInfo icon="mdi-account" title="Thông tin tổ chức" class="mt-5">
        <CompanyInfo :mode="SCREEN_MODE.PREVIEW"></CompanyInfo>
      </CommonBoxInfo>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from '~/assets/img/avatar-info.jpeg'
import { SCREEN_MODE } from '~/constants'

const tabUser = ref([
  {
    title: 'Tất cả',
    value: '1',
  },
  {
    title: 'Công việc',
    value: '2',
  },
  {
    title: 'Lịch họp',
    value: '3',
  },
])
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
</style>
