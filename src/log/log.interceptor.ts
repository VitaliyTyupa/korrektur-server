import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {

  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();
    const { method, url, user, query, body } = request;
    const host = request.headers.host;
    const logData = {
      method,
      domain: host.split(':')[0],
      url,
      userId: user?.sub || 'Anonymous',
      params: method === 'GET' ? query : body,
      timestamp: new Date().toISOString(),
    };

    return next.handle().pipe(
      tap(async () => {
        logData['statusCode'] = response.statusCode;
        logData['duration'] = `${Date.now() - startTime}ms`;
        try {
          await this.logService.saveLog(logData);
        } catch (error) {
          console.error('Failed to save log:', error.message);
        }
      }),
      catchError((error) => {
        logData['error'] = error.message;
        logData['statusCode'] = error.status || 500;
        this.logService.saveLog(logData).then();
        return throwError(() => error);
      }),
    );
  }
}