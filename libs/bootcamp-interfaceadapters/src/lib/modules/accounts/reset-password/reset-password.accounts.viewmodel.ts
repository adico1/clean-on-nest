import { VerificationToken } from '@btcp/bootcamp-entities';
import { IViewModel } from '../../../common/view-model.interface';

export class ResetPasswordAccountsViewModel implements IViewModel {
  constructor( verificationToken: VerificationToken ) {
    this.email = verificationToken.email;
    this.message = verificationToken.message;
  }

  public email: string;
  public message: string;
}