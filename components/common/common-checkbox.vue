<template>
  <div class="custom-checkbox">
    <v-checkbox v-model="checkboxValue" v-bind="$attrs"></v-checkbox>
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
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const name = toRef(props, 'name')
const { value, errorMessage } = useField(name)
const checkboxValue = ref(value.value || props.defaultValue)

onMounted(() => {
  if (props.defaultValue) {
    checkboxValue.value = props.defaultValue
    value.value = checkboxValue.value
  }
})

watch(
  () => props.defaultValue,
  () => {
    if (props.defaultValue) {
      checkboxValue.value = props.defaultValue
    }
  }
)

watch(checkboxValue, () => {
  value.value = checkboxValue.value
})

watch(checkboxValue, (_) => {
  value.value = checkboxValue.value
  emit('change', checkboxValue.value)
})
</script>

<style lang="scss" scoped>
@use 'sass:map';

.custom-checkbox {
  margin-left: -8px;
  z-index: 10;
}

:deep(.v-input) {
  height: 48px;
}
:deep(.v-selection-control) {
  min-height: 48px;
}
:deep(.v-input__details) {
  display: none;
}
:deep(.v-selection-control__input:hover::before) {
  opacity: 0;
}
</style>
