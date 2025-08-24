// Shared logger utility using Winston

import winston from 'winston';
import { Environment } from './types';
import { LOG_LEVELS } from './constants';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Add colors to Winston
winston.addColors(colors);

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define console format for development
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define file format for production
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Create logger instance
const createLogger = (environment: Environment = 'development') => {
  const isDevelopment = environment === 'development';
  const isProduction = environment === 'production';

  const transports: winston.transport[] = [];

  // Console transport for all environments
  transports.push(
    new winston.transports.Console({
      format: isDevelopment ? consoleFormat : logFormat,
      level: isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO,
    }),
  );

  // File transports for production
  if (isProduction) {
    // Error log file
    transports.push(
      new winston.transports.File({
        filename: 'logs/error.log',
        level: LOG_LEVELS.ERROR,
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    );

    // Combined log file
    transports.push(
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    );
  }

  return winston.createLogger({
    level: isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO,
    levels,
    format: logFormat,
    transports,
    exitOnError: false,
  });
};

// Default logger instance
const logger = createLogger((process.env.NODE_ENV as Environment) || 'development');

// Logger class with additional methods
export class Logger {
  private winstonLogger: winston.Logger;

  constructor(environment?: Environment) {
    this.winstonLogger = createLogger(environment);
  }

  // Log methods
  error(message: string, meta?: any): void {
    this.winstonLogger.error(message, meta);
  }

  warn(message: string, meta?: any): void {
    this.winstonLogger.warn(message, meta);
  }

  info(message: string, meta?: any): void {
    this.winstonLogger.info(message, meta);
  }

  debug(message: string, meta?: any): void {
    this.winstonLogger.debug(message, meta);
  }

  // HTTP request logging
  logRequest(method: string, url: string, statusCode: number, responseTime: number): void {
    const level = statusCode >= 400 ? LOG_LEVELS.WARN : LOG_LEVELS.INFO;
    const message = `${method} ${url} ${statusCode} ${responseTime}ms`;
    this.winstonLogger.log(level, message);
  }

  // Database query logging
  logQuery(sql: string, duration: number): void {
    this.winstonLogger.debug(`DB Query (${duration}ms): ${sql}`);
  }

  // Performance logging
  logPerformance(operation: string, duration: number): void {
    const level = duration > 1000 ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG;
    this.winstonLogger.log(level, `${operation} took ${duration}ms`);
  }

  // Error with stack trace
  logError(error: Error, context?: string): void {
    const message = context ? `${context}: ${error.message}` : error.message;
    this.winstonLogger.error(message, { stack: error.stack });
  }

  // Structured logging
  logStructured(level: string, message: string, data: Record<string, any>): void {
    this.winstonLogger.log(level, message, data);
  }
}

// Export default logger instance
export default logger;

// Convenience functions
export const logError = (message: string, meta?: any): void => {
  logger.error(message, meta);
};

export const logWarn = (message: string, meta?: any): void => {
  logger.warn(message, meta);
};

export const logInfo = (message: string, meta?: any): void => {
  logger.info(message, meta);
};

export const logDebug = (message: string, meta?: any): void => {
  logger.debug(message, meta);
};
