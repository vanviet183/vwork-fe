<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT ? 'Sửa phòng ban' : 'Thêm phòng ban'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Sửa' : 'Thêm'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <p class="mb-2">Tên phòng ban</p>
      <CommonTextField name="groupName" autofocus />

      <p class="mt-4 mb-2">Trưởng phòng</p>
      <CommonDropdown
        name="teamlead"
        item-label="title"
        placeholder="Trưởng phòng"
        :items="userItems ?? []"
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
import { MAX_LENGTH_INPUT, SCREEN_MODE } from '~/constants'
import type { DataType } from '~/models/interface/common/data-type'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useGroupStore } from '~/stores/group/group-store'
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const projectStore = useProjectStore()
const authenticationStore = useAuthorizationStore()

const organizationStore = useOrganizationStore()
const { listGroup, listUser } = storeToRefs(organizationStore)

const groupStore = useGroupStore()
const { listUserInGroup } = storeToRefs(groupStore)

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))
const organizationId = computed(() => Number(route.query.organizationId))

const userItems = computed(() => getUsers())
const listUserChoose = ref()

const getUsers = () => {
  return listUser.value?.map((item) => ({
    title: item.fullName,
    value: item.id,
  }))
}

watch(userItems, () => {
  console.log(userItems.value)
})

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    groupName: string().trim().required().max(MAX_LENGTH_INPUT),
    listUser: array().of(object().shape({ title: string(), value: string() })),
    teamlead: object().required(),
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
    console.log('value', values)

    const result = await groupStore.createGroup(
      organizationId.value,
      values.groupName,
      values.teamlead.value,
      listUserChoose.value
    )
    if (result) {
      await organizationStore.getAllGroupInOrganization(organizationId.value)
      await organizationStore.getAllUserInOrganization(organizationId.value)
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
