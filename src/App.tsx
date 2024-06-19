import { useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import BookCard from './components/BookCard/BookCard';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
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
  const [startIndex, setStartIndex] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const maxResults = 30;

  const handleInitialSearch = async (): Promise<void> => {
    setStartIndex(0); // Сбрасываем startIndex перед начальным поиском
    setSearchResults([]);
    handleSearch(0); // Начальный поиск всегда начинается с 0
  };

  const handleSearch = async (startIndex: number): Promise<void> => {
    try {
      console.log('Search term:', query);
      const apiKey = 'AIzaSyCHN4uhbCS9XCX1n3m-uPb8LYIAy5cCES0';
      const categoryFilter = category !== 'all' ? `+subject:${category}` : '';
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}${categoryFilter}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.totalItems > 0) {
        console.log('Books found:', data.items);
        setSearchResults((prevResults) => [...prevResults, ...data.items]);
        setTotalItems(data.totalItems);
      } else {
        console.log('No books found');
        setSearchResults([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadMoreBooks = () => {
    if (searchResults.length < totalItems) {
      const newStartIndex = startIndex + maxResults;
      setStartIndex(newStartIndex);
      handleSearch(newStartIndex);
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
        onSearch={handleInitialSearch}
      />
      <div className="total-items">Found {totalItems} results</div>
      <div className="search-results">
        {searchResults.map((book) => (
          <BookCard
            key={book.id}
            image={book.volumeInfo.imageLinks?.thumbnail}
            category={
              book.volumeInfo.categories &&
              book.volumeInfo.categories.length > 0
                ? book.volumeInfo.categories[0]
                : ''
            }
            title={book.volumeInfo.title}
            authors={
              book.volumeInfo.authors && book.volumeInfo.authors.length > 0
                ? book.volumeInfo.authors
                : []
            }
          />
        ))}
      </div>
      <div className="button-container">
        {searchResults.length > 0 && (
          <button className="load-button" onClick={loadMoreBooks}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
