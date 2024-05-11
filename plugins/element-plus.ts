import ElementPlus from 'element-plus'
import en from 'element-plus/es/locale/lang/en'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, {
    locale: en,
  })
})
