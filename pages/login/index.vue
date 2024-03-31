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
        <p class="my-3 font-semibold text-2xl">Đăng nhập</p>
        <CommonTabLogin></CommonTabLogin>
        <p
          class="font-semibold text-end forget-password cursor-pointer"
          @click="handleForgetPassword"
        >
          Quên mật khẩu
        </p>

        <CommonFlatButton
          background-color="#28526e"
          color="white"
          class="btn-login"
          @click="handleLogin"
          >Đăng nhập</CommonFlatButton
        >
        <div
          class="d-flex align-center justify-center mt-6 font-semibold text-lg"
        >
          <p>Chưa có tài khoản?</p>
          <p class="btn-register ml-1 cursor-pointer" @click="handleRegister">
            Đăng ký
          </p>
        </div>
        <div class="mt-6 text-center">
          <CommonFlatButton
            background-color="white"
            color="#28526e"
            class="cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="styles_icon__g7xCa"
            >
              <path
                d="M5.31891 14.5036L4.4835 17.6223L1.43011 17.6869C0.517594 15.9944 0 14.0579 0 12.0001C0 10.0102 0.483938 8.13374 1.34175 6.48145H1.34241L4.06078 6.97982L5.25159 9.68188C5.00236 10.4085 4.86652 11.1885 4.86652 12.0001C4.86661 12.881 5.02617 13.725 5.31891 14.5036Z"
                fill="#FBBB00"
              ></path>
              <path
                d="M23.7902 9.75879C23.928 10.4847 23.9999 11.2344 23.9999 12.0005C23.9999 12.8597 23.9095 13.6977 23.7375 14.5061C23.1533 17.2568 21.6269 19.6588 19.5124 21.3586L19.5118 21.3579L16.0878 21.1832L15.6032 18.1581C17.0063 17.3353 18.1028 16.0476 18.6804 14.5061H12.2637V9.75879H18.774H23.7902Z"
                fill="#518EF8"
              ></path>
              <path
                d="M19.5114 21.3568L19.5121 21.3574C17.4556 23.0104 14.8433 23.9994 11.9996 23.9994C7.42969 23.9994 3.45652 21.4451 1.42969 17.6862L5.31848 14.5029C6.33187 17.2075 8.94089 19.1328 11.9996 19.1328C13.3143 19.1328 14.546 18.7774 15.6029 18.157L19.5114 21.3568Z"
                fill="#28B446"
              ></path>
              <path
                d="M19.6596 2.76262L15.7721 5.94525C14.6783 5.26153 13.3853 4.86656 12 4.86656C8.87213 4.86656 6.21431 6.88017 5.25169 9.68175L1.34245 6.48131H1.3418C3.33895 2.63077 7.36223 0 12 0C14.9117 0 17.5814 1.03716 19.6596 2.76262Z"
                fill="#F14336"
              ></path>
            </svg>
            <span class="ml-3">Đăng nhập bằng Google</span>
          </CommonFlatButton>
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
import { FORGET_PASSWORD, HOME, REGISTER } from '~/constants'

definePageMeta({
  layout: false,
})

const handleForgetPassword = () => {
  navigateTo({ path: FORGET_PASSWORD })
}
const handleRegister = () => {
  navigateTo({ path: REGISTER })
}
const handleLogin = () => {
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
