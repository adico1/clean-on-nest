import { isLength } from 'validator';
import { Consts, InetLocation, Messages } from '@btcp/bootcamp-entities';
import { IValidationResult } from './interfaces/validation-result.interface';
import { isIPv6, isIPv4 } from 'net';

const MIN_PASSWORD_LENGTH = Consts.MIN_PASSWORD_LENGTH;
const IP_INVALID = Messages.IP_INVALID;;
const COUNTRY_INVALID = Messages.COUNTRY_INVALID;
const BROWSER_INVALID = Messages.BROWSER_INVALID;
const MIN_BROWSER_LENGTH = Consts.MIN_BROWSER_LENGTH;
const MIN_COUNTRY_LENGTH = Consts.MIN_COUNTRY_LENGTH;

export class AccountsHelper {
  public static isPassword(password: string) {
    return isLength(password, MIN_PASSWORD_LENGTH);
  }

  public static isPasswordMatch(password: string, passwordRepeat: string) {
    return password === passwordRepeat;
  }

  public static isValidInetLocation(inetLocation: InetLocation, validationResult: IValidationResult) {
    if (!isIPv6(inetLocation.ip) && !isIPv4(inetLocation.ip)) {
      validationResult.errors.push(IP_INVALID);
      validationResult.isValid = false;
    } 

//    console.log('ForgotPasswordAccountsRequestMessageValidator::validate::CP2::valid:', validationResult.isValid);

    if (!isLength(inetLocation.country, MIN_COUNTRY_LENGTH) ) {
      validationResult.errors.push(COUNTRY_INVALID);
      validationResult.isValid = false;
    }

//    console.log('ForgotPasswordAccountsRequestMessageValidator::validate::CP3::valid:', validationResult.isValid);

    if (!isLength(inetLocation.browser, MIN_BROWSER_LENGTH) ) {
      validationResult.errors.push(BROWSER_INVALID);
      validationResult.isValid = false;
    }

//    console.log('ForgotPasswordAccountsRequestMessageValidator::validate::CP4::valid:', validationResult.isValid);
  }
}