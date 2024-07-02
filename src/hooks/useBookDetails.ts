import { useEffect, useState } from 'react';

import { fetchBookDetails } from '../services/bookDetails';
import { Book } from '../types/book';

const useBookDetails = (id: string | undefined) => {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid book ID');
      setLoading(false);
      return;
    }

    const getBookDetails = async () => {
      try {
        const data = await fetchBookDetails(id);
        setBook(data);
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
  }, [id]);

  return { book, loading, error, setError };
};

export default useBookDetails;
