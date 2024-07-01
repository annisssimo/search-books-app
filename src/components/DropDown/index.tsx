import './index.css';

import React from 'react';

import { DropDownProps } from './types';

const filters: string[] = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];
const sorts: string[] = ['relevance', 'newest'];

const DropDown: React.FC<DropDownProps> = ({ category, setCategory, sort, setSort }) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategory(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSort(event.target.value);
  };

  const generateOptions = (options: string[]) =>
    options.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));

  return (
    <div className="dropdown">
      <div className="filter">
        <label htmlFor="categories-select">Categories</label>
        <select
          name="categories"
          id="categories-select"
          value={category}
          onChange={handleCategoryChange}
          aria-label="Select category"
        >
          {generateOptions(filters)}
        </select>
      </div>
      <div className="sort">
        <label htmlFor="sort-select">Sort by</label>
        <select
          name="sort"
          id="sort-select"
          value={sort}
          onChange={handleSortChange}
          aria-label="Select sorting order"
        >
          {generateOptions(sorts)}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
