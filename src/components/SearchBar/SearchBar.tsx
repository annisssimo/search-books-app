import './SearchBar.css';

import React, { ChangeEvent, KeyboardEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

import { SearchBarProps } from './types';

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <FaSearch id="search-icon" onClick={onSearch} />
    </div>
  );
};

export default SearchBar;
