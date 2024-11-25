import React, { useEffect, useState, useCallback } from 'react';
import { BibleVerse } from './components/BibleVerse';
import { fetchBibleVerse } from './services/bibleApi';
import type { BibleVerse as BibleVerseType } from './types/bible';

function App() {
  const [verse, setVerse] = useState<BibleVerseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomVerse = useCallback(async () => {
    setLoading(true);
    try {
      const newVerse = await fetchBibleVerse();
      setVerse(newVerse);
      // Only set error if we're using fallback verses
      setError(newVerse.text.includes('offline') ? 'Using fallback verses' : null);
    } catch (err) {
      setError('Using offline verses');
      console.warn('Error fetching verse:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRandomVerse();
    const interval = setInterval(getRandomVerse, 5000);
    return () => clearInterval(interval);
  }, [getRandomVerse]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(https://cdn.shopify.com/s/files/1/0605/9828/8499/files/catholic-images-of-jesus1.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 mx-4">
        <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">
          Daily Bible Verses
        </h1>
        <div className="h-48 flex items-center justify-center">
          <BibleVerse verse={verse} loading={loading} error={error} />
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          Verses refresh every 5 seconds
        </div>
      </div>
    </div>
  );
}

export default App;