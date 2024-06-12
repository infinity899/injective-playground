export default defineNuxtConfig({
  ssr: false,
  builder: 'vite',
  css: ['@/assets/css/tailwind.css'],
  extends: ['../injective-ui/layer'],

  imports: {
    dirs: ['composables/**', 'store/**']
  },

  modules: [],
  compatibilityDate: '2025-01-13'
})
