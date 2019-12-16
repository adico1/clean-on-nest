import { ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { IForgotPassword } from '@btcp/bootcamp-blogic';
import { Mapper, ForgotPassword } from '@btcp/bootcamp-entities';

export class ForgotPasswordsEntityDataMapper
extends Mapper<ForgotPassword, ForgotPasswordEntity> {
  mapFrom(source: ForgotPassword): ForgotPasswordEntity {
    return {
      id: source.id,
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
      email: source.email,
      verification: source.verification,
      firstUsed: source.firstUsed,
      finalUsed: source.finalUsed,
      expires: source.expires,
      ip: source.ip,
      browser: source.browser,
      country: source.country,
      ipChanged: source.ipChanged,
      browserChanged: source.browserChanged,
      countryChanged: source.countryChanged
    } as ForgotPasswordEntity;
  }
}
