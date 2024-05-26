<template>
  <div :class="'custom-task-require ' + customTaskRequire">
    <div>
      <div class="d-flex align-center justify-between">
        <div class="d-flex align-center">
          <v-icon
            v-show="props.important"
            icon="mdi-flag-variant"
            class="icon-important mr-2"
          ></v-icon>

          <p class="text-important font-semibold">
            {{ props.requireContent }}
          </p>
        </div>
        <div class="d-flex align-center">
          <p class="custom-progress-task-require mr-3">
            <CommonBoxOptions
              :title="getStatusTask(props.status)"
              icon="mdi-menu-down"
            >
              <div
                class="px-4 py-2 cursor-pointer"
                @click="handleStatusRequireTask(TASK_STATUS.NONE)"
              >
                Chưa thực hiện
              </div>
              <div
                class="px-4 py-2 cursor-pointer"
                @click="handleStatusRequireTask(TASK_STATUS.DOING)"
              >
                Đang thực hiện
              </div>
              <div
                class="px-4 py-2 cursor-pointer"
                @click="handleStatusRequireTask(TASK_STATUS.WAIT_ACCEPT)"
              >
                Chờ đánh giá
              </div>
              <div
                class="px-4 py-2 cursor-pointer"
                @click="handleStatusRequireTask(TASK_STATUS.COMPLETED)"
              >
                Đã hoàn thành
              </div>
            </CommonBoxOptions>
          </p>

          <div
            v-if="
              authenticationStore.role === ROLE.PROJECT_MANAGER ||
              authenticationStore.role === ROLE.TEAMLEAD
            "
          >
            <v-icon
              icon="mdi-pencil-outline"
              class="mr-2"
              @click="handleEditTaskRequire"
            ></v-icon>
            <v-icon
              icon="mdi-delete-outline"
              class="mr-1 custom-icon-delete"
              @click="handleDeleteTaskRequire"
            ></v-icon>
          </div>
        </div>
      </div>
      <div>
        <span class="font-semibold"> Người thực hiện: </span>
        <span> {{ props.listUserImplement }} </span>
      </div>
      <div class="my-2">
        <span class="font-semibold"> Ngày bắt đầu: </span>
        <span> {{ dayjs(props.startDate).format('DD/MM/YYYY') }} </span>
      </div>
      <div>
        <span class="font-semibold"> Ngày kết thúc: </span>
        <span> {{ dayjs(props.endDate).format('DD/MM/YYYY') }}</span>
      </div>
    </div>
    <TaskRequireForm
      v-if="isOpenTaskRequireEditForm"
      :mode="SCREEN_MODE.EDIT"
      :task-require-id="props.taskRequireId"
      @close-form="handleEditTaskRequire"
    />
    <CommonConfirmPopup
      :is-show-popup="isOpenConfirmDeleteTaskRequire"
      title="Bạn có chắc chắn muốn xóa yêu cầu công việc này không?"
      positive-title="Đồng ý"
      negative-title="Huỷ"
      :positive-action="handleAcceptDeleteTaskRequire"
      :negative-action="handleCancelDeleteTaskRequire"
    >
    </CommonConfirmPopup>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { ROLE, SCREEN_MODE, TASK_STATUS } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useTaskRequireStore } from '~/stores/task-require/task-require-store'
import { useTaskStore } from '~/stores/task/task-store'

const props = defineProps({
  taskRequireId: {
    type: Number,
    required: true,
  },
  important: {
    type: Boolean,
    required: true,
  },
  requireContent: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  listUserImplement: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

watch(
  () => props.status,
  () => {}
)

const route = useRoute()
const taskId = computed(() => Number(route.query.taskId))

const authenticationStore = useAuthorizationStore()
const taskRequireStore = useTaskRequireStore()
const taskStore = useTaskStore()

const isOpenConfirmDeleteTaskRequire = ref(false)
const isOpenTaskRequireEditForm = ref(false)

function handleDeleteTaskRequire() {
  isOpenConfirmDeleteTaskRequire.value = true
}

async function handleAcceptDeleteTaskRequire() {
  await taskRequireStore.deleteTaskRequire(props.taskRequireId)
  await taskStore.getAllTaskRequireInTask(taskId.value)

  isOpenConfirmDeleteTaskRequire.value = false
}

function handleCancelDeleteTaskRequire() {
  isOpenConfirmDeleteTaskRequire.value = false
}

function handleEditTaskRequire() {
  isOpenTaskRequireEditForm.value = !isOpenTaskRequireEditForm.value
}

async function handleStatusRequireTask(value: string) {
  await taskRequireStore.updateStatusTaskRequire(props.taskRequireId, value)
  await taskStore.getAllTaskRequireInTask(taskId.value)
  await taskStore.getTaskInfo(taskId.value)
}

const customTaskRequire = ref('')

function getStatusTask(status: string) {
  switch (status) {
    case TASK_STATUS.DOING:
      customTaskRequire.value = 'doing'
      return 'Đang thực hiện'
    case TASK_STATUS.COMPLETED:
      customTaskRequire.value = 'completed'
      return 'Đã hoàn thành'
    case TASK_STATUS.WAIT_ACCEPT:
      customTaskRequire.value = 'wait'

      return 'Đang chờ duyệt'
    default:
      return 'Chưa thực hiện'
  }
}
</script>
<style scoped lang="scss">
@use 'sass:map';

.custom-task-require {
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #f2f2f5;

  + .custom-task-require {
    margin-top: 12px;
  }
}
.icon-important,
.text-important {
  color: red;
}
.custom-progress-task-require {
  background-color: white;
  border-radius: 10px;
}
:deep(.v-selection-control--dirty) {
  color: green;
  opacity: 1;
}
.completed {
  background-color: #94ffd8;
}
.doing {
  background-color: #fde49e;
}
.wait {
  background-color: #a0deff;
}
</style>
