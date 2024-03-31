<template>
  <v-menu :close-on-content-click="prop.isCloseOnContent">
    <template #activator="{ props }">
      <div class="cursor-pointer edit-more" v-bind="props">
        <div v-if="prop.isAvatar" class="avatar">
          <v-avatar
            :image="Avatar"
            size="42"
            class="cursor-pointer"
            @click="() => {}"
          ></v-avatar>
          <v-icon icon="mdi-menu-down" class="ml-1"></v-icon>
        </div>
        <div v-else class="title px-2 py-2">
          <v-icon :icon="prop.icon" class="mr-2"></v-icon>
          <span v-if="prop.title">{{ prop.title }}</span>
        </div>
      </div>
    </template>
    <div class="options-container blur-x8"><slot></slot></div>
  </v-menu>
</template>

<script setup lang="ts">
import Avatar from '~/assets/img/avatar.jpeg'

const prop = defineProps({
  isAvatar: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: 'mdi-dots-vertical',
  },
  title: {
    type: String,
    default: '',
  },
  isCloseOnContent: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped lang="scss">
@use 'sass:map';
.edit-more {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: fit-content;
  max-height: 356px;
  // aspect-ratio: 1/1;
}
.avatar:hover {
  // border-radius: 50%;
  background-color: map.get($colors, 'light-silver');
}
.title:hover {
  border-radius: 10px;
  background-color: map.get($colors, 'light-silver');
}
.options-container {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.2);
}
</style>
