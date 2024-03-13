export const useNavigationStore = defineStore('navigation', () => {
  const routes = ref([])
  const rootRoute = ref({})
  const params = ref({})

  function setRootRoute(routeTitle: string, activeNavVal: string) {
    params.value = {}
    rootRoute.value = {
      header: routeTitle,
      activeNav: activeNavVal,
    }
  }

  function setActiveNavOnLeftTitle(title: string) {
    rootRoute.value = {
      ...rootRoute.value,
      activeNav: title,
    }
  }

  // To keep params when change tab
  function setParams(paramsValue: object) {
    params.value = paramsValue
  }

  return {
    routes,
    rootRoute,
    setRootRoute,
    setActiveNavOnLeftTitle,
    params,
    setParams,
  }
})
