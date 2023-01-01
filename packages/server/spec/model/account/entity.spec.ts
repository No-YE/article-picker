import test from 'ava'
import { Account } from '~/domain/model/account/entity'

test('name은 1글자 이상이어야 한다.', (t) => {
  t.notThrows(() => {
    Account.new({ name: 'a', email: 'test@test.com' })
  })

  t.throws(() => {
    Account.new({ name: '', email: 'test@test.com' })
  }, { instanceOf: Error })
})
