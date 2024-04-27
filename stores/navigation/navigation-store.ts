import type { LocationQuery } from 'vue-router'
import { HOME } from '~/constants/routes'

export const useNavigationStore = defineStore('navigation', () => {
  const router = useRouter()
  const currentRoute = ref<string>(HOME)

  function setCurrentRoute(route: string) {
    currentRoute.value = route
  }

  function isRouteActive(route: string) {
    return currentRoute.value === route
  }

  function isQueryParamsActive(queryParams: LocationQuery) {
    return Object.entries(queryParams).every(([key, value]) => {
      return router.currentRoute.value.query[key] === value
    })
  }

  function navigateToRoute(route: string) {
    navigateTo({
      path: route,
    })
  }

  return {
    currentRoute,
    setCurrentRoute,
    isRouteActive,
    isQueryParamsActive,
    navigateToRoute,
  }
})
