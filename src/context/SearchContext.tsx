import React, { createContext, useContext, useState } from 'react';

import { MAX_RESULTS } from '../constants/constants';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types/book';

// Определение интерфейса контекста
interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  searchResults: Book[];
  totalItems: number;
  noBooksFound: boolean;
  handleInitialSearch: () => Promise<void>;
  loadMoreBooks: () => void;
}

// Создание контекста
const SearchContext = createContext<SearchContextProps | undefined>(undefined);

// Провайдер контекста, который обеспечивает доступ к данным через всё дерево компонентов
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Состояния и функции для управления поисковыми данными
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
      const data = await fetchBooks(query, category, sort, startIndex, MAX_RESULTS);

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
      // TODO: Display error on UI
    }
  };

  const loadMoreBooks = () => {
    const newStartIndex = startIndex + MAX_RESULTS;
    setStartIndex(newStartIndex);
    handleSearch(newStartIndex);
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
