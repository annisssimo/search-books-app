import './BookCard.css';

import { Link } from 'react-router-dom';

import { BookCardProps } from './types';

const BookCard: React.FC<BookCardProps> = ({ id, image, category, title, authors }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${id}`}>
        <img className="book-image" src={image} alt={`${title} cover`} />
        <div className="book-details">
          <div className="book-title">
            <p className="category">{category}</p>
            <h3 className="book-title">{title}</h3>
            <p className="book-authors">{authors.join(', ')}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
