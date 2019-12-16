import { ArgumentMetadata, Injectable, 
  PipeTransform, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class AccountsPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
//    console.dir(errors);

    if (errors.length>0) {
      let message = '';
      errors.forEach(err => {
        let reason = '';
        Object.keys(err.constraints).forEach(key => {
          reason += ` ${err.constraints[key]} | `;
        });
        //console.dir(err);
        message += `property: ${err.property}, reason: ${reason}`;
      });

      throw new BadRequestException(`type: validation; ${message}`);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
