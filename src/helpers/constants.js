export const API_URL =
  process.env.STAGE === 'development'
    ? 'http://localhost:8080'
    : process.env.API_URL

export const DOMAIN = 'https://documents.li'
