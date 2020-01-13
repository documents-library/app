import { es } from 'date-fns/locale'
import { formatDistance } from 'date-fns'

// Dates
export function dateRelativeFormat({ date, lan = 'es' }) {
  return formatDistance(new Date(date), new Date(Date.now()), {
    locale: es,
    addSuffix: true
  })
}
