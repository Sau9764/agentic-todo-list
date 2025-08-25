import React from 'react';
import { KanbanBoard } from '../components/KanbanBoard';
import { APP_NAME } from '@agentic-todo-list/shared';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Kanban Board Component */}
      <KanbanBoard />
    </div>
  );
}
