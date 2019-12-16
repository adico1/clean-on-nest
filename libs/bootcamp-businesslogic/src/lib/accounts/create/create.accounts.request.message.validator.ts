import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateAccountsRequestMessage } from './create.accounts.request.message';
import { CreateAccountsValidationResult } from './create.accounts.validation-result';
import { isEmail, isLength } from 'validator';
import { Messages, Consts } from '@btcp/bootcamp-entities';
import { AccountsHelper } from '../../common';

const EMAIL_INVALID = Messages.EMAIL_INVALID;
const FIRST_NAME_INVALID = Messages.FIRST_NAME_INVALID;
const LAST_NAME_INVALID = Messages.LAST_NAME_INVALID;
const PASSWORD_INVALID = Messages.PASSWORD_INVALID;
const PASSWORD_MATCH_INVALID = Messages.PASSWORD_MATCH_INVALID;
const FIRST_NAME_MIN_LENGTH = Consts.FIRST_NAME_MIN_LENGTH;
const LAST_NAME_MIN_LENGTH = Consts.LAST_NAME_MIN_LENGTH;

export class CreateAccountsRequestMessageValidator 
implements IValidator<CreateAccountsRequestMessage, CreateAccountsValidationResult> {
  validate(request: CreateAccountsRequestMessage): CreateAccountsValidationResult {
    const validationResult = new CreateAccountsValidationResult();

    validationResult.isValid = true;

    if (!isEmail(request.email)) {
      validationResult.errors.push(EMAIL_INVALID);
      validationResult.isValid = false;
    }

//    console.log('CreateAccountsRequestMessageValidator::validate::CP1::valid:', validationResult.isValid);

    if (!isLength(request.firstName, FIRST_NAME_MIN_LENGTH)) {
      validationResult.errors.push(FIRST_NAME_INVALID);
      validationResult.isValid = false;
    } 

//    console.log('CreateAccountsRequestMessageValidator::validate::CP2::valid:', validationResult.isValid);

    if (!isLength(request.lastName, LAST_NAME_MIN_LENGTH) ) {
      validationResult.errors.push(LAST_NAME_INVALID);
      validationResult.isValid = false;
    }

//    console.log('CreateAccountsRequestMessageValidator::validate::CP3::valid:', validationResult.isValid);

    if (!AccountsHelper.isPasswordMatch(request.password, request.passwordRepeat) ) {
      validationResult.errors.push(PASSWORD_MATCH_INVALID);
      validationResult.isValid = false;
    }

//    console.log('CreateAccountsRequestMessageValidator::validate::CP4::valid:', validationResult.isValid);

    if (!AccountsHelper.isPassword(request.password) ) {
      validationResult.errors.push(PASSWORD_INVALID);
      validationResult.isValid = false;
    }

//    console.log('CreateAccountsRequestMessageValidator::validate::CP5::valid:', validationResult.isValid);

    return validationResult;
  }
}