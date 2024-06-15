import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  return (
    <div className="input-wrapper">
      <input type="text" placeholder="Search for books" />
      <FaSearch id="search-icon" />
    </div>
  );
}

export default SearchBar;
