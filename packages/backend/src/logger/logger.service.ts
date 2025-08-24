import { Injectable } from '@nestjs/common';
import { logInfo, logError, logWarn, logDebug, Logger } from '@agentic-todo-list/shared';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger();

  info(message: string, meta?: any): void {
    logInfo(message, meta);
  }

  error(message: string, meta?: any): void {
    logError(message, meta);
  }

  warn(message: string, meta?: any): void {
    logWarn(message, meta);
  }

  debug(message: string, meta?: any): void {
    logDebug(message, meta);
  }

  logRequest(method: string, url: string, statusCode: number, responseTime: number): void {
    this.logger.logRequest(method, url, statusCode, responseTime);
  }

  logQuery(sql: string, duration: number): void {
    this.logger.logQuery(sql, duration);
  }

  logPerformance(operation: string, duration: number): void {
    this.logger.logPerformance(operation, duration);
  }

  logError(error: Error, context?: string): void {
    this.logger.logError(error, context);
  }

  logStructured(level: string, message: string, data: Record<string, any>): void {
    this.logger.logStructured(level, message, data);
  }
}
