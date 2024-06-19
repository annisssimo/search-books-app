import { useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import BookCard from './components/BookCard/BookCard';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('relevance');
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearch = async (): Promise<void> => {
    try {
      console.log('Search term:', query);
      const apiKey = 'AIzaSyCHN4uhbCS9XCX1n3m-uPb8LYIAy5cCES0';
      const categoryFilter = category !== 'all' ? `+subject:${category}` : '';
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}${categoryFilter}&orderBy=${sort}&key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.totalItems > 0) {
        console.log('Books found:', data.items);
        setSearchResults(data.items);
      } else {
        console.log('No books found');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app">
      <Header
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />
      <div className="search-results">
        {searchResults.map((book) => (
          <BookCard
            key={book.id}
            image={book.volumeInfo.imageLinks?.thumbnail}
            category={book.volumeInfo.categories[0]}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
