import test from 'ava';
import UserEntity from '../../../src/domain/model/user/entity';

test('name은 1글자 이상이어야 한다.', (t) => {
  t.notThrows(() => {
    UserEntity.new({ name: 'a', email: 'test@test.com' });
  });

  t.throws(() => {
    UserEntity.new({ name: '', email: 'test@test.com' });
  }, { instanceOf: Error });
});
