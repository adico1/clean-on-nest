import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { CreateAccountDto } from '../dto/create-account.dto';
import { CreateAccountLogicController } from '@btcp/bootcamp-interfaceadapters';

export class CreateAccountFacade
extends IControllerFacede<CreateAccountLogicController> {
  public async exec(createAccountDto: CreateAccountDto) {
    const controller = this._factory.create();
    await controller.create(CreateAccountDto.toMessage(createAccountDto));
  }
}