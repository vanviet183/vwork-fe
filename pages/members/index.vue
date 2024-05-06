<template>
  <div class="d-flex">
    <CommonSidebar>
      <div class="px-4">
        <p class="text-3xl p-2 font-semibold">Quản lý thành viên</p>
        <div class="header d-flex align-center p-2 tab-active">
          <v-icon icon="mdi-account-group" class="icon-sidebar"></v-icon>
          <p class="ml-2">Tổ chức của tôi</p>
        </div>
      </div>
      <div class="px-4">
        <div class="box-group">
          <div
            class="d-flex align-center cursor-pointer my-4 custom-add"
            @click="handleToggleGroupForm"
          >
            <v-icon icon="mdi-plus" class="mr-2"></v-icon>
            <p>Thêm phòng ban</p>
          </div>

          <div v-if="listGroup?.length <= 1">
            <div class="icon-no-group">
              <svg
                width="112"
                height="85"
                viewBox="0 0 112 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="m-auto"
              >
                <path
                  d="M81.1578 80.595H28.0694L15.4746 41.5275C15.1803 40.6146 15.8612 39.6797 16.8204 39.6797H74.0879L81.1578 80.595Z"
                  fill="#28526E"
                ></path>
                <rect
                  x="3.18555"
                  y="12.5859"
                  width="25.4518"
                  height="25.4518"
                  rx="12.7259"
                  transform="rotate(-27.1525 3.18555 12.5859)"
                  fill="#FFA940"
                ></rect>
                <g clip-path="url(#clip0_19_290535)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.2251 15.2675C13.067 15.8615 12.6097 17.2818 13.2037 18.4399L13.7414 19.4884L25.2742 13.5734L25.5431 14.0977L14.0103 20.0126L15.8924 23.6823C16.4864 24.8404 17.9067 25.2977 19.0648 24.7037L26.4041 20.9396C27.5622 20.3456 28.0195 18.9252 27.4255 17.7671L25.2746 13.5733C24.6806 12.4152 23.2603 11.9578 22.1022 12.5518L18.4325 14.4339L17.5432 14.1476C17.097 14.0039 16.612 14.0434 16.1949 14.2573L14.2251 15.2675Z"
                    fill="white"
                  ></path>
                </g>
                <rect
                  x="92.041"
                  y="12.9844"
                  width="19.7959"
                  height="19.7959"
                  rx="9.89793"
                  transform="rotate(30 92.041 12.9844)"
                  fill="#722ED1"
                ></rect>
                <g clip-path="url(#clip1_19_290535)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M95.1144 22.5107C94.4381 22.1203 93.5733 22.352 93.1829 23.0283L92.8295 23.6403L99.5644 27.5287L99.3876 27.8349L92.6527 23.9465L91.4154 26.0897C91.0249 26.766 91.2566 27.6308 91.9329 28.0212L96.2189 30.4957C96.8952 30.8862 97.7599 30.6544 98.1504 29.9781L99.5644 27.529C99.9549 26.8527 99.7231 25.988 99.0468 25.5975L96.9039 24.3603L96.7588 23.8188C96.686 23.5471 96.5082 23.3155 96.2647 23.1748L95.1144 22.5107Z"
                    fill="white"
                  ></path>
                </g>
                <rect
                  x="49.4395"
                  y="17.0469"
                  width="33.9358"
                  height="33.9358"
                  rx="16.9679"
                  transform="rotate(15 49.4395 17.0469)"
                  fill="#1A99F4"
                ></rect>
                <g clip-path="url(#clip2_19_290535)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M57.261 27.9255C55.2495 27.3866 53.1819 28.5803 52.6429 30.5918L50.2031 39.6972C49.6641 41.7087 50.8579 43.7763 52.8694 44.3152L65.6169 47.7309C67.6284 48.2699 69.696 47.0762 70.235 45.0647L71.943 38.6903L51.9111 33.3228L52.1551 32.4123L72.187 37.7798C72.7256 35.7685 71.5319 33.7012 69.5206 33.1623L63.1468 31.4545L62.3994 30.1599C62.0244 29.5103 61.4067 29.0364 60.6822 28.8422L57.261 27.9255Z"
                    fill="white"
                  ></path>
                </g>
                <path
                  d="M53.4958 39.6774L52.6992 37.3846C52.262 36.1265 51.0719 35.2812 49.736 35.2812H29.6699C28.8889 35.2812 28.2559 35.9143 28.2559 36.6952V39.6774V60.1326V79.1739C28.2559 79.9548 28.8889 80.5878 29.6698 80.5878H80.1308C80.831 80.5878 81.4257 80.0754 81.5292 79.3829L87.2222 41.2955C87.35 40.4408 86.6879 39.6725 85.8238 39.6725H53.4958V39.6774Z"
                  fill="#44CA7A"
                ></path>
                <defs>
                  <clipPath id="clip0_19_290535">
                    <rect
                      width="14.1399"
                      height="14.1399"
                      fill="white"
                      transform="translate(10.7988 15.0371) rotate(-27.1525)"
                    ></rect>
                  </clipPath>
                  <clipPath id="clip1_19_290535">
                    <rect
                      width="8.48394"
                      height="8.48394"
                      fill="white"
                      transform="translate(94.1113 20.7109) rotate(30)"
                    ></rect>
                  </clipPath>
                  <clipPath id="clip2_19_290535">
                    <rect
                      width="22.6238"
                      height="22.6238"
                      fill="white"
                      transform="translate(53.4395 23.9746) rotate(15)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p class="text-center text-lg font-semibold mt-2">
              Chưa có phòng ban nào
            </p>
          </div>
          <div
            v-for="(item, index) in groups"
            v-else
            :key="index"
            :class="(item.id == groupId ? 'tab-active ' : '') + 'sidebar-tab'"
            @click="handleChooseGroup(item.id)"
          >
            <div class="d-flex align-center">
              <p class="icon-group">{{ item.img }}</p>
              <p class="ml-2">{{ item.title }}</p>
            </div>
            <v-icon
              icon="mdi-pencil"
              class="mr-2 text-xs"
              @click="handleToggleGroupForm"
            ></v-icon>
          </div>
        </div>
      </div>
      <GroupForm v-if="isOpenGroupForm" @close-form="handleToggleGroupForm" />
    </CommonSidebar>

    <div class="p-5 flex-1">
      <div class="text-end mb-4">
        <CommonFlatButton
          background-color="#28526e"
          color="white"
          class="btn-login mt-4"
          @click="handleCreateUser"
          >Thêm thành viên
        </CommonFlatButton>
      </div>
      <CreateUserForm
        v-if="isOpenFormCreateUser"
        @close-form="handleCreateUser"
      />
      <div class="d-flex align-center justify-between">
        <div class="d-flex align-center">
          <p class="font-semibold">Số lượng:</p>
          <p class="ml-2">
            {{ groupId == groupIdCommon ? listUser.length : users.length }}
            thành viên
          </p>
        </div>
        <div>
          <CommonTextSearch />
        </div>
      </div>
      <div class="box-users mt-5">
        <CommonUserList :items="groupId == groupIdCommon ? listUser : users" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MEMBERS } from '~/constants'
