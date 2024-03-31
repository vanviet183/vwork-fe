<template>
  <CommonModalPopup :title="props.title" :is-show="props.isShowPopup">
    <slot></slot>
    <div class="flex flex-row justify-end mt-5">
      <CommonFlatButton
        class="mr-2.5"
        :color="colors['dark-liver']"
        @click="() => negativeAction()"
      >
        {{ props.negativeTitle }}
      </CommonFlatButton>
      <CommonFlatButton
        :background-color="colors['primary']"
        color="white"
        @click="() => positiveAction()"
      >
        {{ props.positiveTitle }}
      </CommonFlatButton>
    </div>
  </CommonModalPopup>
</template>

<script setup lang="ts">
import colors from '~/assets/scss/main.module.scss'

const props = defineProps({
  isShowPopup: {
    type: Boolean,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  positiveTitle: {
    type: String,
    required: true,
  },
  positiveAction: {
    type: Function,
    required: true,
  },
  negativeTitle: {
    type: String,
    default: 'キャンセル',
  },
  negativeAction: {
    type: Function,
    required: true,
  },
})
</script>
