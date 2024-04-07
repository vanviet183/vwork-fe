<template>
  <div class="d-flex align-center justify-between">
    <div class="d-flex align-center">
      <v-avatar
        :image="Avatar"
        size="32"
        class="cursor-pointer"
        @click="() => {}"
      ></v-avatar>
      <p>Vitcon123</p>
    </div>
    <div>
      <p>60%</p>
      <v-progress-linear model-value="60" color="green"></v-progress-linear>
      <p>3/5</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from '~/assets/img/avatar.jpeg'
</script>
<style scoped lang="scss"></style>