import { useOrganizationStore } from '~/stores/organization/organization-store'

const isOpenFormCreateUser = ref(false)
const organizationStore = useOrganizationStore()
const { listUser, listGroup } = storeToRefs(organizationStore)

const route = useRoute()
const organizationId = computed(() => Number(route.query.organizationId))
const groupId = computed(() => Number(route.query.groupId))

const isOpenGroupForm = ref(false)

const groups = computed(() => getGroups())
const users = computed(() => getUsers())

const groupIdCommon = ref()

onMounted(async () => {
  if (!listUser.value.length) {
    await organizationStore.getAllUserInOrganization(organizationId.value)
  }
  if (!listGroup.value.length) {
    await organizationStore.getAllGroupInOrganization(organizationId.value)
  }
  groupIdCommon.value = listGroup.value[0].id

  if (!groupId.value) {
    navigateTo({
      path: MEMBERS,
      query: {
        organizationId: organizationId.value,
        groupId: groupIdCommon.value,
      },
    })
  }
})

function handleCreateUser() {
  isOpenFormCreateUser.value = !isOpenFormCreateUser.value
}

function handleToggleGroupForm() {
  isOpenGroupForm.value = !isOpenGroupForm.value
}

const getGroups = () => {
  return listGroup.value?.map((item) => ({
    img: item.groupName.slice(0, 1),
    title: item.groupName === 'COMMON' ? 'Tất cả' : item.groupName,
    id: item.id,
  }))
}

const getUsers = () => {
  const data = listUser.value?.filter(
    (item) => Number(item.groupId) === groupId.value
  )

  return data
}

function handleChooseGroup(groupId: number) {
  navigateTo({
    path: MEMBERS,
    query: { organizationId: organizationId.value, groupId },
  })
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-add {
  background-color: #f2f2f5;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
}
// sidebar
.sidebar-tab {
  padding: 10px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.tab-active {
  background-color: #f2f2f2;
  border-radius: 10px;
}
.icon-group {
  background-color: #1ab675;
  padding: 0 8px;
  border-radius: 10px;
  color: white;
}
</style>
