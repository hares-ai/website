// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: false,
  },
  runtimeConfig: {
    public: {
      UserToken: 'user-token',
      Domain: process.env.NUXT_PUBLIC_DOMAIN
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    }
  },
  devtools: {
    enabled: false
  },
  modules: [
    '@vite-pwa/nuxt',
    '@vant/nuxt',
    '@element-plus/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        'Sometype Mono': [400]
      }
    }]
  ],
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    registerWebManifestInRouteRules: true,
    manifest: {
      name: 'Hares AI',
      short_name: 'hares',
      theme_color: '#000000',
      start_url: '/mobile',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ['*/**.{js,css,html,png,svg,ico}'],
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /.*\/api/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'interface-cache',
            backgroundSync: {
              name: "backgroundSync-interface",
            },
            cacheableResponse: {
              statuses: [200]
            },
            networkTimeoutSeconds: 10,
          },
        },
        {
          urlPattern: /(.+)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps|ico)/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [200]
            },
          },
        },
        {
          urlPattern: /.*\.(css|less|scss)/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'css-cache',
            fetchOptions: {
              headers: [
                ['Content-Type', 'text/javascript']
              ]
            },
          },
        },
        {
          urlPattern: /.*\.(js|ts|vue|ts|mjs)/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'js-cache',
          },
        },
        // {
        //   urlPattern: /\/(detail|write-article|archive|label|friend-link|message-board|about-my|announcement|person|creator-center)?/, //  页面缓存
        //   handler: 'NetworkFirst',
        //   options: {
        //     cacheName: 'pages-cache',
        //     networkTimeoutSeconds: 10,
        //   },
        // },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    }
  },
  vant: {
    /** Options */
  },
  elementPlus: {

  }
})
