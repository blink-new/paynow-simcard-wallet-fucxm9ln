import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'paynow-simcard-wallet-fucxm9ln',
  authRequired: true
})

export default blink