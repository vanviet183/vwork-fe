// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: false,
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  components: [
    { path: '~/components/common', extensions: ['.vue'] },
    { path: '~/components/user', extensions: ['.vue'] },
    { path: '~/components/tasks', extensions: ['.vue'] },
    { path: '~/components/project', extensions: ['.vue'] },
    { path: '~/components/organizations', extensions: ['.vue'] },
    { path: '~/components/task-require', extensions: ['.vue'] },
    { path: '~/components/documents', extensions: ['.vue'] },
    { path: '~/components/group', extensions: ['.vue'] },
    { path: '~/components/meeting', extensions: ['.vue'] },
    { path: '~/components/admin', extensions: ['.vue'] },
    { path: '~/components/task-require', extensions: ['.vue'] },
    '~/components',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
      'window.global': 'window',
      __INTLIFY_JIT_COMPILATION__: true,
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/colors.scss" as *;
            @use "@/assets/scss/classes.scss" as *;
          `,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: './runtimeConfig',
          replacement: './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
        },
      ],
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
})
