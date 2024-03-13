import { createI18n } from 'vue-i18n'
import ja from '../locales/ja.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ja',
    messages: {
      ja,
    },
  })

  nuxtApp.vueApp.use(i18n)
})
