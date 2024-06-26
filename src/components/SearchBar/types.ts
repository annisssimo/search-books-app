export interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}
