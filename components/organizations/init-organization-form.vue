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
      class="btn-login"
      @click="onSubmit"
      >Hoàn tất
    </CommonFlatButton>
  </div>
</template>
<script setup lang="ts">
import { HOME } from '~/constants'

const onSubmit = () => {
  navigateTo({ path: HOME })
}
</script>
<style scoped lang="scss">
@use 'sass:map';
</style>
