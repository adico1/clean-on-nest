import { GetByIdAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { AccountIdDto } from '../dto/account-id.dto';

export class GetByIdAccountFacade 
extends IControllerFacede<GetByIdAccountLogicController> {
  public async exec(id: string) {
    const controller = this._factory.create();
    await controller.getById(AccountIdDto.toMessage({id}));
  }
}