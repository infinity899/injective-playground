export default defineNuxtConfig({
  ssr: false,
  builder: 'vite',
  css: ['@/assets/css/tailwind.css'],
  extends: ['../injective-ui/layer'],

  imports: {
    dirs: ['composables/**', 'store/**']
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  },

  modules: ['@nuxt/ui'],
  compatibilityDate: '2025-01-13'
})
