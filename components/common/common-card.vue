<template>
  <div class="cursor-pointer">
    <v-card
      class="mx-auto card-item p-2"
      width="300"
      height="300"
      :v-bind="$attrs"
    >
      <div class="px-4 card-title">
        <div class="d-flex justify-between">
          <p class="project-title my-2 h-[56px]">
            {{ props.title }}
          </p>
          <div class="mr-[-16px]">
            <CommonBoxOptions>
              <div class="box-options">
                <div class="option-item" @click="handleEditProject">
                  <p>Sửa dự án</p>
                </div>
                <div class="option-item" @click="handleDeleteProject">
                  <p>Xoá dự án</p>
                </div>
              </div>
            </CommonBoxOptions>
          </div>
        </div>
        <CommonConfirmPopup
          :is-show-popup="isOpenConfirmDelete"
          title="Bạn có chắc chắn muốn xóa dự án này không?"
          positive-title="Đồng ý"
          negative-title="Huỷ"
          :positive-action="handleDelete"
          :negative-action="handleCancelDelete"
        >
        </CommonConfirmPopup>
        <div class="author-info pb-2">
          <img
            :src="props.avatar"
            class="h-[40px] cursor-pointer avatar"
            alt="Vwork Logo"
          />
          <span class="ml-2">
            {{ props.author }}
          </span>
        </div>
      </div>
      <div class="h-[58%] d-flex flex-col justify-between">
        <div>
          <div class="mt-3 ml-3">
            <p class="description">
              {{ props.description }}
            </p>
          </div>
          <div class="mt-2 ml-3">
            <p class="duration-start text-sm">
              <span class="font-semibold">Ngay bat dau: </span>
              <span>{{ props.startDate }}</span>
            </p>
            <p class="duration-end text-sm mt-2">
              <span class="font-semibold">Ngay ket thuc: </span>
              <span>{{ props.endDate }}</span>
            </p>
          </div>
        </div>

        <div class="d-flex align-center justify-end px-4 mb-2">
          <p class="amount-task">
            {{ props.amountTask ?? 0 }}
          </p>
          <p v-if="props.percent || props.percent === 0" class="percentage">
            {{ `${props.percent}%` }}
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useOrganizationStore } from '~/stores/organization/organization-store'
import { useProjectStore } from '~/stores/project/project-store'

const projectStore = useProjectStore()
const organizationStore = useOrganizationStore()

const route = useRoute()
const organizationId = computed(() => Number(route.query.organizationId))

const props = defineProps({
  projectId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  percent: {
    type: Number,
    required: false,
    default: undefined,
  },
  amountTask: {
    type: Number,
    required: false,
    default: undefined,
  },
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '#FFE7E7',
  },
  color: {
    type: String,
    default: '#333',
  },
  isWait: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isOpenConfirmDelete = ref(false)

const handleEditProject = () => {
  console.log('Edit project')
}

const handleDeleteProject = () => {
  isOpenConfirmDelete.value = true
}

async function handleDelete() {
  await projectStore.deleteProject(props.projectId)
  await organizationStore.getAllProjectsInOrganization(organizationId.value)
  isOpenConfirmDelete.value = false
}

function handleCancelDelete() {
  isOpenConfirmDelete.value = false
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.card-item {
  border: 1px solid orange;
}
.card-title {
  background-color: v-bind(backgroundColor);
  color: v-bind(color);
}
.author-info {
  border-bottom: 1px solid #f2f2f5;
  display: flex;
  align-items: center;
  justify-content: start;
}
.project-title {
  font-size: 18px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep(.v-card) {
  border-radius: 12px;
}
.amount-task {
  padding: 2px 8px;
  background-color: #ffe7e7;
  border-radius: 8px;
  font-weight: 600;
  color: red;
}
.percentage {
  font-weight: 600;
  margin-left: 8px;
}
.box-options {
  padding: 8px 0;
  width: max-content;
}
.option-item {
  padding: 4px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f5;
  }
}
.description {
  color: gray;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 48px;
}
</style>
