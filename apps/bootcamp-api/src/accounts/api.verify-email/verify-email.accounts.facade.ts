import { VerifyEmailAccountLogicController} from '@btcp/bootcamp-interfaceadapters';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { VerifyUuidDto } from '../dto/verify-uuid.dto';

export class VerifyEmailAccountFacade 
extends IControllerFacede<VerifyEmailAccountLogicController> {
  public async exec(verifyEmailAccountDto: VerifyUuidDto) {

    const controller = this._factory.create();

    await controller.verifyEmail(VerifyUuidDto.toMessage(verifyEmailAccountDto));
  }
}