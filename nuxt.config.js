export default {

  //静的ホスティングに最適化
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'コトノハ',
    htmlAttrs: {
      lang: 'jp',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content:'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content:'black-translucent'},
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Serif+JP'},//これはscssにそのうち移動
            { rel:'stylesheet', href:'https://unpkg.com/ress/dist/ress.min.css'}//リセットcss
    ],
  },
  pwa: {
    icon: {
      //source: 'SRC_DIR/static/*****/icon_pwa.png',
      //fileName: 'icon_pwa.png'
      //https://designsupply-web.com/media/development/6823/
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.js',
    '~plugins/sideMenu.js',
    '~/plugins/dompurify.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      './assets/scss/**/*.scss'
    ],
    hoistUseStatements: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //For distinction about devise. Smartphone or Tablet or Computer.
    //https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    //Auto build sitemap.
    //https://github.com/nuxt-community/sitemap-module#sitemap-options
    '@nuxtjs/sitemap',
  ],

  router: {
    middleware: ['auth']
  },

  sitemap: {
    //トップページのURL(末尾スラッシュなし)
    hostname: 'https://kotonoha.com',
    //各ページのURL末尾にスラッシュをつけるかどうか
    trailingSlash: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  //delete data-n-head 静的書き出し時にjsが読み込まれなくなるため無効化
  // hooks: {
  //   generate: {
  //     page (page) {
  //       const cheerio = require('cheerio')
  //       const $ = cheerio.load(page.html, { decodeEntities: false })
        
  //       const attrs = [
  //         'data-n-head-ssr',
  //         'data-n-head',
  //         'data-hid',
  //         'data-vue-ssr-id',
  //         'data-server-rendered',
  //       ]
        
  //       attrs.forEach(value => {
  //         $('*[' + value + ']').removeAttr(value)
  //       })
        
  //       $('link[rel="preload"][href^="/_nuxt/"][as="script"]').remove()
  //       $('script[src^="/_nuxt/"]').remove()
  //       $('script:contains("window.__NUXT__")').remove()
        
  //       page.html = $.html()
  //     },
  //   },
  // },

  //js読み込み
  // generate: {subFolders: true},
  // router: {base: '/'},
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
        // fibersをインストールした場合
        sassOptions: {
          fiber: require('fibers'),
        },
      },
    },
  },
}
