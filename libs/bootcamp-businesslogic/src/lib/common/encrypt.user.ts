import * as bcrypt from 'bcrypt';
import { Account } from '@btcp/bootcamp-entities';

export class EncryptUser {
  async encryptUser(user: Account) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    // console.log('user', user, 'salt', salt);
    const hashed = await bcrypt.hash(user.pw, salt);
    user.pw = hashed;
    user.pwSalt = salt;
  }
}
