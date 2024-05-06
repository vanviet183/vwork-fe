import {
  ADMIN,
  CHANGE_PASSWORD,
  FORGET_PASSWORD,
  HOME,
  LOGIN,
  REGISTER,
  ROLE,
} from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'

export default defineNuxtRouteMiddleware((to, _from) => {
  const authorizationStore = useAuthorizationStore()

  if (
    to.path !== LOGIN &&
    to.path !== REGISTER &&
    to.path !== FORGET_PASSWORD &&
    to.path !== ADMIN &&
    to.path !== CHANGE_PASSWORD &&
    (!authorizationStore.accessToken || authorizationStore.accessToken === '')
  ) {
    return navigateTo({ path: LOGIN })
  } else if (to.path === LOGIN && authorizationStore.accessToken) {
    if (authorizationStore.role === ROLE.ADMIN) {
      return navigateTo({ path: ADMIN })
    }
    return navigateTo({ path: HOME })
  }
})
