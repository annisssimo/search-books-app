import { MAX_RESULTS } from '../../constants/constants';
import { useSearch } from '../../context/SearchContext';
import { Book } from '../../types/book';
import BookCard from '../BookCard';
import ErrorModal from '../ErrorModal';
import Spinner from '../Spinner';

const BookSearch: React.FC = () => {
  const {
    searchResults,
    totalItems,
    noBooksFound,
    loadMoreBooks,
    loading,
    loadingMore,
    error,
    setError,
  } = useSearch();

  const handleCloseError = () => {
    setError(null);
  };

  const getUniqueBooks = (books: Book[]): Book[] => {
    const uniqueBooks: Book[] = [];
    const bookIds = new Set<string>();

    books.forEach((book) => {
      if (!bookIds.has(book.id)) {
        uniqueBooks.push(book);
        bookIds.add(book.id);
      }
    });

    return uniqueBooks;
  };

  const uniqueSearchResults: Book[] = getUniqueBooks(searchResults);

  return (
    <div className="book-search">
      {loading && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {error && <ErrorModal message={error} onClose={handleCloseError} />}
      {totalItems !== 0 && !loading && !error && (
        <div className="total-items">Found {totalItems} results</div>
      )}
      {noBooksFound && <div className="total-items">No books found</div>}
      <div className="search-results">
        {uniqueSearchResults.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            image={book.volumeInfo.imageLinks?.thumbnail}
            category={
              book.volumeInfo.categories && book.volumeInfo.categories.length > 0
                ? book.volumeInfo.categories[0]
                : ''
            }
            title={book.volumeInfo.title}
            authors={
              book.volumeInfo.authors && book.volumeInfo.authors.length > 0
                ? book.volumeInfo.authors
                : []
            }
          />
        ))}
      </div>
      <div className="button-container">
        {uniqueSearchResults.length > 0 &&
          uniqueSearchResults.length % MAX_RESULTS === 0 &&
          !loadingMore && (
            <button className="load-button" onClick={loadMoreBooks}>
              Load more
            </button>
          )}
      </div>
      {loadingMore && (
        <div className="loading-more">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default BookSearch;
