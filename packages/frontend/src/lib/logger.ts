// Browser-safe logger for the frontend
import { createConsoleLogger } from '@agentic-todo-list/shared/dist/logger/console-logger';

const logger = createConsoleLogger();

export const logInfo = (message: string, meta?: any): void => {
  logger.info(message, meta);
};

export const logError = (message: string, meta?: any): void => {
  logger.error(message, meta);
};

export const logWarn = (message: string, meta?: any): void => {
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: any): void => {
  logger.debug(message, meta);
};

export default {
  logInfo,
  logError,
  logWarn,
  logDebug,
};
