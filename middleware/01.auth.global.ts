// import dayjs from 'dayjs'
// import { HOME } from '~/constants'
// import { useAuthorizationStore } from '~/stores/authorization/authorization-store'

export default defineNuxtRouteMiddleware((to, _from) => {
  // const authorizationStore = useAuthorizationStore()

  console.log('to', to)

  // if (
  //   to.path !== HOME &&
  //   (!authorizationStore.accessToken ||
  //     authorizationStore.accessToken === '' ||
  //     authorizationStore.tokenGetDate !== dayjs().format('YYYY/MM/DD'))
  // ) {
  //   return navigateTo({ path: HOME })
  // }
})
