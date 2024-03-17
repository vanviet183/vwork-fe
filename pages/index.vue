<template>
  <div class="common-padding">
    <div class="d-flex flex-wrap gap-4 test">
      <CommonCard
        v-for="item in listProjects"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        @click="goToProject(item.id)"
      >
      </CommonCard>
    </div>
  </div>
</template>
<script setup lang="ts">
const listProjects = ref([
  {
    id: '1',
    title: 'Project 1',
    subtitle: 'This is project 1',
  },
  {
    id: '2',
    title: 'Project 2',
    subtitle: 'This is project 2',
  },
  {
    id: '3',
    title: 'Project 3',
    subtitle: 'This is project 3',
  },
  {
    id: '4',
    title: 'Project 4',
    subtitle: 'This is project 4',
  },
  {
    id: '5',
    title: 'Project 5',
    subtitle: 'This is project 5',
  },
  {
    id: '6',
    title: 'Project 6',
    subtitle: 'This is project 6',
  },
  {
    id: '7',
    title: 'Project 7',
    subtitle: 'This is project 7',
  },
])

const goToProject = (idProject: string) => {
  navigateTo({ path: '/projects', query: { idProject } })
}
</script>
<style scoped lang="scss">
@use 'sass:map';
</style>
