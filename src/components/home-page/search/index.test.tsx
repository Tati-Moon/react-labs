import { render, screen } from '@testing-library/react';
import Search from './index';
import useLocalStorage from '../../../hooks/UseLocalStorage';

jest.mock('../../../hooks/UseLocalStorage', () => {
  return jest.fn(() => {
    let storedValue = '';
    const setStoredValue = jest.fn((newValue) => {
      storedValue = newValue;
    });
    return [storedValue, setStoredValue];
  });
});

jest.mock('../../../assets/icons/search.png', () => 'mocked-search.png');
describe('Search Component', () => {
  const onSearchMock = jest.fn();
  let setSearchItemMock: jest.Mock;

  beforeEach(() => {
    setSearchItemMock = jest.fn();
    (useLocalStorage as jest.Mock).mockReturnValue(['', setSearchItemMock]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders search component correctly', () => {
    render(<Search onSearch={onSearchMock} />);
    expect(
      screen.getByPlaceholderText('Search for Star Wars characters...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
