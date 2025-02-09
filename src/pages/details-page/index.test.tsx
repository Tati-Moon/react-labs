import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useOutletContext,
} from 'react-router-dom';
import Details from './index';
import { useParams } from 'react-router-dom';
import { CharacterDetailsBuilder } from '../../components/tests/utils/characterDetailsBuilder';

jest.mock('../../assets/icons/load.gif', () => 'mocked-load.gif');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useOutletContext: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;
const mockUseOutletContext = useOutletContext as jest.Mock;

global.fetch = jest.fn();

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
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseOutletContext.mockReturnValue({ handleCloseDetails: jest.fn() });
  });

  test('renders loading state initially', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
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
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
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
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(mockCharacterName)).not.toBeInTheDocument();
      expect(screen.queryByAltText('Loading')).not.toBeInTheDocument();
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch details:'),
      expect.any(Error)
    );
  });

  test('closes details when the close button is clicked', async () => {
    const mockHandleCloseDetails = jest.fn();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
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
