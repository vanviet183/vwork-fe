<template>
  <div v-if="props.readonly" class="custom-border">
    <v-textarea
      :model-value="!textValue || textValue === '' ? '--' : textValue"
      v-bind="$attrs"
      readonly
      no-resize
      class="custom-text-area-readonly"
      variant="plain"
    />
  </div>

  <div v-else>
    <v-textarea
      v-model="textValue"
      v-bind="$attrs"
      variant="outlined"
      no-resize
      clearable
      clear-icon="mdi-close"
      :color="colors['primary']"
      :value="textValue"
      class="custom-text-area"
    >
    </v-textarea>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import colors from '~/assets/scss/main.module.scss'

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

watch(textValue, (_) => {
  value.value = textValue.value
})
</script>

<style scoped lang="scss">
@use 'sass:map';
:deep(.v-input__details) {
  display: none;
}
:deep(.v-textarea) {
  color: map.get($colors, 'light-gray');
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;
}
:deep(.v-textarea:hover) {
  color: map.get($colors, 'dim-gray');
}
:deep(.v-field__input) {
  color: map.get($colors, 'rich-black');
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;
  opacity: 1;
  padding-left: 12px;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent
      calc(var(--v-field-padding-top, 0) + var(--v-input-padding-top, 0) - 6px),
    black
      calc(var(--v-field-padding-top, 0) + var(--v-input-padding-top, 0) - 6px)
  );
}
:deep(.v-field__outline) {
  --v-field-border-opacity: 1;
}
:deep(.v-field__clearable) {
  padding-top: 12px;
}
:deep(.v-field__clearable .v-icon) {
  opacity: 1;
}
.custom-text-area {
  :deep(.v-label.v-field-label--floating) {
    --v-field-label-scale: 0.625em;
    transform: translateY(-50%);
    letter-spacing: 1.5px;
    opacity: 1;
  }
}
.custom-text-area-readonly {
  :deep(.v-label.v-field-label--floating) {
    --v-field-label-scale: 0.625em;
    color: map.get($colors, 'dim-gray');
    letter-spacing: 1.5px;
  }
  :deep(.v-field__input) {
    padding-left: 0;
  }
}
.custom-border {
  border-bottom: 1px solid map.get($colors, 'light-gray');
}
</style>
