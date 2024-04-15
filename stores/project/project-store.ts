export const useProjectStore = defineStore('project', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const listProjectCurrent = ref([
    {
      id: '1',
      title: 'Mạng xã hội học tập i-Study',
      subtitle: 'Nguyễn Văn A',
      percent: '60',
      amountTask: 7,
      taskPrioritize: 'Code màn hình trang chủ',
    },
    {
      id: '2',
      title: 'Bảo trì hệ thống học tập V-Study',
      subtitle: 'Nguyễn Văn A',
      percent: '68',
      amountTask: 6,
    },
  ])

  const listProjectWaitAccept = ref([
    {
      id: '3',
      title: 'Website học tiếng Trung C-learning',
      subtitle: 'Nguyễn Văn A',
    },
    // {
    //   id: '4',
    //   title: 'Website học tiếng Hàn K-learning',
    //   subtitle: 'Nguyễn Văn A',
    // },
  ])

  const listProjectComplete = ref([
    {
      id: '5',
      title: 'Website học tiếng Nhật J-Learning',
      subtitle: 'Nguyễn Văn A',
      percent: '100',
      amountTask: 0,
    },
    {
      id: '6',
      title: 'Website học tiếng Anh E-learning',
      subtitle: 'Nguyễn Văn A',
      percent: '100',
      amountTask: 0,
    },
    {
      id: '7',
      title: 'Website quản lý sinh viên',
      subtitle: 'Nguyễn Văn A',
      percent: '100',
      amountTask: 0,
    },
    {
      id: '8',
      title: 'Website quản lý sinh viên',
      subtitle: 'Nguyễn Văn A',
      percent: '100',
      amountTask: 0,
    },
  ])

  return {
    isLoading,
    isError,
    error,
    listProjectCurrent,
    listProjectWaitAccept,
    listProjectComplete,
  }
})
