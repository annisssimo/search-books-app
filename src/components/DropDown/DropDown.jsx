import { useState } from 'react';
import './DropDown.css';

export default function DropDown() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    // добавить логику для фильтрации данных по категориям
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    // добавить логику для сортировки данных
  };

  return (
    <div className="dropdown">
      <div className="filter">
        <label htmlFor="categories-select">Categories</label>
        <select
          name="categories"
          id="categories-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="all">all</option>
          <option value="art">art</option>
          <option value="biography">biography</option>
          <option value="computers">computers</option>
          <option value="history">history</option>
          <option value="medical">medical</option>
          <option value="poetry">poetry</option>
        </select>
      </div>
      <div className="sort">
        <label htmlFor="sort-select">Sort by</label>
        <select
          name="sort"
          id="sort-select"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="relevance">relevance</option>
          <option value="newest">newest</option>
        </select>
      </div>
    </div>
  );
}
