import { ForgotPasswordVerifyAccountLogicController} from '@btcp/bootcamp-interfaceadapters';
import { ForgotPasswordVerifyAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { InetLocationDto } from '../dto/inet-location.dto';
import { VerifyUuidDto } from '../dto/verify-uuid.dto';

export class ForgotPasswordVerifyAccountFacade 
extends IControllerFacede<ForgotPasswordVerifyAccountLogicController> {
  public async exec(
    verifyUuidDto: VerifyUuidDto,
    inetLocationMapper: InetLocationDto) {

    const controller = this._factory.create();

    await controller.forgotPasswordVerify({
      verification: verifyUuidDto.verification,
      inetLocation: {...inetLocationMapper}
    } as ForgotPasswordVerifyAccountsRequestMessage);
  }
}