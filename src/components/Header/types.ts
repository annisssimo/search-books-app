export interface HeaderProps {
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}
