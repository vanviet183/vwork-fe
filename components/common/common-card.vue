<template>
  <div class="cursor-pointer">
    <v-card
      class="mx-auto card-item p-2"
      width="300"
      height="180"
      :v-bind="$attrs"
    >
      <div class="px-4 card-title">
        <div class="d-flex align-center justify-between">
          <p class="project-title py-2 w-[86%]">
            {{ props.title }}
          </p>
          <v-icon icon="mdi-dots-vertical" class="mr-[-6px]"></v-icon>
        </div>
        <div class="author-info pb-2">
          <v-avatar
            :image="Avatar"
            size="32"
            class="cursor-pointer"
            @click="() => {}"
          ></v-avatar>
          <span class="ml-2">
            {{ props.subtitle }}
          </span>
        </div>
      </div>
      <div class="h-[50%] d-flex flex-col justify-between">
        <div class="mt-3 d-flex align-center">
          <v-icon
            v-if="props.taskPrioritize"
            icon="mdi-alert-circle"
            class="mx-2"
          ></v-icon>
          <span class="task-prioritize">{{ props.taskPrioritize }}</span>
        </div>
        <div class="d-flex align-center justify-end px-4 mb-2">
          <p
            v-if="props.amountTask || props.amountTask === 0"
            class="amount-task"
          >
            {{ props.amountTask }}
          </p>
          <p v-if="props.percent" class="percentage">
            {{ `${props.percent}%` }}
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import Avatar from '~/assets/img/avatar.jpeg'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  percent: {
    type: String,
    required: false,
    default: '',
  },
  amountTask: {
    type: Number,
    required: true,
  },
  taskPrioritize: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '#FFE7E7',
  },
  color: {
    type: String,
    default: '#333',
  },
})
</script>
<style scoped lang="scss">
@use 'sass:map';

.card-item {
  border: 1px solid orange;
}
.card-title {
  background-color: v-bind(backgroundColor);
  color: v-bind(color);
}
.author-info {
  border-bottom: 1px solid #f2f2f5;
}
.project-title {
  font-size: 18px;
  font-weight: 600;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep(.v-card) {
  border-radius: 12px;
}
.amount-task {
  padding: 2px 8px;
  background-color: #ffe7e7;
  border-radius: 8px;
  font-weight: 600;
  color: red;
}
.percentage {
  font-weight: 600;
  margin-left: 8px;
}
.task-prioritize {
  color: red;
  font-weight: 600;
}
</style>
