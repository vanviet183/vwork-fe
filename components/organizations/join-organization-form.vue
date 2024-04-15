<template>
  <div class="wrapper-init-form">
    <form>
      <CommonTextField
        name="organizationName"
        placeholder="Nhập tên tổ chức"
      ></CommonTextField>
      <CommonTextField
        name="email"
        placeholder="Nhập email tổ chức"
        class="mt-4"
      ></CommonTextField>
      <CommonTextField
        name="phone"
        placeholder="Số điện thoại"
        class="mt-4"
      ></CommonTextField>
      <CommonDropdown
        name="amountEmployee"
        item-label="title"
        placeholder="Quy mô nhân sự"
        :items="listAmountEmployee"
        class="mt-4"
      ></CommonDropdown>
      <CommonDropdown
        name="role"
        item-label="title"
        placeholder="Chức vụ"
        :items="listRoleOrganization"
        class="mt-4"
      ></CommonDropdown>
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

const listRoleOrganization = [
  {
    title: 'CEO',
    value: 1,
  },
  {
    title: 'Quản lý',
    value: 30,
  },
  {
    title: 'Trưởng nhóm',
    value: 50,
  },
  {
    title: 'Nhân viên',
    value: 100,
  },
  {
    title: 'Chức vụ khác',
    value: 100,
  },
]
const onSubmit = () => {
  navigateTo({ path: HOME })
}
</script>
<style scoped lang="scss">
@use 'sass:map';
</style>
