import { ChatPanel } from '../src/components/ChatPanel';
import { ReadingDashboard } from '../src/components/ReadingDashboard';

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatPanel />
        </div>
        <div className="lg:col-span-1">
          <ReadingDashboard />
        </div>
      </div>
    </section>
  );
}
