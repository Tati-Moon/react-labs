import { Component } from 'react';
import Search from './components/Search';
import CardList from './components/CardList';
import ErrorBoundary from './components/ErrorBoundary';
import './assets/styles.scss';
import logoIcon from './assets/icons/logo.png';
import { PEOPLE_ENDPOINT } from './assets/constants';
import ErrorButton from './components/ErrorButton';

interface AppState {
  results: Array<{ name: string; url: string }>;
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
    };
  }

  fetchData = async (searchTerm: string = '') => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(`${PEOPLE_ENDPOINT}?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ results: data.results, loading: false });
    } catch (error) {
      this.setState({
        error: `Failed to fetch data. ${error}`,
        loading: false,
      });
    }
  };

  handleSearch = (term: string) => {
    this.fetchData(term);
    localStorage.setItem('searchTerm', term);
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') ?? '';
    this.fetchData(savedSearchTerm);
  }

  render() {
    const { results, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <div className="app">
          <div className="top-menu">
            <div className="logo">
              <img src={logoIcon} alt="logo" className="logoIcon" />
            </div>
            <div className="search-container">
              <Search onSearch={this.handleSearch} />
            </div>
          </div>
          <h1>Star Wars Character Search</h1>
          <CardList results={results} loading={loading} error={error} />

          <ErrorButton />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
