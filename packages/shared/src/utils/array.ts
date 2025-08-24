// Array utility functions
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const uniqueBy = <T, K extends keyof T>(array: T[], key: K): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T, K extends keyof T>(array: T[], key: K, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterBy = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.filter(predicate);
};

export const findIndex = <T>(array: T[], predicate: (item: T) => boolean): number => {
  return array.findIndex(predicate);
};

export const find = <T>(array: T[], predicate: (item: T) => boolean): T | undefined => {
  return array.find(predicate);
};

export const includes = <T>(array: T[], item: T): boolean => {
  return array.includes(item);
};

export const remove = <T>(array: T[], item: T): T[] => {
  return array.filter(i => i !== item);
};

export const removeAt = <T>(array: T[], index: number): T[] => {
  if (index < 0 || index >= array.length) return array;
  return array.filter((_, i) => i !== index);
};

export const insert = <T>(array: T[], index: number, item: T): T[] => {
  const result = [...array];
  result.splice(index, 0, item);
  return result;
};

export const update = <T>(array: T[], index: number, item: T): T[] => {
  if (index < 0 || index >= array.length) return array;
  const result = [...array];
  result[index] = item;
  return result;
};

export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const sample = <T>(array: T[], size: number = 1): T[] => {
  if (size >= array.length) return shuffle(array);
  const shuffled = shuffle(array);
  return shuffled.slice(0, size);
};

export const flatten = <T>(array: T[][]): T[] => {
  return array.reduce((flat, item) => flat.concat(item), [] as T[]);
};

export const flattenDeep = <T>(array: any[]): T[] => {
  return array.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenDeep(item) : item);
  }, [] as T[]);
};

export const compact = <T>(array: T[]): T[] => {
  return array.filter(item => item != null);
};

export const isEmpty = (array: any[]): boolean => {
  return array.length === 0;
};

export const isNotEmpty = (array: any[]): boolean => {
  return array.length > 0;
};

export const first = <T>(array: T[]): T | undefined => {
  return array[0];
};

export const last = <T>(array: T[]): T | undefined => {
  return array[array.length - 1];
};

export const take = <T>(array: T[], n: number): T[] => {
  return array.slice(0, n);
};

export const takeRight = <T>(array: T[], n: number): T[] => {
  return array.slice(-n);
};

export const drop = <T>(array: T[], n: number): T[] => {
  return array.slice(n);
};

export const dropRight = <T>(array: T[], n: number): T[] => {
  return array.slice(0, -n);
};

export const intersection = <T>(...arrays: T[][]): T[] => {
  return arrays.reduce((intersection, array) => {
    return intersection.filter(item => array.includes(item));
  });
};

export const union = <T>(...arrays: T[][]): T[] => {
  return unique(flatten(arrays));
};

export const difference = <T>(array1: T[], array2: T[]): T[] => {
  return array1.filter(item => !array2.includes(item));
};

export const zip = <T, U>(array1: T[], array2: U[]): [T, U][] => {
  const length = Math.min(array1.length, array2.length);
  const result: [T, U][] = [];
  
  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]]);
  }
  
  return result;
};

export const unzip = <T, U>(array: [T, U][]): [T[], U[]] => {
  const result1: T[] = [];
  const result2: U[] = [];
  
  array.forEach(([item1, item2]) => {
    result1.push(item1);
    result2.push(item2);
  });
  
  return [result1, result2];
};
