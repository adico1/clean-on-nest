import { sign } from 'jsonwebtoken';
import * as Cryptr from 'cryptr';
import { IAuthDependencies } from '@btcp/bootcamp-entities';
import { envConfigurations } from './env.configurations';
import * as bcrypt from 'bcrypt';

export class AuthDependencies implements IAuthDependencies {
  cryptr: any;

  constructor() {
    this.cryptr = new Cryptr(envConfigurations.JWT_SECRET);
  }

  public getAccessToken(payload: any) {
    return sign(payload, envConfigurations.JWT_SECRET, 
      { expiresIn: `${envConfigurations.JWT_EXPIRATION}s` });
  }

  private encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }

  public async encryptedCompare(attemptPass: string, password: string) {
    return await bcrypt.compare(attemptPass, password)
  }
}