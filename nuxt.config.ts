// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  supabase: {
    redirect: false,
  },
  nitro: {
    preset: 'cloudflare-pages',
  },
  colorMode: {
    preference: 'light',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['nitro-cloudflare-dev', '@nuxt/ui', '@nuxtjs/supabase', '@nuxt/eslint'],
})
