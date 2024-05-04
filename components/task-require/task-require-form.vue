<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="
      props.mode === SCREEN_MODE.EDIT
        ? 'Sửa yêu cầu công việc'
        : 'Thêm yêu cầu công việc'
    "
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Sửa ' : 'Thêm'"
    negative-title="Huỷ"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <p class="mb-2">Nội dung yêu cầu công việc</p>
      <CommonTextarea name="requireContent" class="custom-textarea-padding" />

      <CommonCheckbox name="important" label="Quan trọng" class="mt-1" />
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { MAX_LENGTH_INPUT, SCREEN_MODE } from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useTaskRequireStore } from '~/stores/task-require/task-require-store'
import { useTaskStore } from '~/stores/task/task-store'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: SCREEN_MODE.NEW,
  },
})

const taskRequireStore = useTaskRequireStore()
const taskStore = useTaskStore()
const authenticationStore = useAuthorizationStore()

const route = useRoute()
const taskId = computed(() => Number(route.query.taskId))

const schemaValidate = () => {
  const validate: { [key: string]: any } = {
    requireContent: string().trim().required().max(MAX_LENGTH_INPUT),
    important: boolean().required(),
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

    const result = await taskRequireStore.createTaskRequire(
      taskId.value,
      values.requireContent,
      values.important
    )
    if (result) {
      await taskStore.getAllTaskRequireInTask(taskId.value)
    }
    emit('close-form')
  },
  (err) => {
    console.log(err)
  }
)
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
