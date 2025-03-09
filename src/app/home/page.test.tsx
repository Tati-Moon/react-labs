import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Theme, ThemeContext } from '../../context/themeContext';
import { useFetchAllQuery } from '../../services/PeopleService';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { setupStore } from '../../store/store';
import { jest } from '@jest/globals';
import HomePage from './page';
import { useDispatch, useSelector } from 'react-redux';

// jest.mock('react-redux', () => {
//   // Require the original module to not be mocked...
//   const originalModule = jest.requireActual('react-redux');

//   return {
//     __esModule: true, // Use it when dealing with esModules
//     ...originalModule,
//     useDispatch: jest.fn(),
//     useSelector: jest.fn(),
//   };
// });
jest.mock('react-redux', () => {
  const actualRedux = jest.requireActual<typeof import('react-redux')>('react-redux');
  return {
    ...actualRedux,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

jest.mock('../../services/PeopleService', () => ({
  useFetchAllQuery: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockUseFetchAllQuery = useFetchAllQuery as jest.Mock;

// const mockReducer = (state: Partial<RootState> = {}) => state;
const store = setupStore();
const mockDispatch = jest.fn();
const setup = (
  options: {
    theme?: Theme;
    mockData?: any;
    isLoading?: boolean;
    error?: Error | null;
  } = {}
) => {
  const {
    theme = 'light',
    mockData = null,
    isLoading = false,
    error = null,
  } = options;

  mockUseFetchAllQuery.mockReturnValue({
    data: mockData,
    isLoading,
    error,
  });

  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>
        <HomePage />
      </ThemeContext.Provider>
    </Provider>
  );
};

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue(new URLSearchParams({}));
    mockUseRouter.mockReturnValue({ push: jest.fn() });
    mockUsePathname.mockReturnValue('push');
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      selected: {
        'https://swapi.dev/api/people/1/': true,
      },
    });
  });

  test('renders loading state initially', () => {
    setup({ isLoading: true });
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  test('fetches and displays character list', async () => {
    const mockData = {
      results: [{ name: 'Luke Skywalker', id: '1' }],
      count: 1,
    };

    setup({ mockData });

    await waitFor(() => {
      expect(
        screen.getByText('Star Wars Character Search')
      ).toBeInTheDocument();
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  test('handles search input', async () => {
    setup();

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Yoda' } });

    expect(searchInput).toHaveValue('Yoda');
  });

  test('handles pagination', async () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    setup({ mockData: { results: [{ name: 'Luke' }], count: 20 } });

    await waitFor(() => expect(screen.getByText('Luke')).toBeInTheDocument());

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('frontpage=2')
    );
  });

  test('opens character details', async () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    setup({
      mockData: { results: [{ name: 'Luke Skywalker', id: '1' }], count: 1 },
    });

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('id=1'));
  });

  test('displays an error message if fetch fails', async () => {
    setup({ error: new Error('Network error') });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data.')).toBeInTheDocument();
    });
  });
});
