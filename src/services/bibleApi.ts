import axios from 'axios';
import type { BibleVerse, APIResponse } from '../types/bible';
import { fallbackVerses } from './fallbackVerses';

const RAPID_API_KEY = 'bee6eaa86emshcbc0be0830fe652p1f1b94jsn3df686be0c37';
const RAPID_API_HOST = 'niv-bible.p.rapidapi.com';

export const books = [
  'Genesis', 'Exodus', 'Psalms', 'Proverbs', 'Matthew',
  'John', 'Romans', 'Philippians', 'James', 'Revelation'
] as const;

let usesFallback = false;

export async function fetchBibleVerse(): Promise<BibleVerse> {
  // If we've already detected API issues, use fallback immediately
  if (usesFallback) {
    return fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
  }

  try {
    const randomBook = books[Math.floor(Math.random() * books.length)];
    const randomChapter = Math.floor(Math.random() * 5) + 1;
    const randomVerse = Math.floor(Math.random() * 20) + 1;

    const response = await axios.get<APIResponse>('https://niv-bible.p.rapidapi.com/row', {
      params: {
        Book: randomBook,
        Chapter: randomChapter,
        Verse: randomVerse
      },
      headers: {
        'x-rapidapi-host': RAPID_API_HOST,
        'x-rapidapi-key': RAPID_API_KEY
      },
      timeout: 5000 // 5 second timeout
    });

    if (!response.data?.Row?.[0]) {
      throw new Error('Invalid API response format');
    }

    const { Book, Chapter, Verse, Text } = response.data.Row[0];
    
    return {
      book: Book,
      chapter: Chapter,
      verse: Verse,
      text: Text
    };
  } catch (error) {
    // Switch to fallback mode if API fails
    usesFallback = true;
    console.warn('Switching to fallback verses due to API error');
    
    // Return a random fallback verse
    return fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
  }
}