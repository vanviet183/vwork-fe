import {
  CHANGE_PASSWORD,
  FORGET_PASSWORD,
  HOME,
  LOGIN,
  REGISTER,
} from '~/constants'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'

export default defineNuxtRouteMiddleware((to, _from) => {
  const authorizationStore = useAuthorizationStore()

  if (
    to.path !== LOGIN &&
    to.path !== REGISTER &&
    to.path !== FORGET_PASSWORD &&
    to.path !== CHANGE_PASSWORD &&
    (!authorizationStore.accessToken || authorizationStore.accessToken === '')
  ) {
    return navigateTo({ path: LOGIN })
  } else if (to.path === LOGIN && authorizationStore.accessToken) {
    return navigateTo({ path: HOME })
  }
})
