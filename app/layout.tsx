import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Book Advisor',
  description: 'Conversational reading companion powered by the Vercel AI SDK and Google Books.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
          <header className="space-y-2">
            <p className="text-sm font-semibold text-indigo-600">Ejercicio 13 - Parte 2A</p>
            <h1 className="text-3xl font-bold">AI Book Advisor</h1>
            <p className="text-base text-slate-600">
              Asistente conversacional para descubrir libros, gestionar listas de lectura y explorar estadísticas de hábitos.
            </p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
