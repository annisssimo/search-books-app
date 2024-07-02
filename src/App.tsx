import './App.css';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import BookDetails from './components/BookDetails';
import BookSearch from './components/BookSearch';
import ErrorModal from './components/ErrorModal';
import Header from './components/Header';
import { SearchProvider } from './context/SearchContext';

function App() {
  const [error, setError] = useState<string | null>(null);

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="app">
      <SearchProvider>
        <Header />
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/book/:id" element={<BookDetails />} />
          {error && <ErrorModal message={error} onClose={handleCloseError} />}
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
