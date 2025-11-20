import { ChatPanel } from '../src/components/ChatPanel';
import { ReadingDashboard } from '../src/components/ReadingDashboard';

const tools = [
  'searchBooks',
  'getBookDetails',
  'addToReadingList',
  'getReadingList',
  'markAsRead',
  'getReadingStats',
];

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Asistente conversacional listo para producción</h2>
        <p className="mt-2 text-base text-slate-700">
          El frontend de chat usa streaming con el AI SDK de Vercel y se comunica con el backend para cada tool. Todas las
          llamadas a OpenRouter y Google Books se ejecutan desde el servidor, con sanitización de entradas, rate limiting y
          persistencia en SQLite.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Las seis herramientas obligatorias están disponibles vía <code>/api/tools/[tool]</code> y también se orquestan
          mediante tool calling en <code>/api/chat</code>. El almacenamiento de listas, historial y estadísticas está en la
          base de datos definida en <code>DATABASE_URL</code> (por defecto un archivo local en <code>data/</code>).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatPanel />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Herramientas disponibles</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-600">
              Las validaciones se realizan con Zod y todos los parámetros se limpian antes de invocar Google Books u OpenRouter.
            </p>
          </div>
        </div>
      </div>

      <ReadingDashboard />
    </section>
  );
}
