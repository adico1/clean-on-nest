import * as path from 'path';
require('dotenv').config({path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env')});

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
//    console.log('secret:', process.env.JWT_SECRET);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // console.log('JwtStrategy::validate', JSON.stringify(payload));
    // return { userId: payload.sub, username: payload.username };
    const tempPayload = { ...payload, userId:payload.sub };
    const {exp, iat, sub, ...tempPayload2 } = tempPayload;
    
    return tempPayload2;
  }
}
