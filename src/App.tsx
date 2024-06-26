import './App.css';

import { Route, Routes } from 'react-router-dom';

import BookDetails from './components/BookDetails/BookDetails';
import BookSearch from './components/BookSearch/BookSearch';
import Header from './components/Header/Header';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <div className="app">
      <SearchProvider>
        <Header />
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
