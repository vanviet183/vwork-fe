<template>
  <v-menu>
    <template #activator="{ props }">
      <div class="cursor-pointer edit-more" v-bind="props">
        <div v-if="prop.isAvatar">
          <v-avatar
            :image="Avatar"
            size="42"
            class="cursor-pointer"
            @click="() => {}"
          ></v-avatar>
          <v-icon icon="mdi-menu-down" class="ml-1"></v-icon>
        </div>
        <v-icon v-else :icon="prop.icon" class="m-3"></v-icon>
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
})
</script>

<style scoped lang="scss">
@use 'sass:map';
.edit-more {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: fit-content;
  aspect-ratio: 1/1;
}
.edit-more:hover {
  border-radius: 50%;
  background-color: map.get($colors, 'light-silver');
}
.options-container {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
