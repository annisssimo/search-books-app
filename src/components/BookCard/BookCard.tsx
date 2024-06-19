import './BookCard.css';

interface BookCardProps {
  image: string;
  category: string;
  title: string;
  authors: string[];
}

const BookCard: React.FC<BookCardProps> = ({
  image,
  category,
  title,
  authors,
}) => {
  return (
    <div className="book-card">
      <img className="book-image" src={image} alt={`${title} cover`} />
      <div className="book-details">
        <div className="book-title">
          <p className="category">{category}</p>
          <h3 className="book-title">{title}</h3>
          <p className="book-authors">{authors.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
