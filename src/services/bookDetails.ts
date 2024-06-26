// import { GOOGLE_BOOKS_API_URL } from '../constants/apiConstants';

// const VITE_GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const fetchBookDetails = async (id: string) => {
  //   const url = `${GOOGLE_BOOKS_API_URL}?q=${query}${categoryFilter}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResults}&key=${VITE_GOOGLE_BOOKS_API_KEY}`;

  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyCHN4uhbCS9XCX1n3m-uPb8LYIAy5cCES0`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
