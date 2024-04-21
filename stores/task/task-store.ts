export const useTaskStore = defineStore('task', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const listTask = ref([
    {
      id: '1',
      title: 'Công việc 1',
      user: {
        avatar:
          'https://i.pinimg.com/736x/6d/44/61/6d446105361e83b1013aa9e349574ab0.jpg',
        email: 'email1',
      },
      status: 1,
      time: '3 ngày',
      prioritize: 1,
      relatedTasks: {
        before: {},
        after: {},
      },
    },
    {
      id: '2',
      title: 'Công việc 2',
      user: {
        avatar: 'img1',
        email: 'email1',
      },
      status: 0,
      time: '3 ngày',
      prioritize: 1,
      relatedTasks: {
        before: {},
        after: {},
      },
    },
    {
      id: '3',
      title: 'Công việc 3',
      user: {
        avatar: 'img1',
        email: 'email1',
      },
      status: 0,
      time: '3 ngày',
      prioritize: 1,
      relatedTasks: {
        before: {},
        after: {},
      },
    },
    {
      id: '4',
      title: 'Công việc 4',
      user: {
        avatar: 'img1',
        email: 'email1',
      },
      status: 0,
      time: '3 ngày',
      prioritize: 1,
      relatedTasks: {
        before: {},
        after: {},
      },
    },
    {
      id: '5',
      title: 'Công việc 5',
      user: {
        avatar: 'img1',
        email: 'email1',
      },
      status: 0,
      time: '3 ngày',
      prioritize: 1,
      relatedTasks: {
        before: {},
        after: {},
      },
    },
  ])

  return {
    isLoading,
    isError,
    error,
    listTask,
  }
})
