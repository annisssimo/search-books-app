import { Book } from '../types/book';

export default interface SearchContextProps {
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
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}
