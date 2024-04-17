import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseLogInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const responseLog = {
      apiEndpoint: context.switchToHttp().getRequest().url,
      method: context.switchToHttp().getRequest().method,
      status: context.switchToHttp().getResponse().statusCode,
      answeredAt: new Date(Date.now()).toLocaleString('fr'),
    };

    return next.handle().pipe(
      tap(
        () => Logger.debug(JSON.stringify(responseLog)),
        catchError((err) => {
          responseLog.status = err.status;
          Logger.error(JSON.stringify(responseLog));
          return throwError(() => {
            switch (err.status) {
              case 400:
                return new BadRequestException(err);
              default:
                return new InternalServerErrorException(err);
            }
          });
        }),
      ),
    );
  }
}
