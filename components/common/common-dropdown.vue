<template>
  <div>
    <v-select
      v-if="props.readonly"
      :items="props.items"
      :model-value="!value || value === '' ? '--' : value"
      density="compact"
      v-bind="$attrs"
      readonly
      variant="underlined"
      class="custom-dropdown-readonly"
    />

    <div v-else>
      <v-select
        ref="select"
        v-model="selectedOption"
        :items="props.items"
        :color="colors['primary']"
        density="compact"
        v-bind="$attrs"
        :item-title="props.itemLabel"
        variant="outlined"
        return-object
      >
        <template #item="{ item }">
          <div
            class="flex flex-row items-center px-4 select-item"
            :class="{ selected: checkIsSelected(item.value) }"
            @click="selectItem(item.value)"
          >
            <div
              :class="
                'align-middle ' +
                (checkIsSelected(item.value)
                  ? 'select-item-label'
                  : 'unselect-item-label')
              "
            >
              {{ item.value[props.itemLabel] }}
            </div>
          </div>
        </template>
      </v-select>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
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
  itemLabel: {
    type: String,
    required: true,
  },
  items: {
    type: Array<any>,
    required: true,
  },
  defaultValue: {
    type: Object as PropType<any>,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { value, errorMessage } = useField<any>(props.name)
const selectedOption = ref(props.defaultValue)
const select = ref<any>(null)

onMounted(() => {
  if (props.defaultValue) {
    selectedOption.value = props.defaultValue
    value.value = selectedOption.value
  } else {
    selectedOption.value = value.value
  }
})

watch(
  () => props.defaultValue,
  () => {
    if (props.defaultValue) {
      selectedOption.value = props.defaultValue
      value.value = selectedOption.value
    }
  }
)

watch(selectedOption, (_) => {
  value.value = selectedOption.value
  if (selectedOption.value !== props.defaultValue) {
    emit('change', selectedOption.value)
  }
})

function selectItem(item: any) {
  selectedOption.value = item
  select.value.blur()
}

function checkIsSelected(item: any): boolean {
  const jsonSelectedOptions = JSON.stringify(selectedOption.value)
  const jsonItem = JSON.stringify(item)
  return jsonSelectedOptions === jsonItem
}
</script>

<style scoped lang="scss">
@use 'sass:map';
.custom-dropdown-readonly {
  pointer-events: none;
}
:deep(.v-input__details) {
  display: none;
}
:deep(.v-select__menu-icon) {
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
  padding: 12px;
  height: 48px;
  opacity: 1;
}
:deep(.v-select__selection-text) {
  color: map.get($colors, 'rich-black') !important;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.5px;
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
.select-item-label {
  color: map.get($colors, 'primary');
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;
}
.unselect-item-label {
  color: map.get($colors, 'rich-black');
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;
}
.select-item {
  cursor: pointer;
  padding: 12px;
}
.select-item:hover {
  background-color: map.get($colors, 'very-light-gray');
}
.selected {
  background-color: map.get($colors, 'primary-variant') !important;
}
.custom-icon-tip {
  width: 100px;
  height: 20px;
}
.custom-save-effect {
  min-height: 24px;
}
</style>
