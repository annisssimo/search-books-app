import './BookDetails.css';

import { useParams } from 'react-router-dom';

import useBookDetails from '../../hooks/useBookDetails';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error } = useBookDetails(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>No book details available</div>;

  const getImageLink = () => {
    const { thumbnail, smallThumbnail } = book.volumeInfo.imageLinks;
    if (!thumbnail && !smallThumbnail) return;
    return thumbnail || smallThumbnail;
  };

  return (
    <div className="book-details">
      <img className="book-image" src={getImageLink()} alt={book.volumeInfo.title} />
      <div className="book-info">
        {book.volumeInfo.categories && (
          <div className="book-categories">{book.volumeInfo.categories.join(', ')}</div>
        )}
        <div className="book-title">{book.volumeInfo.title}</div>
        <div className="book-authors">{book.volumeInfo.authors?.join(', ')}</div>
        <div className="book-description">{book.volumeInfo.description}</div>
      </div>
    </div>
  );
};

export default BookDetails;
