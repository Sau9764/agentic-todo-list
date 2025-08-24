import { Injectable } from '@nestjs/common';
import { logInfo, logError, logWarn, logDebug } from '@agentic-todo-list/shared';

@Injectable()
export class LoggerService {
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
}
