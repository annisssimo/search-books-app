import './index.css';

import { useParams } from 'react-router-dom';

import useBookDetails from '../../hooks/useBookDetails';
import Spinner from '../Spinner';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error } = useBookDetails(id);

  const getImageLink = () => {
    if (!book || !book.volumeInfo || !book.volumeInfo.imageLinks) return;
    const { thumbnail, smallThumbnail } = book.volumeInfo.imageLinks;
    return thumbnail || smallThumbnail;
  };

  const renderDescription = () => {
    if (!book || !book.volumeInfo || !book.volumeInfo.description) {
      return 'No description available';
    }
    const tempElement = document.createElement('div');
    tempElement.innerHTML = book.volumeInfo.description;
    return tempElement.innerText;
  };

  return (
    <div className="book-details-page">
      {loading && <Spinner />}
      {error && <div className="error-message">{error}</div>}
      {book && (
        <>
          <div className="book-details-image-container">
            <img className="book-details-image" src={getImageLink()} alt={book.volumeInfo.title} />
          </div>
          <div className="book-info">
            {book.volumeInfo.categories && (
              <div className="book-details-categories">{book.volumeInfo.categories.join(', ')}</div>
            )}
            <div className="book-details-title">{book.volumeInfo.title}</div>
            <div className="book-details-authors">{book.volumeInfo.authors?.join(', ')}</div>
            <div className="book-details-description">{renderDescription()}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
