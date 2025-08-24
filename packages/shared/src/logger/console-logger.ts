// Console logger fallback for environments without Winston
export interface ConsoleLogger {
  info: (message: string, meta?: any) => void;
  error: (message: string, meta?: any) => void;
  warn: (message: string, meta?: any) => void;
  debug: (message: string, meta?: any) => void;
}

export const createConsoleLogger = (): ConsoleLogger => {
  const formatMessage = (level: string, message: string, meta?: any): string => {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
  };

  return {
    info: (message: string, meta?: any) => {
      console.log(formatMessage('info', message, meta));
    },
    error: (message: string, meta?: any) => {
      console.error(formatMessage('error', message, meta));
    },
    warn: (message: string, meta?: any) => {
      console.warn(formatMessage('warn', message, meta));
    },
    debug: (message: string, meta?: any) => {
      console.debug(formatMessage('debug', message, meta));
    },
  };
};
