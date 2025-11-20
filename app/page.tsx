import Link from 'next/link';

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
        <h2 className="text-2xl font-semibold">Estado del prototipo</h2>
        <p className="mt-2 text-base text-slate-700">
          Este proyecto inicia la base del asistente de libros con Next.js 15 y el AI SDK de Vercel. Incluye una API
          segura en el backend para tool calling y utilidades de sanitización de inputs, cumpliendo las reglas de no exponer
          keys en el cliente.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Los endpoints de tools están listos para recibir llamadas POST desde el LLM y validan los parámetros con Zod.
          Las operaciones de lectura/escritura usan un almacén en memoria para mantener el flujo conversacional mientras se
          conecta una base de datos real.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Herramientas disponibles</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Consulta <code>/app/api/tools/[tool]</code> para ver las validaciones y cómo conectar con Google Books sin exponer
            credenciales en el frontend.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Siguientes pasos sugeridos</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            <li>Conectar las respuestas del LLM usando <code>ai</code> y tool calling.</li>
            <li>Persistir listas y estadísticas en la base de datos elegida.</li>
            <li>Implementar streaming de chat e indicadores de ejecución de tools.</li>
            <li>Agregar protección de rate limiting en las rutas de API.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Revisa los helpers en <code>src/server</code> para integrar tu proveedor de datos y mantener la sanitización de
            entradas antes de llamar APIs externas.
          </p>
          <Link className="mt-4 inline-flex text-indigo-600 hover:text-indigo-700" href="https://sdk.vercel.ai/">
            Docs del AI SDK →
          </Link>
        </div>
      </div>
    </section>
  );
}
