// Enhanced logger with console fallback
import { createConsoleLogger, ConsoleLogger } from './console-logger';

let logger: any = null;
let consoleLogger: ConsoleLogger | null = null;

// Try to import Winston, fallback to console if not available
try {
  const winston = require('winston');
  
  // Create Winston logger
  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    defaultMeta: { service: 'agentic-todo-list' },
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
    ],
  });

  // Add file transport in production
  if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }));
    logger.add(new winston.transports.File({ 
      filename: 'logs/combined.log' 
    }));
  }
} catch (error) {
  // Winston not available, use console logger
  consoleLogger = createConsoleLogger();
}

// Export logging functions
export const logInfo = (message: string, meta?: any): void => {
  if (logger) {
    logger.info(message, meta);
  } else if (consoleLogger) {
    consoleLogger.info(message, meta);
  } else {
    console.log(`[INFO] ${message}`, meta);
  }
};

export const logError = (message: string, meta?: any): void => {
  if (logger) {
    logger.error(message, meta);
  } else if (consoleLogger) {
    consoleLogger.error(message, meta);
  } else {
    console.error(`[ERROR] ${message}`, meta);
  }
};

export const logWarn = (message: string, meta?: any): void => {
  if (logger) {
    logger.warn(message, meta);
  } else if (consoleLogger) {
    consoleLogger.warn(message, meta);
  } else {
    console.warn(`[WARN] ${message}`, meta);
  }
};

export const logDebug = (message: string, meta?: any): void => {
  if (logger) {
    logger.debug(message, meta);
  } else if (consoleLogger) {
    consoleLogger.debug(message, meta);
  } else {
    console.debug(`[DEBUG] ${message}`, meta);
  }
};

// Export logger instance for advanced usage
export const getLogger = () => {
  return logger || consoleLogger;
};

// Export Winston logger if available
export { logger as WinstonLogger };
