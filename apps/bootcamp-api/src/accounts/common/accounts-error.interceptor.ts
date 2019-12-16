import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const ERROR_MSG_DUPLICATE_EMAIL = 'type: validation; property: email; reason: duplicate';

@Injectable()
export class AccountsErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          // console.log(err.name);
          if (err.name === 'QueryFailedError') {
            if (/^duplicate key value violates unique constraint/.test(err.message)) {
              return throwError(new BadRequestException(ERROR_MSG_DUPLICATE_EMAIL));
            } else if (/violates foreign key constraint/.test(err.message)) {
              return throwError(new BadRequestException(err.message));
            } else {
              return throwError(new BadGatewayException(err));
            }
          } else {
            return throwError(new BadGatewayException(err));
          }
        }),
      );
  }
}
