import { CheckSquare } from 'lucide-react';
import { APP_NAME } from '@agentic-todo-list/shared';

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <CheckSquare className="h-8 w-8 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">{APP_NAME}</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <button className="btn btn-primary">Sign In</button>
      </nav>
    </header>
  );
};
