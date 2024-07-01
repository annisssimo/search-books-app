import React from 'react';

import { MAX_RESULTS } from '../../constants/constants';
import { useSearch } from '../../context/SearchContext';
import BookCard from '../BookCard';
import Spinner from '../Spinner';

const BookSearch: React.FC = () => {
  const { searchResults, totalItems, noBooksFound, loadMoreBooks, loading, loadingMore, error } =
    useSearch();

  return (
    <div className="book-search">
      {loading && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {totalItems !== 0 && !loading && !error && (
        <div className="total-items">Found {totalItems} results</div>
      )}
      {noBooksFound && <div className="total-items">No books found</div>}
      <div className="search-results">
        {searchResults.map((book) => (
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
        {searchResults.length > 0 && searchResults.length % MAX_RESULTS === 0 && !loadingMore && (
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
