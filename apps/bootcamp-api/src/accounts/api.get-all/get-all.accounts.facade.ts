import { GetAllAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { GetAllAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';

export class GetAllAccountFacade 
extends IControllerFacede<GetAllAccountLogicController> {
  public async exec() {
    const controller = this._factory.create();
    await controller.getAll(new GetAllAccountsRequestMessage());
  }
}
