<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="props.mode === SCREEN_MODE.EDIT ? 'Sửa nhóm' : 'Thêm nhóm'"
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Cập nhật' : 'Tạo'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <p class="mb-2">Tên nhóm</p>
      <CommonTextField name="groupName" autofocus />

      <p class="mt-4 mb-2">Trưởng nhóm</p>
      <CommonDropdown
        name="author"
        item-label="title"
        placeholder="Trưởng nhóm"
        :items="userTeamleads ?? []"
      ></CommonDropdown>

      <p class="mt-4 mb-2">Tổ chức</p>
      <CommonDropdown
        name="organization"
        item-label="title"
        placeholder="Tổ chức"
        :items="organizationItems ?? []"
      ></CommonDropdown>

      <p class="mt-4 mb-2">Danh sách thành viên</p>
      <CommonDropdownMultiple
        name="listUser"
        placeholder="Danh sách thành viên"
        :list-value="userItems ?? []"
        item-label="title"
        @change="handleListUserImplement"
      />
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { array, object, string } from 'yup'
import { MAX_LENGTH_INPUT, ROLE, SCREEN_MODE } from '~/constants'
import type { DataType } from '~/models/interface/common/data-type'
import { useGroupStore } from '~/stores/group/group-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useUserStore } from '~/stores/user/user-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const userStore = useUserStore()
const { listAllUser } = storeToRefs(userStore)

const userTeamleads = computed(() => getUserTeamleads())
const organizationItems = computed(() => getOrganizations())

const listUserChoose = ref()
const userItems = computed(() => getUsers())

const organizationStore = useOrganizationStore()
const { listAllOrganization } = storeToRefs(organizationStore)

const groupStore = useGroupStore()

onMounted(async () => {
  if (!listAllUser.value?.length) {
    await userStore.getAllUser()
  }
  if (!listAllOrganization.value?.length) {
    await organizationStore.getAllOrganization()
  }
})

const getUsers = () => {
  const listUserEmployee = listAllUser.value?.filter(
    (item) => item.role === ROLE.EMPLOYEE
  )
  return listUserEmployee?.map((item) => ({
    title: `${item.firstName} ${item.lastName}`,
    value: item.id,
  }))
}

function getOrganizations() {
  return listAllOrganization.value?.map((item) => ({
    title: item.organizationName,
    value: item.id,
  }))
}

function getUserTeamleads() {
  const listUserTeamlead = listAllUser.value?.filter(
    (item) => item.role === ROLE.TEAMLEAD
  )
  return listUserTeamlead?.map((item) => ({
    title: `${item.firstName} ${item.lastName}`,
    value: item.id,
  }))
}

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    groupName: string().trim().required().max(MAX_LENGTH_INPUT),
    organization: object().required(),
    author: object().required(),
    listUser: array().of(object().shape({ title: string(), value: string() })),
  }

  return object().shape(validate)
}

const schema = ref(schemaValidate())

const { handleSubmit } = useForm({
  validationSchema: schema,
})

function onCancel() {
  emit('close-form')
}

const onSubmit = handleSubmit(
  async (values) => {
    const result = await groupStore.createGroup(
      values.groupName,
      values.author.value,
      values.organization.value,
      listUserChoose.value
    )
    if (result) {
      await groupStore.getAllGroup()
    }
    emit('close-form')
  },
  (err) => {
    console.log(err)
  }
)

function handleListUserImplement(value: DataType[]) {
  const listUser = value.map((item) => {
    return Number(item.value)
  })

  listUserChoose.value = _.cloneDeep(listUser ?? [])
}

async function handleSelectGroup(value: any) {
  await groupStore.getAllUserInGroup(value.value)
}
</script>
<style lang="scss" scoped>
@use 'sass:map';
:deep(.v-data-table-footer) {
  display: none;
}
:deep(.v-data-table-rows-no-data) {
  display: none;
}
.text-button {
  cursor: pointer;
  color: map.get($colors, 'primary');
}

.custom-list-link {
  display: grid;
  grid-template-columns: 318px 170px auto;
}

.list-link-text {
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.4px;
  color: map.get($colors, 'dim-gray');
}

.custom-border-list {
  background: white;
  box-shadow: 0px -1px 0px 0px map.get($colors, 'light-silver') inset;
}

.custom-icon-container {
  text-align: center;
  align-self: center;
  color: map.get($colors, 'granite-gray');
}

.custom-icon {
  padding: 4px;
  font-size: 18px;
}

.form-container {
  padding-top: 20px;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
