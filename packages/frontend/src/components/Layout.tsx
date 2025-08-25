import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useApp } from '@/context/AppContext';
import { APP_NAME, APP_VERSION } from '@agentic-todo-list/shared';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = APP_NAME,
  description = 'A modern todo list application built with Next.js and NestJS'
}) => {
  const { state, toggleTheme, clearError } = useApp();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Fonts are now loaded in _document.tsx */}
      </Head>

      <div className={`min-h-screen ${state.theme === 'dark' ? 'dark' : ''}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  {APP_NAME}
                </h1>
                <span className="ml-2 text-sm text-gray-500">
                  v{APP_VERSION}
                </span>
              </div>
              
              <nav className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                  aria-label={`Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {state.theme === 'dark' ? '🌞' : '🌙'}
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              <p>&copy; 2025 {APP_NAME}. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Loading Overlay */}
        {state.isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Loading...</span>
            </div>
          </div>
        )}

        {/* Error Toast */}
        {state.error && (
          <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span>{state.error}</span>
              <button
                onClick={clearError}
                className="ml-2 text-white hover:text-red-200"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
