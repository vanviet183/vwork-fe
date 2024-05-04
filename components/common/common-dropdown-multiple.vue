<template>
  <div>
    <v-select
      v-if="props.readonly"
      :items="props.listValue"
      :item-title="props.itemLabel"
      :model-value="value"
      v-bind="$attrs"
      readonly
      density="compact"
      variant="underlined"
      multiple
      class="custom-dropdown-readonly"
    >
    </v-select>

    <div v-else>
      <v-select
        v-model="selectedOption"
        :items="props.listValue"
        :color="colors['primary']"
        :item-title="props.itemLabel"
        v-bind="$attrs"
        variant="outlined"
        multiple
        density="compact"
        return-object
      >
        <template #prepend-item>
          <div
            v-if="props.listValue && props.listValue.length > 0"
            class="flex flex-row items-center px-1 select-item"
            @click="toggleSelectAll"
          >
            <div>
              <v-checkbox
                readonly
                :indeterminate="isSelectSomeItems() && !isSelectAllItems()"
                :model-value="isSelectSomeItems()"
                :color="colors['primary']"
              ></v-checkbox>
            </div>
            <div class="align-middle unselect-item-label">
              {{ selectAllLabel }}
            </div>
          </div>
        </template>
        <template #item="{ item }">
          <div
            class="flex flex-row items-center px-1 select-item"
            :class="{ selected: checkIsSelected(item.value) }"
            @click="addOrRemoveItem(item.value)"
          >
            <div>
              <v-checkbox
                readonly
                :model-value="checkIsSelected(item.value)"
                :color="colors['primary']"
              ></v-checkbox>
            </div>
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
        <!-- <template #selection="{ item, index }">
          <div
            v-if="selectedOption?.length === props.listValue.length"
            class="selection-label"
          >
            <div v-if="index < 1">{{ selectAllLabel }}</div>
          </div>
          <div v-else>
            <span v-if="index < 1" class="selection-label">{{
              item.title
            }}</span>
            <span
              v-if="index === 1"
              class="text-grey text-caption align-self-center"
            >
              <v-chip size="small">
                +{{ (selectedOption ?? []).length - 1 }}
              </v-chip>
            </span>
          </div>
        </template> -->
      </v-select>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
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
  listValue: {
    type: Array<any>,
    required: true,
  },
  selectAllLabel: {
    type: String,
    default: 'Chọn tất cả',
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  defaultValue: {
    type: Array<any>,
    required: false,
    default: undefined,
  },
})

const { value, errorMessage } = useField<any>(props.name)
const selectedOption = ref(props.defaultValue)

onMounted(() => {
  if (props.defaultValue) {
    selectedOption.value = props.defaultValue
    value.value = selectedOption.value
  } else {
    selectedOption.value = value.value as any[]
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
  if (selectedOption.value?.length === 0) {
    value.value = undefined
  } else {
    value.value = selectedOption.value
  }
  if (selectedOption.value !== props.defaultValue) {
    emit('change', selectedOption.value)
  }
})

function isSelectAllItems() {
  return (selectedOption.value ?? []).length === props.listValue.length
}

function isSelectSomeItems() {
  return (selectedOption.value ?? []).length > 0
}

function toggleSelectAll() {
  if (isSelectAllItems()) {
    selectedOption.value = []
  } else {
    selectedOption.value = props.listValue.slice()
  }
}

function addOrRemoveItem(item: any) {
  const jsonSelectedOptions =
    selectedOption.value?.map((element) => {
      return JSON.stringify(element)
    }) ?? []
  const jsonItem = JSON.stringify(item)
  if (jsonSelectedOptions?.includes(jsonItem)) {
    const jsonFilteredOptions = jsonSelectedOptions?.filter(
      (element) => element !== jsonItem
    )
    const newOptions = jsonFilteredOptions.map((element) => {
      return JSON.parse(element)
    })
    selectedOption.value = [...newOptions]
  } else {
    const newOptions = _.cloneDeep(selectedOption.value ?? [])
    newOptions.push(item)
    selectedOption.value = newOptions
  }
}

function checkIsSelected(item: any): boolean {
  const jsonSelectedOptions = JSON.stringify(selectedOption.value)
  const jsonItem = JSON.stringify(item)
  if (jsonSelectedOptions?.includes(jsonItem)) {
    return true
  }
  return false
}
</script>

<style scoped lang="scss">
@use 'sass:map';
.custom-dropdown-readonly {
  pointer-events: none;
}
.selection-label {
  line-height: 20px;
  color: map.get($colors, 'rich-black');
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
  flex-wrap: nowrap;
  clip-path: fill-box;
}
:deep(.v-select__selection-text) {
  color: map.get($colors, 'rich-black') !important;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
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
:deep(.v-selection-control__input > .mdi-checkbox-blank-outline) {
  color: map.get($colors, 'dim-gray');
  opacity: 1;
}
.select-item {
  cursor: pointer;
}
.select-item:hover {
  background-color: map.get($colors, 'very-light-gray');
}
.selected {
  background-color: map.get($colors, 'primary-variant') !important;
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
</style>
