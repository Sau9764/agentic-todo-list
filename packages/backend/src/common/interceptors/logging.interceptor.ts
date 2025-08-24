import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logInfo, logError } from '@agentic-todo-list/shared';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = request;
    const now = Date.now();

    // Log request
    logInfo(`Incoming Request: ${method} ${url}`, {
      method,
      url,
      body: Object.keys(body).length > 0 ? body : undefined,
      query: Object.keys(query).length > 0 ? query : undefined,
      params: Object.keys(params).length > 0 ? params : undefined,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
    });

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const responseTime = Date.now() - now;
          
          logInfo(`Outgoing Response: ${method} ${url} ${response.statusCode}`, {
            method,
            url,
            statusCode: response.statusCode,
            responseTime: `${responseTime}ms`,
          });
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          
          logError(`Request Error: ${method} ${url}`, {
            method,
            url,
            error: error.message,
            responseTime: `${responseTime}ms`,
            stack: error.stack,
          });
        },
      }),
    );
  }
}
