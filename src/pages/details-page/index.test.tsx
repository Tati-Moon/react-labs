import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Details from './index';
import { CharacterDetailsBuilder } from '../../components/tests/utils/characterDetailsBuilder';
import { useFetchByIdQuery } from '../../services/PeopleService';

jest.mock('../../assets/icons/load.gif', () => 'mocked-load.gif');
jest.mock('../../assets/icons/close.png', () => 'mocked-close.png');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useOutletContext: jest.fn(),
}));

jest.mock('../../services/PeopleService', () => ({
  useFetchByIdQuery: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;
const mockUseOutletContext = useOutletContext as jest.Mock;
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

describe('Details Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseOutletContext.mockReturnValue({ handleCloseDetails: jest.fn() });
  });

  test('renders loading state initially', () => {
    mockUseFetchByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  test('fetches and displays character details', async () => {
    mockUseFetchByIdQuery.mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

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
    mockUseFetchByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Network error'),
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load character details.')
      ).toBeInTheDocument();
    });
  });

  test('closes details when the close button is clicked', async () => {
    const mockHandleCloseDetails = jest.fn();
    mockUseFetchByIdQuery.mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: null,
    });
    mockUseOutletContext.mockReturnValue({
      handleCloseDetails: mockHandleCloseDetails,
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(mockCharacterName)).toBeInTheDocument()
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockHandleCloseDetails).toHaveBeenCalledTimes(1);
  });
});
