<template>
  <div class="box-info">
    <div class="box1">
      <div>
        <v-icon :icon="props.icon" class="icon-nav"></v-icon>
        <span class="ml-4">{{ props.title }}</span>
      </div>
      <CommonFlatButton>
        <v-icon icon="mdi-pencil"></v-icon>
        <span>Chinh sua</span>
      </CommonFlatButton>
    </div>
    <div class="box2">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>
<style scoped lang="scss">
@use 'sass:map';

.box-info {
  background-color: white;
  border-radius: 8px;
}
.box1,
.box2 {
  padding: 20px;
}
.box1 {
  border-left: 4px solid #0050b3;
  border-top-left-radius: 8px;
  border-bottom: 1px solid #f2f2f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
