import { IRepository, InetLocation, IService, RefreshToken, IAuthDependencies, LoginToken, LoggedInUser, Consts, Account, IVerificationGeneratorDependencies, Messages } from '@btcp/bootcamp-entities';
import { RefreshTokenService } from './refresh-token.service';
import { UnauthorizedException, ConflictException, NotFoundException } from './exceptions';

export class AuthService implements IService {
  HOURS_TO_BLOCK = Consts.HOURS_TO_BLOCK;
  LOGIN_ATTEMPTS_TO_BLOCK = Consts.LOGIN_ATTEMPTS_TO_BLOCK;

  private readonly _utils: IAuthDependencies;
  private readonly _verificationGenerator: IVerificationGeneratorDependencies;
  private readonly _repository: IRepository<string, Account>;
  private readonly _refreshToken: RefreshTokenService;
  
  constructor(
    repository: IRepository<string, Account>,
    authDependencies: IAuthDependencies,
    verificationGenerator: IVerificationGeneratorDependencies,
    refreshToken: RefreshTokenService ) {
      this._repository = repository;
      this._utils = authDependencies;
      this._verificationGenerator = verificationGenerator;
      this._refreshToken = refreshToken;
  }
  async createAccessToken(payload: any) {
    return this._utils.getAccessToken(payload);
  }

  async createRefreshToken(userId, inetLoc: InetLocation) {
    const refreshTokenDto = new RefreshToken();
    refreshTokenDto.id = userId;
    refreshTokenDto.refreshToken = this._verificationGenerator.createVerificationCode();
    refreshTokenDto.ip = inetLoc.ip;
    refreshTokenDto.browser = inetLoc.browser;
    refreshTokenDto.country = inetLoc.country;

    // console.dir(refreshTokenDto);

    await this._refreshToken.save(refreshTokenDto);
    return refreshTokenDto.refreshToken;
  }

  async findRefreshToken(token: string) {
    const refreshToken = await this._refreshToken.findToken(token);
    if (!refreshToken) {
      throw new UnauthorizedException(Messages.USER_LOGGED_OUT);
    }
    return refreshToken.id;
  }

  async createLoginToken(payload: LoggedInUser, inetLocation: InetLocation) {
    return {
      access_token: await this.createAccessToken(payload),
      refresh_token: await this.createRefreshToken(payload.sub, inetLocation)
    } as LoginToken;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // console.log('AuthService::validateUser::CP1::username', username);

    const user = await this._repository.getByQuery({email: username, verified: true});

    if (!user) {
      return null;
    }

    this.isUserBlocked(user);
    // console.log('AuthService::validateUser::CP2');
    await this.checkPassword(pass, user);
    // console.log('AuthService::validateUser::CP3');
    await this.passwordsAreMatch(user);
    // console.log('AuthService::validateUser::CP4');

    //const { pw, pwSalt, ...result } = user;
    const retUser = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.email,
      roles: user.roles
    };

    //console.log('AuthService::validateUser::CP5::retUser');
    //console.dir(retUser);
    return retUser;
  }

  private isUserBlocked(user) {
    if (user.blockExpires > Date.now()) {
        throw new ConflictException(Messages.USER_HAS_BEEN_BLOCKED);
    }
  }

  private async checkPassword(attemptPass: string, user: Account) {
    const match = await this._utils.encryptedCompare(attemptPass, user.pw);
    // console.log('accounts.service::checkPassword::CP1::match:', match);
    if (!match) {
        // console.log('accounts.service::checkPassword::CP-pasword-no-match');
        // console.dirxml(user);
        await this.passwordsDoNotMatch(user);
        throw new NotFoundException(Messages.WRONG_EMAIL_PASSWORD);
    }
    // console.log('accounts.service::checkPassword::CP3');
    return match;
  }

  private async passwordsAreMatch(user) {
    user.loginAttempts = 0;
    // console.log('accounts.service.ts::passwordsAreMatch::user:');
    // console.dirxml(user);
    await this._repository.save(user);
  }

  private async blockUser(user) {
    user.blockExpires = this._verificationGenerator
      .getExpirationDate(this.HOURS_TO_BLOCK);

    await this._repository.save(user);
  }


  private async passwordsDoNotMatch(user) {
    user.loginAttempts += 1;
    await this._repository.save(user);
    if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
        await this.blockUser(user);
        throw new ConflictException(Messages.USER_BLOCKED);
    }
  }
}