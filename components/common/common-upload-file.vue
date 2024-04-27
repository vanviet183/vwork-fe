<template>
  <div v-if="props.readonly" class="relative custom-border">
    <p class="icon-wrapper">
      <v-icon icon="mdi-paperclip"></v-icon>
    </p>
    <div v-if="props.label" class="custom-label">{{ props.label }}</div>
    <div class="custom-csv-readonly w-[90%] pl-6">
      <p class="filename">{{ props.filename }}</p>
    </div>
  </div>

  <div v-else>
    <v-file-input
      v-model="value"
      class="file-input"
      accept="*"
      chips
      variant="outlined"
      prepend-inner-icon="mdi-paperclip"
      prepend-icon=""
      :color="colors['primary']"
      :clearable="false"
      v-bind:="$attrs"
      @click="$event.target.value = ''"
      @change="onChangeFile($event)"
    >
      <template #selection="{ fileNames }">
        <div class="custom-file-chips">
          <v-chip
            v-for="(fileName, index) in fileNames"
            :key="fileName"
            @click:close="deleteChip(index)"
          >
            {{ fileName }}
          </v-chip>
        </div>
      </template>
    </v-file-input>
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
    type: Array as PropType<File[]>,
    default: null,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  filename: {
    type: String,
    required: false,
    default: undefined,
  },
  csvUrl: {
    type: String,
    required: false,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  resetFlg: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { value, errorMessage } = useField<File[] | undefined>(props.name)

watch(
  () => props.defaultValue,
  () => {
    if (props.defaultValue) {
      value.value = props.defaultValue
    }
  }
)

watch(
  () => props.resetFlg,
  () => {
    value.value = undefined
  }
)

function onChangeFile(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    value.value = Array.from(target.files)
  }
  target.value = ''
}

function deleteChip(index: number) {
  // Prompt here with text if required
  value.value?.splice(index, 1)
}
</script>

<style scoped lang="scss">
@use 'sass:map';
.file-input {
  // pointer-events: none;
  :deep(.v-field__field) {
    min-height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :deep(.v-input__details) {
    display: none;
  }
  :deep(.v-field-label) {
    font-family: 'Roboto', sans-serif;
  }
  :deep(.v-field__input) {
    color: map.get($colors, 'text-color');
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    min-height: 48px;
    line-height: 18px;
    letter-spacing: 0.5px;
  }
  .custom-file-chips {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: contents;
  }
}
:deep(.v-chip__close) {
  pointer-events: all;
}
:deep(.v-file-input input[type='file']) {
  cursor: pointer;
}
.custom-border {
  border-bottom: 1px solid map.get($colors, 'light-gray');
}
.custom-csv-readonly {
  font-size: 16px;
  height: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;
  word-wrap: break-word;
  margin: 2px 4px;
  cursor: pointer;
}
.icon-wrapper {
  position: absolute;
  bottom: 2px;
  left: 2px;
  font-weight: 700;
  color: map.get($colors, 'dim-gray');
}
:deep(.v-field__append-inner) {
  color: map.get($colors, 'dim-gray');
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
  opacity: 1;
}
:deep(.v-label.v-field-label--floating) {
  --v-field-label-scale: 0.625em;
  transform: translateY(-50%) translateY(-3px);
  color: map.get($colors, 'dim-gray');
  letter-spacing: 1.5px;
}
.custom-label {
  color: map.get($colors, 'dim-gray');
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0px 4px 4px;
  opacity: 0.6;
  letter-spacing: 1.5px;
}
:deep(.v-field__outline) {
  --v-field-border-opacity: 1;
}
:deep(.v-chip__content) {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.filename {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 36px;
  color: inherit;
}
.error-message {
  color: red;
  margin-top: 6px;
  font-size: 12px;
}
</style>
