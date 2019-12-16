import { ForgotPasswordAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { InetLocationDto } from '../dto/inet-location.dto';
import { CreateForgotPasswordDto } from '../dto/create-forgot-password.dto';

export class ForgotPasswordAccountFacade 
extends IControllerFacede<ForgotPasswordAccountLogicController> {
  public async exec(
    forgotPasswordAccountDto: CreateForgotPasswordDto,
    inetLocation: InetLocationDto) {

    const controller = this._factory.create();

    // try {
      forgotPasswordAccountDto.inetLocation = inetLocation
      await controller.forgotPassword(CreateForgotPasswordDto.toMessage(forgotPasswordAccountDto));  
    // } catch (ex) {
    //  throw new BadRequestException(ex.message);
    // }
  }
}