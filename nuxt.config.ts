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
  modules: ['nitro-cloudflare-dev', '@nuxt/ui', '@nuxtjs/supabase', '@nuxt/eslint'],
})
