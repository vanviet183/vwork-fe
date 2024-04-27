<template>
  <div class="d-flex">
    <CommonSidebar>
      <div>Hello</div>
    </CommonSidebar>

    <div class="p-5 flex-1">
      <CommonFlatButton
        background-color="#28526e"
        color="white"
        class="btn-login mt-4"
        @click="handleCreateUser"
        >Thêm thành viên
      </CommonFlatButton>
      <CreateUserForm
        v-if="isOpenFormCreateUser"
        @close-form="handleCreateUser"
      />
      <div class="d-flex align-center justify-between">
        <div class="d-flex align-center">
          <p>Development</p>
          <p>11 thành viên</p>
        </div>
        <div>
          <CommonTextSearch />
        </div>
      </div>
      <div class="box-users mt-5">
        <CommonUserList :items="listUser" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const listUser = ref([
  {
    lastName: 'Viet',
    email: 'vietnv01@gmail.com',
    phone: '0147852369',
    role: 'CEO',
    group: 'CEO',
    status: 1,
  },
  {
    lastName: 'Viet',
    email: 'vietnv01@gmail.com',
    phone: '0147852369',
    role: 'CEO',
    group: 'CEO',
    status: 1,
  },
  {
    lastName: 'Viet',
    email: 'vietnv01@gmail.com',
    phone: '0147852369',
    role: 'CEO',
    group: 'CEO',
    status: 1,
  },
  {
    lastName: 'Viet',
    email: 'vietnv01@gmail.com',
    phone: '0147852369',
    role: 'CEO',
    group: 'CEO',
    status: 1,
  },
])

const isOpenFormCreateUser = ref(false)
function handleCreateUser() {
  isOpenFormCreateUser.value = !isOpenFormCreateUser.value
}
</script>
<style scoped lang="scss"></style>
