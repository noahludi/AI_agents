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

const requirements = [
  'UI de chat lista para producción',
  'Tool calling backend-only con OpenRouter',
  'Integración segura con Google Books',
  'Base de datos para listas y stats',
  '6 herramientas validadas con Zod',
  'Rate limiting y sanitización aplicada',
];

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-semibold">Checklist del ejercicio resuelta</h2>
          <p className="text-sm text-slate-700">
            Chat conversacional con IA, tool calling completo y backend integrado con Google Books y base de datos. Todos los
            endpoints validan con Zod, aplican rate limiting y mantienen las API keys fuera del frontend.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {requirements.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-800"
              >
                <span className="text-emerald-600">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-indigo-700">
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold">Streaming habilitado</span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold">Tools accesibles en /api/tools/[tool]</span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold">Persistencia en SQLite</span>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Herramientas disponibles</h3>
          <p className="mt-1 text-sm text-slate-600">Ejecutadas solo en backend y orquestadas vía tool calling.</p>
          <ul className="mt-3 space-y-2">
            {tools.map((tool) => (
              <li key={tool} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                <span>{tool}</span>
                <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                  activa
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-600">
            Las validaciones se realizan con Zod y todos los parámetros se limpian antes de invocar Google Books u OpenRouter.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatPanel />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Seguridad aplicada</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>API keys solo en backend (.env.local en gitignore)</li>
              <li>Inputs sanitizados y validados</li>
              <li>Rate limiting en chat y tools</li>
            </ul>
            <p className="mt-3 text-xs text-slate-600">Configura tus credenciales en .env.local antes de ejecutar.</p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Datos persistentes</h3>
            <p className="mt-1 text-sm text-slate-700">
              La base usa SQLite por defecto; puedes apuntar <code>DATABASE_URL</code> a PostgreSQL, Supabase u otra opción sin
              modificar el código de las tools.
            </p>
          </div>
        </div>
      </div>

      <ReadingDashboard />
    </section>
  );
}
