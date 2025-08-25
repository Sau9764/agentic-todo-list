// Browser-safe logger implementation
import { ConsoleLogger, createConsoleLogger } from './console-logger';

// Create a browser-safe console logger
const browserLogger: ConsoleLogger = createConsoleLogger();

// Export logging functions that are safe for browser environments
export const logInfo = (message: string, meta?: any): void => {
  browserLogger.info(message, meta);
};

export const logError = (message: string, meta?: any): void => {
  browserLogger.error(message, meta);
};

export const logWarn = (message: string, meta?: any): void => {
  browserLogger.warn(message, meta);
};

export const logDebug = (message: string, meta?: any): void => {
  browserLogger.debug(message, meta);
};

// Export logger instance for advanced usage
export const getLogger = (): ConsoleLogger => {
  return browserLogger;
};
