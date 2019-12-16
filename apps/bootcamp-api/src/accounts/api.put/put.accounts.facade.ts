import { PutAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { UpdateAccountDto } from '../dto/update-account.dto';

export class PutAccountFacade extends IControllerFacede<PutAccountLogicController> {
  public async exec(updateAccountDto: UpdateAccountDto) {
    const controller = this._factory.create();

    await controller.put(UpdateAccountDto.toMessage(updateAccountDto));
  }
}