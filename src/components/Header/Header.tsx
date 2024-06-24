import './Header.css';

import React from 'react';

import DropDown from '../DropDown/DropDown';
import SearchBar from '../SearchBar/SearchBar';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  category,
  setCategory,
  sort,
  setSort,
  query,
  setQuery,
  onSearch,
}) => {
  return (
    <header>
      <h1>Search for books</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
      <DropDown category={category} setCategory={setCategory} sort={sort} setSort={setSort} />
    </header>
  );
};

export default Header;
