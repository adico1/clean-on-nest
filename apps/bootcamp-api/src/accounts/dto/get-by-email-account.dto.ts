import { IDto } from '../../shared/interfaces/dto.interface';
import { DeleteAccountsRequestMessage, GetByEmailAccountsRequestMessage } from '@btcp/bootcamp-blogic';

export class GetByEmailAccountDto implements IDto {

    public email: string;

    static create(email: string): GetByEmailAccountDto {
      const dto = new GetByEmailAccountDto();
      dto.email = email;
      return dto;
    }

    static toMessage(dto: GetByEmailAccountDto): GetByEmailAccountsRequestMessage {
      return {
        email: dto.email
      } as GetByEmailAccountsRequestMessage
    }
  }
