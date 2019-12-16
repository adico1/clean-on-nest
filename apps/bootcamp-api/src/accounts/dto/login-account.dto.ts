import { IDto } from '../../shared/interfaces/dto.interface';
import { AccountIdRequestMessage, LoginAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { LoggedInUser } from '@btcp/bootcamp-entities';
import { InetLocationDto } from './inet-location.dto';

export class LoginAccountDto implements IDto {

  loggedInUser: LoggedInUser;
  inetLocation: InetLocationDto;

    static create(
      loggedInUser: LoggedInUser,
      inetLocation: InetLocationDto): LoginAccountDto {
      
        const dto = new LoginAccountDto();
        dto.loggedInUser = loggedInUser;
        dto.inetLocation = inetLocation;
        
        return dto;
    }

    static toMessage(dto: LoginAccountDto): LoginAccountsRequestMessage {
      return {
        loggedInUser: dto.loggedInUser,
        inetLocation: {...dto.inetLocation}
      } as LoginAccountsRequestMessage
    }
  }
