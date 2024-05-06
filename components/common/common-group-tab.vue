<template>
  <div :class="'custom-tab-list' + ($attrs.class ? ' ' + $attrs.class : '')">
    <div
      v-for="item in items"
      :key="item.value"
      :class="
        'custom-tab-item d-flex align-center justify-center' +
        (selectedValue === item.value ? ' active' : '')
      "
      :style="{
        color: selectedValue === item.value ? 'white' : '',
        backgroundColor: selectedValue === item.value ? colors['primary'] : '',
      }"
      @click="selectTab(item.value)"
    >
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import colors from '~/assets/scss/main.module.scss'
import type { Tab } from '~/models/interface/common/tab'

const emit = defineEmits(['change'])

const props = defineProps({
  items: {
    type: Array<Tab>,
    required: true,
  },
  defaultValue: {
    type: Number,
    required: true,
  },
})

const selectedValue = ref(props.defaultValue)

watch(
  () => props.defaultValue,
  () => {
    selectedValue.value = props.defaultValue
  }
)

function selectTab(value: number) {
  selectedValue.value = value
}

watch(selectedValue, (_) => {
  emit('change', selectedValue.value)
})
</script>

<style lang="scss">
@use 'sass:map';
.custom-tab-list {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background-color: map.get($colors, 'seashell-white');
  border-radius: 4px;

  .custom-tab-item {
    width: max-content;
    font-style: normal;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 999px;
    background: white;
    flex: 1 1 auto;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }
  .custom-tab-item.active {
    background: map.get($colors, 'primary');
    color: white;
  }
  .custom-tab-item.disable {
    background-color: map.get($colors, 'seashell-white') !important;
    color: map.get($colors, 'light-silver');
    pointer-events: none;
    border-radius: 0;
  }
}
</style>
