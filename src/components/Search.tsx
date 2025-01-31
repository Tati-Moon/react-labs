import { Component } from 'react';
import searchIcon from '../assets/icons/search.png';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') ?? '',
    };
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.props.onSearch(searchTerm.trim());
    localStorage.setItem('searchTerm', searchTerm.trim());
  };

  handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={this.state.searchTerm}
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
          onKeyPress={this.handleKeyPress}
          placeholder="Search for Star Wars characters..."
        />
        <button className="search-button" onClick={this.handleSearch}>
          <img src={searchIcon} alt="search" className="searchIcon" /> Search
        </button>
      </div>
    );
  }
}

export default Search;