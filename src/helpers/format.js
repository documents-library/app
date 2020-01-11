import { es, enCA, it, ptBR } from 'date-fns/locale'
import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatDistanceStrict,
  formatRelative,
  addDays
} from 'date-fns'

// Dates
const defaultOptions = { numeric: 'auto', unit: 'day' }
export function dateRelativeFormat({
  date,
  lan = 'es',
  options = defaultOptions
}) {
  console.log('------------------------------------- ', date)
  return formatDistance(new Date(date), new Date(Date.now()), {
    locale: es,
    addSuffix: true
  })
}
