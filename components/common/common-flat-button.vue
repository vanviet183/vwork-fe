<template>
  <v-btn
    v-if="props.disabled"
    readonly
    :class="'custom-button-readonly' + ($attrs.class ? ' ' + $attrs.class : '')"
    v-bind="$attrs"
  >
    <slot></slot>
  </v-btn>
  <v-btn
    v-else
    :variant="props.variant"
    :style="
      props.variant !== ButtonType.text
        ? {
            color: props.color,
            backgroundColor: props.backgroundColor,
          }
        : { color: colors['primary'] }
    "
    :class="props.variant !== ButtonType.text ? 'blur-x2' : ''"
    class="custom-button"
    v-bind="$attrs"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import colors from '~/assets/scss/main.module.scss'
import { ButtonType } from '~/constants'

const props = defineProps({
  color: {
    type: String,
    default: colors['rich-black'],
  },
  backgroundColor: {
    type: String,
    default: colors['slight-light-gray'],
  },
  variant: {
    type: String,
    default: ButtonType.flat,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
@use 'sass:map';

.custom-button-readonly {
  pointer-events: none;
  background: map.get($colors, 'slight-light-gray');
  color: map.get($colors, 'light-gray');
  box-shadow: none;
}
.custom-button,
.custom-button-readonly {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1px;
  padding: 6px 16px;
  text-align: center;
  height: 32px;
}
</style>
