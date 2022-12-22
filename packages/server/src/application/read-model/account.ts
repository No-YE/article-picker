import { Service } from 'autoinjection'

export type Account = {}

@Service({ singleton: true })
export class AccountResolver {}
