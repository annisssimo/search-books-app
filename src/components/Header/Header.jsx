import './Header.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import DropDown from '../DropDown/DropDown.jsx';

function Header() {
  return (
    <header>
      <h1>Search for books</h1>
      <SearchBar />
      <DropDown />
    </header>
  );
}

export default Header;
