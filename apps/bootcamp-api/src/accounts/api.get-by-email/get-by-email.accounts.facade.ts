import { GetByEmailAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { GetByEmailAccountDto } from '../dto/get-by-email-account.dto';

export class GetByEmailAccountFacade extends IControllerFacede<GetByEmailAccountLogicController> {
  public async exec(email: string) {
    const controller = this._factory.create();
    await controller.getByEmail(GetByEmailAccountDto.toMessage({email}));
  }
}