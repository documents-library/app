const API_URL =
  process.env.STAGE === 'development'
    ? 'http://localhost:8080'
    : process.env.API_URL

module.exports = {
  DOMAIN: 'https://documents.li',
  API_URL
}
