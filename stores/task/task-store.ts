import { Task } from '~/models/class/common/task'
import { CreateTaskRequest } from '~/models/class/tasks/create-task/create-task-request'
import { GetAllTaskInProjectRequest } from '~/models/class/tasks/get-all-task-in-project/get-all-task-in-project-request'
import { GetTaskInfoRequest } from '~/models/class/tasks/get-task-info/get-task-info-request'
import {
  createTaskApi,
  getAllTaskInProjectApi,
  getTaskInfoApi,
} from '~/services/task/task-service'

export const useTaskStore = defineStore('task', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  // const listTask = ref([
  //   {
  //     id: '1',
  //     title: 'Công việc 1',
  //     user: {
  //       avatar:
  //         'https://i.pinimg.com/736x/6d/44/61/6d446105361e83b1013aa9e349574ab0.jpg',
  //       email: 'email1',
  //     },
  //     status: 1,
  //     time: '3 ngày',
  //     prioritize: 1,
  //     relatedTasks: {
  //       before: {},
  //       after: {},
  //     },
  //   },
  //   {
  //     id: '2',
  //     title: 'Công việc 2',
  //     user: {
  //       avatar: 'img1',
  //       email: 'email1',
  //     },
  //     status: 0,
  //     time: '3 ngày',
  //     prioritize: 1,
  //     relatedTasks: {
  //       before: {},
  //       after: {},
  //     },
  //   },
  //   {
  //     id: '3',
  //     title: 'Công việc 3',
  //     user: {
  //       avatar: 'img1',
  //       email: 'email1',
  //     },
  //     status: 0,
  //     time: '3 ngày',
  //     prioritize: 1,
  //     relatedTasks: {
  //       before: {},
  //       after: {},
  //     },
  //   },
  //   {
  //     id: '4',
  //     title: 'Công việc 4',
  //     user: {
  //       avatar: 'img1',
  //       email: 'email1',
  //     },
  //     status: 0,
  //     time: '3 ngày',
  //     prioritize: 1,
  //     relatedTasks: {
  //       before: {},
  //       after: {},
  //     },
  //   },
  //   {
  //     id: '5',
  //     title: 'Công việc 5',
  //     user: {
  //       avatar: 'img1',
  //       email: 'email1',
  //     },
  //     status: 0,
  //     time: '3 ngày',
  //     prioritize: 1,
  //     relatedTasks: {
  //       before: {},
  //       after: {},
  //     },
  //   },
  // ])

  const listTask = ref<Task[]>()

  const taskInfo = ref<Task>()

  async function getAllTaskInProject(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllTaskInProjectRequest(projectId)
      const response = await getAllTaskInProjectApi(request)
      listTask.value = response.contents.listTask ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getTaskInfo(taskId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetTaskInfoRequest(taskId)
      const response = await getTaskInfoApi(request)
      taskInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createTask(
    userId: number,
    projectId: number,
    taskName: string,
    prioritize: boolean,
    startDate: string,
    endDate: string,
    parentTaskId?: number
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateTaskRequest(
        userId,
        projectId,
        taskName,
        prioritize,
        startDate,
        endDate,
        parentTaskId
      )
      const response = await createTaskApi(request)
      taskInfo.value = response.contents
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    error,
    listTask,
    taskInfo,
    getAllTaskInProject,
    createTask,
    getTaskInfo,
  }
})
