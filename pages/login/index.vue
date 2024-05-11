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
        <CommonTextField
          name="email"
          placeholder="Email của bạn"
          prepend-inner-icon="mdi-email-outline"
        ></CommonTextField>
        <CommonTextField
          name="password"
          placeholder="Mật khẩu"
          class="mt-4"
          :type="visible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
          @click:append-inner="visible = !visible"
        ></CommonTextField>
        <p
          class="font-semibold text-end forget-password cursor-pointer mt-4"
          @click="handleForgetPassword"
        >
          Quên mật khẩu
        </p>

        <CommonFlatButton
          background-color="#28526e"
          color="white"
          class="btn-login"
          @click="onSubmit"
          >Đăng nhập</CommonFlatButton
        >
        <!-- <div
          class="d-flex align-center justify-center mt-6 font-semibold text-lg"
        >
          <p>Chưa có tài khoản?</p>
          <p class="btn-register ml-1 cursor-pointer" @click="handleRegister">
            Đăng ký
          </p>
        </div> -->
        <div class="mt-6 text-center">
          <CommonFlatButton
            background-color="white"
            color="#28526e"
            class="cursor-pointer"
            @click="handleContactUs"
          >
            <img
              src="~/assets/img/logo-vwork.svg"
              class="h-[24px]"
              alt="Vwork Logo"
            />
            <span class="ml-3 font-semibold">Liên hệ Vwork</span>
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
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import {
  ADMIN,
  FORGET_PASSWORD,
  HOME,
  MAIL_ADDRESS_ADMIN,
  MAIL_OTHER_DATA_INFO,
  MAX_LENGTH_INPUT,
  ROLE,
} from '~/constants'
import { useAuthStore } from '~/stores/auth/auth-store'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useUserStore } from '~/stores/user/user-store'

const visible = ref(false)

definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    email: string().trim().required().max(MAX_LENGTH_INPUT),
    password: string().trim().required().max(MAX_LENGTH_INPUT),
  }
  return object().shape(validate)
}

const schema = ref(schemaValidate())

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
  const result = await authStore.login(values.email, values.password)
  if (result) {
    await userStore.getUserInfo(authenticationStore.userId)
    if (authenticationStore.role !== ROLE.ADMIN) {
      const organizationId = userInfo.value?.organization?.id
      if (organizationId) {
        authenticationStore.setOrganizationId(organizationId)
      }
      navigateTo({
        path: HOME,
      })
    } else {
      navigateTo({
        path: ADMIN,
      })
    }
  }
})

const handleForgetPassword = () => {
  navigateTo({ path: FORGET_PASSWORD })
}

// const handleRegister = () => {
//   navigateTo({ path: REGISTER })
// }

function handleContactUs() {
  const mailtoLink = `mailto:${MAIL_ADDRESS_ADMIN}?subject=${MAIL_OTHER_DATA_INFO.SUBJECT}&body=${MAIL_OTHER_DATA_INFO.BODY}`
  window.location.href = mailtoLink
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
