import React from 'react';
import Link from 'next/link';
import { APP_NAME } from '@agentic-todo-list/shared';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="btn btn-primary inline-block"
          >
            Go Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Back to {APP_NAME}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
