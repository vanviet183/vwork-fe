<template>
  <div class="box-info">
    <div class="box1">
      <div>
        <v-icon icon="mdi-phone" class="icon-nav"></v-icon>
        <span class="ml-4">Thông tin liên hệ</span>
      </div>
      <div class="cursor-pointer">
        <v-icon
          v-if="!isEdit"
          icon="mdi-pencil"
          @click="handleEditUserContact"
        ></v-icon>
        <div v-else class="d-flex align-center">
          <p class="mr-4" @click="handleEditUserContact">Huỷ</p>
          <p @click="onSubmit">Cập nhật</p>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="d-flex">
        <div class="labels">
          <div class="d-flex align-center">
            <p class="font-semibold w-[200px]">Số điện thoại</p>
            <div>
              <CommonTextField
                v-if="isEdit"
                name="phone"
                :default-value="userInfo?.phone"
                placeholder="Số điện thoại"
                class="w-[280px]"
              />
              <p v-else>
                {{ userInfo?.phone ? userInfo.phone : 'Chưa cập nhật' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useUserStore } from '~/stores/user/user-store'

const isEdit = ref(false)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()
const { userId } = storeToRefs(authenticationStore)

function handleEditUserContact() {
  isEdit.value = !isEdit.value
}

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    phone: string().trim().required().max(10),
  }
  return object().shape(validate)
}

interface UserInfoFormData {
  phone: string
}

const schema = ref(schemaValidate())
function initialValueForm() {
  const initialValue: UserInfoFormData = {
    phone: userInfo.value?.phone ?? '',
  }
  return initialValue
}

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: initialValueForm(),
})

const onSubmit = handleSubmit(
  async (values) => {
    const result = await userStore.updateUserInfo(
      userId.value,
      undefined,
      undefined,
      undefined,
      values.phone
    )

    if (result) {
      await userStore.getUserInfo(userId.value)
      isEdit.value = !isEdit.value
    }
  },
  (err) => {
    console.log(err)
  }
)
</script>
<style scoped lang="scss">
@use 'sass:map';

.labels {
  p {
    padding: 6px 0;
  }
}

.box-info {
  background-color: white;
  border-radius: 8px;
}
.box1,
.box2 {
  padding: 20px;
}
.box1 {
  border-left: 4px solid #0050b3;
  border-top-left-radius: 8px;
  border-bottom: 1px solid #f2f2f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
