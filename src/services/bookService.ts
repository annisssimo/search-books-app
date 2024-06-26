import { GOOGLE_BOOKS_API_URL } from '../constants/apiConstants';

const VITE_GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const fetchBooks = async (
  query: string,
  category: string,
  sort: string,
  startIndex: number,
  maxResults: number
) => {
  const categoryFilter = category !== 'all' ? `+subject:${category}` : '';
  const url = `${GOOGLE_BOOKS_API_URL}?q=${query}${categoryFilter}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResults}&key=${VITE_GOOGLE_BOOKS_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
