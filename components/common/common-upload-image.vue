<template>
  <div>
    <div v-if="props.readonly">
      <div class="label-file-input-readonly ml-1">
        <span class="custom-opacity-label">
          {{ props.label }}
        </span>
      </div>
      <div
        class="file-input-container-readonly"
        :style="`height: ${heightReadonly}px`"
      >
        <img
          :src="defaultValue?.length ? defaultValue : noImage"
          class="image-preview w-[120px] h-[120px]"
          v-bind="$attrs"
        />
      </div>
      <div class="divider"></div>
    </div>

    <div
      v-else
      class="file-input-container custom-border-img"
      :style="`height: ${heightPreview}px`"
    >
      <p class="label-file-input">
        <span class="custom-opacity-label">
          {{ props.label }}
        </span>
      </p>
      <input
        ref="fileInput"
        type="file"
        accept=".jfif, .ico, .gif, .jpeg, .jpg, .webp, .png, .bmp, .pjpeg, .apng"
        @change="chooseImage"
      />
      <img
        v-if="previewImage"
        :src="previewImage"
        :model-value="previewImage"
        v-bind="$attrs"
        class="image-preview w-[120px] h-[120px]"
      />
      <img
        v-else-if="defaultValue"
        :src="defaultValue"
        class="image-preview w-[120px] h-[120px]"
        v-bind="$attrs"
      />
      <v-icon class="icon-file" icon="mdi-paperclip"></v-icon>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import noImage from '~/assets/img/no-image-available.jpg'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  defaultValue: {
    type: String,
    required: false,
    default: undefined,
  },
  heightPreview: {
    type: Number,
    default: 324,
  },
  heightReadonly: {
    type: Number,
    default: 257,
  },
})

const { value, errorMessage } = useField<File>(props.name)
const previewImage = ref()

function chooseImage(event: any) {
  const file = event.target.files[0]
  if (file) {
    value.value = file
  }
}

watch(value, () => {
  if (value.value) {
    const reader = new FileReader()
    reader.onload = () => {
      previewImage.value = reader.result
    }
    reader.onerror = () => {
      previewImage.value = undefined
    }
    reader.readAsDataURL(value.value)
  } else {
    previewImage.value = undefined
  }
})
</script>

<style scoped lang="scss">
@use 'sass:map';

.label-file-input-readonly {
  color: map.get($colors, 'sonic-silver');
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: normal;
  letter-spacing: 1.5px;
}
.custom-opacity-label {
  opacity: 0.6;
}
.file-input-container-readonly {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.divider {
  height: 1px;
  background-color: map.get($colors, 'light-gray');
}
.image-preview {
  object-fit: contain;
  object-position: center;
}
.file-input-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
}
.file-input-container:hover {
  border: 1px solid map.get($colors, 'dim-gray');
}

.custom-border-img {
  border: 1px solid map.get($colors, 'light-gray');
  border-radius: 4px;
}
.label-file-input {
  position: absolute;
  top: -8px;
  left: 12px;
  color: map.get($colors, 'sonic-silver');
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  padding: 0px 2px;
  background-color: white;
  letter-spacing: 1.5px;
}

input[type='file'] {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 10;
}
.icon-file {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 0;
}
</style>
