export default {
  ssr: false,
  head: {
    title: 'Bravado Search App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
  },
  css: [],
  plugins: [
    {src: '~/plugins/vue-highlight', ssr: false}
  ],
  components: [
    '~/components/',
  ],
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios'
  ],
  publicRuntimeConfig: {},
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  content: {},
  build: {
  },
}
