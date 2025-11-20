import { z } from 'zod';

export const searchBooksSchema = z.object({
  query: z.string().min(2, 'La búsqueda debe tener al menos 2 caracteres').max(100).trim(),
  maxResults: z.number().int().min(1).max(40).default(10),
  orderBy: z.enum(['relevance', 'newest']).default('relevance'),
});

export const getBookDetailsSchema = z.object({
  bookId: z.string().min(1).max(120).trim(),
});

export const addToReadingListSchema = z.object({
  bookId: z.string().min(1).max(120).trim(),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  notes: z.string().max(400).optional().transform((value) => value?.trim() || undefined),
});

export const getReadingListSchema = z.object({
  filter: z.enum(['high', 'medium', 'low', 'all']).default('all'),
  limit: z.number().int().min(1).max(50).default(20),
});

export const markAsReadSchema = z.object({
  bookId: z.string().min(1).max(120).trim(),
  rating: z.number().int().min(1).max(5).optional(),
  review: z.string().max(800).optional().transform((value) => value?.trim() || undefined),
  dateFinished: z.string().optional(),
});

export const readingStatsSchema = z.object({
  period: z.enum(['all-time', 'year', 'month', 'week']).default('all-time'),
  groupBy: z.enum(['genre', 'author', 'year']).default('genre'),
});

export const sanitizeQuery = (value: string) => value.replace(/[<>]/g, '').trim();
