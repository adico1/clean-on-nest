import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException, Res, Inject, ConflictException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@btcp/bootcamp-blogic';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthFactory } from './auth.factory';
import { ConflictException as LibConflictException } from '@btcp/bootcamp-blogic';
import { Messages } from '@btcp/bootcamp-entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly _authService: AuthService;

  constructor(
    @InjectConnection() private readonly connection: Connection) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });

    this._authService = new AuthFactory(this.connection, null).create();
  }

  async validate(username: string, password: string): Promise<any> {
    // console.log('LocalStrategy::validate::username:', username, 'password:', password);
    let user = null;
    try {
      user = await this._authService.validateUser(username, password);
    } catch(ex) {
      if (ex instanceof LibConflictException) {
        throw new ConflictException(ex.message);
      } else {
        throw new UnauthorizedException(ex.message);        
      }
    }

    if (!user) {
      throw new UnauthorizedException(Messages.WRONG_EMAIL_PASSWORD);
    }
    return user;
  }
}

