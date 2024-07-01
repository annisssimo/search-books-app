import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MAX_RESULTS } from '../constants/constants';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types/book';
import SearchContextProps from '../types/searchContextProps';

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('relevance');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [noBooksFound, setNoBooksFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInitialSearch = async (): Promise<void> => {
    setStartIndex(0);
    setSearchResults([]);
    setLoading(true);
    navigate('/');
    await handleSearch(0);
    setLoading(false);
  };

  const handleSearch = async (startIndex: number): Promise<void> => {
    setError(null);

    try {
      const data = await fetchBooks(query, category, sort, startIndex, MAX_RESULTS);
      if (data.totalItems > 0) {
        setSearchResults((prevResults) => [...prevResults, ...data.items]);
        setTotalItems(data.totalItems);
        setNoBooksFound(false);
      } else {
        if (startIndex === 0) {
          setNoBooksFound(true);
          setSearchResults([]);
          setTotalItems(0);
        }
      }
    } catch (error) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreBooks = async () => {
    const newStartIndex = startIndex + MAX_RESULTS;
    setStartIndex(newStartIndex);
    setLoadingMore(true);
    await handleSearch(newStartIndex);
  };

  return (
    <SearchContext.Provider
      value={{
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
        loading,
        loadingMore,
        error,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
