import { useState } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Todo, TODO_PRIORITIES } from '@agentic-todo-list/shared';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTodo,
      description: '',
      completed: false,
      priority: 'medium',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case TODO_PRIORITIES.HIGH:
        return 'text-red-600';
      case TODO_PRIORITIES.MEDIUM:
        return 'text-yellow-600';
      case TODO_PRIORITIES.LOW:
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">My Todos</h2>
        
        {/* Add Todo Form */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            className="input flex-1"
          />
          <button
            onClick={addTodo}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No todos yet. Add one above to get started!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0"
                >
                  {todo.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p className={`text-xs ${getPriorityColor(todo.priority)}`}>
                    {todo.priority} priority
                  </p>
                </div>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
