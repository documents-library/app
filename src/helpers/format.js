import { es } from 'date-fns/locale'
import { formatDistance } from 'date-fns'

// Dates
export function dateRelativeFormat({ date, lan = 'es' }) {
  return formatDistance(new Date(date), new Date(Date.now()), {
    locale: es,
    addSuffix: true
  })
}

export function capitalizeFirstLetter(name) {
  if (!!name && typeof name === 'string' && name.length > 0)
    return name.charAt(0).toUpperCase() + name.slice(1)

  return name
}
