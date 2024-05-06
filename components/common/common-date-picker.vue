<template>
  <div class="container">
    <el-date-picker
      v-model="selectedDate"
      class="custom-date-picker"
      format="DD/MM/YYYY"
      v-bind="$attrs"
      type="date"
      size="large"
      :editable="false"
      :clearable="false"
    >
    </el-date-picker>
    <div v-if="props.title.trim() !== ''" class="title-container">
      <div class="title">
        {{ props.title.trim() }}
      </div>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const emit = defineEmits(['change'])

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: Object as PropType<any>,
    default: new Date(),
  },
  title: {
    type: String,
    default: '',
  },
})

const { value, errorMessage } = useField(props.name)
const selectedDate = ref<Date>(props.defaultValue)

onMounted(() => {
  if (props.defaultValue) {
    selectedDate.value = props.defaultValue
    value.value = selectedDate.value
  } else {
    selectedDate.value = value.value as Date
  }
})

watch(
  () => props.defaultValue,
  () => {
    if (props.defaultValue) {
      selectedDate.value = props.defaultValue
      value.value = selectedDate.value
    }
  }
)

watch(selectedDate, (_) => {
  value.value = selectedDate.value
  if (selectedDate.value !== props.defaultValue) {
    emit('change', selectedDate.value)
  }
})
</script>
<style lang="scss" scoped>
@use 'sass:map';
.title-container {
  height: 0px;
  position: relative;
  top: -56px;
  left: 13px;
  font-size: 10px;
  width: fit-content;
}
.title {
  color: map.get($colors, 'neutral-gray');
  background-color: white;
  padding-left: 3px;
  padding-right: 3px;
  letter-spacing: 1.5px;
}
.container {
  :deep(.el-date-editor.el-input) {
    width: 100%;
    padding: 2px;
  }
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border: 1px solid map.get($colors, 'light-gray');
  }
  :deep(.el-input__wrapper:hover) {
    box-shadow: none;
    border: 1px solid map.get($colors, 'dim-gray');
  }
  .custom-date-picker:has(.el-input__wrapper.is-focus)
    + .title-container
    .title {
    color: map.get($colors, 'primary');
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
    outline: 2px solid map.get($colors, 'primary');
    border-color: transparent;
  }
  :deep(.el-date-editor--date) {
    height: 48px;
  }
  :deep(.el-input__inner) {
    color: map.get($colors, 'rich-black');
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
}
:deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: transparent;
}
:deep(.el-input.is-disabled .el-input__inner) {
  cursor: default;
}
:deep(.el-input.is-disabled .el-input__icon) {
  cursor: default;
}
:deep(.el-input__wrapper) {
  cursor: default;
}
.error-message {
  color: map.get($colors, 'red-rose');
}
</style>
