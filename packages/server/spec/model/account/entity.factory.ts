import { Factory } from 'fishery'
import { Account } from '~/domain/model/account/entity.js'

export const accountFactory = Factory.define<Account>(
  ({ sequence }) => Account.new({
    id: sequence,
    name: `test${sequence}`,
    email: `test${sequence}@test.com`,
  }),
)
