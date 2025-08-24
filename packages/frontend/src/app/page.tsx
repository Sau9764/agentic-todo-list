import { TodoList } from '@/components/TodoList';
import { Header } from '@/components/Header';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="mt-8">
        <TodoList />
      </main>
    </div>
  );
}
