// Application configuration utilities
export interface AppConfig {
  name: string;
  version: string;
  description: string;
  environment: string;
  port: number;
  host: string;
  cors: {
    origin: string[];
    credentials: boolean;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
  security: {
    bcryptRounds: number;
    jwtSecret: string;
    jwtExpiresIn: string;
  };
}

export const getDefaultAppConfig = (): AppConfig => {
  return {
    name: process.env.APP_NAME || 'Agentic Todo List',
    version: process.env.APP_VERSION || '1.0.0',
    description: process.env.APP_DESCRIPTION || 'A modern todo list application',
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || 'localhost',
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: true,
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    },
    security: {
      bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
      jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
  };
};

export const validateAppConfig = (config: AppConfig): void => {
  if (!config.name || config.name.trim().length === 0) {
    throw new Error('Application name cannot be empty');
  }
  
  if (!config.version || config.version.trim().length === 0) {
    throw new Error('Application version cannot be empty');
  }
  
  if (config.port < 1 || config.port > 65535) {
    throw new Error('Application port must be between 1 and 65535');
  }
  
  if (!config.cors.origin || config.cors.origin.length === 0) {
    throw new Error('CORS origin must be specified');
  }
  
  if (!config.security.jwtSecret || config.security.jwtSecret.trim().length === 0) {
    throw new Error('JWT secret cannot be empty');
  }
  
  if (config.security.bcryptRounds < 1 || config.security.bcryptRounds > 20) {
    throw new Error('BCrypt rounds must be between 1 and 20');
  }
};

export const getCorsConfig = (config: AppConfig) => {
  return {
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400, // 24 hours
  };
};

export const getRateLimitConfig = (config: AppConfig) => {
  return {
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
      error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  };
};

export const getSecurityConfig = (config: AppConfig) => {
  return {
    bcryptRounds: config.security.bcryptRounds,
    jwt: {
      secret: config.security.jwtSecret,
      expiresIn: config.security.jwtExpiresIn,
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
    },
  };
};
