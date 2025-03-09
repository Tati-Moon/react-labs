import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Details from '../../components/home-page/details';
import { CharacterDetailsBuilder } from '../../components/tests/utils/characterDetailsBuilder';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { useFetchByIdQuery } from '../../services/PeopleService';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams('?id=123')),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/home'),
}));
jest.mock('../../services/PeopleService', () => ({
  useFetchByIdQuery: jest.fn(),
}));
const mockUseFetchByIdQuery = useFetchByIdQuery as jest.Mock;

global.fetch = jest.fn();
const mockReducer = (state = {}) => state;
const store = createStore(mockReducer);

const mockUseRouter = useRouter as jest.Mock;
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

describe('Details Component', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockUseRouter.mockReturnValue({ query: { id: '1' }, push: jest.fn() });
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  test('renders loading state initially', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    });

    mockUseFetchByIdQuery.mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  test('fetches and displays character details', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    });

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(await screen.findByText(mockCharacterName)).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('Mass:')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  test('displays an error message if fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(
      await screen.findByText(/Failed to fetch details/i)
    ).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch details:'),
      expect.any(Error)
    );
  });

  test('closes details when the close button is clicked', async () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ query: { id: '1' }, push: mockPush });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    });

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(await screen.findByText(mockCharacterName)).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/home');
  });

  test('handles HTTP error when response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not found' }),
    });

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(
      await screen.findByText(/Failed to fetch details/i)
    ).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch details:'),
      expect.any(Error)
    );
  });
});
