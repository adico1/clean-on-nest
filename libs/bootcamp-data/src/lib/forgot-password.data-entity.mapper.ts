import { ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { ForgotPassword, Mapper } from '@btcp/bootcamp-entities';

export class ForgotPasswordsDataEntityMapper
extends Mapper<ForgotPasswordEntity, ForgotPassword> {
  mapFrom(source: ForgotPasswordEntity): ForgotPassword {
    return {
      id: source.id,
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
    } as ForgotPassword;
  }
}
