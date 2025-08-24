import React from 'react';
import { TodoList } from '@/components/TodoList';
import { APP_NAME } from '@agentic-todo-list/shared';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to {APP_NAME}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A modern todo list application built with Next.js and NestJS. 
          Manage your tasks efficiently with our intuitive interface.
        </p>
      </div>

      {/* Todo List Component */}
      <TodoList />
    </div>
  );
}
