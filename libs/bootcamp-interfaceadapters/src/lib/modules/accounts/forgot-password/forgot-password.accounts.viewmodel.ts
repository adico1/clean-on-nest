import { VerificationToken } from '@btcp/bootcamp-entities';
import { IViewModel } from '../../../common/view-model.interface';

export class ForgotPasswordAccountsViewModel implements IViewModel {
  public email: string;
  public message: string;

  constructor( verificationToken: VerificationToken ) {
    this.email = verificationToken.email;
    this.message = verificationToken.message;
  }
}