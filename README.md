# AI Book Advisor

Prototipo de asistente conversacional para recomendaciones de lectura basado en Next.js 15 (App Router), el AI SDK de Vercel y la API de Google Books. Incluye una ruta de herramientas lista para el tool calling del LLM, validación con Zod y almacenamiento en memoria para listas y estadísticas de lectura.

## Configuración rápida
1. Crea un archivo `.env.local` con tus credenciales (no se commitea):
   ```bash
   OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   OPENROUTER_MODEL=anthropic/claude-3-haiku
   GOOGLE_BOOKS_API_KEY=your-google-books-api-key
   DATABASE_URL=postgresql://user:password@localhost:5432/bookadvisor
   RATE_LIMIT_MAX_REQUESTS=100
   RATE_LIMIT_WINDOW_MS=900000
   ```

2. Instala dependencias y ejecuta el entorno de desarrollo:
   ```bash
   npm install
   npm run dev
   ```

## Rutas clave
- `GET /api/tools/[tool]`: lista de tools disponibles.
- `POST /api/tools/searchBooks`: busca libros en Google Books (requiere `query`).
- `POST /api/tools/getBookDetails`: obtiene detalles completos por `bookId`.
- `POST /api/tools/addToReadingList`: agrega un libro a la lista del usuario (`x-user-id` en headers opcional).
- `POST /api/tools/getReadingList`: recupera la lista según `filter` y `limit`.
- `POST /api/tools/markAsRead`: marca como leído con `rating`/`review` opcional.
- `POST /api/tools/getReadingStats`: genera estadísticas básicas (almacenamiento en memoria).

Todas las rutas validan payloads con Zod, sanitizan queries y usan exclusivamente el backend para acceder a Google Books, evitando exponer API keys en el frontend.

## Pendientes sugeridos
- Conectar el AI SDK para streaming de respuestas y tool calling.
- Persistir listas y stats en base de datos real (Prisma/Supabase/etc.).
- Implementar rate limiting y control de sesiones/usuarios.
- Añadir UI de chat y visualización de resultados de libros.
