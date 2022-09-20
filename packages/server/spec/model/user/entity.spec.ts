import test from 'ava';
import UserEntity from '../../../src/domain/model/user/entity';

test('name은 1글자 이상이어야 한다.', (t) => {
  t.notThrows(() => {
    new UserEntity({ name: 'a', email: 'test@test.com' });
  });

  t.throws(() => {
    new UserEntity({ name: '', email: 'test@test.com' });
  });
});
