// import * as path from 'path';
// require('dotenv').config({ path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env') });

// import { JwtPayload } from './interfaces/jwt-payload.interface';
// import { Injectable, UnauthorizedException, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// // import { sign } from 'jsonwebtoken';
// // import { v4 } from 'uuid';
// // import { Request } from 'express';
// import * as Cryptr from 'cryptr';

// import { RefreshTokenService } from './refresh-token/refresh-token.service';
// // import { RefreshTokenDto } from './refresh-token/refresh-token.dto';

// import { InjectRepository } from '@nestjs/typeorm';
// import { AccountEntity } from '@btcp/bootcamp-data';
// import { Repository } from 'typeorm';
// // import { AccountDto } from '../accounts/dto/account-dto';

// // import * as bcrypt from 'bcrypt';
// // import { addHours } from 'date-fns';
// // import { Request as ExpressRequest } from 'express';
// // import { LoginUserDto } from '../accounts/dto/login-user.dto';
// // import { IInetLocation } from '../accounts/interfaces/inet-location.interface';


// @Injectable()
// export class AuthService {
//   HOURS_TO_BLOCK = 6;
//   LOGIN_ATTEMPTS_TO_BLOCK = 5;
  
//   cryptr: any;

//   constructor(
//     @InjectRepository(AccountEntity) private readonly accountRepo: Repository<AccountEntity>,
//     private readonly refreshTokenService: RefreshTokenService,
//     private readonly jwtService: JwtService
//   ) {
//     this.cryptr = new Cryptr(process.env.JWT_SECRET);
//   }

//   // async createAccessToken(payload: any) {
//   //   // const accessToken = this.jwtService.sign({userId});
//   //   const accessToken = sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
//   //   return this.encryptText(accessToken);
//   // }

//   // async createRefreshToken(userId, inetLoc: IInetLocation) {
//   //   const refreshTokenDto = new RefreshTokenDto();
//   //   refreshTokenDto.id = userId;
//   //   refreshTokenDto.refreshToken = v4();
//   //   refreshTokenDto.ip = inetLoc.ip;
//   //   refreshTokenDto.browser = inetLoc.browser;
//   //   refreshTokenDto.country = inetLoc.country;

//   //   console.dir(refreshTokenDto);

//   //   const refreshToken = this.refreshTokenService.newToken(refreshTokenDto);
//   //   await this.refreshTokenService.save(refreshToken);
//   //   return refreshToken.refreshToken;
//   // }

//   // async findRefreshToken(token: string) {
//   //   const refreshToken = await this.refreshTokenService.findToken(token);
//   //   if (!refreshToken) {
//   //     throw new UnauthorizedException('User has been logged out.');
//   //   }
//   //   return refreshToken.id;
//   // }

//   // async validateUser(username: string, pass: string): Promise<any> {
//   //   console.log('AuthService::validateUser::CP1::username', username);

//   //   const user = await this.accountRepo.findOne({email: username, verified: true})
//   //           .then(e => AccountDto.fromEntity(e));

//   //   this.isUserBlocked(user);
//   //   console.log('AuthService::validateUser::CP2');
//   //   await this.checkPassword(pass, user);
//   //   console.log('AuthService::validateUser::CP3');
//   //   await this.passwordsAreMatch(user);
//   //   console.log('AuthService::validateUser::CP4');

//   //   //const { pw, pwSalt, ...result } = user;
//   //   const retUser = {
//   //     userId: user.id,
//   //     firstName: user.firstName,
//   //     lastName: user.lastName,
//   //     username: user.email,
//   //     roles: user.roles
//   //   };

//   //   console.log('AuthService::validateUser::CP5::retUser');
//   //   console.dir(retUser);
//   //   return retUser;
//   // }

//   async validateUserJwt(jwtPayload: JwtPayload): Promise<any> {
//     console.log('AuthService::validateUserJwt::jwtPayload', JSON.stringify(jwtPayload));
//     const user = await this.accountRepo.findOne({ id: jwtPayload.userId, verified: true });
//     if (!user) {
//       throw new UnauthorizedException('Wrong email or password.');
//     }
//     return user;
//   }

