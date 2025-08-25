import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { logInfo } from '../lib/logger';

// App state interface
interface AppState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AppState = {
  isLoading: false,
  error: null,
  theme: 'light',
  sidebarOpen: false,
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Context interface
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isClient, setIsClient] = React.useState(false);
  
  // Detect client-side hydration
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Load saved theme after hydration
  React.useEffect(() => {
    if (!isClient) return;
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme && savedTheme !== state.theme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
  }, [isClient, state.theme]);
  
  // Apply theme class when theme changes
  React.useEffect(() => {
    if (!isClient) return;
    
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme, isClient]);
  
  // Safety mechanism to ensure loading state is cleared after a timeout
  React.useEffect(() => {
    if (state.isLoading) {
      const safetyTimer = setTimeout(() => {
        console.log('Safety timeout triggered - resetting loading state');
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 3000); // 3 seconds max loading time
      
      return () => clearTimeout(safetyTimer);
    }
  }, [state.isLoading]);

  // Helper functions
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
    if (loading) {
      logInfo('App loading started');
    } else {
      logInfo('App loading finished');
    }
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
    if (error) {
      logInfo('App error set', { error });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      // Ignore localStorage errors
    }
    
    logInfo('Theme toggled', { theme: newTheme });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const value: AppContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    clearError,
    toggleTheme,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
