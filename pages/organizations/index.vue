<template>
  <div class="wrapper d-flex">
    <div class="w-1/3 form-action h-full">
      <div class="px-8 py-4 mb-3">
        <img
          src="~/assets/img/logo-vwork.svg"
          class="h-[48px]"
          alt="Vwork Logo"
        />
      </div>
      <div class="template-content">
        <p class="my-3 font-semibold text-2xl">Tổ chức của bạn</p>
        <p class="mb-4">
          Danh sách tổ chức mà bạn được mời hoặc đang tham gia. Tải lại trang để
          cập nhật lời mời
        </p>

        <div v-if="!isInitOrganization" class="join-organization">
          <CommonFlatButton
            v-if="!isJoinOrganization"
            class="w-full justify-start"
            @click="isJoinOrganization = !isJoinOrganization"
          >
            <div class="d-flex align-center">
              <v-icon icon="mdi-plus" class="p-1"></v-icon>
              <p>Tham gia tổ chức</p>
            </div>
          </CommonFlatButton>
          <div v-if="isJoinOrganization">
            <JoinOrganizationForm />
          </div>
        </div>

        <div v-if="!isJoinOrganization" class="init-organization">
          <CommonFlatButton
            v-if="!isInitOrganization"
            class="mt-4 w-full justify-start"
            @click="isInitOrganization = !isInitOrganization"
          >
            <v-icon icon="mdi-plus" class="p-1"></v-icon>
            <span>Khởi tạo tổ chức mới</span>
          </CommonFlatButton>
          <div v-if="isInitOrganization">
            <InitOrganizationForm />
          </div>
        </div>
      </div>
    </div>
    <div class="w-2/3 slideshow">
      <img
        src="~/assets/img/banner-login.png"
        alt="Banner Login"
        class="max-w-[480px]"
      />
      <div class="max-w-[480px]">
        <p class="font-semibold text-2xl">
          Nâng cao hiệu suất đội ngũ với tính năng
        </p>
        <p class="sub-text">Quản lý công việc</p>
        <p class="mt-4">
          Giao và nhận việc trong doanh nghiệp trở nên thuận tiện và dễ dàng.
          Quản lý dự án công việc hiệu suất cao.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LOGIN } from '~/constants'

const route = useRoute()
const userId = computed(() => Number(route.query.userId))
definePageMeta({
  layout: false,
})

watch(userId, () => {
  if (!userId.value) {
    navigateTo({
      path: LOGIN,
    })
  }
})

const isInitOrganization = ref(false)
const isJoinOrganization = ref(false)
</script>
<style scoped lang="scss">
@use 'sass:map';

.wrapper {
  height: 100vh;
  color: '#18baff' !important;
}
.form-action {
  background-color: white;
}
.template-content {
  padding: 0 96px;
}
.slideshow {
  background-color: #f2f2f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.forget-password {
  color: map.get($colors, 'primary');
}
.btn-login {
  margin-top: 24px;
  height: 52px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
}
.btn-register {
  color: map.get($colors, 'primary');
}
.sub-text {
  font-size: 24px;
  font-weight: bold;
  color: map.get($colors, 'primary');
}
</style>
