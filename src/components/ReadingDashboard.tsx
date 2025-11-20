'use client';

import { useEffect, useMemo, useState } from 'react';
import { ReadingListEntry, ReadingStats } from '../types';

type ApiResult<T> = { result?: T; error?: string };

const fetchTool = async <T,>(tool: string, payload: Record<string, unknown>): Promise<ApiResult<T>> => {
  const res = await fetch(`/api/tools/${tool}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return { error: error?.error || 'No se pudo completar la acción' };
  }
  const data = await res.json();
  return { result: data.result };
};

const priorityLabel: Record<string, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export function ReadingDashboard() {
  const [list, setList] = useState<ReadingListEntry[]>([]);
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    const [listResponse, statsResponse] = await Promise.all([
      fetchTool<{ items: ReadingListEntry[] }>('getReadingList', { filter: 'all', limit: 20 }),
      fetchTool<{ stats: ReadingStats }>('getReadingStats', { period: 'all-time', groupBy: 'genre' }),
    ]);

    if (listResponse.error) setError(listResponse.error);
    if (statsResponse.error) setError(statsResponse.error);

    setList(listResponse.result?.items ?? []);
    setStats(statsResponse.result?.stats ?? null);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const topGenres = useMemo(() =>
    stats
      ? Object.entries(stats.genres)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name, value]) => `${name} (${value})`)
      : [],
  [stats]);

  const topAuthors = useMemo(() =>
    stats
      ? Object.entries(stats.authors)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name, value]) => `${name} (${value})`)
      : [],
  [stats]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Tu biblioteca</p>
          <h2 className="text-xl font-bold text-slate-900">Lista, historial y estadísticas</h2>
          <p className="text-sm text-slate-600">
            Todos los datos se guardan en SQLite en el backend. Puedes agregar libros con el chat o usando las tools.
          </p>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Actualizar
        </button>
      </header>

      {error && <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}

      <section className="mt-4 grid gap-3 sm:grid-cols-3">
        <StatCard label="Libros leídos" value={stats?.totalRead ?? 0} accent="bg-indigo-50 text-indigo-700" />
        <StatCard label="Páginas estimadas" value={stats?.totalPages ?? 0} accent="bg-emerald-50 text-emerald-700" />
        <StatCard label="Racha" value={stats?.streakDays ?? 0} accent="bg-amber-50 text-amber-700" suffix="días" />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-lg font-semibold text-slate-900">Lista de lectura</h3>
          <p className="text-xs text-slate-500">Prioridades, notas y estado guardados en base de datos.</p>

          <div className="mt-3 space-y-3">
            {list.length === 0 && <p className="text-sm text-slate-600">Aún no has agregado libros.</p>}
            {list.map((item) => (
              <article key={`${item.bookId}-${item.addedAt}`} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{item.title || 'Título no disponible'}</p>
                    <p className="text-xs text-slate-600">{item.authors?.join(', ') || 'Autores no disponibles'}</p>
                    <p className="text-xs text-slate-500">Guardado: {new Date(item.addedAt).toLocaleDateString()}</p>
                    {item.notes && <p className="text-xs text-slate-600">Notas: {item.notes}</p>}
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    {priorityLabel[item.priority] || 'Media'}
                  </span>
                </div>
                {item.status === 'read' && item.rating && (
                  <p className="mt-2 text-xs text-amber-700">Valoración: {item.rating}/5</p>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-lg font-semibold text-slate-900">Patrones de lectura</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <p>
              ⭐ Promedio de rating: <strong>{stats?.averageRating?.toFixed(2) ?? 'N/A'}</strong>
            </p>
            <p>
              📚 Géneros más leídos: <strong>{topGenres.join(' · ') || '—'}</strong>
            </p>
            <p>
              🧑‍💻 Autores frecuentes: <strong>{topAuthors.join(' · ') || '—'}</strong>
            </p>
            <p className="text-xs text-slate-500">
              Los cálculos usan la tabla <code>read_books</code> y se filtran en backend según el periodo solicitado.
            </p>
          </div>
          {loading && <p className="mt-2 text-xs text-slate-500">Actualizando datos…</p>}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, accent, suffix }: { label: string; value: number; accent: string; suffix?: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 p-4 ${accent}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900">
        {value} {suffix && <span className="text-sm font-semibold text-slate-600">{suffix}</span>}
      </p>
    </div>
  );
}
