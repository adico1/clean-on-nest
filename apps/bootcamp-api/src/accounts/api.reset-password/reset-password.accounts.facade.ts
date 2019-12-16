import { ResetPasswordAccountLogicController} from '@btcp/bootcamp-interfaceadapters';
import { ResetPasswordAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export class ResetPasswordAccountFacade 
extends IControllerFacede<ResetPasswordAccountLogicController> {
  public async exec(resetPasswordDto: ResetPasswordDto) {
    const controller = this._factory.create();

    //try {
      await controller.resetPassword(ResetPasswordDto.toMessage(resetPasswordDto));
    // } catch (ex) {
    //   console.log('reset-password::facede::exec::ex');
    //   console.dir(ex);
    //   throw new BadRequestException(ex.message);
    // }
    
  }
}