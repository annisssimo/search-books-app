import './Header.css';

import React from 'react';

import { useSearch } from '../../context/SearchContext';
import DropDown from '../DropDown/DropDown';
import SearchBar from '../SearchBar/SearchBar';

const Header: React.FC = () => {
  const { category, setCategory, sort, setSort, query, setQuery, handleInitialSearch } =
    useSearch();

  return (
    <header>
      <h1>Search for books</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleInitialSearch} />
      <DropDown category={category} setCategory={setCategory} sort={sort} setSort={setSort} />
    </header>
  );
};

export default Header;
