import './Header.css';
import SearchBar from '../SearchBar/SearchBar.jsx';

function Header() {
  return (
    <header>
      <h1>Search for books</h1>
      <SearchBar />
    </header>
  );
}

export default Header;
