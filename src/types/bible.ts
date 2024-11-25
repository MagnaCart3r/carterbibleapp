export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface APIResponse {
  Row: Array<{
    Book: string;
    Chapter: number;
    Verse: number;
    Text: string;
  }>;
}