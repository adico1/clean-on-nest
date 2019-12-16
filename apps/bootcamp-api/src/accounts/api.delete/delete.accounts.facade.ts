import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { AccountIdDto } from '../dto/account-id.dto';
import { DeleteAccountLogicController } from '@btcp/bootcamp-interfaceadapters';

export class DeleteAccountFacade 
extends IControllerFacede<DeleteAccountLogicController> {
  public async exec(id: string) {
    const controller = this._factory.create();
    await controller.delete(AccountIdDto.toMessage({id: id}));
  }
}