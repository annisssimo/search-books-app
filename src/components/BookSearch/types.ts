import { Book } from '../../types/book';

export interface BookSearchProps {
  searchResults: Book[];
  totalItems: number;
  noBooksFound: boolean;
  loadMoreBooks: () => void;
}
