import { IDto } from '../../shared/interfaces/dto.interface';
import { AccountIdRequestMessage } from '@btcp/bootcamp-blogic';

export class AccountIdDto implements IDto {

    public id: string;

    static create(id: string): AccountIdDto {
      const dto = new AccountIdDto();
      dto.id = id;
      return dto;
    }

    static toMessage(dto: AccountIdDto): AccountIdRequestMessage {
      return {
        accountId: dto.id
      } as AccountIdRequestMessage
    }
  }
