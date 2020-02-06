const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  env: {
    API_URL: process.env.API_URL
  }
})
