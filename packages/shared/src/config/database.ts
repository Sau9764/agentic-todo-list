// Database configuration utilities
export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  synchronize?: boolean;
  logging?: boolean;
  ssl?: boolean;
  pool?: {
    min?: number;
    max?: number;
    acquire?: number;
    idle?: number;
  };
}

export const createDatabaseUrl = (config: DatabaseConfig): string => {
  const { host, port, name, username, password, ssl } = config;
  const protocol = ssl ? 'postgresql' : 'postgres';
  return `${protocol}://${username}:${password}@${host}:${port}/${name}`;
};

export const getDefaultDatabaseConfig = (): DatabaseConfig => {
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'agentic_todo_list',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production',
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || '2', 10),
      max: parseInt(process.env.DB_POOL_MAX || '10', 10),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10),
    },
  };
};

export const validateDatabaseConfig = (config: DatabaseConfig): void => {
  const required = ['host', 'port', 'name', 'username', 'password'];
  const missing = required.filter(key => !config[key as keyof DatabaseConfig]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required database configuration: ${missing.join(', ')}`);
  }
  
  if (config.port < 1 || config.port > 65535) {
    throw new Error('Database port must be between 1 and 65535');
  }
  
  if (!config.name || config.name.trim().length === 0) {
    throw new Error('Database name cannot be empty');
  }
};

export const getTypeOrmConfig = (config: DatabaseConfig) => {
  return {
    type: 'postgres' as const,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.name,
    synchronize: config.synchronize || false,
    logging: config.logging || false,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
    extra: {
      connectionLimit: config.pool?.max || 10,
    },
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    subscribers: [__dirname + '/../database/subscribers/*{.ts,.js}'],
  };
};
