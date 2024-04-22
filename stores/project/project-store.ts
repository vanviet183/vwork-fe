import { Project } from '~/models/class/common/project'
import { CreateProjectRequest } from '~/models/class/projects/create-project/create-project-request'
import { GetAllProjectByOrganizationRequest } from '~/models/class/projects/get-all-project-by-organization/get-all-project-by-organization-request'
import { GetProjectInfoRequest } from '~/models/class/projects/get-project-info/get-project-info-request'
import {
  createProjectApi,
  getProjectInfoApi,
  getProjectsInOrganizationApi,
} from '~/services/project/project-service'

export const useProjectStore = defineStore('project', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const listProjects = ref<Project[]>()
  const listProjectWaitAccept = ref<Project[]>()
  const listProjectCurrent = ref<Project[]>()
  const listProjectCompleted = ref<Project[]>()

  const projectInfo = ref<Project>()

  watch(listProjects, () => {
    listProjectCurrent.value = listProjects.value?.filter(
      (item) => item.status === 'Doing'
    )

    listProjectWaitAccept.value = listProjects.value?.filter(
      (item) => item.status === 'Wait'
    )
    listProjectCompleted.value = listProjects.value?.filter(
      (item) => item.status === 'Completed'
    )
  })
  // const listProjectCurrent = ref([
  //   {
  //     id: '1',
  //     title: 'Mạng xã hội học tập i-Study',
  //     subtitle: 'Nguyễn Văn A',
  //     percent: '60',
  //     amountTask: 7,
  //     taskPrioritize: 'Code màn hình trang chủ',
  //   },
  //   {
  //     id: '2',
  //     title: 'Bảo trì hệ thống học tập V-Study',
  //     subtitle: 'Nguyễn Văn A',
  //     percent: '68',
  //     amountTask: 6,
  //   },
  // ])

  // const listProjectWaitAccept = ref([
  //   {
  //     id: '3',
  //     title: 'Website học tiếng Trung C-learning',
  //     subtitle: 'Nguyễn Văn A',
  //   },
  //   // {
  //   //   id: '4',
  //   //   title: 'Website học tiếng Hàn K-learning',
  //   //   subtitle: 'Nguyễn Văn A',
  //   // },
  // ])

  // const listProjectCompleted = ref([
  //   {
  //     id: '5',
  //     title: 'Website học tiếng Nhật J-Learning',
  //     subtitle: 'Nguyễn Văn A',
  //     percent: '100',
  //     amountTask: 0,
  //   },
  //   {
  //     id: '6',
  //     title: 'Website học tiếng Anh E-learning',
  //     subtitle: 'Nguyễn Văn A',
  //     percent: '100',
  //     amountTask: 0,
  //   },
  //   {
  //     id: '7',
  //     title: 'Website quản lý sinh viên',
  //     subtitle: 'Nguyễn Văn A',
  //     percent: '100',
  //     amountTask: 0,
  //   },
  //   {
  //     id: '8',
  //     title: 'Website quản lý sinh viên',
  //     subtitle: 'Nguyễn Văn A',
  //     percent: '100',
  //     amountTask: 0,
  //   },
  // ])

  async function getProjectsInOrganization(organizationId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const getAllProjectByOrganizationRequest =
        new GetAllProjectByOrganizationRequest(organizationId)
      const response = await getProjectsInOrganizationApi(
        getAllProjectByOrganizationRequest
      )

      listProjects.value = response.contents.listProject
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getProjectInfo(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetProjectInfoRequest(projectId)
      const response = await getProjectInfoApi(request)

      projectInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createProject(
    organizationId: number,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateProjectRequest(
        organizationId,
        projectName,
        description,
        startDate,
        endDate
      )
      const response = await createProjectApi(request)
      return true
      projectInfo.value = response.contents
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
    listProjects,
    listProjectCurrent,
    listProjectWaitAccept,
    listProjectCompleted,
    projectInfo,
    getProjectsInOrganization,
    createProject,
    getProjectInfo,
  }
})
