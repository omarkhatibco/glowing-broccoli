import { treaty } from '@elysiajs/eden'
import { App } from 'api'

export const client = treaty<App>('localhost:3000')
