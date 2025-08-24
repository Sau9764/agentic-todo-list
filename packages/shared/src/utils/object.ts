// Object utility functions
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

export const isNotEmpty = (obj: any): boolean => {
  return !isEmpty(obj);
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

export const merge = <T extends object>(target: T, ...sources: Partial<T>[]): T => {
  const result = { ...target };
  
  sources.forEach(source => {
    if (source) {
      Object.keys(source).forEach(key => {
        const value = source[key as keyof T];
        if (value !== undefined) {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            result[key as keyof T] = merge(result[key as keyof T] as object, value as object) as T[keyof T];
          } else {
            (result as any)[key] = value;
          }
        }
      });
    }
  });
  
  return result;
};

export const flatten = (obj: any, prefix = ''): Record<string, any> => {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, flatten(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }
  
  return result;
};

export const unflatten = (obj: Record<string, any>): any => {
  const result: any = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const keys = key.split('.');
      let current = result;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current)) {
          current[k] = {};
        }
        current = current[k];
      }
      
      current[keys[keys.length - 1]] = obj[key];
    }
  }
  
  return result;
};

export const get = (obj: any, path: string, defaultValue?: any): any => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
};

export const set = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
};

export const has = (obj: any, path: string): boolean => {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current == null || typeof current !== 'object' || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
};

export const keys = (obj: any): string[] => {
  if (obj == null || typeof obj !== 'object') return [];
  return Object.keys(obj);
};

export const values = <T>(obj: Record<string, T>): T[] => {
  if (obj == null || typeof obj !== 'object') return [];
  return Object.values(obj);
};

export const entries = <T>(obj: Record<string, T>): [string, T][] => {
  if (obj == null || typeof obj !== 'object') return [];
  return Object.entries(obj);
};

export const size = (obj: any): number => {
  if (obj == null) return 0;
  if (Array.isArray(obj)) return obj.length;
  if (obj instanceof Map || obj instanceof Set) return obj.size;
  if (typeof obj === 'object') return Object.keys(obj).length;
  return 0;
};
