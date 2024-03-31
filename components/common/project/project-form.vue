<template>
  <CommonConfirmPopup
    :is-show-popup="true"
    :title="props.mode === SCREEN_MODE.EDIT ? 'Edit' : 'Create'"
    :positive-title="props.mode === SCREEN_MODE.EDIT ? 'Edit' : 'Create'"
    negative-title="Cancel"
    :positive-action="onSubmit"
    :negative-action="onCancel"
  >
    <form class="form-container">
      <p class="mb-2">Tên dự án</p>
      <CommonTextField name="name" label="" autofocus @keypress.enter.prevent />

      <p class="mt-4 mb-2">Mô tả dự án</p>
      <CommonTextarea
        name="description"
        label=""
        class="custom-textarea-padding"
      />
    </form>
  </CommonConfirmPopup>
</template>

<script setup lang="ts">
import { SCREEN_MODE } from '~/constants'

const emit = defineEmits(['close-form'])

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  tipId: {
    type: String,
    default: undefined,
  },
})

function onCancel() {
  emit('close-form')
}

function onSubmit() {
  console.log('submit')
}
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
