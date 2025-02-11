import React from 'react';
import styles from './index.module.scss';
import searchIcon from '../../../assets/icons/search.png';
import useLocalStorage from '../../../hooks/UseLocalStorage';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useLocalStorage('searchItem', '');

  const handleSearch = () => {
    const trimmedItem = searchItem.trim();
    onSearch(trimmedItem);
    setSearchItem(trimmedItem);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        onKeyPress={handleKeyPress}
        data-testid="search-input"
        placeholder="Search for Star Wars characters..."
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <img src={searchIcon} alt="search" className={styles.searchIcon} />{' '}
        Search
      </button>
    </div>
  );
};

export default Search;
