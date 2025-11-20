import { ReadingListEntry } from '../types';

const readingLists = new Map<string, ReadingListEntry[]>();

const ensureUserList = (userId: string) => {
  if (!readingLists.has(userId)) {
    readingLists.set(userId, []);
  }
  return readingLists.get(userId)!;
};

export const addBook = (userId: string, entry: ReadingListEntry) => {
  const list = ensureUserList(userId);
  const exists = list.some((item) => item.bookId === entry.bookId);
  if (exists) {
    return { added: false, reason: 'El libro ya existe en la lista.' } as const;
  }
  list.push(entry);
  return { added: true } as const;
};

export const listBooks = (userId: string, filter?: ReadingListEntry['priority'], limit?: number) => {
  const list = ensureUserList(userId);
  const filtered = filter && filter !== 'all' ? list.filter((item) => item.priority === filter) : list;
  return filtered.slice(0, limit || filtered.length);
};

export const markBookAsRead = (
  userId: string,
  bookId: string,
  rating?: number,
  review?: string,
  dateFinished?: string,
) => {
  const list = ensureUserList(userId);
  const entry = list.find((item) => item.bookId === bookId);
  if (!entry) return false;
  entry.status = 'read';
  entry.rating = rating;
  entry.review = review;
  entry.dateFinished = dateFinished || new Date().toISOString();
  return true;
};

export const getStats = (userId: string) => {
  const list = ensureUserList(userId);
  const read = list.filter((item) => item.status === 'read');
  const totalPages = 0;
  const averageRating = read.length
    ? read.reduce((sum, item) => sum + (item.rating ?? 0), 0) / read.filter((i) => i.rating).length || undefined
    : undefined;

  return {
    totalRead: read.length,
    totalPages,
    averageRating,
    genres: {},
    authors: {},
    byPeriod: {},
  };
};
