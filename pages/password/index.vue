<template>
  <div class="wrapper-change-password">
    <p class="font-semibold text-lg mb-4">Đổi mật khẩu</p>
    <form>
      <CommonTextField
        name="oldPassword"
        placeholder="Mật khẩu hiện tại"
        :type="visible ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
        @click:append-inner="visible = !visible"
      ></CommonTextField>
      <CommonTextField
        name="newPassword"
        placeholder="Mật khẩu mới"
        class="mt-4"
        :type="visible ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
        @click:append-inner="visible = !visible"
      ></CommonTextField>
      <CommonTextField
        name="confirmPassword"
        placeholder="Xác nhận mật khẩu"
        class="mt-4"
        :type="visible ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
        @click:append-inner="visible = !visible"
      ></CommonTextField>
    </form>

    <div class="text-center">
      <CommonFlatButton
        background-color="#28526e"
        color="white"
        class="btn-change-password mt-5"
        @click="onSubmit"
        >Cập nhật</CommonFlatButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { HOME } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useUserStore } from '~/stores/user/user-store'

const visible = ref(false)

const userStore = useUserStore()
const authenticationStore = useAuthorizationStore()
const { userId } = storeToRefs(authenticationStore)

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    oldPassword: string().trim().required().max(20),
    newPassword: string().trim().required().max(20),
    confirmPassword: string()
      .trim()
      .required()
      .max(20)
      .test('passwords-match', 'Mật khẩu không khớp', function (value) {
        return this.parent.password !== value
      }),
  }
  return object().shape(validate)
}
const schema = ref(schemaValidate())

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(
  async (values) => {
    const result = await userStore.updatePasswordUser(
      userId.value,
      values.newPassword,
      values.oldPassword
    )
    if (result) {
      navigateTo({ path: HOME })
    }
  },
  (error) => {
    console.log('err', error)
  }
)
</script>
<style scoped lang="scss">
@use 'sass:map';

.wrapper-change-password {
  width: 60%;
  padding: 80px 180px;
  border-radius: 16px;
  background-color: white;
  margin: 100px auto;
}
.btn-change-password {
  width: 200px;
}
</style>
