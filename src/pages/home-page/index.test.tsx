import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from './index';

import { act } from 'react';
import { useFetchAllPostsQuery } from '../../services/PeopleService';
import { setupStore } from '../../store/store';
import { ThemeContext, ThemeContextType } from '../../context/themeContext';
import { Provider } from 'react-redux';

jest.mock('../../services/PeopleService', () => ({
  peopleAPI: {
    reducerPath: 'peopleAPI',
    reducer: () => ({}),
    middleware: () => (next: (action: unknown) => void) => (action: unknown) =>
      next(action),
  },
  useFetchAllPostsQuery: jest.fn(),
}));

global.fetch = jest.fn();

jest.mock('../../assets/icons/logo.png', () => 'mocked-logoIcon.png');
jest.mock('../../assets/icons/load.gif', () => 'mocked-load.gif');
jest.mock('../../assets/icons/search.png', () => 'mocked-search.png');
jest.mock('../../assets/icons/next.png', () => 'mocked-next.png');
jest.mock('../../assets/icons/previous.png', () => 'mocked-previous.png');
jest.mock('../../assets/icons/downloads.png', () => 'mocked-downloads.png');

jest.mock(
  '../../assets/icons/checkbox_false.png',
  () => 'mocked-checkbox_false.png'
);
jest.mock(
  '../../assets/icons/checkbox_true.png',
  () => 'mocked-checkbox_true.png'
);
jest.mock(
  '../../assets/icons/checkbox_minus.png',
  () => 'mocked-checkbox_minus.png'
);

describe('HomePage Component', () => {
  const store = setupStore();

  const setup = ({ mockThemeContext = defaultThemeContext } = {}) =>
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchAllPostsQuery as jest.Mock).mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      error: null,
    });
  });
  const defaultThemeContext: ThemeContextType = {
    theme: 'light',
    toggleTheme: jest.fn(),
  };
  test('renders logo and search bar', async () => {
    await act(async () => {
      setup();
    });
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('handles search input correctly', async () => {
    setup();

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Luke' } });

    await waitFor(() => {
      expect(localStorage.getItem('searchItem')).toBe('Luke');
    });
  });

  it('updates pagination correctly', async () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={defaultThemeContext}>
          <MemoryRouter initialEntries={['/home?frontpage=2']}>
            <Routes>
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/page 2/i)).toBeInTheDocument();
    });
  });

  it('displays loading state correctly', async () => {
    (useFetchAllPostsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    setup();

    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    (useFetchAllPostsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    setup();

    expect(
      await screen.findByText(
        /Oops! Something went wrong. Please check your internet connection./i
      )
    ).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', async () => {
    const mockToggleTheme = jest.fn();
    const mockThemeContext: ThemeContextType = {
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    };

    setup({ mockThemeContext });

    const toggleButton = screen.getByRole('button', { name: /dark/i });

    fireEvent.click(toggleButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