//   // private isUserBlocked(user) {
//   //   if (user.blockExpires > Date.now()) {
//   //       throw new ConflictException('User has been blocked try later.');
//   //   }
//   // }

//   // private async checkPassword(attemptPass: string, user: AccountDto) {
//   //   const match = await bcrypt.compare(attemptPass, user.pw);
//   //   console.log('accounts.service::checkPassword::CP1::match:', match);
//   //   if (!match) {
//   //       console.log('accounts.service::checkPassword::CP-pasword-no-match');
//   //       console.dirxml(user);
//   //       await this.passwordsDoNotMatch(user);
//   //       throw new NotFoundException('Wrong email or password.');
//   //   }
//   //   console.log('accounts.service::checkPassword::CP3');
//   //   return match;
//   // }

//   // private async passwordsAreMatch(user) {
//   //   user.loginAttempts = 0;
//   //   console.log('accounts.service.ts::passwordsAreMatch::user:');
//   //   console.dirxml(user);
//   //   await this.accountRepo.save(user);
//   // }

//   // private async blockUser(user) {
//   //   user.blockExpires = addHours(new Date(), this.HOURS_TO_BLOCK);
//   //   await this.accountRepo.save(user);
//   // }


//   // private async passwordsDoNotMatch(user) {
//   //   user.loginAttempts += 1;
//   //   await this.accountRepo.save(user);
//   //   if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
//   //       await this.blockUser(user);
//   //       throw new ConflictException('User blocked.');
//   //   }
//   // }

//   // async login(user: any, inetLoc: IInetLocation) {
//   //   console.log('AuthService::login::user', JSON.stringify(user));
//   //   // return user;

//   //   // const user = await this.accountRepo.findOne({email: loginUserDto.email, verified: true})
//   //   //         .then(e => AccountDto.fromEntity(e));

//   //   // this.isUserBlocked(user);
//   //   // console.log('accounts.service::login::CP2');
//   //   // await this.checkPassword(loginUserDto.password, user);
//   //   // console.log('accounts.service::login::CP3');
//   //   // await this.passwordsAreMatch(user);
//   //   // console.log('accounts.service::login::CP4');

//   //   // const payload = { username: user.username, sub: user.userId };
//   //   const payload = {
//   //     ...user,
//   //     sub: user.userId
//   //   }

//   //   return {
//   //     access_token: this.jwtService.sign(payload),
//   //     refresh_token: await this.createRefreshToken(payload.sub, inetLoc)
//   //   };
//   // }

//   //   ┬┬ ┬┌┬┐  ┌─┐─┐ ┬┌┬┐┬─┐┌─┐┌─┐┌┬┐┌─┐┬─┐
//   //   ││││ │   ├┤ ┌┴┬┘ │ ├┬┘├─┤│   │ │ │├┬┘
//   //  └┘└┴┘ ┴   └─┘┴ └─ ┴ ┴└─┴ ┴└─┘ ┴ └─┘┴└─
//   private jwtExtractor(request) {
//     let token = null;
//     if (request.header('x-token')) {
//       token = request.get('x-token');
//     } else if (request.headers.authorization) {
//       token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
//     } else if (request.body.token) {
//       token = request.body.token.replace(' ', '');
//     }
//     if (request.query.token) {
//       token = request.body.token.replace(' ', '');
//     }
//     const cryptr = new Cryptr(process.env.JWT_SECRET);
//     if (token) {
//       try {
//         token = cryptr.decrypt(token);
//       } catch (err) {
//         throw new BadRequestException('Bad request.');
//       }
//     }
//     return token;
//   }

//   // ***********************
//   // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
//   // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
//   // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
//   // ***********************
//   returnJwtExtractor() {
//     return this.jwtExtractor;
//   }

//   encryptText(text: string): string {
//     return this.cryptr.encrypt(text);
//   }
// }
