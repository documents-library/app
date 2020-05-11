export function getIsCrawler({userAgent}) {
  return /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(
    userAgent
  )
}
