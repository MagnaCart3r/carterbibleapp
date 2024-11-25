import React from 'react';
import { Book, AlertCircle } from 'lucide-react';
import type { BibleVerse as BibleVerseType } from '../types/bible';

interface BibleVerseProps {
  verse: BibleVerseType | null;
  loading: boolean;
  error: string | null;
}

export const BibleVerse: React.FC<BibleVerseProps> = ({ verse, loading, error }) => {
  if (error) {
    return (
      <div className="text-center text-amber-600 space-y-2">
        <AlertCircle className="w-6 h-6 mx-auto" />
        <p>Using offline verse collection.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  if (!verse) {
    return null;
  }

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <Book className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          {verse.book} {verse.chapter}:{verse.verse}
        </h2>
      </div>
      <p className="text-lg text-gray-600 italic leading-relaxed">
        "{verse.text}"
      </p>
    </div>
  );
};