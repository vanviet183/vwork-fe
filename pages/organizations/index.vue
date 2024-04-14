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

        <CommonFlatButton
          v-if="!isInitOrganization"
          @click="isInitOrganization = !isInitOrganization"
        >
          <v-icon icon="mdi-plus"></v-icon>
          <span>Khởi tạo tổ chức mới</span>
        </CommonFlatButton>
        <div v-if="isInitOrganization">
          <form>
            <CommonTextField
              name="organizationName"
              placeholder="Nhập tên tổ chức"
              prepend-inner-icon="mdi-email-outline"
            ></CommonTextField>
            <CommonTextField
              name="phoneNumber"
              placeholder="Số điện thoại"
              class="mt-4"
              prepend-inner-icon="mdi-email-outline"
            ></CommonTextField>
            <CommonDropdown :items="listAmountEmployee"></CommonDropdown>
            <CommonTextField
              name="amountEmployee"
              placeholder="Quy mô nhân sự"
              class="mt-4"
              prepend-inner-icon="mdi-email-outline"
            ></CommonTextField>
            <CommonTextField
              name="role"
              class="mt-4"
              placeholder="Chức vụ"
              prepend-inner-icon="mdi-email-outline"
            ></CommonTextField>
          </form>
          <CommonFlatButton
            background-color="#28526e"
            color="white"
            class="btn-login"
            @click="onSubmit"
            >Hoàn tất</CommonFlatButton
          >
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
import { HOME } from '~/constants'
definePageMeta({
  layout: false,
})

const isInitOrganization = ref(false)
const listAmountEmployee = [
  {
    title: '10 nhân sự',
    value: 10,
  },
  {
    title: '30 nhân sự',
    value: 30,
  },
  {
    title: '50 nhân sự',
    value: 50,
  },
  {
    title: '100 nhân sự',
    value: 100,
  },
]
const onSubmit = () => {
  navigateTo({ path: HOME })
}
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
