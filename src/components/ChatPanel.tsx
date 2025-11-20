'use client';

import { useChat } from 'ai/react';
import { FormEvent, useEffect, useMemo, useRef } from 'react';

const roleLabel: Record<string, string> = {
  user: 'Tú',
  assistant: 'Asistente',
  system: 'Sistema',
  tool: 'Tool',
};

export function ChatPanel() {
  const { messages, handleSubmit, handleInputChange, input, isLoading, stop } = useChat({ api: '/api/chat' });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const friendlyMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        displayName: roleLabel[message.role] || message.role,
      })),
    [messages],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    handleSubmit(event);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Chat</p>
          <h2 className="text-xl font-bold text-slate-900">Recomendaciones en tiempo real</h2>
          <p className="text-sm text-slate-600">
            Conecta con OpenRouter a través del backend. Las herramientas se ejecutan de forma segura y los resultados llegan en
            streaming.
          </p>
        </div>
        {isLoading && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Pensando…</span>
        )}
      </header>

      <div ref={scrollRef} className="h-[420px] space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-3">
        {friendlyMessages.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600">
            Pide recomendaciones por género, autor o estado de ánimo. El asistente puede buscar en Google Books, guardar libros,
            marcar como leídos y calcular estadísticas.
          </div>
        )}

        {friendlyMessages.map((message) => (
          <div key={message.id} className="flex flex-col gap-1 rounded-lg bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">{message.displayName}</span>
              <span className="text-[10px] uppercase tracking-wide text-slate-400">{message.role}</span>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-slate-700" htmlFor="message">
          Escribe tu consulta
        </label>
        <div className="flex items-center gap-3">
          <textarea
            id="message"
            name="message"
            value={input}
            onChange={(event) => {
              const sanitized = event.target.value.slice(0, 800);
              if (sanitized !== event.target.value) {
                event.target.value = sanitized;
              }
              handleInputChange(event);
            }}
            className="min-h-[80px] flex-1 resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 shadow-inner focus:border-indigo-500 focus:outline-none"
            placeholder="Ej. Recomiéndame novelas de ciencia ficción optimistas y guárdalas con prioridad alta"
            required
            maxLength={800}
          />
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
              disabled={isLoading}
            >
              Enviar
            </button>
            {isLoading && (
              <button
                type="button"
                onClick={() => stop()}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Detener
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
