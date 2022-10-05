import test from 'ava';
import User from '../../../src/domain/model/account/entity';

test('name은 1글자 이상이어야 한다.', (t) => {
  t.notThrows(() => {
    User.new({ name: 'a', email: 'test@test.com' });
  });

  t.throws(() => {
    User.new({ name: '', email: 'test@test.com' });
  }, { instanceOf: Error });
});
