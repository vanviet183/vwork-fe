<template>
  <div class="wrapper-tabs">
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
    <CommonTextField
      v-if="props.isRegister"
      name="confirm-password"
      placeholder="Xác nhận mật khẩu"
      class="mt-4"
      :type="visible ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
      @click:append-inner="visible = !visible"
    ></CommonTextField>
  </div>
</template>
<script setup lang="ts">
const visible = ref(false)
const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped lang="scss">
@use 'sass:map';
</style>
