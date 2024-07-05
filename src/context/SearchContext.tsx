import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MAX_RESULTS } from '../constants/constants';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types/book';
import SearchContextProps from '../types/searchContextProps';

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [noBooksFound, setNoBooksFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInitialSearch = async (): Promise<void> => {
    setStartIndex(0);
    setSearchResults([]);
    setTotalItems(0);
    setNoBooksFound(false);
    setLoading(true);
    navigate('/');
    await handleSearch(0);
    setLoading(false);
  };

  const handleSearch = async (startIndex: number): Promise<void> => {
    if (!query.trim()) {
      setSearchResults([]);
      setTotalItems(0);
      setNoBooksFound(false);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    setError(null);

    try {
      const data = await fetchBooks(query, category, sort, startIndex, MAX_RESULTS);

      if (data && Array.isArray(data.items)) {
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
      }
    } catch (error) {
      setError('Error fetching books');
      console.error('Error in handleSearch:', error);
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
        setError,
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
