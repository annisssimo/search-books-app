import './BookDetails.css';

import { useParams } from 'react-router-dom';

import useBookDetails from '../../hooks/useBookDetails';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error } = useBookDetails(id);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return <div className="error-message">No book details available</div>;

  const getImageLink = () => {
    const { thumbnail, smallThumbnail } = book.volumeInfo.imageLinks;
    if (!thumbnail && !smallThumbnail) return;
    return thumbnail || smallThumbnail;
  };

  const renderDescription = () => {
    if (book.volumeInfo.description) {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = book.volumeInfo.description;
      return tempElement.innerText;
    }
    return 'No description available';
  };

  return (
    <div className="book-details-page">
      <div className="book-details-image-container">
        <img
          className="book-details-image"
          src={getImageLink()}
          alt={book.volumeInfo.title}
          onLoad={() => console.log('Image loaded')}
        />
      </div>
      <div className="book-info">
        {book.volumeInfo.categories && (
          <div className="book-details-categories">{book.volumeInfo.categories.join(', ')}</div>
        )}
        <div className="book-details-title">{book.volumeInfo.title}</div>
        <div className="book-details-authors">{book.volumeInfo.authors?.join(', ')}</div>
        <div className="book-details-description">{renderDescription()}</div>
      </div>
    </div>
  );
};

export default BookDetails;
