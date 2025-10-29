// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  spaLoadingTemplate: false,

  app: {
    head: {
      title: 'EYEA',
      htmlAttrs: { lang: 'en' },
      meta: [
        // Viewport
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=5' 
        },

        // SEO Meta
        { 
          hid: 'description',
          name: 'description',
          content: 'Working to access opportunities and advocate towards having an active startup ecosystem that enables youth entrepreneurs to realize their potential with innovative products, processes and services in Ethiopia.'
        },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'EYEA' },
        { 
          property: 'og:description', 
          content: 'Working to access opportunities and advocate towards having an active startup ecosystem that enables youth entrepreneurs to realize their potential with innovative products, processes and services in Ethiopia.'
        },
        // Uncomment and add your actual URLs
        // { property: 'og:url', content: 'https://your-domain.com' },
        // { property: 'og:image', content: 'https://your-domain.com/image.png' },
      ],
      link: [
        // Inter Font
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' 
        }
      ]
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/apollo',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    'nuxt-icon',
    'nuxt-lodash'
  ],

  // Apollo GraphQL Configuration
  apollo: {
    clients: {
      default: './ApolloClient/default_user.js',
      user: './ApolloClient/user.js',
      third_party: './ApolloClient/third_party.js',
      member_anonymous: './ApolloClient/member_anonymous.js',
      member_user: './ApolloClient/member_user.js',
      direct: './ApolloClient/direct.js',
      member_event_booker: './ApolloClient/member_event_booker.js'
    }
  },

  // Build Configuration
  build: {
    transpile: [
      '@headlessui/vue',
      'graphql',
      'vee-validate/dist/rules'
    ]
  },

  // CSS Configuration
  css: ['~/assets/css/main.css'],

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // Vee-Validate Configuration
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage'
    }
  },

  // Headless UI Configuration
  headlessui: { prefix: 'Headless' },

  // Color Mode Configuration
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },

  // Runtime Configuration
  runtimeConfig: {
    public: {
      mode: process.env.MODE
    }
  },

  // Content Module Configuration
  content: {}
})