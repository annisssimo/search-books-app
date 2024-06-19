import React from 'react';
import './Header.css';
import DropDown from '../DropDown/DropDown';
import SearchBar from '../SearchBar/SearchBar';

interface HeaderProps {
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

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
      <DropDown
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
    </header>
  );
};

export default Header;
