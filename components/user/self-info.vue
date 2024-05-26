<template>
  <div class="box-info">
    <div class="box1">
      <div>
        <v-icon icon="mdi-account" class="icon-nav"></v-icon>
        <span class="ml-4">Thông tin cá nhân</span>
      </div>
      <div class="cursor-pointer">
        <v-icon
          v-if="!isEdit"
          icon="mdi-pencil"
          @click="handleEditUserInfo"
        ></v-icon>
        <div v-else class="d-flex align-center">
          <p class="mr-4" @click="handleEditUserInfo">Huỷ</p>
          <p @click="onSubmit">Cập nhật</p>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="d-flex">
        <div class="labels">
          <div class="d-flex align-center">
            <p class="w-[200px] font-semibold">Họ và tên</p>
            <div>
              <div v-if="isEdit" class="d-flex">
                <CommonTextField
                  name="firstName"
                  :default-value="userInfo?.firstName"
                  placeholder="Nội dung công việc"
                  class="w-[280px] mr-4"
                  autofocus
                />
                <CommonTextField
                  name="lastName"
                  :default-value="userInfo?.lastName"
                  placeholder="Nội dung công việc"
                  class="w-[280px]"
                />
              </div>
              <p v-else>{{ `${userInfo?.firstName} ${userInfo?.lastName}` }}</p>
            </div>
          </div>
          <div class="d-flex align-center">
            <p class="w-[200px] font-semibold">Email</p>
            <p>
              <span class="email">{{ userInfo?.email }}</span>
              <span class="text-sm ml-4">
                <v-icon icon="mdi-comment-alert"></v-icon>
                (Không thể cập nhật)
              </span>
            </p>
          </div>
          <div class="d-flex align-center">
            <p class="w-[200px] font-semibold">Ngày sinh</p>
            <div>
              <CommonDatePicker
                v-if="isEdit"
                class="target-day"
                name="birthday"
                placeholder="YYYY/MM/DD"
                :default-value="new Date()"
                @change="handleChangeDate"
              ></CommonDatePicker>
              <p v-else>{{ dayjs(userInfo?.birthday).format('DD/MM/YYYY') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { MAX_LENGTH_INPUT } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useUserStore } from '~/stores/user/user-store'

const isEdit = ref(false)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const authenticationStore = useAuthorizationStore()
const { userId } = storeToRefs(authenticationStore)

function handleEditUserInfo() {
  isEdit.value = !isEdit.value
}

const birthday = ref()
function handleChangeDate(value: Date) {
  birthday.value = value
}

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    firstName: string().trim().required().max(MAX_LENGTH_INPUT),
    lastName: string().trim().required().max(MAX_LENGTH_INPUT),
    birthday: string().trim().required(),
  }
  return object().shape(validate)
}

const schema = ref(schemaValidate())

interface UserInfoFormData {
  firstName: string
  lastName: string
  birthday: string
}

function initialValueForm() {
  const initialValue: UserInfoFormData = {
    firstName: userInfo.value?.firstName ?? '',
    lastName: userInfo.value?.lastName ?? '',
    birthday: userInfo.value?.birthday ?? '',
  }
  return initialValue
}

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: initialValueForm(),
})

const onSubmit = handleSubmit(
  async (values) => {
    console.log('values', values)

    const result = await userStore.updateUserInfo(
      userId.value,
      values.firstName,
      values.lastName,
      dayjs(values.birthday).format('YYYY/MM/DD'),
      undefined
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
.email {
  color: rgb(103, 197, 45);
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
