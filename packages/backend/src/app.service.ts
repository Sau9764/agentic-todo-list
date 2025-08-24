import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { APP_NAME, APP_VERSION } from '@agentic-todo-list/shared';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  getHealth(): { status: string; timestamp: string; app: string; version: string } {
    this.logger.info('Health check requested');
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      app: APP_NAME,
      version: APP_VERSION,
    };
  }

  getInfo(): { name: string; version: string; environment: string } {
    return {
      name: APP_NAME,
      version: APP_VERSION,
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
