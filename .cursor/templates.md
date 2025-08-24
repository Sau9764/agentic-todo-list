# Code Templates for Agentic Todo List

## Backend Templates

### NestJS Module Template
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityName } from './entities/entity-name.entity';
import { EntityNameController } from './entity-name.controller';
import { EntityNameService } from './entity-name.service';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntityName]),
    LoggerModule,
  ],
  controllers: [EntityNameController],
  providers: [EntityNameService],
  exports: [EntityNameService],
})
export class EntityNameModule {}
```

### NestJS Controller Template
```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EntityNameService } from './entity-name.service';
import { CreateEntityNameDto } from './dto/create-entity-name.dto';
import { UpdateEntityNameDto } from './dto/update-entity-name.dto';
import { EntityNameFilters } from './dto/entity-name-filters.dto';

@ApiTags('entity-names')
@Controller('entity-names')
export class EntityNameController {
  constructor(private readonly entityNameService: EntityNameService) {}

  @Get()
  @ApiOperation({ summary: 'Get all entity names' })
  @ApiResponse({ status: 200, description: 'List of entity names' })
  async findAll(@Query() filters: EntityNameFilters) {
    return this.entityNameService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get entity name by id' })
  @ApiResponse({ status: 200, description: 'Entity name found' })
  @ApiResponse({ status: 404, description: 'Entity name not found' })
  async findOne(@Param('id') id: string) {
    return this.entityNameService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new entity name' })
  @ApiResponse({ status: 201, description: 'Entity name created' })
  async create(@Body() createEntityNameDto: CreateEntityNameDto) {
    return this.entityNameService.create(createEntityNameDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update entity name' })
  @ApiResponse({ status: 200, description: 'Entity name updated' })
  @ApiResponse({ status: 404, description: 'Entity name not found' })
  async update(@Param('id') id: string, @Body() updateEntityNameDto: UpdateEntityNameDto) {
    return this.entityNameService.update(id, updateEntityNameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete entity name' })
  @ApiResponse({ status: 200, description: 'Entity name deleted' })
  @ApiResponse({ status: 404, description: 'Entity name not found' })
  async remove(@Param('id') id: string) {
    return this.entityNameService.remove(id);
  }
}
```

### NestJS Service Template
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityName } from './entities/entity-name.entity';
import { CreateEntityNameDto } from './dto/create-entity-name.dto';
import { UpdateEntityNameDto } from './dto/update-entity-name.dto';
import { EntityNameFilters } from './dto/entity-name-filters.dto';

@Injectable()
export class EntityNameService {
  constructor(
    @InjectRepository(EntityName)
    private readonly entityNameRepository: Repository<EntityName>,
  ) {}

  async findAll(filters: EntityNameFilters): Promise<EntityName[]> {
    const queryBuilder = this.entityNameRepository.createQueryBuilder('entityName');
    
    // Apply filters
    if (filters.search) {
      queryBuilder.where('entityName.name ILIKE :search', { search: `%${filters.search}%` });
    }
    
    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<EntityName> {
    const entityName = await this.entityNameRepository.findOne({ where: { id } });
    if (!entityName) {
      throw new NotFoundException(`Entity name with ID ${id} not found`);
    }
    return entityName;
  }

  async create(createEntityNameDto: CreateEntityNameDto): Promise<EntityName> {
    const entityName = this.entityNameRepository.create(createEntityNameDto);
    return this.entityNameRepository.save(entityName);
  }

  async update(id: string, updateEntityNameDto: UpdateEntityNameDto): Promise<EntityName> {
    const entityName = await this.findOne(id);
    Object.assign(entityName, updateEntityNameDto);
    return this.entityNameRepository.save(entityName);
  }

  async remove(id: string): Promise<void> {
    const entityName = await this.findOne(id);
    await this.entityNameRepository.remove(entityName);
  }
}
```

### DTO Template
```typescript
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEntityNameDto {
  @ApiProperty({ description: 'Name of the entity' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the entity' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: ['active', 'inactive'] })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

export class UpdateEntityNameDto {
  @ApiPropertyOptional({ description: 'Name of the entity' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Description of the entity' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: ['active', 'inactive'] })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

export class EntityNameFilters {
  @ApiPropertyOptional({ description: 'Search term' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ['active', 'inactive'] })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
```

### Entity Template
```typescript
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('entity_names')
export class EntityName extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive'], 
    default: 'active' 
  })
  status: 'active' | 'inactive';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

## Frontend Templates

### React Component Template
```typescript
import React from 'react';
import { ComponentProps } from './ComponentName.types';

export const ComponentName: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2, 
  onAction 
}) => {
  const handleClick = () => {
    onAction?.();
  };

  return (
    <div className="component-name">
      <h2>{prop1}</h2>
      <p>{prop2}</p>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Action
      </button>
    </div>
  );
};
```

### Component Types Template
```typescript
export interface ComponentNameProps {
  prop1: string;
  prop2?: string;
  onAction?: () => void;
  className?: string;
}

export interface ComponentNameState {
  isLoading: boolean;
  error: string | null;
  data: any;
}
```

### Custom Hook Template
```typescript
import { useState, useCallback, useEffect } from 'react';
import { logInfo, logError } from '@agentic-todo-list/shared';

interface UseEntityNameState {
  data: any[];
  loading: boolean;
  error: string | null;
}

interface UseEntityNameActions {
  fetchData: () => Promise<void>;
  createItem: (data: any) => Promise<void>;
  updateItem: (id: string, data: any) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useEntityName = (): UseEntityNameState & UseEntityNameActions => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await api.entityName.getAll();
      // setData(response.data);
      
      logInfo('Entity name data fetched successfully');
    } catch (err) {
      const errorMessage = 'Failed to fetch entity name data';
      setError(errorMessage);
      logError(errorMessage, { error: err });
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback(async (itemData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await api.entityName.create(itemData);
      // setData(prev => [response.data, ...prev]);
      
      logInfo('Entity name item created successfully');
    } catch (err) {
      const errorMessage = 'Failed to create entity name item';
      setError(errorMessage);
      logError(errorMessage, { error: err });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (id: string, updates: any) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await api.entityName.update(id, updates);
      // setData(prev => prev.map(item => 
      //   item.id === id ? response.data : item
      // ));
      
      logInfo('Entity name item updated successfully');
    } catch (err) {
      const errorMessage = 'Failed to update entity name item';
      setError(errorMessage);
      logError(errorMessage, { error: err });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // await api.entityName.delete(id);
      // setData(prev => prev.filter(item => item.id !== id));
      
      logInfo('Entity name item deleted successfully');
    } catch (err) {
      const errorMessage = 'Failed to delete entity name item';
      setError(errorMessage);
      logError(errorMessage, { error: err });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    clearError,
  };
};
```

### Context Template
```typescript
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { logInfo } from '@agentic-todo-list/shared';

// State interface
interface EntityNameState {
  items: any[];
  selectedItem: any | null;
  filters: any;
}

// Action types
type EntityNameAction =
  | { type: 'SET_ITEMS'; payload: any[] }
  | { type: 'SET_SELECTED_ITEM'; payload: any | null }
  | { type: 'SET_FILTERS'; payload: any }
  | { type: 'ADD_ITEM'; payload: any }
  | { type: 'UPDATE_ITEM'; payload: any }
  | { type: 'DELETE_ITEM'; payload: string };

// Initial state
const initialState: EntityNameState = {
  items: [],
  selectedItem: null,
  filters: {},
};

// Reducer function
const entityNameReducer = (state: EntityNameState, action: EntityNameAction): EntityNameState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItem: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [action.payload, ...state.items] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Context interface
interface EntityNameContextType {
  state: EntityNameState;
  dispatch: React.Dispatch<EntityNameAction>;
  setItems: (items: any[]) => void;
  setSelectedItem: (item: any | null) => void;
  setFilters: (filters: any) => void;
  addItem: (item: any) => void;
  updateItem: (item: any) => void;
  deleteItem: (id: string) => void;
}

// Create context
const EntityNameContext = createContext<EntityNameContextType | undefined>(undefined);

// Provider component
interface EntityNameProviderProps {
  children: ReactNode;
}

export const EntityNameProvider: React.FC<EntityNameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entityNameReducer, initialState);

  const setItems = (items: any[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
    logInfo('Entity name items set', { count: items.length });
  };

  const setSelectedItem = (item: any | null) => {
    dispatch({ type: 'SET_SELECTED_ITEM', payload: item });
  };

  const setFilters = (filters: any) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const addItem = (item: any) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    logInfo('Entity name item added', { itemId: item.id });
  };

  const updateItem = (item: any) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
    logInfo('Entity name item updated', { itemId: item.id });
  };

  const deleteItem = (id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
    logInfo('Entity name item deleted', { itemId: id });
  };

  const value: EntityNameContextType = {
    state,
    dispatch,
    setItems,
    setSelectedItem,
    setFilters,
    addItem,
    updateItem,
    deleteItem,
  };

  return <EntityNameContext.Provider value={value}>{children}</EntityNameContext.Provider>;
};

// Custom hook to use the context
export const useEntityNameContext = (): EntityNameContextType => {
  const context = useContext(EntityNameContext);
  if (context === undefined) {
    throw new Error('useEntityNameContext must be used within an EntityNameProvider');
  }
  return context;
};
```

## Shared Templates

### Type Definition Template
```typescript
// Entity name related types
export interface EntityName {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityNameRequest {
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateEntityNameRequest {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface EntityNameFilters {
  search?: string;
  status?: 'active' | 'inactive';
  createdAtFrom?: Date;
  createdAtTo?: Date;
}

export interface EntityNameSortOptions {
  field: 'name' | 'status' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
}
```

### Utility Function Template
```typescript
/**
 * Utility function description
 * @param param1 - Description of parameter 1
 * @param param2 - Description of parameter 2
 * @returns Description of return value
 */
export const utilityFunction = (param1: string, param2?: number): string => {
  // Input validation
  if (!param1) {
    throw new Error('param1 is required');
  }

  // Business logic
  const result = param1.toUpperCase();
  
  // Return result
  return result;
};

/**
 * Async utility function template
 * @param data - Input data
 * @returns Promise with processed data
 */
export const asyncUtilityFunction = async (data: any): Promise<any> => {
  try {
    // Async operation
    const result = await someAsyncOperation(data);
    return result;
  } catch (error) {
    // Error handling
    throw new Error(`Failed to process data: ${error.message}`);
  }
};
```

### Constant Template
```typescript
// Entity name related constants
export const ENTITY_NAME_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export const ENTITY_NAME_STATUS_LABELS = {
  [ENTITY_NAME_STATUSES.ACTIVE]: 'Active',
  [ENTITY_NAME_STATUSES.INACTIVE]: 'Inactive',
} as const;

export const ENTITY_NAME_VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: 'Name must be at least 2 characters',
  NAME_MAX_LENGTH: 'Name must not exceed 255 characters',
  STATUS_INVALID: 'Status must be either active or inactive',
} as const;

export const ENTITY_NAME_API_ENDPOINTS = {
  BASE: '/api/v1/entity-names',
  GET_ALL: '/api/v1/entity-names',
  GET_BY_ID: (id: string) => `/api/v1/entity-names/${id}`,
  CREATE: '/api/v1/entity-names',
  UPDATE: (id: string) => `/api/v1/entity-names/${id}`,
  DELETE: (id: string) => `/api/v1/entity-names/${id}`,
} as const;
```

## Usage Instructions

1. **Copy the template** that matches your needs
2. **Replace placeholder names** (EntityName, entity-name, etc.) with your actual entity name
3. **Customize the properties** and methods according to your requirements
4. **Follow the project conventions** for naming and structure
5. **Add proper validation** and error handling
6. **Update the shared types** if needed
7. **Test the implementation** thoroughly

## Notes

- All templates follow the project's established patterns
- Templates include proper TypeScript typing
- Error handling and logging are included
- Templates are designed for the monorepo structure
- Follow the naming conventions specified in the rules
