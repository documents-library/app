import DocumentsLi from './domain'
import {buildDeviceFrom} from '@s-ui/ssr/build-device'

export default async function({isClient, req: request}) {
  const domain = new DocumentsLi()
  const device = isClient
    ? buildDeviceFrom({window})
    : buildDeviceFrom({request})

  return {domain, device}
}
