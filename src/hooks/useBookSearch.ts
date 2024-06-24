import { useState } from 'react';
import { fetchBooks } from '../services/bookService';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
}

const maxResults = 30;

const useBookSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('relevance');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [noBooksFound, setNoBooksFound] = useState<boolean>(false);

  const handleInitialSearch = async (): Promise<void> => {
    setStartIndex(0);
    setSearchResults([]);
    handleSearch(0);
  };

  const handleSearch = async (startIndex: number): Promise<void> => {
    try {
      const data = await fetchBooks(
        query,
        category,
        sort,
        startIndex,
        maxResults
      );

      if (data.totalItems > 0) {
        setSearchResults((prevResults) => [...prevResults, ...data.items]);
        setTotalItems(data.totalItems);
        setNoBooksFound(false);
      } else {
        setNoBooksFound(true);
        setSearchResults([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadMoreBooks = () => {
    const newStartIndex = startIndex + maxResults;
    setStartIndex(newStartIndex);
    handleSearch(newStartIndex);
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    searchResults,
    totalItems,
    noBooksFound,
    handleInitialSearch,
    loadMoreBooks,
  };
};

export default useBookSearch;
