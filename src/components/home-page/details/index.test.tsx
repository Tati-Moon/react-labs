import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Details from './index';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useFetchByIdQuery } from '../../../services/PeopleService';
import { Theme, ThemeContext } from '../../../context/themeContext';
import { CharacterDetailsBuilder } from '../../tests/utils/characterDetailsBuilder';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('../../../services/PeopleService', () => ({
  useFetchByIdQuery: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockUseFetchByIdQuery = useFetchByIdQuery as jest.Mock;

const mockCharacterName = 'Luke Skywalker';
const mockCharacter = new CharacterDetailsBuilder()
  .setName(mockCharacterName)
  .setHeight('172')
  .setMass('77')
  .setGender('male')
  .setBirthYear('19BBY')
  .setHairColor('blond')
  .setSkinColor('fair')
  .setEyeColor('blue')
  .build();

const mockReducer = (state = {}) => state;
const store = createStore(mockReducer);

describe('Details Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ id: '1' }));
    mockUsePathname.mockReturnValue('/details');
    mockUseRouter.mockReturnValue({ push: jest.fn() });
  });

  const setup = (
    options: {
      theme?: Theme;
      mockData?: any;
      isLoading?: boolean;
      error?: Error | null;
      id?: string | null;
    } = {}
  ) => {
    const {
      theme = 'light',
      mockData = null,
      isLoading = false,
      error = null,
    } = options;

    mockUseFetchByIdQuery.mockReturnValue({
      data: mockData,
      isLoading,
      error,
    });

    return render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>
          <Details />
        </ThemeContext.Provider>
      </Provider>
    );
  };

  test('renders loading state initially', () => {
    setup({ isLoading: true });

    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  test('fetches and displays character details', async () => {
    setup({ mockData: mockCharacter });

    await waitFor(() => {
      expect(screen.getByText(mockCharacterName)).toBeInTheDocument();
      expect(screen.getByText('Height:')).toBeInTheDocument();
      expect(screen.getByText('172')).toBeInTheDocument();
      expect(screen.getByText('Mass:')).toBeInTheDocument();
      expect(screen.getByText('77')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();
      expect(screen.getByText('male')).toBeInTheDocument();
    });
  });

  test('displays an error message if fetch fails', async () => {
    setup({ error: new Error('Network error') });

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load character details.')
      ).toBeInTheDocument();
    });
  });

  test('closes details when the close button is clicked', async () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    setup({ mockData: mockCharacter });

    await waitFor(() =>
      expect(screen.getByText(mockCharacterName)).toBeInTheDocument()
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/details?');
  });
});
