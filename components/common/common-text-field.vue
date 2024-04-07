<template>
  <div v-if="props.readonly" class="custom-border">
    <div class="custom-text-field-readonly-title">
      {{ $attrs.label }}
    </div>

    <div class="custom-text-field-readonly flex justify-between">
      <span>
        {{ !textValue || textValue === '' ? '--' : textValue }}
      </span>
      <slot></slot>
    </div>
  </div>

  <div v-else>
    <v-text-field
      v-model="textValue"
      v-bind="$attrs"
      variant="outlined"
      density="compact"
      clearable
      clear-icon="mdi-close"
      :color="colors['primary']"
      :value="textValue"
    >
    </v-text-field>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import colors from '~/assets/scss/main.module.scss'
const emit = defineEmits(['change'])

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: [String, Number],
    required: false,
    default: null,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const name = toRef(props, 'name')
const { value, errorMessage } = useField(name)
const textValue = ref(value.value || props.defaultValue)

watch(
  () => props.defaultValue,
  () => {
    if (props.defaultValue) {
      textValue.value = props.defaultValue
    }
  }
)

watch(textValue, () => {
  value.value = textValue.value
})

watch(textValue, (_) => {
  value.value = textValue.value
  emit('change', textValue.value)
})
</script>

<style lang="scss" scoped>
@use 'sass:map';
.custom-text-field-readonly-title {
  color: map.get($colors, 'dim-gray');
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0px 4px 4px;
  opacity: 0.6;
  letter-spacing: 1.5px;
}
.custom-text-field-readonly {
  color: map.get($colors, 'rich-black');
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;
  word-wrap: break-word;
  margin: 0px 4px;
}
:deep(.v-field--variant-outlined) {
  color: map.get($colors, 'light-gray');
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;
}
:deep(.v-field--variant-outlined:hover) {
  color: map.get($colors, 'dim-gray');
}
:deep(.v-field__input) {
  color: map.get($colors, 'rich-black');
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.5px;
  height: 48px;
  padding: 12px;
  opacity: 1;
}
:deep(.v-text-field .v-input__details) {
  display: none;
}
:deep(.v-label.v-field-label--floating) {
  --v-field-label-scale: 0.625em;
  transform: translateY(-50%);
  letter-spacing: 1.5px;
  opacity: 1;
}
:deep(.v-field__outline) {
  --v-field-border-opacity: 1;
}
:deep(.v-field__clearable .v-icon) {
  opacity: 1;
}
.custom-text-field {
  margin: auto;
  margin-right: 0;
  :deep(.v-field__input) {
    padding-right: 50px;
  }
  :deep(.v-field__clearable) {
    margin-right: 40px;
  }
}
.unit-input {
  position: absolute;
  top: 10px;
  right: 12px;
  font-weight: 700;
  color: map.get($colors, 'dim-gray');
}
.error-message {
  color: map.get($colors, 'red-rose');
  margin-top: 6px;
}
.custom-border {
  border-bottom: 1px solid map.get($colors, 'light-gray');
}
.custom-icon-tip {
  height: 20px;
  width: 20px;
}
</style>
