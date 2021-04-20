module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

    publicPath: '/',

    devServer: {
        proxy: {
          '^/stafflogin/': {
            target: 'http://112.137.129.214:35280/',
            changeOrigin: true
          },
          '^/advisors/': {
            target: 'http://112.137.129.214:35280/',
            changeOrigin: true
          }
        }
      }
}