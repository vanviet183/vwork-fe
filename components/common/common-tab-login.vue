<template>
  <div class="wrapper-tabs">
    <v-tabs v-model="tab" density="compact">
      <v-tab :value="TAB_LOGIN.EMAIL">Email</v-tab>
      <v-tab :value="TAB_LOGIN.PHONE">Số điện thoại</v-tab>
    </v-tabs>

    <v-card-text class="px-0">
      <v-window v-model="tab">
        <v-window-item :value="TAB_LOGIN.EMAIL">
          <CommonTextField
            placeholder="Email của bạn"
            prepend-inner-icon="mdi-email-outline"
          ></CommonTextField>
          <CommonTextField
            placeholder="Mật khẩu"
            class="mt-4"
            :type="visible ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append-inner="visible = !visible"
          ></CommonTextField>
          <CommonTextField
            v-if="props.isRegister"
            placeholder="Xác nhận mật khẩu"
            class="mt-4"
            :type="visible ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append-inner="visible = !visible"
          ></CommonTextField>
        </v-window-item>
        <v-window-item :value="TAB_LOGIN.PHONE">
          <CommonTextField
            placeholder="Số điện thoại của bạn"
            prepend-inner-icon="mdi-cellphone"
          ></CommonTextField>
          <CommonTextField
            v-if="props.isRegister"
            placeholder="Mật khẩu"
            class="mt-4"
            :type="visible ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append-inner="visible = !visible"
          ></CommonTextField>
          <CommonTextField
            v-if="props.isRegister"
            placeholder="Xác nhận mật khẩu"
            class="mt-4"
            :type="visible ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append-inner="visible = !visible"
          ></CommonTextField>
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
<script setup lang="ts">
import { TAB_LOGIN } from '~/constants'

const visible = ref(false)
const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false,
  },
})

const tab = ref(null)
</script>
<style scoped lang="scss">
@use 'sass:map';

:deep(.v-btn__content) {
  text-transform: none;
}
:deep(.v-slide-group__content) {
  height: 50px;
}
:deep(.v-tab) {
  width: 50%;
  font-weight: bold;
}
:deep(.v-slide-group-item--active) {
  color: #73787e;
}
</style>
