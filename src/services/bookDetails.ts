import { GOOGLE_BOOKS_API_URL } from '../constants/apiConstants';

const VITE_GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const fetchBookDetails = async (id: string) => {
  const url = `${GOOGLE_BOOKS_API_URL}/${id}?key=${VITE_GOOGLE_BOOKS_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
